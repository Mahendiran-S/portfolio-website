"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Phone, FileText, Send, CheckCircle2, Sparkles, AlertCircle, RefreshCw, ShieldCheck, Loader2 } from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "@/components/SocialIcons";

interface ContactProps {
  onOpenResume: () => void;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  captchaAnswer: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  captchaAnswer?: string;
}

// XSS Sanitizer Utility
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

export default function Contact({ onOpenResume }: ContactProps) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    captchaAnswer: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Security CAPTCHA Challenge Generator
  const [captchaNum1, setCaptchaNum1] = useState(5);
  const [captchaNum2, setCaptchaNum2] = useState(3);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setFormData((prev) => ({ ...prev, captchaAnswer: "" }));
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validate Field Live
  const validateField = (field: keyof FormState, value: string): string | undefined => {
    const trimmed = value.trim();

    if (field === "name") {
      if (!trimmed) return "Name is required.";
      if (trimmed.length < 3) return "Name must be at least 3 characters.";
      if (trimmed.length > 50) return "Name cannot exceed 50 characters.";
      if (!/^[A-Za-z\s]+$/.test(trimmed)) return "Name can only contain letters and spaces.";
    }

    if (field === "email") {
      if (!trimmed) return "Email address is required.";
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) return "Please enter a valid email address (e.g. name@domain.com).";
    }

    if (field === "subject") {
      if (!trimmed) return "Subject is required.";
      if (trimmed.length < 5) return "Subject must be at least 5 characters.";
      if (trimmed.length > 100) return "Subject cannot exceed 100 characters.";
    }

    if (field === "message") {
      if (!trimmed) return "Message is required.";
      if (trimmed.length < 20) return "Message must be at least 20 characters long.";
      if (trimmed.length > 1000) return "Message cannot exceed 1000 characters.";
      if (/^\s*$/.test(value)) return "Message cannot consist of spaces only.";
    }

    if (field === "captchaAnswer") {
      if (!trimmed) return "Security verification answer is required.";
      if (parseInt(trimmed, 10) !== captchaNum1 + captchaNum2) {
        return `Incorrect answer. What is ${captchaNum1} + ${captchaNum2}?`;
      }
    }

    return undefined;
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Remove error immediately if valid
    const fieldError = validateField(field, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (!fieldError) {
        delete next[field];
      } else {
        next[field] = fieldError;
      }
      return next;
    });
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};

    const nameErr = validateField("name", formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors.email = emailErr;

    const subjectErr = validateField("subject", formData.subject);
    if (subjectErr) newErrors.subject = subjectErr;

    const msgErr = validateField("message", formData.message);
    if (msgErr) newErrors.message = msgErr;

    const captchaErr = validateField("captchaAnswer", formData.captchaAnswer);
    if (captchaErr) newErrors.captchaAnswer = captchaErr;

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
      captchaAnswer: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Rate Limiting Check (Anti-Spam Throttling)
    const now = Date.now();
    if (lastSubmissionTime && now - lastSubmissionTime < 30000) {
      const secondsLeft = Math.ceil((30000 - (now - lastSubmissionTime)) / 1000);
      setToastMessage({
        type: "error",
        text: `Please wait ${secondsLeft} seconds before sending another message to prevent spam.`,
      });
      return;
    }

    // 2. Strict Validation Check
    if (!validateAll()) {
      setToastMessage({
        type: "error",
        text: "Please fix the highlighted errors before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    setToastMessage(null);

    // Sanitize user inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name.trim()),
      email: sanitizeInput(formData.email.trim()),
      subject: sanitizeInput(formData.subject.trim()),
      message: sanitizeInput(formData.message.trim()),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setLastSubmissionTime(Date.now());
      setToastMessage({
        type: "success",
        text: `Thank you ${sanitizedData.name}! Your message has been sent successfully.`,
      });

      // Confetti Explosion
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.65 },
          colors: ["#ffffff", "#9ca3af", "#6366f1", "#10b981"],
        });
      } catch (e) {
        // Fallback
      }

      setFormData({ name: "", email: "", subject: "", message: "", captchaAnswer: "" });
      setErrors({});
      setTouched({});
      generateCaptcha();
    }, 1200);
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
      value: "@toxin_artist_0210",
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

        {/* Global Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`max-w-xl mx-auto mb-8 p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-mono shadow-2xl ${
                toastMessage.type === "success"
                  ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-200"
                  : "bg-red-950/80 border-red-500/40 text-red-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {toastMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{toastMessage.text}</span>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="text-gray-400 hover:text-white font-bold px-1"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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

          {/* Right Side: Validated Interactive Contact Form */}
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
                  Thank you for reaching out, Mahendiran will review your message and reply within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all border border-white/15"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-space text-white">Send Me a Message</h3>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">* Required Fields</span>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={50}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] text-white placeholder-gray-600 text-sm focus:outline-none transition-all font-sans border ${
                        touched.name && errors.name
                          ? "border-red-500/80 bg-red-950/10 focus:border-red-500"
                          : "border-white/10 focus:border-white/40 focus:bg-white/[0.06]"
                      }`}
                    />
                    {touched.name && errors.name && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 font-mono">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] text-white placeholder-gray-600 text-sm focus:outline-none transition-all font-sans border ${
                        touched.email && errors.email
                          ? "border-red-500/80 bg-red-950/10 focus:border-red-500"
                          : "border-white/10 focus:border-white/40 focus:bg-white/[0.06]"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 font-mono">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Project Inquiry / Internship Opportunity (min 5 chars)"
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] text-white placeholder-gray-600 text-sm focus:outline-none transition-all font-sans border ${
                      touched.subject && errors.subject
                        ? "border-red-500/80 bg-red-950/10 focus:border-red-500"
                        : "border-white/10 focus:border-white/40 focus:bg-white/[0.06]"
                    }`}
                  />
                  {touched.subject && errors.subject && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 font-mono">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-gray-500">
                      {formData.message.trim().length} / 1000 chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={1000}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Hi Mahendiran, I would like to discuss..."
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] text-white placeholder-gray-600 text-sm focus:outline-none transition-all font-sans resize-none border ${
                      touched.message && errors.message
                        ? "border-red-500/80 bg-red-950/10 focus:border-red-500"
                        : "border-white/10 focus:border-white/40 focus:bg-white/[0.06]"
                    }`}
                  />
                  {touched.message && errors.message && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 font-mono">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Security CAPTCHA Challenge */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Anti-Spam Verification: What is <strong className="text-white">{captchaNum1} + {captchaNum2}</strong>? <span className="text-red-400">*</span>
                    </span>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-gray-400 hover:text-white p-1"
                      title="New Math Question"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="number"
                    value={formData.captchaAnswer}
                    onChange={(e) => handleInputChange("captchaAnswer", e.target.value)}
                    placeholder="Enter answer (e.g. 8)"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] text-white placeholder-gray-600 text-sm focus:outline-none transition-all font-mono border ${
                      touched.captchaAnswer && errors.captchaAnswer
                        ? "border-red-500/80 bg-red-950/10 focus:border-red-500"
                        : "border-white/10 focus:border-white/40 focus:bg-white/[0.06]"
                    }`}
                  />
                  {touched.captchaAnswer && errors.captchaAnswer && (
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-mono">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.captchaAnswer}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button with Loading Spinner */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2 font-mono text-xs text-black">
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Validating & Sending...</span>
                    </div>
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
