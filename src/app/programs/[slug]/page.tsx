import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Atom,
  Award,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  Leaf,
  Microscope,
  Sparkles,
  Users,
  Venus,
} from "lucide-react";
import {
  Button,
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
  TestimonialCard,
} from "@/components";
import {
  getProgramBySlug,
  getTestimonialsByProgram,
  programs,
} from "@/content";
import type { ProgramIcon, ProgramSlug } from "@/types";

const iconMap: Record<ProgramIcon, typeof Sparkles> = {
  sparkles: Sparkles,
  users: Users,
  award: Award,
  atom: Atom,
  flask: FlaskConical,
  venus: Venus,
  graduation: GraduationCap,
  microscope: Microscope,
  leaf: Leaf,
};

interface ProgramDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: ProgramDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug as ProgramSlug);

  if (!program) {
    return { title: "Programme Not Found" };
  }

  return {
    title: program.title,
    description: program.shortDescription,
  };
}

export default async function ProgramDetailPage({
  params,
}: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug as ProgramSlug);

  if (!program) {
    notFound();
  }

  const Icon = iconMap[program.icon];
  const testimonials = getTestimonialsByProgram(program.slug);

  return (
    <>
      <PageHero
        title={program.title}
        description={program.shortDescription}
        backgroundImage={program.heroImageUrl}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programs" },
          { label: program.title },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue/10 text-blue">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <div className="max-w-3xl">
              <SectionHeading title="Programme Overview" />
              <p className="mt-4 text-lg leading-relaxed text-navy/80">
                {program.intro}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-light py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Objectives"
                title="What This Programme Achieves"
                className="mb-6"
              />
              <ul className="space-y-3">
                {program.objectives.map((objective) => (
                  <li
                    key={objective}
                    className="flex gap-3 text-navy/80 leading-relaxed"
                  >
                    <CheckCircle2
                      className="mt-1 h-5 w-5 shrink-0 text-teal"
                      aria-hidden="true"
                    />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-navy">
                Who We Serve
              </h3>
              <p className="mt-3 leading-relaxed text-navy/80">
                {program.beneficiaries}
              </p>
              <h3 className="mt-8 font-display text-xl font-semibold text-navy">
                Impact Statement
              </h3>
              <p className="mt-3 leading-relaxed text-navy/80">
                {program.impactStatement}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading title="What We Do" className="mb-6" />
              <ul className="space-y-3">
                {program.activities.map((activity) => (
                  <li
                    key={activity}
                    className="flex gap-3 text-navy/80 leading-relaxed"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                      aria-hidden="true"
                    />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading title="Our Approach" className="mb-6" />
              <p className="leading-relaxed text-navy/80">{program.approach}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy/5 py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Programme Impact"
            align="center"
            className="mb-10"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {program.stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <p className="font-display text-3xl font-bold text-blue">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-navy/70">{stat.label}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-navy/50">
            Figures are illustrative placeholders for website development.
          </p>
        </Container>
      </section>

      <section className="bg-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Programme in Action"
            description="Moments from camps, laboratories, workshops, and research engagements."
            className="mb-10"
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
            {program.galleryImageUrls.map((url, index) => (
              <li
                key={`${url}-${index}`}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={url}
                  alt={`${program.title} gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button href="/gallery" variant="outline">
              View Full Gallery
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Programme Resources"
            description="Guides, articles, and materials related to this programme."
            className="mb-10"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {program.resources.map((resource) => (
              <li key={resource.href}>
                <Link
                  href={resource.href}
                  className="group block rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal">
                    {resource.type}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-navy">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy/70">
                    {resource.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                    View resource
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button href="/resources" variant="secondary">
              Browse All Resources
            </Button>
          </div>
        </Container>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-light py-16 sm:py-20">
          <Container>
            <SectionHeading
              title="What People Say"
              align="center"
              className="mb-10"
            />
            <ul className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <li key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaSection
        title={`Support ${program.title}`}
        description="Help STEMNova expand this pathway—fund a cohort, become a mentor, or partner on programme delivery."
      />
    </>
  );
}
