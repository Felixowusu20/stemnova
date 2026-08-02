import Link from "next/link";
import { ClearMockDataPanel } from "@/components/admin/ClearMockDataPanel";
import { CMS_COLLECTIONS } from "@/lib/cms/collections";
import { prisma } from "@/lib/db";

export default async function AdminContentIndexPage() {
  const [counts, contentCount, seededMediaCount] = await Promise.all([
    Promise.all(
      CMS_COLLECTIONS.map(async (collection) => ({
        ...collection,
        count: await prisma.contentItem.count({
          where: { collection: collection.id },
        }),
      }))
    ),
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
  ]);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          Content
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">
          All collections
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-navy/60">
          Edit every major content type used by the public website.
        </p>
      </header>

      <ClearMockDataPanel
        contentCount={contentCount}
        seededMediaCount={seededMediaCount}
      />

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
      </ul>
    </div>
  );
}
