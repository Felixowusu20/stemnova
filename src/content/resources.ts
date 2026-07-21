import { images } from "@/content/images";
import type { Resource, ResourceTopic, ResourceType } from "@/types";

/** Educational resources — illustrative placeholder content. */
export const resources: Resource[] = [
  {
    id: "res-1",
    slug: "understanding-your-cycle",
    title: "Understanding Your Cycle: A Guide for Young Women",
    description:
      "An illustrated guide covering menstrual anatomy, cycle tracking, common experiences, and when to seek medical advice.",
    type: "pdf",
    topic: "menstrual-health",
    href: "#",
    imageUrl: images.programs.menstrualHealth.gallery[0],
    publishedAt: "2025-03-10",
    isIllustrative: true,
  },
  {
    id: "res-2",
    slug: "menstrual-health-parent-faq",
    title: "Menstrual Health FAQ for Parents & Guardians",
    description:
      "Answers to frequently asked questions about supporting daughters through puberty and menstruation with empathy.",
    type: "faq",
    topic: "menstrual-health",
    href: "#",
    publishedAt: "2025-04-15",
    isIllustrative: true,
  },
  {
    id: "res-3",
    slug: "breaking-stigma-infographic",
    title: "Breaking the Stigma: Myths vs. Facts",
    description:
      "A shareable infographic debunking common menstrual health myths prevalent in Ghanaian communities.",
    type: "infographic",
    topic: "menstrual-health",
    href: "#",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    publishedAt: "2025-05-01",
    isIllustrative: true,
  },
  {
    id: "res-4",
    slug: "breathing-techniques-exam-stress",
    title: "Five Breathing Techniques for Exam Stress",
    description:
      "A short video demonstrating practical breathing exercises students can use before exams and during anxious moments.",
    type: "video",
    topic: "mental-health",
    href: "#",
    imageUrl: images.programs.mentalHealth.gallery[0],
    publishedAt: "2025-06-20",
    isIllustrative: true,
  },
  {
    id: "res-5",
    slug: "when-to-seek-help",
    title: "When to Seek Help: Mental Health Warning Signs",
    description:
      "An infographic for students and caregivers on recognizing emotional distress and knowing when professional support is needed.",
    type: "infographic",
    topic: "mental-health",
    href: "#",
    publishedAt: "2025-07-08",
    isIllustrative: true,
  },
  {
    id: "res-6",
    slug: "peer-support-manual",
    title: "Peer Support Circle Facilitator Manual",
    description:
      "A structured guide for running safe, inclusive group wellness sessions in schools and community settings.",
    type: "pdf",
    topic: "mental-health",
    href: "#",
    publishedAt: "2025-02-28",
    isIllustrative: true,
  },
  {
    id: "res-7",
    slug: "building-your-cv",
    title: "Building Your First CV: A Step-by-Step Guide",
    description:
      "PDF guide with templates and examples tailored for Ghanaian secondary school and university applicants.",
    type: "pdf",
    topic: "career-development",
    href: "#",
    imageUrl: images.programs.careerDevelopment.gallery[0],
    publishedAt: "2025-08-12",
    isIllustrative: true,
  },
  {
    id: "res-8",
    slug: "women-in-stem-ghana",
    title: "Women in STEM: Career Pathways in Ghana",
    description:
      "An article profiling diverse STEM careers available in Ghana, entry requirements, and inspiring role models.",
    type: "article",
    topic: "career-development",
    href: "#",
    publishedAt: "2025-09-05",
    isIllustrative: true,
  },
  {
    id: "res-9",
    slug: "mentorship-guide-mentees",
    title: "Mentorship Expectations: Guide for Mentees",
    description:
      "How to prepare for a mentorship relationship, set goals, and communicate effectively with your mentor.",
    type: "pdf",
    topic: "career-development",
    href: "#",
    publishedAt: "2025-01-20",
    isIllustrative: true,
  },
  {
    id: "res-10",
    slug: "volunteer-handbook",
    title: "Volunteer Handbook & Safeguarding Policy",
    description:
      "Essential reading for all foundation volunteers covering roles, expectations, and child safeguarding procedures.",
    type: "pdf",
    topic: "general",
    href: "#",
    publishedAt: "2025-01-05",
    isIllustrative: true,
  },
  {
    id: "res-11",
    slug: "community-conversation-toolkit",
    title: "Community Conversation Toolkit",
    description:
      "Facilitator guide for community leaders hosting stigma-reduction dialogues about girls' health and education.",
    type: "pdf",
    topic: "general",
    href: "#",
    publishedAt: "2025-04-22",
    isIllustrative: true,
  },
  {
    id: "res-12",
    slug: "digital-wellbeing-guide",
    title: "Digital Wellbeing for Teenagers",
    description:
      "An article on healthy social media habits, online safety, and managing comparison and cyberbullying.",
    type: "article",
    topic: "mental-health",
    href: "#",
    publishedAt: "2025-10-15",
    isIllustrative: true,
  },
  {
    id: "res-13",
    slug: "financial-literacy-basics",
    title: "Financial Literacy Basics for Young Women",
    description:
      "A beginner-friendly guide to saving, budgeting, and understanding mobile money — essential skills for independence.",
    type: "pdf",
    topic: "career-development",
    href: "#",
    publishedAt: "2025-11-01",
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
