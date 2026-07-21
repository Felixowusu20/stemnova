import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/content/images";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse photos from STEMNova Foundation STEM camps, laboratories, workshops, research events, and volunteer activities across Africa.",
  openGraph: {
    title: "Photo Gallery | STEMNova Foundation",
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
        title="Photo Gallery"
        description="Moments from STEM camps, laboratories, workshops, research events, and community programmes across Africa."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        backgroundImage={images.gallery[0]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Albums"
            description="Illustrative photo collections from STEMNova programmes and events."
            className="mb-10"
          />
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
