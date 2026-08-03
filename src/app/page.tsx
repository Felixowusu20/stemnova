import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
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
  BlogCard,
  Button,
  ChallengesCycle,
  Container,
  CtaSection,
  HeroCarousel,
  ImpactHighlights,
  NewsletterSection,
  PartnersSection,
  PillarsTree,
  ProgramCard,
  SectionHeading,
  TestimonialsSection,
} from "@/components";
import {
  researchAreas,
  siteConfig,
} from "@/content";
import { getResolvedSiteConfig } from "@/lib/cms/queries";
import {
  resolveImpact,
  resolveLatestPosts,
  resolvePartners,
  resolvePrograms,
  resolveTestimonials,
} from "@/lib/cms/resolve-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
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

export default async function HomePage() {
  const [settings, programs, latestPosts, testimonials, partners, impact] =
    await Promise.all([
      getResolvedSiteConfig(),
      resolvePrograms(),
      resolveLatestPosts(3),
      resolveTestimonials(),
      resolvePartners(),
      resolveImpact(),
    ]);
  const featuredProgrammes = programs.slice(0, 6);
  const featuredStory = impact.successStories[0];
  const highlightStats = impact.statistics.slice(0, 6);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <>
      <HeroCarousel slides={settings.heroSlides} />

      <ChallengesCycle />

      <PillarsTree />

      {/* Flagship Programmes Preview */}
      <section className="bg-light py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Flagship Programmes"
            title="Nine Programmes. Clear Pathways."
            align="center"
            className="mb-14"
          />
          <ul className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {featuredProgrammes.map((program) => (
              <li key={program.slug}>
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Button href="/programs" variant="secondary" size="lg">
              View All Nine Programmes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Research Preview */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Research and Innovation"
            title="Committed to Frontier Science"
            align="center"
            className="mb-14"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {researchAreas.map((area) => {
              const Icon = researchIcons[area.icon];
              return (
                <li
                  key={area.id}
                  className="rounded-2xl border border-navy/8 bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <Icon className="h-6 w-6 text-teal" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-semibold text-navy">
                    {area.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy/65">
                    {area.description}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 text-center">
            <Button href="/research" variant="outline">
              Explore Research and Innovation
            </Button>
          </div>
        </Container>
      </section>

      <ImpactHighlights stats={highlightStats} />

      {/* Success Story */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex gap-3 overflow-hidden rounded-2xl border border-navy/8 bg-white p-2.5 shadow-sm sm:grid sm:items-center sm:gap-10 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none lg:grid-cols-2 lg:gap-16">
            <div className="relative w-[38%] min-w-[7.5rem] shrink-0 self-stretch overflow-hidden rounded-xl sm:w-auto sm:min-w-0 sm:aspect-[4/3] sm:rounded-3xl">
              <Image
                src={featuredStory.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1 sm:py-0 sm:pr-0">
              <SectionHeading
                eyebrow="Success Story"
                title={featuredStory.title}
                description={featuredStory.summary}
              />
              <Link
                href="/impact"
                className="mt-3 inline-flex items-center gap-1.5 rounded text-xs font-semibold text-blue hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:mt-6 sm:text-sm"
              >
                Read more success stories
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <TestimonialsSection testimonials={featuredTestimonials} />
      <PartnersSection partners={partners} />

      {/* Latest News */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="News & Publications"
            title="Insights from the Foundation"
            description="Foundation news, research updates, and thought leadership on Africa's STEM future."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button href="/blog" variant="outline">
              View All News
            </Button>
          </div>
        </Container>
      </section>

      <NewsletterSection />
      <CtaSection />
    </>
  );
}
