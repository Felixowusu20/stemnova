import { images } from "@/content/images";
import type { Program, ProgramSlug } from "@/types";

/** Program content — illustrative placeholder data, not verified facts. */
export const programs: Program[] = [
  {
    slug: "menstrual-health",
    title: "Menstrual Health & Dignity",
    shortDescription:
      "Breaking stigma and ensuring every girl has access to education, supplies, and safe spaces to manage menstruation with confidence.",
    intro:
      "Our Menstrual Health & Dignity program equips girls with knowledge, reusable and disposable supplies, and school-based support systems so that periods never become a barrier to learning or self-worth. We work alongside teachers, parents, and community leaders to normalize conversations about menstrual health.",
    problem:
      "Across Ghana, many girls miss school during menstruation due to lack of supplies, inadequate facilities, and persistent stigma. Without accurate information and consistent access to products, girls face embarrassment, isolation, and interrupted education — often dropping out altogether.",
    activities: [
      "School-based menstrual health workshops for girls and mixed-gender peer educators",
      "Distribution of dignity kits containing pads, soap, underwear, and informational materials",
      "Training sessions for teachers and school nurses on supportive, stigma-free responses",
      "Community dialogues with parents and faith leaders to challenge harmful myths",
      "Advocacy for improved washroom facilities and pad disposal systems in partner schools",
      "Peer ambassador clubs that sustain conversations year-round",
    ],
    beneficiaries:
      "Primary focus on girls aged 10–18 in public and community schools across Greater Accra and Eastern Region. Secondary beneficiaries include teachers, parents, and male peers who participate in allyship sessions.",
    approach:
      "We combine evidence-based health education with practical supply provision and sustained community engagement. Programs are co-designed with school leadership and evaluated through attendance tracking, confidence surveys, and qualitative feedback — always centering dignity over charity.",
    stats: [
      { label: "Girls reached (illustrative)", value: "2,400+", isIllustrative: true },
      { label: "Schools partnered (illustrative)", value: "18", isIllustrative: true },
      { label: "Dignity kits distributed (illustrative)", value: "3,200", isIllustrative: true },
      { label: "Peer ambassadors trained (illustrative)", value: "96", isIllustrative: true },
    ],
    relatedProjectSlugs: ["1000-girl-project", "pad-drive-accra", "rural-outreach-eastern"],
    galleryImageUrls: [...images.programs.menstrualHealth.gallery],
    resources: [
      {
        title: "Understanding Your Cycle: A Guide for Young Women",
        description: "Illustrated guide covering anatomy, cycle tracking, and self-care basics.",
        href: "/resources/understanding-your-cycle",
        type: "guide",
      },
      {
        title: "Menstrual Health FAQ for Parents & Guardians",
        description: "Answers to common questions about supporting daughters through puberty.",
        href: "/resources/menstrual-health-parent-faq",
        type: "faq",
      },
      {
        title: "Breaking the Silence: Community Conversation Toolkit",
        description: "Facilitator guide for community leaders hosting stigma-reduction dialogues.",
        href: "/resources/community-conversation-toolkit",
        type: "guide",
      },
    ],
    testimonials: [
      {
        id: "mh-t1",
        quote:
          "Before the workshop, I used to stay home every month. Now I know how to manage and I don't feel ashamed anymore.",
        author: "Ama K.",
        role: "Student",
        organization: "Partner School, Accra",
        programSlug: "menstrual-health",
        isIllustrative: true,
      },
      {
        id: "mh-t2",
        quote:
          "The teacher training helped our staff respond with empathy instead of embarrassment. It changed our whole school culture.",
        author: "Mrs. Adwoa Mensah",
        role: "Headmistress",
        organization: "Community Junior High School",
        programSlug: "menstrual-health",
        isIllustrative: true,
      },
    ],
    heroImageUrl: images.programs.menstrualHealth.hero,
    icon: "heart",
    isIllustrative: true,
  },
  {
    slug: "mental-health",
    title: "Mental Health & Wellness",
    shortDescription:
      "Creating safe spaces for emotional wellbeing, resilience, and peer support so girls can thrive academically and personally.",
    intro:
      "Our Mental Health & Wellness program addresses the emotional pressures facing young women — from academic stress and family expectations to social media and trauma. We provide counseling referrals, group support circles, and wellness literacy that empowers girls to seek help without shame.",
    problem:
      "Mental health challenges among adolescents in Ghana are often unrecognized or dismissed. Girls face unique pressures around appearance, performance, and safety, yet access to youth-friendly counseling remains limited. Stigma prevents early intervention and leaves many struggling in silence.",
    activities: [
      "Weekly wellness circles facilitated by trained counselors and peer mentors",
      "Stress management and mindfulness workshops tailored for exam seasons",
      "Referral partnerships with licensed psychologists and social workers",
      "Digital wellbeing sessions on healthy social media habits",
      "Crisis awareness training for teachers to identify warning signs",
      "Parent workshops on supporting adolescent emotional development",
    ],
    beneficiaries:
      "Girls aged 12–22 in secondary schools, youth groups, and community centers. Programs also engage parents, educators, and volunteer mentors who form the support ecosystem.",
    approach:
      "We prioritize trauma-informed, culturally sensitive facilitation. Sessions are voluntary, confidential where possible, and grounded in strengths-based psychology. We never replace clinical care — we bridge girls to professional support while building everyday coping skills.",
    stats: [
      { label: "Wellness sessions held (illustrative)", value: "340+", isIllustrative: true },
      { label: "Girls in support circles (illustrative)", value: "580", isIllustrative: true },
      { label: "Counselor referrals made (illustrative)", value: "72", isIllustrative: true },
      { label: "Educators trained (illustrative)", value: "45", isIllustrative: true },
    ],
    relatedProjectSlugs: ["mentor-circle-2025", "1000-girl-project"],
    galleryImageUrls: [...images.programs.mentalHealth.gallery],
    resources: [
      {
        title: "Five Breathing Techniques for Exam Stress",
        description: "Short video demonstrating practical calming exercises.",
        href: "/resources/breathing-techniques-exam-stress",
        type: "video",
      },
      {
        title: "When to Seek Help: Mental Health Warning Signs",
        description: "Infographic for students and caregivers on recognizing when support is needed.",
        href: "/resources/when-to-seek-help",
        type: "infographic",
      },
      {
        title: "Peer Support Circle Facilitator Manual",
        description: "Structured guide for running safe, inclusive group sessions.",
        href: "/resources/peer-support-manual",
        type: "guide",
      },
    ],
    testimonials: [
      {
        id: "mhw-t1",
        quote:
          "The wellness circle was the first place I felt I could talk about anxiety without being told to pray it away. It saved my semester.",
        author: "Efua A.",
        role: "Student",
        organization: "Senior High School, Tema",
        programSlug: "mental-health",
        isIllustrative: true,
      },
      {
        id: "mhw-t2",
        quote:
          "As a volunteer facilitator, I've seen girls transform from withdrawn to confident in just a few sessions. The curriculum is thoughtful and real.",
        author: "Kofi Asante",
        role: "Volunteer Facilitator",
        programSlug: "mental-health",
        isIllustrative: true,
      },
    ],
    heroImageUrl: images.programs.mentalHealth.hero,
    icon: "brain",
    isIllustrative: true,
  },
  {
    slug: "career-development",
    title: "Career Development & Leadership",
    shortDescription:
      "Opening pathways to education, skills training, and mentorship so girls can envision and pursue bold futures.",
    intro:
      "Our Career Development & Leadership program connects girls with mentors, skills workshops, and exposure to diverse career paths — from STEM and entrepreneurship to healthcare and the arts. We believe every girl deserves someone who sees her potential and helps her plan for it.",
    problem:
      "Gender gaps in education and employment persist in Ghana, particularly in rural and low-income communities. Many girls lack role models, career guidance, and practical skills training. Without mentorship and exposure, talented young women never discover opportunities aligned with their abilities.",
    activities: [
      "One-on-one and group mentorship matching with professional women",
      "Skills workshops: public speaking, CV writing, digital literacy, and financial basics",
      "Career shadowing days with partner organizations",
      "STEM and entrepreneurship bootcamps during school breaks",
      "Scholarship application support and university prep sessions",
      "Alumni network connecting program graduates with ongoing opportunities",
    ],
    beneficiaries:
      "Girls and young women aged 14–24, with priority for students from underserved communities who demonstrate motivation but lack access to professional networks.",
    approach:
      "Mentorship is the heart of this program. We carefully match mentors and mentees, provide structured curricula, and track progress through goal-setting sessions. Partnerships with universities and employers ensure exposure is authentic, not performative.",
    stats: [
      { label: "Mentorship pairs active (illustrative)", value: "120", isIllustrative: true },
      { label: "Workshops delivered (illustrative)", value: "85", isIllustrative: true },
      { label: "Scholarship applications supported (illustrative)", value: "64", isIllustrative: true },
      { label: "Partner professionals (illustrative)", value: "40+", isIllustrative: true },
    ],
    relatedProjectSlugs: ["stem-girls-workshop", "mentor-circle-2025", "1000-girl-project"],
    galleryImageUrls: [...images.programs.careerDevelopment.gallery],
    resources: [
      {
        title: "Building Your First CV: A Step-by-Step Guide",
        description: "PDF guide with templates tailored for Ghanaian students.",
        href: "/resources/building-your-cv",
        type: "pdf",
      },
      {
        title: "Women in STEM: Career Pathways in Ghana",
        description: "Article profiling diverse STEM careers and entry requirements.",
        href: "/resources/women-in-stem-ghana",
        type: "article",
      },
      {
        title: "Mentorship Expectations: Guide for Mentees",
        description: "How to prepare for and get the most from a mentorship relationship.",
        href: "/resources/mentorship-guide-mentees",
        type: "guide",
      },
    ],
    testimonials: [
      {
        id: "cd-t1",
        quote:
          "My mentor helped me apply for a scholarship I didn't know existed. I'm now studying nursing — something I never thought was possible.",
        author: "Abena O.",
        role: "Program Graduate",
        organization: "University of Ghana",
        programSlug: "career-development",
        isIllustrative: true,
      },
      {
        id: "cd-t2",
        quote:
          "The public speaking workshop gave our daughter confidence she carries into every classroom presentation. Worth every Saturday morning.",
        author: "Mr. & Mrs. Boateng",
        role: "Parents",
        programSlug: "career-development",
        isIllustrative: true,
      },
    ],
    heroImageUrl: images.programs.careerDevelopment.hero,
    icon: "briefcase",
    isIllustrative: true,
  },
];

/** Retrieve a program by its slug. */
export function getProgramBySlug(slug: ProgramSlug): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

/** Retrieve a program by slug string (returns undefined if invalid). */
export function getProgramBySlugString(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
