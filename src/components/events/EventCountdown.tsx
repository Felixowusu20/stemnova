"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Event } from "@/types";

interface EventCountdownProps {
  event: Event;
  className?: string;
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

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white/10 px-4 py-3 sm:px-6 sm:py-4">
      <span className="font-display text-3xl font-bold tabular-nums sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wider text-white/80">
        {label}
      </span>
    </div>
  );
}

export function EventCountdown({ event, className }: EventCountdownProps) {
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
      <p className={cn("text-white/90", className)}>
        This event is happening soon or has already started.
      </p>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-sm font-medium uppercase tracking-wider text-white/80">
        Countdown to {event.title}
      </p>
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
    </div>
  );
}
