"use client";

import Image from "next/image";
import Link from "next/link";
import { PARTNERS_DISCLAIMER, uniquePartners } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Partner } from "@/types";

interface PartnersSectionProps {
  partners: Partner[];
  title?: string;
  description?: string;
  className?: string;
  showDisclaimer?: boolean;
}

function PartnerChip({ partner }: { partner: Partner }) {
  return (
    <Link
      href={`/partners/${partner.slug}`}
      aria-label={`Read about ${partner.name}`}
      className="inline-flex min-w-[230px] items-center gap-3 rounded-2xl border border-teal/20 bg-white/95 px-4 py-3 shadow-[0_10px_30px_-18px_rgba(20,184,166,0.55)] transition hover:border-teal/50 hover:shadow-[0_14px_34px_-16px_rgba(20,184,166,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
    >
      <div className="aos-photo relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-navy to-[#0d3d4a] ring-2 ring-teal/25">
        <Image
          src={partner.logoUrl}
          alt=""
          fill
          className="object-contain p-1.5"
          sizes="44px"
        />
      </div>
      <span className="max-w-[160px] truncate text-sm font-semibold text-navy">
        {partner.name}
      </span>
    </Link>
  );
}

export function PartnersSection({
  partners,
  title = "Our Partners and Supporters",
  description = "Universities, governments, technology companies, NGOs, and research institutions advancing Africa's STEM future with STEMNova.",
  className,
  showDisclaimer = true,
}: PartnersSectionProps) {
  const listed = uniquePartners(partners);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-[#eefbf8] via-white to-[#f0faf7] py-16 sm:py-20",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 gradient-mesh opacity-70"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Partnerships"
          title={title}
          description={description}
          align="center"
          className="mb-10"
        />

        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">
          {listed.map((partner, index) => (
            <li
              key={partner.id}
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 70, 350)}
            >
              <PartnerChip partner={partner} />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <Link
            href="/partners"
            className="rounded-full border border-teal/30 bg-teal/10 px-4 py-2 text-sm font-semibold text-teal transition hover:bg-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            View all partners
          </Link>
          {showDisclaimer && (
            <p className="text-xs text-navy/50">{PARTNERS_DISCLAIMER}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
