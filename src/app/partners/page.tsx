import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ExternalLink,
  FlaskConical,
  Globe2,
  Handshake,
  HeartHandshake,
  Landmark,
  Users,
} from "lucide-react";
import { Button, Container, CtaSection } from "@/components";
import { images } from "@/content/images";
import {
  PARTNER_CATEGORIES,
  PARTNERS_DISCLAIMER,
  partnerCategoryLabel,
} from "@/content/partners";
import { resolvePartners } from "@/lib/cms/resolve-content";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";
import type { Partner, PartnerCategory } from "@/types";

export const dynamic = "force-dynamic";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Meet the universities, governments, organisations, and research institutions partnering with STEMNova Foundation across Africa.",
  openGraph: {
    title: "Partners | STEMNova Foundation",
    description:
      "Explore STEMNova partners advancing Africa's STEM talent, research, and education.",
    url: `${siteUrl}/partners`,
    images: [{ url: images.partners.hero, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${siteUrl}/partners`,
  },
};

const categoryIcons: Record<PartnerCategory, typeof Building2> = {
  university: Building2,
  government: Landmark,
  international: Globe2,
  technology: FlaskConical,
  ngo: HeartHandshake,
  research: Users,
};

function PartnerCard({
  partner,
  coverImage,
}: {
  partner: Partner;
  coverImage: string;
}) {
  const hasWebsite = Boolean(
    partner.website &&
      partner.website.startsWith("http") &&
      partner.website !== "#"
  );

  return (
    <li>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-teal/15 bg-white shadow-[0_12px_40px_-24px_rgba(10,37,64,0.45)] transition duration-300 hover:-translate-y-1 hover:border-teal/35 hover:shadow-[0_24px_50px_-20px_rgba(20,184,166,0.35)]">
        <Link
          href={`/partners/${partner.slug}`}
          className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          <div className="relative h-36 overflow-hidden sm:h-40">
            <Image
              src={coverImage}
              alt=""
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-teal/25"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-40 mix-blend-soft-light"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(20,184,166,0.55), transparent 45%), radial-gradient(circle at 80% 0%, rgba(37,99,235,0.35), transparent 40%)",
              }}
              aria-hidden="true"
            />
            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              {partnerCategoryLabel(partner.category)}
            </div>
          </div>

          <div className="relative flex flex-1 flex-col px-5 pb-5 pt-0">
            <div className="-mt-10 mb-4 flex justify-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-4 border-white bg-gradient-to-br from-navy to-navy/90 shadow-lg ring-2 ring-teal/30">
                <Image
                  src={partner.logoUrl}
                  alt=""
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </div>
            </div>

            <h3 className="text-center font-display text-lg font-semibold text-navy transition-colors group-hover:text-teal">
              {partner.name}
            </h3>
            <p className="mt-2 flex-1 text-center text-sm leading-relaxed text-navy/65 line-clamp-3">
              {partner.description}
            </p>
            <span className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-teal">
              View partnership
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>

        {hasWebsite && (
          <div className="border-t border-teal/10 px-5 py-3">
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/55 transition-colors hover:text-teal"
            >
              Visit website
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        )}
      </article>
    </li>
  );
}

export default async function PartnersPage() {
  const partners = await resolvePartners();

  const grouped = PARTNER_CATEGORIES.map((category) => ({
    ...category,
    partners: partners.filter((partner) => partner.category === category.id),
  })).filter((group) => group.partners.length > 0);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.partners.hero}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/80 to-[#062a2f]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(20,184,166,0.4), transparent 45%), radial-gradient(circle at 80% 70%, rgba(34,197,94,0.22), transparent 40%)",
            }}
          />
        </div>

        <Container className="relative py-14 sm:py-20 lg:py-24">
          <nav className="mb-6 text-sm text-white/70" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-white">Partners</li>
            </ol>
          </nav>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
            Partnerships
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-white sm:text-5xl lg:text-6xl">
            Our Partners
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-xl">
            Universities, governments, technology companies, NGOs, and research
            institutions advancing Africa&apos;s STEM future with STEMNova.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/partner" variant="teal" size="lg">
              Partner With Us
            </Button>
            <Button
              href="#partner-directory"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              Browse partners
            </Button>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-navy via-navy to-[#0d3d4a]">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 50%, rgba(20,184,166,0.35), transparent 40%), radial-gradient(circle at 85% 40%, rgba(34,197,94,0.18), transparent 35%)",
          }}
        />
        <Container className="relative grid gap-6 py-8 sm:grid-cols-3 sm:gap-4 sm:py-10">
          {[
            {
              value: String(partners.length),
              label: "Partner organisations",
            },
            {
              value: String(grouped.length),
              label: "Partnership categories",
            },
            {
              value: "Africa+",
              label: "Regional & global reach",
            },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-3xl font-bold text-teal sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-white/75">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-b border-teal/15 bg-gradient-to-b from-[#eefbf8] to-light">
        <Container className="py-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {grouped.map((group) => {
              const Icon = categoryIcons[group.id];
              return (
                <a
                  key={group.id}
                  href={`#partners-${group.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-white/80 px-3.5 py-2 text-xs font-semibold text-navy shadow-sm backdrop-blur transition hover:border-teal hover:bg-teal/10 hover:text-teal sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
                  {group.label}
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        id="partner-directory"
        className="relative overflow-hidden bg-gradient-to-b from-light via-[#f0faf7] to-white py-14 sm:py-16 lg:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 gradient-mesh opacity-80"
          aria-hidden="true"
        />
        <Container className="relative space-y-16">
          {grouped.map((group, groupIndex) => {
            const Icon = categoryIcons[group.id];
            const cover =
              images.partners.categories[group.id] || images.partners.hero;

            return (
              <section
                key={group.id}
                id={`partners-${group.id}`}
                aria-labelledby={`partners-heading-${group.id}`}
                className="scroll-mt-28"
              >
                <div className="mb-8 grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {group.label}
                    </div>
                    <h2
                      id={`partners-heading-${group.id}`}
                      className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl"
                    >
                      {group.label} partners
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy/65 sm:text-base">
                      Organisations in this category collaborate with STEMNova
                      on programmes, research pathways, and STEM capacity across
                      Africa.
                    </p>
                    <p className="mt-3 text-sm font-semibold text-teal">
                      {group.partners.length}{" "}
                      {group.partners.length === 1 ? "partner" : "partners"}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "relative hidden overflow-hidden rounded-3xl lg:block",
                      groupIndex % 2 === 1 && "lg:order-first"
                    )}
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={cover}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 0px, 40vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-tr from-navy/80 via-teal/40 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="font-display text-lg font-semibold text-white">
                          Building STEM capacity together
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {group.partners.map((partner) => (
                    <PartnerCard
                      key={partner.id}
                      partner={partner}
                      coverImage={cover}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </Container>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.partners.collaboration}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-teal/70"
            aria-hidden="true"
          />
        </div>
        <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
              Why partner with STEMNova
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Shared ambition for Africa&apos;s scientific future
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              Our partners help discover talent, train educators, open research
              pathways, and connect African scientists to global networks —
              through programmes designed for lasting impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/partner" variant="teal" size="lg">
                <Handshake className="mr-2 h-4 w-4" aria-hidden="true" />
                Start a partnership
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10"
              >
                Talk to our team
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              images.partners.handshake,
              images.partners.network,
              images.programmes.fellows,
              images.hero.research,
            ].map((src, index) => (
              <div
                key={src}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/15 shadow-lg",
                  index % 2 === 1 && "mt-6"
                )}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 20vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#eefbf8] py-8">
        <Container>
          <p className="text-center text-xs text-navy/50">
            {PARTNERS_DISCLAIMER}
          </p>
        </Container>
      </section>

      <CtaSection
        title="Partner with STEMNova"
        description="Universities, governments, companies, and research institutions can build programmes with us that advance Africa's scientific future."
      />
    </>
  );
}
