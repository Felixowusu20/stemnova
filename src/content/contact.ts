import { siteConfig } from "@/content/site";

export const CONTACT_DETAIL_ICONS = [
  "email",
  "phone",
  "address",
  "hours",
] as const;

export type ContactDetailIcon = (typeof CONTACT_DETAIL_ICONS)[number];

export const CONTACT_FORM_FIELD_IDS = [
  "name",
  "email",
  "phone",
  "subject",
  "message",
] as const;

export type ContactFormFieldId = (typeof CONTACT_FORM_FIELD_IDS)[number];

export type ContactDetail = {
  id: string;
  label: string;
  value: string;
  href?: string;
  icon: ContactDetailIcon;
};

export type ContactFormFieldConfig = {
  id: ContactFormFieldId;
  label: string;
  required: boolean;
};

export type ContactPageContent = {
  eyebrow: string;
  headline: string;
  shortIntro: string;
  responseNote: string;
  followLabel: string;
  formTitle: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  details: ContactDetail[];
  formFields: ContactFormFieldConfig[];
};

/** Fallback contact page copy used until CMS content is published. */
export const contactPageContent: ContactPageContent = {
  eyebrow: "Contact",
  headline: "Get in Touch",
  shortIntro: "Reach the STEMNova team in Accra.",
  responseNote: "We reply within two business days.",
  followLabel: "Follow us",
  formTitle: "Send a Message",
  submitLabel: "Send message",
  successTitle: "Message sent",
  successMessage: "Thanks. We will get back to you soon.",
  details: [
    {
      id: "email",
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: "email",
    },
    {
      id: "phone",
      label: "Phone",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
      icon: "phone",
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
      icon: "address",
    },
    {
      id: "hours",
      label: "Hours",
      value: "Mon to Fri, 8:30 AM to 5:30 PM GMT",
      icon: "hours",
    },
  ],
  formFields: [
    { id: "name", label: "Full name", required: true },
    { id: "email", label: "Email", required: true },
    { id: "phone", label: "Phone", required: false },
    { id: "subject", label: "Subject", required: true },
    { id: "message", label: "Message", required: true },
  ],
};
