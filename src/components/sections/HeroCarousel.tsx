"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  slides: readonly HeroSlide[];
  intervalMs?: number;
}

export function HeroCarousel({
  slides,
  intervalMs = 5500,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1 || paused) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [count, intervalMs, paused]);

  if (count === 0) return null;

  return (
    <section
      className="relative h-[min(78svh,680px)] min-h-[420px] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="STEMNova Foundation highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === active ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className={cn(
              "object-cover",
              index === active && "motion-safe:animate-[heroKenBurns_12s_ease-out_forwards]"
            )}
            sizes="100vw"
          />
        </div>
      ))}

      <div
        className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/45 to-navy/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/20"
        aria-hidden="true"
      />

      <Container className="relative flex h-full flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-teal">
            {siteConfig.name}
          </p>
          <h1 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
            {siteConfig.tagline}
          </h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/get-involved" variant="teal" size="lg">
              Join Our Mission
            </Button>
            <Button
              href="/donate"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Support STEMNova
            </Button>
          </div>
        </div>

        {count > 1 && (
          <div
            className="mt-10 flex items-center gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show slide ${index + 1} of ${count}`}
                className={cn(
                  "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                  index === active
                    ? "w-8 bg-teal"
                    : "w-2.5 bg-white/45 hover:bg-white/70"
                )}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
