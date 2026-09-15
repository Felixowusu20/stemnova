import { siteConfig } from "@/content";
import { newsHeroImage } from "@/lib/cms/news-image";
import { newsParagraphs, parseNewsContent } from "@/lib/cms/news-body";
import { absoluteUrl } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { BlogPost, Event, Program, TeamMember } from "@/types";

function orgId() {
  return `${getSiteUrl()}/#organization`;
}

function websiteId() {
  return `${getSiteUrl()}/#website`;
}

/** Organization / NonProfit schema for site-wide use. */
export function getOrganizationSchema(): Record<string, unknown> {
  const { contact, social } = siteConfig;
  const siteUrl = getSiteUrl();
  const logo = `${siteUrl}/images/stemnova-logo.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "EducationalOrganization"],
    "@id": orgId(),
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    legalName: siteConfig.name,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: logo,
      width: 1024,
      height: 1024,
    },
    image: logo,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: [contact.address.line1, contact.address.line2]
        .filter(Boolean)
        .join(", "),
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      addressCountry: "GH",
    },
    areaServed: {
      "@type": "Continent",
      name: "Africa",
    },
    foundingLocation: {
      "@type": "Place",
      name: "Accra, Ghana",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Accra",
        addressCountry: "GH",
      },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: contact.email,
        telephone: contact.phone,
        areaServed: "Africa",
        availableLanguage: ["English"],
      },
    ],
    sameAs: social.map((link) => link.href),
    knowsAbout: [
      "STEM education",
      "African scientific talent",
      "research fellowships",
      "women in STEM",
      "quantum education",
      "teacher development",
    ],
  };
}

export function getWebSiteSchema(): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    url: siteUrl,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    inLanguage: "en-GH",
    publisher: { "@id": orgId() },
  };
}

export function getBreadcrumbSchema(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Article schema for blog post pages. */
export function getArticleSchema(
  post: BlogPost,
  url: string
): Record<string, unknown> {
  const image = newsHeroImage(post.imageUrl);
  const body = newsParagraphs(parseNewsContent(post.content)).join(" ");

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: image.startsWith("http") ? image : absoluteUrl(image),
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    inLanguage: "en-GH",
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: { "@id": orgId() },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(body ? { articleBody: body.slice(0, 5000) } : {}),
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
    organizer: { "@id": orgId() },
  };
}

export function getCourseSchema(
  program: Program,
  url: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.shortDescription,
    url,
    provider: { "@id": orgId() },
    image: program.heroImageUrl,
    inLanguage: "en-GH",
  };
}

export function getPersonSchema(
  leader: TeamMember,
  url: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: leader.name,
    jobTitle: leader.role,
    description: leader.bio,
    image: leader.imageUrl,
    url,
    worksFor: { "@id": orgId() },
    ...(leader.email ? { email: leader.email } : {}),
    ...(leader.linkedin ? { sameAs: [leader.linkedin] } : {}),
  };
}
