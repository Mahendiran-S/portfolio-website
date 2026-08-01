"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, ArrowUpRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume", isResumeTrigger: true },
];

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Scrolling down -> hide
        } else {
          setIsVisible(true); // Scrolling up -> show
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Section intersection watcher
      const sections = NAV_ITEMS.filter(i => !i.isResumeTrigger).map((item) => item.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 inset-x-0 mx-auto w-[92%] max-w-6xl z-50 pointer-events-auto"
      >
        <nav className="glass-card rounded-full px-5 py-3 flex items-center justify-between shadow-2xl border border-white/10 backdrop-blur-xl bg-[#080808]/80">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group font-mono text-sm tracking-wider font-bold text-white hover:text-white/90 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-all duration-300">
              <span className="text-xs font-black tracking-tighter text-white">M</span>
            </div>
            <span>
              Mahendiran<span className="text-white/40">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              if (item.isResumeTrigger) {
                return (
                  <button
                    key={item.label}
                    onClick={onOpenResume}
                    className="relative px-3.5 py-1.5 text-xs font-medium rounded-full text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="relative group px-4 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-3 p-5 glass-card rounded-2xl border border-white/10 bg-[#080808]/95 backdrop-blur-2xl flex flex-col gap-3 shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => {
                  if (item.isResumeTrigger) {
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenResume();
                        }}
                        className="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all flex items-center justify-between text-left"
                      >
                        <span>{item.label}</span>
                        <Sparkles className="w-3 h-3 opacity-40" />
                      </button>
                    );
                  }

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <Sparkles className="w-3 h-3 opacity-40" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
}
