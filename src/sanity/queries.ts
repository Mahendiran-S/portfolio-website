import { groq } from 'next-sanity';
import { sanityClient } from './client';
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
} from './types';

// ─── Profile ────────────────────────────────────────────────────────────────
export async function getProfile(): Promise<SanityProfile | null> {
  return sanityClient.fetch(
    groq`*[_type == "profile"][0]{
      name, role, tagline, aboutBio, college, location, email, phone,
      availability, yearsOfExperience, githubUrl, linkedinUrl, instagramUrl,
      "profilePhotoUrl": profilePhoto.asset->url,
      "resumeUrl": resumeFile.asset->url
    }`
  );
}

// ─── Certificates ────────────────────────────────────────────────────────────
export async function getCertificates(): Promise<SanityCertificate[]> {
  return sanityClient.fetch(
    groq`*[_type == "certificate" && published == true] | order(_createdAt desc){
      id, title, issuer, category, date, credentialId, downloadUrl,
      "certificateImageUrl": certificateImage.asset->url
    }`
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────
export async function getProjects(): Promise<SanityProject[]> {
  return sanityClient.fetch(
    groq`*[_type == "project" && published == true] | order(displayOrder asc, _createdAt desc){
      id, title, category, description, longDescription, technologies, features,
      architectureDetails, githubUrl, liveUrl, status, featured, displayOrder,
      "imageUrl": image.asset->url
    }`
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────
export async function getSkills(): Promise<SanitySkill[]> {
  return sanityClient.fetch(
    groq`*[_type == "skill" && published == true] | order(category asc, displayOrder asc){
      name, category, level, iconName, description, displayOrder
    }`
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
export async function getExperiences(): Promise<SanityExperience[]> {
  return sanityClient.fetch(
    groq`*[_type == "experience" && published == true] | order(displayOrder asc){
      company, role, employmentType, period, location, website,
      responsibilities, technologies, displayOrder,
      "logoUrl": companyLogo.asset->url
    }`
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
export async function getEducation(): Promise<SanityEducation[]> {
  return sanityClient.fetch(
    groq`*[_type == "education" && published == true] | order(_createdAt asc){
      college, degree, branch, startYear, endYear, period, cgpa, description,
      "logoUrl": logo.asset->url
    }`
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────
export async function getAchievements(): Promise<SanityAchievement[]> {
  return sanityClient.fetch(
    groq`*[_type == "achievement" && published == true] | order(_createdAt desc){
      title, description, date, category,
      "imageUrl": image.asset->url
    }`
  );
}

// ─── Hackathons ───────────────────────────────────────────────────────────────
export async function getHackathons(): Promise<SanityHackathon[]> {
  return sanityClient.fetch(
    groq`*[_type == "hackathon" && published == true] | order(_createdAt desc){
      eventName, organizer, result, description, date,
      "certificateUrl": certificate.asset->url
    }`
  );
}

// ─── Resume ───────────────────────────────────────────────────────────────────
export async function getResume(): Promise<SanityResume | null> {
  return sanityClient.fetch(
    groq`*[_type == "resume"][0] | order(_updatedAt desc){
      lastUpdated, version,
      "resumeUrl": resumePdf.asset->url
    }`
  );
}
