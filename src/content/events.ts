import { images } from "@/content/images";
import type { Event } from "@/types";

/**
 * Events — dummy schedule data for the public site.
 * Date, time, and registration will later be managed from the admin panel.
 */
export const events: Event[] = [
  {
    id: "evt-upcoming-1",
    slug: "africa-stem-leadership-summit-2026",
    title: "Africa STEM Leadership Summit 2026",
    category: "conference",
    date: "2026-03-15",
    time: "9:00 AM to 5:00 PM GMT",
    location: "Accra, Ghana",
    description:
      "STEMNova's flagship gathering for researchers, educators, policymakers, and funders advancing African scientific talent.",
    about:
      "The Africa STEM Leadership Summit brings together research leaders, educators, policymakers, and partners to share progress, forge collaborations, and strengthen pathways for African scientific talent. Sessions cover talent discovery, research leadership, and continental partnership models.",
    audience:
      "Researchers, university leaders, educators, policymakers, funders, and STEM programme partners across Africa.",
    highlights: [
      "Keynote conversations with African research leaders",
      "Panel sessions on talent pipelines and fellowships",
      "Networking across institutions and funders",
      "Showcases from STEMNova programme alumni",
    ],
    agenda: [
      { time: "9:00 AM", title: "Registration and welcome" },
      { time: "10:00 AM", title: "Opening keynote" },
      { time: "11:30 AM", title: "Talent discovery panel" },
      { time: "1:00 PM", title: "Lunch and networking" },
      { time: "2:30 PM", title: "Partnership roundtables" },
      { time: "4:30 PM", title: "Closing remarks" },
    ],
    registrationRequired: true,
    imageUrl: images.hero.events,
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-upcoming-2",
    slug: "young-scholars-discovery-camp-2026",
    title: "Young Scholars STEM Discovery Camp 2026",
    category: "camp",
    date: "2026-04-06",
    time: "8:00 AM to 4:00 PM GMT",
    location: "University of Ghana, Legon",
    description:
      "A five day immersive camp for secondary students with laboratory modules, research shadowing, and mentorship workshops.",
    about:
      "Young Scholars STEM Discovery Camp is an immersive experience for secondary students ready to explore laboratory science, computational thinking, and research careers. Participants join mentors for hands on modules and peer learning across STEM disciplines.",
    audience:
      "Secondary school students aged 14 to 19 with strong STEM interest, plus accompanying teachers from partner schools.",
    highlights: [
      "Laboratory immersion modules",
      "Research shadowing with university mentors",
      "Science communication workshops",
      "Peer cohorts and mentorship matching",
    ],
    agenda: [
      { time: "8:00 AM", title: "Check in and orientation" },
      { time: "9:00 AM", title: "Laboratory module" },
      { time: "12:00 PM", title: "Lunch break" },
      { time: "1:00 PM", title: "Research shadowing" },
      { time: "3:00 PM", title: "Mentorship circle" },
      { time: "4:00 PM", title: "Day wrap up" },
    ],
    registrationRequired: true,
    imageUrl: images.programmes.youngScholars,
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-upcoming-3",
    slug: "girls-discover-science-workshop-2026",
    title: "Girls Discover Science Workshop 2026",
    category: "workshop",
    date: "2026-05-20",
    time: "10:00 AM to 3:00 PM SAST",
    location: "Cape Town, South Africa",
    description:
      "Hands on STEM workshops, career panels, and mentor conversations for girls exploring science and engineering pathways.",
    about:
      "Girls Discover Science Workshop creates a welcoming space for girls to try engineering challenges, meet women scientists, and explore STEM career pathways. The day blends practical activities with mentoring and peer connection.",
    audience:
      "Girls in secondary school, parents or guardians, and women STEM mentors from partner organisations.",
    highlights: [
      "Hands on engineering challenge",
      "Women in Science role model panel",
      "Career pathway conversations",
      "Mentor mentee introductions",
    ],
    agenda: [
      { time: "10:00 AM", title: "Welcome and icebreakers" },
      { time: "10:30 AM", title: "Engineering challenge" },
      { time: "12:30 PM", title: "Lunch" },
      { time: "1:15 PM", title: "Women in Science panel" },
      { time: "2:15 PM", title: "Mentorship conversations" },
      { time: "3:00 PM", title: "Closing circle" },
    ],
    registrationRequired: true,
    imageUrl: images.programmes.girlsScience,
    isPast: false,
    isIllustrative: true,
  },
];

/** Retrieve upcoming events sorted by date. */
export function getUpcomingEvents(): Event[] {
  return events
    .filter((event) => !event.isPast)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Retrieve past events sorted by date (most recent first). */
export function getPastEvents(): Event[] {
  return events
    .filter((event) => event.isPast)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Retrieve an event by slug. */
export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}
