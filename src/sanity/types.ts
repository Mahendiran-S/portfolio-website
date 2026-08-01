// ─── Sanity CMS TypeScript Interfaces ─────────────────────────────────────────

export interface SanityProfile {
  name: string;
  role: string;
  tagline?: string;
  aboutBio?: string;
  college?: string;
  location?: string;
  email?: string;
  phone?: string;
  availability?: string;
  yearsOfExperience?: number;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  profilePhotoUrl?: string;
  resumeUrl?: string;
}

export interface SanityCertificate {
  id: string;
  title: string;
  issuer: string;
  category: 'AWS' | 'NPTEL' | 'Internship' | 'Hackathons' | 'Workshops';
  date: string;
  credentialId?: string;
  downloadUrl?: string;
  certificateImageUrl?: string;
}

export interface SanityProject {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features?: string[];
  architectureDetails?: string;
  githubUrl?: string;
  liveUrl?: string;
  status: 'Featured' | 'Completed' | 'In Development' | 'Production';
  featured?: boolean;
  displayOrder?: number;
  imageUrl?: string;
}

export interface SanitySkill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools';
  level: number;
  iconName: string;
  description?: string;
  displayOrder?: number;
}

export interface SanityExperience {
  company: string;
  role: string;
  employmentType?: string;
  period: string;
  location?: string;
  website?: string;
  responsibilities: string[];
  technologies: string[];
  displayOrder?: number;
  logoUrl?: string;
}

export interface SanityEducation {
  college: string;
  degree: string;
  branch?: string;
  startYear?: string;
  endYear?: string;
  period?: string;
  cgpa?: string;
  description?: string;
  logoUrl?: string;
}

export interface SanityAchievement {
  title: string;
  description?: string;
  date?: string;
  category?: string;
  imageUrl?: string;
}

export interface SanityHackathon {
  eventName: string;
  organizer?: string;
  result?: string;
  description?: string;
  date?: string;
  certificateUrl?: string;
}

export interface SanityResume {
  resumeUrl: string;
  lastUpdated?: string;
  version?: string;
}
