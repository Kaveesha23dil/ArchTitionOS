"use client";

import React, { useState } from "react";
import { X, Menu, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#work" },
  { label: "Insights", href: "#insights" },
];

export const MobileNavigation: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        className="p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        style={{
          background: "rgba(9,18,43,0.8)",
          border: "1px solid rgba(125,160,255,0.2)",
          color: "#9DA9C3",
        }}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div
          className="absolute top-full left-4 right-4 mt-2 p-5 rounded-2xl z-50"
          style={{
            background: "rgba(9,18,43,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(125,160,255,0.2)",
            boxShadow: "0 20px 60px rgba(2,4,13,0.8)",
          }}
        >
          <nav aria-label="Mobile navigation">
            <ul className="space-y-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-medium text-[#9DA9C3] hover:text-[#F7F9FF] hover:bg-white/5 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(125,160,255,0.1)" }}>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold text-[#F7F9FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              style={{
                background: "linear-gradient(135deg, #2F48A5 0%, #1a3080 100%)",
                border: "1px solid rgba(99,214,255,0.3)",
                boxShadow: "0 0 20px rgba(47,72,165,0.35)",
              }}
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
