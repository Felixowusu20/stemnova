import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { CMS_COLLECTIONS } from "@/lib/cms/collections";
import { z } from "zod";

const contentSchema = z.object({
  id: z.string().optional(),
  collection: z.string().min(1),
  slug: z.string().nullable().optional(),
  title: z.string().min(1),
  excerpt: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  coverUrl: z.string().nullable().optional(),
  data: z.unknown().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
  sortOrder: z.number().int().default(0),
});

const COLLECTION_IDS = new Set<string>(CMS_COLLECTIONS.map((item) => item.id));

function revalidateCollection(collection: string, slug?: string | null) {
  revalidatePath("/", "layout");

  if (collection === "team") {
    revalidatePath("/about/leadership");
    if (slug) revalidatePath(`/about/leadership/${slug}`);
  }
  if (collection === "programs") {
    revalidatePath("/programs");
    if (slug) revalidatePath(`/programs/${slug}`);
  }
  if (collection === "events") {
    revalidatePath("/events");
    if (slug) revalidatePath(`/events/${slug}`);
  }
  if (collection === "blog") {
    revalidatePath("/blog");
    if (slug) revalidatePath(`/blog/${slug}`);
  }
  if (collection === "gallery") {
    revalidatePath("/gallery");
    if (slug) revalidatePath(`/gallery/${slug}`);
  }
  if (collection === "resources") {
    revalidatePath("/resources");
  }
  if (collection === "testimonials" || collection === "partners") {
    revalidatePath("/");
  }
  if (collection === "partners") {
    revalidatePath("/partners");
    if (slug) revalidatePath(`/partners/${slug}`);
  }
  if (collection === "philosophy-quotes") {
    revalidatePath("/about");
    revalidatePath("/about/vision");
  }
  if (collection === "pages") {
    if (slug === "vision-mission") revalidatePath("/about/vision");
    if (slug === "about-story") revalidatePath("/about/story");
    if (slug === "about-overview") revalidatePath("/about");
    if (slug === "leadership") revalidatePath("/about/leadership");
    if (slug === "contact") revalidatePath("/contact");
    if (slug === "governance") revalidatePath("/about/governance");
    if (slug === "roadmap") revalidatePath("/about/roadmap");
    if (slug === "impact") {
      revalidatePath("/impact");
      revalidatePath("/");
    }
    revalidatePath("/about");
  }
}

async function ensureCmsActiveMarker() {
  await prisma.contentItem.upsert({
    where: {
      collection_slug: { collection: "_system", slug: "cms-active" },
    },
    update: {},
    create: {
      collection: "_system",
      slug: "cms-active",
      title: "CMS active",
      status: "ARCHIVED",
      sortOrder: 0,
    },
  });
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection");
  const id = searchParams.get("id");

  if (id) {
    const item = await prisma.contentItem.findUnique({ where: { id } });
    return NextResponse.json(item);
  }

  const items = await prisma.contentItem.findMany({
    where: collection
      ? { collection }
      : { collection: { not: "_system" } },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = contentSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const item = await prisma.contentItem.create({
    data: {
      collection: data.collection,
      slug: data.slug || null,
      title: data.title,
      excerpt: data.excerpt,
      body: data.body,
      coverUrl: data.coverUrl,
      data: data.data ? (data.data as Prisma.InputJsonValue) : undefined,
      status: data.status,
      sortOrder: data.sortOrder,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });
  await ensureCmsActiveMarker();
  revalidateCollection(item.collection, item.slug);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = contentSchema.extend({ id: z.string() }).safeParse(
    await request.json()
  );
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const data = parsed.data;
  const item = await prisma.contentItem.update({
    where: { id: data.id },
    data: {
      collection: data.collection,
      slug: data.slug || null,
      title: data.title,
      excerpt: data.excerpt,
      body: data.body,
      coverUrl: data.coverUrl,
      data: data.data ? (data.data as Prisma.InputJsonValue) : undefined,
      status: data.status,
      sortOrder: data.sortOrder,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });
  revalidateCollection(item.collection, item.slug);
  return NextResponse.json(item);
}

/**
 * Delete content:
 * - ?id=… — single item
 * - ?collection=programs — wipe one collection
 * - ?scope=all — wipe all CMS content (keeps a marker so static mock data stays off)
 */
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const collection = searchParams.get("collection");
  const scope = searchParams.get("scope");

  if (scope === "all") {
    const result = await prisma.contentItem.deleteMany({
      where: { collection: { not: "_system" } },
    });
    await ensureCmsActiveMarker();
    revalidatePath("/", "layout");
    for (const meta of CMS_COLLECTIONS) {
      revalidateCollection(meta.id);
    }
    return NextResponse.json({ ok: true, deleted: result.count });
  }

  if (collection) {
    if (!COLLECTION_IDS.has(collection)) {
      return NextResponse.json({ error: "Unknown collection" }, { status: 400 });
    }
    const result = await prisma.contentItem.deleteMany({ where: { collection } });
    await ensureCmsActiveMarker();
    revalidateCollection(collection);
    return NextResponse.json({ ok: true, deleted: result.count });
  }

  if (!id) {
    return NextResponse.json(
      { error: "id, collection, or scope=all required" },
      { status: 400 }
    );
  }

  const existing = await prisma.contentItem.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing.collection === "_system") {
    return NextResponse.json(
      { error: "System content cannot be deleted" },
      { status: 400 }
    );
  }

  await prisma.contentItem.delete({ where: { id } });
  await ensureCmsActiveMarker();
  revalidateCollection(existing.collection, existing.slug);
  return NextResponse.json({ ok: true, deleted: 1 });
}
