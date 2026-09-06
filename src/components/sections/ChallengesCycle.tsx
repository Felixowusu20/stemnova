import {
  Atom,
  BookOpen,
  Network,
  Search,
  Venus,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { challenges } from "@/content";
import { images } from "@/content/images";
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
        "group h-full rounded-2xl border border-teal/15 bg-white/95 p-6 shadow-[0_12px_40px_-24px_rgba(10,37,64,0.4)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-[0_18px_44px_-20px_rgba(20,184,166,0.35)]",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-[#0d3d4a] text-white ring-2 ring-teal/30 transition-transform duration-300 group-hover:-translate-y-0.5">
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eefbf8] via-light to-white py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 gradient-mesh opacity-80"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-20 top-10 hidden h-72 w-72 rounded-full bg-teal/10 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -left-16 bottom-10 hidden h-64 w-64 rounded-full bg-blue/10 blur-3xl lg:block" />

      <Container className="relative">
        <div className="mb-12 grid items-center gap-8 lg:mb-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Why STEMNova Exists"
              title="The Gaps We Are Built to Close"
            />
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-navy via-navy to-[#0d3d4a] px-6 py-5 text-left shadow-lg">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-teal">
                STEMNova
              </p>
              <p className="mt-2 font-display text-base font-semibold leading-snug text-white sm:text-lg">
                Closes these gaps through connected programmes
              </p>
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-3xl border border-teal/20 shadow-xl lg:block">
            <div className="relative aspect-[5/4]">
              <Image
                src={images.home.challenges}
                alt="Students and educators collaborating in STEM learning"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 40vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-navy/80 via-navy/35 to-teal/30"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg font-semibold text-white">
                  Pathways for Africa&apos;s next scientists
                </p>
              </div>
            </div>
          </div>
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
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-[#0d3d4a] text-white ring-4 ring-[#eefbf8]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="rounded-2xl border border-teal/15 bg-white p-4 shadow-sm">
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

        {/* Desktop grid */}
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
