"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import GithubSection from "@/components/GithubSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => setIsResumeOpen(true);
  const handleCloseResume = () => setIsResumeOpen(false);

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-white selection:text-black">
      {/* Sticky Glass Navbar */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Hero Section */}
      <Hero onOpenResume={handleOpenResume} />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Experience Section */}
      <Experience />

      {/* Projects Section */}
      <Projects />

      {/* Certificates Section */}
      <Certificates />

      {/* GitHub Open Source Telemetry Section */}
      <GithubSection />

      {/* Contact Section */}
      <Contact onOpenResume={handleOpenResume} />

      {/* Minimal Luxury Footer */}
      <Footer />

      {/* Interactive Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
    </main>
  );
}
