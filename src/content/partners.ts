import { images } from "@/content/images";
import type { Partner, PartnerCategory } from "@/types";

export const PARTNER_CATEGORIES: {
  id: PartnerCategory;
  label: string;
}[] = [
  { id: "university", label: "Universities" },
  { id: "government", label: "Government" },
  { id: "international", label: "International" },
  { id: "technology", label: "Technology" },
  { id: "ngo", label: "NGOs" },
  { id: "research", label: "Research" },
];

export function partnerCategoryLabel(category: PartnerCategory): string {
  return (
    PARTNER_CATEGORIES.find((item) => item.id === category)?.label ?? category
  );
}

export function toPartnerSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Partner organizations — ALL are placeholder entries for website development.
 * These do not represent actual affiliations. Replace with verified partners before launch.
 */
export const partners: Partner[] = [
  {
    id: "partner-uni-1",
    slug: "university-of-ghana",
    name: "University of Ghana",
    logoUrl: images.placeholders.partnerLogo("University of Ghana"),
    website: "",
    description:
      "Flagship university partner supporting Young Scholars STEM Discovery and fellowship placements.",
    body: "University of Ghana partners with STEMNova on talent discovery, student pathways, and research fellowship placements. Together we strengthen STEM education pipelines from secondary school through early research careers across Ghana and West Africa.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "university",
    isPlaceholder: true,
  },
  {
    id: "partner-uni-2",
    slug: "university-of-lagos",
    name: "University of Lagos",
    logoUrl: images.placeholders.partnerLogo("University of Lagos"),
    website: "",
    description:
      "Partner for STEM Teachers Academy and research fellowship programmes in West Africa.",
    body: "University of Lagos collaborates with STEMNova on teacher development and research fellowship pathways that expand access to high-quality STEM education across West Africa.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "university",
    isPlaceholder: true,
  },
  {
    id: "partner-uni-3",
    slug: "university-of-cape-town",
    name: "University of Cape Town",
    logoUrl: images.placeholders.partnerLogo("University of Cape Town"),
    website: "",
    description:
      "Southern Africa hub for materials science research and shared laboratory access.",
    body: "University of Cape Town works with STEMNova to grow materials science capacity, shared laboratory access, and research collaboration for emerging African scientists.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "university",
    isPlaceholder: true,
  },
  {
    id: "partner-gov-1",
    slug: "ghana-ministry-of-education",
    name: "Ghana Ministry of Education",
    logoUrl: images.placeholders.partnerLogo("Ghana MoE"),
    website: "",
    description:
      "Government partner for STEM curriculum policy engagement and teacher certification alignment.",
    body: "STEMNova engages with the Ghana Ministry of Education on STEM curriculum alignment, teacher development priorities, and pathways that connect policy ambition to classroom practice.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "government",
    isPlaceholder: true,
  },
  {
    id: "partner-gov-2",
    slug: "african-union-commission-sti",
    name: "African Union Commission STI",
    logoUrl: images.placeholders.partnerLogo("AU STI"),
    website: "",
    description:
      "Pan-African science, technology, and innovation policy collaboration.",
    body: "STEMNova aligns programme design with continental science, technology, and innovation priorities, supporting talent systems that serve Africa's long-term research and education goals.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "government",
    isPlaceholder: true,
  },
  {
    id: "partner-intl-1",
    slug: "global-science-foundation",
    name: "Placeholder Global Science Foundation",
    logoUrl: images.placeholders.partnerLogo("Global Science"),
    website: "",
    description:
      "International foundation supporting fellowship endowments and research exchanges.",
    body: "This international foundation partnership supports fellowship endowments, research exchanges, and cross-border collaboration that connect African researchers to global science networks.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "international",
    isPlaceholder: true,
  },
  {
    id: "partner-intl-2",
    slug: "european-research-council-partner",
    name: "Placeholder European Research Council Partner",
    logoUrl: images.placeholders.partnerLogo("ERC Partner"),
    website: "",
    description:
      "International research collaboration and quantum education partnerships.",
    body: "This partnership strengthens research collaboration and quantum education pathways linking African institutions with European research communities.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "international",
    isPlaceholder: true,
  },
  {
    id: "partner-intl-3",
    slug: "unesco-stem-initiative",
    name: "Placeholder UNESCO STEM Initiative",
    logoUrl: images.placeholders.partnerLogo("UNESCO STEM"),
    website: "",
    description:
      "Global STEM education standards and teacher development collaboration.",
    body: "Collaboration focused on STEM education standards, educator development, and inclusive access to scientific learning opportunities across Africa.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "international",
    isPlaceholder: true,
  },
  {
    id: "partner-tech-1",
    slug: "quantum-computing-corp",
    name: "Placeholder Quantum Computing Corp.",
    logoUrl: images.placeholders.partnerLogo("Quantum Corp"),
    website: "",
    description:
      "Technology partner providing quantum computing platform access for education programmes.",
    body: "This technology partnership expands access to quantum computing platforms and learning tools for STEMNova education and research programmes.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "technology",
    isPlaceholder: true,
  },
  {
    id: "partner-tech-2",
    slug: "african-tech-hub",
    name: "Placeholder African Tech Hub",
    logoUrl: images.placeholders.partnerLogo("Tech Hub"),
    website: "",
    description:
      "Innovation lab space and hackathon hosting for sustainable development challenges.",
    body: "An innovation partner supporting lab space, hackathons, and applied STEM projects that address sustainable development challenges across African communities.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "technology",
    isPlaceholder: true,
  },
  {
    id: "partner-ngo-1",
    slug: "girls-education-alliance",
    name: "Placeholder Girls' Education Alliance",
    logoUrl: images.placeholders.partnerLogo("Girls Alliance"),
    website: "",
    description:
      "NGO partner co-delivering Girls Discover Science outreach in rural communities.",
    body: "This NGO partnership co-delivers Girls Discover Science outreach, mentoring, and community programmes that expand STEM opportunities for girls in rural and underserved areas.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "ngo",
    isPlaceholder: true,
  },
  {
    id: "partner-ngo-2",
    slug: "science-outreach-network",
    name: "Placeholder Science Outreach Network",
    logoUrl: images.placeholders.partnerLogo("Science Outreach"),
    website: "",
    description:
      "Community-based STEM outreach and volunteer coordination.",
    body: "A community outreach partner helping STEMNova coordinate volunteers, local STEM events, and accessible science learning experiences.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "ngo",
    isPlaceholder: true,
  },
  {
    id: "partner-research-1",
    slug: "african-materials-research-institute",
    name: "Placeholder African Materials Research Institute",
    logoUrl: images.placeholders.partnerLogo("AMRI"),
    website: "",
    description:
      "Research institute partner for materials science fellowships and shared laboratory infrastructure.",
    body: "This research institute partnership supports materials science fellowships, shared laboratory infrastructure, and collaborative projects for African researchers.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "research",
    isPlaceholder: true,
  },
  {
    id: "partner-research-2",
    slug: "pan-african-research-consortium",
    name: "Placeholder Pan-African Research Consortium",
    logoUrl: images.placeholders.partnerLogo("PARC"),
    website: "",
    description:
      "Multi-institutional research network supporting Young African Researchers Fellowship placements.",
    body: "A multi-institutional research network that helps place Young African Researchers Fellows and deepen collaboration across African laboratories and universities.\n\nThis listing is an illustrative placeholder for website development and does not represent a confirmed affiliation.",
    category: "research",
    isPlaceholder: true,
  },
];

/** Disclaimer shown with partner listings. */
export const PARTNERS_DISCLAIMER =
  "Partner names and logos on this site are illustrative placeholders for website development and do not represent confirmed affiliations.";

/** Filter partners by category. */
export function getPartnersByCategory(
  category: PartnerCategory
): Partner[] {
  return partners.filter((partner) => partner.category === category);
}

export function getPartnerBySlug(slug: string): Partner | undefined {
  return partners.find((partner) => partner.slug === slug);
}
