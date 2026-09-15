import type { Metadata } from "next";
import { siteConfig } from "@/content";
import { getSiteUrl } from "@/lib/site-url";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  const siteUrl = getSiteUrl();
  if (!path || path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/images/stemnova-logo.jpg",
  imageAlt,
  type = "website",
  publishedTime,
  authors,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    authors: authors?.map((name) => ({ name })),
    ...(noIndex ? {} : { alternates: { canonical: url } }),
    openGraph: {
      type,
      url,
      locale: "en_GH",
      siteName: siteConfig.name,
      title: ogTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@stemnovafdn",
      creator: "@stemnovafdn",
      title: ogTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
