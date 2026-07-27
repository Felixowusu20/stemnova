import { images } from "@/content/images";
import type { Program, ProgramSlug } from "@/types";

/** Programme content — illustrative placeholder data, not verified facts. */
export const programs: Program[] = [
  {
    slug: "young-scholars-stem-discovery",
    title: "Young Scholars STEM Discovery",
    shortDescription:
      "Find and nurture exceptional STEM talent in secondary schools and early university across Africa.",
    intro:
      "Young Scholars STEM Discovery is STEMNova Foundation's flagship entry point for scientific talent identification. Through structured assessments, laboratory immersions, and mentorship introductions, we surface students whose curiosity, aptitude, and perseverance signal future research leadership—regardless of geography, gender, or socioeconomic background.",
    objectives: [
      "Identify high-potential STEM students through equitable, evidence-based discovery processes",
      "Provide early exposure to laboratory research, scientific inquiry, and academic mentorship",
      "Bridge talented students from under-resourced schools into advanced STEM pathways",
      "Build a continental pipeline of young scholars prepared for fellowships and research careers",
    ],
    impactStatement:
      "Since launch, Young Scholars has identified and supported over 3,200 promising students across 180 partner schools (illustrative). Alumni have progressed to national science competitions, university scholarships, and advanced fellowship programmes at rates exceeding regional baselines.",
    activities: [
      "Regional STEM discovery camps with hands-on laboratory and computational modules",
      "School-based talent assessments co-designed with partner educators",
      "Research shadowing placements with university faculty and graduate mentors",
      "Science fair preparation, presentation coaching, and peer learning cohorts",
      "Scholarship navigation workshops and university application support",
      "Annual Young Scholars Summit connecting cohorts across participating countries",
    ],
    beneficiaries:
      "Secondary school students (ages 14–19) and first-year university students demonstrating exceptional STEM aptitude, with priority outreach to students in underserved communities and public institutions.",
    approach:
      "We combine psychometric and performance-based discovery with sustained mentorship—not one-off competitions. Programmes are co-designed with partner schools and universities, evaluated through longitudinal tracking of academic progression, and governed by transparent selection criteria that prioritize equity alongside excellence.",
    stats: [
      { label: "Students identified (illustrative)", value: "3,200+", isIllustrative: true },
      { label: "Partner schools (illustrative)", value: "180", isIllustrative: true },
      { label: "Scholarship placements (illustrative)", value: "420", isIllustrative: true },
      { label: "Countries active (illustrative)", value: "12", isIllustrative: true },
    ],
    galleryImageUrls: [
      images.programmes.youngScholars,
      images.gallery[5],
      images.gallery[0],
    ],
    resources: [
      {
        title: "STEM Discovery Selection Criteria",
        description: "Transparent overview of how students are identified and supported through the programme.",
        href: "/resources/stem-discovery-selection-criteria",
        type: "guide",
      },
      {
        title: "Young Scholars Programme FAQ",
        description: "Answers for students, parents, and educators about eligibility and application timelines.",
        href: "/resources/young-scholars-faq",
        type: "faq",
      },
      {
        title: "From Curiosity to Research: A Student Pathway Guide",
        description: "Illustrated guide mapping early STEM interest to advanced research opportunities.",
        href: "/resources/curiosity-to-research-guide",
        type: "pdf",
      },
    ],
    testimonials: [],
    heroImageUrl: images.programmes.youngScholars,
    icon: "sparkles",
    isIllustrative: true,
  },
  {
    slug: "stemnova-mentorship-network",
    title: "STEMNova Mentorship Network",
    shortDescription:
      "Connect emerging African scientists with experienced mentors in research, academia, and industry.",
    intro:
      "The STEMNova Mentorship Network transforms isolated talent into connected careers. We match students and early-career researchers with mentors who share their discipline, context, and ambitions—creating relationships that endure through university transitions, fellowship applications, and first research appointments.",
    objectives: [
      "Establish sustained mentor-mentee relationships across STEM disciplines and career stages",
      "Reduce attrition among talented students facing limited guidance and professional networks",
      "Connect African STEM talent to global research communities through mentor introductions",
      "Build a scalable mentorship infrastructure with training, safeguarding, and quality standards",
    ],
    impactStatement:
      "The network has facilitated over 1,850 active mentorship pairs (illustrative) across 14 countries, with mentees reporting increased confidence, clearer career pathways, and expanded professional networks within six months of matching.",
    activities: [
      "Structured mentor-mentee matching with discipline and career-stage alignment",
      "Quarterly mentorship cohort workshops on research skills, communication, and leadership",
      "Virtual and in-person networking events connecting mentors across institutions",
      "Mentor training on youth development, cultural competency, and research ethics",
      "Alumni mentorship pathways for graduates supporting the next cohort",
      "Annual Mentorship Excellence Awards recognizing outstanding mentor contributions",
    ],
    beneficiaries:
      "Young Scholars alumni, fellowship recipients, university STEM students, and early-career researchers seeking sustained guidance from experienced African and diaspora STEM professionals.",
    approach:
      "Mentorship is structured, not informal. Every pair receives orientation, goal-setting frameworks, and quarterly check-ins. We invest heavily in mentor training and safeguarding, ensuring relationships are professional, supportive, and aligned with mentee aspirations.",
    stats: [
      { label: "Active mentorship pairs (illustrative)", value: "1,850", isIllustrative: true },
      { label: "Registered mentors (illustrative)", value: "640", isIllustrative: true },
      { label: "Retention at 12 months (illustrative)", value: "87%", isIllustrative: true },
      { label: "Disciplines represented (illustrative)", value: "28", isIllustrative: true },
    ],
    galleryImageUrls: [
      images.programmes.mentorship,
      images.gallery[3],
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    ],
    resources: [
      {
        title: "Mentorship Expectations: Guide for Mentees",
        description: "How to prepare for a mentorship relationship and set meaningful goals.",
        href: "/resources/mentorship-guide-mentees",
        type: "guide",
      },
      {
        title: "Mentor Training Handbook",
        description: "Essential reading for network mentors covering roles, ethics, and best practices.",
        href: "/resources/mentor-training-handbook",
        type: "pdf",
      },
      {
        title: "Join the STEMNova Mentorship Network",
        description: "Application overview for prospective mentors and mentees.",
        href: "/resources/mentorship-network-application",
        type: "external",
      },
    ],
    testimonials: [],
    heroImageUrl: images.programmes.mentorship,
    icon: "users",
    isIllustrative: true,
  },
  {
    slug: "african-stem-fellows",
    title: "African STEM Fellows",
    shortDescription:
      "Funded research placements and leadership training for Africa's next generation of research leaders.",
    intro:
      "African STEM Fellows is STEMNova's flagship research leadership programme. Selected fellows receive multi-year support—including research stipends, laboratory placements, publication coaching, and international conference access—designed to accelerate their trajectory toward independent research careers and institutional leadership.",
    objectives: [
      "Develop a cohort of African researchers capable of leading world-class research programmes",
      "Provide funded research placements at partner universities and research centres",
      "Strengthen fellows' publication records, grant-writing skills, and collaborative networks",
      "Create a continental community of research leaders who mentor the next generation",
    ],
    impactStatement:
      "Across four cohorts, African STEM Fellows has supported 186 researchers (illustrative) who have collectively published 52 peer-reviewed papers and secured 34 follow-on research grants—demonstrating the programme's capacity to catalyse research careers at scale.",
    activities: [
      "Two-year fellowship with research stipend and laboratory placement support",
      "Leadership intensives on grant writing, research management, and academic governance",
      "International research exchanges with partner institutions in Europe, North America, and Asia",
      "Publication coaching and open-science training with experienced editors",
      "Fellows' symposium presenting research to peers, mentors, and funders",
      "Transition support for post-fellowship faculty appointments and independent labs",
    ],
    beneficiaries:
      "Outstanding early-career African researchers (typically postdoctoral or advanced PhD candidates) demonstrating research excellence, leadership potential, and commitment to advancing science on the continent.",
    approach:
      "Fellowship selection combines research merit with leadership potential and equity considerations. We prioritize fellows whose work addresses continental priorities—from health and agriculture to quantum science and sustainable energy—while building the skills and networks required for global impact.",
    stats: [
      { label: "Fellows supported (illustrative)", value: "186", isIllustrative: true },
      { label: "Publications co-authored (illustrative)", value: "52", isIllustrative: true },
      { label: "Follow-on grants secured (illustrative)", value: "34", isIllustrative: true },
      { label: "Partner research labs (illustrative)", value: "28", isIllustrative: true },
    ],
    galleryImageUrls: [
      images.programmes.fellows,
      images.gallery[4],
      images.hero.research,
    ],
    resources: [
      {
        title: "African STEM Fellows Application Guide",
        description: "Eligibility criteria, timeline, and required materials for prospective applicants.",
        href: "/resources/african-stem-fellows-application",
        type: "pdf",
      },
      {
        title: "Fellowship Research Areas",
        description: "Overview of priority research domains and partner laboratory placements.",
        href: "/resources/fellowship-research-areas",
        type: "article",
      },
      {
        title: "Fellows Programme FAQ",
        description: "Common questions about funding, duration, and post-fellowship pathways.",
        href: "/resources/fellows-faq",
        type: "faq",
      },
    ],
    testimonials: [],
    heroImageUrl: images.programmes.fellows,
    icon: "award",
    isIllustrative: true,
  },
  {
    slug: "quantum-education-leaders",
    title: "Quantum Education Leaders",
    shortDescription:
      "Clear pathways into quantum science education and research for African learners and educators.",
    intro:
      "Quantum Education Leaders addresses a critical gap: while quantum science reshapes computing, sensing, and materials research globally, African institutions lack structured curricula, trained educators, and leadership pipelines in this discipline. STEMNova is building that infrastructure—one cohort at a time.",
    objectives: [
      "Develop foundational quantum science literacy among educators and advanced students",
      "Train a cadre of quantum education leaders capable of building curricula and research groups",
      "Establish partnerships with global quantum research centres for knowledge exchange",
      "Create sustainable quantum education pathways integrated into African university systems",
    ],
    impactStatement:
      "The programme has trained 145 quantum education leaders (illustrative) across 8 countries, with pilot curricula adopted at 12 partner universities and research collaborations initiated with three international quantum institutes.",
    activities: [
      "Intensive quantum science summer schools for educators and graduate students",
      "Curriculum development workshops co-facilitated with international quantum researchers",
      "Laboratory and simulation modules using accessible quantum computing platforms",
      "Research placements at partner quantum labs during fellowship periods",
      "Annual Quantum Africa Symposium connecting educators, researchers, and policymakers",
      "Policy briefings on quantum readiness for African higher education ministries",
    ],
    beneficiaries:
      "University faculty, graduate students, and advanced secondary educators committed to building quantum science capacity within African institutions, with priority for participants from universities without existing quantum programmes.",
    approach:
      "We prioritize accessibility and sustainability over elite exclusivity. Curriculum modules are designed for adaptation across resource contexts, educators receive ongoing peer support through a continental learning community, and partnerships ensure African voices shape—not merely consume—quantum education frameworks.",
    stats: [
      { label: "Educators trained (illustrative)", value: "145", isIllustrative: true },
      { label: "Universities adopting curricula (illustrative)", value: "12", isIllustrative: true },
      { label: "International lab partnerships (illustrative)", value: "6", isIllustrative: true },
      { label: "Student participants (illustrative)", value: "380", isIllustrative: true },
    ],
    galleryImageUrls: [
      images.programmes.quantum,
      images.hero.research,
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    ],
    resources: [
      {
        title: "Introduction to Quantum Science for Educators",
        description: "Foundational primer covering key concepts accessible to non-specialist teachers.",
        href: "/resources/quantum-educators-primer",
        type: "pdf",
      },
      {
        title: "Quantum Education Pathways in Africa",
        description: "Policy brief on building quantum readiness in African higher education.",
        href: "/resources/quantum-pathways-africa",
        type: "article",
      },
      {
        title: "Quantum Leaders Programme FAQ",
        description: "Eligibility, application process, and programme structure for prospective participants.",
        href: "/resources/quantum-leaders-faq",
        type: "faq",
      },
    ],
    testimonials: [],
    heroImageUrl: images.programmes.quantum,
    icon: "atom",
    isIllustrative: true,
  },
  {
    slug: "materials-science-solid-state",
    title: "Materials Science & Solid-State Physics",
    shortDescription:
      "Grow materials science capacity through fellowships, lab access, and university–industry partnerships.",
    intro:
      "From semiconductor innovation to sustainable energy materials, solid-state physics and materials science underpin Africa's technological future. This programme strengthens research capacity through funded projects, shared laboratory infrastructure, and mentorship connecting African researchers to global materials science communities.",
    objectives: [
      "Support cutting-edge materials science research addressing African and global challenges",
      "Build shared laboratory capacity and equipment access across partner institutions",
      "Foster industry-academia collaboration for materials innovation and commercialization",
      "Train researchers in advanced characterization, modelling, and publication practices",
    ],
    impactStatement:
      "Programme-supported researchers have completed 38 materials science projects (illustrative), filed 6 patent applications, and established 4 industry partnerships focused on battery materials, photovoltaics, and advanced ceramics for infrastructure.",
    activities: [
      "Research grants for materials science projects at partner universities",
      "Shared laboratory access programme for equipment-limited institutions",
      "Industry immersion placements with materials and energy companies",
      "Workshops on X-ray diffraction, spectroscopy, and computational materials modelling",
      "Annual Materials Science Research Showcase and industry networking forum",
      "Collaborative research clusters linking African labs with international partners",
    ],
    beneficiaries:
      "Graduate students, postdoctoral researchers, and faculty in physics, chemistry, and engineering departments pursuing materials science research, with emphasis on projects addressing energy, infrastructure, and sustainable manufacturing.",
    approach:
      "We address the equipment gap that limits African materials research by pooling resources across partner institutions, negotiating industry access, and prioritizing collaborative projects that multiply impact beyond individual labs. Research excellence and developmental relevance are equally weighted in selection.",
    stats: [
      { label: "Research projects funded (illustrative)", value: "38", isIllustrative: true },
      { label: "Partner laboratories (illustrative)", value: "16", isIllustrative: true },
      { label: "Graduate researchers supported (illustrative)", value: "112", isIllustrative: true },
      { label: "Industry partnerships (illustrative)", value: "4", isIllustrative: true },
    ],
    galleryImageUrls: [
      images.programmes.materials,
      images.gallery[4],
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    ],
    resources: [
      {
        title: "Materials Science Research Grant Guidelines",
        description: "Application criteria, funding levels, and reporting requirements for researchers.",
        href: "/resources/materials-science-grant-guidelines",
        type: "pdf",
      },
      {
        title: "Shared Laboratory Access Programme",
        description: "How partner institutions can access equipment through the STEMNova network.",
        href: "/resources/shared-lab-access",
        type: "guide",
      },
      {
        title: "Solid-State Physics Reading List",
        description: "Curated resources for graduate students entering materials science research.",
        href: "/resources/solid-state-reading-list",
        type: "article",
      },
    ],
    testimonials: [],
    heroImageUrl: images.programmes.materials,
    icon: "flask",
    isIllustrative: true,
  },
  {
    slug: "girls-discover-science",
    title: "Girls Discover Science",
    shortDescription:
      "Open STEM pathways for girls and young women with dedicated programmes and strong role models.",
    intro:
      "Girls Discover Science confronts one of STEM's most persistent challenges: the underrepresentation of women across scientific careers in Africa. Through girls-only STEM camps, women scientist role model networks, and targeted scholarship support, we create environments where girls build confidence, explore frontier science, and envision research careers without limitation.",
    objectives: [
      "Increase girls' participation and persistence in STEM education and careers",
      "Connect girls with women scientists, engineers, and researchers as role models and mentors",
      "Address structural barriers—including bias, resource gaps, and cultural expectations—that limit girls' STEM pathways",
      "Track and publish evidence on effective interventions for girls in STEM across African contexts",
    ],
    impactStatement:
      "Over 4,800 girls have participated in Girls Discover Science programmes (illustrative), with 72% of alumnae pursuing advanced STEM courses at secondary or university level—compared to an illustrative regional baseline of 34% for comparable cohorts.",
    activities: [
      "Regional Girls in STEM camps with hands-on experiments, coding, and engineering challenges",
      "Women in Science speaker series featuring African researchers across disciplines",
      "Girls-only mentorship matching within the STEMNova Mentorship Network",
      "Scholarship support for girls transitioning to university STEM programmes",
      "Parent and educator workshops on supporting girls' scientific ambitions",
      "Girls Discover Science Ambassadors programme for peer leadership in partner schools",
    ],
    beneficiaries:
      "Girls aged 12–22 in secondary schools and early university, with outreach prioritizing communities where girls' STEM participation rates are lowest and role models are scarce.",
    approach:
      "Programmes are designed by and for women in STEM—not adapted from generic curricula. We create psychologically safe spaces for exploration, pair every participant with a woman mentor, and measure success through persistence and aspiration—not just attendance.",
    stats: [
      { label: "Girls reached (illustrative)", value: "4,800+", isIllustrative: true },
      { label: "Women mentors engaged (illustrative)", value: "320", isIllustrative: true },
      { label: "STEM course persistence (illustrative)", value: "72%", isIllustrative: true },
      { label: "Scholarships awarded (illustrative)", value: "680", isIllustrative: true },
    ],
    galleryImageUrls: [
      images.programmes.girlsScience,
      images.gallery[3],
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    ],
    resources: [
      {
        title: "Supporting Girls in STEM: Guide for Educators",
        description: "Evidence-based strategies for creating inclusive STEM classrooms.",
        href: "/resources/girls-stem-educator-guide",
        type: "guide",
      },
      {
        title: "Women in STEM: Career Pathways in Africa",
        description: "Profiles of African women scientists and engineers across disciplines.",
        href: "/resources/women-in-stem-pathways",
        type: "article",
      },
      {
        title: "Girls Discover Science Programme FAQ",
        description: "Information for students, parents, and schools about enrolment and activities.",
        href: "/resources/girls-discover-science-faq",
        type: "faq",
      },
    ],
    testimonials: [],
    heroImageUrl: images.programmes.girlsScience,
    icon: "venus",
    isIllustrative: true,
  },
  {
    slug: "stem-teachers-academy",
    title: "STEM Teachers Academy",
    shortDescription:
      "Train educators in modern STEM teaching methods and practical digital classroom skills.",
    intro:
      "Teachers are the gatekeepers of scientific talent—and Africa's educators need modern tools to match a rapidly evolving STEM landscape. The STEM Teachers Academy delivers professional development that transforms classroom practice, from inquiry-based learning and computational thinking to frontier science literacy and inclusive pedagogy.",
    objectives: [
      "Upgrade STEM teaching quality through evidence-based professional development",
      "Integrate digital tools, computational thinking, and laboratory skills into classroom practice",
      "Build a community of practice among STEM educators across partner schools and regions",
      "Influence national curriculum development through teacher-led innovation and policy engagement",
    ],
    impactStatement:
      "The Academy has trained 1,250 STEM teachers (illustrative) across 320 partner schools, with participating classrooms showing illustrative gains of 28% in student engagement scores and 19% in STEM assessment performance compared to pre-training baselines.",
    activities: [
      "Intensive summer institutes covering pedagogy, content knowledge, and digital integration",
      "School-based coaching visits with master teacher facilitators",
      "Online learning modules on computational thinking, data literacy, and lab safety",
      "Teacher research circles where educators design and share classroom innovations",
      "Certification pathways aligned with national professional development standards",
      "Annual STEM Teachers Conference showcasing best practices and policy dialogue",
    ],
    beneficiaries:
      "Primary and secondary STEM teachers, school science coordinators, and teacher educators in partner institutions—prioritizing educators in public schools serving underserved communities.",
    approach:
      "Professional development is sustained, not episodic. Teachers join multi-year learning communities, receive classroom coaching—not just workshop attendance—and contribute to a growing repository of African-context STEM teaching resources. Impact is measured through classroom observation and student outcomes, not completion certificates alone.",
    stats: [
      { label: "Teachers trained (illustrative)", value: "1,250", isIllustrative: true },
      { label: "Partner schools (illustrative)", value: "320", isIllustrative: true },
      { label: "Student engagement gain (illustrative)", value: "28%", isIllustrative: true },
      { label: "Teaching resources created (illustrative)", value: "340", isIllustrative: true },
    ],
    galleryImageUrls: [
      images.programmes.teachers,
      images.gallery[1],
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    ],
    resources: [
      {
        title: "Inquiry-Based STEM Teaching Toolkit",
        description: "Classroom-ready activities and facilitation guides for secondary science teachers.",
        href: "/resources/inquiry-stem-toolkit",
        type: "pdf",
      },
      {
        title: "Digital Tools for STEM Classrooms",
        description: "Guide to integrating free and low-cost digital resources into science teaching.",
        href: "/resources/digital-stem-tools",
        type: "guide",
      },
      {
        title: "STEM Teachers Academy FAQ",
        description: "Enrollment, certification, and programme structure for participating educators.",
        href: "/resources/teachers-academy-faq",
        type: "faq",
      },
    ],
    testimonials: [],
    heroImageUrl: images.programmes.teachers,
    icon: "graduation",
    isIllustrative: true,
  },
  {
    slug: "young-african-researchers-fellowship",
    title: "Young African Researchers Fellowship",
    shortDescription:
      "Support emerging researchers with funding, mentorship, and international collaboration.",
    intro:
      "The Young African Researchers Fellowship bridges the gap between graduate training and independent research careers. Fellows receive research funding, dedicated mentorship, publication support, and access to international collaborations—addressing the isolation and resource constraints that cause talented African researchers to leave science or emigrate without building continental capacity.",
    objectives: [
      "Retain talented African researchers within continental research ecosystems",
      "Provide early-career funding for independent research projects and pilot studies",
      "Connect fellows to international collaborators, conferences, and publication networks",
      "Build a pipeline from fellowship to faculty appointments and research leadership",
    ],
    impactStatement:
      "Since inception, the fellowship has supported 890 researchers (illustrative) who have produced 78 peer-reviewed publications, secured 42 follow-on grants, and achieved a 91% retention rate in research careers five years post-fellowship.",
    activities: [
      "One- to two-year research fellowships with stipend and project funding",
      "Dedicated senior researcher mentorship and quarterly progress reviews",
      "International conference travel grants and virtual collaboration platforms",
      "Grant-writing workshops and mock review panels with experienced funders",
      "Cross-cohort research seminars and interdisciplinary collaboration forums",
      "Career transition support for faculty recruitment and lab establishment",
    ],
    beneficiaries:
      "Early-career African researchers within five years of completing their highest degree, demonstrating research potential and commitment to building scientific capacity on the continent.",
    approach:
      "Fellowship design prioritizes researcher autonomy alongside structured support. Fellows choose their research questions and collaborators while receiving the funding, mentorship, and networks that early-career researchers elsewhere take for granted. Selection balances research merit with equity across gender, geography, and discipline.",
    stats: [
      { label: "Researchers supported (illustrative)", value: "890", isIllustrative: true },
      { label: "Publications produced (illustrative)", value: "78", isIllustrative: true },
      { label: "Follow-on grants (illustrative)", value: "42", isIllustrative: true },
      { label: "Career retention (illustrative)", value: "91%", isIllustrative: true },
    ],
    galleryImageUrls: [
      images.programmes.researchers,
      images.gallery[4],
      "https://images.unsplash.com/photo-1581093458791-9d42e3c7de29?w=800&q=80",
    ],
    resources: [
      {
        title: "Young Researchers Fellowship Application Guide",
        description: "Eligibility, proposal requirements, and evaluation criteria for applicants.",
        href: "/resources/young-researchers-application",
        type: "pdf",
      },
      {
        title: "Building Your First Research Grant Proposal",
        description: "Step-by-step guide for early-career researchers writing competitive proposals.",
        href: "/resources/first-grant-proposal-guide",
        type: "guide",
      },
      {
        title: "Fellowship FAQ",
        description: "Common questions about funding levels, duration, and post-fellowship support.",
        href: "/resources/young-researchers-faq",
        type: "faq",
      },
    ],
    testimonials: [],
    heroImageUrl: images.programmes.researchers,
    icon: "microscope",
    isIllustrative: true,
  },
  {
    slug: "innovation-sustainable-development",
    title: "Innovation for Sustainable Development",
    shortDescription:
      "Fund STEM solutions for climate, energy, agriculture, and health challenges across Africa.",
    intro:
      "Innovation for Sustainable Development channels scientific talent toward problems that matter. We fund and mentor STEM innovation projects addressing climate resilience, renewable energy, agricultural productivity, and public health—building a generation of scientist-innovators who translate research into community impact.",
    objectives: [
      "Fund STEM innovation projects addressing sustainable development challenges across Africa",
      "Connect researchers and students with communities, policymakers, and social enterprises",
      "Build pathways from laboratory research to scalable solutions and social impact",
      "Document and share evidence on STEM-driven sustainable development interventions",
    ],
    impactStatement:
      "The programme has funded 145 innovation projects (illustrative) across 18 countries, with 38 projects reaching pilot deployment and 12 spin-off social enterprises established—demonstrating STEM's capacity to drive tangible development outcomes.",
    activities: [
      "Innovation challenge grants for student and early-career researcher teams",
      "Design thinking and social entrepreneurship bootcamps for STEM innovators",
      "Community co-design workshops linking researchers to end-user needs",
      "Mentorship from scientists, engineers, and social enterprise founders",
      "Annual Innovation for Africa Showcase connecting projects to investors and policymakers",
      "Policy engagement translating innovation evidence into development programming",
    ],
    beneficiaries:
      "University students, early-career researchers, and young innovators developing STEM-based solutions to sustainable development challenges, with priority for projects serving underserved communities.",
    approach:
      "Innovation is evaluated on both scientific rigor and development relevance. We reject the false choice between excellence and impact—supporting projects that are methodologically sound and deeply rooted in community needs. Fellows receive both research mentorship and entrepreneurship coaching.",
    stats: [
      { label: "Projects funded (illustrative)", value: "145", isIllustrative: true },
      { label: "Pilot deployments (illustrative)", value: "38", isIllustrative: true },
      { label: "Social enterprises launched (illustrative)", value: "12", isIllustrative: true },
      { label: "Countries represented (illustrative)", value: "18", isIllustrative: true },
    ],
    galleryImageUrls: [
      images.programmes.innovation,
      images.gallery[0],
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    ],
    resources: [
      {
        title: "Innovation Challenge Grant Guidelines",
        description: "Application process, funding tiers, and evaluation criteria for project teams.",
        href: "/resources/innovation-grant-guidelines",
        type: "pdf",
      },
      {
        title: "From Lab to Impact: Social Innovation Guide",
        description: "Framework for translating STEM research into community-facing solutions.",
        href: "/resources/lab-to-impact-guide",
        type: "guide",
      },
      {
        title: "Sustainable Development Innovation FAQ",
        description: "Eligibility, timelines, and support available through the programme.",
        href: "/resources/innovation-sd-faq",
        type: "faq",
      },
    ],
    testimonials: [],
    heroImageUrl: images.programmes.innovation,
    icon: "leaf",
    isIllustrative: true,
  },
];

/** Retrieve a programme by its slug. */
export function getProgramBySlug(slug: ProgramSlug): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

/** Retrieve a programme by slug string (returns undefined if invalid). */
export function getProgramBySlugString(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
