import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
  TeamCard,
} from "@/components";
import { images } from "@/content";
import {
  resolveFounders,
  resolveNonFounderTeam,
} from "@/lib/cms/resolve-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet STEMNova Foundation co-founders and institutional leadership team.",
};

export default async function AboutLeadershipPage() {
  const [founders, team] = await Promise.all([
    resolveFounders(),
    resolveNonFounderTeam(),
  ]);

  return (
    <>
      <PageHero
        title="Leadership"
        description="Meet the co-founders and team building STEMNova Foundation."
        backgroundImage={images.hero.about}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Leadership" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Meet Our Co-Founders"
            description="Two Ghanaian scientists building pathways for African STEM talent."
            align="center"
            className="mb-10"
          />
          <ul className="mx-auto grid max-w-4xl gap-3 sm:gap-5 lg:grid-cols-2">
            {founders.map((founder) => (
              <li key={founder.id}>
                <article className="overflow-hidden rounded-xl border border-navy/10 bg-white transition-shadow hover:shadow-md">
                  <Link
                    href={`/about/leadership/${founder.slug}`}
                    className="group grid grid-cols-[38%_1fr] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:grid-cols-[140px_1fr]"
                  >
                    <div className="relative min-h-[9.5rem] self-stretch sm:min-h-[180px]">
                      <Image
                        src={founder.imageUrl}
                        alt={`Portrait of ${founder.name}`}
                        fill
                        quality={90}
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 38vw, 140px"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center p-3 sm:p-5">
                      <h2 className="font-display text-sm font-bold leading-snug text-navy line-clamp-2 sm:text-lg">
                        {founder.name}
                      </h2>
                      <p className="mt-1 text-[11px] font-medium text-teal sm:text-xs">
                        {founder.role}
                      </p>
                      <p className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-navy/80 sm:mt-2 sm:text-sm">
                        {founder.bio}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue transition-colors group-hover:text-navy sm:mt-3 sm:text-xs">
                        View profile
                        <ArrowRight
                          className="h-3.5 w-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                  {(founder.email || founder.linkedin) && (
                    <div className="flex gap-1.5 border-t border-navy/10 px-3 py-2 sm:px-5 sm:py-2.5">
                      {founder.email && (
                        <a
                          href={`mailto:${founder.email}`}
                          aria-label={`Email ${founder.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                        >
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                      {founder.linkedin && (
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${founder.name} on LinkedIn`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                        >
                          <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <SectionHeading
              eyebrow="Secretariat and Board"
              title="Institutional Leadership"
              description="Select a leader to read their full profile."
              align="center"
              className="mb-8"
            />
            <ul className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {team.map((member) => (
                <li key={member.id}>
                  <TeamCard member={member} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
