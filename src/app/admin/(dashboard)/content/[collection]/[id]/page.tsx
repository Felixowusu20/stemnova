import { notFound } from "next/navigation";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getCollectionMeta } from "@/lib/cms/collections";
import { prisma } from "@/lib/db";

export default async function AdminContentEditPage({
  params,
}: {
  params: Promise<{ collection: string; id: string }>;
}) {
  const { collection, id } = await params;
  const meta = getCollectionMeta(collection);
  if (!meta) notFound();

  const item =
    id === "new"
      ? null
      : await prisma.contentItem.findFirst({
          where: { id, collection },
        });

  if (id !== "new" && !item) notFound();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          {meta.label}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">
          {item ? `Edit: ${item.title}` : "Create item"}
        </h1>
      </header>
      <ContentEditor
        collection={collection}
        hasSlug={meta.hasSlug}
        initial={item}
      />
    </div>
  );
}
