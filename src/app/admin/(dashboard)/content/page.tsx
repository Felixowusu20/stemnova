import Link from "next/link";
import { ClearMockDataPanel } from "@/components/admin/ClearMockDataPanel";
import {
  ADMIN_SITE_NAV,
  resolveAdminHref,
  type AdminNavLeaf,
} from "@/lib/cms/admin-nav";
import { CMS_COLLECTIONS } from "@/lib/cms/collections";
import { prisma } from "@/lib/db";

const PAGE_LABELS: Record<string, string> = {
  "about-overview": "Overview",
  "about-story": "Our Story",
  "vision-mission": "Vision & Mission",
  leadership: "Leadership",
  impact: "Impact",
  contact: "Contact",
  governance: "Governance",
  roadmap: "Roadmap",
};

export default async function AdminContentIndexPage() {
  const [pages, contentCount, seededMediaCount, counts] = await Promise.all([
    prisma.contentItem.findMany({
      where: { collection: "pages", slug: { not: null } },
      select: { id: true, slug: true, title: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.contentItem.count({
      where: { collection: { not: "_system" } },
    }),
    prisma.mediaAsset.count({
      where: {
        OR: [
          { folder: { startsWith: "stemnova/seeded" } },
          { publicId: { startsWith: "seeded/" } },
        ],
      },
    }),
    Promise.all(
      CMS_COLLECTIONS.filter((c) => c.id !== "pages").map(async (collection) => ({
        ...collection,
        count: await prisma.contentItem.count({
          where: { collection: collection.id },
        }),
      }))
    ),
  ]);

  const pageIdBySlug: Record<string, string> = {};
  for (const page of pages) {
    if (page.slug) pageIdBySlug[page.slug] = page.id;
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          Content
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">
          Edit website content
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-navy/60">
          Organised to match the public site — open a section to edit the same
          pages visitors see.
        </p>
      </header>

      <ClearMockDataPanel
        contentCount={contentCount}
        seededMediaCount={seededMediaCount}
      />

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-navy">
          Website pages
        </h2>
        <ul className="grid gap-4 lg:grid-cols-2">
          {ADMIN_SITE_NAV.map((item) => {
            if (item.kind === "group") {
              return (
                <li
                  key={item.id}
                  className="rounded-2xl border border-navy/8 bg-white p-5 shadow-sm"
                >
                  <p className="font-display text-lg font-semibold text-navy">
                    {item.label}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.children.map((child: AdminNavLeaf) => (
                      <li key={child.label}>
                        <Link
                          href={resolveAdminHref(child, pageIdBySlug)}
                          className="flex items-center justify-between rounded-xl border border-navy/8 px-3 py-2.5 text-sm font-medium text-navy transition hover:border-teal/30 hover:bg-light/60"
                        >
                          {child.label}
                          <span className="text-xs text-navy/40">Edit</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  href={resolveAdminHref(item, pageIdBySlug)}
                  className="block h-full rounded-2xl border border-navy/8 bg-white p-5 shadow-sm transition hover:border-teal/30 hover:shadow-md"
                >
                  <p className="font-display text-lg font-semibold text-navy">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-navy/60">
                    Edit {item.label.toLowerCase()} content on the live site.
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-navy">
          All collections
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {counts.map((collection) => (
            <li key={collection.id}>
              <Link
                href={`/admin/content/${collection.id}`}
                className="block h-full rounded-2xl border border-navy/8 bg-white p-5 shadow-sm transition hover:border-teal/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-lg font-semibold text-navy">
                    {collection.label}
                  </p>
                  <span className="rounded-full bg-navy/5 px-2.5 py-1 text-xs font-semibold text-navy/70">
                    {collection.count}
                  </span>
                </div>
                <p className="mt-2 text-sm text-navy/60">
                  {collection.description}
                </p>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/admin/content/pages"
              className="block h-full rounded-2xl border border-navy/8 bg-white p-5 shadow-sm transition hover:border-teal/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-lg font-semibold text-navy">
                  Pages
                </p>
                <span className="rounded-full bg-navy/5 px-2.5 py-1 text-xs font-semibold text-navy/70">
                  {pages.length}
                </span>
              </div>
              <p className="mt-2 text-sm text-navy/60">
                {pages
                  .map((page) =>
                    page.slug
                      ? PAGE_LABELS[page.slug] || page.title
                      : page.title
                  )
                  .join(", ")}
              </p>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
