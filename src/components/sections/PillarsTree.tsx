import {
  Atom,
  Award,
  FlaskConical,
  Globe,
  Leaf,
  Microscope,
  Scale,
  Sparkles,
  Users,
  Venus,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { strategicPillars } from "@/content";
import { cn } from "@/lib/utils";
import type { StrategicPillar } from "@/types";

const pillarIcons = {
  sparkles: Sparkles,
  award: Award,
  microscope: Microscope,
  venus: Venus,
  atom: Atom,
  policy: Scale,
  globe: Globe,
  users: Users,
  flask: FlaskConical,
  graduation: Award,
  leaf: Leaf,
} as const;

function PillarNode({
  pillar,
  className,
  align = "left",
}: {
  pillar: StrategicPillar;
  className?: string;
  align?: "left" | "center";
}) {
  const Icon =
    pillarIcons[pillar.icon as keyof typeof pillarIcons] ?? Sparkles;

  return (
    <article
      className={cn(
        "relative z-10 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm",
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white",
          align === "center" && "mx-auto"
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-3 font-display text-base font-semibold text-navy">
        {pillar.title}
      </h3>
      <p className="mt-1.5 text-sm leading-snug text-navy/80">
        {pillar.description}
      </p>
    </article>
  );
}

export function PillarsTree() {
  const byId = Object.fromEntries(
    strategicPillars.map((pillar) => [pillar.id, pillar])
  ) as Record<string, StrategicPillar>;

  const root = byId["discovering-talent"];
  const mid = [
    byId["scientific-leadership"],
    byId["women-in-stem"],
    byId["quantum-education"],
  ].filter(Boolean);
  const leaves = [
    byId["world-class-researchers"],
    byId["stem-policy"],
    byId["global-networks"],
  ].filter(Boolean);

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Strategic Pillars"
          title="Seven Focus Areas Driving Africa's STEM Future"
          description="Every programme and partnership maps to one of these connected priorities."
          align="center"
          className="mb-14"
        />

        {/* Mobile: vertical tree path */}
        <ol className="relative mx-auto max-w-md space-y-0 lg:hidden">
          <div
            className="absolute bottom-8 left-[1.375rem] top-6 w-px bg-gradient-to-b from-navy via-blue to-teal"
            aria-hidden="true"
          />
          {strategicPillars.map((pillar, index) => {
            const Icon =
              pillarIcons[pillar.icon as keyof typeof pillarIcons] ?? Sparkles;
            return (
              <li key={pillar.id} className="relative flex gap-4 pb-7 last:pb-0">
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white ring-4 ring-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="rounded-2xl border border-navy/10 bg-light p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                    Focus {index + 1}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-navy/80">
                    {pillar.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Desktop: branching tree (distinct from the gaps cycle) */}
        <div className="relative mx-auto hidden max-w-5xl lg:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 640"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M500 130 V190"
              stroke="#0a2540"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M200 210 H800"
              stroke="#2563eb"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <path d="M200 210 V250" stroke="#2563eb" strokeWidth="2" />
            <path d="M500 210 V250" stroke="#2563eb" strokeWidth="2" />
            <path d="M800 210 V250" stroke="#2563eb" strokeWidth="2" />
            <path
              d="M200 390 V430 M500 390 V430 M800 390 V430"
              stroke="#14b8a6"
              strokeWidth="2"
            />
            <path
              d="M200 430 H800"
              stroke="#14b8a6"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              opacity="0.55"
            />
          </svg>

          <div className="relative flex flex-col gap-14 px-2 py-2">
            <div className="flex justify-center">
              {root && (
                <PillarNode
                  pillar={root}
                  align="center"
                  className="w-[280px] border-blue/25 bg-light"
                />
              )}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-2">
              {mid.map((pillar) => (
                <PillarNode key={pillar.id} pillar={pillar} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-2">
              {leaves.map((pillar) => (
                <PillarNode key={pillar.id} pillar={pillar} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
