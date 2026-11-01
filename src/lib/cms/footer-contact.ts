import type { SocialPlatform } from "@/types";

export type FooterContactShape = {
  email: string;
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    region: string;
    country: string;
  };
  hours: {
    weekdays: string;
    saturday?: string;
    sunday?: string;
    note?: string;
  };
  developedBy?: {
    name: string;
    url: string;
  };
};

export type FooterSocialLink = {
  platform: SocialPlatform | string;
  label: string;
  href: string;
};

export function emptyFooterContact(): FooterContactShape {
  return {
    email: "",
    phone: "",
    whatsapp: "",
    whatsappLink: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      region: "",
      country: "",
    },
    hours: { weekdays: "" },
    developedBy: { name: "", url: "" },
  };
}

/** Normalize CMS/DB contact JSON into a safe editable shape. */
export function normalizeFooterContact(
  input?: Partial<FooterContactShape> | null
): FooterContactShape {
  const base = emptyFooterContact();
  if (!input || typeof input !== "object") return base;

  const developedBy =
    input.developedBy && typeof input.developedBy === "object"
      ? input.developedBy
      : null;

  return {
    email: typeof input.email === "string" ? input.email : "",
    phone: typeof input.phone === "string" ? input.phone : "",
    whatsapp: typeof input.whatsapp === "string" ? input.whatsapp : "",
    whatsappLink:
      typeof input.whatsappLink === "string" ? input.whatsappLink : "",
    address: {
      line1:
        typeof input.address?.line1 === "string" ? input.address.line1 : "",
      line2:
        typeof input.address?.line2 === "string" ? input.address.line2 : "",
      city: typeof input.address?.city === "string" ? input.address.city : "",
      region:
        typeof input.address?.region === "string" ? input.address.region : "",
      country:
        typeof input.address?.country === "string"
          ? input.address.country
          : "",
    },
    hours: {
      weekdays:
        typeof input.hours?.weekdays === "string" ? input.hours.weekdays : "",
      saturday:
        typeof input.hours?.saturday === "string"
          ? input.hours.saturday
          : undefined,
      sunday:
        typeof input.hours?.sunday === "string" ? input.hours.sunday : undefined,
      note: typeof input.hours?.note === "string" ? input.hours.note : undefined,
    },
    developedBy: {
      name:
        typeof developedBy?.name === "string" ? developedBy.name.trim() : "",
      url: typeof developedBy?.url === "string" ? developedBy.url.trim() : "",
    },
  };
}

export function normalizeFooterSocial(
  input?: FooterSocialLink[] | null
): FooterSocialLink[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      platform: item.platform || "linkedin",
      label: typeof item.label === "string" ? item.label : "",
      href: typeof item.href === "string" ? item.href : "",
    }));
}
