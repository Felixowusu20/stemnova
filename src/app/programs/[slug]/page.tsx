import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
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
import { Button, Container } from "@/components";
import { programs } from "@/content";
import { resolveProgramBySlug } from "@/lib/cms/resolve-content";
import type { ProgramIcon } from "@/types";

export const dynamic = "force-dynamic";

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
  const program = await resolveProgramBySlug(slug);

  if (!program) {
    return { title: "Programme Not Found" };
  }

  return {
    title: program.title,
    description: program.shortDescription,
    openGraph: {
      title: `${program.title} | STEMNova Foundation`,
      description: program.shortDescription,
      images: [{ url: program.heroImageUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function ProgramDetailPage({
  params,
}: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = await resolveProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const Icon = iconMap[program.icon];
  const sideImage = program.heroImageUrl || program.galleryImageUrls[0];

  return (
    <>
      <section className="bg-light pt-4 pb-2 sm:pt-6">
        <Container>
          <nav className="mb-3 text-sm text-navy/55" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-navy">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/programs" className="hover:text-navy">
                  Programmes
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-navy line-clamp-1">
                {program.title}
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      <section className="bg-light pb-10 pt-2 sm:pb-14 sm:pt-4">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm sm:rounded-3xl">
            <div className="grid lg:grid-cols-2">
              <div className="order-1 flex flex-col justify-center p-5 sm:p-8 lg:order-2 lg:p-10">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                  {program.title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-navy/75 sm:text-base">
                  {program.shortDescription}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-navy sm:text-base">
                  {program.intro}
                </p>

                <h2 className="mt-8 font-display text-lg font-semibold text-navy">
                  Goals
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {program.objectives.slice(0, 4).map((objective) => (
                    <li
                      key={objective}
                      className="flex gap-2.5 text-sm leading-relaxed text-navy"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                        aria-hidden="true"
                      />
                      {objective}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-6 font-display text-lg font-semibold text-navy">
                  Who it is for
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy/80">
                  {program.beneficiaries}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/get-involved" variant="teal" size="lg">
                    Get Involved
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Contact Us
                  </Button>
                </div>
              </div>

              <div className="relative order-2 min-h-[220px] sm:min-h-[280px] lg:order-1 lg:min-h-full">
                <Image
                  src={sideImage}
                  alt=""
                  fill
                  quality={90}
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center sm:mt-8">
            <Button href="/programs" variant="outline">
              View all programmes
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
