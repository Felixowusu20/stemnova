import {
  getResolvedNavigation,
  getResolvedSiteConfig,
} from "@/lib/cms/queries";
import {
  resolveAnnouncementEvent,
  resolvePrograms,
} from "@/lib/cms/resolve-content";
import { SiteProviders } from "@/components/layout/SiteProviders";

function formatAnnouncementDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [settings, navigation, programs, announcementEvent] = await Promise.all(
    [
      getResolvedSiteConfig(),
      getResolvedNavigation(),
      resolvePrograms(),
      resolveAnnouncementEvent(),
    ]
  );

  const programmeLinks = programs.slice(0, 5).map((program) => ({
    label: program.title,
    href: `/programs/${program.slug}`,
  }));

  const resolvedSettings = announcementEvent
    ? {
        ...settings,
        announcementBar: {
          text: `${announcementEvent.title} — ${formatAnnouncementDate(announcementEvent.date)}`,
          href: `/events/${announcementEvent.slug}`,
          dismissible: settings.announcementBar?.dismissible ?? true,
        },
      }
    : settings;

  return (
    <SiteProviders
      settings={resolvedSettings}
      navigation={navigation}
      programmeLinks={programmeLinks}
    >
      {children}
    </SiteProviders>
  );
}
