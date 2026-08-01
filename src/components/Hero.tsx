"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { SanityProfile } from "@/sanity/types";
import { Download, ArrowRight, Mail, MapPin, GraduationCap, CheckCircle2, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

interface HeroProps {
  profile: SanityProfile;
  onOpenResume?: () => void;
}

export default function Hero({ profile, onOpenResume }: HeroProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt calculation with Framer Motion springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <section id="home" className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
      <div className="w-[92%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Hero Typography & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill text-xs text-gray-300 w-fit mb-6 border border-white/10 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono uppercase tracking-widest text-[10px] text-gray-300">Open for Roles & Internships</span>
          </div>

          {/* Huge Typography Heading */}
          <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black font-space tracking-tight text-white uppercase leading-[0.9] mb-6">
            SOFTWARE <br />
            <span className="text-stroke-outline hover:text-white transition-all duration-500">DEVELOPER</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-400 font-normal max-w-2xl leading-relaxed mb-8">
            {profile.tagline}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {/* Direct Browser Download anchor */}
            <a
              href={profile.resumeUrl ?? '/Mahendiran_S_Resume.pdf'}
              download
              className="group px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)]"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </a>

            <a
              href="#projects"
              className="group px-7 py-3.5 rounded-full bg-white/5 border border-white/15 text-white font-medium text-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Social Icons Quick Row */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">Connect:</span>
            <div className="flex items-center gap-3">
              <a
                href={profile.githubUrl ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedinUrl ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email ?? ''}`}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Interactive 3D Tilt Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 flex justify-center perspective-1000"
        >
          <div className="relative w-full max-w-md">
            {/* Floating Soft Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-indigo-500/10 rounded-3xl blur-3xl transform scale-95" />

            {/* 3D Tilt Card */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              className="relative glass-card rounded-3xl p-7 border border-white/15 animate-border-glow shadow-2xl bg-[#0f0f11]/80 backdrop-blur-2xl"
            >
              {/* Top Card Badge */}
              <div className="flex items-center justify-between mb-6" style={{ transform: "translateZ(30px)" }}>
                <span className="font-mono text-xs text-gray-400 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  MAHENDIRAN.DEV
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-white/10 border border-white/20 text-white">
                  SOFTWARE DEVELOPER
                </span>
              </div>

              {/* Developer Avatar / Frame */}
              <div className="relative mb-6 flex justify-center" style={{ transform: "translateZ(50px)" }}>
                <div className="relative w-40 h-44 rounded-2xl overflow-hidden border-2 border-white/20 p-1 bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
                  {/* Real Professional Portrait of Mahendiran S */}
                  <img
                    src="/mahendiran-profile.png"
                    alt="Mahendiran S - Software Developer"
                    className="w-full h-full object-cover object-top rounded-xl hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center mb-6" style={{ transform: "translateZ(40px)" }}>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{profile.name}</h3>
                <p className="text-xs font-mono text-gray-400 tracking-wide uppercase mb-3">{profile.role}</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-white" />
                    Mahendra Eng. College
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-white" />
                    Tamil Nadu, India
                  </span>
                </div>
              </div>

              {/* Tech Highlights Pills */}
              <div className="grid grid-cols-3 gap-2 text-center" style={{ transform: "translateZ(35px)" }}>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xs font-bold text-white font-mono">React / Next</div>
                  <div className="text-[9px] text-gray-400">Frontend</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xs font-bold text-white font-mono">Node / Express</div>
                  <div className="text-[9px] text-gray-400">Backend</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xs font-bold text-white font-mono">Java / Firebase</div>
                  <div className="text-[9px] text-gray-400">Core Tech</div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400" style={{ transform: "translateZ(25px)" }}>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Developer
                </span>
                <span className="font-mono text-gray-500">2026 EDITION</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
