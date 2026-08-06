"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface PathDef {
  id: string;
  d: string;
  stroke: string;
  strokeWidth: number;
  dashArray: string;
  dashOffset: number;
  glowColor: string;
  duration: number;
}

const PATHS: PathDef[] = [
  {
    id: "p1",
    d: "M -80 280 C 180 280, 280 200, 480 200 C 680 200, 780 320, 960 320 C 1140 320, 1240 240, 1440 260 C 1580 272, 1640 240, 1720 240",
    stroke: "#63D6FF",
    strokeWidth: 1.8,
    dashArray: "18 40",
    dashOffset: 0,
    glowColor: "rgba(99,214,255,0.6)",
    duration: 18,
  },
  {
    id: "p2",
    d: "M -60 580 C 220 580, 360 460, 580 460 C 800 460, 900 600, 1080 600 C 1260 600, 1360 500, 1560 520 C 1660 530, 1720 510, 1800 510",
    stroke: "#927CFF",
    strokeWidth: 1.5,
    dashArray: "14 35",
    dashOffset: 0,
    glowColor: "rgba(146,124,255,0.55)",
    duration: 22,
  },
  {
    id: "p3",
    d: "M 100 760 C 380 720, 520 640, 720 640 C 920 640, 1060 740, 1280 720 C 1440 706, 1560 680, 1740 680",
    stroke: "#9DF5B0",
    strokeWidth: 1.2,
    dashArray: "10 28",
    dashOffset: 0,
    glowColor: "rgba(157,245,176,0.5)",
    duration: 26,
  },
  {
    id: "p4",
    d: "M -100 420 C 160 420, 300 360, 520 340 C 740 320, 880 440, 1100 430 C 1300 420, 1420 380, 1600 380 C 1680 380, 1740 370, 1820 370",
    stroke: "#8ACBFF",
    strokeWidth: 1.4,
    dashArray: "12 32",
    dashOffset: 0,
    glowColor: "rgba(138,203,255,0.5)",
    duration: 20,
  },
  // Accent path — short, near centre bottom
  {
    id: "p5",
    d: "M 480 830 C 580 790, 680 810, 760 790 C 840 770, 920 800, 1000 790 C 1080 780, 1160 800, 1260 790",
    stroke: "#2F48A5",
    strokeWidth: 2,
    dashArray: "6 20",
    dashOffset: 0,
    glowColor: "rgba(47,72,165,0.7)",
    duration: 15,
  },
];

export const GlowPaths: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      PATHS.forEach((p) => {
        const el = document.getElementById(`gp-${p.id}`);
        if (!el) return;

        // Data-light travelling animation via strokeDashoffset
        gsap.to(el, {
          strokeDashoffset: -800,
          duration: p.duration,
          repeat: -1,
          ease: "none",
        });
      });
    }, svgRef);

    return () => ctxRef.current?.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {PATHS.map((p) => (
          <filter key={`f-${p.id}`} id={`glow-${p.id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {PATHS.map((p) => (
        <g key={p.id}>
          {/* Glow layer (blurred duplicate) */}
          <path
            d={p.d}
            stroke={p.stroke}
            strokeWidth={p.strokeWidth * 3}
            strokeDasharray={p.dashArray}
            strokeLinecap="round"
            opacity={0.18}
            filter={`url(#glow-${p.id})`}
          />
          {/* Sharp main path */}
          <path
            id={`gp-${p.id}`}
            d={p.d}
            stroke={p.stroke}
            strokeWidth={p.strokeWidth}
            strokeDasharray={p.dashArray}
            strokeDashoffset={p.dashOffset}
            strokeLinecap="round"
            opacity={0.75}
            filter={`url(#glow-${p.id})`}
          />
        </g>
      ))}
    </svg>
  );
};
