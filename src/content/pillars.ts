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
    title: "Undiscovered STEM Talent",
    description:
      "Promising scientific minds across African schools and universities often go unnoticed—without pathways to identification, mentorship, or advanced opportunity.",
    icon: "search",
  },
  {
    id: "women-underrepresentation",
    title: "Girls Underrepresented in STEM",
    description:
      "Women and girls remain significantly underrepresented in STEM careers across Africa, limiting the diversity of scientific leadership and innovation.",
    icon: "venus",
  },
  {
    id: "teacher-skills",
    title: "Teachers Need Modern Skills",
    description:
      "Educators need contemporary pedagogical methods and digital competencies to prepare students for frontier science and a rapidly evolving STEM landscape.",
    icon: "book",
  },
  {
    id: "quantum-pathways",
    title: "Missing Quantum Pathways",
    description:
      "Emerging disciplines such as Quantum Science lack structured educational pathways, curricula, and leadership pipelines across the continent.",
    icon: "atom",
  },
  {
    id: "research-isolation",
    title: "Limited Research Support",
    description:
      "Many young African researchers lack mentorship, funding, and international collaboration opportunities essential for world-class scientific careers.",
    icon: "network",
  },
];

export const strategicPillars: StrategicPillar[] = [
  {
    id: "discovering-talent",
    title: "Discovering STEM Talent",
    description:
      "Identifying exceptional scientific potential in schools and universities through rigorous, equitable discovery programmes.",
    icon: "sparkles",
  },
  {
    id: "scientific-leadership",
    title: "Building Scientific Leadership",
    description:
      "Developing structured pathways from early talent to research leadership through fellowships, mentorship, and training.",
    icon: "award",
  },
  {
    id: "world-class-researchers",
    title: "Producing World-Class Researchers",
    description:
      "Equipping African scholars with the skills, networks, and resources to contribute at the highest levels of global science.",
    icon: "microscope",
  },
  {
    id: "women-in-stem",
    title: "Increasing Women in STEM",
    description:
      "Expanding opportunities for girls and women through dedicated initiatives, role models, and inclusive programme design.",
    icon: "venus",
  },
  {
    id: "quantum-education",
    title: "Advancing Quantum Education",
    description:
      "Building Africa's first structured pathways into quantum science education, research, and leadership.",
    icon: "atom",
  },
  {
    id: "stem-policy",
    title: "Influencing STEM Education Policy",
    description:
      "Shaping national and regional STEM education policy through evidence-based innovation and institutional partnerships.",
    icon: "policy",
  },
  {
    id: "global-networks",
    title: "Connecting Researchers Globally",
    description:
      "Linking African researchers to international collaborators, labs, publications, and frontier research communities.",
    icon: "globe",
  },
];

export const researchAreas: ResearchArea[] = [
  {
    id: "quantum",
    title: "Quantum Science",
    description:
      "Building foundational literacy and research capacity in quantum computing, quantum sensing, and quantum materials.",
    icon: "atom",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description:
      "Advancing responsible AI research with African contexts—from machine learning applications to ethical frameworks.",
    icon: "brain",
  },
  {
    id: "computational",
    title: "Computational Science",
    description:
      "Strengthening computational modelling, simulation, and data science skills for frontier research challenges.",
    icon: "cpu",
  },
  {
    id: "materials",
    title: "Materials Science",
    description:
      "Supporting research in solid-state physics, advanced materials, and sustainable materials innovation.",
    icon: "flask",
  },
  {
    id: "robotics",
    title: "Robotics",
    description:
      "Fostering robotics education and applied research for industry, healthcare, and sustainable development.",
    icon: "bot",
  },
  {
    id: "sustainable",
    title: "Sustainable Development",
    description:
      "Connecting STEM talent to climate, energy, agriculture, and health challenges facing African communities.",
    icon: "leaf",
  },
  {
    id: "publications",
    title: "Scientific Publications",
    description:
      "Supporting high-quality research output, open science practices, and African authorship in global journals.",
    icon: "file",
  },
  {
    id: "networks",
    title: "Collaborative Research Networks",
    description:
      "Building lasting partnerships between African institutions and leading global research centres.",
    icon: "network",
  },
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "phase-1",
    phase: 1,
    title: "Foundation & Proof of Concept",
    timeframe: "Years 1–2",
    description:
      "Establish institutional foundations, pilot flagship programmes, and demonstrate measurable impact in priority regions.",
    milestones: [
      "Launch Young Scholars and Girls Discover Science pilots",
      "Recruit founding mentors and advisory committees",
      "Secure seed partnerships with universities",
      "Publish first impact baseline report",
    ],
  },
  {
    id: "phase-2",
    phase: 2,
    title: "Consolidation & Expansion",
    timeframe: "Years 3–4",
    description:
      "Scale proven programmes nationally, deepen research fellowships, and expand teacher and mentorship networks.",
    milestones: [
      "Scale STEM Teachers Academy nationally",
      "Launch African STEM Fellows cohort model",
      "Introduce Quantum Education pathways",
      "Grow partner institution network to 25+",
    ],
  },
  {
    id: "phase-3",
    phase: 3,
    title: "National & Regional Growth",
    timeframe: "Years 5–7",
    description:
      "Extend programmes across West, East, and Southern Africa while influencing STEM education policy.",
    milestones: [
      "Operate programmes in 15+ African countries",
      "Establish regional innovation hubs",
      "Influence national STEM curriculum frameworks",
      "Launch multi-country research collaborations",
    ],
  },
  {
    id: "phase-4",
    phase: 4,
    title: "Institutional Maturity",
    timeframe: "Years 8–10+",
    description:
      "Cement STEMNova as Africa's premier institution for scientific talent discovery and research leadership.",
    milestones: [
      "Achieve continental recognition as STEM talent institution",
      "Sustain endowment for fellowships and research",
      "Produce globally competitive research leaders",
      "Shape pan-African STEM excellence standards",
    ],
  },
];

export const getInvolvedOptions: GetInvolvedOption[] = [
  {
    id: "mentor",
    title: "Become a Mentor",
    description:
      "Guide emerging African STEM talent through structured mentorship across research, academia, and industry.",
    href: "/get-involved#mentor",
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
      "Universities, governments, and organisations can co-create programmes that advance Africa's scientific future.",
    href: "/partner",
    icon: "partner",
    cta: "Explore Partnerships",
  },
  {
    id: "sponsor",
    title: "Sponsor a Programme",
    description:
      "Fund a flagship initiative—from girls in science to quantum education—and multiply your institutional impact.",
    href: "/partner",
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
    href: "/programs",
    icon: "fellowship",
    cta: "View Fellowships",
  },
  {
    id: "research",
    title: "Join Research Projects",
    description:
      "Collaborate on frontier research in quantum science, AI, materials, robotics, and sustainable development.",
    href: "/research",
    icon: "research",
    cta: "Explore Research",
  },
];
