"use client";

import type { SanityProfile } from "@/sanity/types";
import { ArrowUp, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";

interface FooterProps {
  profile: SanityProfile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 border-t border-white/10 relative bg-[#080808]">
      <div className="w-[92%] max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Brand / Copyright */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <div className="font-mono text-sm font-bold text-white tracking-wider flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Mahendiran<span className="text-gray-500">.dev</span>
          </div>
          <p className="text-xs text-gray-500 font-mono">
            © {new Date().getFullYear()} {profile.name}. Crafted with Next.js 15, Framer Motion & Tailwind CSS.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={profile.githubUrl ?? '#'}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10 transition-all"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedinUrl ?? '#'}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10 transition-all"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email ?? ''}`}
            className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10 transition-all"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={profile.instagramUrl ?? '#'}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10 transition-all"
            title="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="group px-4 py-2.5 rounded-full bg-white/5 hover:bg-white text-gray-300 hover:text-black text-xs font-semibold font-mono flex items-center gap-2 border border-white/10 transition-all shadow-md"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
