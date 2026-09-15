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
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo-schemas";
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
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "education",
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "STEMNova Foundation",
    "Africa STEM",
    "African STEM education",
    "scientific talent Africa",
    "research fellowships Africa",
    "women in STEM Africa",
    "quantum education Ghana",
    "STEM camps Africa",
    "teacher development STEM",
    "pan-African STEM NGO",
    "Accra Ghana education",
  ],
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
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
    site: "@stemnovafdn",
    creator: "@stemnovafdn",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/stemnova-logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  robots: {
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
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification
            ? { other: { "msvalidate.01": bingVerification } }
            : {}),
        },
      }
    : {}),
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
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
      lang="en-GH"
      data-typography={ACTIVE_TYPOGRAPHY}
      className={fontVariables}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <JsonLd data={[getOrganizationSchema(), getWebSiteSchema()]} />
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
