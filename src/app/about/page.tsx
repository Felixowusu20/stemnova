import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  PhilosophyQuoteSlider,
  SectionHeading,
} from "@/components";
import { images, valuesData } from "@/content";
import { getPhilosophyQuotes, isCmsActive } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about STEMNova Foundation — our story, vision, leadership, governance, and roadmap.",
};

const aboutLinks = [
  {
    title: "Our Story",
    description: "Why STEMNova was founded and what we are building.",
    href: "/about/story",
  },
  {
    title: "Vision & Mission",
    description: "What we exist to build for African STEM talent.",
    href: "/about/vision",
  },
  {
    title: "Leadership",
    description: "Meet our co-founders and institutional leadership team.",
    href: "/about/leadership",
  },
  {
    title: "Governance",
    description: "How we stay accountable through clear oversight.",
    href: "/about/governance",
  },
  {
    title: "Roadmap",
    description: "Our phased path from a new foundation to lasting impact.",
    href: "/about/roadmap",
  },
] as const;

export default async function AboutPage() {
  const [cmsQuotes, cmsActive] = await Promise.all([
    getPhilosophyQuotes(),
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
        title="About STEMNova Foundation"
        description="Building Africa's home for scientific talent discovery and STEM leadership."
        backgroundImage={images.hero.about}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <PhilosophyQuoteSlider variant="embedded" quotes={quotes} />
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="About Us"
                title="Get to Know STEMNova"
                className="mb-4 sm:mb-6"
              />
              <p className="text-sm leading-relaxed text-navy sm:text-lg">
                STEMNova Foundation is a pan-African non-profit dedicated to
                discovering scientific talent, developing research leaders, and
                advancing STEM education across Africa. Explore each area below
                to learn more about who we are and where we are going.
              </p>
            </div>
            <div className="relative min-h-[180px] overflow-hidden rounded-2xl shadow-sm sm:min-h-[260px] lg:min-h-full">
              <Image
                src={images.hero.research}
                alt="Researchers collaborating in a modern laboratory"
                fill
                quality={90}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <ul className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {aboutLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-4 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:p-6"
                >
                  <h2 className="font-display text-base font-semibold text-blue sm:text-xl">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-navy sm:mt-2 sm:text-sm">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue group-hover:text-navy sm:mt-4 sm:text-sm">
                    Learn more
                    <ArrowRight
                      className="h-3.5 w-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
