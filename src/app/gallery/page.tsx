import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryAlbums } from "@/content";
import { images } from "@/content/images";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Programme Gallery",
  description:
    "Browse photo albums from STEMNova Foundation programmes across Africa including camps, fellowships, workshops, and outreach.",
  openGraph: {
    title: "Programme Gallery | STEMNova Foundation",
    description:
      "Explore moments from talent discovery camps, research fellowships, workshops, and STEM outreach.",
    url: `${siteUrl}/gallery`,
    images: [{ url: images.gallery[0], width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Programme Gallery"
        description="Photos from STEM camps, fellowships, workshops, and community programmes across Africa."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        backgroundImage={images.gallery[0]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Albums"
            title="Explore by Programme"
            description="Open an album to see moments from each STEMNova programme."
            className="mb-10"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryAlbums.map((album) => (
              <li key={album.slug}>
                <Link
                  href={`/gallery/${album.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={album.coverImageUrl}
                      alt=""
                      fill
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {album.images.length} photos
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h2 className="font-display text-lg font-semibold text-navy sm:text-xl">
                      {album.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65 line-clamp-2">
                      {album.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
                      View album
                      <ArrowRight
                        className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
