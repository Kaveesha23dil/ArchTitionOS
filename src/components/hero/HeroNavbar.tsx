"use client";

import React, { useState } from "react";
import { Cpu, Menu, X, ArrowUpRight } from "lucide-react";

export const HeroNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[1100px] h-[64px] rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-slate-800/80 shadow-[0_0_25px_rgba(47,72,165,0.15)] flex items-center justify-between px-6 transition-all duration-300">
      {/* Left: Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-md shadow-cyan-500/20">
          <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
            <Cpu className="h-4 w-4 text-cyan-400" />
          </div>
        </div>
        <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
          Vectorium <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">LABS</span>
        </span>
      </div>

      {/* Center Links (Desktop) */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#services" className="hover:text-cyan-400 transition-colors">
          Services
        </a>
        <a href="#solutions" className="hover:text-cyan-400 transition-colors">
          Solutions
        </a>
        <a href="#work" className="hover:text-cyan-400 transition-colors">
          Work
        </a>
        <a href="#company" className="hover:text-cyan-400 transition-colors">
          Company
        </a>
      </div>

      {/* Right: CTA Button */}
      <div className="hidden md:flex items-center gap-4">
        <a
          href="#contact"
          className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all duration-300 active:scale-95 flex items-center gap-1.5"
        >
          <span>Let&apos;s Talk</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-all"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 p-5 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-slate-800 shadow-2xl flex flex-col gap-4 text-sm font-medium text-slate-300 md:hidden animate-in fade-in slide-in-from-top-2">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cyan-400 transition-colors py-1"
          >
            Services
          </a>
          <a
            href="#solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cyan-400 transition-colors py-1"
          >
            Solutions
          </a>
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cyan-400 transition-colors py-1"
          >
            Work
          </a>
          <a
            href="#company"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cyan-400 transition-colors py-1"
          >
            Company
          </a>
          <div className="pt-2 border-t border-slate-800">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              Let&apos;s Talk <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
