import type { Metadata } from "next";
import Link from "next/link";
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
      <section className="bg-light pt-4 pb-2 sm:pt-6">
        <Container>
          <nav className="mb-3 text-sm text-navy/55" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-navy">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-navy">Research</li>
            </ol>
          </nav>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Research and Innovation
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-navy/70 sm:text-base">
            Frontier science niches for African researchers.
          </p>
        </Container>
      </section>

      <section className="bg-light pb-10 pt-6 sm:pb-14 sm:pt-8">
        <Container>
          <ResearchNichesMap />
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
              Join a Research Project
            </h2>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
