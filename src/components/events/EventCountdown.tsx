"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Event } from "@/types";

interface EventCountdownProps {
  event: Event;
  className?: string;
  /** Tighter layout for mobile side-by-side cards. */
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string): TimeLeft | null {
  const target = new Date(`${targetDate}T00:00:00`).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({
  value,
  label,
  compact,
}: {
  value: number;
  label: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl bg-white/10",
        compact ? "rounded-lg px-1.5 py-1.5" : "px-4 py-3 sm:px-6 sm:py-4"
      )}
    >
      <span
        className={cn(
          "font-display font-bold tabular-nums",
          compact ? "text-sm" : "text-3xl sm:text-4xl"
        )}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "uppercase tracking-wider text-white/80",
          compact ? "mt-0.5 text-[8px]" : "mt-1 text-xs"
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function EventCountdown({
  event,
  className,
  compact = false,
}: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    getTimeLeft(event.date)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(event.date));
    }, 1000);

    return () => clearInterval(timer);
  }, [event.date]);

  if (!timeLeft) {
    return (
      <p className={cn("text-white/90", compact && "text-[11px]", className)}>
        This event is happening soon or has already started.
      </p>
    );
  }

  if (compact) {
    return (
      <div className={cn("space-y-1.5", className)}>
        <p className="text-[9px] font-medium uppercase tracking-wider text-white/70">
          Starts in
        </p>
        <div
          className="grid grid-cols-4 gap-1"
          role="timer"
          aria-live="polite"
          aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds until ${event.title}`}
        >
          <CountdownUnit value={timeLeft.days} label="D" compact />
          <CountdownUnit value={timeLeft.hours} label="H" compact />
          <CountdownUnit value={timeLeft.minutes} label="M" compact />
          <CountdownUnit value={timeLeft.seconds} label="S" compact />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-white/80">
          Starts in
        </p>
        <p className="mt-1 text-xs text-white/50">Illustrative schedule</p>
      </div>
      <div
        className="grid grid-cols-4 gap-2 sm:gap-4"
        role="timer"
        aria-live="polite"
        aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds until ${event.title}`}
      >
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Mins" />
        <CountdownUnit value={timeLeft.seconds} label="Secs" />
      </div>
      <dl className="grid gap-2 border-t border-white/15 pt-4 text-sm text-white/80 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wider text-white/50">Date</dt>
          <dd className="mt-0.5 font-medium text-white">
            <time dateTime={event.date}>
              {new Date(event.date).toLocaleDateString("en-GH", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-white/50">Time</dt>
          <dd className="mt-0.5 font-medium text-white">{event.time}</dd>
        </div>
      </dl>
    </div>
  );
}
