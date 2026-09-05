import {
  CONTACT_DETAIL_ICONS,
  CONTACT_FORM_FIELD_IDS,
  contactPageContent,
  type ContactDetail,
  type ContactDetailIcon,
  type ContactFormFieldConfig,
  type ContactFormFieldId,
  type ContactPageContent,
} from "@/content/contact";
import { impactData, IMPACT_DATA_DISCLAIMER } from "@/content/impact";
import type {
  AnnualReport,
  BeforeAfterStory,
  CoreValue,
  DonationUsage,
  GovernanceBody,
  ImpactData,
  LocationImpact,
  ProgramBreakdown,
  RoadmapPhase,
  StatItem,
  SuccessStory,
  TimelineMilestone,
} from "@/types";

export type GovernancePageData = {
  bodies: GovernanceBody[];
};

export type RoadmapPageData = {
  timeline: TimelineMilestone[];
  phases: RoadmapPhase[];
};

export type ImpactPageData = ImpactData & {
  disclaimer?: string;
};

export type VisionMissionPageData = {
  vision: string;
  mission: string;
  heroDescription: string;
  sectionTitle: string;
  visionImageUrl: string;
  missionImageUrl: string;
  coreValues: CoreValue[];
};

export type LeadershipPageData = {
  foundersEyebrow: string;
  foundersTitle: string;
  foundersDescription: string;
  teamEyebrow: string;
  teamTitle: string;
  teamDescription: string;
};

export type AboutStoryPageData = {
  heroDescription: string;
  sectionEyebrow: string;
  sectionTitle: string;
  paragraphs: string[];
  timeline: TimelineMilestone[];
};

export type AboutOverviewLink = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type AboutOverviewPageData = {
  heroTitle: string;
  heroDescription: string;
  sectionEyebrow: string;
  sectionTitle: string;
  intro: string;
  imageUrl: string;
  links: AboutOverviewLink[];
};

export type ContactPageData = ContactPageContent;

const CORE_VALUE_ICONS: CoreValue["icon"][] = [
  "excellence",
  "equity",
  "integrity",
  "collaboration",
  "innovation",
  "leadership",
];

function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" && data !== null
    ? (data as Record<string, unknown>)
    : {};
}

export function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function listToLines(value: string[] | undefined): string {
  return (value || []).join("\n");
}

export function isCoreValueIcon(value: string): value is CoreValue["icon"] {
  return CORE_VALUE_ICONS.includes(value as CoreValue["icon"]);
}

export function parseGovernancePageData(data: unknown): GovernancePageData {
  const record = asRecord(data);
  const bodies = Array.isArray(record.bodies)
    ? (record.bodies as GovernanceBody[]).map((body, index) => ({
        id: body.id || createId(`body-${index}`),
        title: body.title || "",
        description: body.description || "",
        members: Array.isArray(body.members) ? body.members : [],
      }))
    : [];

  return {
    bodies:
      bodies.length > 0
        ? bodies
        : [
            {
              id: createId("body"),
              title: "",
              description: "",
              members: [],
            },
          ],
  };
}

export function parseRoadmapPageData(data: unknown): RoadmapPageData {
  const record = asRecord(data);
  const timeline = Array.isArray(record.timeline)
    ? (record.timeline as TimelineMilestone[]).map((item) => ({
        year: Number(item.year) || new Date().getFullYear(),
        title: item.title || "",
        description: item.description || "",
        isIllustrative: true as const,
      }))
    : [];

  const phases = Array.isArray(record.phases)
    ? (record.phases as RoadmapPhase[]).map((phase, index) => ({
        id: phase.id || createId(`phase-${index}`),
        phase: Number(phase.phase) || index + 1,
        title: phase.title || "",
        timeframe: phase.timeframe || "",
        description: phase.description || "",
        milestones: Array.isArray(phase.milestones) ? phase.milestones : [],
      }))
    : [];

  return {
    timeline:
      timeline.length > 0
        ? timeline
        : [
            {
              year: new Date().getFullYear(),
              title: "",
              description: "",
              isIllustrative: true,
            },
          ],
    phases:
      phases.length > 0
        ? phases
        : [
            {
              id: createId("phase"),
              phase: 1,
              title: "",
              timeframe: "",
              description: "",
              milestones: [],
            },
          ],
  };
}

