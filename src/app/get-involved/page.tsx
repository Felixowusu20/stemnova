import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  GraduationCap,
  HandHeart,
  Heart,
  Users,
} from "lucide-react";
import {
  Button,
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
} from "@/components";
import { getInvolvedOptions, images } from "@/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join STEMNova Foundation as a mentor, volunteer, partner, sponsor, donor, or fellowship applicant.",
};

const optionIcons = {
  mentor: Users,
  volunteer: HandHeart,
  partner: Building2,
  sponsor: Award,
  donate: Heart,
  fellowship: GraduationCap,
} as const;

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        title="Get Involved"
        description="Every contribution, from mentorship and partnership to volunteering and funding, helps discover talent and build Africa's next generation of scientific leaders."
        backgroundImage={images.gallery[0]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved" },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Ways to Participate"
            title="Choose How You Advance Africa in STEM"
            description="Whether you mentor researchers, fund fellowships, or partner institutionally, there is a meaningful way to join STEMNova's mission."
            align="center"
            className="mb-14"
          />
          <ul className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {getInvolvedOptions.map((option) => {
              const Icon = optionIcons[option.icon];
              return (
                <li key={option.id} id={option.id} className="scroll-mt-28">
                  <Link
                    href={option.href}
                    className="group flex h-full flex-col rounded-2xl border border-navy/5 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:p-8"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue sm:h-14 sm:w-14">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-navy sm:mt-5 sm:text-xl">
                      {option.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70 sm:mt-3">
                      {option.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition-colors group-hover:text-navy sm:mt-6">
                      {option.cta}
                      <ArrowRight
                        className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-light py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              eyebrow="Ready to Begin?"
              title="Start With the Path That Fits You"
              description="Apply to volunteer, explore partnerships, or make a gift that fuels scholarships and research fellowships."
              align="center"
            />
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/volunteer" variant="secondary" size="lg">
                Volunteer
              </Button>
              <Button href="/partner" variant="outline" size="lg">
                Partner With Us
              </Button>
              <Button href="/donate" variant="teal" size="lg">
                Donate
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
