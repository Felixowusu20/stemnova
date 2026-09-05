import type { Metadata } from "next";
import {
  Button,
  Container,
  CtaSection,
} from "@/components";
import { ResearchNichesMap } from "@/components/sections/ResearchNichesMap";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Research and Innovation",
  description:
    "STEMNova Foundation advances frontier science across quantum science, AI, computational science, materials science, robotics, sustainable development, and collaborative research networks.",
  openGraph: {
    title: "Research and Innovation | STEMNova Foundation",
    description:
      "Explore STEMNova research niches across frontier science in Africa.",
    images: [{ url: images.hero.research, width: 1200, height: 630 }],
  },
};

export default function ResearchPage() {
  return (
    <>
      <section className="bg-light py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
              Research & Innovation
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl lg:text-[2.75rem]">
              Frontier science niches for African researchers
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
              STEMNova advances capacity across quantum science, AI,
              computational science, materials, robotics, sustainability, and
              collaborative research networks.
            </p>
          </div>

          <div className="mt-12 lg:mt-14">
            <ResearchNichesMap />
          </div>
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
              Join a research project
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy/70 sm:text-base">
              Apply for a fellowship or partner with STEMNova to grow research
              capacity across Africa.
            </p>
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button
                href="/programs/young-african-researchers-fellowship"
                variant="secondary"
                size="lg"
              >
                Apply for Fellowships
              </Button>
              <Button href="/partner" variant="outline" size="lg">
                Partner on Research
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Support Research in Africa"
        description="Fund grants, laboratory access, and collaboration for African scientists."
      />
    </>
  );
}
