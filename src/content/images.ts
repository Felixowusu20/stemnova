/**
 * Centralized image URLs for STEMNova Foundation.
 * High-quality Unsplash imagery representing African STEM talent, labs, and innovation.
 */

export const images = {
  hero: {
    home: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80",
    about:
      "https://images.unsplash.com/photo-1531487487862-6abf10f6d48a?w=1920&q=90&auto=format&fit=crop",
    programs: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80",
    research:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=90&auto=format&fit=crop",
    impact: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80",
    contact: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    events: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80",
  },

  /** Homepage hero background carousel slides. */
  homeSlides: [
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80",
      alt: "Researchers collaborating in a modern laboratory",
    },
    {
      src: "https://images.unsplash.com/photo-1531487487862-6abf10f6d48a?w=1920&q=80",
      alt: "Young professionals collaborating around a shared workspace",
    },
    {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&q=80",
      alt: "Engineer working with precision lab equipment",
    },
    {
      src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&q=80",
      alt: "Scientific research and discovery in a laboratory",
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80",
      alt: "Students learning and collaborating together",
    },
  ],

  programmes: {
    youngScholars:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=90&auto=format&fit=crop",
    mentorship:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=90&auto=format&fit=crop",
    fellows:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=90&auto=format&fit=crop",
    quantum:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=90&auto=format&fit=crop",
    materials:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=90&auto=format&fit=crop",
    girlsScience:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&q=90&auto=format&fit=crop",
    teachers:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=90&auto=format&fit=crop",
    researchers:
      "https://images.unsplash.com/photo-1581093458791-9d42e3c7de29?w=1600&q=90&auto=format&fit=crop",
    innovation:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=90&auto=format&fit=crop",
  },

  gallery: [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    "https://images.unsplash.com/photo-1531487487862-6abf10f6d48a?w=800&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
  ],

  team: {
    founder1:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=90&auto=format&fit=crop",
    founder2:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=90&auto=format&fit=crop",
    members: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=90&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=90&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=90&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=90&auto=format&fit=crop",
    ],
  },

  blog: {
    default: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
  },

  placeholders: {
    partnerLogo: (name: string) =>
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0A2540&color=fff&size=128&bold=true`,
  },
} as const;
