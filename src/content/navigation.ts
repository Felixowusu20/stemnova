import type { NavItem } from "@/types";

/**
 * Primary site navigation — aligned with admin CMS collections and public routes
 * so seeded mock data is reachable from the navbar.
 *
 * Programme dropdown children are filled at runtime from the CMS.
 */
export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about" },
      { label: "Our Story", href: "/about/story" },
      { label: "Vision & Mission", href: "/about/vision" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Governance", href: "/about/governance" },
      { label: "Roadmap", href: "/about/roadmap" },
      { label: "Research & Innovation", href: "/research" },
      { label: "Impact", href: "/impact" },
    ],
  },
  {
    label: "Programmes",
    href: "/programs",
    children: [{ label: "View All Programmes", href: "/programs" }],
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "News",
    href: "/blog",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Become a Mentor", href: "/mentor" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Partner With Us", href: "/partner" },
      { label: "Sponsor a Programme", href: "/sponsor" },
      { label: "Donate", href: "/donate" },
      { label: "Apply for Fellowships", href: "/fellowships" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
