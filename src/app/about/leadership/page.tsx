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
  leadershipDisplayRank,
  resolveLeadershipCategory,
  sortLeadership,
} from "@/lib/cms/leadership-roles";
import {
  resolveLeadershipPage,
  resolveTeam,
} from "@/lib/cms/resolve-content";
import type { TeamMember } from "@/types";
import { portraitUrl } from "@/lib/portrait-url";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Leadership",
  description:
    "Meet STEMNova Foundation founders and institutional leadership team.",
  path: "/about/leadership",
});

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
  const [leaders, page] = await Promise.all([
    resolveTeam(),
    resolveLeadershipPage(),
  ]);
  const ordered = sortLeadership(leaders);
  const ceos = ordered.filter((member) => leadershipDisplayRank(member) === 0);
  const advisory = ordered.filter(
    (member) => leadershipDisplayRank(member) === 1
  );
  const rest = ordered.filter((member) => leadershipDisplayRank(member) === 2);
  const featuredCeo = ceos.length === 1;
  const groups = [
    advisory.length > 0
      ? {
          key: "advisory",
          eyebrow: "Advisory Board",
          title: "Advisors and Members",
          description: "Advisory board members guiding STEMNova's work.",
          members: advisory,
        }
      : null,
    rest.length > 0
      ? {
          key: "rest",
          eyebrow: page.teamEyebrow,
          title: page.teamTitle,
          description: page.teamDescription,
          members: rest,
        }
      : null,
  ].filter((group) => group !== null);

  return (
    <>
      <section className="bg-light py-16 sm:py-20">
        <Container>
          {ceos.length > 0 ? (
            <>
              <SectionHeading
                eyebrow="Leadership"
                title="C.E.O"
                description="The chief executive leading STEMNova Foundation."
                align="center"
                className="mb-10"
              />
              <ul
                className={
                  featuredCeo
                    ? "mx-auto max-w-4xl"
                    : "mx-auto grid max-w-5xl gap-6 lg:grid-cols-2"
                }
              >
                {ceos.map((founder) => {
                  const photo = portraitUrl(founder.imageUrl, 960);
                  return (
                  <li key={founder.id}>
                    <article
                      data-aos="fade-up"
                      className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div
                        className={
                          featuredCeo
                            ? "grid sm:grid-cols-[min(42%,280px)_1fr]"
                            : "grid sm:grid-cols-[min(40%,220px)_1fr]"
                        }
                      >
                        <div
                          className={`aos-photo relative bg-navy/5 ${
                            featuredCeo
                              ? "min-h-[280px] sm:min-h-[340px]"
                              : "min-h-[240px] sm:min-h-[280px]"
                          }`}
                        >
                          {photo ? (
                            <Image
                              src={photo}
                              alt={`Portrait of ${founder.name}`}
                              fill
                              unoptimized
                              quality={92}
                              priority={featuredCeo}
                              className="object-cover object-[center_12%]"
                              sizes={
                                featuredCeo
                                  ? "(max-width: 640px) 100vw, 280px"
                                  : "(max-width: 640px) 100vw, 220px"
                              }
                            />
                          ) : null}
                        </div>

                        <div className="flex min-w-0 flex-col justify-center p-5 sm:p-7 lg:p-8">
                          <h2
                            className={`font-display font-bold leading-snug text-navy ${
                              featuredCeo
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
                              featuredCeo
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
                  );
                })}
              </ul>
            </>
          ) : null}

          {groups.map((group, groupIndex) => (
            <div
              key={group.key}
              className={
                ceos.length > 0 || groupIndex > 0
                  ? "mt-16 border-t border-navy/10 pt-14"
                  : undefined
              }
            >
              <SectionHeading
                eyebrow={group.eyebrow}
                title={group.title}
                description={group.description}
                align="center"
                className="mb-8"
              />
              <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((member) => {
                  const photo = portraitUrl(member.imageUrl, 720);
                  const title = memberTitle(member);
                  const category = resolveLeadershipCategory({
                    leadershipCategory: member.leadershipCategory,
                    isFounder: member.isFounder,
                  });

                  return (
                    <li key={member.id}>
                      <article
                        data-aos="fade-up"
                        className="group h-full overflow-hidden rounded-2xl border border-navy/10 bg-white transition-shadow hover:shadow-md"
                      >
                        <Link
                          href={`/about/leadership/${member.slug}`}
                          className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                        >
                          <div className="aos-photo relative aspect-[4/3] bg-navy/5">
                            {photo ? (
                              <Image
                                src={photo}
                                alt={`Portrait of ${member.name}`}
                                fill
                                unoptimized
                                quality={90}
                                className="object-cover object-[center_12%]"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : null}
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
          ))}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
