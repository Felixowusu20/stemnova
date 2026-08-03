import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  CtaSection,
  ProgramCard,
} from "@/components";
import { images } from "@/content";
import { resolvePrograms } from "@/lib/cms/resolve-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Flagship Programmes",
  description:
    "Explore STEMNova Foundation flagship programmes from Young Scholars STEM Discovery and African STEM Fellows to Quantum Education Leaders and Girls Discover Science.",
  openGraph: {
    title: "Flagship Programmes | STEMNova Foundation",
    description:
      "Discover STEMNova programmes across talent discovery, fellowships, teaching, and research.",
    images: [{ url: images.hero.programs, width: 1200, height: 630 }],
  },
};

export default async function ProgramsPage() {
  const programs = await resolvePrograms();

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
              <li className="font-medium text-navy">Programmes</li>
            </ol>
          </nav>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Flagship Programmes
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-navy/70 sm:text-base">
            Pathways for talent discovery, mentorship, fellowships, and research.
          </p>
        </Container>
      </section>

      <section className="bg-light pb-12 pt-6 sm:pb-16 sm:pt-8">
        <Container>
          <ul className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {programs.map((program) => (
              <li key={program.slug}>
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection
        title="Support a Programme"
        description="Sponsor a cohort, fund a fellowship, or partner on programme delivery across Africa."
      />
    </>
  );
}
