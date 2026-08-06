"use client";

import { useState } from "react";
import { TerminalLoader } from "@/components/TerminalLoader";
import { Navbar } from "@/components/Navbar";
import { HeroAnimation } from "@/components/HeroAnimation";
import { BootScreen } from "@/components/BootScreen";
import { GsapPlayground } from "@/components/GsapPlayground";
import { TechStack } from "@/components/TechStack";
import { Sparkles, Terminal, Monitor, RefreshCw } from "lucide-react";

export default function Home() {
  const [showTerminalLoader, setShowTerminalLoader] = useState(true);
  const [showGraphicOverlay, setShowGraphicOverlay] = useState(false);

  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* 1. Terminal Console Boot Loader (Runs on initial page load) */}
      {showTerminalLoader && (
        <TerminalLoader
          onComplete={() => {
            setShowTerminalLoader(false);
          }}
        />
      )}

      {/* 2. Fullscreen Graphic Boot Overlay Trigger */}
      {showGraphicOverlay && (
        <BootScreen
          isOverlay={true}
          onComplete={() => {
            setTimeout(() => setShowGraphicOverlay(false), 1000);
          }}
        />
      )}

      {/* Main Website Workspace Content (Revealed after boot loader finishes) */}
      <div>
        <Navbar />

        {/* Hero Section */}
        <HeroAnimation />

        {/* Console Boot Sequence Controls & Showcase */}
        <section id="boot-sequence" className="py-16 px-6 max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F48A5]/10 border border-[#2F48A5]/30 text-xs font-mono text-blue-400">
              <Terminal className="w-3.5 h-3.5" /> LINUX CONSOLE INITIALIZATION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              System Initialization & Boot Sequences
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Test both authentic Linux terminal console initialization and futuristic graphic boot animations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setShowTerminalLoader(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-semibold transition-all border border-zinc-700 active:scale-95"
              >
                <RefreshCw className="w-4 h-4 text-emerald-400" /> Re-run Terminal Console Boot
              </button>

              <button
                onClick={() => setShowGraphicOverlay(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-blue-600/30 active:scale-95"
              >
                <Monitor className="w-4 h-4" /> Fullscreen Graphic Boot
              </button>
            </div>
          </div>

          {/* Embedded Graphic Animation Canvas */}
          <BootScreen isOverlay={false} />
        </section>

        {/* GSAP Controls Lab */}
        <GsapPlayground />

        {/* Tech Stack */}
        <TechStack />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 px-6 mt-16 text-center text-xs text-slate-500 space-y-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Vectorium Labs OS &mdash; Next.js, Tailwind CSS & GSAP 3</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-slate-200 transition-colors">Terminal Boot Sequence Active</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
