import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  Handshake,
  Lightbulb,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import {
  Container,
  CtaSection,
  PhilosophyQuoteSlider,
  SectionHeading,
} from "@/components";
import { valuesData } from "@/content";
import { getPhilosophyQuotes, isCmsActive } from "@/lib/cms/queries";
import { resolveVisionMission } from "@/lib/cms/resolve-content";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description:
    "STEMNova Foundation's vision, mission, and core values for African STEM talent development.",
};

const valueIconMap = {
  excellence: Award,
  equity: Scale,
  integrity: Shield,
  collaboration: Handshake,
  innovation: Lightbulb,
  leadership: Users,
} as const;

function StatementPanel({
  eyebrow,
  body,
  imageUrl,
  imageAlt,
  tone,
  layout,
}: {
  eyebrow: string;
  body: string;
  imageUrl?: string;
  imageAlt: string;
  tone: "navy" | "light";
  /** image-left = picture left, text right; text-left = text left, picture right */
  layout: "image-left" | "text-left";
}) {
  const hasImage = Boolean(imageUrl?.trim());
  const navy = tone === "navy";

  const imageBlock = hasImage ? (
    <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:min-h-[300px]">
      <Image
        src={imageUrl!}
        alt={imageAlt}
        fill
        quality={90}
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  ) : null;

  const textBlock = (
    <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <p
        className={cn(
          "text-sm font-semibold uppercase tracking-[0.16em]",
          navy ? "text-teal" : "text-blue"
        )}
      >
        {eyebrow}
      </p>
      <p
        className={cn(
          "mt-4 leading-relaxed",
          navy
            ? "font-display text-xl font-semibold text-white sm:text-2xl"
            : "text-base text-navy sm:text-lg"
        )}
      >
        {body}
      </p>
    </div>
  );

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl",
        navy
          ? "bg-navy text-white"
          : "border border-navy/10 bg-white text-navy"
      )}
    >
      {hasImage ? (
        <div className="grid lg:grid-cols-2 lg:items-stretch">
          {layout === "image-left" ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      ) : (
        <div className="max-w-3xl">{textBlock}</div>
      )}
    </article>
  );
}

export default async function AboutVisionPage() {
  const [cmsQuotes, visionMission, cmsActive] = await Promise.all([
    getPhilosophyQuotes(),
    resolveVisionMission(),
    isCmsActive(),
  ]);
  const quotes =
    cmsQuotes.length > 0
      ? cmsQuotes
      : cmsActive
        ? []
        : valuesData.leadershipPhilosophyQuotes;

  return (
    <>
      <section className="bg-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Vision & Mission"
            title={visionMission.sectionTitle}
            align="center"
            className="mb-10 sm:mb-12"
          />
          <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:gap-6">
            <StatementPanel
              eyebrow="Our Vision"
              body={visionMission.vision}
              imageUrl={visionMission.visionImageUrl}
              imageAlt="STEMNova vision"
              tone="navy"
              layout="image-left"
            />
            <StatementPanel
              eyebrow="Our Mission"
              body={visionMission.mission}
              imageUrl={visionMission.missionImageUrl}
              imageAlt="STEMNova mission"
              tone="light"
              layout="text-left"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Core Values"
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {visionMission.coreValues.map((value) => {
              const Icon = valueIconMap[value.icon] || Award;
              return (
                <li
                  key={value.title}
                  className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue text-white sm:h-11 sm:w-11">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-navy sm:mt-4 sm:text-lg">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy sm:mt-2 sm:text-sm">
                    {value.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <PhilosophyQuoteSlider quotes={quotes} />

      <CtaSection />
    </>
  );
}
