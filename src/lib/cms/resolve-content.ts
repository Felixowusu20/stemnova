import {
  getContentByCollection,
  getContentBySlug,
  getResolvedSiteConfig,
  isCmsActive,
} from "@/lib/cms/queries";
import {
  blogPosts,
  events,
  galleryAlbums,
  impactData,
  IMPACT_DATA_DISCLAIMER,
  programs,
  resources,
  roadmapPhases,
  strategicPillars,
  teamMembers,
  testimonials,
  partners,
  valuesData,
} from "@/content";
import { toPartnerSlug } from "@/content/partners";
import { parseRegistrationForm } from "@/lib/event-registration-form";
import {
  defaultHomeFocusAreasPageData,
  parseContactPageData,
  parseHomeFocusAreasPageData,
} from "@/lib/cms/page-forms";
import {
  isFounderCategory,
  resolveLeadershipCategory,
} from "@/lib/cms/leadership-roles";
import type {
  BlogPost,
  CoreValue,
  Event,
  GalleryAlbum,
  GalleryImage,
  GovernanceBody,
  ImpactData,
  Program,
  Resource,
  RoadmapPhase,
  StrategicPillar,
  TeamMember,
  Testimonial,
  Partner,
  TimelineMilestone,
} from "@/types";

function asData<T extends object>(data: unknown): Partial<T> {
  return data && typeof data === "object" && data !== null
    ? (data as Partial<T>)
    : {};
}

