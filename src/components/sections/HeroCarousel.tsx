"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content";
import { optimizedImageUrl } from "@/lib/portrait-url";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: string;
  /** When false, the site name, tagline, and buttons stay off this slide. */
  showCaption?: boolean;
}

function slideShowsCaption(slide: HeroSlide | undefined): boolean {
  return slide?.showCaption !== false;
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

  const showCaption = slideShowsCaption(slides[active]);

  return (
    <section
      className="relative h-[min(78svh,680px)] min-h-[420px] overflow-hidden bg-navy"
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
            src={optimizedImageUrl(slide.src, 1600) || slide.src}
            alt={slide.alt}
            fill
            unoptimized
            priority={index === 0}
            className={cn(
              slideShowsCaption(slide) ? "object-cover" : "object-contain",
              index === active &&
                slideShowsCaption(slide) &&
                "motion-safe:animate-[heroKenBurns_12s_ease-out_forwards]"
            )}
            sizes="100vw"
          />
        </div>
      ))}

      {showCaption ? (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-navy/30"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy/65 via-transparent to-navy/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-70"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 35%, rgba(20,184,166,0.28), transparent 42%), radial-gradient(circle at 82% 70%, rgba(34,197,94,0.14), transparent 40%)",
            }}
          />
        </>
      ) : null}

      <Container className="relative flex h-full flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        {showCaption ? (
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
        ) : (
          <h1 className="sr-only">{siteConfig.tagline}</h1>
        )}

        {count > 1 && (
          <div
            className={cn(
              "mt-10 flex w-fit items-center gap-2",
              !showCaption && "rounded-full bg-navy/55 px-3 py-2 backdrop-blur-sm"
            )}
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
