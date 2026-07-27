import type { NavItem } from "@/types";

/** Primary site navigation matching application routes. */
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
    ],
  },
  {
    label: "Programmes",
    href: "/programs",
    children: [
      {
        label: "Young Scholars STEM Discovery",
        href: "/programs/young-scholars-stem-discovery",
      },
      {
        label: "African STEM Fellows",
        href: "/programs/african-stem-fellows",
      },
      {
        label: "Quantum Education & Leaders",
        href: "/programs/quantum-education-leaders",
      },
      {
        label: "Girls Discover Science",
        href: "/programs/girls-discover-science",
      },
      { label: "View All Programmes", href: "/programs" },
    ],
  },
  {
    label: "Research",
    href: "/research",
  },
  {
    label: "Impact",
    href: "/impact",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "News",
    href: "/blog",
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
