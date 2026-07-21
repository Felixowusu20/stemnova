import { images } from "@/content/images";
import type { Partner } from "@/types";

/**
 * Partner organizations — ALL are placeholder entries for website development.
 * These do not represent actual affiliations. Replace with verified partners before launch.
 */
export const partners: Partner[] = [
  {
    id: "partner-1",
    name: "Placeholder Health Supplies Co.",
    logoUrl: images.placeholders.partnerLogo("Health Supplies"),
    website: "#",
    description:
      "Illustrative placeholder partner — a health supplies company supporting dignity kit procurement. Not an actual affiliation.",
    isPlaceholder: true,
  },
  {
    id: "partner-2",
    name: "Placeholder Accra Community Foundation",
    logoUrl: images.placeholders.partnerLogo("Accra Foundation"),
    website: "#",
    description:
      "Illustrative placeholder partner — a community foundation providing grant support. Not an actual affiliation.",
    isPlaceholder: true,
  },
  {
    id: "partner-3",
    name: "Placeholder Education Trust",
    logoUrl: images.placeholders.partnerLogo("Edu Trust"),
    website: "#",
    description:
      "Illustrative placeholder partner — an education trust supporting school partnerships. Not an actual affiliation.",
    isPlaceholder: true,
  },
  {
    id: "partner-4",
    name: "Placeholder Tech Hub Ghana",
    logoUrl: images.placeholders.partnerLogo("Tech Hub"),
    website: "#",
    description:
      "Illustrative placeholder partner — a technology hub providing STEM workshop space. Not an actual affiliation.",
    isPlaceholder: true,
  },
  {
    id: "partner-5",
    name: "Placeholder Women's Leadership Network",
    logoUrl: images.placeholders.partnerLogo("Women Leaders"),
    website: "#",
    description:
      "Illustrative placeholder partner — a professional network supplying career mentors. Not an actual affiliation.",
    isPlaceholder: true,
  },
  {
    id: "partner-6",
    name: "Placeholder Retail Group Ghana",
    logoUrl: images.placeholders.partnerLogo("Retail Group"),
    website: "#",
    description:
      "Illustrative placeholder partner — a retail group hosting pad drive collection points. Not an actual affiliation.",
    isPlaceholder: true,
  },
  {
    id: "partner-7",
    name: "Placeholder Media House",
    logoUrl: images.placeholders.partnerLogo("Media House"),
    website: "#",
    description:
      "Illustrative placeholder partner — a media organization amplifying foundation stories. Not an actual affiliation.",
    isPlaceholder: true,
  },
  {
    id: "partner-8",
    name: "Placeholder University Psychology Dept.",
    logoUrl: images.placeholders.partnerLogo("Uni Psych"),
    website: "#",
    description:
      "Illustrative placeholder partner — a university department supporting counseling referrals. Not an actual affiliation.",
    isPlaceholder: true,
  },
];

/** Disclaimer for partner section display. */
export const PARTNERS_DISCLAIMER =
  "Partner logos and names shown are placeholders for website development. They do not represent current or past affiliations.";
