import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { PublicChrome } from "@/components/layout/PublicChrome";
import { siteConfig } from "@/content";
import { getOrganizationSchema } from "@/lib/seo-schemas";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "STEMNova Foundation",
    "Africa STEM",
    "scientific talent",
    "research leadership",
    "women in STEM",
    "quantum education",
    "African researchers",
    "STEM education Africa",
  ],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/images/stemnova-logo.jpg",
        width: 1024,
        height: 1024,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/stemnova-logo.jpg"],
  },
  icons: {
    icon: "/images/stemnova-logo.jpg",
    apple: "/images/stemnova-logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A2540",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={getOrganizationSchema()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
