import { z } from "zod";

export const FORM_TYPES = [
  "CONTACT",
  "TESTIMONIAL",
  "EVENT_REGISTRATION",
  "VOLUNTEER",
  "MENTOR",
  "FELLOWSHIP",
  "SPONSOR",
  "PARTNER",
  "NEWSLETTER",
] as const;

export type FormType = (typeof FORM_TYPES)[number];

export const FORM_TYPE_LABELS: Record<FormType, string> = {
  CONTACT: "Contact",
  TESTIMONIAL: "Testimonials",
  EVENT_REGISTRATION: "Event registrations",
  VOLUNTEER: "Volunteers",
  MENTOR: "Mentors",
  FELLOWSHIP: "Fellowship applications",
  SPONSOR: "Programme sponsors",
  PARTNER: "Partnerships",
  NEWSLETTER: "Newsletter",
};

export const FORM_TYPE_HREFS: Record<FormType, string> = {
  CONTACT: "/admin/inbox/contact",
  TESTIMONIAL: "/admin/inbox/testimonials",
  EVENT_REGISTRATION: "/admin/inbox/events",
  VOLUNTEER: "/admin/inbox/volunteer",
  MENTOR: "/admin/inbox/mentor",
  FELLOWSHIP: "/admin/inbox/fellowship",
  SPONSOR: "/admin/inbox/sponsor",
  PARTNER: "/admin/inbox/partner",
  NEWSLETTER: "/admin/inbox/newsletter",
};

export const submissionSchema = z.object({
  type: z.enum(FORM_TYPES),
  payload: z.record(z.string(), z.unknown()),
  relatedSlug: z.string().optional().nullable(),
  relatedTitle: z.string().optional().nullable(),
});

export async function submitForm(input: {
  type: FormType;
  payload: Record<string, unknown>;
  relatedSlug?: string | null;
  relatedTitle?: string | null;
}) {
  const res = await fetch("/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof data.error === "string" ? data.error : "Submission failed"
    );
  }
  return data as { id: string; ok: true };
}

export function pickContactFields(payload: Record<string, unknown>) {
  const asString = (key: string) => {
    const value = payload[key];
    return typeof value === "string" && value.trim() ? value.trim() : null;
  };

  return {
    name:
      asString("name") ||
      asString("fullName") ||
      asString("contactPerson") ||
      asString("organisationName") ||
      asString("organizationName"),
    email: asString("email") || asString("donorEmail"),
    subject:
      asString("subject") ||
      asString("programme") ||
      asString("track") ||
      asString("areaOfInterest") ||
      asString("role"),
    message:
      asString("message") ||
      asString("motivation") ||
      asString("statement") ||
      asString("proposedSupport"),
  };
}
