"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { FooterContactFields } from "@/components/admin/FooterContactFields";
import {
  normalizeFooterContact,
  normalizeFooterSocial,
} from "@/lib/cms/footer-contact";

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
  featuredAnnouncement,
}: {
  initial: SettingsShape | null;
  featuredAnnouncement?: string | null;
}) {
  const router = useRouter();
  const [form, setForm] = useState<SettingsShape>(() => {
    if (!initial) {
      return {
        name: "",
        shortName: "",
        tagline: "",
        description: "",
        logoUrl: "",
        logoAlt: "",
        contact: normalizeFooterContact(null),
        social: [],
        announcementBar: { text: "", dismissible: true },
        heroSlides: [],
        pageHeroImages: {},
      };
    }

    return {
      ...initial,
      contact: normalizeFooterContact(initial.contact),
      social: normalizeFooterSocial(initial.social),
    };
  });
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
        <p className="mt-2 text-sm text-navy/55">
          The bar above the navbar shows your next upcoming event title and date
          automatically (from Content → Events). If there is no upcoming event,
          the fallback text below is used.
        </p>
        <div className="mt-4 grid gap-4">
          {featuredAnnouncement ? (
            <div className="rounded-xl border border-teal/20 bg-teal/5 px-3.5 py-3 text-sm text-navy">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                Currently showing
              </p>
              <p className="mt-1 font-medium">{featuredAnnouncement}</p>
            </div>
          ) : (
            <p className="rounded-xl border border-navy/10 bg-light/60 px-3.5 py-3 text-sm text-navy/60">
              No upcoming events — fallback text will show (if set).
            </p>
          )}
          <div>
            <label className={labelClass} htmlFor="announcement">
              Fallback text
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
              placeholder="Shown only when there is no upcoming event"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="announcementHref">
              Fallback link (optional)
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
              placeholder="/events"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-navy">
            <input
              type="checkbox"
              checked={form.announcementBar?.dismissible ?? true}
              onChange={(e) =>
                setForm({
                  ...form,
                  announcementBar: {
                    text: form.announcementBar?.text || "",
                    href: form.announcementBar?.href,
                    dismissible: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 rounded border-navy/20 text-blue focus:ring-blue"
            />
            Allow visitors to dismiss the bar
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-navy">
          Footer & site contact
        </h2>
        <p className="mt-1 text-sm text-navy/55">
          Email, phone, address, and social links shown in the website footer.
        </p>
        <div className="mt-4">
          <FooterContactFields
            contact={form.contact}
            social={form.social}
            onContactChange={(contact) => setForm({ ...form, contact })}
            onSocialChange={(social) => setForm({ ...form, social })}
          />
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
