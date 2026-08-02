import { hash } from "bcryptjs";
import type { Prisma } from "../src/generated/prisma/client";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config as loadEnv } from "dotenv";
import { siteConfig } from "../src/content/site";
import { navigation } from "../src/content/navigation";
import { images } from "../src/content/images";
import { programs } from "../src/content/programs";
import { events } from "../src/content/events";
import { blogPosts } from "../src/content/blog";
import { teamMembers } from "../src/content/team";
import { testimonials } from "../src/content/testimonials";
import { partners } from "../src/content/partners";
import { galleryAlbums } from "../src/content/gallery";
import { resources } from "../src/content/resources";
import { valuesData } from "../src/content/values";
import { contactPageContent } from "../src/content/contact";

loadEnv({ path: ".env.local" });
loadEnv();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function asJson(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

function getSeedAdmin() {
  const email = (
    process.env.ADMIN_EMAIL ||
    process.env.ADMIN_SEED_EMAIL ||
    ""
  )
    .toLowerCase()
    .trim();
  const password =
    process.env.ADMIN_PASSWORD || process.env.ADMIN_SEED_PASSWORD || "";
  return { email, password };
}

async function seedAdmin() {
  const { email, password } = getSeedAdmin();
  if (!email || !password) {
    console.warn("Skipping admin seed — ADMIN_SEED_EMAIL/PASSWORD not set");
    return;
  }

  const passwordHash = await hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", name: "STEMNova Admin" },
    create: {
      email,
      passwordHash,
      role: "ADMIN",
      name: "STEMNova Admin",
    },
  });
  console.log(`✓ Admin user ready: ${email}`);
}

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      logoUrl: "/images/stemnova-logo.jpg",
      logoAlt: siteConfig.name,
      contact: asJson(siteConfig.contact),
      social: asJson(siteConfig.social),
      announcementBar: asJson(siteConfig.announcementBar),
      heroSlides: asJson(images.homeSlides),
      pageHeroImages: asJson(images.hero),
    },
    create: {
      id: "default",
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      logoUrl: "/images/stemnova-logo.jpg",
      logoAlt: siteConfig.name,
      contact: asJson(siteConfig.contact),
      social: asJson(siteConfig.social),
      announcementBar: asJson(siteConfig.announcementBar),
      heroSlides: asJson(images.homeSlides),
      pageHeroImages: asJson(images.hero),
    },
  });
  console.log("✓ Site settings seeded");
}

async function seedNavigation() {
  // Always resync so public navbar stays aligned with src/content/navigation.ts
  await prisma.navItem.deleteMany();

  let order = 0;
  for (const item of navigation) {
    const parent = await prisma.navItem.create({
      data: {
        label: item.label,
        href: item.href,
        sortOrder: order++,
        isVisible: true,
      },
    });

    if (item.children?.length) {
      let childOrder = 0;
      for (const child of item.children) {
        await prisma.navItem.create({
          data: {
            label: child.label,
            href: child.href,
            parentId: parent.id,
            sortOrder: childOrder++,
            isVisible: true,
          },
        });
      }
    }
  }
  console.log("✓ Navigation synced from defaults");
}

