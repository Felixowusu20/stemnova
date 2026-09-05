import { prisma } from "@/lib/db";
import { siteConfig, images } from "@/content";
import type { NavItem, SiteConfig } from "@/types";
import type { ContentStatus } from "@/generated/prisma/client";

export type ResolvedSiteConfig = SiteConfig & {
  logoUrl: string;
  logoAlt: string;
  faviconUrl?: string | null;
  heroSlides: { src: string; alt: string }[];
  pageHeroImages: Record<string, string>;
};

const DEFAULT_LOGO = "/images/stemnova-logo.jpg";

function fallbackSettings(): ResolvedSiteConfig {
  return {
    ...siteConfig,
    logoUrl: DEFAULT_LOGO,
    logoAlt: siteConfig.name,
    heroSlides: [...images.homeSlides],
    pageHeroImages: { ...images.hero },
  };
}

export async function getResolvedSiteConfig(): Promise<ResolvedSiteConfig> {
  try {
    const row = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!row) return fallbackSettings();

    return {
      name: row.name,
      shortName: row.shortName,
      tagline: row.tagline,
      description: row.description,
      contact: row.contact as unknown as SiteConfig["contact"],
      social: row.social as unknown as SiteConfig["social"],
      announcementBar:
        (row.announcementBar as unknown as SiteConfig["announcementBar"]) ??
        siteConfig.announcementBar,
      logoUrl: row.logoUrl || DEFAULT_LOGO,
      logoAlt: row.logoAlt || row.name,
      faviconUrl: row.faviconUrl,
      heroSlides:
        (row.heroSlides as unknown as { src: string; alt: string }[] | null) ??
        [...images.homeSlides],
      pageHeroImages:
        (row.pageHeroImages as unknown as Record<string, string> | null) ?? {
          ...images.hero,
        },
    };
  } catch {
    return fallbackSettings();
  }
}

async function withCmsProgrammeChildren(nav: NavItem[]): Promise<NavItem[]> {
  try {
    const programs = await prisma.contentItem.findMany({
      where: { collection: "programs", status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      select: { title: true, slug: true },
    });

    if (programs.length === 0) return nav;

    return nav.map((item) => {
      if (item.href !== "/programs") return item;

      const children = [
        ...programs
          .filter((program) => program.slug)
          .map((program) => ({
            label: program.title,
            href: `/programs/${program.slug}`,
          })),
        { label: "View All Programmes", href: "/programs" },
      ];

      return { ...item, children };
    });
  } catch {
    return nav;
  }
}

export async function getResolvedNavigation(): Promise<NavItem[]> {
  try {
    const { navigation: staticNavigation } = await import("@/content");
    const roots = await prisma.navItem.findMany({
      where: { parentId: null, isVisible: true },
      orderBy: { sortOrder: "asc" },
      include: {
        children: {
          where: { isVisible: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    const base =
      roots.length === 0
        ? staticNavigation
        : roots.map((item) => ({
            label: item.label,
            href: item.href,
            children:
              item.children.length > 0
                ? item.children.map((child) => ({
                    label: child.label,
                    href: child.href,
                  }))
                : undefined,
          }));

    // Keep About dropdown free of Governance/Roadmap even if older CMS nav still has them
    const cleaned = base.map((item) => {
      if (item.href !== "/about" || !item.children?.length) return item;
      return {
        ...item,
        children: item.children.filter(
          (child) =>
            child.href !== "/about/governance" &&
            child.href !== "/about/roadmap" &&
            child.label.toLowerCase() !== "governance" &&
            child.label.toLowerCase() !== "roadmap"
        ),
      };
    });

    return withCmsProgrammeChildren(cleaned);
  } catch {
    const { navigation: staticNavigation } = await import("@/content");
    return withCmsProgrammeChildren(staticNavigation);
  }
}

/**
 * True once the CMS has been seeded or content has been managed in admin.
 * When active, empty collections stay empty instead of resurrecting static mock data.
 */
export async function isCmsActive(): Promise<boolean> {
  try {
    const marker = await prisma.contentItem.findFirst({
      where: { collection: "_system", slug: "cms-active" },
      select: { id: true },
    });
    if (marker) return true;

    const count = await prisma.contentItem.count({
      where: { collection: { not: "_system" } },
    });
    return count > 0;
  } catch {
    return false;
  }
}

export async function getContentByCollection(
  collection: string,
  options?: { status?: ContentStatus; take?: number }
) {
  try {
    return await prisma.contentItem.findMany({
      where: {
        collection,
        status: options?.status ?? "PUBLISHED",
      },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      take: options?.take,
    });
  } catch {
    return [];
  }
}

export async function getContentBySlug(collection: string, slug: string) {
  try {
    return await prisma.contentItem.findFirst({
      where: {
        collection,
        slug,
        status: "PUBLISHED",
      },
    });
  } catch {
    return null;
  }
}

export async function getPhilosophyQuotes(): Promise<string[]> {
  const items = await getContentByCollection("philosophy-quotes");
  return items.map((item) => item.body || item.title).filter(Boolean);
}

export async function requireAdminSession() {
  const { auth } = await import("@/lib/auth");
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
