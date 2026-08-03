import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionItemsTable } from "@/components/admin/CollectionItemsTable";
import { getCollectionMeta } from "@/lib/cms/collections";
import { prisma } from "@/lib/db";

export default async function AdminCollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const meta = getCollectionMeta(collection);
  if (!meta) notFound();

  const items = await prisma.contentItem.findMany({
    where: { collection },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Collection
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy">
            {meta.label}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-navy/60">
            {meta.description}
          </p>
        </div>
        <Link
          href={`/admin/content/${collection}/new`}
          className="rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white"
        >
          Add item
        </Link>
      </header>

      <CollectionItemsTable
        collection={collection}
        items={items.map((item) => {
          const data =
            item.data && typeof item.data === "object" && item.data !== null
              ? (item.data as Record<string, unknown>)
              : null;
          const badge =
            collection === "team"
              ? data?.isFounder
                ? "Co-Founder"
                : "Leadership"
              : null;

          return {
            id: item.id,
            title: item.title,
            slug: item.slug,
            status: item.status,
            updatedAt: item.updatedAt.toISOString(),
            badge,
          };
        })}
      />
    </div>
  );
}
