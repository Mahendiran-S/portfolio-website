"use client";

import { useEffect, useState } from "react";

export default function BackgroundFX() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080808]">
      {/* 1. Fine Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.35]" />

      {/* 2. Soft Ambient Radial Blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[140px] animate-float-slow" />
      <div className="absolute top-[40%] -right-40 w-[700px] h-[700px] bg-indigo-500/[0.03] rounded-full blur-[160px] animate-float-slow" style={{ animationDelay: "-3s" }} />
      <div className="absolute -bottom-40 left-[20%] w-[650px] h-[650px] bg-cyan-500/[0.025] rounded-full blur-[150px] animate-float-slow" style={{ animationDelay: "-1.5s" }} />

      {/* 3. Dynamic Mouse Spotlight Effect */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.04), transparent 80%)`,
        }}
      />

      {/* 4. Glassmorphism Noise Overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
