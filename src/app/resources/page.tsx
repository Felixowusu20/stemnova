import type { Metadata } from "next";
import { Container, PageHero, SectionHeading } from "@/components";
import { images, resources } from "@/content";
import { ResourcesExplorer } from "./ResourcesExplorer";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Browse STEMNova Foundation resources — guides, articles, videos, and FAQs on talent discovery, research leadership, women in STEM, quantum education, and teacher development.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Resources"
        description="Guides, articles, videos, and FAQs for students, educators, researchers, and institutional partners."
        backgroundImage={images.hero.programs}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Browse Our Library"
            description="Search and filter resources by topic or type. Materials support programme delivery and STEM capacity building."
            className="mb-10"
          />
          <ResourcesExplorer resources={resources} />
        </Container>
      </section>
    </>
  );
}
