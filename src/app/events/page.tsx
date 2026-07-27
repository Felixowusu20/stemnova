import type { Metadata } from "next";
import Link from "next/link";
import { EventsPageContent } from "@/components/events/EventsPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
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
    "Discover STEMNova conferences, STEM camps, workshops, and research gatherings across Africa.",
  openGraph: {
    title: "Events | STEMNova Foundation",
    description:
      "Explore STEMNova conferences, camps, workshops, and research gatherings across Africa.",
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
      <section className="bg-light pt-4 pb-2 sm:pt-6">
        <Container>
          <nav className="mb-3 text-sm text-navy/55" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-navy">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-navy">Events</li>
            </ol>
          </nav>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Events
          </h1>
        </Container>
      </section>
      <EventsPageContent upcoming={upcoming} past={past} />
    </>
  );
}
