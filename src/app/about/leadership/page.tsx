import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import {
  Container,
  CtaSection,
  SectionHeading,
} from "@/components";
import {
  leadershipCategoryLabel,
  resolveLeadershipCategory,
} from "@/lib/cms/leadership-roles";
import {
  resolveFounders,
  resolveLeadershipPage,
  resolveNonFounderTeam,
} from "@/lib/cms/resolve-content";
import type { TeamMember } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet STEMNova Foundation founders and institutional leadership team.",
};

function memberTitle(member: TeamMember) {
  const category = resolveLeadershipCategory({
    leadershipCategory: member.leadershipCategory,
    isFounder: member.isFounder,
  });
  const categoryLabel = leadershipCategoryLabel(category);
  const role = member.role?.trim();

  // Prefer the CMS role/title when it is more specific than the category label
  if (role && role.toLowerCase() !== categoryLabel.toLowerCase()) {
    return role;
  }
  return categoryLabel;
}

export default async function AboutLeadershipPage() {
  const [founders, team, page] = await Promise.all([
    resolveFounders(),
    resolveNonFounderTeam(),
    resolveLeadershipPage(),
  ]);

  const featuredFounder = founders.length === 1;

  return (
    <>
      <section className="bg-light py-16 sm:py-20">
        <Container>
          {founders.length > 0 ? (
            <>
              <SectionHeading
                eyebrow={page.foundersEyebrow}
                title={page.foundersTitle}
                description={page.foundersDescription}
                align="center"
                className="mb-10"
              />
              <ul
                className={
                  featuredFounder
                    ? "mx-auto max-w-4xl"
                    : "mx-auto grid max-w-5xl gap-6 lg:grid-cols-2"
                }
              >
                {founders.map((founder) => (
                  <li key={founder.id}>
                    <article className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-shadow hover:shadow-md">
                      <div
                        className={
                          featuredFounder
                            ? "grid sm:grid-cols-[min(42%,280px)_1fr]"
                            : "grid sm:grid-cols-[min(40%,220px)_1fr]"
                        }
                      >
                        <div
                          className={`relative bg-navy/5 ${
                            featuredFounder
                              ? "min-h-[280px] sm:min-h-[340px]"
                              : "min-h-[240px] sm:min-h-[280px]"
                          }`}
                        >
                          <Image
                            src={founder.imageUrl}
                            alt={`Portrait of ${founder.name}`}
                            fill
                            quality={92}
                            priority={featuredFounder}
                            className="object-cover object-top"
                            sizes={
                              featuredFounder
                                ? "(max-width: 640px) 100vw, 280px"
                                : "(max-width: 640px) 100vw, 220px"
                            }
                          />
                        </div>

                        <div className="flex min-w-0 flex-col justify-center p-5 sm:p-7 lg:p-8">
                          <h2
                            className={`font-display font-bold leading-snug text-navy ${
                              featuredFounder
                                ? "text-2xl sm:text-3xl"
                                : "text-xl sm:text-2xl"
                            }`}
                          >
                            {founder.name}
                          </h2>
                          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal sm:text-sm">
                            {memberTitle(founder)}
                          </p>
                          <p
                            className={`mt-3 leading-relaxed text-navy/75 ${
                              featuredFounder
                                ? "line-clamp-4 text-sm sm:text-base"
                                : "line-clamp-3 text-sm"
                            }`}
                          >
                            {founder.bio}
                          </p>
                          <Link
                            href={`/about/leadership/${founder.slug}`}
                            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                          >
                            Read more
                            <ArrowRight
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </Link>

                          {(founder.email || founder.linkedin) && (
                            <div className="mt-5 flex gap-2 border-t border-navy/10 pt-4">
                              {founder.email && (
                                <a
                                  href={`mailto:${founder.email}`}
                                  aria-label={`Email ${founder.name}`}
                                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                                >
                                  <Mail
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </a>
                              )}
                              {founder.linkedin && (
                                <a
                                  href={founder.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${founder.name} on LinkedIn`}
                                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                                >
                                  <Linkedin
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {team.length > 0 ? (
            <div
              className={
                founders.length > 0
                  ? "mt-16 border-t border-navy/10 pt-14"
                  : undefined
              }
            >
              <SectionHeading
                eyebrow={page.teamEyebrow}
                title={page.teamTitle}
                description={page.teamDescription}
                align="center"
                className="mb-8"
              />
              <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => {
                  const title = memberTitle(member);
                  const category = resolveLeadershipCategory({
                    leadershipCategory: member.leadershipCategory,
                    isFounder: member.isFounder,
                  });

                  return (
                    <li key={member.id}>
                      <article className="group h-full overflow-hidden rounded-2xl border border-navy/10 bg-white transition-shadow hover:shadow-md">
                        <Link
                          href={`/about/leadership/${member.slug}`}
                          className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                        >
                          <div className="relative aspect-[4/3] bg-navy/5">
                            <Image
                              src={member.imageUrl}
                              alt={`Portrait of ${member.name}`}
                              fill
                              quality={90}
                              className="object-cover object-top"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal">
                              {leadershipCategoryLabel(category)}
                            </p>
                            <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy">
                              {member.name}
                            </h3>
                            <p className="mt-1.5 text-sm font-medium leading-snug text-navy/70">
                              {title}
                            </p>
                            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition-colors group-hover:text-navy">
                              Read more
                              <ArrowRight
                                className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </Link>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
