/**
 * Sanity fallback layer.
 *
 * All functions try Sanity first. If Sanity is not yet configured
 * (missing project ID) they return the hardcoded data so the portfolio
 * always renders correctly during local development.
 */
import {
  PERSONAL_INFO,
  SKILLS,
  EXPERIENCES,
  PROJECTS,
  CERTIFICATES,
} from '@/data/portfolioData';
import {
  getProfile,
  getCertificates,
  getProjects,
  getSkills,
  getExperiences,
  getResume,
} from '@/sanity/queries';
import type {
  SanityProfile,
  SanityCertificate,
  SanityProject,
  SanitySkill,
  SanityExperience,
  SanityResume,
} from '@/sanity/types';

const SANITY_READY = !!(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'mahendiran-portfolio'
);

// ─── Profile ────────────────────────────────────────────────────────────────
export async function fetchProfile(): Promise<SanityProfile> {
  if (SANITY_READY) {
    try {
      const data = await getProfile();
      if (data) return data;
    } catch {}
  }
  // Fallback to hardcoded
  return {
    name: PERSONAL_INFO.name,
    role: PERSONAL_INFO.role,
    tagline: PERSONAL_INFO.tagline,
    aboutBio: PERSONAL_INFO.aboutBio,
    college: PERSONAL_INFO.college,
    location: PERSONAL_INFO.location,
    email: PERSONAL_INFO.email,
    phone: PERSONAL_INFO.phone,
    githubUrl: PERSONAL_INFO.github,
    linkedinUrl: PERSONAL_INFO.linkedin,
    instagramUrl: PERSONAL_INFO.instagram,
    availability: 'Open for Roles & Internships',
    profilePhotoUrl: '/mahendiran-profile.png',
    resumeUrl: '/Mahendiran_S_Resume.pdf',
  };
}

// ─── Certificates ────────────────────────────────────────────────────────────
export async function fetchCertificates(): Promise<SanityCertificate[]> {
  if (SANITY_READY) {
    try {
      const data = await getCertificates();
      if (data?.length) return data;
    } catch {}
  }
  return CERTIFICATES.map((c) => ({
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    category: c.category,
    date: c.date,
    credentialId: c.credentialId,
    downloadUrl: c.downloadUrl,
  }));
}

// ─── Projects ────────────────────────────────────────────────────────────────
export async function fetchProjects(): Promise<SanityProject[]> {
  if (SANITY_READY) {
    try {
      const data = await getProjects();
      if (data?.length) return data;
    } catch {}
  }
  return PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    longDescription: p.longDescription,
    technologies: p.technologies,
    features: p.features,
    architectureDetails: p.architectureDetails,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    status: p.status,
    featured: true,
    imageUrl: p.image,
  }));
}

// ─── Skills ──────────────────────────────────────────────────────────────────
export async function fetchSkills(): Promise<SanitySkill[]> {
  if (SANITY_READY) {
    try {
      const data = await getSkills();
      if (data?.length) return data;
    } catch {}
  }
  return SKILLS.map((s) => ({
    name: s.name,
    category: s.category,
    level: s.level,
    iconName: s.iconName,
    description: s.description,
  }));
}

// ─── Experience ───────────────────────────────────────────────────────────────
export async function fetchExperiences(): Promise<SanityExperience[]> {
  if (SANITY_READY) {
    try {
      const data = await getExperiences();
      if (data?.length) return data;
    } catch {}
  }
  return EXPERIENCES.map((e) => ({
    company: e.company,
    role: e.role,
    period: e.period,
    location: e.location,
    responsibilities: e.responsibilities,
    technologies: e.technologies,
  }));
}

// ─── Resume ───────────────────────────────────────────────────────────────────
export async function fetchResume(): Promise<SanityResume | null> {
  if (SANITY_READY) {
    try {
      const data = await getResume();
      if (data?.resumeUrl) return data;
    } catch {}
  }
  return {
    resumeUrl: '/Mahendiran_S_Resume.pdf',
    version: '2026 Official',
    lastUpdated: 'August 2026',
  };
}
