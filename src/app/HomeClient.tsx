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
} from '@/sanity/types';

interface HomeClientProps {
  profile: SanityProfile;
  certificates: SanityCertificate[];
  projects: SanityProject[];
  skills: SanitySkill[];
  experiences: SanityExperience[];
  resumeUrl: string;
}

export default function HomeClient({
  profile,
  certificates,
  projects,
  skills,
  experiences,
  resumeUrl,
}: HomeClientProps) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* 01 — Hero: Profile headline + social links */}
      <Hero profile={profile} onOpenResume={() => setIsResumeOpen(true)} />

      {/* 02 — About: Bio, stats, timeline */}
      <About profile={profile} />

      {/* 03 — Skills: Tech stack from CMS */}
      <Skills skills={skills} />

      {/* 04 — Experience: Work history from CMS */}
      <Experience experiences={experiences} />

      {/* 05 — Projects: Project showcase from CMS */}
      <Projects projects={projects} />

      {/* 06 — Certificates: From CMS with category filters */}
      <Certificates certificates={certificates} />

      {/* 07 — GitHub: Live API stats */}
      <GithubSection />

      {/* 08 — Contact: Uses profile CMS data for links */}
      <Contact profile={profile} onOpenResume={() => setIsResumeOpen(true)} />

      {/* Footer */}
      <Footer profile={profile} />

      {/* Resume Modal: PDF from CMS */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={resumeUrl}
      />
    </main>
  );
}
