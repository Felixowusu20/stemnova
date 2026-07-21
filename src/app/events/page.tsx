import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { EventsPageContent } from "@/components/events/EventsPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getUpcomingEvents, getPastEvents } from "@/content";
import { images } from "@/content/images";
import { getEventSchema } from "@/lib/seo-schemas";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const upcoming = getUpcomingEvents();
const past = getPastEvents();

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover STEMNova conferences, STEM camps, hackathons, workshops, research symposiums, innovation challenges, and mentorship sessions across Africa.",
  openGraph: {
    title: "Events | STEMNova Foundation",
    description:
      "Register for STEMNova conferences, camps, hackathons, workshops, and research symposiums.",
    url: `${siteUrl}/events`,
    images: [{ url: images.hero.events, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${siteUrl}/events`,
  },
};

export default function EventsPage() {
  const eventSchemas = upcoming.map((event) =>
    getEventSchema(event, `${siteUrl}/events#${event.slug}`)
  );

  return (
    <>
      <JsonLd data={eventSchemas} />
      <PageHero
        title="Events"
        description="Conferences, STEM camps, hackathons, workshops, research symposiums, innovation challenges, and mentorship sessions. Event listings are illustrative until officially confirmed."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
        backgroundImage={images.hero.events}
      />
      <EventsPageContent upcoming={upcoming} past={past} />
    </>
  );
}
