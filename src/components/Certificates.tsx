"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CERTIFICATES, Certificate } from "@/data/portfolioData";
import { Award, Download, CheckCircle2, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";

export default function Certificates() {
  const [selectedTab, setSelectedTab] = useState<string>("All");

  const tabs = ["All", "AWS", "NPTEL", "Internship", "Hackathons", "Workshops"];

  const filteredCerts = selectedTab === "All"
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === selectedTab);

  return (
    <section id="certificates" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>05 / CREDENTIALS & RECOGNITION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
              CERTIFICATES & <span className="text-stroke-outline">AWARDS</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-full border border-white/10 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedTab === tab
                    ? "bg-white text-black shadow-md"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, idx) => {
            const hasDownloadUrl = cert.downloadUrl && cert.downloadUrl !== "#";

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-3xl p-7 border border-white/10 relative group hover:border-white/30 hover:scale-[1.02] transition-all flex flex-col justify-between"
              >
                {/* Top Row Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-white group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      VERIFIED CREDENTIAL
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-xl font-bold font-space text-white mb-2 group-hover:text-white/90 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    Issued by: <span className="text-white font-medium">{cert.issuer}</span>
                  </p>

                  {/* Credential Details */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-gray-400 mb-6">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="text-white font-semibold">{cert.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Issued Date:</span>
                      <span className="text-white">{cert.date}</span>
                    </div>
                    <div className="flex justify-between truncate">
                      <span>Credential ID:</span>
                      <span className="text-gray-300 font-mono truncate max-w-[150px]">{cert.credentialId}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {hasDownloadUrl ? (
                  <a
                    href={cert.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white text-gray-300 hover:text-black text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-all shadow-sm"
                    aria-label={`Verify credential for ${cert.title}`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download / Verify Certificate</span>
                  </a>
                ) : (
                  <div className="w-full py-3 rounded-xl bg-white/[0.02] text-emerald-400 text-xs font-mono font-semibold flex items-center justify-center gap-2 border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Academic Credential</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
