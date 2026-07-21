import { images } from "@/content/images";
import type { ImpactData } from "@/types";

/**
 * Impact data — ALL values are illustrative placeholders, not verified facts.
 * Replace with audited figures before public reporting.
 */
export const impactData: ImpactData = {
  statistics: [
    {
      label: "Girls reached since founding",
      value: 4200,
      suffix: "+",
      note: "Illustrative cumulative reach across all programs",
      isIllustrative: true,
    },
    {
      label: "Partner schools",
      value: 32,
      suffix: "",
      note: "Illustrative count of active and past school partnerships",
      isIllustrative: true,
    },
    {
      label: "Dignity kits distributed",
      value: 6800,
      suffix: "+",
      note: "Illustrative total kits including pads, soap, and educational materials",
      isIllustrative: true,
    },
    {
      label: "Volunteer hours contributed",
      value: 12400,
      suffix: "+",
      note: "Illustrative volunteer time logged through 2025",
      isIllustrative: true,
    },
    {
      label: "Mentorship pairs formed",
      value: 210,
      suffix: "+",
      note: "Illustrative active and graduated mentor-mentee matches",
      isIllustrative: true,
    },
    {
      label: "Communities served",
      value: 18,
      suffix: "",
      note: "Illustrative communities across Greater Accra and Eastern Region",
      isIllustrative: true,
    },
  ],

  programBreakdown: [
    {
      programSlug: "menstrual-health",
      programTitle: "Menstrual Health & Dignity",
      percentage: 40,
      description:
        "Dignity kits, school workshops, washroom advocacy, and community stigma-reduction dialogues.",
      isIllustrative: true,
    },
    {
      programSlug: "mental-health",
      programTitle: "Mental Health & Wellness",
      percentage: 25,
      description:
        "Wellness circles, counseling referrals, stress management workshops, and educator training.",
      isIllustrative: true,
    },
    {
      programSlug: "career-development",
      programTitle: "Career Development & Leadership",
      percentage: 35,
      description:
        "Mentorship matching, skills workshops, STEM exposure, and scholarship support.",
      isIllustrative: true,
    },
  ],

  locations: [
    {
      name: "East Legon & Adenta",
      region: "Greater Accra",
      girlsReached: 980,
      schoolsPartnered: 8,
      isIllustrative: true,
    },
    {
      name: "Tema & Ashaiman",
      region: "Greater Accra",
      girlsReached: 720,
      schoolsPartnered: 6,
      isIllustrative: true,
    },
    {
      name: "Koforidua & Nsawam",
      region: "Eastern Region",
      girlsReached: 640,
      schoolsPartnered: 5,
      isIllustrative: true,
    },
    {
      name: "Rural Eastern Communities",
      region: "Eastern Region",
      girlsReached: 520,
      schoolsPartnered: 10,
      isIllustrative: true,
    },
    {
      name: "Madina & Legon",
      region: "Greater Accra",
      girlsReached: 450,
      schoolsPartnered: 3,
      isIllustrative: true,
    },
  ],

  successStories: [
    {
      id: "ss-1",
      title: "From Absentee to Class Representative",
      summary:
        "After receiving dignity kits and joining a peer ambassador club, one student went from missing a week each month to becoming her class representative — a illustrative example of how consistent support restores confidence.",
      programSlug: "menstrual-health",
      imageUrl: images.programs.menstrualHealth.gallery[0],
      isIllustrative: true,
    },
    {
      id: "ss-2",
      title: "A Scholarship Dream Realized",
      summary:
        "Through mentorship and application support, a program graduate secured a partial scholarship to study public health — an illustrative story of how career guidance opens doors.",
      programSlug: "career-development",
      imageUrl: images.programs.careerDevelopment.gallery[1],
      isIllustrative: true,
    },
    {
      id: "ss-3",
      title: "Finding Her Voice in Wellness Circle",
      summary:
        "A shy teenager who struggled with anxiety learned coping strategies in our wellness circle and now co-facilitates sessions for younger girls — illustrative of peer-led sustainability.",
      programSlug: "mental-health",
      imageUrl: images.programs.mentalHealth.gallery[0],
      isIllustrative: true,
    },
    {
      id: "ss-4",
      title: "Community Leaders Become Allies",
      summary:
        "A parent workshop in a rural community shifted attitudes among fathers who now actively support their daughters' education — an illustrative community transformation story.",
      programSlug: "menstrual-health",
      imageUrl: images.gallery.communityOutreach,
      isIllustrative: true,
    },
  ],

  beforeAfterStories: [
    {
      id: "ba-1",
      title: "School Attendance",
      before:
        "Girls in partner schools missed an illustrative average of 5–7 days per term due to menstruation-related barriers.",
      after:
        "After program enrollment, absenteeism dropped to an illustrative 1–2 days per term, with peer support sustaining improvement.",
      programSlug: "menstrual-health",
      isIllustrative: true,
    },
    {
      id: "ba-2",
      title: "Confidence to Seek Help",
      before:
        "An illustrative 78% of surveyed girls reported they would not tell an adult about emotional struggles.",
      after:
        "After wellness programming, an illustrative 62% said they now know at least one trusted person to talk to.",
      programSlug: "mental-health",
      isIllustrative: true,
    },
    {
      id: "ba-3",
      title: "Career Vision",
      before:
        "An illustrative 65% of mentees could not name a professional woman in their desired field before the program.",
      after:
        "After six months of mentorship, an illustrative 89% had identified role models and set concrete education or career goals.",
      programSlug: "career-development",
      isIllustrative: true,
    },
  ],

  annualReports: [
    {
      year: 2024,
      title: "2024 Annual Impact Report",
      summary:
        "Illustrative summary covering program expansion, Eastern Region outreach completion, and volunteer growth.",
      downloadUrl: "#",
      isIllustrative: true,
    },
    {
      year: 2023,
      title: "2023 Annual Impact Report",
      summary:
        "Illustrative summary of founding-year milestones, first school partnerships, and initial dignity kit distributions.",
      downloadUrl: "#",
      isIllustrative: true,
    },
    {
      year: 2022,
      title: "2022 Founding Report",
      summary:
        "Illustrative document outlining the foundation's launch, mission, and first community engagements.",
      downloadUrl: "#",
      isIllustrative: true,
    },
  ],

  donationUsage: [
    {
      category: "Program Delivery",
      percentage: 55,
      description:
        "Direct costs for dignity kits, workshop materials, mentor training, and field program staff.",
      isIllustrative: true,
    },
    {
      category: "Community Outreach",
      percentage: 20,
      description:
        "Transportation, venue costs, and materials for rural and community-based engagements.",
      isIllustrative: true,
    },
    {
      category: "Education & Resources",
      percentage: 12,
      description:
        "Development and printing of guides, infographics, and digital learning materials.",
      isIllustrative: true,
    },
    {
      category: "Operations & Administration",
      percentage: 8,
      description:
        "Office costs, communications, and essential administrative support.",
      isIllustrative: true,
    },
    {
      category: "Fundraising & Growth",
      percentage: 5,
      description:
        "Donor stewardship, campaign materials, and capacity building for sustainable growth.",
      isIllustrative: true,
    },
  ],
};

/** Disclaimer text for impact statistics display. */
export const IMPACT_DATA_DISCLAIMER =
  "All impact figures on this page are illustrative placeholders for website development. Verified statistics will be published following independent audit.";
