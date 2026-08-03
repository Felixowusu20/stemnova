import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Linkedin, Mail } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
  TeamCard,
} from "@/components";
import { images, getAllLeaders } from "@/content";
import {
  resolveLeaderBySlug,
  resolveTeam,
} from "@/lib/cms/resolve-content";

export const dynamic = "force-dynamic";

interface LeaderPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLeaders().map((leader) => ({ slug: leader.slug }));
}

export async function generateMetadata({
  params,
}: LeaderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const leader = await resolveLeaderBySlug(slug);

  if (!leader) {
    return { title: "Leader Not Found" };
  }

  return {
    title: leader.name,
    description: leader.bio,
  };
}

export default async function LeaderProfilePage({ params }: LeaderPageProps) {
  const { slug } = await params;
  const [leader, allLeaders] = await Promise.all([
    resolveLeaderBySlug(slug),
    resolveTeam(),
  ]);

  if (!leader) {
    notFound();
  }

  const related = allLeaders
    .filter((member) => member.slug !== leader.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        title={leader.name}
        description={leader.role}
        backgroundImage={images.hero.about}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Leadership", href: "/about/leadership" },
          { label: leader.name },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Link
            href="/about/leadership"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Leadership
          </Link>

          <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr] lg:gap-14">
            <aside className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
              <div className="flex gap-3 p-2.5 lg:block lg:p-0">
                <div className="relative w-[36%] min-w-[6.75rem] shrink-0 self-stretch overflow-hidden rounded-xl lg:w-auto lg:min-w-0 lg:rounded-none lg:aspect-[4/5]">
                  <div className="relative h-full min-h-[9rem] lg:min-h-0 lg:aspect-[4/5]">
                    <Image
                      src={leader.imageUrl}
                      alt={`Portrait of ${leader.name}`}
                      fill
                      quality={90}
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 36vw, 320px"
                    />
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1 lg:p-5">
                  <h1 className="font-display text-base font-bold leading-snug text-navy sm:text-xl lg:text-2xl">
                    {leader.name}
                  </h1>
                  <p className="mt-1 text-xs font-medium text-teal sm:text-sm">
                    {leader.role}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 lg:mt-5">
                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border-2 border-navy px-2.5 py-1 text-xs font-semibold text-navy transition-colors hover:bg-navy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm"
                      >
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                        Email
                      </a>
                    )}
                    {leader.linkedin && (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border-2 border-navy px-2.5 py-1 text-xs font-semibold text-navy transition-colors hover:bg-navy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm"
                      >
                        <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            <div>
              <SectionHeading title="About" className="mb-5" />
              <div className="space-y-4 text-base leading-relaxed text-navy sm:text-lg">
                {leader.fullBio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="font-display text-xl font-semibold text-navy">
                    Focus Areas
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {leader.focusAreas.map((area) => (
                      <li key={area} className="flex gap-2 text-sm text-navy">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                          aria-hidden="true"
                        />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-navy">
                    Highlights
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {leader.highlights.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-navy">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-light py-16 sm:py-20">
          <Container>
            <SectionHeading
              title="More Leadership"
              description="Explore other members of the STEMNova leadership team."
              align="center"
              className="mb-10"
            />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((member) => (
                <li key={member.id}>
                  <TeamCard member={member} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaSection />
    </>
  );
}
