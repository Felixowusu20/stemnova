import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { galleryAlbums, getGalleryAlbumBySlug } from "@/content";
import {
  resolveGalleryAlbumBySlug,
  resolveGalleryAlbums,
} from "@/lib/cms/resolve-content";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

const siteUrl = getSiteUrl();

interface GalleryAlbumPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return galleryAlbums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({
  params,
}: GalleryAlbumPageProps): Promise<Metadata> {
  const { slug } = await params;
  const album =
    (await resolveGalleryAlbumBySlug(slug)) ?? getGalleryAlbumBySlug(slug);
  if (!album) {
    return { title: "Album Not Found" };
  }

  return {
    title: `${album.title} Gallery`,
    description: album.description,
    openGraph: {
      title: `${album.title} Gallery | STEMNova Foundation`,
      description: album.description,
      url: `${siteUrl}/gallery/${album.slug}`,
      images: [{ url: album.coverImageUrl, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${siteUrl}/gallery/${album.slug}`,
    },
  };
}

export default async function GalleryAlbumPage({
  params,
}: GalleryAlbumPageProps) {
  const { slug } = await params;
  const [album, albums] = await Promise.all([
    resolveGalleryAlbumBySlug(slug),
    resolveGalleryAlbums(),
  ]);

  if (!album) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={album.title}
        description={album.description}
        backgroundImage={album.coverImageUrl}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
          { label: album.title },
        ]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy/70 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 rounded"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All programme albums
            </Link>
            <p className="text-sm text-navy/55">
              {album.images.length}{" "}
              {album.images.length === 1 ? "photo" : "photos"}
            </p>
          </div>
          <GalleryGrid albums={albums} albumSlug={album.slug} />
          <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-navy/8 pt-10 sm:flex-row">
            <Button href={`/programs/${album.slug}`} variant="secondary">
              Learn About This Programme
            </Button>
            <Button href="/events" variant="outline">
              Back to Events
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
