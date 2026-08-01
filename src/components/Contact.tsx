"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Phone, FileText, Send, CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "@/components/SocialIcons";

interface ContactProps {
  onOpenResume: () => void;
}

export default function Contact({ onOpenResume }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#ffffff", "#9ca3af", "#6366f1"],
        });
      } catch (e) {
        // Fallback
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const contactCards = [
    {
      label: "Email Direct",
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      icon: <Mail className="w-5 h-5 text-white" />,
    },
    {
      label: "LinkedIn Profile",
      value: "linkedin.com/in/mahendiran-s",
      href: PERSONAL_INFO.linkedin,
      icon: <LinkedinIcon className="w-5 h-5 text-white" />,
    },
    {
      label: "GitHub Account",
      value: "github.com/Mahendiran-S",
      href: PERSONAL_INFO.github,
      icon: <GithubIcon className="w-5 h-5 text-white" />,
    },
    {
      label: "Instagram",
      value: "@mahendiran_dev",
      href: PERSONAL_INFO.instagram,
      icon: <InstagramIcon className="w-5 h-5 text-white" />,
    },
    {
      label: "Phone / WhatsApp",
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone}`,
      icon: <Phone className="w-5 h-5 text-white" />,
    },
    {
      label: "Download Resume",
      value: "View PDF Document",
      onClick: onOpenResume,
      icon: <FileText className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section id="contact" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>07 / GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase mb-4 leading-tight">
            LET'S BUILD SOMETHING <br />
            <span className="text-stroke-outline">AMAZING TOGETHER</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Have a project in mind, an internship opportunity, or just want to connect? Send a message below or reach out via direct channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {contactCards.map((card, idx) => {
              const content = (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="glass-card rounded-2xl p-5 border border-white/10 flex items-center gap-4 hover:border-white/30 hover:scale-[1.02] transition-all group cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-0.5">
                      {card.label}
                    </div>
                    <div className="text-sm font-bold text-white truncate font-mono">
                      {card.value}
                    </div>
                  </div>
                </motion.div>
              );

              if (card.onClick) {
                return <div key={card.label} onClick={card.onClick}>{content}</div>;
              }

              return (
                <a key={card.label} href={card.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              );
            })}
          </div>

          {/* Right Side: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl relative"
          >
            {isSubmitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-space text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  Thank you for reaching out, Mahendiran will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all border border-white/15"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold font-space text-white mb-2">Send Me a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Internship Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Mahendiran, I would like to discuss..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-all font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="font-mono text-xs animate-pulse">Dispatching Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
