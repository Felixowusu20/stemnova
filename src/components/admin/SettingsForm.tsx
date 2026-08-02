"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type SettingsShape = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logoUrl?: string | null;
  logoAlt?: string | null;
  contact: {
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
  };
  social: { platform: string; label: string; href: string }[];
  announcementBar?: {
    text: string;
    href?: string;
    dismissible: boolean;
  } | null;
  heroSlides?: { src: string; alt: string }[] | null;
  pageHeroImages?: Record<string, string> | null;
};

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:ring-2 focus:ring-blue";
const labelClass = "mb-1.5 block text-sm font-medium text-navy";

const PAGE_HERO_KEYS = [
  "home",
  "about",
  "programs",
  "research",
  "impact",
  "contact",
  "events",
] as const;

export function SettingsForm({
  initial,
}: {
  initial: SettingsShape | null;
}) {
  const router = useRouter();
  const [form, setForm] = useState<SettingsShape>(
    initial ?? {
      name: "",
      shortName: "",
      tagline: "",
      description: "",
      logoUrl: "",
      logoAlt: "",
      contact: {
        email: "",
        phone: "",
        whatsapp: "",
        whatsappLink: "",
        address: {
          line1: "",
          city: "",
          region: "",
          country: "",
        },
        hours: { weekdays: "" },
      },
      social: [],
      announcementBar: { text: "", dismissible: true },
      heroSlides: [],
      pageHeroImages: {},
    }
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const heroSlides = form.heroSlides ?? [];
  const pageHeroImages = form.pageHeroImages ?? {};

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setMessage("Settings saved successfully.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-navy">Identity</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="name">
              Site name
            </label>
            <input
              id="name"
              className={fieldClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="shortName">
              Short name
            </label>
            <input
              id="shortName"
              className={fieldClass}
              value={form.shortName}
              onChange={(e) => setForm({ ...form, shortName: e.target.value })}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="tagline">
              Tagline
            </label>
            <input
              id="tagline"
              className={fieldClass}
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className={fieldClass}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-navy">
          Navbar logo
        </h2>
        <div className="mt-4 max-w-md">
          <ImageUploadField
            label="Logo image"
            value={form.logoUrl}
            folder="stemnova/branding"
            onChange={(url) => setForm({ ...form, logoUrl: url })}
            helpText="Upload the logo shown in the navbar and footer."
          />
        </div>
      </section>

      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-navy">
          Homepage hero slides
        </h2>
        <p className="mt-1 text-sm text-navy/55">
          Replace each carousel image with an uploaded photo.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {heroSlides.map((slide, index) => (
            <div key={`slide-${index}`} className="space-y-2">
              <ImageUploadField
                label={`Slide ${index + 1}`}
                value={slide.src}
                folder="stemnova/heroes"
                onChange={(url) => {
                  const next = [...heroSlides];
                  next[index] = {
                    ...next[index],
                    src: url || "",
                  };
                  setForm({ ...form, heroSlides: next });
                }}
              />
              <input
                className={fieldClass}
                value={slide.alt}
                onChange={(e) => {
                  const next = [...heroSlides];
                  next[index] = { ...next[index], alt: e.target.value };
                  setForm({ ...form, heroSlides: next });
                }}
                placeholder="Alt text"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-navy">
          Page hero images
        </h2>
        <p className="mt-1 text-sm text-navy/55">
          Background heroes for key pages across the site.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {PAGE_HERO_KEYS.map((key) => (
            <ImageUploadField
              key={key}
              label={`${key} page`}
              value={pageHeroImages[key] || ""}
              folder="stemnova/page-heroes"
              onChange={(url) =>
                setForm({
                  ...form,
                  pageHeroImages: {
                    ...pageHeroImages,
                    [key]: url || "",
                  },
                })
              }
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-navy">
          Announcement bar
        </h2>
        <div className="mt-4 grid gap-4">
          <div>
            <label className={labelClass} htmlFor="announcement">
              Text
            </label>
            <input
              id="announcement"
              className={fieldClass}
              value={form.announcementBar?.text || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  announcementBar: {
                    text: e.target.value,
                    href: form.announcementBar?.href,
                    dismissible: form.announcementBar?.dismissible ?? true,
                  },
                })
              }
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="announcementHref">
              Link (optional)
            </label>
            <input
              id="announcementHref"
              className={fieldClass}
              value={form.announcementBar?.href || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  announcementBar: {
                    text: form.announcementBar?.text || "",
                    href: e.target.value,
                    dismissible: form.announcementBar?.dismissible ?? true,
                  },
                })
              }
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-navy">Contact</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {(
            [
              ["email", "Email"],
              ["phone", "Phone"],
              ["whatsapp", "WhatsApp"],
              ["whatsappLink", "WhatsApp link"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className={labelClass} htmlFor={key}>
                {label}
              </label>
              <input
                id={key}
                className={fieldClass}
                value={form.contact[key]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, [key]: e.target.value },
                  })
                }
              />
            </div>
          ))}
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
              <label className={labelClass} htmlFor={`address-${key}`}>
                {label}
              </label>
              <input
                id={`address-${key}`}
                className={fieldClass}
                value={form.contact.address[key] || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: {
                      ...form.contact,
                      address: {
                        ...form.contact.address,
                        [key]: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </section>

      {message && (
        <p className="rounded-xl bg-teal/10 px-4 py-3 text-sm text-navy" role="status">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d3354] disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
