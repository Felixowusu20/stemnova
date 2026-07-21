import { images } from "@/content/images";
import type { GalleryAlbum } from "@/types";

/** Photo gallery albums — illustrative Unsplash imagery; replace with foundation photography. */
export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "stem-discovery-labs",
    title: "STEM Discovery & Laboratories",
    description:
      "Moments from Young Scholars camps, research shadowing, and laboratory immersions connecting African students to frontier science.",
    coverImageUrl: images.gallery[0],
    images: [
      {
        url: images.gallery[0],
        alt: "Students working in a modern science laboratory",
        caption: "Young Scholars STEM Discovery lab module — illustrative photo",
      },
      {
        url: images.programmes.youngScholars,
        alt: "Secondary students engaged in a hands-on STEM activity",
        caption: "Discovery camp participants exploring scientific inquiry",
      },
      {
        url: images.gallery[5],
        alt: "Students collaborating on a classroom science project",
        caption: "Team-based learning during talent discovery assessments",
      },
      {
        url: images.programmes.researchers,
        alt: "Researcher guiding a student at laboratory equipment",
        caption: "Research shadowing placement at a partner university",
      },
      {
        url: images.gallery[4],
        alt: "Advanced laboratory equipment in a research setting",
        caption: "Shared laboratory access programme — partner institution",
      },
    ],
  },
  {
    slug: "girls-in-stem",
    title: "Girls in STEM",
    description:
      "Photos from Girls Discover Science camps, women scientist role model events, and mentorship sessions empowering the next generation of African women in science.",
    coverImageUrl: images.programmes.girlsScience,
    images: [
      {
        url: images.programmes.girlsScience,
        alt: "Young women participating in a STEM workshop",
        caption: "Girls Discover Science regional camp — illustrative photo",
      },
      {
        url: images.gallery[3],
        alt: "Diverse group of students collaborating on a project",
        caption: "Girls-only engineering challenge during STEM camp",
      },
      {
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
        alt: "Professional woman scientist presenting to students",
        caption: "Women in Science speaker series — role model session",
      },
      {
        url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
        alt: "Mentor and mentee in a one-on-one discussion",
        caption: "Girls Discover Science mentorship matching event",
      },
    ],
  },
  {
    slug: "research-fellowships",
    title: "Research & Fellowships",
    description:
      "African STEM Fellows and Young African Researchers Fellowship placements, international exchanges, and research showcase events.",
    coverImageUrl: images.programmes.fellows,
    images: [
      {
        url: images.programmes.fellows,
        alt: "Researchers presenting at a symposium",
        caption: "African STEM Fellows symposium — research presentations",
      },
      {
        url: images.hero.research,
        alt: "Scientists working in a research laboratory",
        caption: "Fellowship-supported research at a partner laboratory",
      },
      {
        url: images.programmes.quantum,
        alt: "Quantum science education session",
        caption: "Quantum Education Leaders summer school module",
      },
      {
        url: images.programmes.materials,
        alt: "Materials science research equipment",
        caption: "Materials Science programme — shared laboratory access",
      },
      {
        url: images.gallery[4],
        alt: "Research team reviewing data together",
        caption: "International research collaboration meeting — illustrative",
      },
    ],
  },
  {
    slug: "events-conferences",
    title: "Events & Conferences",
    description:
      "Africa STEM Leadership Summit, teacher conferences, innovation hackathons, and mentorship network gatherings across the continent.",
    coverImageUrl: images.hero.events,
    images: [
      {
        url: images.hero.events,
        alt: "Conference audience seated in a large auditorium",
        caption: "Africa STEM Leadership Summit — illustrative event photo",
      },
      {
        url: images.programmes.teachers,
        alt: "Educators participating in a professional development session",
        caption: "STEM Teachers Academy annual conference",
      },
      {
        url: images.programmes.innovation,
        alt: "Innovation challenge participants presenting projects",
        caption: "Innovation for Africa Challenge finals",
      },
      {
        url: images.programmes.mentorship,
        alt: "Mentors and mentees networking at an event",
        caption: "STEMNova Mentorship Network launch event",
      },
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        alt: "Stage setup at a professional conference",
        caption: "Keynote session at regional STEM symposium",
      },
    ],
  },
];

/** Retrieve a gallery album by slug. */
export function getGalleryAlbumBySlug(slug: string): GalleryAlbum | undefined {
  return galleryAlbums.find((album) => album.slug === slug);
}

/** Flatten all gallery images across albums. */
export function getAllGalleryImages(): GalleryAlbum["images"] {
  return galleryAlbums.flatMap((album) => album.images);
}
