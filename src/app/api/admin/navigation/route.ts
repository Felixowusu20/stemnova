import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { navigation as defaultNavigation } from "@/content/navigation";
import { z } from "zod";

const navSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1),
  href: z.string().min(1),
  parentId: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

async function syncDefaultNavigation() {
  await prisma.navItem.deleteMany();

  let order = 0;
  for (const item of defaultNavigation) {
    const parent = await prisma.navItem.create({
      data: {
        label: item.label,
        href: item.href,
        sortOrder: order++,
        isVisible: true,
      },
    });

    if (item.children?.length) {
      let childOrder = 0;
      for (const child of item.children) {
        await prisma.navItem.create({
          data: {
            label: child.label,
            href: child.href,
            parentId: parent.id,
            sortOrder: childOrder++,
            isVisible: true,
          },
        });
      }
    }
  }

  revalidatePath("/", "layout");
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.navItem.findMany({
    orderBy: [{ parentId: "asc" }, { sortOrder: "asc" }],
    include: { children: { orderBy: { sortOrder: "asc" } } },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (body?.action === "reset") {
    await syncDefaultNavigation();
    const items = await prisma.navItem.findMany({
      where: { parentId: null },
      orderBy: { sortOrder: "asc" },
      include: { children: { orderBy: { sortOrder: "asc" } } },
    });
    return NextResponse.json({ ok: true, items });
  }

  const parsed = navSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const item = await prisma.navItem.create({
    data: {
      label: parsed.data.label,
      href: parsed.data.href,
      parentId: parsed.data.parentId || null,
      sortOrder: parsed.data.sortOrder,
      isVisible: parsed.data.isVisible,
    },
  });
  revalidatePath("/", "layout");
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = navSchema.extend({ id: z.string() }).safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const item = await prisma.navItem.update({
    where: { id: parsed.data.id },
    data: {
      label: parsed.data.label,
      href: parsed.data.href,
      parentId: parsed.data.parentId || null,
      sortOrder: parsed.data.sortOrder,
      isVisible: parsed.data.isVisible,
    },
  });
  revalidatePath("/", "layout");
  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  await prisma.navItem.delete({ where: { id } });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
