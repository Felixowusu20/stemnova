import type { Metadata } from "next";
import Image from "next/image";
import {
  Container,
  CtaSection,
  PageHero,
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
      <PageHero
        title={story.title}
        description={story.heroDescription}
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

      {story.timeline.length > 0 && (
        <section className="bg-light py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Journey"
              title="Milestones Along the Way"
              align="center"
              className="mb-12"
            />
            <ol className="mx-auto max-w-3xl space-y-4">
              {story.timeline.map((item) => (
                <li
                  key={`${item.year}-${item.title}`}
                  className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6"
                >
                  <p className="text-sm font-semibold text-teal">{item.year}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/75">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      <CtaSection />
    </>
  );
}
