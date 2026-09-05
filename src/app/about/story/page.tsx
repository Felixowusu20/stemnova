import type { Metadata } from "next";
import Image from "next/image";
import {
  Container,
  CtaSection,
  SectionHeading,
} from "@/components";
import { images } from "@/content";
import { resolveAboutStory } from "@/lib/cms/resolve-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn why STEMNova Foundation was founded and what we are building for African STEM talent.",
};

export default async function AboutStoryPage() {
  const story = await resolveAboutStory();
  const coverImage = story.coverUrl || images.hero.research;

  return (
    <>
      <section className="bg-light py-16 sm:py-20">
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow={story.sectionEyebrow}
                title={story.sectionTitle}
                className="mb-6"
              />
              <div className="space-y-4 text-base leading-relaxed text-navy sm:text-lg">
                {story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl shadow-sm lg:min-h-full">
              <Image
                src={coverImage}
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
