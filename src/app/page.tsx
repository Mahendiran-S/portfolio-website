// Server Component – fetches all CMS data at request time (ISR)
import { Suspense } from 'react';
import {
  fetchProfile,
  fetchCertificates,
  fetchProjects,
  fetchSkills,
  fetchExperiences,
  fetchResume,
} from '@/lib/cmsData';
import HomeClient from './HomeClient';

// ISR: revalidate every 60 seconds so new Sanity publishes appear quickly
export const revalidate = 60;

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

  return (
    <HomeClient
      profile={profile}
      certificates={certificates}
      projects={projects}
      skills={skills}
      experiences={experiences}
      resume={resume}
    />
  );
}
