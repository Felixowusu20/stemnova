"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { AboutOverviewPageFields } from "@/components/admin/AboutOverviewPageFields";
import { AboutStoryPageFields } from "@/components/admin/AboutStoryPageFields";
import { ContactPageFields } from "@/components/admin/ContactPageFields";
import {
  normalizeFooterContact,
  normalizeFooterSocial,
  type FooterContactShape,
  type FooterSocialLink,
} from "@/lib/cms/footer-contact";
import { EventRegistrationFormBuilder } from "@/components/admin/EventRegistrationFormBuilder";
import { GovernancePageFields } from "@/components/admin/GovernancePageFields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ImpactPageFields } from "@/components/admin/ImpactPageFields";
import { LeadershipPageFields } from "@/components/admin/LeadershipPageFields";
import { ProgramFields } from "@/components/admin/ProgramFields";
import { RoadmapPageFields } from "@/components/admin/RoadmapPageFields";
import { VisionMissionPageFields } from "@/components/admin/VisionMissionPageFields";
import {
  parseAboutOverviewPageData,
  parseAboutStoryPageData,
  parseContactPageData,
  parseGovernancePageData,
  parseImpactPageData,
  parseLeadershipPageData,
  parseProgramFields,
  parseRoadmapPageData,
  parseVisionMissionPageData,
  type AboutOverviewPageData,
  type AboutStoryPageData,
  type ContactPageData,
  type GovernancePageData,
  type ImpactPageData,
  type LeadershipPageData,
  type ProgramFieldsData,
  type RoadmapPageData,
  type VisionMissionPageData,
} from "@/lib/cms/page-forms";
import {
  LEADERSHIP_CATEGORIES,
  getLeadershipCategory,
  isFounderCategory,
  resolveLeadershipCategory,
  type LeadershipCategoryId,
} from "@/lib/cms/leadership-roles";
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
    return {
      email: "",
      linkedin: "",
      leadershipCategory: "other" as LeadershipCategoryId,
    };
  }
  const record = data as Record<string, unknown>;
  return {
    email: typeof record.email === "string" ? record.email : "",
    linkedin: typeof record.linkedin === "string" ? record.linkedin : "",
    leadershipCategory: resolveLeadershipCategory({
      leadershipCategory: record.leadershipCategory,
      isFounder: record.isFounder,
    }),
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
  siteContactInitial,
  siteSocialInitial,
}: {
  collection: string;
  hasSlug: boolean;
  initial: ContentItem | null;
  siteContactInitial?: FooterContactShape | null;
  siteSocialInitial?: FooterSocialLink[] | null;
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
  const [leadershipCategory, setLeadershipCategory] =
    useState<LeadershipCategoryId>(initialContact.leadershipCategory);
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
  const [siteContact, setSiteContact] = useState<FooterContactShape>(() =>
    normalizeFooterContact(siteContactInitial)
  );
  const [siteSocial, setSiteSocial] = useState<FooterSocialLink[]>(() =>
    normalizeFooterSocial(siteSocialInitial)
  );
  const [governanceData, setGovernanceData] = useState<GovernancePageData>(() =>
    parseGovernancePageData(initial?.data)
  );
  const [roadmapData, setRoadmapData] = useState<RoadmapPageData>(() =>
    parseRoadmapPageData(initial?.data)
  );
  const [impactData, setImpactData] = useState<ImpactPageData>(() =>
    parseImpactPageData(initial?.data)
  );
  const [visionMissionData, setVisionMissionData] =
    useState<VisionMissionPageData>(() =>
      parseVisionMissionPageData(initial?.data, {
        excerpt: initial?.excerpt || undefined,
        body: initial?.body || undefined,
      })
    );
  const [aboutStoryData, setAboutStoryData] = useState<AboutStoryPageData>(() =>
    parseAboutStoryPageData(initial?.data, {
      body: initial?.body || undefined,
    })
  );
  const [aboutOverviewData, setAboutOverviewData] =
    useState<AboutOverviewPageData>(() =>
      parseAboutOverviewPageData(initial?.data, {
        title: initial?.title || undefined,
        excerpt: initial?.excerpt || undefined,
        body: initial?.body || undefined,
        coverUrl: initial?.coverUrl || undefined,
      })
    );
  const [contactData, setContactData] = useState<ContactPageData>(() =>
    parseContactPageData(initial?.data, {
      title: initial?.title || undefined,
      excerpt: initial?.excerpt || undefined,
    })
  );
  const [leadershipData, setLeadershipData] = useState<LeadershipPageData>(() =>
    parseLeadershipPageData(initial?.data)
  );
  const [programData, setProgramData] = useState<ProgramFieldsData>(() =>
    parseProgramFields(initial?.data)
  );

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
      existingData.leadershipCategory = leadershipCategory;
      existingData.isFounder = isFounderCategory(leadershipCategory);
    }

    if (collection === "programs") {
      existingData.title = title;
      if (excerpt) existingData.shortDescription = excerpt;
      if (body) existingData.intro = body;
      existingData.objectives = programData.objectives
        .map((goal) => goal.trim())
        .filter(Boolean);
      existingData.beneficiaries = programData.beneficiaries.trim();
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
        existingData.vision = visionMissionData.vision.trim();
        existingData.mission = visionMissionData.mission.trim();
        existingData.heroDescription =
          visionMissionData.heroDescription.trim();
        existingData.sectionTitle = visionMissionData.sectionTitle.trim();
        existingData.visionImageUrl = visionMissionData.visionImageUrl.trim();
        existingData.missionImageUrl =
          visionMissionData.missionImageUrl.trim();
        existingData.coreValues = visionMissionData.coreValues
          .map((value) => ({
            ...value,
            title: value.title.trim(),
            description: value.description.trim(),
          }))
          .filter((value) => value.title);
      }
      if (slug === "leadership") {
        existingData.foundersEyebrow = leadershipData.foundersEyebrow.trim();
        existingData.foundersTitle = leadershipData.foundersTitle.trim();
        existingData.foundersDescription =
          leadershipData.foundersDescription.trim();
        existingData.teamEyebrow = leadershipData.teamEyebrow.trim();
        existingData.teamTitle = leadershipData.teamTitle.trim();
        existingData.teamDescription = leadershipData.teamDescription.trim();
      }
      if (slug === "about-story") {
        existingData.heroDescription = aboutStoryData.heroDescription.trim();
        existingData.sectionEyebrow = aboutStoryData.sectionEyebrow.trim();
        existingData.sectionTitle = aboutStoryData.sectionTitle.trim();
        existingData.paragraphs = aboutStoryData.paragraphs
          .map((paragraph) => paragraph.trim())
          .filter(Boolean);
        existingData.timeline = aboutStoryData.timeline
          .map((item) => ({
            ...item,
            title: item.title.trim(),
            description: item.description.trim(),
            isIllustrative: true as const,
          }))
          .filter((item) => item.title);
      }
      if (slug === "about-overview") {
        existingData.heroTitle = aboutOverviewData.heroTitle.trim();
        existingData.heroDescription =
          aboutOverviewData.heroDescription.trim();
        existingData.sectionEyebrow = aboutOverviewData.sectionEyebrow.trim();
        existingData.sectionTitle = aboutOverviewData.sectionTitle.trim();
        existingData.intro = aboutOverviewData.intro.trim();
        existingData.imageUrl = aboutOverviewData.imageUrl.trim();
        existingData.links = aboutOverviewData.links
          .map((link) => ({
            ...link,
            title: link.title.trim(),
            description: link.description.trim(),
            href: link.href.trim(),
          }))
          .filter((link) => link.title && link.href);
      }
      if (slug === "contact") {
        const addressLine = [
          siteContact.address.line1,
          siteContact.address.line2,
          [siteContact.address.city, siteContact.address.region]
            .filter(Boolean)
            .join(", "),
          siteContact.address.country,
        ]
          .filter(Boolean)
          .join(", ");

        existingData.eyebrow = contactData.eyebrow.trim();
        existingData.headline = contactData.headline.trim();
        existingData.shortIntro = contactData.shortIntro.trim();
        existingData.responseNote = contactData.responseNote.trim();
        existingData.followLabel = contactData.followLabel.trim();
        existingData.formTitle = contactData.formTitle.trim();
        existingData.submitLabel = contactData.submitLabel.trim();
        existingData.successTitle = contactData.successTitle.trim();
        existingData.successMessage = contactData.successMessage.trim();
        // Keep contact-page detail cards aligned with footer contact fields
        existingData.details = [
          {
            id: "email",
            label: "Email",
            value: siteContact.email.trim(),
            href: siteContact.email.trim()
              ? `mailto:${siteContact.email.trim()}`
              : undefined,
            icon: "email",
          },
          {
            id: "phone",
            label: "Phone",
            value: siteContact.phone.trim(),
            href: siteContact.phone.trim()
              ? `tel:${siteContact.phone.replace(/\s/g, "")}`
              : undefined,
            icon: "phone",
          },
          {
            id: "address",
            label: "Office",
            value: addressLine,
            icon: "address",
          },
          {
            id: "hours",
            label: "Hours",
            value:
              siteContact.hours.weekdays.trim() ||
              contactData.details.find((item) => item.icon === "hours")
                ?.value ||
              "",
            icon: "hours",
          },
        ].filter((item) => item.value);
        existingData.formFields = contactData.formFields.map((field) => ({
          ...field,
          label: field.label.trim() || field.id,
        }));
      }
      if (slug === "governance") {
        existingData.bodies = governanceData.bodies
          .map((body) => ({
            ...body,
            title: body.title.trim(),
            description: body.description.trim(),
            members: body.members.map((member) => member.trim()).filter(Boolean),
          }))
          .filter((body) => body.title);
      }
      if (slug === "roadmap") {
        existingData.timeline = roadmapData.timeline
          .map((item) => ({
            ...item,
            title: item.title.trim(),
            description: item.description.trim(),
            isIllustrative: true as const,
          }))
          .filter((item) => item.title);
        existingData.phases = roadmapData.phases
          .map((phase) => ({
            ...phase,
            title: phase.title.trim(),
            timeframe: phase.timeframe.trim(),
            description: phase.description.trim(),
            milestones: phase.milestones
              .map((milestone) => milestone.trim())
              .filter(Boolean),
          }))
          .filter((phase) => phase.title);
      }
      if (slug === "impact") {
        existingData.statistics = impactData.statistics
          .map((item) => ({
            ...item,
            label: item.label.trim(),
            note: item.note?.trim() || undefined,
            prefix: item.prefix?.trim() || undefined,
            suffix: item.suffix?.trim() || undefined,
            isIllustrative: true as const,
          }))
          .filter((item) => item.label);
        existingData.programBreakdown = impactData.programBreakdown
          .map((item) => ({
            ...item,
            programTitle: item.programTitle.trim(),
            description: item.description.trim(),
            isIllustrative: true as const,
          }))
          .filter((item) => item.programTitle);
        existingData.locations = impactData.locations
          .map((item) => ({
            ...item,
            name: item.name.trim(),
            region: item.region.trim(),
            isIllustrative: true as const,
          }))
          .filter((item) => item.name);
        existingData.successStories = impactData.successStories
          .map((item) => ({
            ...item,
            title: item.title.trim(),
            summary: item.summary.trim(),
            isIllustrative: true as const,
          }))
          .filter((item) => item.title);
        existingData.beforeAfterStories = impactData.beforeAfterStories
          .map((item) => ({
            ...item,
            title: item.title.trim(),
            before: item.before.trim(),
            after: item.after.trim(),
            isIllustrative: true as const,
          }))
          .filter((item) => item.title);
        existingData.annualReports = impactData.annualReports
          .map((item) => ({
            ...item,
            title: item.title.trim(),
            summary: item.summary.trim(),
            downloadUrl: item.downloadUrl.trim() || "#",
            isIllustrative: true as const,
          }))
          .filter((item) => item.title);
        existingData.donationUsage = impactData.donationUsage
          .map((item) => ({
            ...item,
            category: item.category.trim(),
            description: item.description.trim(),
            isIllustrative: true as const,
          }))
          .filter((item) => item.category);
        if (body) existingData.disclaimer = body;
      }
    }

    const syncedTitle =
      slug === "about-overview"
        ? aboutOverviewData.heroTitle.trim() || title
        : slug === "contact"
          ? contactData.headline.trim() || title
          : title;
    const syncedExcerpt =
      slug === "vision-mission"
        ? visionMissionData.vision.trim()
        : slug === "about-overview"
          ? aboutOverviewData.heroDescription.trim()
          : slug === "about-story"
            ? aboutStoryData.heroDescription.trim()
            : slug === "contact"
              ? contactData.shortIntro.trim()
              : excerpt || null;
    const syncedBody =
      slug === "vision-mission"
        ? visionMissionData.mission.trim()
        : slug === "about-story"
          ? aboutStoryData.paragraphs
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .join("\n\n")
          : slug === "about-overview"
            ? aboutOverviewData.intro.trim()
            : body || null;
    const syncedCoverUrl =
      slug === "about-overview"
        ? aboutOverviewData.imageUrl.trim() || coverUrl || null
        : coverUrl || null;

    const payload = {
      id: initial?.id,
      collection,
      title: syncedTitle,
      slug: hasSlug ? slug || null : null,
      excerpt: syncedExcerpt,
      body: syncedBody,
      coverUrl: syncedCoverUrl,
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

    if (!res.ok) {
      setSaving(false);
      setMessage(result.error || "Save failed");
      return;
    }

    if (slug === "contact") {
      const settingsRes = await fetch("/api/admin/settings");
      const currentSettings = settingsRes.ok
        ? await settingsRes.json()
        : null;

      if (currentSettings) {
        const settingsSave = await fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: currentSettings.name,
            shortName: currentSettings.shortName,
            tagline: currentSettings.tagline,
            description: currentSettings.description,
            logoUrl: currentSettings.logoUrl,
            logoAlt: currentSettings.logoAlt,
            faviconUrl: currentSettings.faviconUrl,
            contact: siteContact,
            social: siteSocial,
            announcementBar: currentSettings.announcementBar,
            heroSlides: currentSettings.heroSlides,
            pageHeroImages: currentSettings.pageHeroImages,
          }),
        });
        if (!settingsSave.ok) {
          setSaving(false);
          setMessage(
            "Contact page saved, but footer contact settings failed to update."
          );
          return;
        }
      }
    }

    setSaving(false);
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
                  : collection === "pages" &&
                      (slug === "governance" ||
                        slug === "roadmap" ||
                        slug === "impact")
                      ? "Page hero description"
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
                : collection === "pages" && slug === "impact"
                  ? "Impact disclaimer"
                  : "Body";

  const hideExcerptBody =
    collection === "pages" &&
    (slug === "governance" ||
      slug === "roadmap" ||
      slug === "vision-mission" ||
      slug === "leadership" ||
      slug === "about-story" ||
      slug === "about-overview" ||
      slug === "contact");

  const hideBodyOnly =
    collection === "pages" &&
    (slug === "governance" ||
      slug === "roadmap" ||
      slug === "vision-mission" ||
      slug === "leadership" ||
      slug === "about-story" ||
      slug === "about-overview" ||
      slug === "contact");

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div
        className={
          slug === "contact"
            ? "grid gap-5"
            : "grid gap-5 lg:grid-cols-[1fr_320px]"
        }
      >
        <div className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {slug === "contact" ? "Headline" : "Title"}
              </label>
              <input
                className={field}
                value={
                  slug === "about-overview"
                    ? aboutOverviewData.heroTitle
                    : slug === "contact"
                      ? contactData.headline
                      : title
                }
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (slug === "about-overview") {
                    setAboutOverviewData({
                      ...aboutOverviewData,
                      heroTitle: e.target.value,
                    });
                  }
                  if (slug === "contact") {
                    setContactData({
                      ...contactData,
                      headline: e.target.value,
                    });
                  }
                }}
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
            {!hideExcerptBody && (
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
            )}
            {!hideBodyOnly && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  {bodyLabel}
                </label>
                <textarea
                  className={field}
                  rows={slug === "impact" ? 4 : 10}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={
                    slug === "impact"
                      ? "Shown under Impact at a Glance"
                      : collection === "blog" ||
                          collection === "team" ||
                          collection === "pages"
                        ? "Separate paragraphs with a blank line."
                        : undefined
                  }
                />
              </div>
            )}
            {slug === "about-overview" && (
              <AboutOverviewPageFields
                value={aboutOverviewData}
                onChange={setAboutOverviewData}
              />
            )}
            {slug === "contact" && (
              <ContactPageFields
                value={contactData}
                onChange={setContactData}
                siteContact={siteContact}
                siteSocial={siteSocial}
                onSiteContactChange={setSiteContact}
                onSiteSocialChange={setSiteSocial}
              />
            )}
            {slug === "vision-mission" && (
              <VisionMissionPageFields
                value={visionMissionData}
                onChange={setVisionMissionData}
              />
            )}
            {slug === "leadership" && (
              <LeadershipPageFields
                value={leadershipData}
                onChange={setLeadershipData}
              />
            )}
            {slug === "about-story" && (
              <AboutStoryPageFields
                value={aboutStoryData}
                onChange={setAboutStoryData}
              />
            )}
            {slug === "governance" && (
              <GovernancePageFields
                value={governanceData}
                onChange={setGovernanceData}
              />
            )}
            {slug === "roadmap" && (
              <RoadmapPageFields
                value={roadmapData}
                onChange={setRoadmapData}
              />
            )}
            {slug === "impact" && (
              <ImpactPageFields value={impactData} onChange={setImpactData} />
            )}
            {collection === "programs" && (
              <ProgramFields value={programData} onChange={setProgramData} />
            )}
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
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Leadership role
                  </label>
                  <select
                    className={field}
                    value={leadershipCategory}
                    onChange={(e) => {
                      const next = e.target
                        .value as LeadershipCategoryId;
                      const previous =
                        getLeadershipCategory(leadershipCategory);
                      setLeadershipCategory(next);
                      const nextCategory = getLeadershipCategory(next);
                      // Prefill Role title when empty or still the previous default
                      if (
                        !excerpt.trim() ||
                        excerpt.trim() === previous.defaultRole
                      ) {
                        setExcerpt(nextCategory.defaultRole);
                      }
                    }}
                  >
                    {LEADERSHIP_CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-navy/55">
                    Co-Founders appear in the top section on the Leadership
                    page. Board and other roles appear in the institutional
                    team grid below.
                  </p>
                </div>
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

        {slug !== "contact" ? (
          <div className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
            <ImageUploadField
              label="Featured image"
              value={coverUrl}
              onChange={(url) => setCoverUrl(url || "")}
              folder={`stemnova/${collection}`}
              helpText="Upload or replace the image shown on the public site for this item."
            />
          </div>
        ) : null}
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
