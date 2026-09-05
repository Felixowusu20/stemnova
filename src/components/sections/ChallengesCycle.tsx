import {
  Atom,
  BookOpen,
  Network,
  Search,
  Venus,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { challenges } from "@/content";
import { cn } from "@/lib/utils";
import type { Challenge } from "@/types";

const challengeIcons = {
  search: Search,
  venus: Venus,
  book: BookOpen,
  atom: Atom,
  network: Network,
} as const;

function ChallengeCard({
  challenge,
  index,
  className,
}: {
  challenge: Challenge;
  index: number;
  className?: string;
}) {
  const Icon = challengeIcons[challenge.icon];

  return (
    <article
      className={cn(
        "group h-full rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue text-white transition-transform duration-300 group-hover:-translate-y-0.5">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
            Gap {index + 1}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-semibold text-navy">
            {challenge.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy/75">
            {challenge.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ChallengesCycle() {
  return (
    <section className="gradient-mesh py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why STEMNova Exists"
          title="The Gaps We Are Built to Close"
          align="center"
          className="mb-10 sm:mb-12"
        />

        <div className="mx-auto mb-10 max-w-3xl rounded-2xl bg-navy px-6 py-5 text-center sm:mb-12 sm:px-8 sm:py-6">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-teal">
            STEMNova
          </p>
          <p className="mt-2 font-display text-base font-semibold leading-snug text-white sm:text-lg">
            Closes these gaps through connected programmes
          </p>
        </div>

        {/* Mobile: vertical connected path */}
        <ol className="relative mx-auto max-w-md space-y-0 lg:hidden">
          <div
            className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-gradient-to-b from-blue via-teal to-blue"
            aria-hidden="true"
          />
          {challenges.map((challenge, index) => {
            const Icon = challengeIcons[challenge.icon];
            return (
              <li
                key={challenge.id}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue text-white ring-4 ring-light">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                    Gap {index + 1}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-navy">
                    {challenge.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-navy/80">
                    {challenge.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Desktop: clean grid — 3 on top, 2 centred below */}
        <ul className="mx-auto hidden max-w-5xl gap-5 lg:grid lg:grid-cols-6">
          {challenges.map((challenge, index) => (
            <li
              key={challenge.id}
              className={cn(
                "lg:col-span-2",
                index === 3 && "lg:col-start-2",
                index === 4 && "lg:col-start-4"
              )}
            >
              <ChallengeCard challenge={challenge} index={index} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
