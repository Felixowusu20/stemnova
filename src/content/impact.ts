import { images } from "@/content/images";
import type { ImpactData } from "@/types";

/**
 * Impact data — ALL values are illustrative placeholders, not verified facts.
 * Replace with audited figures before public reporting.
 */
export const impactData: ImpactData = {
  statistics: [
    {
      label: "Students Empowered",
      value: 12400,
      suffix: "+",
      note: "Illustrative cumulative reach across talent discovery, girls in STEM, and mentorship programmes",
      isIllustrative: true,
    },
    {
      label: "Schools Reached",
      value: 320,
      suffix: "",
      note: "Illustrative count of partner schools across 18 African countries",
      isIllustrative: true,
    },
    {
      label: "Researchers Supported",
      value: 890,
      suffix: "+",
      note: "Illustrative fellows and early-career researchers funded through fellowship programmes",
      isIllustrative: true,
    },
    {
      label: "Women in STEM",
      value: 4800,
      suffix: "+",
      note: "Illustrative girls and women participating in dedicated STEM pathways",
      isIllustrative: true,
    },
    {
      label: "STEM Teachers Trained",
      value: 1250,
      suffix: "",
      note: "Illustrative educators completing STEM Teachers Academy professional development",
      isIllustrative: true,
    },
    {
      label: "Innovation Projects Funded",
      value: 145,
      suffix: "",
      note: "Illustrative sustainable development and materials science innovation grants",
      isIllustrative: true,
    },
    {
      label: "Research Publications",
      value: 78,
      suffix: "",
      note: "Illustrative peer-reviewed publications co-authored by programme-supported researchers",
      isIllustrative: true,
    },
    {
      label: "Partner Institutions",
      value: 64,
      suffix: "",
      note: "Illustrative universities, research centres, and government agencies in the STEMNova network",
      isIllustrative: true,
    },
    {
      label: "Scholarships Awarded",
      value: 2100,
      suffix: "+",
      note: "Illustrative scholarships supporting transitions to advanced STEM education",
      isIllustrative: true,
    },
    {
      label: "African Countries Reached",
      value: 18,
      suffix: "",
      note: "Illustrative countries with active programme delivery or fellowship placements",
      isIllustrative: true,
    },
  ],

  programBreakdown: [
    {
      programSlug: "young-scholars-stem-discovery",
      programTitle: "Young Scholars STEM Discovery",
      percentage: 18,
      description:
        "Talent identification camps, research shadowing, and scholarship navigation for promising secondary and early university students.",
      isIllustrative: true,
    },
    {
      programSlug: "girls-discover-science",
      programTitle: "Girls Discover Science",
      percentage: 16,
      description:
        "Girls in STEM camps, women scientist role model networks, and targeted scholarship support.",
      isIllustrative: true,
    },
    {
      programSlug: "stem-teachers-academy",
      programTitle: "STEM Teachers Academy",
      percentage: 14,
      description:
        "Professional development institutes, classroom coaching, and teacher research circles.",
      isIllustrative: true,
    },
    {
      programSlug: "stemnova-mentorship-network",
      programTitle: "STEMNova Mentorship Network",
      percentage: 12,
      description:
        "Structured mentor-mentee matching, cohort workshops, and alumni mentorship pathways.",
      isIllustrative: true,
    },
    {
      programSlug: "young-african-researchers-fellowship",
      programTitle: "Young African Researchers Fellowship",
      percentage: 14,
      description:
        "Early-career research funding, publication support, and international collaboration access.",
      isIllustrative: true,
    },
    {
      programSlug: "african-stem-fellows",
      programTitle: "African STEM Fellows",
      percentage: 10,
      description:
        "Multi-year research leadership fellowships with laboratory placements and leadership intensives.",
      isIllustrative: true,
    },
    {
      programSlug: "innovation-sustainable-development",
      programTitle: "Innovation for Sustainable Development",
      percentage: 8,
      description:
        "Innovation challenge grants, social entrepreneurship bootcamps, and community co-design workshops.",
      isIllustrative: true,
    },
    {
      programSlug: "quantum-education-leaders",
      programTitle: "Quantum Education Leaders",
      percentage: 4,
      description:
        "Quantum science summer schools, curriculum development, and international lab partnerships.",
      isIllustrative: true,
    },
    {
      programSlug: "materials-science-solid-state",
      programTitle: "Materials Science & Solid-State Physics",
      percentage: 4,
      description:
        "Research grants, shared laboratory access, and industry-academia collaboration.",
      isIllustrative: true,
    },
  ],

  locations: [
    {
      name: "Accra & Greater Accra",
      region: "West Africa — Ghana",
      girlsReached: 1840,
      schoolsPartnered: 48,
      isIllustrative: true,
    },
    {
      name: "Lagos & Abuja",
      region: "West Africa — Nigeria",
      girlsReached: 1620,
      schoolsPartnered: 42,
      isIllustrative: true,
    },
    {
      name: "Nairobi & Central Kenya",
      region: "East Africa — Kenya",
      girlsReached: 980,
      schoolsPartnered: 28,
      isIllustrative: true,
    },
    {
      name: "Kigali & Kigali Province",
      region: "East Africa — Rwanda",
      girlsReached: 720,
      schoolsPartnered: 18,
      isIllustrative: true,
    },
    {
      name: "Cape Town & Western Cape",
      region: "Southern Africa — South Africa",
      girlsReached: 890,
      schoolsPartnered: 32,
      isIllustrative: true,
    },
    {
      name: "Dakar & Thiès",
      region: "West Africa — Senegal",
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
        "A Young Scholars alumna from a rural Ghanaian school progressed through mentorship and fellowship support to a quantum science research placement—an illustrative example of how structured pathways transform isolated talent into connected careers.",
      programSlug: "young-scholars-stem-discovery",
      imageUrl: images.programmes.quantum,
      isIllustrative: true,
    },
    {
      id: "ss-2",
      title: "First Woman Faculty in Department History",
      summary:
        "A Girls Discover Science participant became the first woman appointed to a faculty position in her university's physics department—illustrating how early intervention and sustained mentorship reshape institutional representation.",
      programSlug: "girls-discover-science",
      imageUrl: images.programmes.girlsScience,
      isIllustrative: true,
    },
    {
      id: "ss-3",
      title: "Teacher-Led Curriculum Innovation",
      summary:
        "A STEM Teachers Academy graduate designed an inquiry-based physics module adopted across 12 partner schools—demonstrating how educator investment multiplies impact beyond individual classrooms.",
      programSlug: "stem-teachers-academy",
      imageUrl: images.programmes.teachers,
      isIllustrative: true,
    },
    {
      id: "ss-4",
      title: "Solar Innovation Reaching 2,000 Households",
      summary:
        "An Innovation for Sustainable Development grantee translated materials science research into affordable solar panels now deployed in underserved communities—an illustrative model of STEM-driven development impact.",
      programSlug: "innovation-sustainable-development",
      imageUrl: images.programmes.innovation,
      isIllustrative: true,
    },
    {
      id: "ss-5",
      title: "Publication in Nature Partner Journal",
      summary:
        "A Young African Researchers Fellowship alumna published groundbreaking work on malaria diagnostics—illustrating the programme's capacity to catalyse world-class research from African laboratories.",
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
        "An illustrative 58% of surveyed secondary students in partner schools could not name a STEM career pathway available to them before programme enrollment.",
      after:
        "After 12 months in Young Scholars and mentorship programmes, an illustrative 84% had identified specific STEM careers and set concrete education goals.",
      programSlug: "young-scholars-stem-discovery",
      isIllustrative: true,
    },
    {
      id: "ba-2",
      title: "Girls' STEM Course Enrollment",
      before:
        "An illustrative 34% of girls in partner schools enrolled in advanced STEM courses at secondary level before Girls Discover Science intervention.",
      after:
        "After programme participation, an illustrative 72% of alumnae enrolled in or completed advanced STEM courses—more than doubling baseline persistence.",
      programSlug: "girls-discover-science",
      isIllustrative: true,
    },
    {
      id: "ba-3",
      title: "Researcher Retention",
      before:
        "An illustrative 45% of early-career African researchers surveyed reported considering leaving research due to isolation and funding gaps.",
      after:
        "Among fellowship recipients, an illustrative 91% remained in research careers five years post-fellowship—with expanded publication records and international collaborations.",
      programSlug: "young-african-researchers-fellowship",
      isIllustrative: true,
    },
    {
      id: "ba-4",
      title: "Classroom STEM Engagement",
      before:
        "An illustrative baseline student engagement score of 52% in STEM classrooms at partner schools before teacher training.",
      after:
        "After STEM Teachers Academy completion, an illustrative engagement score of 80%—a 28-percentage-point gain sustained over two academic terms.",
      programSlug: "stem-teachers-academy",
      isIllustrative: true,
    },
  ],

  annualReports: [
    {
      year: 2025,
      title: "2025 Annual Impact Report",
      summary:
        "Illustrative summary covering fellowship programme launches, continental expansion to 18 countries, and first independently reviewed impact metrics.",
      downloadUrl: "#",
      isIllustrative: true,
    },
    {
      year: 2024,
      title: "2024 Founding Impact Report",
      summary:
        "Illustrative document outlining STEMNova's establishment, pilot programme outcomes, and inaugural partnership network growth.",
      downloadUrl: "#",
      isIllustrative: true,
    },
  ],

  donationUsage: [
    {
      category: "Programme Delivery",
      percentage: 52,
      description:
        "Direct costs for fellowships, scholarships, teacher training, talent discovery camps, and field programme staff.",
      isIllustrative: true,
    },
    {
      category: "Research & Innovation",
      percentage: 18,
      description:
        "Research grants, laboratory access, innovation challenge funding, and publication support for fellows and researchers.",
      isIllustrative: true,
    },
    {
      category: "Partnership & Network Development",
      percentage: 12,
      description:
        "University partnerships, international collaboration platforms, and mentorship network infrastructure.",
      isIllustrative: true,
    },
    {
      category: "Operations & Administration",
      percentage: 10,
      description:
        "Essential administrative support, communications, and multi-country programme coordination.",
      isIllustrative: true,
    },
    {
      category: "Monitoring & Evaluation",
      percentage: 5,
      description:
        "Impact measurement, longitudinal tracking, and independent evaluation of programme outcomes.",
      isIllustrative: true,
    },
    {
      category: "Fundraising & Growth",
      percentage: 3,
      description:
        "Donor stewardship and capacity building for sustainable institutional growth.",
      isIllustrative: true,
    },
  ],
};

/** Disclaimer text for impact statistics display. */
export const IMPACT_DATA_DISCLAIMER =
  "All impact figures on this page are illustrative placeholders for website development. Verified statistics will be published following independent audit.";
