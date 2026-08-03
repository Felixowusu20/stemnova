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

function ChallengeNode({
  challenge,
  className,
}: {
  challenge: Challenge;
  className?: string;
}) {
  const Icon = challengeIcons[challenge.icon];

  return (
    <article
      className={cn(
        "relative z-10 rounded-2xl border border-navy/10 bg-white p-5 text-center shadow-sm",
        className
      )}
    >
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-3 font-display text-base font-semibold text-navy">
        {challenge.title}
      </h3>
      <p className="mt-1.5 text-sm leading-snug text-navy/80">
        {challenge.description}
      </p>
    </article>
  );
}

export function ChallengesCycle() {
  const [one, two, three, four, five] = challenges;

  return (
    <section className="gradient-mesh py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why STEMNova Exists"
          title="The Gaps We Are Built to Close"
          align="center"
          className="mb-14"
        />

        {/* Mobile: vertical connected path */}
        <ol className="relative mx-auto max-w-md space-y-0 lg:hidden">
          <div
            className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-gradient-to-b from-blue via-teal to-blue"
            aria-hidden="true"
          />
          {challenges.map((challenge, index) => {
            const Icon = challengeIcons[challenge.icon];
            return (
              <li key={challenge.id} className="relative flex gap-4 pb-8 last:pb-0">
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

        {/* Desktop: cycle / topology map */}
        <div className="relative mx-auto hidden max-w-5xl lg:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 620"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M500 70
                 C720 70, 900 160, 900 310
                 C900 460, 720 550, 500 550
                 C280 550, 100 460, 100 310
                 C100 160, 280 70, 500 70 Z"
              stroke="url(#gapRing)"
              strokeWidth="2"
              strokeDasharray="8 10"
              className="opacity-70"
            />
            <line
              x1="500"
              y1="160"
              x2="500"
              y2="250"
              stroke="#14b8a6"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <line
              x1="780"
              y1="250"
              x2="620"
              y2="300"
              stroke="#14b8a6"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <line
              x1="720"
              y1="470"
              x2="580"
              y2="360"
              stroke="#14b8a6"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <line
              x1="280"
              y1="470"
              x2="420"
              y2="360"
              stroke="#14b8a6"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <line
              x1="220"
              y1="250"
              x2="380"
              y2="300"
              stroke="#14b8a6"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <defs>
              <linearGradient id="gapRing" x1="0" y1="0" x2="1000" y2="620">
                <stop stopColor="#2563eb" />
                <stop offset="0.5" stopColor="#14b8a6" />
                <stop offset="1" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid h-[620px] grid-cols-3 grid-rows-3 gap-6 px-4 py-2">
            <div className="col-start-2 row-start-1 flex justify-center self-start">
              {one && <ChallengeNode challenge={one} className="w-[220px]" />}
            </div>
            <div className="col-start-3 row-start-2 flex justify-end self-center">
              {two && <ChallengeNode challenge={two} className="w-[220px]" />}
            </div>
            <div className="col-start-3 row-start-3 flex justify-center self-end">
              {three && <ChallengeNode challenge={three} className="w-[220px]" />}
            </div>
            <div className="col-start-1 row-start-3 flex justify-center self-end">
              {four && <ChallengeNode challenge={four} className="w-[220px]" />}
            </div>
            <div className="col-start-1 row-start-2 flex justify-start self-center">
              {five && <ChallengeNode challenge={five} className="w-[220px]" />}
            </div>

            <div className="col-start-2 row-start-2 flex items-center justify-center">
              <div className="relative z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-teal/40 bg-navy px-4 text-center shadow-lg">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal">
                  STEMNova
                </p>
                <p className="mt-2 font-display text-sm font-semibold leading-snug text-white">
                  Closes these gaps through connected programmes
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
