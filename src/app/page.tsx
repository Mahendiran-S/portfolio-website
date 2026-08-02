/**
 * Home Page — Server Component with On-Demand ISR
 *
 * - Fetches all content from Sanity CMS at request time
 * - Cache tags enable instant revalidation via /api/revalidate webhook
 * - No hardcoded content — everything comes from Sanity
 */
import {
  fetchProfile,
  fetchCertificates,
  fetchProjects,
  fetchSkills,
  fetchExperiences,
  fetchResume,
} from '@/lib/cmsData';
import HomeClient from './HomeClient';

// Use tag-based revalidation (webhook triggers revalidateTag)
// Fallback: revalidate every 5 minutes if webhook is not configured
export const revalidate = 300;

export default async function Home() {
  const [profile, certificates, projects, skills, experiences, resume] =
    await Promise.all([
      fetchProfile(),
      fetchCertificates(),
      fetchProjects(),
      fetchSkills(),
      fetchExperiences(),
      fetchResume(),
    ]);

  // Determine resume URL: CMS first, then local fallback
  const resumeUrl = resume?.resumeUrl ?? '/Mahendiran_S_Resume.pdf';

  return (
    <HomeClient
      profile={profile}
      certificates={certificates}
      projects={projects}
      skills={skills}
      experiences={experiences}
      resumeUrl={resumeUrl}
    />
  );
}
