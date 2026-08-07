"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

/* Animates the travelling light particles along the SVG paths
   inside CubeBackground. Runs as a standalone overlay so we can
   keep GSAP independent from the SVG render. */
export const AnimatedPaths: React.FC = () => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const paths = [
      { id: "path-cyan-1", duration: 16 },
      { id: "path-cyan-2", duration: 20 },
      { id: "path-cyan-3", duration: 24 },
      { id: "path-violet-1", duration: 19 },
      { id: "path-violet-2", duration: 14 },
    ];

    const ctx = gsap.context(() => {
      paths.forEach(({ id, duration }) => {
        const el = document.getElementById(id);
        if (!el) return;
        gsap.to(el, {
          strokeDashoffset: -900,
          duration,
          repeat: -1,
          ease: "none",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // This component renders no DOM — it only wires up GSAP
  return <div ref={elRef} aria-hidden="true" className="hidden" />;
};
