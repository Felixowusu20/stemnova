"use client";

import Link from "next/link";
import {
  FooterContactFields,
  type FooterContactShape,
  type FooterSocialLink,
} from "@/components/admin/FooterContactFields";
import { type ContactPageData } from "@/lib/cms/page-forms";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

export function ContactPageFields({
  value,
  onChange,
  siteContact,
  siteSocial,
  onSiteContactChange,
  onSiteSocialChange,
}: {
  value: ContactPageData;
  onChange: (next: ContactPageData) => void;
  siteContact: FooterContactShape;
  siteSocial: FooterSocialLink[];
  onSiteContactChange: (next: FooterContactShape) => void;
  onSiteSocialChange: (next: FooterSocialLink[]) => void;
}) {
  function updateField(
    id: ContactPageData["formFields"][number]["id"],
    patch: Partial<ContactPageData["formFields"][number]>
  ) {
    onChange({
      ...value,
      formFields: value.formFields.map((field) =>
        field.id === id ? { ...field, ...patch } : field
      ),
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div>
        <p className="text-sm font-semibold text-navy">Contact page</p>
        <p className="text-[11px] text-navy/50">
          Edit footer email, phone, and address below. Page copy and form
          labels follow. You can also manage these in{" "}
          <Link href="/admin/settings" className="font-semibold text-teal">
            Site settings
          </Link>
          .
        </p>
      </div>

      <FooterContactFields
        compact
        contact={siteContact}
        social={siteSocial}
        onContactChange={onSiteContactChange}
        onSocialChange={onSiteSocialChange}
      />

      <div className="space-y-3 rounded-xl border border-navy/10 bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
          Left panel copy
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/70">
              Eyebrow
            </label>
            <input
              className={fieldClass}
              value={value.eyebrow}
              onChange={(e) =>
                onChange({ ...value, eyebrow: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/70">
              Follow us label
            </label>
            <input
              className={fieldClass}
              value={value.followLabel}
              onChange={(e) =>
                onChange({ ...value, followLabel: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Short intro
          </label>
          <textarea
            className={fieldClass}
            rows={2}
            value={value.shortIntro}
            onChange={(e) =>
              onChange({ ...value, shortIntro: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Response note
          </label>
          <input
            className={fieldClass}
            value={value.responseNote}
            onChange={(e) =>
              onChange({ ...value, responseNote: e.target.value })
            }
            placeholder="We reply within two business days."
          />
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-navy/10 bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
          Form
        </p>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Form heading
          </label>
          <input
            className={fieldClass}
            value={value.formTitle}
            onChange={(e) =>
              onChange({ ...value, formTitle: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Submit button
          </label>
          <input
            className={fieldClass}
            value={value.submitLabel}
            onChange={(e) =>
              onChange({ ...value, submitLabel: e.target.value })
            }
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/70">
              Success title
            </label>
            <input
              className={fieldClass}
              value={value.successTitle}
              onChange={(e) =>
                onChange({ ...value, successTitle: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/70">
              Success message
            </label>
            <input
              className={fieldClass}
              value={value.successMessage}
              onChange={(e) =>
                onChange({ ...value, successMessage: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
            Form fields
          </p>
          {value.formFields.map((field) => (
            <div
              key={field.id}
              className="grid items-end gap-2 sm:grid-cols-[1fr_auto]"
            >
              <div>
                <label className="mb-1 block text-xs font-medium text-navy/70">
                  {field.id === "name"
                    ? "Name label"
                    : field.id === "email"
                      ? "Email label"
                      : field.id === "phone"
                        ? "Phone label"
                        : field.id === "subject"
                          ? "Subject label"
                          : "Message label"}
                </label>
                <input
                  className={fieldClass}
                  value={field.label}
                  onChange={(e) =>
                    updateField(field.id, { label: e.target.value })
                  }
                />
              </div>
              <label className="mb-2 flex items-center gap-2 pb-0.5 text-xs font-medium text-navy">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(field.id, { required: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-navy/30"
                />
                Required
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
