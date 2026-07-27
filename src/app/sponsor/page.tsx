import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, CtaSection } from "@/components";
import { SponsorForm } from "@/components/forms/SponsorForm";
import { images } from "@/content";

export const metadata: Metadata = {
  title: "Sponsor a Programme",
  description:
    "Sponsor a STEMNova flagship programme and multiply your institutional impact across African STEM talent.",
};

export default function SponsorPage() {
  return (
    <>
      <section className="bg-light pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16">
        <Container>
          <nav className="mb-4 text-sm text-navy/55 sm:mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-navy">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/get-involved" className="hover:text-navy">
                  Get Involved
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-navy">Sponsor</li>
            </ol>
          </nav>

          <div className="overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              {/* Form first on mobile so sponsors can apply without scrolling */}
              <div className="order-1 flex flex-col justify-center p-5 sm:p-8 lg:order-2 lg:p-10 xl:p-12">
                <div className="mb-5 sm:mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
                    Sponsor
                  </p>
                  <h1 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">
                    Sponsor a Programme
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70 sm:text-base">
                    Share your organisation details and the programme you would
                    like to support. Backend processing will follow later.
                  </p>
                </div>
                <SponsorForm className="border-0 bg-transparent p-0 shadow-none sm:p-0 lg:p-0" />
              </div>

              <div className="relative order-2 min-h-[200px] sm:min-h-[240px] lg:order-1 lg:min-h-[640px]">
                <Image
                  src={images.hero.impact}
                  alt="STEMNova programme sponsorship in action"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-navy/10"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                  <p className="max-w-md font-display text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
                    Multiply your impact across African STEM
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">
                    Fund talent discovery, fellowships, girls in science, and
                    teacher development with clear programme outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Explore Other Ways to Help"
        description="Donate, mentor, volunteer, or partner with STEMNova to advance scientific talent across Africa."
      />
    </>
  );
}
