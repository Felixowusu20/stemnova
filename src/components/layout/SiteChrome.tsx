import {
  getResolvedNavigation,
  getResolvedSiteConfig,
} from "@/lib/cms/queries";
import { resolvePrograms } from "@/lib/cms/resolve-content";
import { SiteProviders } from "@/components/layout/SiteProviders";

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [settings, navigation, programs] = await Promise.all([
    getResolvedSiteConfig(),
    getResolvedNavigation(),
    resolvePrograms(),
  ]);

  const programmeLinks = programs.slice(0, 5).map((program) => ({
    label: program.title,
    href: `/programs/${program.slug}`,
  }));

  return (
    <SiteProviders
      settings={settings}
      navigation={navigation}
      programmeLinks={programmeLinks}
    >
      {children}
    </SiteProviders>
  );
}
