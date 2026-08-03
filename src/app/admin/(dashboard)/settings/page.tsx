import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { siteConfig } from "@/content";
import { resolveAnnouncementEvent } from "@/lib/cms/resolve-content";

export default async function AdminSettingsPage() {
  const [row, announcementEvent] = await Promise.all([
    prisma.siteSettings.findUnique({
      where: { id: "default" },
    }),
    resolveAnnouncementEvent(),
  ]);

  const featuredAnnouncement = announcementEvent
    ? `${announcementEvent.title} — ${new Date(announcementEvent.date).toLocaleDateString("en-GH", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`
    : null;

  const initial = row
    ? {
        name: row.name,
        shortName: row.shortName,
        tagline: row.tagline,
        description: row.description,
        logoUrl: row.logoUrl,
        logoAlt: row.logoAlt,
        contact: row.contact as unknown as typeof siteConfig.contact,
        social: row.social as unknown as typeof siteConfig.social,
        announcementBar:
          (row.announcementBar as unknown as typeof siteConfig.announcementBar) ??
          siteConfig.announcementBar,
        heroSlides: row.heroSlides as unknown as
          | { src: string; alt: string }[]
          | null,
        pageHeroImages: row.pageHeroImages as unknown as Record<
          string,
          string
        > | null,
      }
    : null;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          Branding
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">
          Site settings
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-navy/60">
          Update the foundation name, tagline, logo, and contact details. The
          announcement bar shows your next upcoming event automatically.
        </p>
      </header>

      <SettingsForm
        initial={initial}
        featuredAnnouncement={featuredAnnouncement}
      />
    </div>
  );
}
