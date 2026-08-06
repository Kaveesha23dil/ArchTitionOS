"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, Layers, Cpu, Code2 } from "lucide-react";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, { scope: navRef });

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 px-6 py-4 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Cpu className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-100 flex items-center gap-2">
              ARCHTITON <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">FYP OS</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#overview" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Overview
          </a>
          <a href="#features" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-400" /> Architecture
          </a>
          <a href="#playground" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-emerald-400" /> GSAP Lab
          </a>
        </nav>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Environment Ready
          </div>
        </div>
      </div>
    </header>
  );
}
