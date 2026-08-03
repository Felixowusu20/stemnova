import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { EventRegisterButton } from "@/components/events/EventRegisterButton";
import { cn } from "@/lib/utils";
import type { Event, EventCategory } from "@/types";

const categoryLabels: Record<EventCategory, string> = {
  conference: "Conference",
  camp: "Camp",
  hackathon: "Hackathon",
  workshop: "Workshop",
  symposium: "Symposium",
  challenge: "Challenge",
  mentorship: "Mentorship",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm transition-shadow hover:shadow-md",
        "flex flex-row sm:flex-col",
        className
      )}
    >
      <div className="relative w-[38%] min-w-[7.5rem] shrink-0 overflow-hidden self-stretch sm:w-full sm:min-w-0 sm:aspect-[16/10]">
        <Image
          src={event.imageUrl}
          alt=""
          fill
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 640px) 40vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-2 top-2 rounded-full bg-teal px-2 py-0.5 text-[10px] font-semibold text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
          {categoryLabels[event.category]}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5 p-3 sm:gap-0 sm:p-6">
        <div className="min-w-0">
          <h3 className="font-display text-sm font-semibold leading-snug text-navy line-clamp-2 sm:text-xl sm:leading-tight">
            {event.title}
          </h3>

          <ul className="mt-2 space-y-1 text-[11px] text-navy/65 sm:mt-3 sm:space-y-2 sm:text-sm sm:text-navy/70">
            <li className="flex items-start gap-1.5 sm:gap-2">
              <Calendar
                className="mt-0.5 h-3 w-3 shrink-0 text-teal sm:h-4 sm:w-4 sm:text-navy"
                aria-hidden="true"
              />
              <time dateTime={event.date}>{formatDate(event.date)}</time>
            </li>
            <li className="flex items-start gap-1.5 sm:gap-2">
              <Clock
                className="mt-0.5 h-3 w-3 shrink-0 text-teal sm:h-4 sm:w-4 sm:text-navy"
                aria-hidden="true"
              />
              <span className="line-clamp-1">{event.time}</span>
            </li>
            <li className="hidden items-start gap-2 sm:flex">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-navy"
                aria-hidden="true"
              />
              {event.location}
            </li>
          </ul>

          <p className="mt-3 hidden flex-1 text-sm leading-relaxed text-navy/70 line-clamp-2 sm:block">
            {event.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1 rounded text-xs font-semibold text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:gap-1.5 sm:text-sm"
          >
            Details
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
          </Link>
          {!event.isPast && (
            <EventRegisterButton
              event={event}
              size="sm"
              variant="teal"
              className="w-full justify-center sm:w-auto"
            />
          )}
        </div>
      </div>
    </article>
  );
}
