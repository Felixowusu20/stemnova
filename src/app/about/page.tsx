import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  CheckCircle2,
  Handshake,
  Lightbulb,
  Scale,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  PartnersSection,
  SectionHeading,
  TeamCard,
} from "@/components";
import {
  getFounders,
  getTeamMembers,
  images,
  roadmapPhases,
  valuesData,
} from "@/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about STEMNova Foundation — our vision, mission, story, core values, leadership, governance, and roadmap to becoming Africa's premier STEM institution.",
};

const valueIconMap = {
  excellence: Award,
  equity: Scale,
  integrity: Shield,
  collaboration: Handshake,
  innovation: Lightbulb,
  leadership: Users,
} as const;

export default function AboutPage() {
  const founders = getFounders();
  const team = getTeamMembers();

  return (
    <>
      <PageHero
        title="About STEMNova Foundation"
        description="Africa's future leading institution for scientific talent discovery, research leadership, and STEM transformation."
        backgroundImage={images.hero.about}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Vision & Mission */}
      <section id="vision" className="scroll-mt-24 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Vision & Mission"
            title="What We Exist to Build"
            description="STEMNova is not simply a charity—we are building Africa's trusted institution for scientific talent."
            align="center"
            className="mb-12"
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl bg-navy p-8 text-white shadow-lg sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal">
                Our Vision
              </p>
              <p className="mt-4 font-display text-xl font-semibold leading-relaxed sm:text-2xl">
                {valuesData.vision}
              </p>
            </article>
            <article className="rounded-3xl border border-navy/8 bg-light p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue">
                Our Mission
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy/80 sm:text-lg">
                {valuesData.mission}
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section id="story" className="scroll-mt-24 bg-light py-20 sm:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="From Shared Experience to Continental Ambition"
                className="mb-8"
              />
              <div className="space-y-4 text-navy/80 leading-relaxed">
                {valuesData.aboutStory.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:sticky lg:top-28">
              <Image
                src={images.hero.research}
                alt="African researchers collaborating in a modern laboratory"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Core Values"
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valuesData.coreValues.map((value) => {
              const Icon = valueIconMap[value.icon];
              return (
                <li
                  key={value.title}
                  className="rounded-2xl border border-navy/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-navy">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {value.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Leadership Philosophy */}
      <section className="bg-navy py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal">
              Leadership Philosophy
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Excellence and Equity Are Inseparable
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              {valuesData.leadershipPhilosophy}
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="From Foundation to Premier Institution"
            description="An illustrative timeline of STEMNova's path toward becoming Africa's leading STEM talent institution."
            align="center"
            className="mb-14"
          />
          <ol className="relative mx-auto max-w-3xl space-y-8 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-navy/15 sm:before:left-1/2 sm:before:-translate-x-px">
            {valuesData.timeline.map((milestone, index) => (
              <li
                key={`${milestone.year}-${milestone.title}`}
                className={`relative flex flex-col sm:w-1/2 ${
                  index % 2 === 0
                    ? "sm:ml-0 sm:mr-auto sm:pr-12 sm:text-right"
                    : "sm:ml-auto sm:pl-12"
                }`}
              >
                <div
                  className="absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blue bg-white sm:left-1/2"
                  aria-hidden="true"
                />
                <article className="ml-10 rounded-2xl border border-navy/5 bg-light p-6 sm:ml-0">
                  <time
                    dateTime={String(milestone.year)}
                    className="text-sm font-semibold text-teal"
                  >
                    {milestone.year}
                  </time>
                  <h3 className="mt-1 font-display text-lg font-semibold text-navy">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {milestone.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Leadership */}
      <section id="leadership" className="scroll-mt-24 bg-light py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Meet Our Co-Founders"
            description="STEMNova was co-founded by two Ghanaian scientists committed to building the institutional infrastructure African STEM talent deserves."
            align="center"
            className="mb-14"
          />
          <ul className="grid gap-10 lg:grid-cols-2">
            {founders.map((founder) => (
              <li key={founder.id}>
                <article className="overflow-hidden rounded-3xl border border-navy/5 bg-white shadow-sm">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={founder.imageUrl}
                      alt={`Portrait of ${founder.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-bold text-navy">
                      {founder.name}
                    </h3>
                    <p className="mt-1 font-medium text-teal">{founder.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-navy/75">
                      {founder.bio}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Secretariat & Board"
              title="Institutional Leadership"
              description="Board trustees and secretariat members who strengthen STEMNova's governance and operational excellence."
              align="center"
              className="mb-12"
            />
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <li key={member.id}>
                  <TeamCard member={member} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Governance */}
      <section id="governance" className="scroll-mt-24 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Governance Structure"
            title="Accountability That Builds Trust"
            description="Transparent governance across the Board of Trustees, Programme Advisory Committees, and Secretariat."
            align="center"
            className="mb-14"
          />
          <ul className="grid gap-8 lg:grid-cols-3">
            {valuesData.governance.map((body) => (
              <li
                key={body.id}
                className="rounded-2xl border border-navy/5 bg-white p-8 shadow-sm"
              >
                <h3 className="font-display text-xl font-semibold text-navy">
                  {body.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">
                  {body.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {body.members.map((member) => (
                    <li
                      key={member}
                      className="flex gap-2 text-sm text-navy/80"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                        aria-hidden="true"
                      />
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="scroll-mt-24 bg-light py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Institutional Roadmap"
            title="Four Phases Toward Continental Leadership"
            description="A long-term growth pathway from proof of concept to institutional maturity as Africa's leading STEM institution."
            align="center"
            className="mb-14"
          />
          <ol className="grid gap-6 lg:grid-cols-4">
            {roadmapPhases.map((phase) => (
              <li
                key={phase.id}
                className="relative flex flex-col rounded-2xl border border-navy/5 bg-white p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy font-display text-sm font-bold text-white">
                  {phase.phase}
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-teal">
                  {phase.timeframe}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy">
                  {phase.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
                  {phase.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-navy/5 pt-5">
                  {phase.milestones.map((milestone) => (
                    <li
                      key={milestone}
                      className="flex gap-2 text-xs leading-relaxed text-navy/65"
                    >
                      <Sparkles
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue"
                        aria-hidden="true"
                      />
                      {milestone}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <PartnersSection
        title="Institutional Partners"
        description="Universities, research centres, governments, and international organisations advancing Africa's scientific future with STEMNova."
      />
      <CtaSection />
    </>
  );
}
