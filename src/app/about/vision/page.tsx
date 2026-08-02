import type { Metadata } from "next";
import {
  Award,
  Handshake,
  Lightbulb,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  PhilosophyQuoteSlider,
  SectionHeading,
} from "@/components";
import { images, valuesData } from "@/content";
import { getPhilosophyQuotes, isCmsActive } from "@/lib/cms/queries";
import { resolveVisionMission } from "@/lib/cms/resolve-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description:
    "STEMNova Foundation's vision, mission, and core values for African STEM talent development.",
};

const valueIconMap = {
  excellence: Award,
  equity: Scale,
  integrity: Shield,
  collaboration: Handshake,
  innovation: Lightbulb,
  leadership: Users,
} as const;

export default async function AboutVisionPage() {
  const [cmsQuotes, visionMission, cmsActive] = await Promise.all([
    getPhilosophyQuotes(),
    resolveVisionMission(),
    isCmsActive(),
  ]);
  const quotes =
    cmsQuotes.length > 0
      ? cmsQuotes
      : cmsActive
        ? []
        : valuesData.leadershipPhilosophyQuotes;

  return (
    <>
      <PageHero
        title="Vision & Mission"
        description="What we exist to build for scientific talent across Africa."
        backgroundImage={images.hero.about}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Vision & Mission" },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Vision & Mission"
            title="What We Exist to Build"
            align="center"
            className="mb-12"
          />
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <article className="rounded-2xl bg-navy p-8 text-white sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal">
                Our Vision
              </p>
              <p className="mt-4 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                {visionMission.vision}
              </p>
            </article>
            <article className="rounded-2xl border border-navy/10 bg-light p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue">
                Our Mission
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy sm:text-lg">
                {visionMission.mission}
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="bg-light py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Core Values"
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visionMission.coreValues.map((value) => {
              const Icon = valueIconMap[value.icon];
              return (
                <li
                  key={value.title}
                  className="rounded-2xl border border-navy/10 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy">
                    {value.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <PhilosophyQuoteSlider quotes={quotes} />

      <CtaSection />
    </>
  );
}
