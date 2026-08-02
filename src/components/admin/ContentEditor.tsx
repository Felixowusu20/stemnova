"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EventRegistrationFormBuilder } from "@/components/admin/EventRegistrationFormBuilder";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  parseRegistrationForm,
  type EventRegistrationFormConfig,
} from "@/lib/event-registration-form";

type ContentItem = {
  id: string;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  body?: string | null;
  coverUrl?: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder: number;
  data?: unknown;
};

function readTeamContact(data: unknown) {
  if (!data || typeof data !== "object") {
    return { email: "", linkedin: "" };
  }
  const record = data as Record<string, unknown>;
  return {
    email: typeof record.email === "string" ? record.email : "",
    linkedin: typeof record.linkedin === "string" ? record.linkedin : "",
  };
}

function readEventFields(data: unknown) {
  if (!data || typeof data !== "object") {
    return {
      date: "",
      time: "",
      location: "",
      category: "workshop",
      audience: "",
      isPast: false,
      registrationRequired: true,
    };
  }
  const record = data as Record<string, unknown>;
  return {
    date: typeof record.date === "string" ? record.date : "",
    time: typeof record.time === "string" ? record.time : "",
    location: typeof record.location === "string" ? record.location : "",
    category: typeof record.category === "string" ? record.category : "workshop",
    audience: typeof record.audience === "string" ? record.audience : "",
    isPast: Boolean(record.isPast),
    registrationRequired:
      record.registrationRequired === undefined
        ? true
        : Boolean(record.registrationRequired),
  };
}

