"use client";

import { Plus, Trash2 } from "lucide-react";
import type { SocialPlatform } from "@/types";
import {
  normalizeFooterContact,
  normalizeFooterSocial,
  type FooterContactShape,
  type FooterSocialLink,
} from "@/lib/cms/footer-contact";

export type { FooterContactShape, FooterSocialLink };

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:ring-2 focus:ring-blue";
const labelClass = "mb-1.5 block text-sm font-medium text-navy";

const SOCIAL_PLATFORMS: { value: SocialPlatform; label: string }[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "X (Twitter)" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
];

export function FooterContactFields({
  contact,
  social,
  onContactChange,
  onSocialChange,
  compact = false,
}: {
  contact?: FooterContactShape | null;
  social?: FooterSocialLink[] | null;
  onContactChange: (next: FooterContactShape) => void;
  onSocialChange: (next: FooterSocialLink[]) => void;
  compact?: boolean;
}) {
  const safeContact = normalizeFooterContact(contact);
  const safeSocial = normalizeFooterSocial(social);

  const shell = compact
    ? "space-y-3 rounded-xl border border-navy/10 bg-white p-3"
    : "space-y-4";

  return (
    <div className={shell}>
      {!compact ? null : (
        <div>
          <p className="text-sm font-semibold text-navy">
            Footer & site-wide contact
          </p>
          <p className="mt-0.5 text-[11px] text-navy/50">
            These values appear in the website footer and WhatsApp button.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ["email", "Email"],
            ["phone", "Phone"],
            ["whatsapp", "WhatsApp number"],
            ["whatsappLink", "WhatsApp link"],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label className={labelClass} htmlFor={`footer-${key}`}>
              {label}
            </label>
            <input
              id={`footer-${key}`}
              className={fieldClass}
              value={safeContact[key]}
              onChange={(e) =>
                onContactChange({ ...safeContact, [key]: e.target.value })
              }
              placeholder={
                key === "email"
                  ? "info@stemnovafoundation.org"
                  : key === "whatsappLink"
                    ? "https://wa.me/233..."
                    : "+233 ..."
              }
            />
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ["line1", "Address line 1"],
            ["line2", "Address line 2"],
            ["city", "City"],
            ["region", "Region"],
            ["country", "Country"],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label className={labelClass} htmlFor={`footer-address-${key}`}>
              {label}
            </label>
            <input
              id={`footer-address-${key}`}
              className={fieldClass}
              value={safeContact.address[key] || ""}
              onChange={(e) =>
                onContactChange({
                  ...safeContact,
                  address: { ...safeContact.address, [key]: e.target.value },
                })
              }
            />
          </div>
        ))}
      </div>

      <div>
        <label className={labelClass} htmlFor="footer-hours">
          Office hours
        </label>
        <input
          id="footer-hours"
          className={fieldClass}
          value={safeContact.hours.weekdays}
          onChange={(e) =>
            onContactChange({
              ...safeContact,
              hours: { ...safeContact.hours, weekdays: e.target.value },
            })
          }
          placeholder="Monday – Friday: 8:30 AM – 5:30 PM GMT"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-navy">Social links</p>
            <p className="text-[11px] text-navy/50">
              Shown in the footer and on the contact page.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onSocialChange([
                ...safeSocial,
                { platform: "linkedin", label: "LinkedIn", href: "" },
              ])
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Add link
          </button>
        </div>

        {safeSocial.length === 0 ? (
          <p className="rounded-xl border border-dashed border-navy/15 px-3 py-4 text-sm text-navy/50">
            No social links yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {safeSocial.map((link, index) => (
              <li
                key={`${link.platform}-${index}`}
                className="grid gap-2 rounded-xl border border-navy/10 bg-light/40 p-3 sm:grid-cols-[140px_1fr_1fr_auto]"
              >
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Platform
                  </label>
                  <select
                    className={fieldClass}
                    value={link.platform}
                    onChange={(e) => {
                      const platform = e.target.value as SocialPlatform;
                      const meta = SOCIAL_PLATFORMS.find(
                        (item) => item.value === platform
                      );
                      const next = [...safeSocial];
                      next[index] = {
                        ...next[index],
                        platform,
                        label: meta?.label || next[index].label,
                      };
                      onSocialChange(next);
                    }}
                  >
                    {SOCIAL_PLATFORMS.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Label
                  </label>
                  <input
                    className={fieldClass}
                    value={link.label}
                    onChange={(e) => {
                      const next = [...safeSocial];
                      next[index] = { ...next[index], label: e.target.value };
                      onSocialChange(next);
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    URL
                  </label>
                  <input
                    className={fieldClass}
                    value={link.href}
                    onChange={(e) => {
                      const next = [...safeSocial];
                      next[index] = { ...next[index], href: e.target.value };
                      onSocialChange(next);
                    }}
                    placeholder="https://"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() =>
                      onSocialChange(safeSocial.filter((_, i) => i !== index))
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-2 text-xs font-semibold text-red-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
