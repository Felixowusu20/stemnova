import type { Metadata } from "next";
import { HandHeart, Clock, Users } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
  VolunteerForm,
} from "@/components";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Volunteer with STEMNova Foundation — support STEM camps, workshops, mentorship sessions, outreach events, and programme delivery across Africa.",
};

const volunteerHighlights = [
  {
    icon: HandHeart,
    title: "Meaningful Work",
    description:
      "Support STEM camps, research symposiums, workshops, and outreach events that expand opportunity for African talent.",
  },
  {
    icon: Clock,
    title: "Flexible Commitment",
    description:
      "Choose weekday, weekend, or event-based availability that fits your schedule and expertise.",
  },
  {
    icon: Users,
    title: "Supportive Community",
    description:
      "Join mentors, educators, and researchers with orientation, safeguarding training, and ongoing support.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        title="Volunteer With STEMNova"
        description="Contribute your skills to STEM camps, workshops, outreach events, and programme delivery across Africa."
        backgroundImage={images.gallery[1]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Volunteer" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Why Volunteer"
            description="Your time helps discover talent, support educators, and connect emerging researchers to opportunity."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-8 md:grid-cols-3">
            {volunteerHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="rounded-2xl border border-navy/5 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue/10 text-blue">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-light py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              title="Volunteer Application"
              description="Tell us about your skills and availability. We typically respond within 2–3 business days."
              align="center"
              className="mb-10"
            />
            <VolunteerForm />
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
