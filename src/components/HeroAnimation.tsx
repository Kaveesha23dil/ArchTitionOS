"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles, Play, ShieldCheck, Zap } from "lucide-react";

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered text & badge reveal
      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.7,
      })
        .from(
          ".hero-title-word",
          {
            opacity: 0,
            y: 40,
            duration: 0.9,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".hero-card",
          {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
          },
          "-=0.4"
        );

      // Ambient background orb floating continuous animation
      gsap.to(orbRef1.current, {
        x: 40,
        y: -30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.easeInOut",
      });

      gsap.to(orbRef2.current, {
        x: -50,
        y: 40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.easeInOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden py-16 md:py-24 px-6">
      {/* Background Glowing Orbs */}
      <div
        ref={orbRef1}
        className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none"
      />
      <div
        ref={orbRef2}
        className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Project Tagline Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-950/50">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>FINAL YEAR PROJECT FOUNDATION</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          <span className="hero-title-word inline-block">Craft</span>{" "}
          <span className="hero-title-word inline-block gradient-text">Next-Gen</span>{" "}
          <span className="hero-title-word inline-block">Web Applications</span>
        </h1>

        {/* Hero Description */}
        <p className="hero-subtitle max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed font-light">
          Powered by <span className="text-white font-medium">Next.js 16</span>,{" "}
          <span className="text-cyan-400 font-medium">Tailwind CSS v4</span>, and{" "}
          <span className="text-purple-400 font-medium">GSAP 3</span>. Fully configured and optimized for high-performance animation and state management.
        </p>

        {/* Hero Action Buttons */}
        <div className="hero-actions flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#playground"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
          >
            Launch Animation Lab <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium text-sm transition-all active:scale-95"
          >
            Explore Tech Stack
          </a>
        </div>

        {/* Quick Highlights Grid */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="hero-card glass-card p-6 rounded-2xl text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-100 text-base">App Router Setup</h3>
            <p className="text-sm text-slate-400">
              Fully set up with Server Components, TypeScript, and optimized asset delivery.
            </p>
          </div>

          <div className="hero-card glass-card p-6 rounded-2xl text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-100 text-base">GSAP React Hooks</h3>
            <p className="text-sm text-slate-400">
              Integrated with `@gsap/react` for automatic cleanup, context scoping, and zero memory leaks.
            </p>
          </div>

          <div className="hero-card glass-card p-6 rounded-2xl text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-100 text-base">Tailwind CSS v4</h3>
            <p className="text-sm text-slate-400">
              Modern utility-first styling with responsive glassmorphic design system tokens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
