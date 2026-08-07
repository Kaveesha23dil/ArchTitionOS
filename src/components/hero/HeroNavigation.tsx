"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#work" },
  { label: "Insights", href: "#insights" },
];

export const HeroNavigation: React.FC = () => {
  return (
    <nav
      className="hero-nav w-full flex justify-center px-4 mt-2"
      aria-label="Main navigation"
    >
      <div
        className="w-full max-w-[1100px] h-14 flex items-center justify-between px-6 rounded-2xl"
        style={{
          background: "rgba(9,18,43,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(125,160,255,0.15)",
          boxShadow: "inset 0 1px 0 rgba(140,203,255,0.06), 0 4px 24px rgba(2,4,13,0.4)",
        }}
      >
        {/* ── Logo / Brand ── */}
        <a
          href="#"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Vectorium Labs — Home"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #2F48A5, #63D6FF)",
              boxShadow: "0 0 16px rgba(99,214,255,0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 12H2L8 2Z" fill="#F7F9FF" />
              <path d="M8 6L11 11H5L8 6Z" fill="#63D6FF" fillOpacity="0.6" />
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-[#F7F9FF] hidden sm:block">
            Vectorium <span className="text-[#9DA9C3] font-normal">Labs</span>
          </span>
        </a>

        {/* ── Centre links ── */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#9DA9C3] hover:text-[#F7F9FF] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040D] rounded"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <a
          href="#contact"
          className="group hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040D]"
          style={{
            background: "linear-gradient(135deg, #2F48A5 0%, #1a3080 100%)",
            border: "1px solid rgba(99,214,255,0.3)",
            color: "#F7F9FF",
            boxShadow: "0 0 20px rgba(47,72,165,0.4)",
          }}
          aria-label="Start a project"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </nav>
  );
};
