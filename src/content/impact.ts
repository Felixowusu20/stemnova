import { images } from "@/content/images";
import type { ImpactData } from "@/types";

/**
 * Impact data. All values are illustrative placeholders for now.
 * Ready to be replaced by admin managed figures later.
 */
export const impactData: ImpactData = {
  statistics: [
    {
      label: "Students Empowered",
      value: 12400,
      suffix: "+",
      note: "Across talent discovery, girls in STEM, and mentorship programmes",
      isIllustrative: true,
    },
    {
      label: "Schools Reached",
      value: 320,
      suffix: "",
      note: "Partner schools across African countries",
      isIllustrative: true,
    },
    {
      label: "Researchers Supported",
      value: 890,
      suffix: "+",
      note: "Fellows and early career researchers",
      isIllustrative: true,
    },
    {
      label: "Women in STEM",
      value: 4800,
      suffix: "+",
      note: "Girls and women in dedicated STEM pathways",
      isIllustrative: true,
    },
    {
      label: "STEM Teachers Trained",
      value: 1250,
      suffix: "",
      note: "Educators from STEM Teachers Academy",
      isIllustrative: true,
    },
    {
      label: "Innovation Projects Funded",
      value: 145,
      suffix: "",
      note: "Sustainable development and materials science grants",
      isIllustrative: true,
    },
    {
      label: "Research Publications",
      value: 78,
      suffix: "",
      note: "Publications by programme supported researchers",
      isIllustrative: true,
    },
    {
      label: "Partner Institutions",
      value: 64,
      suffix: "",
      note: "Universities, research centres, and agencies",
      isIllustrative: true,
    },
    {
      label: "Scholarships Awarded",
      value: 2100,
      suffix: "+",
      note: "Support for advanced STEM education",
      isIllustrative: true,
    },
    {
      label: "African Countries Reached",
      value: 18,
      suffix: "",
      note: "Countries with active programmes or fellowships",
      isIllustrative: true,
    },
  ],

  programBreakdown: [
    {
      programSlug: "young-scholars-stem-discovery",
      programTitle: "Young Scholars STEM Discovery",
      percentage: 18,
      description: "Talent camps, research shadowing, and scholarship support.",
      isIllustrative: true,
    },
    {
      programSlug: "girls-discover-science",
      programTitle: "Girls Discover Science",
      percentage: 16,
      description: "Girls in STEM camps, role models, and scholarships.",
      isIllustrative: true,
    },
    {
      programSlug: "stem-teachers-academy",
      programTitle: "STEM Teachers Academy",
      percentage: 14,
      description: "Teacher training, coaching, and classroom practice.",
      isIllustrative: true,
    },
    {
      programSlug: "stemnova-mentorship-network",
      programTitle: "STEMNova Mentorship Network",
      percentage: 12,
      description: "Mentor matching, workshops, and alumni pathways.",
      isIllustrative: true,
    },
    {
      programSlug: "young-african-researchers-fellowship",
      programTitle: "Young African Researchers Fellowship",
      percentage: 14,
      description: "Research funding, publication support, and collaboration.",
      isIllustrative: true,
    },
    {
      programSlug: "african-stem-fellows",
      programTitle: "African STEM Fellows",
      percentage: 10,
      description: "Research leadership fellowships and lab placements.",
      isIllustrative: true,
    },
    {
      programSlug: "innovation-sustainable-development",
      programTitle: "Innovation for Sustainable Development",
      percentage: 8,
      description: "Innovation grants and community focused projects.",
      isIllustrative: true,
    },
    {
      programSlug: "quantum-education-leaders",
      programTitle: "Quantum Education Leaders",
      percentage: 4,
      description: "Quantum schools, curriculum, and lab partnerships.",
      isIllustrative: true,
    },
    {
      programSlug: "materials-science-solid-state",
      programTitle: "Materials Science and Solid State Physics",
      percentage: 4,
      description: "Research grants and shared laboratory access.",
      isIllustrative: true,
    },
  ],

  locations: [
    {
      name: "Accra and Greater Accra",
      region: "West Africa, Ghana",
      girlsReached: 1840,
      schoolsPartnered: 48,
      isIllustrative: true,
    },
    {
      name: "Lagos and Abuja",
      region: "West Africa, Nigeria",
      girlsReached: 1620,
      schoolsPartnered: 42,
      isIllustrative: true,
    },
    {
      name: "Nairobi and Central Kenya",
      region: "East Africa, Kenya",
      girlsReached: 980,
      schoolsPartnered: 28,
      isIllustrative: true,
    },
    {
      name: "Kigali and Kigali Province",
      region: "East Africa, Rwanda",
      girlsReached: 720,
      schoolsPartnered: 18,
      isIllustrative: true,
    },
    {
      name: "Cape Town and Western Cape",
      region: "Southern Africa, South Africa",
      girlsReached: 890,
      schoolsPartnered: 32,
      isIllustrative: true,
    },
    {
      name: "Dakar and Thiès",
      region: "West Africa, Senegal",
      girlsReached: 540,
      schoolsPartnered: 16,
      isIllustrative: true,
    },
  ],

  successStories: [
    {
      id: "ss-1",
      title: "From Rural School to Quantum Research Lab",
      summary:
        "A Young Scholars graduate from a rural Ghanaian school moved through mentorship into a quantum science research placement.",
      programSlug: "young-scholars-stem-discovery",
      imageUrl: images.programmes.quantum,
      isIllustrative: true,
    },
    {
      id: "ss-2",
      title: "First Woman Faculty in Department History",
      summary:
        "A Girls Discover Science participant became the first woman appointed to a faculty role in her university physics department.",
      programSlug: "girls-discover-science",
      imageUrl: images.programmes.girlsScience,
      isIllustrative: true,
    },
    {
      id: "ss-3",
      title: "Teacher Led Curriculum Innovation",
      summary:
        "A STEM Teachers Academy graduate designed a physics module now used across twelve partner schools.",
      programSlug: "stem-teachers-academy",
      imageUrl: images.programmes.teachers,
      isIllustrative: true,
    },
    {
      id: "ss-4",
      title: "Solar Innovation Reaching 2000 Households",
      summary:
        "An Innovation for Sustainable Development grantee turned materials research into affordable solar panels for underserved communities.",
      programSlug: "innovation-sustainable-development",
      imageUrl: images.programmes.innovation,
      isIllustrative: true,
    },
    {
      id: "ss-5",
      title: "Publication in a Leading Science Journal",
      summary:
        "A Young African Researchers Fellowship graduate published major work on malaria diagnostics from an African laboratory.",
      programSlug: "young-african-researchers-fellowship",
      imageUrl: images.programmes.researchers,
      isIllustrative: true,
    },
  ],

  beforeAfterStories: [
    {
      id: "ba-1",
      title: "STEM Career Aspiration",
      before:
        "About 58% of surveyed students could not name a STEM career path before joining.",
      after:
        "After one year, about 84% had clear STEM career goals and education plans.",
      programSlug: "young-scholars-stem-discovery",
      isIllustrative: true,
    },
    {
      id: "ba-2",
      title: "Girls STEM Course Enrollment",
      before:
        "About 34% of girls in partner schools took advanced STEM courses before the programme.",
      after:
        "After joining, about 72% of alumnae enrolled in or completed advanced STEM courses.",
      programSlug: "girls-discover-science",
      isIllustrative: true,
    },
    {
      id: "ba-3",
      title: "Researcher Retention",
      before:
        "About 45% of early career researchers considered leaving research due to limited support.",
      after:
        "About 91% of fellowship recipients stayed in research careers five years later.",
      programSlug: "young-african-researchers-fellowship",
      isIllustrative: true,
    },
    {
      id: "ba-4",
      title: "Classroom STEM Engagement",
      before:
        "Average student engagement in STEM classes was about 52% before teacher training.",
      after:
        "After training, engagement rose to about 80% and held across two school terms.",
      programSlug: "stem-teachers-academy",
      isIllustrative: true,
    },
  ],

  annualReports: [
    {
      year: 2025,
      title: "2025 Annual Impact Report",
      summary:
        "Fellowship launches, wider reach across Africa, and first reviewed impact metrics.",
      downloadUrl: "#",
      isIllustrative: true,
    },
    {
      year: 2024,
      title: "2024 Founding Impact Report",
      summary:
        "STEMNova establishment, pilot programme outcomes, and early partnership growth.",
      downloadUrl: "#",
      isIllustrative: true,
    },
  ],

  donationUsage: [
    {
      category: "Programme Delivery",
      percentage: 52,
      description:
        "Fellowships, scholarships, teacher training, talent camps, and field staff.",
      isIllustrative: true,
    },
    {
      category: "Research and Innovation",
      percentage: 18,
      description:
        "Research grants, lab access, innovation funding, and publication support.",
      isIllustrative: true,
    },
    {
      category: "Partnerships and Networks",
      percentage: 12,
      description:
        "University partnerships, collaboration platforms, and mentorship systems.",
      isIllustrative: true,
    },
    {
      category: "Operations",
      percentage: 10,
      description:
        "Administration, communications, and multi country programme coordination.",
      isIllustrative: true,
    },
    {
      category: "Monitoring and Evaluation",
      percentage: 5,
      description:
        "Impact tracking and independent review of programme outcomes.",
      isIllustrative: true,
    },
    {
      category: "Fundraising and Growth",
      percentage: 3,
      description:
        "Donor stewardship and capacity for sustainable institutional growth.",
      isIllustrative: true,
    },
  ],
};

export const IMPACT_DATA_DISCLAIMER =
  "Figures on this page are illustrative for now. Verified statistics will be published after independent review.";
