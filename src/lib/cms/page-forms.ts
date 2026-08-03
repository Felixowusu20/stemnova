import type {
  AnnualReport,
  BeforeAfterStory,
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
    : [];

  const programBreakdown = Array.isArray(record.programBreakdown)
    ? (record.programBreakdown as ProgramBreakdown[]).map((item) => ({
        programSlug: item.programSlug,
        programTitle: item.programTitle || "",
        percentage: Number(item.percentage) || 0,
        description: item.description || "",
        isIllustrative: true as const,
      }))
    : [];

  const locations = Array.isArray(record.locations)
    ? (record.locations as LocationImpact[]).map((item) => ({
        name: item.name || "",
        region: item.region || "",
        girlsReached: Number(item.girlsReached) || 0,
        schoolsPartnered: Number(item.schoolsPartnered) || 0,
        isIllustrative: true as const,
      }))
    : [];

  const successStories = Array.isArray(record.successStories)
    ? (record.successStories as SuccessStory[]).map((item, index) => ({
        id: item.id || createId(`story-${index}`),
        title: item.title || "",
        summary: item.summary || "",
        programSlug: item.programSlug,
        imageUrl: item.imageUrl || "",
        isIllustrative: true as const,
      }))
    : [];

  const beforeAfterStories = Array.isArray(record.beforeAfterStories)
    ? (record.beforeAfterStories as BeforeAfterStory[]).map((item, index) => ({
        id: item.id || createId(`ba-${index}`),
        title: item.title || "",
        before: item.before || "",
        after: item.after || "",
        programSlug: item.programSlug,
        isIllustrative: true as const,
      }))
    : [];

  const annualReports = Array.isArray(record.annualReports)
    ? (record.annualReports as AnnualReport[]).map((item) => ({
        year: Number(item.year) || new Date().getFullYear(),
        title: item.title || "",
        summary: item.summary || "",
        downloadUrl: item.downloadUrl || "#",
        isIllustrative: true as const,
      }))
    : [];

  const donationUsage = Array.isArray(record.donationUsage)
    ? (record.donationUsage as DonationUsage[]).map((item) => ({
        category: item.category || "",
        percentage: Number(item.percentage) || 0,
        description: item.description || "",
        isIllustrative: true as const,
      }))
    : [];

  return {
    statistics,
    programBreakdown,
    locations,
    successStories,
    beforeAfterStories,
    annualReports,
    donationUsage,
    disclaimer:
      typeof record.disclaimer === "string" ? record.disclaimer : undefined,
  };
}
