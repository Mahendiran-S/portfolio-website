"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SanityProject } from "@/sanity/types";
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface ProjectModalProps {
  project: SanityProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock background body scrolling when modal is active
  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
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
          className="relative w-full max-w-4xl h-[88vh] flex flex-col glass-card rounded-3xl border border-white/20 overflow-hidden shadow-2xl bg-[#0d0d0f]/95 z-10 my-auto"
        >
          {/* Sticky Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-white/10 bg-[#0d0d0f]/95 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-black">
                {project.category}
              </span>
              <span className="text-xs font-mono text-gray-400">STATUS: {project.status}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/15 transition-all"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dedicated Scrollable Content Container */}
          <div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-8"
          >
            
            {/* Banner Image */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={project.imageUrl ?? ''}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl sm:text-4xl font-black font-space text-white mb-2">{project.title}</h2>
                <p className="text-sm text-gray-300 max-w-2xl">{project.description}</p>
              </div>
            </div>

            {/* Long Description */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                Case Study Overview
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                Key Features & Engineering Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(project.features ?? []).map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <span className="font-mono text-white text-xs font-bold mt-0.5">•</span>
                    <span className="text-xs text-gray-300 leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Details */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-white" />
                System Architecture
              </h3>
              <p className="text-xs text-gray-300 font-mono leading-relaxed">
                {project.architectureDetails ?? 'No architecture details provided.'}
              </p>
            </div>

            {/* Tech Badges */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-white" />
                Technologies & Tools Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.techStack ?? project.technologies ?? []).map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/10 text-white border border-white/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Fixed Footer CTAs */}
          <div className="p-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#0d0d0f]/95 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-white font-medium text-xs hover:bg-white/15 transition-all flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Source</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              Close Window
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
