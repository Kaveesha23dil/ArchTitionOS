"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle, Zap } from "lucide-react";

const TRUST_ITEMS = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
];

export const MainHeroContent: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 pt-[100px] pb-4 max-w-[860px] mx-auto w-full">

      {/* ── Announcement badge ── */}
      <div
        className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-7 cursor-pointer group"
        style={{
          background: "rgba(9,18,43,0.9)",
          border: "1px solid rgba(125,160,255,0.22)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 0 20px rgba(47,72,165,0.15)",
        }}
        role="note"
        aria-label="Announcement: Vectorium AI Systems now in open beta"
      >
        <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
        <span className="text-xs font-medium text-[#9DA9C3]">
          New: Vectorium AI Systems now in open beta
        </span>
        <span
          className="flex items-center gap-0.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
        >
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </span>
      </div>

      {/* ── Main headline ── */}
      <h1
        className="hero-headline font-bold text-center mb-5 leading-[1.06] tracking-[-0.02em]"
        style={{
          fontSize: "clamp(40px, 7vw, 80px)",
          color: "#F7F9FF",
          textShadow: "0 0 80px rgba(99,214,255,0.12)",
        }}
      >
        Build Intelligent Systems<br />
        That{" "}
        <span className="text-gradient-animated">
          Move Work Forward
        </span>
      </h1>

      {/* ── Supporting paragraph ── */}
      <p
        className="hero-subtitle mb-9 leading-[1.7] text-center"
        style={{
          color: "#9DA9C3",
          fontSize: "clamp(15px, 1.8vw, 18px)",
          maxWidth: "640px",
        }}
      >
        Orchestrate AI, data, and human expertise in one unified platform.
        Automate operations, unlock insights, and accelerate outcomes.
      </p>

      {/* ── Email CTA form (matches reference) ── */}
      <form
        onSubmit={handleSubmit}
        className="hero-actions w-full max-w-[540px] flex flex-col sm:flex-row items-stretch gap-2 mb-5"
        aria-label="Start free trial sign-up"
      >
        {/* Email input */}
        <label htmlFor="hero-email" className="sr-only">Your work email</label>
        <div
          className="flex-1 flex items-center gap-2.5 px-4 rounded-xl transition-all duration-300 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_20px_rgba(99,214,255,0.2)]"
          style={{
            background: "rgba(9,18,43,0.85)",
            border: "1px solid rgba(125,160,255,0.22)",
            backdropFilter: "blur(12px)",
            minHeight: "52px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-50" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="3" stroke="#9DA9C3" strokeWidth="2" />
            <path d="M2 8l10 7 10-7" stroke="#9DA9C3" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="hero-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#9DA9C3] text-[#F7F9FF] focus:ring-0"
            autoComplete="email"
          />
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className="group btn-shimmer-effect flex items-center justify-center gap-2 px-6 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(47,72,165,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shrink-0 whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #2F48A5 0%, #3B65D9 100%)",
            color: "#F7F9FF",
            border: "1px solid rgba(99,214,255,0.3)",
            boxShadow: "0 0 25px rgba(47,72,165,0.45)",
            minHeight: "52px",
          }}
          aria-label="Start free trial"
        >
          Start Free Trial
          <ArrowRight
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </form>

      {/* ── Trust indicators ── */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {TRUST_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-1.5 text-xs text-[#9DA9C3]">
            <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
