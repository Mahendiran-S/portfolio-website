/**
 * CMS Data Layer — Production Version
 *
 * All data is fetched from Sanity CMS.
 * Cache tags enable on-demand revalidation via Sanity webhooks.
 * Falls back gracefully to empty/default values if Sanity is not configured.
 *
 * Workflow:
 *   Publish in Sanity Studio
 *   → Sanity sends webhook to /api/revalidate
 *   → Next.js revalidates the cache tag for that content type
 *   → Portfolio updates within seconds — NO redeployment needed
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

// Helper that wraps a fetch and returns a fallback on error
async function safeFetch<T>(fn: () => Promise<T>, fallback: T, tag: string): Promise<T> {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!pid || pid === 'placeholder' || pid === 'your_project_id_here') {
    return fallback;
  }
  try {
    const result = await fn();
    return result ?? fallback;
  } catch (err) {
    console.warn(`[CMS] Failed to fetch ${tag}:`, err);
    return fallback;
  }
}

// ─── Profile ─────────────────────────────────────────────────────────────────
export async function fetchProfile(): Promise<SanityProfile> {
  const result = await safeFetch(getProfile, null, 'profile');
  return result ?? {
    name: 'MAHENDIRAN S',
    role: 'Software Developer',
    tagline: 'Building scalable, modern, and user-friendly web applications with clean code and elegant design.',
    email: 'mahendirans002@gmail.com',
    phone: '+91 86107 74327',
    location: 'Tamil Nadu, India',
    aboutBio: 'Dynamic Software Developer specializing in full-stack development, low-code solutions, and web design.',
    availability: 'Open for Roles & Internships',
    githubUrl: 'https://github.com/Mahendiran-S',
    linkedinUrl: 'https://www.linkedin.com/in/mahendiran-s-/',
    instagramUrl: 'https://www.instagram.com/toxin_artist_0210/',
    profilePhotoUrl: '/mahendiran-profile.png',
    resumeUrl: '/Mahendiran_S_Resume.pdf',
    githubUsername: 'Mahendiran-S',
  };
}

// ─── Certificates ─────────────────────────────────────────────────────────────
export async function fetchCertificates(): Promise<SanityCertificate[]> {
  return safeFetch(getCertificates, [], 'certificates');
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export async function fetchProjects(): Promise<SanityProject[]> {
  return safeFetch(getProjects, [], 'projects');
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export async function fetchSkills(): Promise<SanitySkill[]> {
  return safeFetch(getSkills, [], 'skills');
}

// ─── Experience ───────────────────────────────────────────────────────────────
export async function fetchExperiences(): Promise<SanityExperience[]> {
  return safeFetch(getExperiences, [], 'experience');
}

// ─── Education ────────────────────────────────────────────────────────────────
export async function fetchEducation(): Promise<SanityEducation[]> {
  return safeFetch(getEducation, [], 'education');
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
