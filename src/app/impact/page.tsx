import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import {
  Container,
  CtaSection,
  ImpactCounter,
  SectionHeading,
} from "@/components";
import {
  ImpactBarChart,
  ImpactDonutChart,
} from "@/components/ui/ImpactCharts";
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
  const locationBars = impact.locations.map((location) => ({
    label: location.name,
    value: location.girlsReached,
  }));

  return (
    <>
      <section className="bg-light py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
              Impact
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
              {impact.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
              {impact.description}
            </p>
          </div>

          <div className="mt-12 lg:mt-14">
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
            {impact.disclaimer ? (
              <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-navy/50">
                {impact.disclaimer}
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Insights in Charts"
            description="A simple view of programme reach and how support is allocated."
            align="center"
            className="mb-12"
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-navy/10 bg-light/60 p-6 sm:p-8">
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

            <article className="rounded-2xl border border-navy/10 bg-light/60 p-6 sm:p-8">
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

      <section className="bg-light py-16 sm:py-20">
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

            <article className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
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

      <CtaSection
        title="Support Measurable Change"
        description="Help STEMNova grow talent pathways, fellowships, and STEM opportunity across Africa."
      />
    </>
  );
}
