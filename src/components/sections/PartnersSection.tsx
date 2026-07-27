"use client";

import Image from "next/image";
import Link from "next/link";
import { partners, PARTNERS_DISCLAIMER } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface PartnersSectionProps {
  title?: string;
  description?: string;
  className?: string;
  showDisclaimer?: boolean;
}

function PartnerMarqueeItem({
  partner,
}: {
  partner: (typeof partners)[number];
}) {
  const href =
    partner.website && partner.website !== "#"
      ? partner.website
      : "/partner";
  const isExternal = href.startsWith("http");

  const content = (
    <>
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-navy/5">
        <Image
          src={partner.logoUrl}
          alt=""
          fill
          className="object-contain p-1"
          sizes="40px"
        />
      </div>
      <span className="max-w-[160px] truncate text-sm font-semibold text-navy">
        {partner.name}
      </span>
    </>
  );

  const itemClass =
    "inline-flex min-w-[220px] items-center gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2";

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${partner.name}`}
        className={itemClass}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={`Learn about partnering with ${partner.name}`} className={itemClass}>
      {content}
    </Link>
  );
}

export function PartnersSection({
  title = "Our Partners and Supporters",
  description = "Universities, governments, technology companies, NGOs, and research institutions advancing Africa's STEM future with STEMNova.",
  className,
  showDisclaimer = true,
}: PartnersSectionProps) {
  const loop = [...partners, ...partners];

  return (
    <section className={cn("overflow-hidden py-16 sm:py-20", className)}>
      <Container>
        <SectionHeading
          title={title}
          description={description}
          align="center"
          className="mb-10"
        />
      </Container>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24"
          aria-hidden="true"
        />

        <div className="group flex overflow-hidden py-2">
          <div className="flex w-max gap-4 px-4 animate-partner-marquee group-hover:[animation-play-state:paused]">
            {loop.map((partner, index) => (
              <PartnerMarqueeItem
                key={`${partner.id}-${index}`}
                partner={partner}
              />
            ))}
          </div>
        </div>
      </div>

      {showDisclaimer && (
        <Container>
          <p className="mt-8 text-center text-xs text-navy/50">
            {PARTNERS_DISCLAIMER}
          </p>
        </Container>
      )}
    </section>
  );
}
