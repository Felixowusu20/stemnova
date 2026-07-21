import { images } from "@/content/images";
import type { Resource, ResourceTopic, ResourceType } from "@/types";

/** Educational resources — illustrative placeholder content. */
export const resources: Resource[] = [
  {
    id: "res-1",
    slug: "stem-discovery-selection-criteria",
    title: "STEM Discovery Selection Criteria",
    description:
      "Transparent overview of how students are identified and supported through Young Scholars STEM Discovery.",
    type: "pdf",
    topic: "talent-discovery",
    href: "#",
    imageUrl: images.programmes.youngScholars,
    publishedAt: "2025-03-10",
    isIllustrative: true,
  },
  {
    id: "res-2",
    slug: "young-scholars-faq",
    title: "Young Scholars Programme FAQ",
    description:
      "Answers for students, parents, and educators about eligibility, timelines, and application processes.",
    type: "faq",
    topic: "talent-discovery",
    href: "#",
    publishedAt: "2025-04-15",
    isIllustrative: true,
  },
  {
    id: "res-3",
    slug: "african-stem-fellows-application",
    title: "African STEM Fellows Application Guide",
    description:
      "Eligibility criteria, timeline, and required materials for prospective fellowship applicants.",
    type: "pdf",
    topic: "research-leadership",
    href: "#",
    imageUrl: images.programmes.fellows,
    publishedAt: "2025-05-01",
    isIllustrative: true,
  },
  {
    id: "res-4",
    slug: "first-grant-proposal-guide",
    title: "Building Your First Research Grant Proposal",
    description:
      "Step-by-step guide for early-career researchers writing competitive funding proposals.",
    type: "pdf",
    topic: "research-leadership",
    href: "#",
    publishedAt: "2025-06-20",
    isIllustrative: true,
  },
  {
    id: "res-5",
    slug: "women-in-stem-pathways",
    title: "Women in STEM: Career Pathways in Africa",
    description:
      "Profiles of African women scientists and engineers across disciplines, with entry requirements and role model stories.",
    type: "article",
    topic: "women-in-stem",
    href: "#",
    imageUrl: images.programmes.girlsScience,
    publishedAt: "2025-07-08",
    isIllustrative: true,
  },
  {
    id: "res-6",
    slug: "girls-stem-educator-guide",
    title: "Supporting Girls in STEM: Guide for Educators",
    description:
      "Evidence-based strategies for creating inclusive STEM classrooms and addressing gender barriers.",
    type: "pdf",
    topic: "women-in-stem",
    href: "#",
    publishedAt: "2025-02-28",
    isIllustrative: true,
  },
  {
    id: "res-7",
    slug: "quantum-educators-primer",
    title: "Introduction to Quantum Science for Educators",
    description:
      "Foundational primer covering key quantum concepts accessible to non-specialist teachers and faculty.",
    type: "pdf",
    topic: "quantum",
    href: "#",
    imageUrl: images.programmes.quantum,
    publishedAt: "2025-08-12",
    isIllustrative: true,
  },
  {
    id: "res-8",
    slug: "quantum-leaders-faq",
    title: "Quantum Education Leaders Programme FAQ",
    description:
      "Eligibility, application process, and programme structure for prospective participants.",
    type: "faq",
    topic: "quantum",
    href: "#",
    publishedAt: "2025-09-05",
    isIllustrative: true,
  },
  {
    id: "res-9",
    slug: "inquiry-stem-toolkit",
    title: "Inquiry-Based STEM Teaching Toolkit",
    description:
      "Classroom-ready activities and facilitation guides for secondary science teachers.",
    type: "pdf",
    topic: "teachers",
    href: "#",
    imageUrl: images.programmes.teachers,
    publishedAt: "2025-01-20",
    isIllustrative: true,
  },
  {
    id: "res-10",
    slug: "digital-stem-tools",
    title: "Digital Tools for STEM Classrooms",
    description:
      "Guide to integrating free and low-cost digital resources into science teaching across African contexts.",
    type: "article",
    topic: "teachers",
    href: "#",
    publishedAt: "2025-03-22",
    isIllustrative: true,
  },
  {
    id: "res-11",
    slug: "volunteer-handbook",
    title: "Volunteer & Mentor Handbook",
    description:
      "Essential reading for STEMNova volunteers and mentors covering roles, expectations, and safeguarding procedures.",
    type: "pdf",
    topic: "general",
    href: "#",
    publishedAt: "2025-01-05",
    isIllustrative: true,
  },
  {
    id: "res-12",
    slug: "stemnova-annual-report-2025",
    title: "STEMNova Foundation Annual Report 2025",
    description:
      "Illustrative summary of programme reach, fellowship outcomes, and institutional milestones for the 2025 period.",
    type: "pdf",
    topic: "general",
    href: "#",
    imageUrl: images.hero.impact,
    publishedAt: "2025-12-15",
    isIllustrative: true,
  },
];

/** Filter resources by topic. */
export function getResourcesByTopic(topic: ResourceTopic): Resource[] {
  return resources.filter((resource) => resource.topic === topic);
}

/** Filter resources by type. */
export function getResourcesByType(type: ResourceType): Resource[] {
  return resources.filter((resource) => resource.type === type);
}

/** Retrieve a resource by slug. */
export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug);
}

/** Retrieve FAQ resources only. */
export function getFaqResources(): Resource[] {
  return resources.filter((resource) => resource.type === "faq");
}
