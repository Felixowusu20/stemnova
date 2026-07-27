import type { Metadata } from "next";
import Image from "next/image";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
} from "@/components";
import { images, valuesData } from "@/content";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn why STEMNova Foundation was founded and what we are building for African STEM talent.",
};

export default function AboutStoryPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        description="Why STEMNova exists and what we are building for African STEM talent."
        backgroundImage={images.hero.about}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Our Story" },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Why STEMNova Exists"
                className="mb-6"
              />
              <div className="space-y-4 text-base leading-relaxed text-navy sm:text-lg">
                {valuesData.aboutStory.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl shadow-sm lg:min-h-full">
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
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
