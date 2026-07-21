import { images } from "@/content/images";
import type { Project } from "@/types";

/** Funding campaigns — illustrative placeholder data related to STEMNova programmes. */
export const projects: Project[] = [
  {
    slug: "young-scholars-scholarship-fund",
    title: "Young Scholars Scholarship Fund",
    shortDescription:
      "Fund scholarships and discovery camp placements for promising STEM students from under-resourced African schools.",
    status: "active",
    featured: true,
    goal: 250000,
    raised: 168400,
    currency: "USD",
    timeline: {
      start: "2025-06-01",
      end: "2026-12-31",
      milestones: [
        { date: "2025-06-15", label: "Campaign launch — first 200 scholarships funded" },
        { date: "2025-09-01", label: "Expanded to Nigeria and Kenya partner schools" },
        { date: "2026-01-01", label: "Target: 500 scholarships across 12 countries" },
        { date: "2026-12-31", label: "Goal: 800 scholarships with full camp placement support" },
      ],
    },
    location: "18 African countries",
    activities: [
      "Full and partial scholarships for Young Scholars STEM Discovery camp placements",
      "University transition support including application fees and preparatory materials",
      "Mentorship matching for scholarship recipients within the STEMNova network",
      "Longitudinal tracking of scholarship recipients' academic progression",
    ],
    impact: [
      "420 scholarships awarded to date (illustrative)",
      "87% of recipients progressed to advanced STEM courses (illustrative)",
      "Students from 180 partner schools across 12 countries supported (illustrative)",
    ],
    sponsors: [
      {
        name: "Placeholder Global Education Foundation",
        logoUrl: images.placeholders.partnerLogo("Global Education"),
        isPlaceholder: true,
      },
      {
        name: "Placeholder African Development Partner",
        logoUrl: images.placeholders.partnerLogo("AfDev Partner"),
        isPlaceholder: true,
      },
    ],
    updates: [
      {
        date: "2025-12-01",
        title: "420 Scholarships Awarded",
        summary:
          "We've funded 420 scholarships across 12 countries. Our next milestone targets 500 by March 2026.",
      },
      {
        date: "2025-09-15",
        title: "Nigeria & Kenya Expansion",
        summary:
          "Scholarship fund expanded to partner schools in Lagos, Abuja, and Nairobi—reaching 120 additional students.",
      },
    ],
    galleryImageUrls: [
      images.programmes.youngScholars,
      images.gallery[5],
      images.gallery[0],
    ],
    heroImageUrl: images.programmes.youngScholars,
    isIllustrative: true,
  },
  {
    slug: "girls-discover-science-campaign",
    title: "Girls Discover Science Campaign",
    shortDescription:
      "Support girls-only STEM camps, women mentor networks, and scholarships for girls pursuing advanced science education.",
    status: "active",
    featured: true,
    goal: 180000,
    raised: 112600,
    currency: "USD",
    girlsSupported: 4800,
    timeline: {
      start: "2025-03-01",
      end: "2026-12-31",
      milestones: [
        { date: "2025-03-15", label: "Campaign launch — first regional camp in Accra" },
        { date: "2025-10-18", label: "Southern Africa symposium — 300 girls reached" },
        { date: "2026-06-01", label: "Target: 6,000 cumulative girls supported" },
      ],
    },
    location: "West, East, and Southern Africa",
    activities: [
      "Regional Girls in STEM camps with hands-on laboratory and engineering modules",
      "Women in Science speaker series and mentor matching",
      "Scholarships for girls transitioning to university STEM programmes",
      "Parent and educator workshops on supporting girls' scientific ambitions",
    ],
    impact: [
      "4,800 girls reached across 18 countries (illustrative)",
      "72% STEM course persistence among alumnae (illustrative)",
      "320 women scientist mentors engaged (illustrative)",
    ],
    sponsors: [
      {
        name: "Placeholder Girls' Education Alliance",
        logoUrl: images.placeholders.partnerLogo("Girls Alliance"),
        isPlaceholder: true,
      },
    ],
    updates: [
      {
        date: "2025-11-01",
        title: "4,800 Girls Milestone",
        summary:
          "Girls Discover Science has reached 4,800 participants. Campaign funds next regional camps in Rwanda and Senegal.",
      },
    ],
    galleryImageUrls: [
      images.programmes.girlsScience,
      images.gallery[3],
    ],
    heroImageUrl: images.programmes.girlsScience,
    isIllustrative: true,
  },
  {
    slug: "research-fellowship-endowment",
    title: "African STEM Research Fellowship Endowment",
    shortDescription:
      "Build a sustainable endowment funding Young African Researchers Fellowships and African STEM Fellows placements.",
    status: "upcoming",
    featured: false,
    goal: 500000,
    raised: 78400,
    currency: "USD",
    timeline: {
      start: "2026-01-15",
      end: "2028-12-31",
      milestones: [
        { date: "2026-01-15", label: "Endowment campaign launch" },
        { date: "2026-06-30", label: "Target: $200,000 seed endowment" },
        { date: "2028-12-31", label: "Goal: Self-sustaining fellowship funding for 50 researchers annually" },
      ],
    },
    location: "Pan-African",
    activities: [
      "Multi-year research fellowships with stipend and project funding",
      "International collaboration and conference travel support",
      "Publication coaching and grant-writing training",
      "Transition support for post-fellowship faculty appointments",
    ],
    impact: [
      "Target: 50 fellowship placements annually from endowment income (illustrative projection)",
      "890 researchers supported through programme to date (illustrative baseline)",
      "78 peer-reviewed publications from fellowship-supported research (illustrative)",
    ],
    sponsors: [],
    updates: [
      {
        date: "2026-01-08",
        title: "Endowment Campaign Opens",
        summary:
          "Early supporters can contribute to build sustainable fellowship funding. Launch event at Africa STEM Leadership Summit.",
      },
    ],
    galleryImageUrls: [
      images.programmes.fellows,
      images.programmes.researchers,
    ],
    heroImageUrl: images.programmes.fellows,
    isIllustrative: true,
  },
];

/** Retrieve a project by its slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Retrieve the featured active project. */
export function getFeaturedProject(): Project | undefined {
  return projects.find((project) => project.featured && project.status === "active");
}

/** Filter projects by status. */
export function getProjectsByStatus(
  status: Project["status"]
): Project[] {
  return projects.filter((project) => project.status === status);
}
