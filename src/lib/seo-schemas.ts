import { siteConfig } from "@/content";
import { getSiteUrl } from "@/lib/site-url";
import type { BlogPost, Event } from "@/types";

const siteUrl = getSiteUrl();

/** Organization / NonProfit schema for site-wide use. */
export function getOrganizationSchema(): Record<string, unknown> {
  const { contact, social } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: [contact.address.line1, contact.address.line2]
        .filter(Boolean)
        .join(", "),
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
    },
    email: contact.email,
    telephone: contact.phone,
    sameAs: social.map((link) => link.href),
  };
}

/** Article schema for blog post pages. */
export function getArticleSchema(
  post: BlogPost,
  url: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/** Event schema for upcoming foundation events. */
export function getEventSchema(
  event: Event,
  url: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: event.isPast
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Accra",
        addressCountry: "GH",
      },
    },
    image: event.imageUrl,
    url,
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}
