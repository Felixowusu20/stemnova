import { challenges, researchAreas } from "@/content/pillars";
import { images } from "@/content/images";
import type { Challenge, ResearchArea } from "@/types";

export const HOME_SECTION_IDS = [
  "hero",
  "challenges",
  "focusAreas",
  "mission",
  "programmes",
  "research",
  "impact",
  "successStory",
  "testimonials",
  "partners",
  "news",
  "newsletter",
  "cta",
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

export const HOME_SECTION_TABS: { id: HomeSectionId; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "challenges", label: "Challenges" },
  { id: "focusAreas", label: "Focus Areas" },
  { id: "mission", label: "Mission" },
  { id: "programmes", label: "Programmes" },
  { id: "research", label: "Research" },
  { id: "impact", label: "Impact" },
  { id: "successStory", label: "Success Story" },
  { id: "testimonials", label: "Testimonials" },
  { id: "partners", label: "Partners" },
  { id: "news", label: "Latest News" },
  { id: "newsletter", label: "Newsletter" },
  { id: "cta", label: "Call to Action" },
];

export const CHALLENGE_ICONS: Challenge["icon"][] = [
  "search",
  "venus",
  "book",
  "atom",
  "network",
];

export const RESEARCH_ICONS: ResearchArea["icon"][] = [
  "atom",
  "brain",
  "cpu",
  "flask",
  "bot",
  "leaf",
  "file",
  "network",
];

export type HomePageData = {
  visible: Record<HomeSectionId, boolean>;
  challenges: {
    eyebrow: string;
    title: string;
    highlight: string;
    imageUrl: string;
    imageCaption: string;
    items: Challenge[];
  };
  mission: {
    eyebrow: string;
    title: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    imageUrl: string;
    mosaic: string[];
  };
  programmes: {
    eyebrow: string;
    title: string;
    imageUrl: string;
    imageCaption: string;
  };
  research: {
    eyebrow: string;
    title: string;
    description: string;
    items: ResearchArea[];
  };
  news: {
    eyebrow: string;
    title: string;
    description: string;
  };
  newsletter: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
  };
};

function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" && data !== null
    ? (data as Record<string, unknown>)
    : {};
}

function stringField(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function isHomeSectionId(value: string): value is HomeSectionId {
  return HOME_SECTION_IDS.includes(value as HomeSectionId);
}

export function isChallengeIcon(value: string): value is Challenge["icon"] {
  return CHALLENGE_ICONS.includes(value as Challenge["icon"]);
}

export function isResearchIcon(value: string): value is ResearchArea["icon"] {
  return RESEARCH_ICONS.includes(value as ResearchArea["icon"]);
}

export function defaultHomeVisibility(): Record<HomeSectionId, boolean> {
  return Object.fromEntries(
    HOME_SECTION_IDS.map((id) => [id, true])
  ) as Record<HomeSectionId, boolean>;
}

export function defaultHomePageData(): HomePageData {
  return {
    visible: defaultHomeVisibility(),
    challenges: {
      eyebrow: "Why STEMNova Exists",
      title: "The Gaps We Are Built to Close",
      highlight: "Closes these gaps through connected programmes",
      imageUrl: images.home.challenges,
      imageCaption: "Pathways for Africa's next scientists",
      items: challenges.map((item) => ({ ...item })),
    },
    mission: {
      eyebrow: "Our mission",
      title: "Discover talent. Develop leaders. Advance STEM across Africa.",
      body: "STEMNova builds clear pathways from schools and universities into research, teaching excellence, and scientific leadership through programmes designed for lasting continental impact.",
      primaryLabel: "About STEMNova",
      primaryHref: "/about",
      secondaryLabel: "Explore programmes",
      secondaryHref: "/programs",
      imageUrl: images.home.mission,
      mosaic: [...images.home.mosaic],
    },
    programmes: {
      eyebrow: "Flagship Programmes",
      title: "Nine Programmes. Clear Pathways.",
      imageUrl: images.home.programmes,
      imageCaption: "Connected pathways for African STEM talent",
    },
    research: {
      eyebrow: "Research and Innovation",
      title: "Committed to Frontier Science",
      description:
        "We strengthen African capacity across quantum science, AI, materials, robotics, and collaborative research networks.",
      items: researchAreas.map((item) => ({ ...item })),
    },
    news: {
      eyebrow: "News & Publications",
      title: "Insights from the Foundation",
      description:
        "Foundation news, research updates, and thought leadership on Africa's STEM future.",
    },
    newsletter: {
      title: "Stay Connected",
      description:
        "Subscribe for programme updates, fellowship deadlines, research insights, and event invitations from STEMNova Foundation.",
    },
    cta: {
      title: "Join Our Mission",
      description:
        "Help STEMNova discover scientific talent, develop research leaders, and advance STEM excellence across Africa. Donate, mentor, volunteer, or partner with us.",
    },
  };
}

function parseVisible(value: unknown): Record<HomeSectionId, boolean> {
  const defaults = defaultHomeVisibility();
  const record = asRecord(value);
  for (const id of HOME_SECTION_IDS) {
    if (typeof record[id] === "boolean") {
      defaults[id] = record[id];
    }
  }
  return defaults;
}

function parseChallenges(value: unknown, fallback: Challenge[]): Challenge[] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .map((item, index) => {
      const record = asRecord(item);
      return {
        id: stringField(record.id, createId(`challenge-${index}`)),
        title: stringField(record.title, ""),
        description: stringField(record.description, ""),
        icon: isChallengeIcon(String(record.icon || ""))
          ? (record.icon as Challenge["icon"])
          : ("search" as const),
      };
    })
    .filter((item) => item.title.trim());
  return items.length > 0 ? items : fallback;
}

