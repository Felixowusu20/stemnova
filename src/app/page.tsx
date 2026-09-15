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
import { siteConfig } from "@/content";
import { images } from "@/content/images";
import { getResolvedSiteConfig } from "@/lib/cms/queries";
import {
  resolveHomeFocusAreas,
  resolveHomePage,
  resolveImpact,
  resolveLatestPosts,
  resolvePartners,
  resolvePrograms,
  resolveTestimonials,
} from "@/lib/cms/resolve-content";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  image: images.hero.home,
  imageAlt: "STEM researchers collaborating in a laboratory",
});

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

const researchImages = images.researchNiches;

export default async function HomePage() {
  const [
    settings,
    programs,
    latestPosts,
    testimonials,
    partners,
    impact,
    focusAreas,
    home,
  ] = await Promise.all([
    getResolvedSiteConfig(),
    resolvePrograms(),
    resolveLatestPosts(3),
    resolveTestimonials(),
    resolvePartners(),
    resolveImpact(),
    resolveHomeFocusAreas(),
    resolveHomePage(),
  ]);
  const show = {
    ...home.visible,
    focusAreas: home.visible.focusAreas && focusAreas.visibleOnHomepage,
  };
  const featuredProgrammes = programs.slice(0, 6);
  const featuredStory = impact.successStories[0];
  const highlightStats = impact.statistics.slice(0, 6);
  const featuredTestimonials = testimonials.slice(0, 3);
  const storyImage =
    featuredStory?.imageUrl || images.programmes.youngScholars;

  return (
    <>
      {show.hero ? <HeroCarousel slides={settings.heroSlides} /> : null}

      {show.challenges ? (
        <ChallengesCycle
          eyebrow={home.challenges.eyebrow}
          title={home.challenges.title}
          highlight={home.challenges.highlight}
          imageUrl={home.challenges.imageUrl}
          imageCaption={home.challenges.imageCaption}
          items={home.challenges.items}
        />
      ) : null}

      {show.focusAreas ? (
        <PillarsTree
          eyebrow={focusAreas.eyebrow}
          title={focusAreas.title}
          pillars={focusAreas.pillars}
        />
      ) : null}

      {show.mission ? (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={home.mission.imageUrl || images.home.mission}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-teal/65"
            aria-hidden="true"
          />
        </div>
        <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
              {home.mission.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              {home.mission.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              {home.mission.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={home.mission.primaryHref} variant="teal" size="lg">
                {home.mission.primaryLabel}
              </Button>
              <Button
                href={home.mission.secondaryHref}
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10"
              >
                {home.mission.secondaryLabel}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {(home.mission.mosaic.length > 0
              ? home.mission.mosaic
              : images.home.mosaic
            ).map((src, index) => (
              <div
                key={src}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/15 shadow-lg",
                  index % 2 === 1 && "mt-6"
                )}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 20vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      ) : null}

      {show.programmes ? (
      <section className="relative overflow-hidden bg-gradient-to-b from-light via-[#f0faf7] to-white py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 gradient-mesh opacity-70"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="mb-12 grid items-end gap-8 lg:mb-14 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionHeading
              eyebrow={home.programmes.eyebrow}
              title={home.programmes.title}
            />
            <div className="relative hidden overflow-hidden rounded-3xl border border-teal/20 shadow-lg lg:block">
              <div className="relative aspect-[16/10]">
                <Image
                  src={home.programmes.imageUrl || images.home.programmes}
                  alt="STEM learners collaborating"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-navy/75 via-teal/25 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg font-semibold text-white">
                    {home.programmes.imageCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>

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
      ) : null}

      {show.research ? (
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src={images.home.research}
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/95 via-[#eefbf8]/92 to-white/95"
            aria-hidden="true"
          />
        </div>
        <Container className="relative">
          <SectionHeading
            eyebrow={home.research.eyebrow}
            title={home.research.title}
            description={home.research.description}
            align="center"
            className="mb-14"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {home.research.items.map((area) => {
              const Icon = researchIcons[area.icon] || FileText;
              const imageSrc =
                researchImages[area.id as keyof typeof researchImages] ||
                images.home.research;

              return (
                <li key={area.id}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-teal/15 bg-white shadow-[0_12px_36px_-22px_rgba(10,37,64,0.4)] transition duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_44px_-18px_rgba(20,184,166,0.35)]">
                    <div className="relative h-32 overflow-hidden sm:h-36">
                      <Image
                        src={imageSrc}
                        alt=""
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/35 to-teal/20"
                        aria-hidden="true"
                      />
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-base font-semibold text-teal group-hover:text-navy">
                        {area.title}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-navy/65">
                        {area.description}
                      </p>
                    </div>
                  </article>
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
      ) : null}

      {show.impact ? <ImpactHighlights stats={highlightStats} /> : null}

      {show.successStory ? (
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eefbf8] to-white py-20 sm:py-24">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-teal/15 bg-white shadow-[0_20px_50px_-28px_rgba(10,37,64,0.45)]">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-full">
                <Image
                  src={storyImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-teal/15 lg:bg-gradient-to-r lg:from-transparent lg:via-navy/10 lg:to-navy/40"
                  aria-hidden="true"
                />
                <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                  Impact story
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <SectionHeading
                  eyebrow="Success Story"
                  title={
                    featuredStory?.title ||
                    "Stories of African STEM excellence"
                  }
                  description={
                    featuredStory?.summary ||
                    "As programmes grow, STEMNova will share verified stories of students, teachers, and researchers advancing science across Africa."
                  }
                />
                <Link
                  href="/impact"
                  className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-teal/25 bg-teal/10 px-4 py-2 text-sm font-semibold text-teal transition hover:bg-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                >
                  Read more success stories
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
      ) : null}

      {show.testimonials ? (
        <TestimonialsSection testimonials={featuredTestimonials} />
      ) : null}
      {show.partners ? <PartnersSection partners={partners} /> : null}

      {show.news ? (
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src={images.home.news}
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#eefbf8]/95 via-white/90 to-[#f0faf7]/95"
            aria-hidden="true"
          />
        </div>
        <Container className="relative">
          <SectionHeading
            eyebrow={home.news.eyebrow}
            title={home.news.title}
            description={home.news.description}
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
      ) : null}

      {show.newsletter ? (
        <NewsletterSection
          title={home.newsletter.title}
          description={home.newsletter.description}
        />
      ) : null}
      {show.cta ? (
        <CtaSection title={home.cta.title} description={home.cta.description} />
      ) : null}
    </>
  );
}
