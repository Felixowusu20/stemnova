import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Images } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/content/images";
import { resolveGalleryAlbums } from "@/lib/cms/resolve-content";
import { buildPageMetadata } from "@/lib/seo";
import type { GalleryAlbum } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Programme Gallery",
  description:
    "Browse photo albums from STEMNova Foundation events and programmes across Africa.",
  path: "/gallery",
  image: images.gallery[0],
});

function AlbumCard({
  album,
  index,
  href,
}: {
  album: GalleryAlbum;
  index: number;
  href: string;
}) {
  return (
    <li key={album.slug} id={album.eventSlug || album.slug}>
      <Link
        href={href}
        data-aos="fade-up"
        data-aos-delay={Math.min(index * 70, 280)}
        className="group flex h-full flex-row overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:flex-col"
      >
        <div className="aos-photo relative w-[38%] min-w-[7.5rem] shrink-0 self-stretch overflow-hidden sm:w-full sm:min-w-0 sm:aspect-[16/10]">
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
            {album.kind === "event" ? (
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal sm:text-xs">
                Event gallery
              </p>
            ) : null}
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
  );
}

export default async function GalleryPage() {
  const albums = await resolveGalleryAlbums();
  const eventAlbums = albums.filter((album) => album.kind === "event");
  const programmeAlbums = albums.filter((album) => album.kind !== "event");

  return (
    <section className="bg-light py-14 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Event and Programme Gallery"
          description="Photos grouped by event first, then by programme — so every gathering has its own album."
          align="center"
          className="mb-10"
        />

        {eventAlbums.length > 0 ? (
          <div className="mb-14 sm:mb-16">
            <div className="mb-6 flex items-center gap-2 sm:mb-8">
              <CalendarDays className="h-5 w-5 text-teal" aria-hidden="true" />
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                Event galleries
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {eventAlbums.map((album, index) => (
                <AlbumCard
                  key={album.slug}
                  album={album}
                  index={index}
                  href={`/gallery/${album.slug}`}
                />
              ))}
            </ul>
          </div>
        ) : null}

        {programmeAlbums.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center gap-2 sm:mb-8">
              <Images className="h-5 w-5 text-teal" aria-hidden="true" />
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                Programme galleries
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {programmeAlbums.map((album, index) => (
                <AlbumCard
                  key={album.slug}
                  album={album}
                  index={index}
                  href={`/gallery/${album.slug}`}
                />
              ))}
            </ul>
          </div>
        ) : null}

        {albums.length === 0 ? (
          <p className="py-16 text-center text-navy/60">
            Gallery albums will appear here once photos are added.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