export function parseImpactPageData(data: unknown): ImpactPageData {
  const record = asRecord(data);

  const statistics = Array.isArray(record.statistics)
    ? (record.statistics as StatItem[]).map((item) => ({
        label: item.label || "",
        value: Number(item.value) || 0,
        suffix: item.suffix || "",
        prefix: item.prefix || "",
        note: item.note || "",
        isIllustrative: true as const,
      }))
    : impactData.statistics.map((item) => ({
        label: item.label,
        value: 0,
        suffix: item.suffix || "",
        prefix: item.prefix || "",
        note: item.note || "",
        isIllustrative: true as const,
      }));

  const programBreakdown = Array.isArray(record.programBreakdown)
    ? (record.programBreakdown as ProgramBreakdown[]).map((item) => ({
        programSlug: item.programSlug,
        programTitle: item.programTitle || "",
        percentage: Number(item.percentage) || 0,
        description: item.description || "",
        isIllustrative: true as const,
      }))
    : impactData.programBreakdown.map((item) => ({
        programSlug: item.programSlug,
        programTitle: item.programTitle,
        percentage: 0,
        description: item.description || "",
        isIllustrative: true as const,
      }));

  const locations = Array.isArray(record.locations)
    ? (record.locations as LocationImpact[]).map((item) => ({
        name: item.name || "",
        region: item.region || "",
        girlsReached: Number(item.girlsReached) || 0,
        schoolsPartnered: Number(item.schoolsPartnered) || 0,
        isIllustrative: true as const,
      }))
    : impactData.locations.map((item) => ({
        name: item.name,
        region: item.region,
        girlsReached: 0,
        schoolsPartnered: 0,
        isIllustrative: true as const,
      }));

  const successStories = Array.isArray(record.successStories)
    ? (record.successStories as SuccessStory[]).map((item, index) => ({
        id: item.id || createId(`story-${index}`),
        title: item.title || "",
        summary: item.summary || "",
        programSlug: item.programSlug,
        imageUrl: item.imageUrl || "",
        isIllustrative: true as const,
      }))
    : impactData.successStories;

  const beforeAfterStories = Array.isArray(record.beforeAfterStories)
    ? (record.beforeAfterStories as BeforeAfterStory[]).map((item, index) => ({
        id: item.id || createId(`ba-${index}`),
        title: item.title || "",
        before: item.before || "",
        after: item.after || "",
        programSlug: item.programSlug,
        isIllustrative: true as const,
      }))
    : impactData.beforeAfterStories;

  const annualReports = Array.isArray(record.annualReports)
    ? (record.annualReports as AnnualReport[]).map((item) => ({
        year: Number(item.year) || new Date().getFullYear(),
        title: item.title || "",
        summary: item.summary || "",
        downloadUrl: item.downloadUrl || "#",
        isIllustrative: true as const,
      }))
    : impactData.annualReports;

  const donationUsage = Array.isArray(record.donationUsage)
    ? (record.donationUsage as DonationUsage[]).map((item) => ({
        category: item.category || "",
        percentage: Number(item.percentage) || 0,
        description: item.description || "",
        isIllustrative: true as const,
      }))
    : impactData.donationUsage.map((item) => ({
        category: item.category,
        percentage: 0,
        description: item.description || "",
        isIllustrative: true as const,
      }));

  return {
    statistics,
    programBreakdown,
    locations,
    successStories,
    beforeAfterStories,
    annualReports,
    donationUsage,
    disclaimer:
      typeof record.disclaimer === "string"
        ? record.disclaimer
        : IMPACT_DATA_DISCLAIMER,
  };
}

