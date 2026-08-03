"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface PhilosophyQuoteSliderProps {
  label?: string;
  quotes: readonly string[];
  intervalMs?: number;
  /** `section` = standalone navy block; `embedded` = sits inside an existing hero. */
  variant?: "section" | "embedded";
}

export function PhilosophyQuoteSlider({
  label = "Leadership Philosophy",
  quotes,
  intervalMs = 6500,
  variant = "section",
}: PhilosophyQuoteSliderProps) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(0);
  const count = quotes.length;
  const embedded = variant === "embedded";

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % count) + count) % count;
      const current = activeRef.current;
      if (next === current) return;
      setPrevious(current);
      activeRef.current = next;
      setActive(next);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1 || paused) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const id = window.setInterval(() => {
      goTo(activeRef.current + 1);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [count, goTo, intervalMs, paused]);

  if (count === 0) return null;

  const body = (
    <div
      className={cn(
        embedded ? "mt-10 max-w-3xl text-left sm:mt-12" : "mx-auto max-w-3xl text-center"
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-teal">
        {label}
      </p>

      <div className="relative mt-4 overflow-hidden">
        <p
          className="invisible font-display text-xl font-semibold leading-snug sm:text-2xl"
          aria-hidden="true"
        >
          {quotes[active]}
        </p>

        {quotes.map((quote, index) => {
          const isActive = index === active;
          const isLeaving = index === previous && previous !== active;
          const shouldAnimate = isActive || isLeaving;

          return (
            <p
              key={`${index}-${quote.slice(0, 24)}`}
              className={cn(
                "font-display text-xl font-semibold leading-snug text-white sm:text-2xl",
                count > 1 && "absolute inset-x-0 top-0",
                count === 1 && "relative",
                shouldAnimate &&
                  "transition-[transform,opacity] duration-700 ease-in-out motion-reduce:transition-none",
                isActive && "translate-x-0 opacity-100",
                isLeaving && "-translate-x-full opacity-0",
                !isActive && !isLeaving && "translate-x-full opacity-0"
              )}
              aria-hidden={!isActive}
            >
              {quote}
            </p>
          );
        })}
      </div>

      {count > 1 && (
        <div
          className={cn(
            "mt-8 flex items-center gap-2",
            embedded ? "justify-start" : "justify-center"
          )}
          role="tablist"
          aria-label="Philosophy quotes"
        >
          {quotes.map((_, index) => (
            <button
              key={`quote-dot-${index}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show quote ${index + 1} of ${count}`}
              className={cn(
                "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                index === active
                  ? "w-7 bg-teal"
                  : "w-2.5 bg-white/30 hover:bg-white/50"
              )}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (embedded) {
    return (
      <div aria-roledescription="carousel" aria-label={label}>
        {body}
      </div>
    );
  }

  return (
    <section
      className="bg-navy py-16 sm:py-20"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <Container>{body}</Container>
    </section>
  );
}
