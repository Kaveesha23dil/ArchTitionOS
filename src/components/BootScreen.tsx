"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RotateCcw } from "lucide-react";

gsap.registerPlugin(useGSAP);

interface BootScreenProps {
  onComplete?: () => void;
  isOverlay?: boolean;
}

export function BootScreen({ onComplete, isOverlay = false }: BootScreenProps) {
  const bootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      setProgress(0);
      setDots("");

      // Interval for dots sequence: "INITIALIZING SYSTEM", "INITIALIZING SYSTEM.", etc.
      const dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 400);

      const tl = gsap.timeline({
        onComplete: () => {
          clearInterval(dotsInterval);
          if (onComplete) onComplete();
        },
      });

      timelineRef.current = tl;

      // Reset initial states
      gsap.set(".boot-glow", { opacity: 0, scale: 0.8 });
      gsap.set(".boot-particle", { opacity: 0, scale: 0 });
      gsap.set(".boot-symbol-path-1", { strokeDashoffset: 700 });
      gsap.set(".boot-symbol-path-2", { strokeDashoffset: 400 });
      gsap.set(".boot-symbol-line", { strokeDashoffset: 100 });
      gsap.set(".boot-symbol-core", { opacity: 0, scale: 0, svgOrigin: "200 180" });
      gsap.set(".boot-ring", { opacity: 0, scale: 0.8, svgOrigin: "200 200" });
      gsap.set(".boot-progress-bar", { width: "0%" });
      gsap.set(".boot-pulse", { opacity: 0, scale: 0.8 });

      // 0–1s: Dark screen with faint central blue glow
      tl.to(".boot-glow", {
        opacity: 0.6,
        scale: 1.2,
        duration: 1,
        ease: "power2.inOut",
      });

      // 1–2s: Small particles move toward center (200, 200)
      tl.fromTo(
        ".boot-particle",
        {
          opacity: 0,
          scale: 0,
          x: (i) => Math.cos((i * Math.PI) / 4) * 140,
          y: (i) => Math.sin((i * Math.PI) / 4) * 140,
        },
        {
          opacity: 0.9,
          scale: 1,
          x: 0,
          y: 0,
          duration: 1,
          stagger: 0.06,
          ease: "power2.in",
        },
        "-=0.2"
      );

      // 2–4s: Thin geometric lines assemble central triangular symbol
      tl.to(
        ".boot-symbol-path-1",
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power3.inOut",
        },
        "+=0.1"
      )
        .to(
          ".boot-symbol-path-2",
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power3.inOut",
          },
          "-=0.8"
        )
        .to(
          ".boot-symbol-line",
          {
            strokeDashoffset: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          ".boot-symbol-core",
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.3"
        );

      // 4–6s: Circular interface rings appear and rotate smoothly around symbol
      tl.to(
        ".boot-ring",
        {
          opacity: 0.7,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.5)",
        },
        "-=0.2"
      );

      // Continuous rotation of outer & inner rings in opposite directions
      gsap.to(".boot-ring-outer", {
        rotation: 360,
        svgOrigin: "200 200",
        duration: 14,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".boot-ring-inner", {
        rotation: -360,
        svgOrigin: "200 200",
        duration: 9,
        repeat: -1,
        ease: "none",
      });

      // 6–8s: Loading line fills 0% to 100%
      tl.to(
        ".boot-progress-bar",
        {
          width: "100%",
          duration: 2,
          ease: "power1.inOut",
          onUpdate: function () {
            setProgress(Math.round(this.progress() * 100));
          },
        },
        "+=0.1"
      );

      // 8–9s: Symbol emits one soft light pulse and whole interface gently fades
      tl.to(".boot-pulse", {
        opacity: 0.8,
        scale: 1.8,
        duration: 0.5,
        ease: "power2.out",
      }).to(".boot-pulse", {
        opacity: 0,
        scale: 2.4,
        duration: 0.4,
        ease: "power2.in",
      });

      if (isOverlay) {
        tl.to(bootRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }

      return () => {
        clearInterval(dotsInterval);
      };
    },
    { scope: bootRef }
  );

  const handleReplay = () => {
    if (timelineRef.current) {
      if (bootRef.current) gsap.set(bootRef.current, { opacity: 1 });
      timelineRef.current.restart();
    }
  };

  return (
    <div
      ref={bootRef}
      className={`${
        isOverlay
          ? "fixed inset-0 z-50"
          : "relative w-full h-[600px] rounded-3xl overflow-hidden border border-slate-800"
      } bg-[#050713] flex flex-col items-center justify-center font-mono selection:bg-blue-600 selection:text-white`}
    >
      {/* Background Central Glow */}
      <div className="boot-glow absolute w-96 h-96 rounded-full bg-[#2F48A5]/30 blur-[130px] pointer-events-none" />

      {/* Main SVG Graphic Canvas */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Soft Light Pulse Effect */}
        <div className="boot-pulse absolute w-48 h-48 rounded-full bg-[#3B82F6]/50 blur-2xl pointer-events-none" />

        <svg
          viewBox="0 0 400 400"
          className="w-full h-full text-[#2F48A5] overflow-visible"
        >
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2F48A5" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Converging Particles (1–2s) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <circle
              key={i}
              className="boot-particle"
              cx="200"
              cy="200"
              r="2.5"
              fill="#60A5FA"
            />
          ))}

          {/* Outer Interface Rotating Ring (4–6s) */}
          <circle
            className="boot-ring boot-ring-outer"
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="#2F48A5"
            strokeWidth="1.2"
            strokeDasharray="16 12 4 12"
          />

          {/* Inner Counter-Rotating Ring (4–6s) */}
          <circle
            className="boot-ring boot-ring-inner"
            cx="200"
            cy="200"
            r="115"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="0.8"
            strokeOpacity="0.7"
            strokeDasharray="4 8"
          />

          {/* Central Triangular Technology Symbol (2–4s) */}
          {/* Main Triangle Outer Frame */}
          <path
            className="boot-symbol-path-1"
            d="M 200 85 L 295 255 L 105 255 Z"
            fill="none"
            stroke="url(#blueGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 700, strokeDashoffset: 700 }}
            filter="url(#glowFilter)"
          />

          {/* Inner Inverted Accent Triangle */}
          <path
            className="boot-symbol-path-2"
            d="M 200 225 L 245 145 L 155 145 Z"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeOpacity="0.85"
            style={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          />

          {/* Geometric Inner Circuit Connector Lines */}
          <line
            className="boot-symbol-line"
            x1="200"
            y1="85"
            x2="200"
            y2="145"
            stroke="#60A5FA"
            strokeWidth="1.5"
            style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
          />
          <line
            className="boot-symbol-line"
            x1="105"
            y1="255"
            x2="155"
            y2="225"
            stroke="#60A5FA"
            strokeWidth="1.5"
            style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
          />
          <line
            className="boot-symbol-line"
            x1="295"
            y1="255"
            x2="245"
            y2="225"
            stroke="#60A5FA"
            strokeWidth="1.5"
            style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
          />

          {/* Glowing Center Core */}
          <circle
            className="boot-symbol-core"
            cx="200"
            cy="180"
            r="4.5"
            fill="#FFFFFF"
            filter="url(#glowFilter)"
          />
        </svg>
      </div>

      {/* Loading Progress & Status Section (6–8s) */}
      <div className="w-64 space-y-3 text-center mt-6">
        {/* Thin Horizontal Loading Line */}
        <div className="w-full h-[2px] bg-slate-900 rounded-full overflow-hidden relative">
          <div className="boot-progress-bar h-full bg-gradient-to-r from-[#2F48A5] via-[#3B82F6] to-[#60A5FA] w-0 shadow-[0_0_12px_#3B82F6]" />
        </div>

        {/* Minimal Modern Typography */}
        <div className="flex items-center justify-between text-[11px] tracking-[0.25em] text-slate-400 font-mono pt-1">
          <span>INITIALIZING SYSTEM{dots}</span>
          <span className="text-[#60A5FA] font-bold">{progress}%</span>
        </div>
      </div>

      {/* Control Actions */}
      {!isOverlay && (
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <button
            onClick={handleReplay}
            className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#3B82F6]" /> Replay Sequence
          </button>
        </div>
      )}
    </div>
  );
}
