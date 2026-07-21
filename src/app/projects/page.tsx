import type { Metadata } from "next";
import { Container, PageHero, SectionHeading } from "@/components";
import { images, projects } from "@/content";
import { ProjectsFilter } from "./ProjectsFilter";

export const metadata: Metadata = {
  title: "Projects & Campaigns",
  description:
    "Explore STEMNova Foundation projects and campaigns supporting talent discovery, research fellowships, and STEM education across Africa.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projects & Campaigns"
        description="Funded initiatives advancing talent discovery, research leadership, women in STEM, and frontier science education."
        backgroundImage={images.hero.programs}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Our Work in Action"
            description="Filter by status to explore active campaigns, upcoming initiatives, and completed projects."
            className="mb-10"
          />
          <ProjectsFilter projects={projects} />
        </Container>
      </section>
    </>
  );
}
