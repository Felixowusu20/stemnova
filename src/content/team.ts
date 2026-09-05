import { images } from "@/content/images";
import type { TeamMember } from "@/types";

/**
 * Team member profiles. Illustrative public facing bios for now.
 * Replace with verified information before launch.
 */
export const teamMembers: TeamMember[] = [
  {
    id: "co-founder-dorcas",
    slug: "dorcas-attuabea-addo",
    name: "Dr. Dorcas Attuabea Addo",
    role: "Co-Founder and Executive Director",
    bio: "Materials scientist and Co-Founder of STEMNova Foundation focused on clear pathways for African STEM talent.",
    fullBio: [
      "Dr. Dorcas Attuabea Addo co-founded STEMNova Foundation to build the institutional support she saw missing for promising African STEM students.",
      "Her work focuses on talent discovery, research leadership pathways, and making advanced scientific opportunity reachable for students across public schools and universities.",
      "As Executive Director, she guides STEMNova strategy, partnerships, and programme growth across the continent.",
    ],
    focusAreas: [
      "Talent discovery",
      "Materials science pathways",
      "Institutional partnerships",
      "Research leadership development",
    ],
    highlights: [
      "Co-founded STEMNova Foundation",
      "Leads foundation strategy and growth",
      "Champions equitable access to STEM opportunity",
    ],
    imageUrl: images.team.founder1,
    email: "dorcas.addo@stemnovafoundation.org",
    linkedin: "https://linkedin.com/in/dorcas-attuabea-addo",
    leadershipCategory: "co-founder",
    isFounder: true,
    isIllustrative: true,
  },
  {
    id: "co-founder-bernice",
    slug: "bernice-yram-danu",
    name: "Dr. Bernice Yram Danu",
    role: "Co-Founder and Director of Research Programmes",
    bio: "Quantum science educator and Co-Founder leading STEMNova research programmes and frontier science pathways.",
    fullBio: [
      "Dr. Bernice Yram Danu co-founded STEMNova Foundation with a focus on research leadership and frontier science education.",
      "She directs fellowship programmes, research partnerships, and initiatives that open quantum and advanced STEM fields to African institutions and students.",
      "Her leadership connects early talent with mentors, laboratories, and international research communities.",
    ],
    focusAreas: [
      "Research fellowships",
      "Quantum education",
      "Mentor networks",
      "Scientific collaboration",
    ],
    highlights: [
      "Co-founded STEMNova Foundation",
      "Directs research and fellowship programmes",
      "Advances frontier STEM education access",
    ],
    imageUrl: images.team.founder2,
    email: "bernice.danu@stemnovafoundation.org",
    linkedin: "https://linkedin.com/in/bernice-yram-danu",
    leadershipCategory: "co-founder",
    isFounder: true,
    isIllustrative: true,
  },
  {
    id: "board-trustee-kwame",
    slug: "kwame-asante",
    name: "Prof. Kwame Asante",
    role: "Board Trustee, Higher Education Policy",
    bio: "Advises STEMNova on education policy and programme alignment with national STEM standards.",
    fullBio: [
      "Prof. Kwame Asante brings deep experience in higher education policy and STEM curriculum frameworks.",
      "On the STEMNova Board, he helps align programmes with national education priorities and long term institutional quality.",
      "He supports policy engagement that strengthens STEM pathways for students and educators.",
    ],
    focusAreas: [
      "Higher education policy",
      "Curriculum alignment",
      "Governance oversight",
    ],
    highlights: [
      "Board Trustee focused on education policy",
      "Supports national STEM standards alignment",
      "Guides programme quality and accountability",
    ],
    imageUrl: images.team.members[0],
    email: "kwame.asante@stemnovafoundation.org",
    leadershipCategory: "board-trustee",
    isIllustrative: true,
  },
  {
    id: "board-trustee-amara",
    slug: "amara-okafor",
    name: "Dr. Amara Okafor",
    role: "Board Trustee, International Research Partnerships",
    bio: "Guides STEMNova global research partnerships and fellowship placement quality.",
    fullBio: [
      "Dr. Amara Okafor advises STEMNova on international research partnerships and collaboration quality.",
      "She helps shape fellowship placement standards and connects STEMNova programmes with universities and research networks abroad.",
      "Her board role strengthens STEMNova ability to open global research pathways for African talent.",
    ],
    focusAreas: [
      "International partnerships",
      "Research networks",
      "Fellowship quality",
    ],
    highlights: [
      "Board Trustee for research partnerships",
      "Supports global collaboration strategy",
      "Strengthens fellowship placement standards",
    ],
    imageUrl: images.team.members[1],
    email: "amara.okafor@stemnovafoundation.org",
    leadershipCategory: "board-trustee",
    isIllustrative: true,
  },
  {
    id: "secretariat-operations",
    slug: "kofi-adom",
    name: "Mr. Kofi Adom",
    role: "Director of Operations",
    bio: "Leads day to day operations, programme logistics, and partner coordination.",
    fullBio: [
      "Kofi Adom manages STEMNova operations across programme delivery, logistics, and partner coordination.",
      "He keeps multi country activities on schedule and helps teams deliver programmes with clarity and care.",
      "His work supports reliable execution as STEMNova grows its institutional footprint.",
    ],
    focusAreas: [
      "Programme operations",
      "Partner coordination",
      "Delivery systems",
    ],
    highlights: [
      "Leads foundation operations",
      "Coordinates multi country programme delivery",
      "Strengthens internal systems and logistics",
    ],
    imageUrl: images.team.members[2],
    email: "kofi.adom@stemnovafoundation.org",
    leadershipCategory: "director",
    isIllustrative: true,
  },
  {
    id: "secretariat-communications",
    slug: "ama-serwaa",
    name: "Ms. Ama Serwaa",
    role: "Director of Communications and Partnerships",
    bio: "Leads communications, donor relations, and institutional partnership development.",
    fullBio: [
      "Ama Serwaa leads STEMNova communications, donor relations, and partnership storytelling.",
      "She helps institutions, supporters, and communities understand STEMNova mission and progress with clear public messaging.",
      "Her work builds trust and strengthens relationships that sustain long term growth.",
    ],
    focusAreas: [
      "Communications",
      "Donor relations",
      "Partnership development",
    ],
    highlights: [
      "Leads public communications",
      "Builds donor and partner relationships",
      "Shapes STEMNova external storytelling",
    ],
    imageUrl: images.team.members[3],
    email: "ama.serwaa@stemnovafoundation.org",
    leadershipCategory: "director",
    isIllustrative: true,
  },
];

export function getFounder(): TeamMember | undefined {
  return teamMembers.find((member) => member.isFounder);
}

export function getFounders(): TeamMember[] {
  return teamMembers.filter((member) => member.isFounder);
}

export function getTeamMembers(): TeamMember[] {
  return teamMembers.filter((member) => !member.isFounder);
}

export function getLeaderBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}

export function getAllLeaders(): TeamMember[] {
  return teamMembers;
}
