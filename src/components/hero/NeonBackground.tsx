"use client";

import React from "react";

const BLOCKS = [
  // Large main blocks (back layer)
  {
    id: "b1",
    style: {
      top: "8%", left: "-4%", width: "340px", height: "220px",
      background: "linear-gradient(135deg, #09122B 0%, #050B1B 60%, #02040D 100%)",
      border: "1px solid rgba(125,160,255,0.12)",
      borderRadius: "18px",
      transform: "skewY(-3deg) rotate(-2deg)",
      boxShadow: "0 0 60px rgba(47,72,165,0.08), inset 0 1px 0 rgba(140,203,255,0.06)",
      filter: "blur(0.5px)",
    },
  },
  {
    id: "b2",
    style: {
      top: "5%", right: "-6%", width: "380px", height: "260px",
      background: "linear-gradient(145deg, #0B1022 0%, #09122B 50%, #050B1B 100%)",
      border: "1px solid rgba(125,160,255,0.10)",
      borderRadius: "22px",
      transform: "skewY(2deg) rotate(1.5deg)",
      boxShadow: "0 0 80px rgba(47,72,165,0.07), inset 0 1px 0 rgba(140,203,255,0.05)",
      filter: "blur(0.3px)",
    },
  },
  {
    id: "b3",
    style: {
      bottom: "10%", left: "-2%", width: "300px", height: "200px",
      background: "linear-gradient(135deg, #09122B 0%, #0B1022 100%)",
      border: "1px solid rgba(125,160,255,0.09)",
      borderRadius: "16px",
      transform: "skewY(4deg) rotate(-1deg)",
      boxShadow: "0 0 50px rgba(47,72,165,0.07)",
      filter: "blur(0.4px)",
    },
  },
  {
    id: "b4",
    style: {
      bottom: "8%", right: "-3%", width: "320px", height: "240px",
      background: "linear-gradient(155deg, #0B1022 0%, #09122B 70%, #050B1B 100%)",
      border: "1px solid rgba(125,160,255,0.09)",
      borderRadius: "20px",
      transform: "skewY(-2deg) rotate(2deg)",
      boxShadow: "0 0 60px rgba(47,72,165,0.06)",
      filter: "blur(0.3px)",
    },
  },
  // Mid-layer accent blocks
  {
    id: "b5",
    style: {
      top: "28%", left: "3%", width: "160px", height: "100px",
      background: "linear-gradient(135deg, #0B1022 0%, #09122B 100%)",
      border: "1px solid rgba(99,214,255,0.08)",
      borderRadius: "12px",
      transform: "rotate(-1.5deg)",
      boxShadow: "0 0 30px rgba(99,214,255,0.06)",
    },
  },
  {
    id: "b6",
    style: {
      top: "32%", right: "4%", width: "140px", height: "90px",
      background: "linear-gradient(135deg, #0B1022 0%, #09122B 100%)",
      border: "1px solid rgba(146,124,255,0.1)",
      borderRadius: "12px",
      transform: "rotate(1deg)",
      boxShadow: "0 0 30px rgba(146,124,255,0.07)",
    },
  },
  // Small accent shapes near center bottom
  {
    id: "b7",
    style: {
      bottom: "28%", left: "12%", width: "90px", height: "60px",
      background: "linear-gradient(135deg, #09122B 0%, #0B1022 100%)",
      border: "1px solid rgba(99,214,255,0.12)",
      borderRadius: "10px",
      transform: "rotate(2deg)",
    },
  },
  {
    id: "b8",
    style: {
      bottom: "32%", right: "14%", width: "80px", height: "55px",
      background: "linear-gradient(135deg, #09122B 0%, #0B1022 100%)",
      border: "1px solid rgba(157,245,176,0.1)",
      borderRadius: "10px",
      transform: "rotate(-1.5deg)",
    },
  },
];

export const NeonBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #02040D 0%, #050B1B 45%, #02040D 100%)" }}
    >
      {/* ── Subtle perspective grid ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Horizontal grid lines with perspective convergence */}
        {[100, 180, 260, 340, 420, 500, 580, 660, 740, 820].map((y, i) => (
          <line
            key={`h${i}`}
            x1="0" y1={y} x2="1440" y2={y}
            stroke="#8ACBFF"
            strokeWidth="0.6"
          />
        ))}
        {/* Vertical perspective lines converging toward centre */}
        {[-200, -50, 100, 250, 400, 550, 700, 850, 1000, 1150, 1300, 1450, 1640].map((x, i) => (
          <line
            key={`v${i}`}
            x1={720} y1={0} x2={x} y2={900}
            stroke="#8ACBFF"
            strokeWidth="0.4"
          />
        ))}
        {/* Subtle circular guide rings */}
        <circle cx="720" cy="500" r="260" stroke="#8ACBFF" strokeWidth="0.5" />
        <circle cx="720" cy="500" r="440" stroke="#8ACBFF" strokeWidth="0.4" />
        <circle cx="720" cy="500" r="620" stroke="#8ACBFF" strokeWidth="0.3" />
      </svg>

      {/* ── Geometric blocks ── */}
      {BLOCKS.map((b) => (
        <div key={b.id} className="absolute pointer-events-none" style={b.style} />
      ))}

      {/* ── Central radial blue glow (behind headline) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "820px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(47,72,165,0.22) 0%, rgba(99,214,255,0.08) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Lower middle glow (behind dashboard) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1100px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(47,72,165,0.3) 0%, rgba(99,214,255,0.1) 50%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Corner vignettes for readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(2,4,13,0.7) 100%)",
        }}
      />

      {/* ── Atmospheric haze ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-5%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse, rgba(47,72,165,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5%",
          right: "-5%",
          width: "45%",
          height: "55%",
          background:
            "radial-gradient(ellipse, rgba(146,124,255,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
};
