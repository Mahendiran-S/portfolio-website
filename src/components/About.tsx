"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { STATS, TIMELINE_ITEMS } from "@/data/portfolioData";
import type { SanityProfile } from "@/sanity/types";
import { GraduationCap, Briefcase, Award, BookOpen, Target, Sparkles } from "lucide-react";

interface AboutProps {
  profile: SanityProfile;
}

export default function About({ profile }: AboutProps) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "Education", "Internship", "Achievement", "Certification"];

  const filteredTimeline = activeTab === "All"
    ? TIMELINE_ITEMS
    : TIMELINE_ITEMS.filter((item) => item.type === activeTab);

  return (
    <section id="about" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>01 / ABOUT ME</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
            PASSIONATE ABOUT <br />
            <span className="text-stroke-outline">CLEAN CODE & DESIGN</span>
          </h2>
        </div>

        {/* Top Bio & Animated Frame Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Column: Narrative Intro & Seeking Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6 leading-snug">
              I turn complex business ideas into seamless, modern web experiences.
            </h3>

            <p className="text-gray-300 text-base leading-relaxed mb-6">
              {profile.aboutBio}
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Currently pursuing my B.Tech in Information Technology at <span className="text-white font-medium">{profile.college}</span> in Tamil Nadu. I focus on developing real-world applications with robust backend services, intuitive frontend architectures, and optimized performance.
            </p>

            {/* Currently Looking For List */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 mb-6 bg-white/[0.02]">
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-white" />
                Currently Looking For:
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {['Software Engineer Internships', 'Full-Stack Developer Roles', 'Freelance Engineering Contracts'].map((role) => (
                  <span
                    key={role}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
                  >
                    • {role}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated Circular Frame Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group">
              {/* Rotating Ambient Outer Ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-white/20 via-indigo-500/20 to-white/20 blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 animate-spin" style={{ animationDuration: "12s" }} />

              {/* Animated Circular Frame */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-b from-white/30 via-white/10 to-transparent border border-white/20 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden relative border border-white/30">
                  <img
                    src={profile.profilePhotoUrl ?? '/mahendiran-profile.png'}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-mono font-medium text-white bg-black/80 backdrop-blur-md border border-white/20 shadow-lg">
                      Mahendiran S • IT Student
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Animated Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-24">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-card border border-white/10 text-center group hover:border-white/30 transition-all"
            >
              <div className="text-3xl sm:text-4xl font-black font-space text-white mb-2 group-hover:scale-110 transition-transform">
                {stat.value}{(stat as any).suffix ?? ''}
              </div>
              <div className="text-xs text-gray-400 font-mono leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Journey Timeline */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div>
              <h3 className="text-2xl font-bold font-space text-white uppercase tracking-tight">
                Career & Education Journey
              </h3>
              <p className="text-xs text-gray-400 font-mono mt-1">
                Milestones, Education, Internship & Technical Learning Path
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTab === cat
                      ? "bg-white text-black font-semibold shadow-md"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline List */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 md:before:left-5 before:w-0.5 before:bg-white/10">
            {filteredTimeline.map((item, idx) => (
              <motion.div
                key={`${item.title}-${item.institution}-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative pl-10 md:pl-14 group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-1.5 md:left-3 top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-white/40 group-hover:border-white group-hover:bg-white transition-all shadow-[0_0_10px_rgba(255,255,255,0.4)]" />

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/15">
                      {item.type}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {item.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">
                    {item.title}
                  </h4>

                  <div className="text-xs text-gray-400 font-mono mb-3">
                    {item.institution}
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