function parseResearchAreas(
  value: unknown,
  fallback: ResearchArea[]
): ResearchArea[] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .map((item, index) => {
      const record = asRecord(item);
      return {
        id: stringField(record.id, createId(`research-${index}`)),
        title: stringField(record.title, ""),
        description: stringField(record.description, ""),
        icon: isResearchIcon(String(record.icon || ""))
          ? (record.icon as ResearchArea["icon"])
          : ("atom" as const),
      };
    })
    .filter((item) => item.title.trim());
  return items.length > 0 ? items : fallback;
}

export function parseHomePageData(data: unknown): HomePageData {
  const defaults = defaultHomePageData();
  const record = asRecord(data);
  const challengesRecord = asRecord(record.challenges);
  const missionRecord = asRecord(record.mission);
  const programmesRecord = asRecord(record.programmes);
  const researchRecord = asRecord(record.research);
  const newsRecord = asRecord(record.news);
  const newsletterRecord = asRecord(record.newsletter);
  const ctaRecord = asRecord(record.cta);
  const mosaic = Array.isArray(missionRecord.mosaic)
    ? missionRecord.mosaic.filter(
        (item): item is string => typeof item === "string" && item.trim() !== ""
      )
    : [];

  return {
    visible: parseVisible(record.visible),
    challenges: {
      eyebrow: stringField(challengesRecord.eyebrow, defaults.challenges.eyebrow),
      title: stringField(challengesRecord.title, defaults.challenges.title),
      highlight: stringField(
        challengesRecord.highlight,
        defaults.challenges.highlight
      ),
      imageUrl: stringField(
        challengesRecord.imageUrl,
        defaults.challenges.imageUrl
      ),
      imageCaption: stringField(
        challengesRecord.imageCaption,
        defaults.challenges.imageCaption
      ),
      items: parseChallenges(challengesRecord.items, defaults.challenges.items),
    },
    mission: {
      eyebrow: stringField(missionRecord.eyebrow, defaults.mission.eyebrow),
      title: stringField(missionRecord.title, defaults.mission.title),
      body: stringField(missionRecord.body, defaults.mission.body),
      primaryLabel: stringField(
        missionRecord.primaryLabel,
        defaults.mission.primaryLabel
      ),
      primaryHref: stringField(
        missionRecord.primaryHref,
        defaults.mission.primaryHref
      ),
      secondaryLabel: stringField(
        missionRecord.secondaryLabel,
        defaults.mission.secondaryLabel
      ),
      secondaryHref: stringField(
        missionRecord.secondaryHref,
        defaults.mission.secondaryHref
      ),
      imageUrl: stringField(missionRecord.imageUrl, defaults.mission.imageUrl),
      mosaic: mosaic.length > 0 ? mosaic : defaults.mission.mosaic,
    },
    programmes: {
      eyebrow: stringField(
        programmesRecord.eyebrow,
        defaults.programmes.eyebrow
      ),
      title: stringField(programmesRecord.title, defaults.programmes.title),
      imageUrl: stringField(
        programmesRecord.imageUrl,
        defaults.programmes.imageUrl
      ),
      imageCaption: stringField(
        programmesRecord.imageCaption,
        defaults.programmes.imageCaption
      ),
    },
    research: {
      eyebrow: stringField(researchRecord.eyebrow, defaults.research.eyebrow),
      title: stringField(researchRecord.title, defaults.research.title),
      description: stringField(
        researchRecord.description,
        defaults.research.description
      ),
      items: parseResearchAreas(researchRecord.items, defaults.research.items),
    },
    news: {
      eyebrow: stringField(newsRecord.eyebrow, defaults.news.eyebrow),
      title: stringField(newsRecord.title, defaults.news.title),
      description: stringField(newsRecord.description, defaults.news.description),
    },
    newsletter: {
      title: stringField(newsletterRecord.title, defaults.newsletter.title),
      description: stringField(
        newsletterRecord.description,
        defaults.newsletter.description
      ),
    },
    cta: {
      title: stringField(ctaRecord.title, defaults.cta.title),
      description: stringField(ctaRecord.description, defaults.cta.description),
    },
  };
}

