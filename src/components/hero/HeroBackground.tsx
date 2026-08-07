"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface HeroBackgroundProps {
  parallaxX?: number;
  parallaxY?: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      // Continuous ambient animation for background neon light path pulse
      if (pathRef.current) {
        gsap.to(pathRef.current, {
          strokeDashoffset: -1000,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }

      // Gentle radial glow pulsing behind the content
      gsap.to(".hero-radial-glow", {
        scale: 1.15,
        opacity: 0.8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: bgRef }
  );

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden bg-[#03050c] select-none"
    >
      {/* 1. Base 3D Geometric Artwork from public/hero.jpeg with dark vignette blending */}
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallaxX * 0.4}px, ${parallaxY * 0.4}px, 0) scale(1.05)`,
        }}
      >
        <Image
          src="/hero.jpeg"
          alt="3D Metallic Geometric Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.7] contrast-[1.15] hue-rotate-[-10deg]"
        />
        {/* Dark Vignette Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03050c]/90 via-[#03050c]/60 to-[#03050c]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#03050c_90%)]" />
      </div>

      {/* 2. Soft Blue & Violet Central Radial Glow */}
      <div
        className="hero-radial-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-[#2F48A5]/30 via-[#3B82F6]/20 to-[#8B5CF6]/20 blur-[130px] pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(-50%, -50%, 0) translate3d(${parallaxX * 0.8}px, ${parallaxY * 0.8}px, 0)`,
        }}
      />

      {/* 3. Layered Interactive SVG Animated Neon Circuit Paths (Cyan, Blue, Green, Violet) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        viewBox="0 0 1920 1080"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="neonPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Path 1: Curving through upper geometric channels */}
        <path
          d="M -100 250 C 300 250, 450 150, 750 150 C 1050 150, 1200 350, 1600 350 C 1800 350, 1950 200, 2100 200"
          stroke="url(#neonPathGrad)"
          strokeWidth="2"
          strokeDasharray="15 30 45 30"
          filter="url(#neonGlow)"
        />

        {/* Path 2: Animated moving pulse line */}
        <path
          ref={pathRef}
          d="M -100 650 C 400 650, 600 450, 960 450 C 1320 450, 1500 700, 2020 700"
          stroke="url(#neonPathGrad)"
          strokeWidth="2.5"
          strokeDasharray="200 400"
          strokeLinecap="round"
          filter="url(#neonGlow)"
        />

        {/* Path 3: Lower accent highlights */}
        <path
          d="M 100 900 Q 500 800, 960 920 T 1820 850"
          stroke="#06b6d4"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeDasharray="8 16"
        />
      </svg>

      {/* 4. Fine Grid Pattern Overlay for OS Tech Feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
    </div>
  );
};
