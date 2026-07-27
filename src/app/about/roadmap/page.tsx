import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
} from "@/components";
import { images, roadmapPhases, valuesData } from "@/content";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "STEMNova Foundation's phased roadmap from early foundation work to long-term institutional strength.",
};

export default function AboutRoadmapPage() {
  return (
    <>
      <PageHero
        title="Roadmap"
        description="Our phased path from a new foundation to lasting institutional strength."
        backgroundImage={images.hero.about}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Roadmap" },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="Looking Ahead"
            description="A simple roadmap as we grow from a new foundation into a trusted STEM institution."
            align="center"
            className="mb-12"
          />
          <ol className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {valuesData.timeline.map((milestone) => (
              <li
                key={`${milestone.year}-${milestone.title}`}
                className="rounded-2xl border border-navy/10 bg-white p-6"
              >
                <time
                  dateTime={String(milestone.year)}
                  className="text-sm font-semibold text-teal"
                >
                  {milestone.year}
                </time>
                <h2 className="mt-2 font-display text-lg font-semibold text-navy">
                  {milestone.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy">
                  {milestone.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-light py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Roadmap"
            title="Growing With Purpose"
            description="Four phases from early foundation work to long-term institutional strength."
            align="center"
            className="mb-12"
          />
          <ol className="grid gap-5 lg:grid-cols-4">
            {roadmapPhases.map((phase) => (
              <li
                key={phase.id}
                className="flex flex-col rounded-2xl border border-navy/10 bg-white p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy font-display text-sm font-bold text-white">
                  {phase.phase}
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-teal">
                  {phase.timeframe}
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold text-navy">
                  {phase.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy">
                  {phase.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-navy/10 pt-4">
                  {phase.milestones.slice(0, 3).map((milestone) => (
                    <li
                      key={milestone}
                      className="flex gap-2 text-xs leading-relaxed text-navy"
                    >
                      <Sparkles
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue"
                        aria-hidden="true"
                      />
                      {milestone}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
