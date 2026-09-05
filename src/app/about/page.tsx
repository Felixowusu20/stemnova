import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Container,
  CtaSection,
  PhilosophyQuoteSlider,
  SectionHeading,
} from "@/components";
import { images, valuesData } from "@/content";
import { getPhilosophyQuotes, isCmsActive } from "@/lib/cms/queries";
import { resolveAboutOverview } from "@/lib/cms/resolve-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about STEMNova Foundation — our story, vision, and leadership.",
};

export default async function AboutPage() {
  const [cmsQuotes, cmsActive, about] = await Promise.all([
    getPhilosophyQuotes(),
    isCmsActive(),
    resolveAboutOverview(),
  ]);
  const quotes =
    cmsQuotes.length > 0
      ? cmsQuotes
      : cmsActive
        ? []
        : valuesData.leadershipPhilosophyQuotes;

  const sectionImage = about.imageUrl || images.hero.research;

  return (
    <>
      <PhilosophyQuoteSlider quotes={quotes} />

      <section className="bg-light py-16 sm:py-20">
        <Container>
          <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow={about.sectionEyebrow || "About Us"}
                title={about.sectionTitle || "Get to Know STEMNova"}
                className="mb-4 sm:mb-6"
              />
              <p className="text-sm leading-relaxed text-navy sm:text-lg">
                {about.intro}
              </p>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8 lg:min-h-full">
              <Image
                src={sectionImage}
                alt="STEMNova Foundation"
                width={900}
                height={900}
                quality={90}
                className="h-auto w-full max-h-[28rem] object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <ul className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {about.links.map((item) => (
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
