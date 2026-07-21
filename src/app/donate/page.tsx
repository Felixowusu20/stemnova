import type { Metadata } from "next";
import { AlertTriangle, Lock, Shield } from "lucide-react";
import {
  Container,
  CtaSection,
  DonationForm,
  PageHero,
  SectionHeading,
} from "@/components";
import { images, impactData } from "@/content";
import { PAYMENT_DISCLAIMER } from "@/lib/payments";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support STEMNova Foundation — fund scholarships, research fellowships, teacher training, girls in STEM, and talent discovery across Africa.",
};

interface DonatePageProps {
  searchParams: Promise<{ project?: string }>;
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const { project: defaultProjectSlug } = await searchParams;

  return (
    <>
      <PageHero
        title="Support STEMNova"
        description="Your generosity fuels scholarships, research fellowships, teacher training, and talent discovery programmes across Africa."
        backgroundImage={images.hero.impact}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionHeading
                title="Make a Donation"
                description="Choose an amount, select a programme or project to support, and complete your gift. Every contribution advances Africa in STEM."
                className="mb-8"
              />
              <DonationForm defaultProjectSlug={defaultProjectSlug} />
            </div>

            <aside className="space-y-8 lg:col-span-2">
              <div className="rounded-2xl border border-navy/5 bg-light p-6">
                <h3 className="font-display text-lg font-semibold text-navy">
                  Where Your Gift Goes
                </h3>
                <ul className="mt-4 space-y-3">
                  {impactData.donationUsage.map((item) => (
                    <li key={item.category} className="text-sm">
                      <div className="flex justify-between gap-4 font-medium text-navy">
                        <span>{item.category}</span>
                        <span className="text-teal">{item.percentage}%</span>
                      </div>
                      <p className="mt-1 text-navy/60">{item.description}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-navy/50">
                  Percentages are illustrative placeholders for website development.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                <div className="flex gap-2 font-semibold">
                  <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  Payment Notice
                </div>
                <p>{PAYMENT_DISCLAIMER}</p>
              </div>

              <div className="flex items-start gap-3 text-sm text-navy/70">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                <p>Secure form handling. We never store card details on this website.</p>
              </div>
              <div className="flex items-start gap-3 text-sm text-navy/70">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                <p>STEMNova Foundation is committed to transparent stewardship of every gift.</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Prefer Another Way to Help?"
        description="Become a mentor, volunteer at a STEM camp, or partner with STEMNova as an institution."
      />
    </>
  );
}
