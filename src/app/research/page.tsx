import type { Metadata } from "next";
import {
  Atom,
  Bot,
  Brain,
  Cpu,
  FileText,
  FlaskConical,
  Leaf,
  Network,
} from "lucide-react";
import {
  Button,
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
} from "@/components";
import { images, researchAreas, siteConfig } from "@/content";

export const metadata: Metadata = {
  title: "Research & Innovation",
  description:
    "STEMNova Foundation advances frontier science across Quantum Science, AI, Computational Science, Materials Science, Robotics, Sustainable Development, and collaborative research networks.",
};

const researchIcons = {
  atom: Atom,
  brain: Brain,
  cpu: Cpu,
  flask: FlaskConical,
  bot: Bot,
  leaf: Leaf,
  file: FileText,
  network: Network,
} as const;

export default function ResearchPage() {
  return (
    <>
      <PageHero
        title="Research & Innovation"
        description="Building African capacity in frontier science—from quantum computing to sustainable materials—through fellowships, collaborative networks, and scientific publications."
        backgroundImage={images.hero.research}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research" },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Frontier Science"
            title="Where African Talent Meets Global Research"
            description={`${siteConfig.shortName} invests in research domains that will define the next century of scientific and technological progress—ensuring African researchers lead, not merely participate.`}
            className="mb-14 max-w-3xl"
          />
          <ul className="grid gap-6 md:grid-cols-2">
            {researchAreas.map((area, index) => {
              const Icon = researchIcons[area.icon];
              return (
                <li
                  key={area.id}
                  className={`group rounded-3xl border border-navy/5 p-8 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    index % 2 === 0 ? "bg-light" : "bg-white"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-white transition-colors group-hover:bg-blue">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-navy">
                        {area.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-navy/70">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="gradient-mesh py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="Collaborate With Us"
              title="Join a Research Project"
              description="Early-career researchers, faculty, and institutional partners can collaborate on STEMNova-supported projects across our priority domains."
              align="center"
            />
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/programs/young-african-researchers-fellowship" variant="secondary" size="lg">
                Apply for Research Fellowships
              </Button>
              <Button href="/partner" variant="outline" size="lg">
                Partner on Research
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Fund Frontier Research in Africa"
        description="Your support enables research grants, laboratory access, publication coaching, and international collaboration for African scientists."
      />
    </>
  );
}
