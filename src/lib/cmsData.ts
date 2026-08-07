/**
 * CMS Data Layer — Production Version (Sanity-First with Hardcoded-Fallback)
 *
 * All data is fetched from Sanity CMS.
 * Cache tags enable on-demand revalidation via Sanity webhooks.
 * Falls back gracefully to default content if Sanity dataset is empty or unconfigured.
 */
import {
  getProfile,
  getCertificates,
  getProjects,
  getSkills,
  getExperiences,
  getEducation,
  getAchievements,
  getHackathons,
  getResume,
  getTestimonials,
  getServices,
  getSocialLinks,
} from '@/sanity/queries';
import type {
  SanityProfile,
  SanityCertificate,
  SanityProject,
  SanitySkill,
  SanityExperience,
  SanityEducation,
  SanityAchievement,
  SanityHackathon,
  SanityResume,
  SanityTestimonial,
  SanityService,
  SanitySocialLink,
} from '@/sanity/types';
import {
  PROJECTS,
  CERTIFICATES,
  SKILLS,
  EXPERIENCES,
  PERSONAL_INFO,
} from '@/data/portfolioData';

// ─── Default Fallback Data ───────────────────────────────────────────────────

const DEFAULT_PROFILE: SanityProfile = {
  name: PERSONAL_INFO.name,
  role: PERSONAL_INFO.role,
  tagline: PERSONAL_INFO.tagline,
  email: PERSONAL_INFO.email,
  phone: PERSONAL_INFO.phone,
  location: PERSONAL_INFO.location,
  college: 'Mahendra Engineering College',
  aboutBio: PERSONAL_INFO.bio,
  availability: 'Open for Roles & Internships',
  githubUrl: PERSONAL_INFO.socialLinks.github,
  linkedinUrl: PERSONAL_INFO.socialLinks.linkedin,
  instagramUrl: PERSONAL_INFO.socialLinks.instagram,
  profilePhotoUrl: '/mahendiran-profile.png',
  resumeUrl: '/Mahendiran_S_Resume.pdf',
  githubUsername: 'Mahendiran-S',
};

const DEFAULT_PROJECTS: SanityProject[] = PROJECTS.map((p) => ({
  _id: p.id,
  id: p.id,
  title: p.title,
  category: p.category,
  shortDescription: p.description,
  description: p.description,
  longDescription: p.longDescription,
  detailedDescription: p.longDescription,
  technologies: p.technologies,
  techStack: p.technologies,
  status: p.status,
  githubUrl: p.githubUrl,
  liveUrl: p.liveUrl,
  thumbnailUrl: p.imageUrl,
  imageUrl: p.imageUrl,
  features: p.features,
  architecture: p.architecture,
  architectureDetails: p.architecture,
  featured: true,
}));

const DEFAULT_CERTIFICATES: SanityCertificate[] = CERTIFICATES.map((c) => ({
  _id: c.id,
  id: c.id,
  title: c.title,
  issuer: c.issuer,
  category: c.category,
  issueDate: c.date,
  date: c.date,
  credentialId: c.credentialId,
  downloadUrl: c.downloadUrl,
  verificationUrl: c.downloadUrl !== '#' ? c.downloadUrl : undefined,
  certificateImageUrl: c.badgeUrl ?? 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=600&q=80',
  featured: true,
}));

const DEFAULT_SKILLS: SanitySkill[] = SKILLS.map((s, idx) => ({
  _id: `skill-${idx}`,
  name: s.name,
  category: s.category,
  percentage: s.level,
  level: s.level,
  iconName: s.iconName,
  description: s.description,
  displayOrder: idx,
  featured: true,
}));