export function parseVisionMissionPageData(
  data: unknown,
  fallback?: {
    vision?: string;
    mission?: string;
    excerpt?: string;
    body?: string;
  }
): VisionMissionPageData {
  const record = asRecord(data);
  const coreValues = Array.isArray(record.coreValues)
    ? (record.coreValues as CoreValue[]).map((value) => ({
        title: value.title || "",
        description: value.description || "",
        icon: isCoreValueIcon(String(value.icon || ""))
          ? value.icon
          : ("excellence" as const),
      }))
    : [];

  return {
    vision:
      (typeof record.vision === "string" && record.vision) ||
      fallback?.excerpt ||
      fallback?.vision ||
      "",
    mission:
      (typeof record.mission === "string" && record.mission) ||
      fallback?.body ||
      fallback?.mission ||
      "",
    heroDescription:
      typeof record.heroDescription === "string"
        ? record.heroDescription
        : "What we exist to build for scientific talent across Africa.",
    sectionTitle:
      typeof record.sectionTitle === "string"
        ? record.sectionTitle
        : "What We Exist to Build",
    visionImageUrl:
      typeof record.visionImageUrl === "string" ? record.visionImageUrl : "",
    missionImageUrl:
      typeof record.missionImageUrl === "string" ? record.missionImageUrl : "",
    coreValues:
      coreValues.length > 0
        ? coreValues
        : [
            {
              title: "",
              description: "",
              icon: "excellence",
            },
          ],
  };
}

export function parseLeadershipPageData(data: unknown): LeadershipPageData {
  const record = asRecord(data);

  return {
    foundersEyebrow: stringField(record.foundersEyebrow, "Leadership"),
    foundersTitle: stringField(record.foundersTitle, "Meet Our Founder"),
    foundersDescription: stringField(
      record.foundersDescription,
      "Building pathways for African STEM talent."
    ),
    teamEyebrow: stringField(record.teamEyebrow, "Secretariat and Board"),
    teamTitle: stringField(record.teamTitle, "Institutional Leadership"),
    teamDescription: stringField(
      record.teamDescription,
      "Select a leader to read their full profile."
    ),
  };
}

export function parseAboutStoryPageData(
  data: unknown,
  fallback?: { body?: string }
): AboutStoryPageData {
  const record = asRecord(data);
  const fromBody = fallback?.body
    ? fallback.body
        .split(/\n\s*\n/)
        .map((part) => part.trim())
        .filter(Boolean)
    : [];

  const paragraphs = Array.isArray(record.paragraphs)
    ? (record.paragraphs as string[]).map((p) => String(p || "")).filter(Boolean)
    : fromBody;

  const timeline = Array.isArray(record.timeline)
    ? (record.timeline as TimelineMilestone[]).map((item) => ({
        year: Number(item.year) || new Date().getFullYear(),
        title: item.title || "",
        description: item.description || "",
        isIllustrative: true as const,
      }))
    : [];

  return {
    heroDescription:
      typeof record.heroDescription === "string"
        ? record.heroDescription
        : "Why STEMNova exists and what we are building for African STEM talent.",
    sectionEyebrow:
      typeof record.sectionEyebrow === "string"
        ? record.sectionEyebrow
        : "Our Story",
    sectionTitle:
      typeof record.sectionTitle === "string"
        ? record.sectionTitle
        : "Why STEMNova Exists",
    paragraphs: paragraphs.length > 0 ? paragraphs : [""],
    timeline:
      timeline.length > 0
        ? timeline
        : [
            {
              year: new Date().getFullYear(),
              title: "",
              description: "",
              isIllustrative: true,
            },
          ],
  };
}

export function parseAboutOverviewPageData(
  data: unknown,
  fallback?: {
    title?: string;
    excerpt?: string;
    body?: string;
    coverUrl?: string;
  }
): AboutOverviewPageData {
  const record = asRecord(data);
  const links = Array.isArray(record.links)
    ? (record.links as AboutOverviewLink[]).map((link, index) => ({
        id: link.id || createId(`link-${index}`),
        title: link.title || "",
        description: link.description || "",
        href: link.href || "",
      }))
    : [];

  return {
    heroTitle:
      (typeof record.heroTitle === "string" && record.heroTitle) ||
      fallback?.title ||
      "About STEMNova Foundation",
    heroDescription:
      (typeof record.heroDescription === "string" && record.heroDescription) ||
      fallback?.excerpt ||
      "Building Africa's home for scientific talent discovery and STEM leadership.",
    sectionEyebrow:
      typeof record.sectionEyebrow === "string"
        ? record.sectionEyebrow
        : "About Us",
    sectionTitle:
      typeof record.sectionTitle === "string"
        ? record.sectionTitle
        : "Get to Know STEMNova",
    intro:
      (typeof record.intro === "string" && record.intro) ||
      fallback?.body ||
      "",
    imageUrl:
      (typeof record.imageUrl === "string" && record.imageUrl) ||
      fallback?.coverUrl ||
      "",
    links:
      links.length > 0
        ? links
        : [
            {
              id: createId("link"),
              title: "",
              description: "",
              href: "",
            },
          ],
  };
}

