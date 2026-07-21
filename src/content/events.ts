import { images } from "@/content/images";
import type { Event } from "@/types";

/** Events — illustrative placeholder data, not confirmed schedules. */
export const events: Event[] = [
  {
    id: "evt-upcoming-1",
    slug: "africa-stem-leadership-summit-2026",
    title: "Africa STEM Leadership Summit 2026",
    category: "conference",
    date: "2026-03-15",
    time: "9:00 AM – 5:00 PM",
    location: "Accra International Conference Centre, Ghana",
    description:
      "STEMNova's flagship annual gathering bringing together researchers, educators, policymakers, and funders to advance African scientific talent development. Keynote addresses, programme showcases, and policy roundtables on STEM education reform. (Illustrative event — confirm details before promotion.)",
    registrationRequired: true,
    registrationUrl: "/events/africa-stem-leadership-summit-2026/register",
    imageUrl: images.hero.events,
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-upcoming-2",
    slug: "young-scholars-discovery-camp-2026",
    title: "Young Scholars STEM Discovery Camp — Easter 2026",
    category: "camp",
    date: "2026-04-06",
    time: "8:00 AM – 4:00 PM (5 days)",
    location: "University of Ghana, Legon Campus",
    description:
      "A five-day immersive camp for 120 selected secondary students featuring laboratory modules, research shadowing, mentorship introductions, and science communication workshops. Open to Young Scholars nominees from partner schools. (Illustrative event.)",
    registrationRequired: true,
    registrationUrl: "/events/young-scholars-discovery-camp-2026/register",
    imageUrl: images.programmes.youngScholars,
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-upcoming-3",
    slug: "sustainable-innovation-hackathon-2026",
    title: "Innovation for Africa Hackathon 2026",
    category: "hackathon",
    date: "2026-05-22",
    time: "48-hour event",
    location: "Placeholder African Tech Hub, Lagos, Nigeria",
    description:
      "A 48-hour hackathon challenging university teams to develop STEM solutions for climate resilience, renewable energy, and agricultural productivity. Mentorship from researchers and social entrepreneurs. Prizes include innovation grants. (Illustrative event.)",
    registrationRequired: true,
    registrationUrl: "/events/sustainable-innovation-hackathon-2026/register",
    imageUrl: images.programmes.innovation,
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-upcoming-4",
    slug: "quantum-education-workshop-2026",
    title: "Quantum Education Workshop for University Faculty",
    category: "workshop",
    date: "2026-06-10",
    time: "9:00 AM – 4:00 PM (3 days)",
    location: "Kigali, Rwanda",
    description:
      "A three-day intensive for university faculty developing quantum science curricula, co-facilitated with international quantum researchers. Modules cover foundational concepts, simulation tools, and curriculum integration strategies. (Illustrative event.)",
    registrationRequired: true,
    registrationUrl: "/events/quantum-education-workshop-2026/register",
    imageUrl: images.programmes.quantum,
    isPast: false,
    isIllustrative: true,
  },
  {
    id: "evt-past-1",
    slug: "girls-discover-science-symposium-2025",
    title: "Girls Discover Science Symposium 2025",
    category: "symposium",
    date: "2025-10-18",
    time: "10:00 AM – 4:00 PM",
    location: "University of Cape Town, South Africa",
    description:
      "Over 300 girls and 80 women scientist mentors gathered for STEM workshops, career panels, and peer networking. The symposium launched the Girls Discover Science Ambassadors programme in Southern Africa. (Illustrative past event.)",
    registrationRequired: false,
    imageUrl: images.programmes.girlsScience,
    galleryImageUrls: [
      images.programmes.girlsScience,
      images.gallery[3],
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    ],
    isPast: true,
    isIllustrative: true,
  },
  {
    id: "evt-past-2",
    slug: "stem-teachers-conference-2025",
    title: "STEM Teachers Academy Annual Conference 2025",
    category: "conference",
    date: "2025-08-14",
    time: "9:00 AM – 5:00 PM (2 days)",
    location: "Kumasi, Ghana",
    description:
      "420 educators from 180 partner schools shared classroom innovations, participated in master classes, and engaged policymakers on STEM curriculum reform. Best practice awards recognized outstanding teacher-led initiatives. (Illustrative past event.)",
    registrationRequired: true,
    imageUrl: images.programmes.teachers,
    galleryImageUrls: [
      images.programmes.teachers,
      images.gallery[1],
    ],
    isPast: true,
    isIllustrative: true,
  },
  {
    id: "evt-past-3",
    slug: "innovation-challenge-finals-2025",
    title: "Innovation for Africa Challenge — Finals 2025",
    category: "challenge",
    date: "2025-11-28",
    time: "2:00 PM – 6:00 PM",
    location: "Nairobi Innovation Hub, Kenya",
    description:
      "Twelve finalist teams presented sustainable development innovations to a panel of scientists, investors, and policymakers. Three teams received follow-on grants for pilot deployment. (Illustrative past event.)",
    registrationRequired: false,
    imageUrl: images.programmes.innovation,
    galleryImageUrls: [
      images.programmes.innovation,
      images.gallery[0],
    ],
    isPast: true,
    isIllustrative: true,
  },
  {
    id: "evt-past-4",
    slug: "mentorship-network-launch-2025",
    title: "STEMNova Mentorship Network Launch Event",
    category: "mentorship",
    date: "2025-02-20",
    time: "10:00 AM – 1:00 PM",
    location: "Accra, Ghana",
    description:
      "The inaugural mentor-mentee matching event connected 200 pairs across 12 STEM disciplines. Mentors and mentees participated in goal-setting workshops and signed structured mentorship agreements. (Illustrative past event.)",
    registrationRequired: true,
    imageUrl: images.programmes.mentorship,
    galleryImageUrls: [
      images.programmes.mentorship,
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    ],
    isPast: true,
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
