"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Sparkles, Code, Cpu } from "lucide-react";
import type { SanityExperience } from "@/sanity/types";

interface ExperienceProps {
  experiences: SanityExperience[];
}

// Static modules — these describe the internship modules and don't change unless hardcoded
const MODULES = [
  { name: "Expense Management System", desc: "Automated claim submission, audit trail logs, multi-currency processing" },
  { name: "Salary Deduction Engine", desc: "Enterprise payroll calculation logic integrating biometric attendance & loan logic" },
  { name: "Invoice Automation", desc: "Dynamic vector PDF billing report generator and automated dispatch system" },
  { name: "Audit Dashboard", desc: "Real-time query performance optimized data visualizer for corporate accounting" },
  { name: "Employee Management", desc: "Role-based access matrix and profile database with status tracking" },
  { name: "Excel Automation", desc: "High-volume bulk Excel parsing and automated financial data validation tools" },
];

export default function Experience({ experiences }: ExperienceProps) {
  const exp = experiences[0];

  if (!exp) {
    return (
      <section id="experience" className="py-28 relative">
        <div className="w-[92%] max-w-7xl mx-auto text-center text-gray-500 py-20 font-mono text-sm">
          No experience data available yet.
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>03 / WORK EXPERIENCE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
            ENTERPRISE <span className="text-stroke-outline">EXPERIENCE</span>
          </h2>
        </div>

        {/* Main Experience Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl relative overflow-hidden"
        >
          {/* Top Info Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-black">
                  {exp.company}
                </span>
                <span className="text-xs font-mono text-gray-400">{exp.location}</span>
              </div>
              <h3 className="text-3xl font-bold text-white font-space tracking-tight">{exp.role}</h3>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 w-fit">
              <span>{exp.period}</span>
            </div>
          </div>

          {/* Module Breakdown Grid */}
          <div className="mb-10">
            <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-white" />
              Core Modules Engineered & Built:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULES.map((mod) => (
                <div
                  key={mod.name}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all group"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
                    <h5 className="font-bold text-white text-sm tracking-tight">{mod.name}</h5>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed pl-6">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Responsibilities Bullet List */}
          <div className="mb-10">
            <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-white" />
              Impact & Key Responsibilities:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(exp.responsibilities ?? []).map((resp, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-gray-300 leading-relaxed">
                  <span className="font-mono text-white/50 text-[10px] mt-0.5">•</span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mr-2 flex items-center gap-1">
              <Code className="w-3.5 h-3.5" /> Stack:
            </span>
            {(exp.technologies ?? []).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-white border border-white/15"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