const DEFAULT_EXPERIENCES: SanityExperience[] = EXPERIENCES.map((e, idx) => ({
  _id: `exp-${idx}`,
  company: e.company,
  role: e.role,
  period: e.period,
  startDate: e.period.split('–')[0]?.trim() || e.period.split('-')[0]?.trim(),
  endDate: e.period.split('–')[1]?.trim() || e.period.split('-')[1]?.trim(),
  location: e.location,
  employmentType: e.employmentType || 'Internship',
  currentJob: e.currentJob || false,
  responsibilities: e.responsibilities,
  technologies: e.technologies,
  coreModules: [
    { title: "Expense Management System", description: "Automated claim submission, audit trail logs, multi-currency processing" },
    { title: "Salary Deduction Engine", description: "Enterprise payroll calculation logic integrating biometric attendance & loan logic" },
    { title: "Invoice Automation", description: "Dynamic vector PDF billing report generator and automated dispatch system" },
    { title: "Audit Dashboard", description: "Real-time query performance optimized data visualizer for corporate accounting" },
  ],
  displayOrder: idx,
  featured: true,
}));

const DEFAULT_EDUCATION: SanityEducation[] = [
  {
    _id: 'edu-1',
    college: 'Mahendra Engineering College',
    degree: 'B.Tech',
    department: 'Information Technology',
    branch: 'Information Technology',
    period: '2022 – 2026',
    startYear: '2022',
    endYear: '2026',
    cgpa: '8.5 / 10',
    description: 'Specializing in Software Engineering, Full Stack Web Development, Database Management, and Cloud Architectures.',
  },
];

// Helper that wraps a fetch and returns a fallback on error or empty array
async function safeFetch<T>(fn: () => Promise<T>, fallback: T, tag: string): Promise<T> {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!pid || pid === 'placeholder' || pid === 'your_project_id_here') {
    return fallback;
  }
  try {
    const result = await fn();
    // If result is empty array or null, use fallback
    if (Array.isArray(result) && result.length === 0) {
      return fallback;
    }
    return result ?? fallback;
  } catch (err) {
    console.warn(`[CMS] Failed to fetch ${tag}:`, err);
    return fallback;
  }
}

// ─── Profile ─────────────────────────────────────────────────────────────────
export async function fetchProfile(): Promise<SanityProfile> {
  const result = await safeFetch(getProfile, null, 'profile');
  return result ?? DEFAULT_PROFILE;
}

// ─── Certificates ─────────────────────────────────────────────────────────────
export async function fetchCertificates(): Promise<SanityCertificate[]> {
  return safeFetch(getCertificates, DEFAULT_CERTIFICATES, 'certificates');
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export async function fetchProjects(): Promise<SanityProject[]> {
  return safeFetch(getProjects, DEFAULT_PROJECTS, 'projects');
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export async function fetchSkills(): Promise<SanitySkill[]> {
  return safeFetch(getSkills, DEFAULT_SKILLS, 'skills');
}

// ─── Experience ───────────────────────────────────────────────────────────────
export async function fetchExperiences(): Promise<SanityExperience[]> {
  return safeFetch(getExperiences, DEFAULT_EXPERIENCES, 'experience');
}

// ─── Education ────────────────────────────────────────────────────────────────
export async function fetchEducation(): Promise<SanityEducation[]> {
  return safeFetch(getEducation, DEFAULT_EDUCATION, 'education');
}

// ─── Achievements ─────────────────────────────────────────────────────────────
export async function fetchAchievements(): Promise<SanityAchievement[]> {
  return safeFetch(getAchievements, [], 'achievements');
}

// ─── Hackathons ───────────────────────────────────────────────────────────────
export async function fetchHackathons(): Promise<SanityHackathon[]> {
  return safeFetch(getHackathons, [], 'hackathons');
}

// ─── Resume ───────────────────────────────────────────────────────────────────
export async function fetchResume(): Promise<SanityResume | null> {
  return safeFetch(getResume, null, 'resume');
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function fetchTestimonials(): Promise<SanityTestimonial[]> {
  return safeFetch(getTestimonials, [], 'testimonials');
}

// ─── Services ─────────────────────────────────────────────────────────────────
export async function fetchServices(): Promise<SanityService[]> {
  return safeFetch(getServices, [], 'services');
}

// ─── Social Links ─────────────────────────────────────────────────────────────
export async function fetchSocialLinks(): Promise<SanitySocialLink[]> {
  return safeFetch(getSocialLinks, [], 'social');
}