function splitParagraphs(body?: string | null): string[] {
  if (!body) return [];
  return body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function stringOr<T extends string>(value: unknown, fallback: T): T {
  return typeof value === "string" && value.trim() ? (value as T) : fallback;
}

export async function resolvePrograms(): Promise<Program[]> {
  const items = await getContentByCollection("programs");
  if (!(await isCmsActive())) return programs;

  const staticBySlug = new Map(programs.map((item) => [item.slug, item]));

  return items
    .filter((item) => item.slug)
    .map((item) => {
      const program = staticBySlug.get(item.slug as Program["slug"]);
      const data = asData<Program>(item.data);
      const heroImageUrl =
        item.coverUrl || data.heroImageUrl || program?.heroImageUrl || "";

      const galleryFromData = Array.isArray(data.galleryImageUrls)
        ? data.galleryImageUrls.filter(
            (url): url is string => typeof url === "string" && url.length > 0
          )
        : null;

      let galleryImageUrls = galleryFromData?.length
        ? galleryFromData
        : program
          ? [...program.galleryImageUrls]
          : heroImageUrl
            ? [heroImageUrl]
            : [];

      if (item.coverUrl) {
        galleryImageUrls =
          galleryImageUrls.length > 0
            ? [item.coverUrl, ...galleryImageUrls.slice(1)]
            : [item.coverUrl];
      }

      const cmsObjectives = Array.isArray(data.objectives)
        ? data.objectives.filter(
            (goal): goal is string =>
              typeof goal === "string" && goal.trim().length > 0
          )
        : [];

      return {
        ...(program || {
          objectives: [],
          activities: [],
          stats: [],
          resources: [],
          testimonials: [],
          impactStatement: "",
          beneficiaries: "",
          approach: "",
          icon: "sparkles" as const,
        }),
        ...data,
        slug: item.slug as Program["slug"],
        title: item.title || data.title || program?.title || "",
        shortDescription:
          item.excerpt ||
          data.shortDescription ||
          program?.shortDescription ||
          "",
        intro: item.body || data.intro || program?.intro || "",
        heroImageUrl,
        galleryImageUrls,
        objectives:
          cmsObjectives.length > 0
            ? cmsObjectives
            : program?.objectives || [],
        activities: Array.isArray(data.activities)
          ? data.activities
          : program?.activities || [],
        beneficiaries:
          (typeof data.beneficiaries === "string" &&
            data.beneficiaries.trim()) ||
          program?.beneficiaries ||
          "",
        approach: data.approach || program?.approach || "",
        impactStatement:
          data.impactStatement || program?.impactStatement || "",
        icon: data.icon || program?.icon || "sparkles",
        isIllustrative: true as const,
      };
    });
}

export async function resolveProgramBySlug(slug: string) {
  const list = await resolvePrograms();
  return list.find((item) => item.slug === slug);
}

export async function resolveEvents(): Promise<Event[]> {
  const items = await getContentByCollection("events");
  if (!(await isCmsActive())) {
    return events.map((event) => ({
      ...event,
      registrationForm: parseRegistrationForm({
        registrationForm: event.registrationForm,
      }),
    }));
  }

  const staticBySlug = new Map(events.map((item) => [item.slug, item]));

  return items
    .filter((item) => item.slug)
    .map((item) => {
      const event = staticBySlug.get(item.slug as string);
      const data = asData<Event>(item.data);
      const registrationForm = parseRegistrationForm(item.data);

      return {
        ...(event || {
          id: item.id,
          category: "workshop" as const,
          date: new Date().toISOString().slice(0, 10),
          time: "TBA",
          location: "TBA",
          audience: "",
          highlights: [],
          agenda: [],
          registrationRequired: true,
          isPast: false,
        }),
        ...data,
        id: event?.id || item.id,
        slug: item.slug!,
        title: item.title || data.title || event?.title || "",
        description:
          item.excerpt || data.description || event?.description || "",
        about: item.body || data.about || event?.about || "",
        imageUrl: item.coverUrl || data.imageUrl || event?.imageUrl || "",
        galleryImageUrls: Array.isArray(data.galleryImageUrls)
          ? data.galleryImageUrls
          : event?.galleryImageUrls,
        category: data.category || event?.category || "workshop",
        date: data.date || event?.date || new Date().toISOString().slice(0, 10),
        time: data.time || event?.time || "TBA",
        location: data.location || event?.location || "TBA",
        audience: data.audience || event?.audience || "",
        highlights: Array.isArray(data.highlights)
          ? data.highlights
          : event?.highlights || [],
        agenda: Array.isArray(data.agenda) ? data.agenda : event?.agenda || [],
        registrationRequired:
          data.registrationRequired ?? event?.registrationRequired ?? true,
        registrationUrl: data.registrationUrl ?? event?.registrationUrl,
        registrationForm,
        isPast: data.isPast ?? event?.isPast ?? false,
        isIllustrative: true as const,
      };
    });
}

export async function resolveEventBySlug(slug: string) {
  const list = await resolveEvents();
  return list.find((item) => item.slug === slug);
}

/** Next upcoming event for the site announcement bar (soonest date first). */
export async function resolveAnnouncementEvent(): Promise<{
  title: string;
  date: string;
  slug: string;
} | null> {
  const list = await resolveEvents();
  const next = list
    .filter((event) => !event.isPast)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  if (!next?.title || !next.slug) return null;

  return {
    title: next.title,
    date: next.date,
    slug: next.slug,
  };
}

export async function resolveBlogPosts(): Promise<BlogPost[]> {
  const items = await getContentByCollection("blog");
  if (!(await isCmsActive())) return blogPosts;

  const staticBySlug = new Map(blogPosts.map((item) => [item.slug, item]));

  return items
    .filter((item) => item.slug)
    .map((item) => {
      const post = staticBySlug.get(item.slug as string);
      const data = asData<BlogPost>(item.data);
      const content =
        (item.body ? splitParagraphs(item.body) : null) ||
        (Array.isArray(data.content) && data.content.length > 0
          ? data.content
          : null) ||
        post?.content ||
        [];

      return {
        ...(post || {
          category: "news" as const,
          publishedAt: new Date().toISOString().slice(0, 10),
          author: "STEMNova Foundation",
          featured: false,
        }),
        ...data,
        slug: item.slug!,
        title: item.title || data.title || post?.title || "",
        excerpt: item.excerpt || data.excerpt || post?.excerpt || "",
        content,
        imageUrl: item.coverUrl || data.imageUrl || post?.imageUrl || "",
        category: data.category || post?.category || "news",
        publishedAt:
          data.publishedAt ||
          post?.publishedAt ||
          item.publishedAt?.toISOString().slice(0, 10) ||
          new Date().toISOString().slice(0, 10),
        author: data.author || post?.author || "STEMNova Foundation",
        featured: data.featured ?? post?.featured ?? false,
        isIllustrative: true as const,
      };
    });
}

export async function resolveBlogPostBySlug(slug: string) {
  const list = await resolveBlogPosts();
  return list.find((item) => item.slug === slug);
}

export async function resolveLatestPosts(n: number) {
  const posts = await resolveBlogPosts();
  return [...posts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, n);
}

export async function resolveRelatedPosts(slug: string, limit = 3) {
  const posts = await resolveBlogPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return resolveLatestPosts(limit);
  return posts
    .filter(
      (post) => post.slug !== slug && post.category === current.category
    )
    .slice(0, limit);
}

export async function resolveTeam(): Promise<TeamMember[]> {
  const items = await getContentByCollection("team");
  if (!(await isCmsActive())) return teamMembers;

  const staticBySlug = new Map(teamMembers.map((item) => [item.slug, item]));

  return items
    .filter((item) => item.slug)
    .map((item) => {
      const member = staticBySlug.get(item.slug as string);
      const data = asData<TeamMember>(item.data);
      const bodyParagraphs = item.body ? splitParagraphs(item.body) : null;
      const leadershipCategory = resolveLeadershipCategory({
        leadershipCategory:
          data.leadershipCategory ?? member?.leadershipCategory,
        isFounder:
          typeof data.isFounder === "boolean"
            ? data.isFounder
            : member?.isFounder,
        role: item.excerpt || data.role || member?.role,
      });

      return {
        ...(member || {
          id: item.id,
          focusAreas: [],
          highlights: [],
          fullBio: [],
          isFounder: false,
        }),
        ...data,
        id: member?.id || item.id,
        slug: item.slug!,
        name: item.title || data.name || member?.name || "",
        role: item.excerpt || data.role || member?.role || "Leadership",
        bio: item.body || data.bio || member?.bio || "",
        fullBio:
          bodyParagraphs ||
          (Array.isArray(data.fullBio) && data.fullBio.length > 0
            ? data.fullBio
            : null) ||
          member?.fullBio ||
          [],
        imageUrl: item.coverUrl || data.imageUrl || member?.imageUrl || "",
        email:
          "email" in data
            ? typeof data.email === "string" && data.email.trim()
              ? data.email.trim()
              : undefined
            : member?.email,
        linkedin:
          "linkedin" in data
            ? typeof data.linkedin === "string" && data.linkedin.trim()
              ? data.linkedin.trim()
              : undefined
            : member?.linkedin,
        leadershipCategory,
        isFounder: isFounderCategory(leadershipCategory),
        isIllustrative: true as const,
      };
    });
}

export async function resolveLeaderBySlug(slug: string) {
  const leaders = await resolveTeam();
  return leaders.find((leader) => leader.slug === slug);
}

export async function resolveFounders() {
  const leaders = await resolveTeam();
  return leaders.filter((leader) => leader.isFounder);
}

export async function resolveNonFounderTeam() {
  const leaders = await resolveTeam();
  return leaders.filter((leader) => !leader.isFounder);
}

export async function resolveLeadershipPage() {
  const defaults = {
    foundersEyebrow: "Leadership",
    foundersTitle: "Meet Our Founder",
    foundersDescription: "Building pathways for African STEM talent.",
    teamEyebrow: "Secretariat and Board",
    teamTitle: "Institutional Leadership",
    teamDescription: "Select a leader to read their full profile.",
  };

  const item = await getContentBySlug("pages", "leadership");
  if (!item) {
    if (await isCmsActive()) return defaults;
    return defaults;
  }

  const data = asData<typeof defaults>(item.data);

  return {
    foundersEyebrow: data.foundersEyebrow || defaults.foundersEyebrow,
    foundersTitle: data.foundersTitle || defaults.foundersTitle,
    foundersDescription:
      data.foundersDescription || defaults.foundersDescription,
    teamEyebrow: data.teamEyebrow || defaults.teamEyebrow,
    teamTitle: data.teamTitle || defaults.teamTitle,
    teamDescription: data.teamDescription || defaults.teamDescription,
  };
}

export async function resolveTestimonials(): Promise<Testimonial[]> {
  const items = await getContentByCollection("testimonials");
  if (!(await isCmsActive())) return testimonials;

  return items.map((item) => {
    const data = asData<Testimonial>(item.data);

    return {
      id: item.id,
      quote: item.body || data.quote || "",
      author: item.title || data.author || "Community member",
      role: stringOr(data.role, ""),
      organization: data.organization,
      programSlug: data.programSlug,
      imageUrl: item.coverUrl || data.imageUrl,
      isIllustrative: true as const,
    };
  });
}

export async function resolvePartners(): Promise<Partner[]> {
  const items = await getContentByCollection("partners");
  if (!(await isCmsActive())) return partners;

  if (items.length === 0) return partners;

  return items.map((item) => {
    const data = asData<Partner>(item.data);
    const name = item.title || data.name || "Partner";
    const slug =
      item.slug ||
      data.slug ||
      toPartnerSlug(name);

    return {
      id: item.id,
      slug,
      name,
      logoUrl: item.coverUrl || data.logoUrl || "",
      website:
        typeof data.website === "string" && data.website !== "#"
          ? data.website.trim()
          : undefined,
      description:
        item.excerpt || data.description || "",
      body: item.body || data.body || undefined,
      category: data.category || "ngo",
      isPlaceholder: true as const,
    };
  });
}

export async function resolvePartnerBySlug(
  slug: string
): Promise<Partner | null> {
  const all = await resolvePartners();
  return all.find((partner) => partner.slug === slug) || null;
}

export async function resolveGalleryAlbums(): Promise<GalleryAlbum[]> {
  const items = await getContentByCollection("gallery");
  if (!(await isCmsActive())) return galleryAlbums;

  const staticBySlug = new Map(galleryAlbums.map((item) => [item.slug, item]));

  return items
    .filter((item) => item.slug)
    .map((item) => {
      const album = staticBySlug.get(item.slug as string);
      const data = asData<GalleryAlbum>(item.data);
      const images = Array.isArray(data.images)
        ? (data.images as GalleryImage[])
        : album?.images || [];

      return {
        ...(album || { images: [] }),
        ...data,
        slug: item.slug!,
        title: item.title || data.title || album?.title || "",
        description:
          item.excerpt || data.description || album?.description || "",
        coverImageUrl:
          item.coverUrl || data.coverImageUrl || album?.coverImageUrl || "",
        images,
      };
    });
}

export async function resolveGalleryAlbumBySlug(slug: string) {
  const albums = await resolveGalleryAlbums();
  return albums.find((album) => album.slug === slug);
}

export async function resolveResources(): Promise<Resource[]> {
  const items = await getContentByCollection("resources");
  if (!(await isCmsActive())) return resources;

  const staticBySlug = new Map(resources.map((item) => [item.slug, item]));

  return items
    .filter((item) => item.slug)
    .map((item) => {
      const resource = staticBySlug.get(item.slug as string);
      const data = asData<Resource>(item.data);

      return {
        ...(resource || {
          id: item.id,
          type: "article" as const,
          topic: "talent-discovery" as const,
          href: "#",
          publishedAt: new Date().toISOString().slice(0, 10),
        }),
        ...data,
        id: resource?.id || item.id,
        slug: item.slug!,
        title: item.title || data.title || resource?.title || "",
        description:
          item.excerpt || data.description || resource?.description || "",
        imageUrl: item.coverUrl || data.imageUrl || resource?.imageUrl,
        type: data.type || resource?.type || "article",
        topic: data.topic || resource?.topic || "talent-discovery",
        href: data.href || resource?.href || "#",
        publishedAt:
          data.publishedAt ||
          resource?.publishedAt ||
          item.publishedAt?.toISOString().slice(0, 10) ||
          new Date().toISOString().slice(0, 10),
        isIllustrative: true as const,
      };
    });
}

export async function resolveVisionMission() {
  const item = await getContentBySlug("pages", "vision-mission");
  if (!item) {
    if (await isCmsActive()) {
      return {
        title: "Vision & Mission",
        heroDescription: "",
        sectionTitle: "What We Exist to Build",
        vision: "",
        mission: "",
        visionImageUrl: "",
        missionImageUrl: "",
        coreValues: [] as CoreValue[],
      };
    }
    return {
      title: "Vision & Mission",
      heroDescription:
        "What we exist to build for scientific talent across Africa.",
      sectionTitle: "What We Exist to Build",
      vision: valuesData.vision,
      mission: valuesData.mission,
      visionImageUrl: "",
      missionImageUrl: "",
      coreValues: valuesData.coreValues,
    };
  }

  const data = asData<{
    vision?: string;
    mission?: string;
    heroDescription?: string;
    sectionTitle?: string;
    visionImageUrl?: string;
    missionImageUrl?: string;
    coreValues?: CoreValue[];
  }>(item.data);

  return {
    title: item.title || "Vision & Mission",
    heroDescription:
      data.heroDescription ||
      "What we exist to build for scientific talent across Africa.",
    sectionTitle: data.sectionTitle || "What We Exist to Build",
    vision: data.vision || item.excerpt || valuesData.vision,
    mission: data.mission || item.body || valuesData.mission,
    visionImageUrl:
      (typeof data.visionImageUrl === "string" && data.visionImageUrl) || "",
    missionImageUrl:
      (typeof data.missionImageUrl === "string" && data.missionImageUrl) || "",
    coreValues: Array.isArray(data.coreValues)
      ? data.coreValues
      : valuesData.coreValues,
  };
}

export async function resolveAboutStory() {
  const item = await getContentBySlug("pages", "about-story");
  if (!item) {
    if (await isCmsActive()) {
      return {
        title: "Our Story",
        heroDescription: "",
        sectionEyebrow: "Our Story",
        sectionTitle: "Why STEMNova Exists",
        paragraphs: [] as string[],
        timeline: [] as TimelineMilestone[],
        coverUrl: null as string | null,
      };
    }
    return {
      title: "Our Story",
      heroDescription:
        "Why STEMNova exists and what we are building for African STEM talent.",
      sectionEyebrow: "Our Story",
      sectionTitle: "Why STEMNova Exists",
      paragraphs: valuesData.aboutStory,
      timeline: valuesData.timeline,
      coverUrl: null as string | null,
    };
  }

  const data = asData<{
    paragraphs?: string[];
    timeline?: TimelineMilestone[];
    heroDescription?: string;
    sectionEyebrow?: string;
    sectionTitle?: string;
  }>(item.data);

  const paragraphs =
    (Array.isArray(data.paragraphs) && data.paragraphs.length > 0
      ? data.paragraphs
      : null) ||
    (item.body ? splitParagraphs(item.body) : null) ||
    valuesData.aboutStory;

  return {
    title: item.title || "Our Story",
    heroDescription:
      data.heroDescription ||
      item.excerpt ||
      "Why STEMNova exists and what we are building for African STEM talent.",
    sectionEyebrow: data.sectionEyebrow || "Our Story",
    sectionTitle: data.sectionTitle || "Why STEMNova Exists",
    paragraphs,
    timeline: Array.isArray(data.timeline)
      ? data.timeline
      : valuesData.timeline,
    coverUrl: item.coverUrl,
  };
}

export async function resolveAboutOverview() {
  const fallbackLinks = [
    {
      id: "story",
      title: "Our Story",
      description: "Why STEMNova was founded and what we are building.",
      href: "/about/story",
    },
    {
      id: "vision",
      title: "Vision & Mission",
      description: "What we exist to build for African STEM talent.",
      href: "/about/vision",
    },
    {
      id: "leadership",
      title: "Leadership",
      description: "Meet our co-founders and institutional leadership team.",
      href: "/about/leadership",
    },
  ];

  const fallback = {
    heroTitle: "About STEMNova Foundation",
    heroDescription:
      "Building Africa's home for scientific talent discovery and STEM leadership.",
    sectionEyebrow: "About Us",
    sectionTitle: "Get to Know STEMNova",
    intro:
      "STEMNova Foundation is a pan-African non-profit dedicated to discovering scientific talent, developing research leaders, and advancing STEM education across Africa. Explore each area below to learn more about who we are and where we are going.",
    imageUrl: "",
    links: fallbackLinks,
  };

  const item = await getContentBySlug("pages", "about-overview");
  if (!item) {
    if (await isCmsActive()) {
      return {
        ...fallback,
        heroTitle: "",
        heroDescription: "",
        intro: "",
        links: [],
      };
    }
    return fallback;
  }

  const data = asData<{
    heroTitle?: string;
    heroDescription?: string;
    sectionEyebrow?: string;
    sectionTitle?: string;
    intro?: string;
    imageUrl?: string;
    links?: {
      id?: string;
      title?: string;
      description?: string;
      href?: string;
    }[];
  }>(item.data);

  const links = Array.isArray(data.links)
    ? data.links
        .map((link, index) => ({
          id: link.id || `link-${index}`,
          title: link.title || "",
          description: link.description || "",
          href: link.href || "",
        }))
        .filter(
          (link) =>
            link.title &&
            link.href &&
            link.href !== "/about/governance" &&
            link.href !== "/about/roadmap" &&
            link.id !== "governance" &&
            link.id !== "roadmap"
        )
    : fallbackLinks;

  return {
    heroTitle: data.heroTitle || item.title || fallback.heroTitle,
    heroDescription:
      data.heroDescription || item.excerpt || fallback.heroDescription,
    sectionEyebrow: data.sectionEyebrow || fallback.sectionEyebrow,
    sectionTitle: data.sectionTitle || fallback.sectionTitle,
    intro: data.intro || item.body || fallback.intro,
    imageUrl: data.imageUrl || item.coverUrl || fallback.imageUrl,
    links: links.length > 0 ? links : fallbackLinks,
  };
}

export async function resolveContactPage() {
  const fallback = parseContactPageData({});
  const [item, site] = await Promise.all([
    getContentBySlug("pages", "contact"),
    getResolvedSiteConfig(),
  ]);

  const addressLine = [
    site.contact.address.line1,
    site.contact.address.line2,
    [site.contact.address.city, site.contact.address.region]
      .filter(Boolean)
      .join(", "),
    site.contact.address.country,
  ]
    .filter(Boolean)
    .join(", ");

  const syncedDetails = [
    {
      id: "email",
      label: "Email",
      value: site.contact.email,
      href: site.contact.email ? `mailto:${site.contact.email}` : undefined,
      icon: "email" as const,
    },
    {
      id: "phone",
      label: "Phone",
      value: site.contact.phone,
      href: site.contact.phone
        ? `tel:${site.contact.phone.replace(/\s/g, "")}`
        : undefined,
      icon: "phone" as const,
    },
    {
      id: "address",
      label: "Office",
      value: addressLine,
      icon: "address" as const,
    },
    {
      id: "hours",
      label: "Hours",
      value: site.contact.hours.weekdays || "",
      icon: "hours" as const,
    },
  ].filter((detail) => detail.value);

  if (!item) {
    if (await isCmsActive()) {
      return {
        ...fallback,
        headline: "",
        shortIntro: "",
        responseNote: "",
        details: syncedDetails,
      };
    }
    return { ...fallback, details: syncedDetails };
  }

  const parsed = parseContactPageData(item.data, {
    title: item.title,
    excerpt: item.excerpt,
  });

  return {
    ...parsed,
    details: syncedDetails.length > 0 ? syncedDetails : parsed.details,
  };
}

export async function resolveGovernance(): Promise<{
  title: string;
  description: string;
  bodies: GovernanceBody[];
}> {
  const fallback = {
    title: "Governance",
    description:
      "Clear oversight across the Board, advisory committees, and Secretariat.",
    bodies: valuesData.governance,
  };

  const item = await getContentBySlug("pages", "governance");
  if (!item) return fallback;

  const data = asData<{ bodies?: GovernanceBody[] }>(item.data);

  return {
    title: item.title || fallback.title,
    description: item.excerpt || fallback.description,
    bodies: Array.isArray(data.bodies) && data.bodies.length > 0
      ? data.bodies
      : fallback.bodies,
  };
}

export async function resolveRoadmap(): Promise<{
  title: string;
  description: string;
  timeline: TimelineMilestone[];
  phases: RoadmapPhase[];
}> {
  const fallback = {
    title: "Roadmap",
    description:
      "Our phased path from a new foundation to lasting institutional strength.",
    timeline: valuesData.timeline,
    phases: roadmapPhases,
  };

  const item = await getContentBySlug("pages", "roadmap");
  if (!item) return fallback;

  const data = asData<{
    timeline?: TimelineMilestone[];
    phases?: RoadmapPhase[];
  }>(item.data);

  return {
    title: item.title || fallback.title,
    description: item.excerpt || fallback.description,
    timeline:
      Array.isArray(data.timeline) && data.timeline.length > 0
        ? data.timeline
        : fallback.timeline,
    phases:
      Array.isArray(data.phases) && data.phases.length > 0
        ? data.phases
        : fallback.phases,
  };
}

export async function resolveImpact(): Promise<
  ImpactData & {
    title: string;
    description: string;
    disclaimer: string;
  }
> {
  const fallback = {
    ...impactData,
    title: "Our Impact",
    description:
      "Impact metrics will appear here once STEMNova programmes launch and results are verified.",
    disclaimer: IMPACT_DATA_DISCLAIMER,
  };

  const item = await getContentBySlug("pages", "impact");
  if (!item) return fallback;

  const data = asData<ImpactData & { disclaimer?: string }>(item.data);

  // Prefer zeroed static metrics until programmes launch; CMS copy still applies
  return {
    title: item.title || fallback.title,
    description: item.excerpt || fallback.description,
    disclaimer: item.body || data.disclaimer || fallback.disclaimer,
    statistics: impactData.statistics,
    programBreakdown: impactData.programBreakdown,
    locations: impactData.locations,
    successStories: Array.isArray(data.successStories)
      ? data.successStories
      : fallback.successStories,
    beforeAfterStories: Array.isArray(data.beforeAfterStories)
      ? data.beforeAfterStories
      : fallback.beforeAfterStories,
    annualReports: Array.isArray(data.annualReports)
      ? data.annualReports
      : fallback.annualReports,
    donationUsage: impactData.donationUsage,
  };
}

export async function resolveHomeFocusAreas(): Promise<{
  eyebrow: string;
  title: string;
  pillars: StrategicPillar[];
}> {
  const defaults = defaultHomeFocusAreasPageData();
  const fallback = {
    eyebrow: defaults.eyebrow,
    title: defaults.sectionTitle,
    pillars: strategicPillars,
  };

  const item = await getContentBySlug("pages", "home-focus-areas");
  if (!item) return fallback;

  const data = parseHomeFocusAreasPageData(item.data);
  const defaultsById = new Map(
    strategicPillars.map((pillar) => [pillar.id, pillar])
  );
  const pillars =
    data.pillars.length > 0
      ? data.pillars
          .filter((pillar) => pillar.title.trim())
          .map((pillar) => ({
            ...pillar,
            imageUrl:
              pillar.imageUrl?.trim() ||
              defaultsById.get(pillar.id)?.imageUrl ||
              "",
          }))
      : fallback.pillars;

  return {
    eyebrow: data.eyebrow || item.excerpt || fallback.eyebrow,
    title: data.sectionTitle || item.title || fallback.title,
    pillars: pillars.length > 0 ? pillars : fallback.pillars,
  };
}
