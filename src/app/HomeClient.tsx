'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import GithubSection from '@/components/GithubSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ResumeModal from '@/components/ResumeModal';
import type {
  SanityProfile,
  SanityCertificate,
  SanityProject,
  SanitySkill,
  SanityExperience,
  SanityResume,
} from '@/sanity/types';

interface HomeClientProps {
  profile: SanityProfile;
  certificates: SanityCertificate[];
  projects: SanityProject[];
  skills: SanitySkill[];
  experiences: SanityExperience[];
  resume: SanityResume | null;
}

export default function HomeClient({
  profile,
  certificates,
  projects,
  skills,
  experiences,
  resume,
}: HomeClientProps) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const resumeUrl = resume?.resumeUrl ?? '/Mahendiran_S_Resume.pdf';

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      <Hero profile={profile} onOpenResume={() => setIsResumeOpen(true)} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Certificates certificates={certificates} />
      <GithubSection />
      <Contact profile={profile} onOpenResume={() => setIsResumeOpen(true)} />
      <Footer profile={profile} />
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={resumeUrl}
      />
    </main>
  );
}