export function serializeHomePageData(value: HomePageData): HomePageData {
  return {
    visible: { ...value.visible },
    challenges: {
      ...value.challenges,
      eyebrow: value.challenges.eyebrow.trim(),
      title: value.challenges.title.trim(),
      highlight: value.challenges.highlight.trim(),
      imageUrl: value.challenges.imageUrl.trim(),
      imageCaption: value.challenges.imageCaption.trim(),
      items: value.challenges.items
        .map((item) => ({
          ...item,
          title: item.title.trim(),
          description: item.description.trim(),
        }))
        .filter((item) => item.title),
    },
    mission: {
      ...value.mission,
      eyebrow: value.mission.eyebrow.trim(),
      title: value.mission.title.trim(),
      body: value.mission.body.trim(),
      primaryLabel: value.mission.primaryLabel.trim(),
      primaryHref: value.mission.primaryHref.trim() || "/about",
      secondaryLabel: value.mission.secondaryLabel.trim(),
      secondaryHref: value.mission.secondaryHref.trim() || "/programs",
      imageUrl: value.mission.imageUrl.trim(),
      mosaic: value.mission.mosaic.map((src) => src.trim()).filter(Boolean),
    },
    programmes: {
      eyebrow: value.programmes.eyebrow.trim(),
      title: value.programmes.title.trim(),
      imageUrl: value.programmes.imageUrl.trim(),
      imageCaption: value.programmes.imageCaption.trim(),
    },
    research: {
      eyebrow: value.research.eyebrow.trim(),
      title: value.research.title.trim(),
      description: value.research.description.trim(),
      items: value.research.items
        .map((item) => ({
          ...item,
          title: item.title.trim(),
          description: item.description.trim(),
        }))
        .filter((item) => item.title),
    },
    news: {
      eyebrow: value.news.eyebrow.trim(),
      title: value.news.title.trim(),
      description: value.news.description.trim(),
    },
    newsletter: {
      title: value.newsletter.title.trim(),
      description: value.newsletter.description.trim(),
    },
    cta: {
      title: value.cta.title.trim(),
      description: value.cta.description.trim(),
    },
  };
}
