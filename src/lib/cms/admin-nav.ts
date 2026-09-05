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
    kind: "group",
    id: "get-involved",
    label: "Get Involved",
    children: [
      { label: "Testimonials", href: "/admin/content/testimonials" },
      { label: "Partners", href: "/admin/content/partners" },
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
  leaf: Pick<AdminNavLeaf, "href" | "pageSlug">,
  pageIdBySlug: Record<string, string>
): string {
  if (leaf.href) return leaf.href;
  if (leaf.pageSlug) {
    const id = pageIdBySlug[leaf.pageSlug];
    if (id) return `/admin/content/pages/${id}`;
    return `/admin/content/pages`;
  }
  return "/admin/content";
}

export function isAdminHrefActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  if (href === "/admin/content") return pathname === "/admin/content";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isGroupActive(
  group: AdminNavGroup,
  pathname: string,
  pageIdBySlug: Record<string, string>
): boolean {
  return group.children.some((child) =>
    isAdminHrefActive(pathname, resolveAdminHref(child, pageIdBySlug))
  );
}