export function isContactDetailIcon(
  value: string
): value is ContactDetailIcon {
  return CONTACT_DETAIL_ICONS.includes(value as ContactDetailIcon);
}

function stringField(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function parseContactDetails(value: unknown): ContactDetail[] | null {
  if (!Array.isArray(value)) return null;

  const details: ContactDetail[] = [];
  value.forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    const record = item as Record<string, unknown>;
    const id =
      typeof record.id === "string" && record.id.trim()
        ? record.id
        : createId(`detail-${index}`);
    const iconValue = typeof record.icon === "string" ? record.icon : id;
    const href =
      typeof record.href === "string" && record.href.trim()
        ? record.href.trim()
        : "";
    const detail: ContactDetail = {
      id,
      label: typeof record.label === "string" ? record.label : "",
      value: typeof record.value === "string" ? record.value : "",
      icon: isContactDetailIcon(iconValue) ? iconValue : "email",
    };
    if (href) detail.href = href;
    details.push(detail);
  });
  return details;
}

function parseContactFormFields(value: unknown): ContactFormFieldConfig[] {
  const fromData = new Map<ContactFormFieldId, ContactFormFieldConfig>();

  if (Array.isArray(value)) {
    for (const item of value) {
      if (!item || typeof item !== "object") continue;
      const record = item as Record<string, unknown>;
      const id = record.id as ContactFormFieldId;
      if (!CONTACT_FORM_FIELD_IDS.includes(id)) continue;
      fromData.set(id, {
        id,
        label:
          typeof record.label === "string" && record.label.trim()
            ? record.label
            : contactPageContent.formFields.find((field) => field.id === id)
                ?.label || id,
        required: Boolean(record.required),
      });
    }
  }

  return contactPageContent.formFields.map(
    (field) => fromData.get(field.id) || { ...field }
  );
}

export type ProgramFieldsData = {
  objectives: string[];
  beneficiaries: string;
};

export function parseProgramFields(data: unknown): ProgramFieldsData {
  const record = asRecord(data);
  const objectives = Array.isArray(record.objectives)
    ? record.objectives
        .map((item) => (typeof item === "string" ? item : ""))
        .filter((item) => item.trim().length > 0)
    : [];

  return {
    objectives: objectives.length > 0 ? objectives : [""],
    beneficiaries:
      typeof record.beneficiaries === "string" ? record.beneficiaries : "",
  };
}

export function parseContactPageData(
  data: unknown,
  fallback?: {
    title?: string | null;
    excerpt?: string | null;
  }
): ContactPageData {
  const record = asRecord(data);
  const details = parseContactDetails(record.details);

  return {
    eyebrow: stringField(record.eyebrow, contactPageContent.eyebrow),
    headline:
      (typeof record.headline === "string" && record.headline) ||
      fallback?.title ||
      contactPageContent.headline,
    shortIntro:
      (typeof record.shortIntro === "string" && record.shortIntro) ||
      fallback?.excerpt ||
      contactPageContent.shortIntro,
    responseNote: stringField(
      record.responseNote,
      contactPageContent.responseNote
    ),
    followLabel: stringField(
      record.followLabel,
      contactPageContent.followLabel
    ),
    formTitle: stringField(record.formTitle, contactPageContent.formTitle),
    submitLabel: stringField(
      record.submitLabel,
      contactPageContent.submitLabel
    ),
    successTitle: stringField(
      record.successTitle,
      contactPageContent.successTitle
    ),
    successMessage: stringField(
      record.successMessage,
      contactPageContent.successMessage
    ),
    details: details ?? contactPageContent.details.map((item) => ({ ...item })),
    formFields: parseContactFormFields(record.formFields),
  };
}
