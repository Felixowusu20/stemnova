import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { z } from "zod";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session;
}

const settingsSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  logoUrl: z.string().optional().nullable(),
  logoAlt: z.string().optional().nullable(),
  faviconUrl: z.string().optional().nullable(),
  contact: z.record(z.string(), z.unknown()),
  social: z.array(z.record(z.string(), z.unknown())),
  announcementBar: z
    .object({
      text: z.string(),
      href: z.string().optional(),
      dismissible: z.boolean(),
    })
    .optional()
    .nullable(),
  heroSlides: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      })
    )
    .optional()
    .nullable(),
  pageHeroImages: z.record(z.string(), z.string()).optional().nullable(),
});

function asJson(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid settings", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      name: data.name,
      shortName: data.shortName,
      tagline: data.tagline,
      description: data.description,
      logoUrl: data.logoUrl,
      logoAlt: data.logoAlt,
      faviconUrl: data.faviconUrl,
      contact: asJson(data.contact),
      social: asJson(data.social),
      announcementBar: data.announcementBar
        ? asJson(data.announcementBar)
        : undefined,
      heroSlides: data.heroSlides ? asJson(data.heroSlides) : undefined,
      pageHeroImages: data.pageHeroImages
        ? asJson(data.pageHeroImages)
        : undefined,
    },
    create: {
      id: "default",
      name: data.name,
      shortName: data.shortName,
      tagline: data.tagline,
      description: data.description,
      logoUrl: data.logoUrl,
      logoAlt: data.logoAlt,
      faviconUrl: data.faviconUrl,
      contact: asJson(data.contact),
      social: asJson(data.social),
      announcementBar: data.announcementBar
        ? asJson(data.announcementBar)
        : undefined,
      heroSlides: data.heroSlides ? asJson(data.heroSlides) : undefined,
      pageHeroImages: data.pageHeroImages
        ? asJson(data.pageHeroImages)
        : undefined,
    },
  });

  return NextResponse.json(settings);
}
