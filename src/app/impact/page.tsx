import { Container, CtaSection } from "@/components";
import { ImpactLocationReach } from "@/components/impact/ImpactLocationReach";
import { ImpactOverview } from "@/components/impact/ImpactOverview";
import { resolveImpact } from "@/lib/cms/resolve-content";
import { buildPageMetadata } from "@/lib/seo";
import { images } from "@/content";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Our Impact",
  description:
    "See STEMNova Foundation impact across students, teachers, and tutors by region across Africa.",
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
          </div>

          <ImpactOverview
            locations={impact.locations}
            disclaimer={impact.disclaimer}
          />
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-white py-16 sm:py-20">
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
