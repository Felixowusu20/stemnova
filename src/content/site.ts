import type { SiteConfig } from "@/types";

/** Site-wide configuration for STEMNova Foundation. */
export const siteConfig: SiteConfig = {
  name: "STEMNova Foundation",
  shortName: "STEMNova",
  tagline: "Discovering Talent. Building Leadership. Advancing Africa in STEM.",
  description:
    "STEMNova Foundation is a pan-African non-profit dedicated to discovering scientific talent, developing research leaders, and advancing STEM education, innovation, and scientific excellence across Africa.",
  contact: {
    email: "info@stemnovafoundation.org",
    phone: "+233 30 123 4567",
    whatsapp: "+233 24 123 4567",
    whatsappLink: "https://wa.me/233241234567",
    address: {
      line1: "Innovation Hub, Ring Road Central",
      line2: "Suite 4B, Science Park",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
    },
    hours: {
      weekdays: "Monday – Friday: 8:30 AM – 5:30 PM GMT",
      saturday: "Saturday: By appointment",
      sunday: "Sunday: Closed",
      note: "Fellowship and partnership inquiries typically receive a response within 2–3 business days.",
    },
  },
  social: [
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/company/stemnova-foundation",
    },
    {
      platform: "twitter",
      label: "X (Twitter)",
      href: "https://twitter.com/stemnovafdn",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://instagram.com/stemnovafoundation",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: "https://youtube.com/@stemnovafoundation",
    },
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://facebook.com/stemnovafoundation",
    },
  ],
  announcementBar: {
    text: "Applications open: African STEM Fellows 2026 Cohort — Apply by 15 September →",
    href: "/programs/african-stem-fellows",
    dismissible: true,
  },
};
