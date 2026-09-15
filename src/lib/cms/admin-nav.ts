/**
 * Admin sidebar structure aligned with the public site navigation labels,
 * so editors can find content by the same names they see on the frontend.
 */

export type AdminNavLeaf = {
  label: string;
  /** Direct admin href (collection list or fixed page) */
  href?: string;
  /** Resolve via CMS pages collection slug → /admin/content/pages/{id} */
  pageSlug?: string;
  /** Homepage section tab, appended as ?section= */
  section?: string;
};

export type AdminNavGroup = {
  kind: "group";
  id: string;
  label: string;
  children: AdminNavLeaf[];
};

export type AdminNavLink = {
  kind: "link";
  label: string;
  href?: string;
  pageSlug?: string;
};

export type AdminSiteNavItem = AdminNavGroup | AdminNavLink;

export const ADMIN_PRIMARY_NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inbox", label: "Inbox" },
] as const;

export const ADMIN_SITE_NAV: AdminSiteNavItem[] = [
  {
    kind: "group",
    id: "home",
    label: "Home page",
    children: [
      { label: "Hero", pageSlug: "home", section: "hero" },
      { label: "Challenges", pageSlug: "home", section: "challenges" },
      { label: "Focus Areas", pageSlug: "home-focus-areas" },
      { label: "Mission", pageSlug: "home", section: "mission" },
      { label: "Programmes", pageSlug: "home", section: "programmes" },
      { label: "Research", pageSlug: "home", section: "research" },
      { label: "Impact", pageSlug: "home", section: "impact" },
      { label: "Success Story", pageSlug: "home", section: "successStory" },
      { label: "Testimonials", pageSlug: "home", section: "testimonials" },
      { label: "Partners", pageSlug: "home", section: "partners" },
      { label: "Latest News", pageSlug: "home", section: "news" },
      { label: "Newsletter", pageSlug: "home", section: "newsletter" },
      { label: "Call to Action", pageSlug: "home", section: "cta" },
    ],
  },
  {
    kind: "group",
    id: "about",
    label: "About",
    children: [
      { label: "Overview", pageSlug: "about-overview" },
      { label: "Our Story", pageSlug: "about-story" },
      { label: "Vision & Mission", pageSlug: "vision-mission" },
      { label: "Leadership", pageSlug: "leadership" },
      { label: "Leadership Team", href: "/admin/content/team" },
      { label: "Impact", pageSlug: "impact" },
    ],
  },
  {
    kind: "link",
    label: "Programmes",
    href: "/admin/content/programs",
  },
  {
    kind: "link",
    label: "Events",
    href: "/admin/content/events",
  },
  {
    kind: "link",
    label: "Gallery",
    href: "/admin/content/gallery",
  },
  {
    kind: "link",
    label: "News",
    href: "/admin/content/blog",
  },
  {
    kind: "link",
    label: "Resources",
    href: "/admin/content/resources",
  },
  {
    kind: "link",
    label: "Partners",
    href: "/admin/content/partners",
  },
  {
    kind: "group",
    id: "get-involved",
    label: "Get Involved",
    children: [
      { label: "Testimonials", href: "/admin/content/testimonials" },
      { label: "Philosophy Quotes", href: "/admin/content/philosophy-quotes" },
    ],
  },
  {
    kind: "link",
    label: "Contact",
    pageSlug: "contact",
  },
];

export const ADMIN_SYSTEM_NAV = [
  { href: "/admin/settings", label: "Site settings" },
  { href: "/admin/navigation", label: "Navigation" },
  { href: "/admin/media", label: "Media library" },
  { href: "/admin/content", label: "All content" },
] as const;

export function resolveAdminHref(
  leaf: Pick<AdminNavLeaf, "href" | "pageSlug" | "section">,
  pageIdBySlug: Record<string, string>
): string {
  let href = "/admin/content";
  if (leaf.href) {
    href = leaf.href;
  } else if (leaf.pageSlug) {
    const id = pageIdBySlug[leaf.pageSlug];
    href = id ? `/admin/content/pages/${id}` : `/admin/content/pages`;
  }
  if (leaf.section) {
    return `${href}?section=${encodeURIComponent(leaf.section)}`;
  }
  return href;
}

export function isAdminHrefActive(
  pathname: string,
  href: string,
  search = ""
): boolean {
  const [hrefPath, hrefQuery = ""] = href.split("?");
  if (hrefPath === "/admin") return pathname === "/admin";
  if (hrefPath === "/admin/content") return pathname === "/admin/content";
  const pathMatch =
    pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
  if (!pathMatch) return false;

  const hrefSection = new URLSearchParams(hrefQuery).get("section");
  if (!hrefSection) return !new URLSearchParams(search).get("section");

  const currentSection = new URLSearchParams(search).get("section") || "hero";
  return currentSection === hrefSection;
}

export function isGroupActive(
  group: AdminNavGroup,
  pathname: string,
  pageIdBySlug: Record<string, string>,
  search = ""
): boolean {
  return group.children.some((child) =>
    isAdminHrefActive(
      pathname,
      resolveAdminHref(child, pageIdBySlug),
      search
    )
  );
}
