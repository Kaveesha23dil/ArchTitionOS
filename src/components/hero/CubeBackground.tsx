"use client";

import React from "react";

export const CubeBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ background: "linear-gradient(160deg, #02040D 0%, #050B1B 40%, #04080F 100%)" }}
    >
      {/* ─── SVG: 3D isometric cubes + neon light paths ─── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Cyan glow filter */}
          <filter id="cyanGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Violet glow filter */}
          <filter id="violetGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Soft ambient filter */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Cube face gradients */}
          <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D1B3E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#060E22" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#03060F" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#060E22" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#060E22" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#02040A" stopOpacity="0.98" />
          </linearGradient>

          {/* Path glow gradient - cyan */}
          <linearGradient id="pathCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#63D6FF" stopOpacity="0" />
            <stop offset="30%" stopColor="#63D6FF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#4FC8FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#63D6FF" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="pathViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#927CFF" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#927CFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B48CFF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="pathBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2F48A5" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#4A6FE3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2F48A5" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ══════════════════════════════
            LARGE CUBE — LEFT SIDE
        ══════════════════════════════ */}
        {/* Top face */}
        <polygon
          points="60,130 280,60 500,130 280,200"
          fill="url(#cubeTop)"
          stroke="rgba(99,214,255,0.12)"
          strokeWidth="1"
        />
        {/* Left face */}
        <polygon
          points="60,130 280,200 280,420 60,350"
          fill="url(#cubeLeft)"
          stroke="rgba(99,214,255,0.08)"
          strokeWidth="1"
        />
        {/* Right face */}
        <polygon
          points="280,200 500,130 500,350 280,420"
          fill="url(#cubeRight)"
          stroke="rgba(99,214,255,0.06)"
          strokeWidth="1"
        />
        {/* Top edge highlight */}
        <polyline
          points="60,130 280,60 500,130"
          stroke="rgba(99,214,255,0.25)"
          strokeWidth="1"
          fill="none"
        />

        {/* ══════════════════════════════
            MEDIUM CUBE — LEFT FOREGROUND
        ══════════════════════════════ */}
        <polygon
          points="-20,360 160,300 320,360 160,420"
          fill="url(#cubeTop)"
          stroke="rgba(99,214,255,0.1)"
          strokeWidth="1"
        />
        <polygon
          points="-20,360 160,420 160,580 -20,520"
          fill="url(#cubeLeft)"
          stroke="rgba(99,214,255,0.07)"
          strokeWidth="1"
        />
        <polygon
          points="160,420 320,360 320,520 160,580"
          fill="url(#cubeRight)"
          stroke="rgba(99,214,255,0.05)"
          strokeWidth="1"
        />
        <polyline
          points="-20,360 160,300 320,360"
          stroke="rgba(99,214,255,0.18)"
          strokeWidth="1"
          fill="none"
        />

        {/* ══════════════════════════════
            SMALL CUBE — TOP LEFT
        ══════════════════════════════ */}
        <polygon
          points="200,20 340,-20 480,20 340,60"
          fill="url(#cubeTop)"
          stroke="rgba(99,214,255,0.1)"
          strokeWidth="0.8"
        />
        <polygon
          points="200,20 340,60 340,160 200,120"
          fill="url(#cubeLeft)"
          stroke="rgba(99,214,255,0.07)"
          strokeWidth="0.8"
        />
        <polygon
          points="340,60 480,20 480,120 340,160"
          fill="url(#cubeRight)"
          stroke="rgba(99,214,255,0.05)"
          strokeWidth="0.8"
        />

        {/* ══════════════════════════════
            LARGE CUBE — RIGHT SIDE
        ══════════════════════════════ */}
        <polygon
          points="940,80 1160,20 1380,80 1160,140"
          fill="url(#cubeTop)"
          stroke="rgba(99,214,255,0.12)"
          strokeWidth="1"
        />
        <polygon
          points="940,80 1160,140 1160,360 940,300"
          fill="url(#cubeLeft)"
          stroke="rgba(99,214,255,0.08)"
          strokeWidth="1"
        />
        <polygon
          points="1160,140 1380,80 1380,300 1160,360"
          fill="url(#cubeRight)"
          stroke="rgba(99,214,255,0.06)"
          strokeWidth="1"
        />
        <polyline
          points="940,80 1160,20 1380,80"
          stroke="rgba(99,214,255,0.22)"
          strokeWidth="1"
          fill="none"
        />

        {/* ══════════════════════════════
            MEDIUM CUBE — RIGHT FOREGROUND
        ══════════════════════════════ */}
        <polygon
          points="1100,320 1300,260 1480,320 1300,380"
          fill="url(#cubeTop)"
          stroke="rgba(146,124,255,0.12)"
          strokeWidth="1"
        />
        <polygon
          points="1100,320 1300,380 1300,540 1100,480"
          fill="url(#cubeLeft)"
          stroke="rgba(146,124,255,0.08)"
          strokeWidth="1"
        />
        <polygon
          points="1300,380 1480,320 1480,480 1300,540"
          fill="url(#cubeRight)"
          stroke="rgba(146,124,255,0.06)"
          strokeWidth="1"
        />
        <polyline
          points="1100,320 1300,260 1480,320"
          stroke="rgba(146,124,255,0.28)"
          strokeWidth="1"
          fill="none"
        />

        {/* ══════════════════════════════
            SMALL CUBE — RIGHT TOP
        ══════════════════════════════ */}
        <polygon
          points="1200,0 1340,−30 1480,0 1340,30"
          fill="url(#cubeTop)"
          stroke="rgba(99,214,255,0.08)"
          strokeWidth="0.8"
        />
        <polygon
          points="1200,0 1340,30 1340,140 1200,110"
          fill="url(#cubeLeft)"
          stroke="rgba(99,214,255,0.06)"
          strokeWidth="0.8"
        />

        {/* ══════════════════════════════
            EXTRA CUBES — BOTTOM SIDES
        ══════════════════════════════ */}
        <polygon
          points="-40,580 120,530 280,580 120,630"
          fill="url(#cubeTop)"
          stroke="rgba(99,214,255,0.09)"
          strokeWidth="0.8"
        />
        <polygon
          points="-40,580 120,630 120,750 -40,700"
          fill="url(#cubeLeft)"
          stroke="rgba(99,214,255,0.06)"
          strokeWidth="0.8"
        />
        <polygon
          points="120,630 280,580 280,700 120,750"
          fill="url(#cubeRight)"
          stroke="rgba(99,214,255,0.05)"
          strokeWidth="0.8"
        />

        <polygon
          points="1160,540 1340,480 1520,540 1340,600"
          fill="url(#cubeTop)"
          stroke="rgba(146,124,255,0.09)"
          strokeWidth="0.8"
        />
        <polygon
          points="1160,540 1340,600 1340,740 1160,680"
          fill="url(#cubeLeft)"
          stroke="rgba(146,124,255,0.06)"
          strokeWidth="0.8"
        />
        <polygon
          points="1340,600 1520,540 1520,680 1340,740"
          fill="url(#cubeRight)"
          stroke="rgba(146,124,255,0.04)"
          strokeWidth="0.8"
        />

        {/* ════════════════════════════════════════
            NEON PATH 1 — CYAN — routes left cubes
        ════════════════════════════════════════ */}
        {/* Glow layer */}
        <path
          d="M 60 280 C 120 240, 200 200, 280 200 C 360 200, 420 260, 480 280 C 540 300, 580 340, 620 360 C 680 390, 720 400, 760 400"
          stroke="#63D6FF"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
          filter="url(#softGlow)"
        />
        {/* Sharp path */}
        <path
          id="path-cyan-1"
          d="M 60 280 C 120 240, 200 200, 280 200 C 360 200, 420 260, 480 280 C 540 300, 580 340, 620 360 C 680 390, 720 400, 760 400"
          stroke="url(#pathCyan)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="20 45"
          fill="none"
          filter="url(#cyanGlow)"
          opacity="0.9"
        />

        {/* ════════════════════════════════════════
            NEON PATH 2 — CYAN — top arch right
        ════════════════════════════════════════ */}
        <path
          d="M 680 340 C 760 310, 840 280, 940 240 C 1020 210, 1100 180, 1160 160 C 1220 140, 1300 120, 1380 100"
          stroke="#63D6FF"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.18"
          filter="url(#softGlow)"
        />
        <path
          id="path-cyan-2"
          d="M 680 340 C 760 310, 840 280, 940 240 C 1020 210, 1100 180, 1160 160 C 1220 140, 1300 120, 1380 100"
          stroke="#63D6FF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="16 40"
          fill="none"
          filter="url(#cyanGlow)"
          opacity="0.8"
        />

        {/* ════════════════════════════════════════
            NEON PATH 3 — VIOLET — right side curves
        ════════════════════════════════════════ */}
        <path
          d="M 1380 180 C 1360 240, 1340 290, 1300 320 C 1260 350, 1220 370, 1180 400 C 1140 430, 1100 460, 1060 500"
          stroke="#927CFF"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.2"
          filter="url(#softGlow)"
        />
        <path
          id="path-violet-1"
          d="M 1380 180 C 1360 240, 1340 290, 1300 320 C 1260 350, 1220 370, 1180 400 C 1140 430, 1100 460, 1060 500"
          stroke="url(#pathViolet)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="14 36"
          fill="none"
          filter="url(#violetGlow)"
          opacity="0.85"
        />

        {/* ════════════════════════════════════════
            NEON PATH 4 — CYAN — lower sweep
        ════════════════════════════════════════ */}
        <path
          d="M 120 650 C 200 620, 300 590, 400 570 C 500 550, 600 545, 700 540 C 800 535, 900 535, 1000 530"
          stroke="#63D6FF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.12"
          filter="url(#softGlow)"
        />
        <path
          id="path-cyan-3"
          d="M 120 650 C 200 620, 300 590, 400 570 C 500 550, 600 545, 700 540 C 800 535, 900 535, 1000 530"
          stroke="#63D6FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="12 30"
          fill="none"
          filter="url(#cyanGlow)"
          opacity="0.7"
        />

        {/* ════════════════════════════════════════
            NEON PATH 5 — VIOLET — bottom right
        ════════════════════════════════════════ */}
        <path
          d="M 1060 500 C 1080 560, 1100 610, 1120 660 C 1140 710, 1150 750, 1160 790"
          stroke="#927CFF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
          filter="url(#softGlow)"
        />
        <path
          id="path-violet-2"
          d="M 1060 500 C 1080 560, 1100 610, 1120 660 C 1140 710, 1150 750, 1160 790"
          stroke="#927CFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="10 25"
          fill="none"
          filter="url(#violetGlow)"
          opacity="0.8"
        />

        {/* ── Ambient edge glow on large left cube ── */}
        <polyline
          points="60,130 280,60 500,130 500,350 280,420 60,350 60,130"
          stroke="rgba(99,214,255,0.12)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Ambient edge glow on large right cube */}
        <polyline
          points="940,80 1160,20 1380,80 1380,300 1160,360 940,300 940,80"
          stroke="rgba(99,214,255,0.1)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Right foreground cube violet edge */}
        <polyline
          points="1100,320 1300,260 1480,320 1480,480 1300,540 1100,480 1100,320"
          stroke="rgba(146,124,255,0.15)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* ── Central radial glow (behind headline) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%", left: "50%",
          transform: "translateX(-50%)",
          width: "900px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(47,72,165,0.18) 0%, rgba(99,214,255,0.07) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Bottom glow behind dashboard ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%", left: "50%",
          transform: "translateX(-50%)",
          width: "1200px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(47,72,165,0.32) 0%, rgba(99,214,255,0.1) 50%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      {/* ── Corner vignettes ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(2,4,13,0.8) 100%)" }}
      />
    </div>
  );
};
