import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Sans,
  Inter,
  Lato,
  Lora,
  Montserrat,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { PublicChrome } from "@/components/layout/PublicChrome";
import { siteConfig } from "@/content";
import { getOrganizationSchema } from "@/lib/seo-schemas";
import { getSiteUrl } from "@/lib/site-url";
import { ACTIVE_TYPOGRAPHY } from "@/lib/typography";
import "./globals.css";

/* ── Option 1: Warm & Trustworthy ── */
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* ── Option 2: Bold & Action-Oriented ── */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

/* ── Option 3: Solid & Structural ── */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
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

const fontVariables = [
  lora.variable,
  inter.variable,
  montserrat.variable,
  lato.variable,
  jakarta.variable,
  ibmPlexSans.variable,
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-typography={ACTIVE_TYPOGRAPHY}
      className={fontVariables}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
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
