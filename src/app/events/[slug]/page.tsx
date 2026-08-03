import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { EventCountdown } from "@/components/events/EventCountdown";
import { EventRegisterButton } from "@/components/events/EventRegisterButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { events } from "@/content";
import { resolveEventBySlug } from "@/lib/cms/resolve-content";
import { getEventSchema } from "@/lib/seo-schemas";
import { getSiteUrl } from "@/lib/site-url";
import type { EventCategory } from "@/types";

export const dynamic = "force-dynamic";

const categoryLabels: Record<EventCategory, string> = {
  conference: "Conference",
  camp: "Camp",
  hackathon: "Hackathon",
  workshop: "Workshop",
  symposium: "Symposium",
  challenge: "Challenge",
  mentorship: "Mentorship",
};

const siteUrl = getSiteUrl();

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await resolveEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: `${event.title} | STEMNova Foundation`,
      description: event.description,
      url: `${siteUrl}/events/${event.slug}`,
      images: [{ url: event.imageUrl, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${siteUrl}/events/${event.slug}`,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;
  const event = await resolveEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={getEventSchema(event, `${siteUrl}/events/${event.slug}`)}
      />
      <PageHero
        title={event.title}
        description={event.description}
        backgroundImage={event.imageUrl}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Link
            href="/events"
            className="mb-8 inline-flex items-center gap-2 rounded text-sm font-semibold text-navy/70 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to events
          </Link>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Mobile summary card: image left, details + register right */}
            <div className="lg:hidden">
              <div className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm">
                <div className="flex gap-3 p-2.5">
                  <div className="relative w-[38%] min-w-[7.25rem] shrink-0 overflow-hidden rounded-xl self-stretch">
                    <div className="relative h-full min-h-[10rem]">
                      <Image
                        src={event.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="38vw"
                        priority
                      />
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-1 pr-1">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal">
                        {categoryLabels[event.category]}
                      </p>
                      <ul className="mt-2 space-y-1.5 text-[11px] text-navy/75">
                        <li className="flex items-start gap-1.5">
                          <Calendar
                            className="mt-0.5 h-3 w-3 shrink-0 text-teal"
                            aria-hidden="true"
                          />
                          <time dateTime={event.date}>
                            {formatDate(event.date)}
                          </time>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Clock
                            className="mt-0.5 h-3 w-3 shrink-0 text-teal"
                            aria-hidden="true"
                          />
                          <span className="line-clamp-1">{event.time}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <MapPin
                            className="mt-0.5 h-3 w-3 shrink-0 text-teal"
                            aria-hidden="true"
                          />
                          <span className="line-clamp-2">{event.location}</span>
                        </li>
                      </ul>
                    </div>
                    {!event.isPast && (
                      <div className="mt-3 space-y-2">
                        <div className="rounded-lg bg-navy px-2.5 py-2 text-white">
                          <EventCountdown event={event} compact />
                        </div>
                        <EventRegisterButton
                          event={event}
                          size="sm"
                          variant="teal"
                          label="Register"
                          className="w-full justify-center"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10 lg:col-span-7">
              <div>
                <p className="hidden text-sm font-semibold uppercase tracking-[0.16em] text-teal lg:block">
                  {categoryLabels[event.category]}
                </p>
                <SectionHeading title="About This Event" className="lg:mt-3" />
                <p className="mt-4 text-base leading-relaxed text-navy sm:text-lg">
                  {event.about}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-navy">
                  Highlights
                </h2>
                <ul className="mt-4 space-y-3">
                  {event.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-navy sm:text-base"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-navy">
                  Agenda
                </h2>
                <ol className="mt-4 space-y-3">
                  {event.agenda.map((item) => (
                    <li
                      key={`${item.time}-${item.title}`}
                      className="flex gap-4 rounded-xl border border-navy/8 bg-white px-4 py-3"
                    >
                      <span className="w-24 shrink-0 text-sm font-semibold text-teal sm:w-28">
                        {item.time}
                      </span>
                      <span className="text-sm text-navy sm:text-base">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-navy/8 bg-light p-6">
                <div className="flex items-start gap-3">
                  <Users
                    className="mt-0.5 h-5 w-5 shrink-0 text-blue"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-display text-xl font-semibold text-navy">
                      Who Should Attend
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-navy/80 sm:text-base">
                      {event.audience}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hidden lg:col-span-5 lg:block">
              <div className="sticky top-28 space-y-6">
                <div className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={event.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40vw"
                      priority
                    />
                  </div>
                  <div className="space-y-4 p-6">
                    <ul className="space-y-3 text-sm text-navy/80">
                      <li className="flex items-start gap-3">
                        <Calendar
                          className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                          aria-hidden="true"
                        />
                        <time dateTime={event.date}>
                          {formatDate(event.date)}
                        </time>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock
                          className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                          aria-hidden="true"
                        />
                        {event.time}
                      </li>
                      <li className="flex items-start gap-3">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                          aria-hidden="true"
                        />
                        {event.location}
                      </li>
                    </ul>

                    {!event.isPast && (
                      <div className="rounded-xl bg-navy p-4 text-white">
                        <EventCountdown event={event} />
                      </div>
                    )}

                    {!event.isPast && (
                      <EventRegisterButton
                        event={event}
                        size="lg"
                        variant="teal"
                        label="Register for this event"
                        className="w-full"
                      />
                    )}

                    {event.isIllustrative && (
                      <p className="text-xs text-navy/50">
                        Illustrative schedule. Final details will be managed from
                        the admin panel.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
