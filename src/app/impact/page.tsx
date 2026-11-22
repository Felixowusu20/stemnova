import {
  Container,
  CtaSection,
  SectionHeading,
} from "@/components";
import { ImpactLocationReach } from "@/components/impact/ImpactLocationReach";
import { ImpactOverview } from "@/components/impact/ImpactOverview";
import {
  ImpactBarChart,
  ImpactDonutChart,
} from "@/components/ui/ImpactCharts";
import { resolveImpact } from "@/lib/cms/resolve-content";
import { buildPageMetadata } from "@/lib/seo";
import { images } from "@/content";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Our Impact",
  description:
    "See STEMNova Foundation impact across students, researchers, teachers, women in STEM, and partners across Africa.",
  path: "/impact",
  image: images.hero.impact,
});

export default async function ImpactPage() {
  const impact = await resolveImpact();

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

          <ImpactOverview
            statistics={impact.statistics}
            locations={impact.locations}
            disclaimer={impact.disclaimer}
          />
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
          <ImpactLocationReach locations={impact.locations} />
        </Container>
      </section>

      <CtaSection
        title="Support Measurable Change"
        description="Help STEMNova grow talent pathways, fellowships, and STEM opportunity across Africa."
      />
    </>
  );
}
