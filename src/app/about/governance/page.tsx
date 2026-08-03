import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
} from "@/components";
import { images } from "@/content";
import { resolveGovernance } from "@/lib/cms/resolve-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "How STEMNova Foundation stays accountable through the Board, advisory committees, and Secretariat.",
};

export default async function AboutGovernancePage() {
  const governance = await resolveGovernance();

  return (
    <>
      <PageHero
        title={governance.title}
        description={governance.description}
        backgroundImage={images.hero.about}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Governance" },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Governance"
            title="How We Stay Accountable"
            description="Transparent structure for strategic oversight and day-to-day delivery."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-3 sm:gap-6 lg:grid-cols-3">
            {governance.bodies.map((body) => (
              <li
                key={body.id}
                className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-7"
              >
                <h2 className="font-display text-lg font-semibold text-navy sm:text-xl">
                  {body.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy sm:mt-3">
                  {body.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {body.members.map((member) => (
                    <li key={member} className="flex gap-2 text-sm text-navy">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                        aria-hidden="true"
                      />
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
