import type { Metadata } from "next";
import Image from "next/image";
import { Download, MapPin } from "lucide-react";
import {
  Container,
  CtaSection,
  ImpactCounter,
  PageHero,
  SectionHeading,
} from "@/components";
import {
  ImpactBarChart,
  ImpactDonutChart,
} from "@/components/ui/ImpactCharts";
import { images } from "@/content";
import { resolveImpact } from "@/lib/cms/resolve-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See STEMNova Foundation impact across students, researchers, teachers, women in STEM, and partners across Africa.",
};

export default async function ImpactPage() {
  const impact = await resolveImpact();
  const highlightStats = impact.statistics.slice(0, 6);
  const stories = impact.successStories.slice(0, 3);
  const locationBars = impact.locations.map((location) => ({
    label: location.name,
    value: location.girlsReached,
  }));

  return (
    <>
      <PageHero
        title={impact.title}
        description={impact.description}
        backgroundImage={images.hero.impact}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Impact" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Impact at a Glance"
            description="Key figures from talent discovery, fellowships, teaching, and partnerships."
            className="mb-10"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlightStats.map((stat) => (
              <li key={stat.label}>
                <ImpactCounter
                  stat={{ ...stat, note: undefined }}
                  className="border-navy/10 bg-white"
                />
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-navy/50">
            {impact.disclaimer}
          </p>
        </Container>
      </section>

      <section className="bg-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Insights in Charts"
            description="A simple view of programme reach and how support is allocated."
            align="center"
            className="mb-12"
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-navy">
                Impact by Programme
              </h3>
              <p className="mt-2 text-sm text-navy/70">
                Share of activity across flagship programmes.
              </p>
              <ImpactBarChart
                className="mt-6"
                items={impact.programBreakdown.map((item) => ({
                  label: item.programTitle,
                  value: item.percentage,
                }))}
              />
            </article>

            <article className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-navy">
                How Support Is Used
              </h3>
              <p className="mt-2 text-sm text-navy/70">
                Planned allocation of donated resources.
              </p>
              <ImpactDonutChart
                className="mt-8"
                items={impact.donationUsage.map((item) => ({
                  label: item.category,
                  value: item.percentage,
                }))}
              />
            </article>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                title="Where We Work"
                description="Growing reach across partner cities and regions in Africa."
                className="mb-8"
              />
              <ul className="space-y-3">
                {impact.locations.map((location) => (
                  <li
                    key={location.name}
                    className="flex items-start gap-3 rounded-xl border border-navy/10 bg-white p-4"
                  >
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-navy">{location.name}</h3>
                      <p className="text-sm text-navy/60">{location.region}</p>
                      <p className="mt-2 text-sm text-navy">
                        {location.girlsReached.toLocaleString()} students,{" "}
                        {location.schoolsPartnered} schools
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <article className="rounded-2xl border border-navy/10 bg-light p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-navy">
                Reach by Location
              </h3>
              <p className="mt-2 text-sm text-navy/70">
                Comparative student reach across active locations.
              </p>
              <ImpactBarChart
                className="mt-6"
                valueSuffix=""
                items={locationBars}
              />
            </article>
          </div>
        </Container>
      </section>

      <section className="bg-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Stories of Change"
            description="Examples of how STEMNova pathways support students, teachers, and researchers."
            align="center"
            className="mb-10"
          />
          <ul className="grid gap-3 md:grid-cols-3 md:gap-6">
            {stories.map((story) => (
              <li
                key={story.id}
                className="flex overflow-hidden rounded-2xl border border-navy/10 bg-white md:flex-col"
              >
                <div className="relative w-[38%] min-w-[7.5rem] shrink-0 self-stretch md:w-full md:min-w-0 md:aspect-[16/10]">
                  <Image
                    src={story.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 33vw"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:p-4 md:p-5">
                  <h3 className="font-display text-sm font-semibold leading-snug text-navy line-clamp-2 md:text-lg">
                    {story.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy line-clamp-3 md:mt-2 md:text-sm md:line-clamp-none">
                    {story.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Progress Over Time"
            description="Simple before and after markers from programme participation."
            align="center"
            className="mb-10"
          />
          <ul className="grid gap-5 md:grid-cols-2">
            {impact.beforeAfterStories.slice(0, 4).map((story) => (
              <li
                key={story.id}
                className="rounded-2xl border border-navy/10 bg-white p-6"
              >
                <h3 className="font-display text-lg font-semibold text-navy">
                  {story.title}
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-navy/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">
                      Before
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-navy">
                      {story.before}
                    </p>
                  </div>
                  <div className="rounded-xl bg-teal/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                      After
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-navy">
                      {story.after}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Annual Reports"
            description="Download summaries of programme outcomes and institutional progress."
            align="center"
            className="mb-10"
          />
          <ul className="mx-auto grid max-w-3xl gap-4">
            {impact.annualReports.map((report) => (
              <li
                key={report.year}
                className="flex flex-col gap-4 rounded-2xl border border-navy/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <time
                    dateTime={String(report.year)}
                    className="text-sm font-semibold text-teal"
                  >
                    {report.year}
                  </time>
                  <h3 className="mt-1 font-display text-lg font-semibold text-navy">
                    {report.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy/70">{report.summary}</p>
                </div>
                <a
                  href={report.downloadUrl}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0d3354] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection
        title="Support Measurable Change"
        description="Help STEMNova grow talent pathways, fellowships, and STEM opportunity across Africa."
      />
    </>
  );
}
