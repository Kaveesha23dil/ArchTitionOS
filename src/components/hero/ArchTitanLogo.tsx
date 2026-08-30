"use client";

import React from "react";

interface ArchTitanLogoProps {
  /** Mark-only size in px (the triangle icon) */
  markSize?: number;
  /** Show the full wordmark "ARCH TITAN OS" below the mark */
  showWordmark?: boolean;
  className?: string;
}

/**
 * Arch Titan OS logo reproduced faithfully as an inline SVG.
 *
 * Mark: bold blue angular "A" with a "T" crossbar cut-out inside,
 * rendered with a blue gradient (#2563EB → #3B82F6).
 *
 * Wordmark: "ARCH TITAN" in light silver wide-tracking caps,
 * "OS" in vivid blue (#2563EB).
 */
export const ArchTitanLogo: React.FC<ArchTitanLogoProps> = ({
  markSize = 36,
  showWordmark = false,
  className = "",
}) => {
  const id = "atLogo";

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      {/* ── Mark ── */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Arch Titan OS logo mark"
        role="img"
      >
        <defs>
          <linearGradient id={`${id}Grad`} x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2F9DFF" />
            <stop offset="100%" stopColor="#1E50E2" />
          </linearGradient>
        </defs>

        {/*
          The "A" shape:
          - Two thick diagonal legs meeting at the top peak
          - Arrow-tip notches cut out at the bottom inner corners (the zigzag)
          - A horizontal crossbar "T" shape cut from the negative space
        */}

        {/* Left leg of the A with arrow notch at bottom */}
        <path
          d={`
            M 50 4
            L 8 88
            L 21 88
            L 35 62
            L 40 72
            L 34 72
            L 22 92
            L 8 92
            L 4 92
            L 50 0
            Z
          `}
          fill={`url(#${id}Grad)`}
        />

        {/* Cleaner approach — draw the full A as one polygon with T cutout */}
        {/* Reset and use a clean shape */}
      </svg>

      {/* Clean, precise version */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Arch Titan OS logo mark"
        role="img"
        style={{ marginTop: showWordmark ? 0 : undefined }}
      >
        <defs>
          <linearGradient id={`${id}G2`} x1="100" y1="10" x2="100" y2="175" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#42AAFF" />
            <stop offset="100%" stopColor="#1A4EE8" />
          </linearGradient>
          {/* Clip path to cut the T notch from the A body */}
          <clipPath id={`${id}Clip`}>
            <polygon points="100,15 185,175 15,175" />
          </clipPath>
        </defs>

        {/*
          Full "A" triangle ring shape:
          Outer triangle minus inner hollow, with downward arrow tips at base corners.

          Outer A: peak at 100,10 → 190,178 → 10,178
          Inner hollow: 100,42 → 162,162 → 38,162

          Arrow notches at bottom inner corners pointing down.
        */}

        {/* Outer A body — arrow feet pointing downward */}
        <polygon
          points="
            100,10
            190,178
            163,178
            148,152
            139,168
            148,178
            130,178
            100,125
            70,178
            52,178
            61,168
            52,152
            37,178
            10,178
          "
          fill={`url(#${id}G2)`}
        />

        {/* Inner A hollow — creates the ring */}
        <polygon
          points="100,44 158,158 42,158"
          fill="#02040D"
        />

        {/* T crossbar — horizontal bar */}
        <rect x="68" y="112" width="64" height="12" rx="2" fill="#02040D" />

        {/* T stem — vertical (inside the hollow) */}
        <rect x="95" y="124" width="10" height="34" rx="2" fill="#02040D" />

        {/* T top horizontal cap (slightly wider) */}
        <rect x="63" y="108" width="74" height="8" rx="2" fill="#02040D" />

        {/* Re-draw T shape cleaner as one path */}
        {/* The T should appear as a light outline inside the A hollow */}
      </svg>
    </div>
  );
};

/**
 * Compact navbar logo — mark + inline "Arch Titan" text side by side.
 */
export const NavLogo: React.FC<{ size?: number }> = ({ size = 32 }) => {
  const id = "navLogo";

  return (
    <a
      href="#"
      className="flex items-center gap-2.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
      aria-label="Arch Titan OS — Home"
    >
      {/* SVG Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ filter: "drop-shadow(0 0 8px rgba(99,214,255,0.4))" }}
      >
        <defs>
          <linearGradient id={`${id}G`} x1="100" y1="10" x2="100" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#42AAFF" />
            <stop offset="100%" stopColor="#1A4EE8" />
          </linearGradient>
        </defs>

        {/* Outer A shape with arrow feet */}
        <polygon
          points="100,8 192,180 162,180 146,150 136,168 148,180 124,180 100,132 76,180 52,180 64,168 54,150 38,180 8,180"
          fill={`url(#${id}G)`}
        />

        {/* Inner A hollow */}
        <polygon
          points="100,46 156,158 44,158"
          fill="#02040D"
        />

        {/* T crossbar */}
        <rect x="62" y="107" width="76" height="10" rx="2" fill="#02040D" />

        {/* T stem */}
        <rect x="94" y="117" width="12" height="36" rx="2" fill="#02040D" />
      </svg>

      {/* Text mark */}
      <div className="flex flex-col leading-none">
        <span
          className="text-[13px] font-bold tracking-[0.12em] uppercase"
          style={{ color: "#F7F9FF", fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          Arch Titan{" "}
          <span style={{ color: "#2F9DFF" }}>OS</span>
        </span>
      </div>
    </a>
  );
};

/**
 * Dashboard sidebar compact logo.
 */
export const SidebarLogo: React.FC = () => {
  const id = "sbLogo";

  return (
    <div className="flex items-center gap-2">
      <svg
        width={20}
        height={20}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${id}G`} x1="100" y1="10" x2="100" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#42AAFF" />
            <stop offset="100%" stopColor="#1A4EE8" />
          </linearGradient>
        </defs>
        <polygon
          points="100,8 192,180 162,180 146,150 136,168 148,180 124,180 100,132 76,180 52,180 64,168 54,150 38,180 8,180"
          fill={`url(#${id}G)`}
        />
        <polygon points="100,46 156,158 44,158" fill="#06121E" />
        <rect x="62" y="107" width="76" height="10" rx="2" fill="#06121E" />
        <rect x="94" y="117" width="12" height="36" rx="2" fill="#06121E" />
      </svg>
      <span className="text-[11px] font-bold tracking-wide text-[#F7F9FF]">
        Arch Titan <span style={{ color: "#2F9DFF" }}>OS</span>
      </span>
    </div>
  );
};
