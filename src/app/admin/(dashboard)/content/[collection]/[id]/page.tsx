import { notFound } from "next/navigation";
import { ContentEditor } from "@/components/admin/ContentEditor";
import {
  normalizeFooterContact,
  normalizeFooterSocial,
  type FooterContactShape,
  type FooterSocialLink,
} from "@/lib/cms/footer-contact";
import { getCollectionMeta } from "@/lib/cms/collections";
import { getResolvedSiteConfig } from "@/lib/cms/queries";
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

  const isContactPage = collection === "pages" && item?.slug === "contact";
  const site = isContactPage ? await getResolvedSiteConfig() : null;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          {meta.label}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">
          {item ? `Edit: ${item.title}` : "Create item"}
        </h1>
        {isContactPage ? (
          <p className="mt-2 max-w-2xl text-sm text-navy/60">
            Update footer email, phone, address, and social links here — they
            appear site-wide.
          </p>
        ) : null}
      </header>
      <ContentEditor
        collection={collection}
        hasSlug={meta.hasSlug}
        initial={item}
        siteContactInitial={
          site
            ? normalizeFooterContact(site.contact as FooterContactShape)
            : null
        }
        siteSocialInitial={
          site ? normalizeFooterSocial(site.social as FooterSocialLink[]) : null
        }
      />
    </div>
  );
}
