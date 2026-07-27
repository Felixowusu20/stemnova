import { images } from "@/content/images";
import { programs } from "@/content/programs";
import type { GalleryAlbum, GalleryImage } from "@/types";

/** Extra programme photos used to enrich album galleries. */
const programmeExtras: Record<string, GalleryImage[]> = {
  "young-scholars-stem-discovery": [
    {
      url: images.gallery[0],
      alt: "Students collaborating in a science laboratory",
      caption: "Laboratory immersion during Young Scholars camp",
    },
    {
      url: images.gallery[5],
      alt: "Secondary students engaged in a STEM activity",
      caption: "Discovery camp participants exploring scientific inquiry",
    },
    {
      url: images.programmes.researchers,
      alt: "Researcher guiding a student at laboratory equipment",
      caption: "Research shadowing at a partner university",
    },
  ],
  "stemnova-mentorship-network": [
    {
      url: images.gallery[3],
      alt: "Mentors and mentees collaborating around a table",
      caption: "Mentor and mentee matching workshop",
    },
    {
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      alt: "Students networking at a mentorship event",
      caption: "STEMNova Mentorship Network gathering",
    },
  ],
  "african-stem-fellows": [
    {
      url: images.hero.research,
      alt: "Scientists working in a research laboratory",
      caption: "Fellowship supported research at a partner laboratory",
    },
    {
      url: images.gallery[4],
      alt: "Research team reviewing data together",
      caption: "Fellows research collaboration session",
    },
  ],
  "quantum-education-leaders": [
    {
      url: images.gallery[4],
      alt: "Advanced laboratory equipment in a research setting",
      caption: "Quantum education laboratory module",
    },
    {
      url: images.programmes.materials,
      alt: "Scientific instruments used in advanced physics training",
      caption: "Faculty workshop on quantum teaching tools",
    },
  ],
  "materials-science-solid-state": [
    {
      url: images.gallery[0],
      alt: "Materials research instruments in a modern lab",
      caption: "Shared laboratory access for materials research",
    },
    {
      url: images.programmes.quantum,
      alt: "Precision science equipment in use",
      caption: "Solid state physics research session",
    },
  ],
  "girls-discover-science": [
    {
      url: images.gallery[3],
      alt: "Young women collaborating on a STEM project",
      caption: "Girls Discover Science engineering challenge",
    },
    {
      url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
      alt: "Woman scientist speaking with students",
      caption: "Women in Science role model session",
    },
    {
      url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
      alt: "Mentor and mentee in conversation",
      caption: "Girls Discover Science mentorship moment",
    },
  ],
  "stem-teachers-academy": [
    {
      url: images.gallery[1],
      alt: "Educators participating in a professional workshop",
      caption: "STEM Teachers Academy master class",
    },
    {
      url: images.hero.events,
      alt: "Conference audience during a teaching summit",
      caption: "Annual STEM teachers conference",
    },
  ],
  "young-african-researchers-fellowship": [
    {
      url: images.hero.research,
      alt: "Early career researchers in a laboratory",
      caption: "Young African Researchers Fellowship placement",
    },
    {
      url: images.programmes.fellows,
      alt: "Researchers presenting findings",
      caption: "Research showcase symposium",
    },
  ],
  "innovation-sustainable-development": [
    {
      url: images.gallery[2],
      alt: "Innovation team prototyping a solution",
      caption: "Innovation for Africa challenge workshop",
    },
    {
      url: images.hero.events,
      alt: "Teams presenting projects on stage",
      caption: "Sustainable innovation finals",
    },
  ],
};

function uniqueImages(imagesList: GalleryImage[]): GalleryImage[] {
  const seen = new Set<string>();
  return imagesList.filter((image) => {
    if (seen.has(image.url)) return false;
    seen.add(image.url);
    return true;
  });
}

/** Programme photo albums for the public gallery. */
export const galleryAlbums: GalleryAlbum[] = programs.map((program) => {
  const fromProgram: GalleryImage[] = program.galleryImageUrls.map((url) => ({
    url,
    alt: `${program.title} programme moment`,
    caption: program.title,
  }));

  const extras = programmeExtras[program.slug] ?? [];

  return {
    slug: program.slug,
    title: program.title,
    description: program.shortDescription,
    coverImageUrl: program.heroImageUrl,
    images: uniqueImages([
      {
        url: program.heroImageUrl,
        alt: `${program.title} cover image`,
        caption: program.title,
      },
      ...fromProgram,
      ...extras,
    ]),
  };
});

/** Retrieve a gallery album by slug. */
export function getGalleryAlbumBySlug(slug: string): GalleryAlbum | undefined {
  return galleryAlbums.find((album) => album.slug === slug);
}

/** Flatten all gallery images across albums. */
export function getAllGalleryImages(): GalleryAlbum["images"] {
  return galleryAlbums.flatMap((album) => album.images);
}
