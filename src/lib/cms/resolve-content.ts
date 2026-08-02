import {
  getContentByCollection,
  getContentBySlug,
  isCmsActive,
} from "@/lib/cms/queries";
import {
  blogPosts,
  contactPageContent,
  events,
  galleryAlbums,
  programs,
  resources,
  teamMembers,
  testimonials,
  partners,
  valuesData,
} from "@/content";
import { parseRegistrationForm } from "@/lib/event-registration-form";
import type {
  BlogPost,
  CoreValue,
  Event,
  GalleryAlbum,
  GalleryImage,
  Program,
  Resource,
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
        objectives: Array.isArray(data.objectives)
          ? data.objectives
          : program?.objectives || [],
        activities: Array.isArray(data.activities)
          ? data.activities
          : program?.activities || [],
        beneficiaries: data.beneficiaries || program?.beneficiaries || "",
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
        isFounder: data.isFounder ?? member?.isFounder ?? false,
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

  return items.map((item) => {
    const data = asData<Partner>(item.data);

    return {
      id: item.id,
      name: item.title || data.name || "Partner",
      logoUrl: item.coverUrl || data.logoUrl || "",
      website: data.website,
      description:
        item.excerpt || item.body || data.description || "",
      category: data.category || "ngo",
      isPlaceholder: true as const,
    };
  });
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
        vision: "",
        mission: "",
        coreValues: [] as CoreValue[],
      };
    }
    return {
      vision: valuesData.vision,
      mission: valuesData.mission,
      coreValues: valuesData.coreValues,
    };
  }

  const data = asData<{
    vision?: string;
    mission?: string;
    coreValues?: CoreValue[];
  }>(item.data);

  return {
    vision: item.excerpt || data.vision || valuesData.vision,
    mission: item.body || data.mission || valuesData.mission,
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
        paragraphs: [] as string[],
        timeline: [] as TimelineMilestone[],
        coverUrl: null as string | null,
      };
    }
    return {
      paragraphs: valuesData.aboutStory,
      timeline: valuesData.timeline,
      coverUrl: null as string | null,
    };
  }

  const data = asData<{
    paragraphs?: string[];
    timeline?: TimelineMilestone[];
  }>(item.data);

  const paragraphs =
    (Array.isArray(data.paragraphs) && data.paragraphs.length > 0
      ? data.paragraphs
      : null) ||
    (item.body ? splitParagraphs(item.body) : null) ||
    valuesData.aboutStory;

  return {
    paragraphs,
    timeline: Array.isArray(data.timeline)
      ? data.timeline
      : valuesData.timeline,
    coverUrl: item.coverUrl,
  };
}

export async function resolveContactPage() {
  const item = await getContentBySlug("pages", "contact");
  if (!item) {
    if (await isCmsActive()) {
      return {
        ...contactPageContent,
        headline: "",
        shortIntro: "",
        details: [],
      };
    }
    return contactPageContent;
  }

  const data = asData<typeof contactPageContent>(item.data);

  return {
    ...contactPageContent,
    ...data,
    eyebrow: data.eyebrow || contactPageContent.eyebrow,
    headline: item.title || data.headline || contactPageContent.headline,
    shortIntro:
      item.excerpt || data.shortIntro || contactPageContent.shortIntro,
    responseNote: data.responseNote || contactPageContent.responseNote,
    details: Array.isArray(data.details)
      ? data.details
      : contactPageContent.details,
  };
}
