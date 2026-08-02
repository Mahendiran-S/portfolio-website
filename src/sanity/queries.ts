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
  SanityTestimonial,
  SanityService,
  SanityWorkshop,
  SanityPublication,
  SanitySocialLink,
} from './types';

// ─── Profile ─────────────────────────────────────────────────────────────────
export async function getProfile(): Promise<SanityProfile | null> {
  return sanityClient.fetch(
    groq`*[_type == "profile"][0]{
      _id, name, role, tagline, aboutBio, college, location, email, phone,
      availability, yearsOfExperience, githubUrl, githubUsername,
      linkedinUrl, instagramUrl, twitterUrl, portfolioUrl,
      "profilePhotoUrl": profilePhoto.asset->url,
      "resumeUrl": resumeFile.asset->url
    }`,
    {},
    { next: { tags: ['profile'] } }
  );
}

// ─── Certificates ─────────────────────────────────────────────────────────────
export async function getCertificates(): Promise<SanityCertificate[]> {
  return sanityClient.fetch(
    groq`*[_type == "certificate" && published == true] | order(_createdAt desc){
      _id, title, issuer, category, issueDate, expiryDate,
      credentialId, verificationUrl, downloadUrl, tags, featured,
      "certificateImageUrl": certificateImage.asset->url
    }`,
    {},
    { next: { tags: ['certificates'] } }
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export async function getProjects(): Promise<SanityProject[]> {
  return sanityClient.fetch(
    groq`*[_type == "project" && published == true] | order(displayOrder asc, _createdAt desc){
      _id, title, slug, category, shortDescription, detailedDescription,
      problemStatement, solution, features, architecture, techStack,
      githubUrl, liveUrl, status, featured, displayOrder, completedDate,
      "thumbnailUrl": thumbnail.asset->url,
      "galleryImageUrls": galleryImages[].asset->url
    }`,
    {},
    { next: { tags: ['projects'] } }
  );
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  return sanityClient.fetch(
    groq`*[_type == "project" && published == true && featured == true] | order(displayOrder asc){
      _id, title, slug, category, shortDescription, techStack, status,
      githubUrl, liveUrl, featured,
      "thumbnailUrl": thumbnail.asset->url
    }`,
    {},
    { next: { tags: ['projects'] } }
  );
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  return sanityClient.fetch(
    groq`*[_type == "project" && slug.current == $slug && published == true][0]{
      _id, title, slug, category, shortDescription, detailedDescription,
      problemStatement, solution, features, architecture, techStack,
      githubUrl, liveUrl, status, featured, completedDate,
      "thumbnailUrl": thumbnail.asset->url,
      "galleryImageUrls": galleryImages[].asset->url
    }`,
    { slug } as unknown as Record<string, string>,
    { next: { tags: ['projects'] } }
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export async function getSkills(): Promise<SanitySkill[]> {
  return sanityClient.fetch(
    groq`*[_type == "skill" && published == true] | order(category asc, displayOrder asc){
      _id, name, category, percentage, iconName, description, featured, displayOrder
    }`,
    {},
    { next: { tags: ['skills'] } }
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
export async function getExperiences(): Promise<SanityExperience[]> {
  return sanityClient.fetch(
    groq`*[_type == "experience" && published == true] | order(displayOrder asc, startDate desc){
      _id, company, role, employmentType, location, startDate, endDate,
      currentJob, description, responsibilities, technologies, website, displayOrder, featured,
      "period": select(
        currentJob == true => startDate + " – Present",
        endDate != null => startDate + " – " + endDate,
        startDate
      ),
      "logoUrl": companyLogo.asset->url
    }`,
    {},
    { next: { tags: ['experience'] } }
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
export async function getEducation(): Promise<SanityEducation[]> {
  return sanityClient.fetch(
    groq`*[_type == "education" && published == true] | order(displayOrder asc, startYear desc){
      _id, college, degree, department, startYear, endYear, period, cgpa, description, displayOrder,
      "logoUrl": logo.asset->url
    }`,
    {},
    { next: { tags: ['education'] } }
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────
export async function getAchievements(): Promise<SanityAchievement[]> {
  return sanityClient.fetch(
    groq`*[_type == "achievement" && published == true] | order(_createdAt desc){
      _id, title, description, date, category, link,
      "imageUrl": image.asset->url
    }`,
    {},
    { next: { tags: ['achievements'] } }
  );
}

// ─── Hackathons ───────────────────────────────────────────────────────────────
export async function getHackathons(): Promise<SanityHackathon[]> {
  return sanityClient.fetch(
    groq`*[_type == "hackathon" && published == true] | order(_createdAt desc){
      _id, eventName, organizer, result, description, date, teamSize, prize, technologies,
      "certificateUrl": certificate.asset->url
    }`,
    {},
    { next: { tags: ['hackathons'] } }
  );
}

// ─── Resume ───────────────────────────────────────────────────────────────────
export async function getResume(): Promise<SanityResume | null> {
  return sanityClient.fetch(
    groq`*[_type == "resume" && published == true] | order(_updatedAt desc)[0]{
      _id, version, lastUpdated, notes,
      "resumeUrl": resumePdf.asset->url
    }`,
    {},
    { next: { tags: ['resume'] } }
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return sanityClient.fetch(
    groq`*[_type == "testimonial" && published == true] | order(featured desc, _createdAt desc){
      _id, name, role, company, testimonial, rating, featured,
      "avatarUrl": avatar.asset->url
    }`,
    {},
    { next: { tags: ['testimonials'] } }
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
export async function getServices(): Promise<SanityService[]> {
  return sanityClient.fetch(
    groq`*[_type == "service" && published == true] | order(displayOrder asc){
      _id, title, description, icon, features, price, featured, displayOrder
    }`,
    {},
    { next: { tags: ['services'] } }
  );
}

// ─── Workshops ────────────────────────────────────────────────────────────────
export async function getWorkshops(): Promise<SanityWorkshop[]> {
  return sanityClient.fetch(
    groq`*[_type == "workshop" && published == true] | order(_createdAt desc){
      _id, title, organizer, description, date, duration,
      "certificateUrl": certificate.asset->url
    }`,
    {},
    { next: { tags: ['workshops'] } }
  );
}

// ─── Publications ─────────────────────────────────────────────────────────────
export async function getPublications(): Promise<SanityPublication[]> {
  return sanityClient.fetch(
    groq`*[_type == "publication" && published == true] | order(_createdAt desc){
      _id, title, description, url, publisher, date,
      "imageUrl": image.asset->url
    }`,
    {},
    { next: { tags: ['publications'] } }
  );
}

// ─── Social Links ─────────────────────────────────────────────────────────────
export async function getSocialLinks(): Promise<SanitySocialLink[]> {
  return sanityClient.fetch(
    groq`*[_type == "socialLink" && published == true]{
      _id, platform, url, handle, icon
    }`,
    {},
    { next: { tags: ['social'] } }
  );
}

// ─── Search ───────────────────────────────────────────────────────────────────
export async function searchProjects(searchQuery: string): Promise<SanityProject[]> {
  return sanityClient.fetch(
    groq`*[_type == "project" && published == true && (
      title match $searchQuery + "*" ||
      shortDescription match $searchQuery + "*" ||
      category match $searchQuery + "*" ||
      $searchQuery in techStack[]
    )] | order(displayOrder asc){
      _id, title, slug, category, shortDescription, techStack, status, featured,
      "thumbnailUrl": thumbnail.asset->url
    }`,
    { searchQuery } as unknown as Record<string, string>
  );
}

export async function searchCertificates(searchQuery: string): Promise<SanityCertificate[]> {
  return sanityClient.fetch(
    groq`*[_type == "certificate" && published == true && (
      title match $searchQuery + "*" ||
      issuer match $searchQuery + "*" ||
      category match $searchQuery + "*"
    )] | order(_createdAt desc){
      _id, title, issuer, category, issueDate, verificationUrl,
      "certificateImageUrl": certificateImage.asset->url
    }`,
    { searchQuery } as unknown as Record<string, string>
  );
}
