"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCode, Palette, Code2, FileSpreadsheet, Atom, Layers, Sparkles,
  Server, Workflow, Flame, Database, Coffee, Terminal, GitBranch, Laptop, Send, ChevronDown, ChevronUp
} from "lucide-react";
import { GithubIcon, FigmaIcon } from "@/components/SocialIcons";
import type { SanitySkill } from "@/sanity/types";

interface SkillsProps {
  skills: SanitySkill[];
}

const DEFAULT_VISIBLE_SKILLS = 7;

function getIcon(iconName?: string) {
  const props = { className: "w-4.5 h-4.5 text-white" };
  switch (iconName) {
    case "FileCode": return <FileCode {...props} />;
    case "Palette": return <Palette {...props} />;
    case "Code2": return <Code2 {...props} />;
    case "FileSpreadsheet": return <FileSpreadsheet {...props} />;
    case "Atom": return <Atom {...props} />;
    case "Layers": return <Layers {...props} />;
    case "Sparkles": return <Sparkles {...props} />;
    case "Server": return <Server {...props} />;
    case "Workflow": return <Workflow {...props} />;
    case "Flame": return <Flame {...props} />;
    case "Database": return <Database {...props} />;
    case "Coffee": return <Coffee {...props} />;
    case "Terminal": return <Terminal {...props} />;
    case "GitBranch": return <GitBranch {...props} />;
    case "Github": return <GithubIcon {...props} />;
    case "Laptop": return <Laptop {...props} />;
    case "Send": return <Send {...props} />;
    case "Figma": return <FigmaIcon {...props} />;
    default: return <Code2 {...props} />;
  }
}

export default function Skills({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Frontend' | 'Backend' | 'Tools'>('All');
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories: Array<'All' | 'Frontend' | 'Backend' | 'Tools'> = ['All', 'Frontend', 'Backend', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((skill) => skill.category === selectedCategory);

  const visibleSkills = showAll
    ? filteredSkills
    : filteredSkills.slice(0, DEFAULT_VISIBLE_SKILLS);

  const hasMore = filteredSkills.length > DEFAULT_VISIBLE_SKILLS;

  return (
    <section id="skills" className="py-24 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>02 / TECHNICAL PROFICIENCY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
              SKILLS & <span className="text-stroke-outline">STACK</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-full border border-white/10 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAll(false); // Reset to 7 visible skills when changing category tab
                }}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Responsive CSS Grid (4 cards/row on desktop) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill, idx) => {
              const levelValue = skill.percentage ?? skill.level ?? 80;

              return (
                <motion.div
                  key={skill._id || skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="glass-card rounded-2xl p-4 border border-white/10 relative group hover:border-white/30 hover:scale-[1.02] transition-all flex flex-col justify-between h-full bg-[#0c0c0e]/80"
                >
                  <div>
                    {/* Top Row: Icon + Name + Percentage */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 group-hover:border-white/40 group-hover:scale-105 transition-all shadow-md shrink-0">
                          {getIcon(skill.iconName)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white text-sm tracking-tight truncate">{skill.name}</h3>
                          <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block truncate">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono text-xs font-bold text-white shrink-0 pl-1">
                        {levelValue}%
                      </span>
                    </div>

                    {/* Single-Line Description with Truncation */}
                    <p className="text-[11px] text-gray-400 leading-tight truncate overflow-hidden whitespace-nowrap mb-3" title={skill.description}>
                      {skill.description}
                    </p>
                  </div>

                  {/* Thinner Progress Indicator Bar (~4px) */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden border border-white/5 mt-auto">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${levelValue}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-white/60 via-white to-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Skills / Show Less Expand Button */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/15 hover:border-white/30 text-white font-mono text-xs font-semibold transition-all flex items-center gap-2 shadow-xl hover:bg-white/10 cursor-pointer"
            >
              <span>{showAll ? "Show Less" : `View All Skills (${filteredSkills.length})`}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </motion.button>
          </div>
        )}

      </div>
    </section>
  );
}
