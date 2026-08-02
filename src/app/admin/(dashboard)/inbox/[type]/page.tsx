import { notFound } from "next/navigation";
import { InboxPanel, type InboxItem } from "@/components/admin/InboxPanel";
import { prisma } from "@/lib/db";
import { FORM_TYPES, type FormType } from "@/lib/submissions";

export const dynamic = "force-dynamic";

const SLUG_TO_TYPE: Record<string, FormType> = {
  contact: "CONTACT",
  testimonials: "TESTIMONIAL",
  events: "EVENT_REGISTRATION",
  volunteer: "VOLUNTEER",
  mentor: "MENTOR",
  fellowship: "FELLOWSHIP",
  sponsor: "SPONSOR",
  partner: "PARTNER",
  newsletter: "NEWSLETTER",
};

interface PageProps {
  params: Promise<{ type: string }>;
}

export default async function InboxTypePage({ params }: PageProps) {
  const { type: slug } = await params;
  const formType = SLUG_TO_TYPE[slug];
  if (!formType || !FORM_TYPES.includes(formType)) {
    notFound();
  }

  const rows = await prisma.formSubmission.findMany({
    where: { type: formType },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const items: InboxItem[] = rows.map((row) => ({
    id: row.id,
    type: row.type as FormType,
    status: row.status,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    relatedSlug: row.relatedSlug,
    relatedTitle: row.relatedTitle,
    payload:
      row.payload && typeof row.payload === "object"
        ? (row.payload as Record<string, unknown>)
        : {},
    createdAt: row.createdAt.toISOString(),
  }));

  return <InboxPanel type={formType} items={items} />;
}
