import { prisma } from "@/lib/db";
import { defaultHomePageData } from "@/lib/cms/home-sections";
import type { Prisma } from "@/generated/prisma/client";

export async function ensureHomePage() {
  try {
    const existing = await prisma.contentItem.findUnique({
      where: { collection_slug: { collection: "pages", slug: "home" } },
      select: { id: true, slug: true },
    });
    if (existing) return existing;

    return prisma.contentItem.create({
      data: {
        collection: "pages",
        slug: "home",
        title: "Home page",
        excerpt: "Homepage section visibility and copy",
        status: "PUBLISHED",
        sortOrder: 0,
        publishedAt: new Date(),
        data: defaultHomePageData() as unknown as Prisma.InputJsonValue,
      },
      select: { id: true, slug: true },
    });
  } catch {
    return null;
  }
}
