"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { NavLogo } from "./ArchTitanLogo";

const NAV_LINKS = [
  { label: "Home", href: "#", active: true },
  { label: "Solutions", href: "#solutions", hasDropdown: true },
  { label: "Platform", href: "#platform", hasDropdown: true },
  { label: "Resources", href: "#resources", hasDropdown: true },
  { label: "Pricing", href: "#pricing" },
];


export const PrimaryNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 z-40 flex justify-center pt-5 px-4">
      <nav
        className="w-full max-w-[1100px] flex items-center justify-between h-[58px] px-5 rounded-2xl"
        style={{
          background: "rgba(5,11,27,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(125,160,255,0.18)",
          boxShadow: "0 4px 30px rgba(2,4,13,0.5), inset 0 1px 0 rgba(140,203,255,0.06)",
        }}
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <NavLogo size={34} />

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-center gap-0.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                style={{
                  color: link.active ? "#F7F9FF" : "#9DA9C3",
                  background: link.active ? "rgba(99,214,255,0.06)" : "transparent",
                }}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                )}
              </a>
              {/* Active dot indicator */}
              {link.active && (
                <div className="mx-auto mt-0.5 w-1 h-1 rounded-full bg-cyan-400" />
              )}
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <a
          href="#contact"
          className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          style={{
            background: "linear-gradient(135deg, #2F48A5 0%, #3B5FCC 100%)",
            color: "#F7F9FF",
            border: "1px solid rgba(99,214,255,0.25)",
            boxShadow: "0 0 20px rgba(47,72,165,0.4)",
          }}
          aria-label="Get started with Vectorium Labs"
        >
          Get Started
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>

        {/* ── Mobile: hamburger ── */}
        <button
          className="md:hidden p-2 text-[#9DA9C3] hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {mobileOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl flex flex-col gap-1 md:hidden"
            style={{
              background: "rgba(5,11,27,0.97)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(125,160,255,0.18)",
              boxShadow: "0 20px 50px rgba(2,4,13,0.8)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#9DA9C3] hover:text-[#F7F9FF] hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 mt-1" style={{ borderTop: "1px solid rgba(125,160,255,0.12)" }}>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold text-[#F7F9FF]"
                style={{ background: "linear-gradient(135deg, #2F48A5, #3B5FCC)" }}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