export function ContentEditor({
  collection,
  hasSlug,
  initial,
}: {
  collection: string;
  hasSlug: boolean;
  initial: ContentItem | null;
}) {
  const router = useRouter();
  const initialContact = readTeamContact(initial?.data);
  const initialEvent = readEventFields(initial?.data);
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [body, setBody] = useState(initial?.body || "");
  const [email, setEmail] = useState(initialContact.email);
  const [linkedin, setLinkedin] = useState(initialContact.linkedin);
  const [eventDate, setEventDate] = useState(initialEvent.date);
  const [eventTime, setEventTime] = useState(initialEvent.time);
  const [eventLocation, setEventLocation] = useState(initialEvent.location);
  const [eventCategory, setEventCategory] = useState(initialEvent.category);
  const [eventAudience, setEventAudience] = useState(initialEvent.audience);
  const [eventIsPast, setEventIsPast] = useState(initialEvent.isPast);
  const [eventRegistrationRequired, setEventRegistrationRequired] = useState(
    initialEvent.registrationRequired
  );
  const [registrationForm, setRegistrationForm] =
    useState<EventRegistrationFormConfig>(() =>
      parseRegistrationForm(initial?.data)
    );
  const [coverUrl, setCoverUrl] = useState(initial?.coverUrl || "");
  const [status, setStatus] = useState(initial?.status || "PUBLISHED");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const existingData =
      initial?.data && typeof initial.data === "object" && initial.data !== null
        ? { ...(initial.data as Record<string, unknown>) }
        : {};

    // Keep structured fields in sync so the public site can overwrite mocks.
    if (coverUrl) {
      existingData.heroImageUrl = coverUrl;
      existingData.imageUrl = coverUrl;
      existingData.coverImageUrl = coverUrl;
      existingData.logoUrl = existingData.logoUrl ?? coverUrl;
    }

    if (collection === "team") {
      existingData.name = title;
      if (excerpt) existingData.role = excerpt;
      if (body) {
        existingData.bio = body;
        existingData.fullBio = body
          .split(/\n\s*\n/)
          .map((part) => part.trim())
          .filter(Boolean);
      }
      existingData.email = email.trim();
      existingData.linkedin = linkedin.trim();
    }

    if (collection === "programs") {
      existingData.title = title;
      if (excerpt) existingData.shortDescription = excerpt;
      if (body) existingData.intro = body;
      if (coverUrl) {
        existingData.heroImageUrl = coverUrl;
        const gallery = Array.isArray(existingData.galleryImageUrls)
          ? (existingData.galleryImageUrls as string[]).filter(
              (url) => typeof url === "string" && url.length > 0
            )
          : [];
        existingData.galleryImageUrls =
          gallery.length > 0 ? [coverUrl, ...gallery.slice(1)] : [coverUrl];
      }
    }

    if (collection === "events") {
      existingData.title = title;
      if (excerpt) existingData.description = excerpt;
      if (body) existingData.about = body;
      if (coverUrl) existingData.imageUrl = coverUrl;
      existingData.date = eventDate.trim();
      existingData.time = eventTime.trim();
      existingData.location = eventLocation.trim();
      existingData.category = eventCategory;
      existingData.audience = eventAudience.trim();
      existingData.isPast = eventIsPast;
      existingData.registrationRequired = eventRegistrationRequired;
      existingData.registrationForm = {
        title: registrationForm.title.trim() || "Event registration",
        description: registrationForm.description,
        submitLabel: registrationForm.submitLabel.trim() || "Submit registration",
        fields: registrationForm.fields
          .map((field) => ({
            ...field,
            label: field.label.trim() || "Untitled question",
            placeholder: field.placeholder?.trim() || undefined,
            options:
              field.type === "select" || field.type === "radio"
                ? (field.options || [])
                    .map((option) => option.trim())
                    .filter(Boolean)
                : undefined,
          }))
          .filter((field) => field.label),
      };
    }

    if (collection === "blog") {
      existingData.title = title;
      if (excerpt) existingData.excerpt = excerpt;
      if (body) {
        existingData.content = body
          .split(/\n\s*\n/)
          .map((part) => part.trim())
          .filter(Boolean);
      }
      if (coverUrl) existingData.imageUrl = coverUrl;
    }

    if (collection === "gallery") {
      existingData.title = title;
      if (excerpt) existingData.description = excerpt;
      if (coverUrl) existingData.coverImageUrl = coverUrl;
    }

    if (collection === "testimonials") {
      existingData.author = title;
      if (excerpt) existingData.role = excerpt;
      if (body) existingData.quote = body;
      if (coverUrl) existingData.imageUrl = coverUrl;
    }

    if (collection === "partners") {
      existingData.name = title;
      if (excerpt) existingData.description = excerpt;
      if (body) existingData.description = body || existingData.description;
      if (coverUrl) existingData.logoUrl = coverUrl;
    }

    if (collection === "resources") {
      existingData.title = title;
      if (excerpt) existingData.description = excerpt;
      if (coverUrl) existingData.imageUrl = coverUrl;
    }

    if (collection === "philosophy-quotes") {
      if (body) existingData.quote = body;
    }

    if (collection === "pages") {
      if (slug === "vision-mission") {
        if (excerpt) existingData.vision = excerpt;
        if (body) existingData.mission = body;
      }
      if (slug === "about-story" && body) {
        existingData.paragraphs = body
          .split(/\n\s*\n/)
          .map((part) => part.trim())
          .filter(Boolean);
      }
      if (slug === "contact") {
        existingData.headline = title;
        if (excerpt) existingData.shortIntro = excerpt;
      }
    }

    const payload = {
      id: initial?.id,
      collection,
      title,
      slug: hasSlug ? slug || null : null,
      excerpt: excerpt || null,
      body: body || null,
      coverUrl: coverUrl || null,
      status,
      sortOrder,
      data: existingData,
    };

    const res = await fetch("/api/admin/content", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setSaving(false);

    if (!res.ok) {
      setMessage(result.error || "Save failed");
      return;
    }

    setMessage("Saved.");
    router.push(`/admin/content/${collection}`);
    router.refresh();
  }

  async function onDelete() {
    if (!initial) return;
    setDeleting(true);
    await fetch(`/api/admin/content?id=${initial.id}`, { method: "DELETE" });
    setDeleting(false);
    setConfirmDelete(false);
    router.push(`/admin/content/${collection}`);
    router.refresh();
  }

  const field =
    "w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue";

  const excerptLabel =
    collection === "team"
      ? "Role / title"
      : collection === "programs"
        ? "Short description"
        : collection === "events"
          ? "Short description"
          : collection === "testimonials"
            ? "Role"
            : collection === "partners"
              ? "Short description"
              : collection === "resources"
                ? "Description"
                : collection === "gallery"
                  ? "Album description"
                  : collection === "pages" && slug === "vision-mission"
                    ? "Vision"
                    : collection === "pages" && slug === "contact"
                      ? "Short intro"
                      : "Excerpt";

  const bodyLabel =
    collection === "team"
      ? "Biography"
      : collection === "programs"
        ? "Introduction"
        : collection === "events"
          ? "About"
          : collection === "blog"
            ? "Article body"
            : collection === "testimonials"
              ? "Quote"
              : collection === "philosophy-quotes"
                ? "Quote"
                : collection === "pages" && slug === "vision-mission"
                  ? "Mission"
                  : collection === "pages" && slug === "about-story"
                    ? "Story"
                    : "Body";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Title</label>
              <input
                className={field}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            {hasSlug && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">Slug</label>
                <input
                  className={field}
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="my-content-slug"
                />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {excerptLabel}
              </label>
              <textarea
                className={field}
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {bodyLabel}
              </label>
              <textarea
                className={field}
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={
                  collection === "blog" ||
                  collection === "team" ||
                  collection === "pages"
                    ? "Separate paragraphs with a blank line."
                    : undefined
                }
              />
            </div>
            {collection === "events" && (
              <div className="grid gap-4 rounded-xl border border-navy/10 bg-light/60 p-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Event date
                  </label>
                  <input
                    type="date"
                    className={field}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Time
                  </label>
                  <input
                    className={field}
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="9:00 AM to 5:00 PM GMT"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">
                    Location
                  </label>
                  <input
                    className={field}
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Accra, Ghana"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Category
                  </label>
                  <select
                    className={field}
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                  >
                    <option value="conference">Conference</option>
                    <option value="camp">Camp</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="workshop">Workshop</option>
                    <option value="symposium">Symposium</option>
                    <option value="challenge">Challenge</option>
                    <option value="mentorship">Mentorship</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Audience
                  </label>
                  <input
                    className={field}
                    value={eventAudience}
                    onChange={(e) => setEventAudience(e.target.value)}
                    placeholder="Researchers, educators, policymakers"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-navy">
                  <input
                    type="checkbox"
                    checked={eventIsPast}
                    onChange={(e) => setEventIsPast(e.target.checked)}
                    className="h-4 w-4 rounded border-navy/30"
                  />
                  Mark as past event
                </label>
                <label className="flex items-center gap-2 text-sm text-navy">
                  <input
                    type="checkbox"
                    checked={eventRegistrationRequired}
                    onChange={(e) =>
                      setEventRegistrationRequired(e.target.checked)
                    }
                    className="h-4 w-4 rounded border-navy/30"
                  />
                  Registration required
                </label>
              </div>
            )}
            {collection === "events" && eventRegistrationRequired && (
              <EventRegistrationFormBuilder
                value={registrationForm}
                onChange={setRegistrationForm}
              />
            )}
            {collection === "team" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className={field}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@stemnovafoundation.org"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    className={field}
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Status</label>
                <select
                  className={field}
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as ContentItem["status"])
                  }
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Sort order
                </label>
                <input
                  type="number"
                  className={field}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
          <ImageUploadField
            label="Featured image"
            value={coverUrl}
            onChange={(url) => setCoverUrl(url || "")}
            folder={`stemnova/${collection}`}
            helpText="Upload or replace the image shown on the public site for this item."
          />
        </div>
      </div>

      {message && (
        <p className="rounded-xl bg-teal/10 px-4 py-3 text-sm text-navy">
          {message}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save item"}
        </button>
        {initial && (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-700"
          >
            Delete
          </button>
        )}
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this item?"
        description={`“${initial?.title || "This item"}” will be removed from the admin and the public site. This can’t be undone.`}
        confirmLabel="Delete item"
        pending={deleting}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => void onDelete()}
      />
    </form>
  );
}
