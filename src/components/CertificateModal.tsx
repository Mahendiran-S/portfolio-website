"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ExternalLink, Download, ShieldCheck, Calendar, Building2 } from "lucide-react";
import type { SanityCertificate } from "@/sanity/types";

interface CertificateModalProps {
  cert: SanityCertificate | null;
  onClose: () => void;
}

export default function CertificateModal({ cert, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (cert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  const imageUrl = cert.certificateImageUrl || cert.badgeUrl || "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1200&q=80";
  const issueDate = cert.date || cert.issueDate || "2024";
  const verifyUrl = cert.verificationUrl || cert.downloadUrl;
  const hasVerifyUrl = verifyUrl && verifyUrl !== "#";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-white/15 bg-[#0d0d0f]/95 overflow-hidden shadow-2xl z-10 my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-white">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                  {cert.category ?? 'Certificate'}
                </span>
                <h3 className="text-base font-bold font-space text-white truncate max-w-md">
                  {cert.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Container */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* High-Res Certificate Image View */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center p-3 group shadow-inner">
              <img
                src={imageUrl}
                alt={cert.title}
                className="w-full max-h-[520px] object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>

            {/* Certificate Metadata Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Issued By</span>
                  <span className="text-sm font-bold text-white">{cert.issuer}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Issue Date</span>
                  <span className="text-sm font-bold text-white">{issueDate}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Status</span>
                  <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                    Verified Credential
                  </span>
                </div>
              </div>
            </div>

            {cert.credentialId && (
              <div className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-gray-400 flex items-center justify-between">
                <span>Credential ID: <strong className="text-white">{cert.credentialId}</strong></span>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-white/[0.02] gap-4">
            <a
              href={imageUrl}
              target="_blank"
              download
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-2 border border-white/15"
            >
              <Download className="w-4 h-4" />
              <span>Download Image</span>
            </a>

            <div className="flex items-center gap-3">
              {hasVerifyUrl && (
                <a
                  href={verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-md"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-all border border-white/10 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
