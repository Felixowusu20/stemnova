import { images } from "@/content/images";
import type {
  Challenge,
  GetInvolvedOption,
  ResearchArea,
  RoadmapPhase,
  StrategicPillar,
} from "@/types";

export const challenges: Challenge[] = [
  {
    id: "undiscovered-talent",
    title: "Undiscovered Talent",
    description: "Promising STEM minds go unnoticed without clear pathways.",
    icon: "search",
  },
  {
    id: "women-underrepresentation",
    title: "Girls Left Behind",
    description: "Girls remain underrepresented in STEM careers across Africa.",
    icon: "venus",
  },
  {
    id: "teacher-skills",
    title: "Teacher Gaps",
    description: "Educators need modern methods and digital classroom skills.",
    icon: "book",
  },
  {
    id: "quantum-pathways",
    title: "Missing Pathways",
    description: "Frontier fields like quantum lack structured learning routes.",
    icon: "atom",
  },
  {
    id: "research-isolation",
    title: "Isolated Researchers",
    description: "Young researchers lack mentorship, funding, and collaboration.",
    icon: "network",
  },
];

export const strategicPillars: StrategicPillar[] = [
  {
    id: "discovering-talent",
    title: "Discovering STEM Talent",
    description: "Find exceptional scientific potential in schools and universities.",
    icon: "sparkles",
    imageUrl: images.programmes.youngScholars,
  },
  {
    id: "scientific-leadership",
    title: "Building Scientific Leadership",
    description: "Grow talent into research leaders through fellowships and mentorship.",
    icon: "award",
    imageUrl: images.programmes.fellows,
  },
  {
    id: "world-class-researchers",
    title: "Producing World-Class Researchers",
    description: "Equip scholars with skills, networks, and resources for global science.",
    icon: "microscope",
    imageUrl: images.programmes.researchers,
  },
  {
    id: "women-in-stem",
    title: "Increasing Women in STEM",
    description: "Expand opportunities for girls and women across STEM pathways.",
    icon: "venus",
    imageUrl: images.programmes.girlsScience,
  },
  {
    id: "quantum-education",
    title: "Advancing Quantum Education",
    description: "Build clear pathways into quantum science education and research.",
    icon: "atom",
    imageUrl: images.programmes.quantum,
  },
  {
    id: "stem-policy",
    title: "Influencing STEM Policy",
    description: "Shape STEM education policy through evidence and partnerships.",
    icon: "policy",
    imageUrl: images.partners.categories.government,
  },
  {
    id: "global-networks",
    title: "Connecting Researchers Globally",
    description: "Link African researchers to international labs and collaborators.",
    icon: "globe",
    imageUrl: images.partners.network,
  },
];

export const researchAreas: ResearchArea[] = [
  {
    id: "quantum",
    title: "Quantum Science",
    description:
      "Build research capacity in quantum computing, sensing, and materials.",
    icon: "atom",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description:
      "Advance responsible AI research shaped by African contexts and needs.",
    icon: "brain",
  },
  {
    id: "computational",
    title: "Computational Science",
    description:
      "Strengthen modelling, simulation, and data science for frontier research.",
    icon: "cpu",
  },
  {
    id: "materials",
    title: "Materials Science",
    description:
      "Support solid state physics, advanced materials, and sustainable innovation.",
    icon: "flask",
  },
  {
    id: "robotics",
    title: "Robotics",
    description:
      "Grow robotics education and applied research for industry and health.",
    icon: "bot",
  },
  {
    id: "sustainable",
    title: "Sustainable Development",
    description:
      "Connect STEM talent to climate, energy, agriculture, and health priorities.",
    icon: "leaf",
  },
  {
    id: "publications",
    title: "Scientific Publications",
    description:
      "Support strong research output and African authorship in global journals.",
    icon: "file",
  },
  {
    id: "networks",
    title: "Collaborative Research Networks",
    description:
      "Build lasting partnerships between African and global research centres.",
    icon: "network",
  },
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "phase-1",
    phase: 1,
    title: "Foundation",
    timeframe: "Years 1–2",
    description:
      "Build the organisation, pilot first programmes, and form early partnerships.",
    milestones: [
      "Launch first talent and girls-in-STEM pilots",
      "Recruit founding mentors and advisors",
      "Secure university partnerships",
    ],
  },
  {
    id: "phase-2",
    phase: 2,
    title: "Expansion",
    timeframe: "Years 3–4",
    description:
      "Grow proven programmes and deepen fellowships and mentorship networks.",
    milestones: [
      "Scale teacher development programmes",
      "Launch fellowship cohorts",
      "Open quantum education pathways",
    ],
  },
  {
    id: "phase-3",
    phase: 3,
    title: "Regional Growth",
    timeframe: "Years 5–7",
    description:
      "Extend programmes across more African regions and strengthen policy engagement.",
    milestones: [
      "Reach more African countries",
      "Build regional partnership hubs",
      "Support STEM education frameworks",
    ],
  },
  {
    id: "phase-4",
    phase: 4,
    title: "Institutional Strength",
    timeframe: "Years 8–10+",
    description:
      "Establish STEMNova as a lasting African institution for STEM talent development.",
    milestones: [
      "Sustain long-term fellowship support",
      "Grow a strong alumni network",
      "Set clear standards for STEM excellence",
    ],
  },
];

export const getInvolvedOptions: GetInvolvedOption[] = [
  {
    id: "mentor",
    title: "Become a Mentor",
    description:
      "Guide emerging African STEM talent through structured mentorship across research, academia, and industry.",
    href: "/mentor",
    icon: "mentor",
    cta: "Join the Network",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description:
      "Contribute your skills to STEM camps, workshops, outreach events, and programme delivery across Africa.",
    href: "/volunteer",
    icon: "volunteer",
    cta: "Volunteer With Us",
  },
  {
    id: "partner",
    title: "Partner with STEMNova",
    description:
      "Universities, governments, and organisations can create programmes together that advance Africa's scientific future.",
    href: "/partner",
    icon: "partner",
    cta: "Explore Partnerships",
  },
  {
    id: "sponsor",
    title: "Sponsor a Programme",
    description:
      "Fund a flagship initiative from girls in science to quantum education and multiply your institutional impact.",
    href: "/sponsor",
    icon: "sponsor",
    cta: "Sponsor Now",
  },
  {
    id: "donate",
    title: "Donate",
    description:
      "Your gift fuels scholarships, research fellowships, teacher training, and talent discovery across the continent.",
    href: "/donate",
    icon: "donate",
    cta: "Support STEMNova",
  },
  {
    id: "fellowship",
    title: "Apply for Fellowships",
    description:
      "Join African STEM Fellows or Young African Researchers Fellowship and accelerate your research career.",
    href: "/fellowships",
    icon: "fellowship",
    cta: "View Fellowships",
  },
];
