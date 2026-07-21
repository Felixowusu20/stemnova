import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  Bot,
  Brain,
  Cpu,
  FileText,
  FlaskConical,
  Globe,
  Leaf,
  Microscope,
  Network,
  Scale,
  Search,
  Sparkles,
  Users,
  Venus,
} from "lucide-react";
import {
  BlogCard,
  Button,
  Container,
  CtaSection,
  ImpactCounter,
  NewsletterSection,
  PartnersSection,
  ProgramCard,
  SectionHeading,
  TestimonialsSection,
} from "@/components";
import {
  challenges,
  getLatestPosts,
  images,
  impactData,
  IMPACT_DATA_DISCLAIMER,
  programs,
  researchAreas,
  siteConfig,
  strategicPillars,
} from "@/content";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
};

const challengeIcons = {
  search: Search,
  venus: Venus,
  book: BookOpen,
  atom: Atom,
  network: Network,
} as const;

const pillarIcons = {
  sparkles: Sparkles,
  award: Award,
  microscope: Microscope,
  venus: Venus,
  atom: Atom,
  policy: Scale,
  globe: Globe,
  users: Users,
  flask: FlaskConical,
  graduation: Award,
  leaf: Leaf,
} as const;

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

export default function HomePage() {
  const latestPosts = getLatestPosts(3);
  const featuredProgrammes = programs.slice(0, 6);
  const featuredStory = impactData.successStories[0];
  const highlightStats = impactData.statistics.slice(0, 6);

  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <Image
          src={images.hero.home}
          alt="African students and researchers collaborating in a modern laboratory"
          fill
          priority
          className="object-cover motion-safe:scale-105"
          sizes="100vw"
        />
        <div className="gradient-hero absolute inset-0" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.25),transparent_50%)]"
          aria-hidden="true"
        />
        <Container className="relative py-28 sm:py-32 lg:py-40">
          <div className="max-w-4xl">
            <p className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.2em] text-teal">
              {siteConfig.name}
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Discovering Africa&apos;s Next Generation of Scientists,
              Researchers, and Innovators.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              STEMNova Foundation empowers young Africans by discovering
              exceptional STEM talent, nurturing future scientific leaders,
              expanding opportunities for women and underserved communities,
              advancing frontier research, and connecting African researchers to
              global opportunities.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button href="/get-involved" variant="teal" size="lg">
                Join Our Mission
              </Button>
              <Button
                href="/donate"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Support STEMNova
              </Button>
            </div>
            <p className="mt-8 text-sm font-medium text-white/70">
              {siteConfig.tagline}
            </p>
          </div>
        </Container>
      </section>

      {/* Why STEMNova Exists */}
      <section className="gradient-mesh py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why STEMNova Exists"
            title="The Gaps We Are Built to Close"
            description="Promising STEM talent across Africa often goes undiscovered. STEMNova addresses these systemic gaps through carefully designed flagship programmes."
            align="center"
            className="mb-14"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {challenges.map((challenge) => {
              const Icon = challengeIcons[challenge.icon];
              return (
                <li
                  key={challenge.id}
                  className="glass-card group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                    {challenge.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {challenge.description}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-navy/80">
            STEMNova addresses these gaps through carefully designed flagship
            programmes that build sustainable pathways from talent discovery to
            world-class scientific leadership.
          </p>
        </Container>
      </section>

      {/* Strategic Pillars */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Strategic Pillars"
            title="Seven Focus Areas Driving Africa's STEM Future"
            description="Every programme, partnership, and investment maps to one or more of these institutional priorities."
            align="center"
            className="mb-14"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {strategicPillars.map((pillar) => {
              const Icon =
                pillarIcons[pillar.icon as keyof typeof pillarIcons] ?? Sparkles;
              return (
                <li
                  key={pillar.id}
                  className="rounded-2xl border border-navy/5 bg-light p-6 transition-all hover:border-blue/20 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {pillar.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Flagship Programmes Preview */}
      <section className="bg-light py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Flagship Programmes"
            title="Building Pathways from Discovery to Leadership"
            description="Nine integrated initiatives spanning talent discovery, research fellowships, teacher development, and frontier science education."
            align="center"
            className="mb-14"
          />
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
            eyebrow="Research & Innovation"
            title="Committed to Frontier Science"
            description="STEMNova advances African capacity in quantum science, AI, materials research, robotics, and sustainable development."
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
              Explore Research & Innovation
            </Button>
          </div>
        </Container>
      </section>

      {/* Impact Highlights */}
      <section className="bg-navy py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Impact"
            title="Measuring What Matters"
            description="Illustrative metrics reflecting the scale of STEMNova's continental ambition."
            align="center"
            className="mb-14 [&_h2]:text-white [&_p]:text-white/70 [&_span]:text-teal"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlightStats.map((stat) => (
              <li key={stat.label}>
                <ImpactCounter
                  stat={stat}
                  className="border-white/10 bg-white/5 shadow-none [&_.font-display]:text-teal [&_p]:text-white/80 [&_p.text-xs]:text-white/45"
                />
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-white/45">
            {IMPACT_DATA_DISCLAIMER}
          </p>
          <div className="mt-8 text-center">
            <Button
              href="/impact"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              View Full Impact Report
            </Button>
          </div>
        </Container>
      </section>

      {/* Success Story */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={featuredStory.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="Success Story"
                title={featuredStory.title}
                description={featuredStory.summary}
              />
              <Link
                href="/impact"
                className="mt-6 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-blue hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
              >
                Read more success stories
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <TestimonialsSection />
      <PartnersSection />

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
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
