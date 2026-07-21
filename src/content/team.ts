import { images } from "@/content/images";
import type { TeamMember } from "@/types";

/**
 * Team member profiles — illustrative public-facing bios.
 * Replace with verified information before launch.
 */
export const teamMembers: TeamMember[] = [
  {
    id: "co-founder-dorcas",
    name: "Dr. Dorcas Attuabea Addo",
    role: "Co-Founder & Executive Director",
    bio:
      "Dr. Dorcas Attuabea Addo co-founded STEMNova Foundation with a vision rooted in her journey from a public secondary school in Ghana to an international research career in materials science. Having experienced firsthand the barriers that talented African students face—limited mentorship, inadequate laboratory access, and isolation from global research networks—she established STEMNova to build the institutional infrastructure she wished had existed. Dr. Addo holds a PhD in Materials Science and has published extensively on solid-state physics and sustainable energy materials. She has held research appointments at leading African and international institutions and serves on advisory boards for science education policy. Under her leadership, STEMNova has grown from a founding vision into a multi-programme institution reaching thousands of students and researchers across the continent. (Illustrative public-facing bio — details to be verified and updated by the foundation.)",
    imageUrl: images.team.founder1,
    email: "dorcas.addo@stemnovafoundation.org",
    linkedin: "https://linkedin.com/in/dorcas-attuabea-addo",
    isFounder: true,
    isIllustrative: true,
  },
  {
    id: "co-founder-bernice",
    name: "Dr. Bernice Yram Danu",
    role: "Co-Founder & Director of Research Programmes",
    bio:
      "Dr. Bernice Yram Danu co-founded STEMNova Foundation alongside Dr. Addo, bringing deep expertise in quantum science education and research leadership development. Her career spans academic research, university teaching, and international science policy—giving her a unique perspective on the gaps between African STEM talent and the pathways required to develop it. Dr. Danu pioneered early quantum education initiatives in West Africa and has mentored dozens of graduate students who have progressed to faculty positions and industry research roles. At STEMNova, she directs fellowship programmes, research partnerships, and the Quantum Education Leaders initiative. She is passionate about ensuring that frontier disciplines like quantum science are accessible to African institutions—not reserved for elite universities abroad. (Illustrative public-facing bio — details to be verified and updated by the foundation.)",
    imageUrl: images.team.founder2,
    email: "bernice.danu@stemnovafoundation.org",
    linkedin: "https://linkedin.com/in/bernice-yram-danu",
    isFounder: true,
    isIllustrative: true,
  },
  {
    id: "board-trustee-kwame",
    name: "Prof. Kwame Asante",
    role: "Board Trustee — Higher Education Policy",
    bio:
      "Prof. Kwame Asante is a professor emeritus of education policy with four decades of experience shaping STEM curriculum frameworks across West Africa. He advises STEMNova on programme alignment with national education standards and policy engagement strategy. (Illustrative bio.)",
    imageUrl: images.team.members[0],
    email: "kwame.asante@stemnovafoundation.org",
    isIllustrative: true,
  },
  {
    id: "board-trustee-amara",
    name: "Dr. Amara Okafor",
    role: "Board Trustee — International Research Partnerships",
    bio:
      "Dr. Okafor directs international research collaborations at a leading African university and serves on STEMNova's Board, guiding global partnership strategy and fellowship placement quality. Her expertise spans computational biology and research network development. (Illustrative bio.)",
    imageUrl: images.team.members[1],
    email: "amara.okafor@stemnovafoundation.org",
    isIllustrative: true,
  },
  {
    id: "secretariat-operations",
    name: "Mr. Kofi Adom",
    role: "Director of Operations",
    bio:
      "Kofi Adom manages STEMNova's day-to-day operations including programme logistics, financial administration, and partner institution coordination. With a background in nonprofit management and project finance, he ensures programmes deliver on time and within budget across multiple countries. (Illustrative bio.)",
    imageUrl: images.team.members[2],
    email: "kofi.adom@stemnovafoundation.org",
    isIllustrative: true,
  },
  {
    id: "secretariat-communications",
    name: "Ms. Ama Serwaa",
    role: "Director of Communications & Partnerships",
    bio:
      "Ama Serwaa leads STEMNova's external communications, donor relations, and institutional partnership development. She previously managed communications for an international development organization and brings expertise in storytelling, stakeholder engagement, and campaign strategy. (Illustrative bio.)",
    imageUrl: images.team.members[3],
    email: "ama.serwaa@stemnovafoundation.org",
    isIllustrative: true,
  },
];

/** Retrieve the first founder team member. */
export function getFounder(): TeamMember | undefined {
  return teamMembers.find((member) => member.isFounder);
}

/** Retrieve all founder team members. */
export function getFounders(): TeamMember[] {
  return teamMembers.filter((member) => member.isFounder);
}

/** Retrieve non-founder team members. */
export function getTeamMembers(): TeamMember[] {
  return teamMembers.filter((member) => !member.isFounder);
}
