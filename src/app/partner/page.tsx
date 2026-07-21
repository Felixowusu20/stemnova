import type { Metadata } from "next";
import { Building2, FlaskConical, Globe, GraduationCap, Handshake, Landmark } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  PartnersSection,
  PartnerForm,
  SectionHeading,
} from "@/components";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with STEMNova Foundation — universities, government agencies, international organisations, technology companies, NGOs, and research institutions.",
};

const partnershipTypes = [
  {
    icon: GraduationCap,
    title: "University Partnerships",
    description:
      "Co-deliver fellowships, laboratory placements, curriculum pathways, and research collaborations with African and international universities.",
  },
  {
    icon: Landmark,
    title: "Government & Policy",
    description:
      "Work with ministries and education agencies to strengthen STEM curricula, teacher standards, and talent development frameworks.",
  },
  {
    icon: Building2,
    title: "Corporate & Technology",
    description:
      "Sponsor programmes, fund innovation challenges, and open industry mentorship pathways for emerging African STEM talent.",
  },
  {
    icon: Globe,
    title: "International Organisations",
    description:
      "Collaborate on continental STEM capacity-building, research networks, and evidence-based education initiatives.",
  },
  {
    icon: Handshake,
    title: "NGO Collaborations",
    description:
      "Joint outreach for girls in STEM, teacher development, and community-based talent discovery programmes.",
  },
  {
    icon: FlaskConical,
    title: "Research Institutions",
    description:
      "Host fellows, share laboratory access, and co-author research advancing frontier science across Africa.",
  },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        title="Partner With STEMNova"
        description="Universities, governments, companies, NGOs, and research institutions—join us in building Africa's premier STEM talent institution."
        backgroundImage={images.hero.about}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Partners" },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Partnership Opportunities"
            description="We welcome collaborations that expand talent discovery, research leadership, and STEM education excellence across Africa."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partnershipTypes.map((type) => {
              const Icon = type.icon;
              return (
                <li
                  key={type.title}
                  className="rounded-2xl border border-navy/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {type.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <PartnersSection
        title="Partner Logo Cloud"
        description="Illustrative institutional partners across universities, research centres, technology companies, and international organisations."
      />

      <section className="bg-light py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              title="Start a Partnership Conversation"
              description="Tell us about your organisation and how you'd like to collaborate with STEMNova."
              align="center"
              className="mb-10"
            />
            <PartnerForm />
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
