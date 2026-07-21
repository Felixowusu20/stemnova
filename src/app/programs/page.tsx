import type { Metadata } from "next";
import {
  Container,
  CtaSection,
  PageHero,
  ProgramCard,
  SectionHeading,
} from "@/components";
import { images, programs, siteConfig } from "@/content";

export const metadata: Metadata = {
  title: "Flagship Programmes",
  description:
    "Explore STEMNova Foundation's nine flagship programmes—from Young Scholars STEM Discovery and African STEM Fellows to Quantum Education Leaders and Girls Discover Science.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Flagship Programmes"
        description="Nine carefully designed initiatives building sustainable pathways from talent discovery to world-class scientific leadership across Africa."
        backgroundImage={images.hero.programs}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programmes" },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={`${siteConfig.shortName} Initiatives`}
            title="Programmes That Build Africa's Scientific Future"
            description="Each programme contributes a distinct stage in the pathway—from early talent discovery and girls in STEM to research fellowships, teacher development, and frontier science education."
            className="mb-14 max-w-3xl"
          />
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <li key={program.slug}>
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection
        title="Support a Flagship Programme"
        description="Sponsor a cohort, fund a fellowship, or partner on programme delivery—and multiply your impact across Africa's next generation of scientists."
      />
    </>
  );
}
