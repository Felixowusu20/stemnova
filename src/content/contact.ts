import { siteConfig } from "@/content/site";

/**
 * Contact page copy — mock data until managed from the admin panel.
 */
export const contactPageContent = {
  eyebrow: "Contact",
  headline: "Get in Touch",
  shortIntro: "Reach the STEMNova team in Accra.",
  responseNote: "We reply within two business days.",
  details: [
    {
      id: "email",
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      id: "phone",
      label: "Phone",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    },
    {
      id: "address",
      label: "Office",
      value: [
        siteConfig.contact.address.line1,
        siteConfig.contact.address.line2,
        `${siteConfig.contact.address.city}, ${siteConfig.contact.address.region}`,
        siteConfig.contact.address.country,
      ]
        .filter(Boolean)
        .join(", "),
      href: undefined as string | undefined,
    },
    {
      id: "hours",
      label: "Hours",
      value: "Mon to Fri, 8:30 AM to 5:30 PM GMT",
      href: undefined as string | undefined,
    },
  ],
} as const;
