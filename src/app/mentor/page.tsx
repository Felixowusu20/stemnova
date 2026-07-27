import type { Metadata } from "next";
import { BookOpen, Network, Sparkles } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
} from "@/components";
import { MentorForm } from "@/components/forms/MentorForm";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Become a Mentor",
  description:
    "Join the STEMNova Mentorship Network and guide emerging African STEM talent across research, academia, and industry.",
};

const highlights = [
  {
    icon: Network,
    title: "Structured Matching",
    description:
      "We match mentors and mentees by discipline, career stage, and goals for lasting relationships.",
  },
  {
    icon: BookOpen,
    title: "Mentor Support",
    description:
      "Receive guidance, safeguarding standards, and resources that help you mentor with confidence.",
  },
  {
    icon: Sparkles,
    title: "Real Impact",
    description:
      "Help students and early career researchers navigate fellowships, publications, and research careers.",
  },
];

export default function MentorPage() {
  return (
    <>
      <PageHero
        title="Become a Mentor"
        description="Guide emerging African STEM talent through structured mentorship across research, academia, and industry."
        backgroundImage={images.programmes.mentorship}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Become a Mentor" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Why Mentor With STEMNova"
            description="Share your expertise and help build Africa's next generation of scientific leaders."
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="rounded-2xl border border-navy/8 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 font-display text-lg font-semibold text-navy">
                    {item.title}
                  </h2>
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
              title="Mentor Application"
              description="Tell us about your background and availability. This form is a mockup until applications are connected to the admin panel."
              align="center"
              className="mb-10"
            />
            <MentorForm />
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
