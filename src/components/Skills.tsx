"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileCode, Palette, Code2, FileSpreadsheet, Atom, Layers, Sparkles,
  Server, Workflow, Flame, Database, Coffee, Terminal, GitBranch, Laptop, Send
} from "lucide-react";
import { GithubIcon, FigmaIcon } from "@/components/SocialIcons";
import type { SanitySkill } from "@/sanity/types";

interface SkillsProps {
  skills: SanitySkill[];
}

function getIcon(iconName?: string) {
  const props = { className: "w-5 h-5 text-white" };
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

  const categories: Array<'All' | 'Frontend' | 'Backend' | 'Tools'> = ['All', 'Frontend', 'Backend', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>02 / TECHNICAL PROFICIENCY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
              SKILLS & <span className="text-stroke-outline">STACK</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-full border border-white/10 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-6 border border-white/10 relative group hover:border-white/30 hover:scale-[1.02] transition-all"
            >
              {/* Card Top Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15 group-hover:border-white/40 group-hover:scale-110 transition-all shadow-md">
                    {getIcon(skill.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg tracking-tight">{skill.name}</h3>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-white">{(skill.percentage ?? skill.level ?? 80)}%</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-400 leading-relaxed mb-4 min-h-[36px]">
                {skill.description}
              </p>

              {/* Progress Indicator Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-white/60 via-white to-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
