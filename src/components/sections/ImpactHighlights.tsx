"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImpactCounter } from "@/components/ui/ImpactCounter";
import { IMPACT_DATA_DISCLAIMER } from "@/content";
import type { StatItem } from "@/types";

interface ImpactHighlightsProps {
  stats: StatItem[];
}

export function ImpactHighlights({ stats }: ImpactHighlightsProps) {
  const [featured, ...rest] = stats;
  const supporting = rest.slice(0, 5);

  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(20,184,166,0.18), transparent), radial-gradient(ellipse 40% 40% at 100% 100%, rgba(37,99,235,0.12), transparent)",
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
            Our Impact
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Measuring What Matters
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Early indicators of STEMNova&apos;s reach across Africa.
          </p>
        </div>

        {featured && (
          <div className="mx-auto mt-14 max-w-xl border-b border-white/10 pb-12 text-center">
            <ImpactCounter
              stat={{ ...featured, note: undefined }}
              className="border-0 bg-transparent p-0 shadow-none [&_.font-display]:text-5xl [&_.font-display]:text-teal sm:[&_.font-display]:text-6xl [&_p]:text-white [&_p.text-sm]:mt-3 [&_p.text-sm]:text-base"
            />
          </div>
        )}

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {supporting.map((stat, index) => (
            <li
              key={stat.label}
              className={
                index > 0
                  ? "lg:border-l lg:border-white/10 lg:px-5"
                  : "lg:px-5"
              }
            >
              <ImpactCounter
                stat={{ ...stat, note: undefined }}
                className="border-0 bg-transparent p-0 text-left shadow-none sm:text-center [&_.font-display]:text-3xl [&_.font-display]:text-teal sm:[&_.font-display]:text-4xl [&_p]:text-white/85"
              />
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-xl text-center text-xs text-white/40">
          {IMPACT_DATA_DISCLAIMER}
        </p>

        <div className="mt-8 text-center">
          <Button
            href="/impact"
            variant="outline"
            className="border-white/70 text-white hover:bg-white/10"
          >
            View Full Impact Report
          </Button>
        </div>
      </Container>
    </section>
  );
}
