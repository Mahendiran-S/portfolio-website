"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Sparkles, ZoomIn, ZoomOut, RotateCcw, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Lock background body scrolling when modal is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("overflow-hidden");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window (Fixed 88vh height & Flex Column Layout) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="relative w-full max-w-4xl h-[88vh] flex flex-col glass-card rounded-3xl border border-white/20 overflow-hidden shadow-2xl bg-[#0c0c0e]/95 z-10 my-auto"
        >
          {/* Sticky Header Bar */}
          <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#0c0c0e]/95 backdrop-blur-xl shrink-0 gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-gray-300">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="font-bold text-white uppercase tracking-wider">RESUME VIEWER • MAHENDIRAN S</span>
            </div>

            {/* Controls Toolbar: Zoom + Direct Download + Close */}
            <div className="flex items-center gap-3">
              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 font-mono text-[10px] text-gray-400 min-w-[40px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {zoomLevel !== 1 && (
                  <button
                    onClick={handleResetZoom}
                    className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Direct Download Button */}
              <a
                href="/Mahendiran_S_Resume.pdf"
                download="Mahendiran_S_Resume.pdf"
                className="px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              {/* Sticky Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all"
                aria-label="Close Resume Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dedicated Scrollable Resume Content Container */}
          <div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-8 space-y-8 font-sans scrollbar-thin"
          >
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top center", transition: "transform 0.2s ease-out" }}
              className="space-y-8 max-w-3xl mx-auto text-gray-200 pb-12"
            >
              {/* PAGE 1 CANVAS CONTAINER */}
              <div className="p-8 sm:p-10 rounded-2xl glass-card border border-white/15 bg-[#0a0a0c] shadow-2xl space-y-6">
                
                {/* Header */}
                <div className="border-b border-white/15 pb-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-black font-space text-white tracking-tight">
                      MAHENDIRAN S
                    </h1>
                    <span className="text-sm font-mono font-bold text-gray-300">
                      Software Developer
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-400 pt-2">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-white/60" />
                      mahendirans002@gmail.com
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-white/60" />
                      +918610774327
                    </span>
                    <span>|</span>
                    <a
                      href="https://www.linkedin.com/in/mahendiran-s-/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white flex items-center gap-1 underline"
                    >
                      <LinkedinIcon className="w-3 h-3" />
                      LinkedIn
                    </a>
                    <span>|</span>
                    <a
                      href="https://github.com/Mahendiran-S"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white flex items-center gap-1 underline"
                    >
                      <GithubIcon className="w-3 h-3" />
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-2 border-b border-white/10 pb-1">
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-xs leading-relaxed text-gray-300">
                    Dynamic Software Developer specializing in full-stack development, low-code solutions, and web design. Deep understanding of backend security, database architecture, and modern web technologies. Driven by the challenge of solving complex problems and building robust, user-centric applications. Strong believer in the power of clean code, scalable systems, and continuous innovation. Ready to contribute technical skills and creative problem-solving to forward-thinking development teams.
                  </p>
                </div>

                {/* Core Competencies */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-2 border-b border-white/10 pb-1">
                    CORE COMPETENCIES
                  </h2>
                  <p className="text-xs leading-relaxed text-gray-300">
                    <strong className="text-white">Full Stack Developer:</strong> with experience in building and deploying web applications using HTML, CSS, JavaScript, and React. Skilled in backend development with Node.js and Java (Spring Boot), RESTful APIs, and database management (MySQL, MongoDB). Familiar with authentication (JWT), version control using Git, and deployment on Vercel and Netlify. Strong foundation in data structures, debugging, and performance optimization, python(basics), MS-Excel.
                  </p>
                </div>

                {/* Work Experience */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-3 border-b border-white/10 pb-1">
                    WORK EXPERIENCE
                  </h2>

                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-between items-baseline text-xs font-bold text-white">
                      <span>Full stack-Developer Intern</span>
                      <span className="font-mono text-[11px] text-gray-400">Dec 2024–Jan 2025</span>
                    </div>
                    <div className="text-xs font-mono text-gray-400 font-semibold mb-2">
                      Cognifyz Technology
                    </div>

                    <ul className="space-y-1.5 text-xs text-gray-300 list-disc list-inside pl-1">
                      <li>Developed and contributed to full stack web applications using frontend and backend technologies</li>
                      <li>Built responsive user interfaces and integrated them with backend services</li>
                      <li>Designed and consumed RESTful APIs for efficient client-server communication</li>
                      <li>Worked with databases to perform CRUD operations and basic schema design</li>
                      <li>Implemented authentication mechanisms and handled application security basics</li>
                      <li>Collaborated on debugging, testing, and improving application performance</li>
                      <li>Gained hands-on experience in real-world development workflows and deployment</li>
                    </ul>
                  </div>
                </div>

                {/* Projects Section - Page 1 Part */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-3 border-b border-white/10 pb-1">
                    PROJECTS
                  </h2>

                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-between items-baseline text-xs font-bold text-white">
                      <span>BookMyEvent — Full stack-developer</span>
                      <span className="font-mono text-[11px] text-gray-400">Jan 2026 – Present</span>
                    </div>

                    <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside pl-1">
                      <li>Developed a full-stack College Event Management System that enables seamless interaction between Admin, Organizer, and Student roles. The system allows administrators to manage organizers, organizers to create and manage events, and students to browse and register for events with QR-based ticket generation.</li>
                      <li>The application is built using React (Vite), HTML, CSS, and JavaScript, with Supabase/Firebase handling authentication and database operations.</li>
                      <li>It features a role-based access system, real-time data handling, and a responsive UI optimized for both web and mobile devices.</li>
                      <li>Advanced functionalities include an integrated AI assistant for natural language event queries, automated event registration, and organizer analytics.</li>
                      <li>The system also supports CSV export of participant data, secure authentication, and structured database design for scalability.</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center pt-2 text-[10px] font-mono text-gray-600">
                  — Page 1 of 2 —
                </div>

              </div>

              {/* PAGE 2 CANVAS CONTAINER */}
              <div className="p-8 sm:p-10 rounded-2xl glass-card border border-white/15 bg-[#0a0a0c] shadow-2xl space-y-6">
                
                {/* BookMyEvent Continued */}
                <div className="border-b border-white/10 pb-4">
                  <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside pl-1">
                    <li>This project demonstrates strong skills in full-stack development, database design, authentication, UI/UX design, and AI integration, making it a comprehensive solution for managing college-level events efficiently.</li>
                  </ul>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-3 border-b border-white/10 pb-1">
                    EDUCATION
                  </h2>

                  <div className="flex flex-wrap justify-between items-baseline text-xs font-bold text-white">
                    <span>Mahendra Engineering College</span>
                    <span className="font-mono text-[11px] text-gray-400">June 2024–June 2028</span>
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    Bachelor of Information Technology
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-3 border-b border-white/10 pb-1">
                    ADDITIONAL INFORMATION
                  </h2>

                  <h3 className="text-xs font-mono text-gray-400 uppercase font-bold mb-2">
                    ACHIEVEMENTS & CERTIFICATION
                  </h3>

                  <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside pl-1">
                    <li>Completed a Full Stack Development Internship at Cognifyz Technologies, gaining hands-on experience in real-world web application development</li>
                    <li>Completed foundational programming courses in Python and C, building strong problem-solving basics</li>
                    <li>Earned certification in UI/UX Design (Beginner), understanding core design principles and user experience concepts</li>
                    <li>Participated in hackathons, gaining hands-on experience in real-time problem solving and teamwork</li>
                    <li>Completed multiple online technical courses to strengthen development skills</li>
                    <li>Actively engaged in learning new technologies and improving practical development knowledge</li>
                  </ul>
                </div>

                {/* Page 2 Footer Links */}
                <div className="pt-6 border-t border-white/10 text-center text-xs font-mono text-gray-400">
                  <span>https://www.linkedin.com/in/mahendiran-s-/</span>
                  <span className="mx-2">||</span>
                  <span>https://github.com/Mahendiran-S</span>
                </div>

                <div className="text-center pt-2 text-[10px] font-mono text-gray-600">
                  — Page 2 of 2 —
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
