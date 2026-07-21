import { images } from "@/content/images";
import type { Partner, PartnerCategory } from "@/types";

/**
 * Partner organizations — ALL are placeholder entries for website development.
 * These do not represent actual affiliations. Replace with verified partners before launch.
 */
export const partners: Partner[] = [
  {
    id: "partner-uni-1",
    name: "University of Ghana",
    logoUrl: images.placeholders.partnerLogo("University of Ghana"),
    website: "#",
    description:
      "Illustrative placeholder — flagship university partner supporting Young Scholars STEM Discovery and fellowship placements. Not an actual affiliation.",
    category: "university",
    isPlaceholder: true,
  },
  {
    id: "partner-uni-2",
    name: "University of Lagos",
    logoUrl: images.placeholders.partnerLogo("University of Lagos"),
    website: "#",
    description:
      "Illustrative placeholder — partner for STEM Teachers Academy and research fellowship programmes in West Africa. Not an actual affiliation.",
    category: "university",
    isPlaceholder: true,
  },
  {
    id: "partner-uni-3",
    name: "University of Cape Town",
    logoUrl: images.placeholders.partnerLogo("University of Cape Town"),
    website: "#",
    description:
      "Illustrative placeholder — Southern Africa hub for materials science research and shared laboratory access. Not an actual affiliation.",
    category: "university",
    isPlaceholder: true,
  },
  {
    id: "partner-gov-1",
    name: "Ghana Ministry of Education",
    logoUrl: images.placeholders.partnerLogo("Ghana MoE"),
    website: "#",
    description:
      "Illustrative placeholder — government partner for STEM curriculum policy engagement and teacher certification alignment. Not an actual affiliation.",
    category: "government",
    isPlaceholder: true,
  },
  {
    id: "partner-gov-2",
    name: "African Union Commission — STI",
    logoUrl: images.placeholders.partnerLogo("AU STI"),
    website: "#",
    description:
      "Illustrative placeholder — pan-African science, technology, and innovation policy collaboration. Not an actual affiliation.",
    category: "government",
    isPlaceholder: true,
  },
  {
    id: "partner-intl-1",
    name: "Placeholder Global Science Foundation",
    logoUrl: images.placeholders.partnerLogo("Global Science"),
    website: "#",
    description:
      "Illustrative placeholder — international foundation supporting fellowship endowments and research exchanges. Not an actual affiliation.",
    category: "international",
    isPlaceholder: true,
  },
  {
    id: "partner-intl-2",
    name: "Placeholder European Research Council Partner",
    logoUrl: images.placeholders.partnerLogo("ERC Partner"),
    website: "#",
    description:
      "Illustrative placeholder — international research collaboration and quantum education partnerships. Not an actual affiliation.",
    category: "international",
    isPlaceholder: true,
  },
  {
    id: "partner-intl-3",
    name: "Placeholder UNESCO STEM Initiative",
    logoUrl: images.placeholders.partnerLogo("UNESCO STEM"),
    website: "#",
    description:
      "Illustrative placeholder — global STEM education standards and teacher development collaboration. Not an actual affiliation.",
    category: "international",
    isPlaceholder: true,
  },
  {
    id: "partner-tech-1",
    name: "Placeholder Quantum Computing Corp.",
    logoUrl: images.placeholders.partnerLogo("Quantum Corp"),
    website: "#",
    description:
      "Illustrative placeholder — technology partner providing quantum computing platform access for education programmes. Not an actual affiliation.",
    category: "technology",
    isPlaceholder: true,
  },
  {
    id: "partner-tech-2",
    name: "Placeholder African Tech Hub",
    logoUrl: images.placeholders.partnerLogo("Tech Hub"),
    website: "#",
    description:
      "Illustrative placeholder — innovation lab space and hackathon hosting for sustainable development challenges. Not an actual affiliation.",
    category: "technology",
    isPlaceholder: true,
  },
  {
    id: "partner-ngo-1",
    name: "Placeholder Girls' Education Alliance",
    logoUrl: images.placeholders.partnerLogo("Girls Alliance"),
    website: "#",
    description:
      "Illustrative placeholder — NGO partner co-delivering Girls Discover Science outreach in rural communities. Not an actual affiliation.",
    category: "ngo",
    isPlaceholder: true,
  },
  {
    id: "partner-ngo-2",
    name: "Placeholder Science Outreach Network",
    logoUrl: images.placeholders.partnerLogo("Science Outreach"),
    website: "#",
    description:
      "Illustrative placeholder — community-based STEM outreach and volunteer coordination. Not an actual affiliation.",
    category: "ngo",
    isPlaceholder: true,
  },
  {
    id: "partner-research-1",
    name: "Placeholder African Materials Research Institute",
    logoUrl: images.placeholders.partnerLogo("AMRI"),
    website: "#",
    description:
      "Illustrative placeholder — research institute partner for materials science fellowships and shared laboratory infrastructure. Not an actual affiliation.",
    category: "research",
    isPlaceholder: true,
  },
  {
    id: "partner-research-2",
    name: "Placeholder Pan-African Research Consortium",
    logoUrl: images.placeholders.partnerLogo("PARC"),
    website: "#",
    description:
      "Illustrative placeholder — multi-institutional research network supporting Young African Researchers Fellowship placements. Not an actual affiliation.",
    category: "research",
    isPlaceholder: true,
  },
];

/** Disclaimer for partner section display. */
export const PARTNERS_DISCLAIMER =
  "Partner logos and names shown are placeholders for website development. They do not represent current or past affiliations.";

/** Filter partners by category. */
export function getPartnersByCategory(
  category: PartnerCategory
): Partner[] {
  return partners.filter((partner) => partner.category === category);
}
