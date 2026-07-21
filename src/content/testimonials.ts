import type { Testimonial } from "@/types";

/** Testimonials — illustrative placeholder quotes, not verified statements. */
export const testimonials: Testimonial[] = [
  {
    id: "t-student-1",
    quote:
      "Young Scholars showed me that research wasn't something that happened only in Europe or America. Meeting African scientists who looked like me and came from schools like mine changed everything about what I thought was possible.",
    author: "Abena Osei",
    role: "Student",
    organization: "Young Scholars Alumna, University of Ghana",
    programSlug: "young-scholars-stem-discovery",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    isIllustrative: true,
  },
  {
    id: "t-student-2",
    quote:
      "Girls Discover Science gave me a community of girls who love physics as much as I do. For the first time, I wasn't the only girl in the room asking questions about quantum mechanics.",
    author: "Efua Mensah",
    role: "Student",
    organization: "Girls Discover Science Participant, Accra",
    programSlug: "girls-discover-science",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    isIllustrative: true,
  },
  {
    id: "t-teacher-1",
    quote:
      "The STEM Teachers Academy didn't just give me new activities—it changed how I think about teaching science. My students are asking better questions, and so am I.",
    author: "Mr. Kofi Darko",
    role: "STEM Teacher",
    organization: "STEM Teachers Academy Graduate, Kumasi",
    programSlug: "stem-teachers-academy",
    isIllustrative: true,
  },
  {
    id: "t-researcher-1",
    quote:
      "The Young African Researchers Fellowship gave me the funding and mentorship I needed to finish my project when my university couldn't support it. I'm now a postdoc at a partner lab—and mentoring the next cohort.",
    author: "Dr. Samuel Adjei",
    role: "Research Fellow",
    organization: "Young African Researchers Fellowship Alumnus",
    programSlug: "young-african-researchers-fellowship",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    isIllustrative: true,
  },
  {
    id: "t-mentor-1",
    quote:
      "Mentoring through STEMNova is the most meaningful way I give back to African science. Watching my mentee publish her first paper reminded me why representation in mentorship matters.",
    author: "Prof. Adelaide Nyarko",
    role: "Mentor",
    organization: "Materials Science, Partner University",
    programSlug: "stemnova-mentorship-network",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80",
    isIllustrative: true,
  },
  {
    id: "t-researcher-2",
    quote:
      "African STEM Fellows transformed my career trajectory. The international exchange opened collaborations I couldn't have built alone, and the leadership training prepared me for my faculty appointment.",
    author: "Dr. Ama Ofori",
    role: "Research Fellow",
    organization: "African STEM Fellows Alumna",
    programSlug: "african-stem-fellows",
    isIllustrative: true,
  },
  {
    id: "t-partner-1",
    quote:
      "Partnering with STEMNova aligned with our university's mission to develop African research leaders. Their fellowship programmes produce graduates who strengthen our faculty pipeline.",
    author: "Prof. Emmanuel Boateng",
    role: "Vice-Chancellor",
    organization: "Placeholder Partner University (Illustrative)",
    isIllustrative: true,
  },
  {
    id: "t-partner-2",
    quote:
      "STEMNova's approach to quantum education is exactly what African higher education needs—building capacity from within rather than importing finished curricula. We are proud to co-develop pathways with them.",
    author: "Dr. Fatima Al-Hassan",
    role: "Director of Research",
    organization: "Placeholder International Quantum Institute (Illustrative)",
    programSlug: "quantum-education-leaders",
    isIllustrative: true,
  },
];

/** Filter testimonials by programme slug. */
export function getTestimonialsByProgram(
  programSlug: Testimonial["programSlug"]
): Testimonial[] {
  return testimonials.filter(
    (testimonial) => testimonial.programSlug === programSlug
  );
}

/** Retrieve a subset of testimonials for display. */
export function getFeaturedTestimonials(count: number): Testimonial[] {
  return testimonials.slice(0, count);
}