async function upsertContent(
  collection: string,
  slug: string | null,
  title: string,
  data: Record<string, unknown>,
  extras?: {
    excerpt?: string;
    body?: string;
    coverUrl?: string;
    sortOrder?: number;
  }
) {
  if (slug) {
    await prisma.contentItem.upsert({
      where: { collection_slug: { collection, slug } },
      update: {
        title,
        data: asJson(data),
        excerpt: extras?.excerpt,
        body: extras?.body,
        coverUrl: extras?.coverUrl,
        sortOrder: extras?.sortOrder ?? 0,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
      create: {
        collection,
        slug,
        title,
        data: asJson(data),
        excerpt: extras?.excerpt,
        body: extras?.body,
        coverUrl: extras?.coverUrl,
        sortOrder: extras?.sortOrder ?? 0,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
    return;
  }

  const existing = await prisma.contentItem.findFirst({
    where: { collection, title },
  });
  if (existing) {
    await prisma.contentItem.update({
      where: { id: existing.id },
      data: {
        data: asJson(data),
        excerpt: extras?.excerpt,
        body: extras?.body,
        coverUrl: extras?.coverUrl,
        sortOrder: extras?.sortOrder ?? 0,
        status: "PUBLISHED",
      },
    });
  } else {
    await prisma.contentItem.create({
      data: {
        collection,
        title,
        data: asJson(data),
        excerpt: extras?.excerpt,
        body: extras?.body,
        coverUrl: extras?.coverUrl,
        sortOrder: extras?.sortOrder ?? 0,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
  }
}

async function seedCollections() {
  let i = 0;
  for (const program of programs) {
    await upsertContent(
      "programs",
      program.slug,
      program.title,
      program as unknown as Record<string, unknown>,
      {
        excerpt: program.shortDescription,
        body: program.intro,
        coverUrl: program.heroImageUrl,
        sortOrder: i++,
      }
    );
  }

  i = 0;
  for (const event of events) {
    await upsertContent(
      "events",
      event.slug,
      event.title,
      event as unknown as Record<string, unknown>,
      {
        excerpt: event.description,
        body: event.about,
        coverUrl: event.imageUrl,
        sortOrder: i++,
      }
    );
  }

  i = 0;
  for (const post of blogPosts) {
    await upsertContent(
      "blog",
      post.slug,
      post.title,
      post as unknown as Record<string, unknown>,
      {
        excerpt: post.excerpt,
        body: Array.isArray(post.content)
          ? post.content.join("\n\n")
          : String(post.content ?? ""),
        coverUrl: post.imageUrl,
        sortOrder: i++,
      }
    );
  }

  i = 0;
  for (const member of teamMembers) {
    await upsertContent(
      "team",
      member.slug,
      member.name,
      member as unknown as Record<string, unknown>,
      {
        excerpt: member.role,
        body: member.bio,
        coverUrl: member.imageUrl,
        sortOrder: i++,
      }
    );
  }

  i = 0;
  for (const item of testimonials) {
    await upsertContent(
      "testimonials",
      null,
      item.author,
      item as unknown as Record<string, unknown>,
      {
        body: item.quote,
        coverUrl: item.imageUrl,
        sortOrder: i++,
      }
    );
  }

  i = 0;
  for (const partner of partners) {
    await upsertContent(
      "partners",
      null,
      partner.name,
      partner as unknown as Record<string, unknown>,
      {
        coverUrl: partner.logoUrl,
        sortOrder: i++,
      }
    );
  }

  i = 0;
  for (const album of galleryAlbums) {
    await upsertContent(
      "gallery",
      album.slug,
      album.title,
      album as unknown as Record<string, unknown>,
      {
        excerpt: album.description,
        coverUrl: album.coverImageUrl,
        sortOrder: i++,
      }
    );
  }

  i = 0;
  for (const resource of resources) {
    await upsertContent(
      "resources",
      resource.slug,
      resource.title,
      resource as unknown as Record<string, unknown>,
      {
        excerpt: resource.description,
        sortOrder: i++,
      }
    );
  }

  i = 0;
  for (const quote of valuesData.leadershipPhilosophyQuotes) {
    await upsertContent(
      "philosophy-quotes",
      null,
      `Quote ${i + 1}`,
      { quote },
      { body: quote, sortOrder: i++ }
    );
  }

  await upsertContent(
    "pages",
    "vision-mission",
    "Vision & Mission",
    {
      vision: valuesData.vision,
      mission: valuesData.mission,
      coreValues: valuesData.coreValues,
    },
    { body: valuesData.mission }
  );

  await upsertContent(
    "pages",
    "about-story",
    "Our Story",
    { paragraphs: valuesData.aboutStory, timeline: valuesData.timeline },
    { body: valuesData.aboutStory.join("\n\n") }
  );

  await upsertContent(
    "pages",
    "contact",
    "Contact",
    contactPageContent as unknown as Record<string, unknown>,
    { excerpt: contactPageContent.shortIntro }
  );

  await prisma.contentItem.upsert({
    where: {
      collection_slug: { collection: "_system", slug: "cms-active" },
    },
    update: {},
    create: {
      collection: "_system",
      slug: "cms-active",
      title: "CMS active",
      status: "ARCHIVED",
      sortOrder: 0,
    },
  });

  console.log("✓ Content collections seeded");
}

function collectFrontendImageUrls(): { url: string; title: string }[] {
  const entries: { url: string; title: string }[] = [];
  const push = (url: string | undefined, title: string) => {
    if (url && url.startsWith("http")) entries.push({ url, title });
  };

  Object.entries(images.hero).forEach(([key, url]) =>
    push(url, `Page hero — ${key}`)
  );
  images.homeSlides.forEach((slide, i) =>
    push(slide.src, `Home slide ${i + 1}`)
  );
  Object.entries(images.programmes).forEach(([key, url]) =>
    push(url, `Programme — ${key}`)
  );
  images.gallery.forEach((url, i) => push(url, `Gallery stock ${i + 1}`));
  push(images.team.founder1, "Team — founder 1");
  push(images.team.founder2, "Team — founder 2");
  images.team.members.forEach((url, i) => push(url, `Team member ${i + 1}`));
  push(images.blog.default, "Blog default");

  for (const program of programs) {
    push(program.heroImageUrl, `Programme cover — ${program.title}`);
    program.galleryImageUrls?.forEach((url, i) =>
      push(url, `${program.title} gallery ${i + 1}`)
    );
  }
  for (const event of events) {
    push(event.imageUrl, `Event — ${event.title}`);
  }
  for (const post of blogPosts) {
    push(post.imageUrl, `Blog — ${post.title}`);
  }
  for (const member of teamMembers) {
    push(member.imageUrl, `Leadership — ${member.name}`);
  }
  for (const item of testimonials) {
    push(item.imageUrl, `Testimonial — ${item.author}`);
  }
  for (const partner of partners) {
    push(partner.logoUrl, `Partner — ${partner.name}`);
  }
  for (const album of galleryAlbums) {
    push(album.coverImageUrl, `Gallery album — ${album.title}`);
    album.images?.forEach((img, i) => {
      push(img.url, `${album.title} image ${i + 1}`);
    });
  }

  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}

async function seedMediaCatalog() {
  const { createHash } = await import("crypto");
  const catalog = collectFrontendImageUrls();
  let created = 0;

  for (const item of catalog) {
    const publicId = `seeded/${createHash("sha1").update(item.url).digest("hex").slice(0, 16)}`;
    const existing = await prisma.mediaAsset.findUnique({
      where: { publicId },
    });
    if (existing) continue;

    await prisma.mediaAsset.create({
      data: {
        publicId,
        url: item.url,
        secureUrl: item.url,
        resourceType: "image",
        folder: "stemnova/seeded",
        title: item.title,
        alt: item.title,
      },
    });
    created += 1;
  }

  console.log(`✓ Media library catalogued (${created} new, ${catalog.length} total unique)`);
}

async function main() {
  console.log("Seeding STEMNova CMS…");
  await seedAdmin();
  await seedSiteSettings();
  await seedNavigation();
  await seedCollections();
  await seedMediaCatalog();
  console.log("Done.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
