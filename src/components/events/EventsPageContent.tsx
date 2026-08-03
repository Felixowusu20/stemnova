"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Images, MapPin } from "lucide-react";
import { EventCard } from "@/components/cards/EventCard";
import { EventCountdown } from "@/components/events/EventCountdown";
import { EventRegisterButton } from "@/components/events/EventRegisterButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/content/images";
import type { Event } from "@/types";

interface EventsPageContentProps {
  upcoming: Event[];
  past: Event[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function EventsPageContent({ upcoming, past }: EventsPageContentProps) {
  const nextEvent = upcoming[0] ?? null;
  const otherUpcoming = upcoming.slice(1);

  return (
    <>
      {nextEvent ? (
        <section className="relative overflow-hidden bg-navy text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 35%, #2563EB 0%, transparent 45%), radial-gradient(circle at 88% 65%, #14B8A6 0%, transparent 42%)",
            }}
          />
          <Container className="relative py-8 sm:py-12 lg:py-14">
            <div className="grid gap-5 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              {/* Mobile: image left + details right; desktop: text first, image second */}
              <div className="order-1 flex gap-3 sm:hidden">
                <div className="relative w-[40%] min-w-[7.75rem] shrink-0 overflow-hidden rounded-2xl">
                  <div className="relative h-full min-h-[9.5rem]">
                    <Image
                      src={nextEvent.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40vw"
                      priority
                    />
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-teal">
                      Featured Event
                    </p>
                    <h2 className="mt-1.5 font-display text-base font-bold leading-snug">
                      {nextEvent.title}
                    </h2>
                    <ul className="mt-2.5 space-y-1.5 text-[11px] text-white/80">
                      <li className="flex items-start gap-1.5">
                        <Calendar
                          className="mt-0.5 h-3 w-3 shrink-0 text-teal"
                          aria-hidden="true"
                        />
                        <time dateTime={nextEvent.date}>
                          {formatDate(nextEvent.date)}
                        </time>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <MapPin
                          className="mt-0.5 h-3 w-3 shrink-0 text-teal"
                          aria-hidden="true"
                        />
                        <span className="line-clamp-1">{nextEvent.location}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <Button
                      href={`/events/${nextEvent.slug}`}
                      variant="teal"
                      size="sm"
                      className="w-full justify-center"
                    >
                      View event
                    </Button>
                    <EventRegisterButton
                      event={nextEvent}
                      size="sm"
                      variant="outline"
                      label="Register"
                      className="w-full justify-center border-white text-white hover:bg-white/10 hover:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden sm:block lg:col-span-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
                  Featured Event
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">
                  {nextEvent.title}
                </h2>
                <ul className="mt-6 space-y-3 text-sm text-white/85 sm:text-base">
                  <li className="flex items-start gap-3">
                    <Calendar
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                      aria-hidden="true"
                    />
                    <time dateTime={nextEvent.date}>
                      {formatDate(nextEvent.date)}
                    </time>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                      aria-hidden="true"
                    />
                    {nextEvent.time}
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                      aria-hidden="true"
                    />
                    {nextEvent.location}
                  </li>
                </ul>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
                  {nextEvent.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    href={`/events/${nextEvent.slug}`}
                    variant="teal"
                    size="lg"
                  >
                    Enquire About This Event
                  </Button>
                  <EventRegisterButton
                    event={nextEvent}
                    size="lg"
                    variant="outline"
                    label="Register"
                    className="border-white text-white hover:bg-white/10 hover:text-white"
                  />
                </div>
              </div>
              <div className="order-2 hidden sm:block lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={nextEvent.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <EventCountdown event={nextEvent} />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <section className="py-16 sm:py-20">
          <Container>
            <EmptyState
              title="New events coming soon"
              description="Confirmed dates for conferences, camps, and workshops will appear here. Contact us if you would like to host or partner on an event."
              actionLabel="Contact STEMNova"
              actionHref="/contact"
            />
          </Container>
        </section>
      )}

      {otherUpcoming.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Calendar"
              title="More Upcoming Events"
              description="Additional gatherings that bring African STEM talent together."
              className="mb-10"
            />
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:gap-8">
              {otherUpcoming.map((event) => (
                <li key={event.id} id={event.slug}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {past.length > 0 && (
        <section className="bg-light py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Highlights"
              title="Past Events"
              description="Moments from gatherings that shaped STEMNova programmes across Africa."
              className="mb-10"
            />
            <ul className="space-y-3 sm:space-y-4">
              {past.map((event) => (
                <li
                  key={event.id}
                  className="flex gap-3 overflow-hidden rounded-2xl border border-navy/8 bg-white p-2.5 shadow-sm sm:grid sm:grid-cols-[180px_1fr] sm:gap-5 sm:p-5 lg:grid-cols-[220px_1fr]"
                >
                  <div className="relative w-[36%] min-w-[6.75rem] shrink-0 overflow-hidden rounded-xl self-stretch sm:w-auto sm:min-w-0 sm:aspect-auto sm:min-h-[140px]">
                    <Image
                      src={event.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 36vw, 220px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1 sm:pr-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-teal sm:text-xs">
                      {event.category}
                    </p>
                    <h3 className="mt-0.5 font-display text-sm font-semibold leading-snug text-navy line-clamp-2 sm:mt-1 sm:text-xl">
                      {event.title}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-navy/65 sm:mt-2 sm:gap-x-4 sm:text-sm">
                      <time dateTime={event.date}>{formatDate(event.date)}</time>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <p className="mt-3 hidden max-w-2xl text-sm leading-relaxed text-navy/70 sm:block">
                      {event.description}
                    </p>
                    <Link
                      href={`/events/${event.slug}`}
                      className="mt-2 inline-flex text-xs font-semibold text-blue hover:text-navy sm:mt-3 sm:text-sm"
                    >
                      View event details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className={past.length > 0 ? "py-16 sm:py-20" : "bg-light py-16 sm:py-20"}>
        <Container>
          <div className="overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[260px] lg:min-h-full">
                <Image
                  src={images.gallery[0]}
                  alt="STEMNova programme moments"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
                  Programme Gallery
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
                  Moments from Our Programmes
                </h2>
                <p className="mt-4 text-base leading-relaxed text-navy/70">
                  Browse photos from STEM camps, fellowships, workshops, and
                  community gatherings across Africa.
                </p>
                <div className="mt-8">
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                  >
                    <Images className="h-4 w-4" aria-hidden="true" />
                    Open Programme Gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              eyebrow="Host With Us"
              title="Partner on a STEMNova Event"
              description="Universities, schools, and organisations can collaborate with us to host camps, workshops, and research gatherings."
              align="center"
            />
            <div className="mt-8 flex justify-center">
              <Button href="/partner" variant="secondary" size="lg">
                Become a Partner
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
