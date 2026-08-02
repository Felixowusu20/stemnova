export const CMS_COLLECTIONS = [
  {
    id: "programs",
    label: "Programmes",
    description: "Programme pages, cards, and detail content",
    hasSlug: true,
  },
  {
    id: "events",
    label: "Events",
    description: "Upcoming and past events",
    hasSlug: true,
  },
  {
    id: "blog",
    label: "News & Blog",
    description: "Articles, announcements, and publications",
    hasSlug: true,
  },
  {
    id: "team",
    label: "Leadership",
    description: "Founders, directors, and team profiles",
    hasSlug: true,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Quotes from fellows, mentors, and partners",
    hasSlug: false,
  },
  {
    id: "partners",
    label: "Partners",
    description: "Partner organisations and logos",
    hasSlug: false,
  },
  {
    id: "gallery",
    label: "Gallery",
    description: "Photo albums and programme galleries",
    hasSlug: true,
  },
  {
    id: "resources",
    label: "Resources",
    description: "Guides, FAQs, and downloadable materials",
    hasSlug: true,
  },
  {
    id: "philosophy-quotes",
    label: "Philosophy quotes",
    description: "Leadership philosophy slider quotes",
    hasSlug: false,
  },
  {
    id: "pages",
    label: "Pages",
    description: "About, vision, contact, and other page copy",
    hasSlug: true,
  },
] as const;

export type CmsCollectionId = (typeof CMS_COLLECTIONS)[number]["id"];

export function getCollectionMeta(id: string) {
  return CMS_COLLECTIONS.find((item) => item.id === id);
}
