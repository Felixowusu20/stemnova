import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/content/images";
import { resolveGalleryAlbums } from "@/lib/cms/resolve-content";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

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

export default async function GalleryPage() {
  const albums = await resolveGalleryAlbums();

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
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {albums.map((album) => (
              <li key={album.slug}>
                <Link
                  href={`/gallery/${album.slug}`}
                  className="group flex h-full flex-row overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:flex-col"
                >
                  <div className="relative w-[38%] min-w-[7.5rem] shrink-0 self-stretch overflow-hidden sm:w-full sm:min-w-0 sm:aspect-[16/10]">
                    <Image
                      src={album.coverImageUrl}
                      alt=""
                      fill
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                      sizes="(max-width: 640px) 40vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute bottom-2 left-2 rounded-full bg-navy/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:bottom-3 sm:left-3 sm:px-3 sm:py-1 sm:text-xs">
                      {album.images.length} photos
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-3 sm:gap-0 sm:p-5 lg:p-6">
                    <div>
                      <h2 className="font-display text-sm font-semibold leading-snug text-navy line-clamp-2 sm:text-lg lg:text-xl">
                        {album.title}
                      </h2>
                      <p className="mt-1.5 text-xs leading-relaxed text-navy/65 line-clamp-2 sm:mt-2 sm:text-sm">
                        {album.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue sm:mt-4 sm:gap-1.5 sm:text-sm">
                      View album
                      <ArrowRight
                        className="h-3.5 w-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 sm:h-4 sm:w-4"
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
