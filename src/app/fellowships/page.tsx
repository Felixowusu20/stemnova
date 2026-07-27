import type { Metadata } from "next";
import { FlaskConical, GraduationCap, Microscope } from "lucide-react";
import {
  Container,
  CtaSection,
  PageHero,
  SectionHeading,
} from "@/components";
import { FellowshipForm } from "@/components/forms/FellowshipForm";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Apply for Fellowships",
  description:
    "Apply for African STEM Fellows or Young African Researchers Fellowship and accelerate your research career with STEMNova.",
};

const highlights = [
  {
    icon: GraduationCap,
    title: "African STEM Fellows",
    description:
      "For emerging scientists ready for mentorship, research placements, and leadership development.",
  },
  {
    icon: Microscope,
    title: "Young African Researchers",
    description:
      "For early career researchers seeking fellowship support, lab access, and publication coaching.",
  },
  {
    icon: FlaskConical,
    title: "Research Pathways",
    description:
      "Connect to frontier domains including quantum science, AI, materials, and sustainable development.",
  },
];

export default function FellowshipsPage() {
  return (
    <>
      <PageHero
        title="Apply for Fellowships"
        description="Join African STEM Fellows or Young African Researchers Fellowship and accelerate your research career."
        backgroundImage={images.programmes.fellows}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
          { label: "Fellowships" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Fellowship Pathways"
            description="Choose the track that fits your stage, then complete the mock application below."
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
              title="Fellowship Application"
              description="Complete this mock application. Live review and selection will be managed from the admin panel later."
              align="center"
              className="mb-10"
            />
            <FellowshipForm />
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
