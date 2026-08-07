"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, Zap } from "lucide-react";

export const HeroContent: React.FC = () => {
  return (
    <section
      className="relative z-10 flex flex-col items-center text-center px-4 pt-12 pb-4 max-w-[960px] mx-auto"
      aria-label="Hero content"
    >
      {/* ── Announcement badge ── */}
      <div
        className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 cursor-default"
        style={{
          background: "rgba(9,18,43,0.85)",
          border: "1px solid rgba(125,160,255,0.22)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 0 24px rgba(47,72,165,0.15)",
        }}
      >
        {/* Glowing dot */}
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            background: "#9DF5B0",
            boxShadow: "0 0 8px #9DF5B0",
            animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
          aria-hidden="true"
        />
        <span
          className="text-xs font-medium tracking-wide"
          style={{ color: "#9DA9C3" }}
        >
          Engineering AI Systems for Real-World Operations
        </span>
        <Zap className="w-3 h-3 shrink-0" style={{ color: "#63D6FF" }} aria-hidden="true" />
      </div>

      {/* ── Main headline ── */}
      <h1
        className="hero-headline font-bold tracking-tight leading-[1.06] text-center overflow-hidden"
        style={{
          fontSize: "clamp(38px, 7vw, 82px)",
          color: "#F7F9FF",
          maxWidth: "900px",
        }}
      >
        <span className="block">Build{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8ACBFF 0%, #63D6FF 45%, #927CFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Intelligent Systems
          </span>
        </span>
        <span className="block">That Work in the Real World</span>
      </h1>

      {/* ── Supporting paragraph ── */}
      <p
        className="hero-subtitle mt-6 leading-relaxed text-center"
        style={{
          color: "#9DA9C3",
          maxWidth: "680px",
          fontSize: "clamp(15px, 1.8vw, 18px)",
          lineHeight: 1.7,
        }}
      >
        Vectorium Labs designs and delivers AI, software and data systems that improve workflows, strengthen decisions and scale with real business operations.
      </p>

      {/* ── CTA Buttons ── */}
      <div className="hero-actions flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
        {/* Primary: Explore Our Work */}
        <a
          href="#work"
          className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F48A5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040D]"
          style={{
            background: "#F7F9FF",
            color: "#09122B",
            boxShadow: "0 0 28px rgba(247,249,255,0.2), 0 4px 12px rgba(2,4,13,0.3)",
          }}
          aria-label="Explore our work"
        >
          <span>Explore Our Work</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>

        {/* Secondary: Start a Conversation */}
        <a
          href="#contact"
          className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040D]"
          style={{
            background: "rgba(9,18,43,0.7)",
            border: "1px solid rgba(125,160,255,0.28)",
            color: "#F7F9FF",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          aria-label="Start a conversation"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,214,255,0.5)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(47,72,165,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(125,160,255,0.28)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(9,18,43,0.7)";
          }}
        >
          <span>Start a Conversation</span>
          <ArrowUpRight
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
};
