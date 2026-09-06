import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Handshake,
} from "lucide-react";
import { Button, Container, CtaSection } from "@/components";
import { images } from "@/content/images";
import {
  PARTNERS_DISCLAIMER,
  partnerCategoryLabel,
  partners as staticPartners,
} from "@/content/partners";
import {
  resolvePartnerBySlug,
  resolvePartners,
} from "@/lib/cms/resolve-content";
import type { PartnerCategory } from "@/types";

export const dynamic = "force-dynamic";

interface PartnerPageProps {
  params: Promise<{ slug: string }>;
}

function categoryCover(category: PartnerCategory) {
  return images.partners.categories[category] || images.partners.hero;
}

export async function generateStaticParams() {
  return staticPartners.map((partner) => ({ slug: partner.slug }));
}

export async function generateMetadata({
  params,
}: PartnerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = await resolvePartnerBySlug(slug);

  if (!partner) {
    return { title: "Partner Not Found" };
  }

  return {
    title: partner.name,
    description: partner.description,
    openGraph: {
      title: `${partner.name} | STEMNova Partners`,
      description: partner.description,
      images: [
        {
          url: categoryCover(partner.category),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function PartnerDetailPage({ params }: PartnerPageProps) {
  const { slug } = await params;
  const [partner, allPartners] = await Promise.all([
    resolvePartnerBySlug(slug),
    resolvePartners(),
  ]);

  if (!partner) {
    notFound();
  }

  const aboutParagraphs = (partner.body || partner.description)
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const hasWebsite = Boolean(
    partner.website &&
      partner.website.startsWith("http") &&
      partner.website !== "#"
  );

  const cover = categoryCover(partner.category);

  const related = allPartners
    .filter(
      (item) =>
        item.slug !== partner.slug && item.category === partner.category
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero with image + teal/navy overlays */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={cover}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/75 to-[#062a2f]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-70"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(20,184,166,0.45), transparent 42%), radial-gradient(circle at 85% 70%, rgba(34,197,94,0.22), transparent 40%), linear-gradient(135deg, rgba(10,37,64,0.4), transparent 55%)",
            }}
          />
        </div>

        <Container className="relative pb-28 pt-10 sm:pb-32 sm:pt-14 lg:pb-36">
          <nav className="mb-8 text-sm text-white/70" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/partners" className="hover:text-white">
                  Partners
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-white line-clamp-1">
                {partner.name}
              </li>
            </ol>
          </nav>

          <Link
            href="/partners"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All partners
          </Link>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
            {partnerCategoryLabel(partner.category)} partner
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-white sm:text-5xl">
            {partner.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {partner.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {hasWebsite && (
              <Button
                href={partner.website!}
                target="_blank"
                rel="noopener noreferrer"
                variant="teal"
                size="lg"
              >
                Visit website
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            )}
            <Button
              href="/partner"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              Partner with STEMNova
            </Button>
          </div>
        </Container>

        {/* Floating logo card overlapping hero */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1/2">
          <Container>
            <div className="pointer-events-auto mx-auto flex max-w-md justify-center lg:mx-0 lg:justify-start">
              <div className="relative flex items-center gap-4 rounded-3xl border border-teal/20 bg-white p-4 shadow-[0_24px_60px_-20px_rgba(10,37,64,0.55)] sm:gap-5 sm:p-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-[#0d3d4a] shadow-inner ring-2 ring-teal/30 sm:h-24 sm:w-24">
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain p-2.5"
                    sizes="96px"
                    priority
                  />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal">
                    STEMNova partner
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-navy sm:text-lg">
                    {partner.name}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* About body */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eefbf8] via-light to-white pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0 gradient-mesh opacity-70"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="rounded-3xl border border-teal/15 bg-white/90 p-6 shadow-[0_16px_50px_-28px_rgba(10,37,64,0.4)] backdrop-blur sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
                About this partnership
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">
                How we work together
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-navy/80 sm:text-base">
                {aboutParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-teal/10 pt-8">
                {hasWebsite && (
                  <Button
                    href={partner.website!}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                  >
                    Visit {partner.name.split(" ")[0]} online
                    <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
                <Button href="/partner" variant="outline" size="lg">
                  <Handshake className="mr-2 h-4 w-4" aria-hidden="true" />
                  Become a partner
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-3xl border border-teal/15 shadow-lg">
                <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                  <Image
                    src={images.partners.collaboration}
                    alt="STEM collaboration and partnership"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-teal/20"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="font-display text-xl font-semibold text-white">
                      Growing STEM pathways across Africa
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Talent discovery, research support, and institutional
                      collaboration.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[images.partners.handshake, images.hero.research].map(
                  (src) => (
                    <div
                      key={src}
                      className="relative overflow-hidden rounded-2xl border border-teal/15"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="20vw"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-teal/10 bg-white py-14 sm:py-16">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
                  Related partners
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">
                  More {partnerCategoryLabel(partner.category).toLowerCase()}{" "}
                  partners
                </h2>
              </div>
              <Link
                href="/partners"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-navy"
              >
                View all
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid gap-5 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/partners/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-teal/15 bg-gradient-to-b from-[#f3fbf9] to-white shadow-sm transition hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-md"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <Image
                        src={categoryCover(item.category)}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="33vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-navy/80 to-teal/20"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="relative flex flex-1 flex-col px-4 pb-5 pt-0">
                      <div className="-mt-8 mb-3 flex justify-center">
                        <div className="relative h-16 w-16 overflow-hidden rounded-xl border-4 border-white bg-navy shadow-md ring-2 ring-teal/25">
                          <Image
                            src={item.logoUrl}
                            alt=""
                            fill
                            className="object-contain p-1.5"
                            sizes="64px"
                          />
                        </div>
                      </div>
                      <h3 className="text-center font-display text-base font-semibold text-navy group-hover:text-teal">
                        {item.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-center text-xs leading-relaxed text-navy/60">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-[#eefbf8] py-6">
        <Container>
          <p className="text-center text-xs text-navy/50">
            {PARTNERS_DISCLAIMER}
          </p>
        </Container>
      </section>

      <CtaSection
        title="Build a partnership with STEMNova"
        description="Join universities, governments, and organisations advancing STEM talent across Africa."
      />
    </>
  );
}
