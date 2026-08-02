"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Sparkles, ShieldCheck, Eye } from "lucide-react";
import type { SanityCertificate } from "@/sanity/types";
import CertificateModal from "./CertificateModal";

interface CertificatesProps {
  certificates: SanityCertificate[];
}

export default function Certificates({ certificates }: CertificatesProps) {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [selectedCert, setSelectedCert] = useState<SanityCertificate | null>(null);

  const tabs = ["All", "AWS", "NPTEL", "Internship", "Hackathons", "Workshops"];

  const filteredCerts = selectedTab === "All"
    ? certificates
    : certificates.filter((c) => c.category === selectedTab);

  return (
    <section id="certificates" className="py-28 relative">
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>05 / CREDENTIALS & RECOGNITION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold font-space tracking-tight text-white uppercase">
              CERTIFICATES & <span className="text-stroke-outline">AWARDS</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-full border border-white/10 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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

        {/* Compact Scalable Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCerts.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 font-mono text-sm">
              No certificates in this category yet.
            </div>
          ) : (
            filteredCerts.map((cert, idx) => {
              const certId = cert._id || cert.id || String(idx);
              const issueDate = cert.date || cert.issueDate || "2024";
              const targetUrl = cert.verificationUrl || cert.downloadUrl;
              const hasUrl = targetUrl && targetUrl !== "#";

              return (
                <motion.div
                  key={certId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  onClick={() => setSelectedCert(cert)}
                  className="glass-card rounded-2xl p-5 border border-white/10 relative group hover:border-white/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-[240px] shadow-lg hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] bg-[#0c0c0e]/80 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/5 text-gray-300 border border-white/10">
                          {cert.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          Verified
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-sm font-bold font-space text-white group-hover:text-white/90 transition-colors line-clamp-2 leading-snug h-10 mb-2"
                      title={cert.title}
                    >
                      {cert.title}
                    </h3>

                    <div className="space-y-0.5">
                      <p className="text-[11px] text-gray-400 font-mono truncate">
                        Issued by: <span className="text-white font-medium">{cert.issuer}</span>
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono">
                        Issue Date: <span className="text-gray-400">{issueDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(cert);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>

                    {hasUrl ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-gray-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Verify</span>
                        <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(cert);
                        }}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-gray-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Verify</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* High-Res Certificate Image Viewer Modal */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
