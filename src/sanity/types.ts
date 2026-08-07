// ─── Sanity CMS TypeScript Types ─────────────────────────────────────────────
// These interfaces match exactly what Sanity GROQ queries return (with resolved URLs)

export interface SanityProfile {
  _id?: string;
  name: string;
  role: string;
  tagline?: string;
  email?: string;
  phone?: string;
  location?: string;
  college?: string;
  aboutBio?: string;
  availability?: string;
  yearsOfExperience?: number;
  // Resolved asset URLs (from GROQ projections)
  profilePhotoUrl?: string;
  resumeUrl?: string;
  // Social links
  githubUrl?: string;
  githubUsername?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  portfolioUrl?: string;
}

export interface SanityExperienceCoreModule {
  title: string;
  description?: string;
}

export interface SanityExperience {
  _id?: string;
  id?: string;  // _id alias
  company: string;
  role: string;
  employmentType?: string;
  location?: string;
  remote?: boolean;
  startDate?: string;
  endDate?: string;
  period?: string;   // alias — derived from startDate + endDate
  currentJob?: boolean;
  shortDescription?: string;
  description?: string;
  coreModules?: SanityExperienceCoreModule[];
  responsibilities?: string[];
  technologies?: string[];
  achievements?: string[];
  website?: string;
  displayOrder?: number;
  featured?: boolean;
  published?: boolean;
  themeColor?: string;
  // Resolved
  logoUrl?: string;
}

export interface SanityProject {
  _id?: string;
  id?: string;  // _id alias used by components
  title: string;
  slug?: { current: string };
  shortDescription?: string;
  detailedDescription?: string;
  longDescription?: string;  // alias for detailedDescription
  description?: string;      // alias for shortDescription
  problemStatement?: string;
  solution?: string;
  architecture?: string;
  architectureDetails?: string;  // alias for architecture
  features?: string[];
  techStack?: string[];
  technologies?: string[];  // alias for techStack
  githubUrl?: string;
  liveUrl?: string;
  status?: string;
  category?: string;
  featured?: boolean;
  displayOrder?: number;
  completedDate?: string;
  // Resolved
  thumbnailUrl?: string;
  imageUrl?: string;  // alias for thumbnailUrl
  galleryImageUrls?: string[];
}

export interface SanityCertificate {
  _id?: string;
  id?: string;
  title: string;
  issuer: string;
  issueDate?: string;
  date?: string;  // alias for issueDate
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  downloadUrl?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  // Resolved
  certificateImageUrl?: string;
  badgeUrl?: string;  // alias for certificateImageUrl
}

export interface SanitySkill {
  _id?: string;
  name: string;
  category?: string;
  percentage?: number;
  level?: number;  // alias for percentage
  iconName?: string;
  description?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface SanityEducation {
  _id?: string;
  college: string;
  degree?: string;
  department?: string;
  branch?: string;  // alias for department
  startYear?: string;
  endYear?: string;
  period?: string;
  cgpa?: string;
  description?: string;
  displayOrder?: number;
  // Resolved
  logoUrl?: string;
}

export interface SanityAchievement {
  _id?: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  link?: string;
  // Resolved
  imageUrl?: string;
}

export interface SanityHackathon {
  _id?: string;
  eventName: string;
  organizer?: string;
  result?: string;
  description?: string;
  date?: string;
  teamSize?: number;
  prize?: string;
  technologies?: string[];
  // Resolved
  certificateUrl?: string;
}

export interface SanityResume {
  _id?: string;
  version?: string;
  lastUpdated?: string;
  notes?: string;
  published?: boolean;
  // Resolved
  resumeUrl?: string;
}

export interface SanityTestimonial {
  _id?: string;
  name: string;
  role?: string;
  company?: string;
  testimonial: string;
  rating?: number;
  featured?: boolean;
  // Resolved
  avatarUrl?: string;
}

export interface SanityService {
  _id?: string;
  title: string;
  description?: string;
  icon?: string;
  features?: string[];
  price?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface SanityWorkshop {
  _id?: string;
  title: string;
  organizer?: string;
  description?: string;
  date?: string;
  duration?: string;
  // Resolved
  certificateUrl?: string;
}

export interface SanityPublication {
  _id?: string;
  title: string;
  description?: string;
  url?: string;
  publisher?: string;
  date?: string;
  // Resolved
  imageUrl?: string;
}

export interface SanitySocialLink {
  _id?: string;
  platform: string;
  url: string;
  handle?: string;
  icon?: string;
}
