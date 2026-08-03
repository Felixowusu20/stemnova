import Link from "next/link";
import { Inbox } from "lucide-react";
import { prisma } from "@/lib/db";
import {
  FORM_TYPE_HREFS,
  FORM_TYPE_LABELS,
  FORM_TYPES,
  type FormType,
} from "@/lib/submissions";

export const dynamic = "force-dynamic";

export default async function InboxIndexPage() {
  const counts = await Promise.all(
    FORM_TYPES.map(async (type) => {
      const [total, unread] = await Promise.all([
        prisma.formSubmission.count({ where: { type } }),
        prisma.formSubmission.count({ where: { type, status: "NEW" } }),
      ]);
      return { type, total, unread };
    })
  );

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          Inbox
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-navy">
          Form submissions
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-navy/60">
          Review contact messages, event registrations, testimonials, and
          get-involved applications from the public site.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {counts.map(({ type, total, unread }) => (
          <li key={type}>
            <Link
              href={FORM_TYPE_HREFS[type as FormType]}
              className="flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-5 shadow-sm transition hover:border-teal/30 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy">
                  <Inbox className="h-5 w-5" aria-hidden="true" />
                </span>
                {unread > 0 && (
                  <span className="rounded-full bg-teal px-2.5 py-1 text-xs font-bold text-white">
                    {unread} new
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-navy">
                {FORM_TYPE_LABELS[type as FormType]}
              </h2>
              <p className="mt-1 text-sm text-navy/55">{total} submissions</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
