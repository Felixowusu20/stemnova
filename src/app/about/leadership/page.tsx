import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
  TeamCard,
} from "@/components";
import { getFounders, getTeamMembers, images } from "@/content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet STEMNova Foundation co-founders and institutional leadership team.",
};

export default function AboutLeadershipPage() {
  const founders = getFounders();
  const team = getTeamMembers();

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
          <ul className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-2">
            {founders.map((founder) => (
              <li key={founder.id}>
                <Link
                  href={`/about/leadership/${founder.slug}`}
                  className="group grid overflow-hidden rounded-xl border border-navy/10 bg-white transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:grid-cols-[140px_1fr]"
                >
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[180px]">
                    <Image
                      src={founder.imageUrl}
                      alt={`Portrait of ${founder.name}`}
                      fill
                      quality={90}
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 140px"
                    />
                  </div>
                  <div className="flex flex-col p-4 sm:p-5">
                    <h2 className="font-display text-lg font-bold leading-snug text-navy">
                      {founder.name}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-teal">
                      {founder.role}
                    </p>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-navy/80 sm:text-sm">
                      {founder.bio}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue transition-colors group-hover:text-navy">
                      View profile
                      <ArrowRight
                        className="h-3.5 w-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
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
            <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
