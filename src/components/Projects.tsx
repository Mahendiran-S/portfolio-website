"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";
import { ExternalLink, BookOpen, Sparkles, Layers } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Featured", "Full Stack Automation", "Web Application", "Enterprise Module"];

  const filteredProjects = filter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.status === filter || p.category === filter);

  return (
    <section id="projects" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>04 / CURATED PORTFOLIO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
              FEATURED <span className="text-stroke-outline">PROJECTS</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-full border border-white/10 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === cat
                    ? "bg-white text-black shadow-md"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col group hover:border-white/30 hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              {/* Image Preview Container */}
              <div className="relative h-56 overflow-hidden border-b border-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                
                {/* Category & Status Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white text-black">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-space text-white mb-2 group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 text-gray-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 text-gray-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 rounded-xl bg-white/5 hover:bg-white text-gray-300 hover:text-black text-[11px] font-semibold flex items-center justify-center gap-1 border border-white/10 transition-all"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white text-[11px] font-medium flex items-center justify-center gap-1 border border-white/10 transition-all"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-3 h-3" />
                      <span>Code</span>
                    </a>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all shadow-md"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Study</span>
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
