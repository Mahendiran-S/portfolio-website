"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, CheckCircle2, Sparkles, Code, Cpu, ChevronDown, ExternalLink, Calendar, MapPin, Building2, Award } from "lucide-react";
import type { SanityExperience } from "@/sanity/types";

interface ExperienceProps {
  experiences: SanityExperience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  // Always default active selection to the first (newest/highest displayOrder) experience
  const initialActiveId = experiences && experiences.length > 0 ? (experiences[0]._id || experiences[0].id || "exp-0") : "";
  const [activeId, setActiveId] = useState<string>(initialActiveId);

  // Empty State: if no experiences exist in Sanity
  if (!experiences || experiences.length === 0) {
    return (
      <section id="experience" className="py-28 relative">
        <div className="w-[92%] max-w-7xl mx-auto">
          <div className="flex flex-col mb-12">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>03 / WORK EXPERIENCE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
              ENTERPRISE <span className="text-stroke-outline">EXPERIENCE</span>
            </h2>
          </div>

          <div className="glass-card rounded-3xl p-16 border border-white/10 text-center flex flex-col items-center justify-center space-y-4 bg-[#0c0c0e]/80">
            <div className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-space text-white">No experience added yet.</h3>
            <p className="text-xs font-mono text-gray-400 max-w-sm">
              Add your work experiences and internships in Sanity Studio to feature them here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Gracefully fallback to experiences[0] if the active document is deleted or unpublished in Sanity
  const activeExp = experiences.find((e) => (e._id || e.id) === activeId) || experiences[0];

  return (
    <section id="experience" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>03 / SANITY CMS WORK EXPERIENCE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
            ENTERPRISE <span className="text-stroke-outline">EXPERIENCE</span>
          </h2>
        </div>

        {/* Top View: Currently Expanded Showcase Experience Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExp._id || activeExp.id || activeExp.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-3xl p-7 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden mb-10 bg-[#0c0c0e]/90"
          >
            {/* Top Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-start gap-4">
                <div
                  style={{
                    borderColor: activeExp.themeColor || "rgba(255, 255, 255, 0.2)",
                  }}
                  className="w-14 h-14 rounded-2xl bg-white/10 border flex items-center justify-center text-white font-bold font-space text-xl shrink-0 shadow-lg"
                >
                  {activeExp.logoUrl ? (
                    <img src={activeExp.logoUrl} alt={activeExp.company} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    activeExp.company.charAt(0)
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-white text-black">
                      {activeExp.company}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-gray-300 border border-white/15">
                      {activeExp.employmentType || "Internship"}
                    </span>
                    {activeExp.remote && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Remote
                      </span>
                    )}
                    {activeExp.currentJob && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Current Position
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold text-white font-space tracking-tight">
                    {activeExp.role}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2 text-xs font-mono text-gray-400 shrink-0">
                <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-gray-200 flex items-center gap-2 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-white/60" />
                  <span>{activeExp.period || `${activeExp.startDate ?? ''} – ${activeExp.endDate ?? ''}`}</span>
                </div>
                {activeExp.location && (
                  <div className="flex items-center gap-1.5 text-gray-400 pl-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeExp.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Short Overview (if provided in Sanity) */}
            {activeExp.shortDescription && (
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                {activeExp.shortDescription}
              </p>
            )}

            {/* Core Modules Engineered (100% Dynamic from Sanity) */}
            {activeExp.coreModules && activeExp.coreModules.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-white" />
                  Core Modules Engineered & Built:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeExp.coreModules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
                        <h5 className="font-bold text-white text-xs tracking-tight">{mod.title}</h5>
                      </div>
                      {mod.description && (
                        <p className="text-[11px] text-gray-400 leading-relaxed pl-6">{mod.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Impact & Responsibilities List (from Sanity) */}
            {activeExp.responsibilities && activeExp.responsibilities.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-white" />
                  Key Impact & Responsibilities:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeExp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed p-2.5 rounded-xl bg-white/[0.01] border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Achievements (from Sanity) */}
            {activeExp.achievements && activeExp.achievements.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Key Achievements:
                </h4>
                <div className="space-y-2">
                  {activeExp.achievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-amber-200/90 p-2.5 rounded-xl bg-amber-500/[0.03] border border-amber-500/10">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Used & Website Link (from Sanity) */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mr-2 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> Stack:
                </span>
                {(activeExp.technologies ?? []).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-white border border-white/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {activeExp.website && (
                <a
                  href={activeExp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Company Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Timeline Accordion Stack (only shown if 2+ experiences exist) */}
        {experiences.length > 1 && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-white" />
              All Timeline Experiences ({experiences.length})
            </h3>

            {/* Scrollable Container for Infinite Sizing */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-1">
              {experiences.map((expItem, idx) => {
                const id = expItem._id || expItem.id || `exp-${idx}`;
                const isActive = id === (activeExp._id || activeExp.id);
                const periodText = expItem.period || `${expItem.startDate ?? ''} – ${expItem.endDate ?? ''}`;

                return (
                  <motion.div
                    key={id}
                    onClick={() => setActiveId(id)}
                    whileHover={{ scale: 1.005 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 h-[95px] ${
                      isActive
                        ? "bg-white/10 border-white/30 shadow-lg"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold font-space text-base shrink-0 ${
                        isActive ? "bg-white text-black" : "bg-white/10 border border-white/15 text-white"
                      }`}>
                        {expItem.logoUrl ? (
                          <img src={expItem.logoUrl} alt={expItem.company} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          expItem.company.charAt(0)
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-bold font-space text-white text-sm sm:text-base truncate">
                            {expItem.company}
                          </h4>
                          {expItem.currentJob && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 font-mono truncate">
                          {expItem.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="hidden sm:inline text-xs font-mono text-gray-400">
                        {periodText}
                      </span>
                      <div className={`p-2 rounded-full border transition-transform duration-300 ${
                        isActive
                          ? "bg-white text-black border-white rotate-180"
                          : "bg-white/5 border-white/10 text-gray-400"
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
