import Link from "next/link";
import {
  FileText,
  ImageIcon,
  Inbox,
  Settings,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { CMS_COLLECTIONS } from "@/lib/cms/collections";
import { getResolvedSiteConfig } from "@/lib/cms/queries";

export default async function AdminDashboardPage() {
  const [settings, mediaCount, contentCount, navCount, inboxNew] =
    await Promise.all([
      getResolvedSiteConfig(),
      prisma.mediaAsset.count(),
      prisma.contentItem.count(),
      prisma.navItem.count(),
      prisma.formSubmission.count({ where: { status: "NEW" } }),
    ]);

  const stats = [
    { label: "New inbox items", value: inboxNew, href: "/admin/inbox" },
    { label: "Content items", value: contentCount, href: "/admin/content" },
    { label: "Media assets", value: mediaCount, href: "/admin/media" },
    { label: "Nav links", value: navCount, href: "/admin/navigation" },
  ];

  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-3xl bg-[#071526] px-6 py-8 text-white sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Dashboard
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Manage {settings.name} — branding, navigation, media, and every
              public content collection from one place.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/5"
          >
            View live site
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-navy/8 bg-white p-5 shadow-sm transition hover:border-teal/30 hover:shadow-md"
          >
            <p className="text-sm text-navy/55">{stat.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-navy">
              {stat.value}
            </p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-navy">
            Quick actions
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                href: "/admin/inbox",
                label: "Open form inbox",
                icon: Inbox,
              },
              {
                href: "/admin/content/events",
                label: "Edit events",
                icon: FileText,
              },
              {
                href: "/admin/settings",
                label: "Edit site settings & logo",
                icon: Settings,
              },
              {
                href: "/admin/media",
                label: "Upload media",
                icon: ImageIcon,
              },
            ].map((action) => (
              <li key={action.href}>
                <Link
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl border border-navy/8 px-4 py-3 text-sm font-medium text-navy transition hover:border-teal/40 hover:bg-teal/5"
                >
                  <action.icon className="h-4 w-4 text-teal" aria-hidden="true" />
                  {action.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-navy">
            Branding snapshot
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-navy/50">Site name</dt>
              <dd className="font-medium text-navy">{settings.name}</dd>
            </div>
            <div>
              <dt className="text-navy/50">Tagline</dt>
              <dd className="text-navy/80">{settings.tagline}</dd>
            </div>
            <div>
              <dt className="text-navy/50">Logo</dt>
              <dd className="truncate text-navy/80">{settings.logoUrl}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-navy">
          Content collections
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {CMS_COLLECTIONS.map((collection) => (
            <li key={collection.id}>
              <Link
                href={`/admin/content/${collection.id}`}
                className="block h-full rounded-2xl border border-navy/8 bg-white p-5 shadow-sm transition hover:border-teal/30 hover:shadow-md"
              >
                <p className="font-display text-base font-semibold text-navy">
                  {collection.label}
                </p>
                <p className="mt-1 text-sm text-navy/60">
                  {collection.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
