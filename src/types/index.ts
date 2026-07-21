/** Shared TypeScript types for STEMNova Foundation website content. */

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    region: string;
    country: string;
  };
  hours: {
    weekdays: string;
    saturday?: string;
    sunday?: string;
    note?: string;
  };
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  contact: ContactInfo;
  social: SocialLink[];
  announcementBar: {
    text: string;
    href?: string;
    dismissible: boolean;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  note?: string;
  isIllustrative: true;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization?: string;
  programSlug?: ProgramSlug;
  imageUrl?: string;
  isIllustrative: true;
}

export interface ProgramResource {
  title: string;
  description: string;
  href: string;
  type: "article" | "guide" | "video" | "infographic" | "pdf" | "faq" | "external";
}

export interface ProgramStat {
  label: string;
  value: string;
  isIllustrative: true;
}

export type ProgramSlug =
  | "young-scholars-stem-discovery"
  | "stemnova-mentorship-network"
  | "african-stem-fellows"
  | "quantum-education-leaders"
  | "materials-science-solid-state"
  | "girls-discover-science"
  | "stem-teachers-academy"
  | "young-african-researchers-fellowship"
  | "innovation-sustainable-development";

export type ProgramIcon =
  | "sparkles"
  | "users"
  | "award"
  | "atom"
  | "flask"
  | "venus"
  | "graduation"
  | "microscope"
  | "leaf";

export interface Program {
  slug: ProgramSlug;
  title: string;
  shortDescription: string;
  intro: string;
  objectives: string[];
  impactStatement: string;
  activities: string[];
  beneficiaries: string;
  approach: string;
  stats: ProgramStat[];
  galleryImageUrls: string[];
  resources: ProgramResource[];
  testimonials: Testimonial[];
  heroImageUrl: string;
  icon: ProgramIcon;
  isIllustrative: true;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: "search" | "venus" | "book" | "atom" | "network";
}

export interface StrategicPillar {
  id: string;
  title: string;
  description: string;
  icon: ProgramIcon | "globe" | "policy";
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: "atom" | "brain" | "cpu" | "flask" | "bot" | "leaf" | "file" | "network";
}

export interface RoadmapPhase {
  id: string;
  phase: number;
  title: string;
  timeframe: string;
  description: string;
  milestones: string[];
}

export interface GetInvolvedOption {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "mentor" | "volunteer" | "partner" | "sponsor" | "donate" | "fellowship" | "research";
  cta: string;
}

export type ProjectStatus = "active" | "upcoming" | "completed";

export interface ProjectUpdate {
  date: string;
  title: string;
  summary: string;
}

export interface ProjectSponsor {
  name: string;
  logoUrl: string;
  isPlaceholder: true;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  status: ProjectStatus;
  featured: boolean;
  goal?: number;
  raised?: number;
  currency: string;
  girlsSupported?: number;
  timeline: {
    start: string;
    end?: string;
    milestones: { date: string; label: string }[];
  };
  location: string;
  activities: string[];
  impact: string[];
  sponsors: ProjectSponsor[];
  updates: ProjectUpdate[];
  galleryImageUrls: string[];
  heroImageUrl: string;
  isIllustrative: true;
}

export interface ProgramBreakdown {
  programSlug: ProgramSlug;
  programTitle: string;
  percentage: number;
  description: string;
  isIllustrative: true;
}

export interface LocationImpact {
  name: string;
  region: string;
  girlsReached: number;
  schoolsPartnered: number;
  isIllustrative: true;
}

export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
  programSlug?: ProgramSlug;
  imageUrl: string;
  isIllustrative: true;
}

export interface BeforeAfterStory {
  id: string;
  title: string;
  before: string;
  after: string;
  programSlug?: ProgramSlug;
  isIllustrative: true;
}

export interface AnnualReport {
  year: number;
  title: string;
  summary: string;
  downloadUrl: string;
  isIllustrative: true;
}

export interface DonationUsage {
  category: string;
  percentage: number;
  description: string;
  isIllustrative: true;
}

export interface ImpactData {
  statistics: StatItem[];
  programBreakdown: ProgramBreakdown[];
  locations: LocationImpact[];
  successStories: SuccessStory[];
  beforeAfterStories: BeforeAfterStory[];
  annualReports: AnnualReport[];
  donationUsage: DonationUsage[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  email?: string;
  linkedin?: string;
  isFounder?: boolean;
  isIllustrative: true;
}

export type PartnerCategory =
  | "university"
  | "government"
  | "international"
  | "technology"
  | "ngo"
  | "research";

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  description: string;
  category: PartnerCategory;
  isPlaceholder: true;
}

export type EventCategory =
  | "conference"
  | "camp"
  | "hackathon"
  | "workshop"
  | "symposium"
  | "challenge"
  | "mentorship";

export interface Event {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  description: string;
  registrationRequired: boolean;
  registrationUrl?: string;
  imageUrl: string;
  galleryImageUrls?: string[];
  isPast: boolean;
  isIllustrative: true;
}

export type ResourceType =
  | "article"
  | "infographic"
  | "pdf"
  | "video"
  | "faq";

export type ResourceTopic =
  | "talent-discovery"
  | "research-leadership"
  | "women-in-stem"
  | "quantum"
  | "teachers"
  | "general";

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  topic: ResourceTopic;
  href: string;
  imageUrl?: string;
  publishedAt: string;
  isIllustrative: true;
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption: string;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  description: string;
  coverImageUrl: string;
  images: GalleryImage[];
}

export type BlogCategory =
  | "news"
  | "research"
  | "impact"
  | "events"
  | "thought-leadership"
  | "publications";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: BlogCategory;
  publishedAt: string;
  author: string;
  imageUrl: string;
  featured: boolean;
  isIllustrative: true;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: "excellence" | "equity" | "integrity" | "collaboration" | "innovation" | "leadership";
}

export interface TimelineMilestone {
  year: number;
  title: string;
  description: string;
  isIllustrative: true;
}

export interface GovernanceBody {
  id: string;
  title: string;
  description: string;
  members: string[];
}

export interface ValuesData {
  vision: string;
  mission: string;
  leadershipPhilosophy: string;
  coreValues: CoreValue[];
  aboutStory: string[];
  timeline: TimelineMilestone[];
  governance: GovernanceBody[];
  isIllustrative: true;
}

export type PaymentStatus = "pending" | "mock_success" | "mock_failed";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  message: string;
}

export interface DonationRequest {
  amount: number;
  currency: string;
  donorName?: string;
  donorEmail?: string;
  projectSlug?: string;
  message?: string;
}
