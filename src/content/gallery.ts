import { images } from "@/content/images";
import type { GalleryAlbum } from "@/types";

/** Photo gallery albums — illustrative Unsplash imagery; replace with foundation photography. */
export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "community-outreach",
    title: "Community Outreach",
    description:
      "Moments from our community health fairs, parent dialogues, and neighborhood engagement events across Greater Accra.",
    coverImageUrl: images.gallery.communityOutreach,
    images: [
      {
        url: images.gallery.communityOutreach,
        alt: "Volunteers and community members gathered at an outdoor health fair",
        caption: "Community health fair in East Legon — illustrative photo",
      },
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
        alt: "Group of volunteers organizing supplies at a community event",
        caption: "Volunteers preparing dignity kits for distribution",
      },
      {
        url: "https://images.unsplash.com/photo-1559027617-c481c8a0a0a0?w=800&q=80",
        alt: "Community members participating in a group discussion",
        caption: "Parent dialogue session on supporting girls' education",
      },
      {
        url: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
        alt: "Outreach team visiting a rural community",
        caption: "Rural outreach team arriving at a partner community",
      },
      {
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
        alt: "Diverse group of people collaborating at a community table",
        caption: "Community leaders and foundation staff planning an event",
      },
    ],
  },
  {
    slug: "school-visits",
    title: "School Visits",
    description:
      "Photos from visits to partner schools where we deliver workshops, distribute supplies, and train educators.",
    coverImageUrl: images.gallery.schoolVisits,
    images: [
      {
        url: images.gallery.schoolVisits,
        alt: "Students in a classroom engaged in a learning activity",
        caption: "Interactive session at a partner school in Accra",
      },
      {
        url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
        alt: "Teacher facilitating a classroom discussion with students",
        caption: "Teacher training workshop on supportive responses",
      },
      {
        url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
        alt: "Students reading together in a school library",
        caption: "Girls accessing educational materials in the school library",
      },
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
        alt: "Students walking on a university campus",
        caption: "Career exposure visit to a local university campus",
      },
    ],
  },
  {
    slug: "workshops",
    title: "Workshops",
    description:
      "Hands-on learning sessions covering menstrual health, wellness, public speaking, STEM, and career planning.",
    coverImageUrl: images.gallery.workshops,
    images: [
      {
        url: images.gallery.workshops,
        alt: "Facilitator leading a workshop with engaged participants",
        caption: "Menstrual health workshop for secondary school girls",
      },
      {
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        alt: "Students collaborating on a group project during a workshop",
        caption: "Group activity during a career development workshop",
      },
      {
        url: "https://images.unsplash.com/photo-1531487487862-6abf10f6d48a?w=800&q=80",
        alt: "Young women working together on a technology project",
        caption: "STEM workshop — introduction to coding concepts",
      },
      {
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
        alt: "Participants in a wellness circle discussion",
        caption: "Wellness circle session focused on stress management",
      },
      {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        alt: "Professional woman presenting to a group of students",
        caption: "Public speaking workshop with guest facilitator",
      },
    ],
  },
  {
    slug: "events",
    title: "Events",
    description:
      "Fundraisers, graduations, mentor matching days, and celebration events that bring our community together.",
    coverImageUrl: images.gallery.events,
    images: [
      {
        url: images.gallery.events,
        alt: "Audience seated at a foundation fundraising event",
        caption: "Annual fundraiser gala — illustrative event photo",
      },
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        alt: "Stage setup at a community celebration event",
        caption: "Wellness circle graduation ceremony stage",
      },
      {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
        alt: "Mentors and mentees meeting at a matching event",
        caption: "Mentor matching day — first meetings and goal setting",
      },
      {
        url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
        alt: "Group photo of event participants smiling together",
        caption: "Program graduates celebrating their achievements",
      },
    ],
  },
  {
    slug: "volunteer-activities",
    title: "Volunteer Activities",
    description:
      "Our dedicated volunteers sorting kits, facilitating sessions, mentoring girls, and powering every program.",
    coverImageUrl: images.gallery.volunteerActivities,
    images: [
      {
        url: images.gallery.volunteerActivities,
        alt: "Volunteers working together to pack supply kits",
        caption: "Monthly kit assembly day with volunteer team",
      },
      {
        url: "https://images.unsplash.com/photo-1559027617-c481c8a0a0a0?w=800&q=80",
        alt: "Volunteers coordinating at an outreach event",
        caption: "Volunteer coordinators at a community outreach day",
      },
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        alt: "Team of volunteers collaborating around a table",
        caption: "Volunteer training session before school visits",
      },
      {
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
        alt: "Professional woman mentoring a young student",
        caption: "One-on-one mentorship meeting — illustrative photo",
      },
      {
        url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
        alt: "Volunteer facilitating a small group discussion",
        caption: "Volunteer facilitator leading a peer support session",
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
