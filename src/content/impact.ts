import { images } from "@/content/images";
import type { ImpactData } from "@/types";

/**
 * Impact data. All values are 0 until programmes launch and verified
 * figures are entered in the admin panel.
 */
export const impactData: ImpactData = {
  statistics: [
    {
      label: "Students Empowered",
      value: 0,
      suffix: "",
      note: "Across talent discovery, girls in STEM, and mentorship programmes",
      isIllustrative: true,
    },
    {
      label: "Schools Reached",
      value: 0,
      suffix: "",
      note: "Partner schools across African countries",
      isIllustrative: true,
    },
    {
      label: "Researchers Supported",
      value: 0,
      suffix: "",
      note: "Fellows and early career researchers",
      isIllustrative: true,
    },
    {
      label: "Women in STEM",
      value: 0,
      suffix: "",
      note: "Girls and women in dedicated STEM pathways",
      isIllustrative: true,
    },
    {
      label: "STEM Teachers Trained",
      value: 0,
      suffix: "",
      note: "Educators from STEM Teachers Academy",
      isIllustrative: true,
    },
    {
      label: "Innovation Projects Funded",
      value: 0,
      suffix: "",
      note: "Sustainable development and materials science grants",
      isIllustrative: true,
    },
    {
      label: "Research Publications",
      value: 0,
      suffix: "",
      note: "Publications by programme supported researchers",
      isIllustrative: true,
    },
    {
      label: "Partner Institutions",
      value: 0,
      suffix: "",
      note: "Universities, research centres, and agencies",
      isIllustrative: true,
    },
    {
      label: "Scholarships Awarded",
      value: 0,
      suffix: "",
      note: "Support for advanced STEM education",
      isIllustrative: true,
    },
    {
      label: "African Countries Reached",
      value: 0,
      suffix: "",
      note: "Countries with active programmes or fellowships",
      isIllustrative: true,
    },
  ],

  programBreakdown: [
    {
      programSlug: "young-scholars-stem-discovery",
      programTitle: "Young Scholars STEM Discovery",
      percentage: 0,
      description: "Talent camps, research shadowing, and scholarship support.",
      isIllustrative: true,
    },
    {
      programSlug: "girls-discover-science",
      programTitle: "Girls Discover Science",
      percentage: 0,
      description: "Girls in STEM camps, role models, and scholarships.",
      isIllustrative: true,
    },
    {
      programSlug: "stem-teachers-academy",
      programTitle: "STEM Teachers Academy",
      percentage: 0,
      description: "Teacher training, coaching, and classroom practice.",
      isIllustrative: true,
    },
    {
      programSlug: "stemnova-mentorship-network",
      programTitle: "STEMNova Mentorship Network",
      percentage: 0,
      description: "Mentor matching, workshops, and alumni pathways.",
      isIllustrative: true,
    },
    {
      programSlug: "young-african-researchers-fellowship",
      programTitle: "Young African Researchers Fellowship",
      percentage: 0,
      description: "Research funding, publication support, and collaboration.",
      isIllustrative: true,
    },
    {
      programSlug: "african-stem-fellows",
      programTitle: "African STEM Fellows",
      percentage: 0,
      description: "Research leadership fellowships and lab placements.",
      isIllustrative: true,
    },
    {
      programSlug: "innovation-sustainable-development",
      programTitle: "Innovation for Sustainable Development",
      percentage: 0,
      description: "Innovation grants and community focused projects.",
      isIllustrative: true,
    },
    {
      programSlug: "quantum-education-leaders",
      programTitle: "Quantum Education Leaders",
      percentage: 0,
      description: "Quantum schools, curriculum, and lab partnerships.",
      isIllustrative: true,
    },
    {
      programSlug: "materials-science-solid-state",
      programTitle: "Materials Science and Solid State Physics",
      percentage: 0,
      description: "Research grants and shared laboratory access.",
      isIllustrative: true,
    },
  ],

  locations: [
    {
      name: "Accra and Greater Accra",
      region: "West Africa, Ghana",
      girlsReached: 0,
      schoolsPartnered: 0,
      isIllustrative: true,
    },
    {
      name: "Lagos and Abuja",
      region: "West Africa, Nigeria",
      girlsReached: 0,
      schoolsPartnered: 0,
      isIllustrative: true,
    },
    {
      name: "Nairobi and Central Kenya",
      region: "East Africa, Kenya",
      girlsReached: 0,
      schoolsPartnered: 0,
      isIllustrative: true,
    },
    {
      name: "Kigali and Kigali Province",
      region: "East Africa, Rwanda",
      girlsReached: 0,
      schoolsPartnered: 0,
      isIllustrative: true,
    },
    {
      name: "Cape Town and Western Cape",
      region: "Southern Africa, South Africa",
      girlsReached: 0,
      schoolsPartnered: 0,
      isIllustrative: true,
    },
    {
      name: "Dakar and Thiès",
      region: "West Africa, Senegal",
      girlsReached: 0,
      schoolsPartnered: 0,
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
      before: "No baseline data yet — programmes have not launched.",
      after: "Outcomes will be published after verified programme results.",
      programSlug: "young-scholars-stem-discovery",
      isIllustrative: true,
    },
    {
      id: "ba-2",
      title: "Girls STEM Course Enrollment",
      before: "No baseline data yet — programmes have not launched.",
      after: "Outcomes will be published after verified programme results.",
      programSlug: "girls-discover-science",
      isIllustrative: true,
    },
    {
      id: "ba-3",
      title: "Researcher Retention",
      before: "No baseline data yet — programmes have not launched.",
      after: "Outcomes will be published after verified programme results.",
      programSlug: "young-african-researchers-fellowship",
      isIllustrative: true,
    },
    {
      id: "ba-4",
      title: "Classroom STEM Engagement",
      before: "No baseline data yet — programmes have not launched.",
      after: "Outcomes will be published after verified programme results.",
      programSlug: "stem-teachers-academy",
      isIllustrative: true,
    },
  ],

  annualReports: [
    {
      year: 2025,
      title: "2025 Annual Impact Report",
      summary:
        "Report will be published once programmes launch and verified metrics are available.",
      downloadUrl: "#",
      isIllustrative: true,
    },
    {
      year: 2024,
      title: "2024 Founding Impact Report",
      summary:
        "Report will be published once programmes launch and verified metrics are available.",
      downloadUrl: "#",
      isIllustrative: true,
    },
  ],

  donationUsage: [
    {
      category: "Programme Delivery",
      percentage: 0,
      description:
        "Fellowships, scholarships, teacher training, talent camps, and field staff.",
      isIllustrative: true,
    },
    {
      category: "Research and Innovation",
      percentage: 0,
      description:
        "Research grants, lab access, innovation funding, and publication support.",
      isIllustrative: true,
    },
    {
      category: "Partnerships and Networks",
      percentage: 0,
      description:
        "University partnerships, collaboration platforms, and mentorship systems.",
      isIllustrative: true,
    },
    {
      category: "Operations",
      percentage: 0,
      description:
        "Administration, communications, and multi country programme coordination.",
      isIllustrative: true,
    },
    {
      category: "Monitoring and Evaluation",
      percentage: 0,
      description:
        "Impact tracking and independent review of programme outcomes.",
      isIllustrative: true,
    },
    {
      category: "Fundraising and Growth",
      percentage: 0,
      description:
        "Donor stewardship and capacity for sustainable institutional growth.",
      isIllustrative: true,
    },
  ],
};

export const IMPACT_DATA_DISCLAIMER =
  "Programmes have not launched yet. All impact figures are currently 0 and will be updated with verified results.";
