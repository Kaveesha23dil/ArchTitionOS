"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CubeBackground } from "./CubeBackground";
import { AnimatedPaths } from "./AnimatedPaths";
import { PrimaryNavbar } from "./PrimaryNavbar";
import { MainHeroContent } from "./MainHeroContent";
import { OperationsDashboard } from "./OperationsDashboard";

gsap.registerPlugin(useGSAP);

interface HeroProps {
  animationReady?: boolean;
}

export const PremiumHero: React.FC<HeroProps> = ({ animationReady = true }) => {
  const heroRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  /* ── GSAP entrance timeline ── */
  useGSAP(
    () => {
      if (!animationReady || hasAnimated.current) return;
      hasAnimated.current = true;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        gsap.set(heroRef.current, { autoAlpha: 1 });
        return;
      }

      /* Initial hidden states */
      gsap.set(heroRef.current, { autoAlpha: 1 });
      gsap.set(".pnav", { autoAlpha: 0, y: -16 });
      gsap.set(".hero-badge", { autoAlpha: 0, scale: 0.93, y: 8 });
      gsap.set(".hero-headline", { autoAlpha: 0, y: 28 });
      gsap.set(".hero-subtitle", { autoAlpha: 0, y: 18 });
      gsap.set(".hero-actions", { autoAlpha: 0, y: 16 });
      gsap.set(".hero-trust", { autoAlpha: 0 });
      gsap.set(".hero-dashboard", { autoAlpha: 0, y: 55 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(heroRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0)
        .to(".pnav", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.25)
        .to(".hero-badge", { autoAlpha: 1, scale: 1, y: 0, duration: 0.4 }, 0.55)
        .to(".hero-headline", { autoAlpha: 1, y: 0, duration: 0.65 }, 0.7)
        .to(".hero-subtitle", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.88)
        .to(".hero-actions", { autoAlpha: 1, y: 0, duration: 0.45 }, 1.02)
        .to(".hero-trust", { autoAlpha: 1, duration: 0.4 }, 1.15)
        .to(".hero-dashboard", { autoAlpha: 1, y: 0, duration: 0.85, ease: "power2.out" }, 1.22);

      /* Ambient dashboard glow pulse after entrance */
      tl.call(() => {
        gsap.to(".hero-dashboard", {
          boxShadow: "0 -12px 80px rgba(47,72,165,0.45), 0 0 130px rgba(99,214,255,0.12)",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, [], ">-0.1");

      /* Mouse parallax movement */
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (!isTouch && !prefersReduced && heroRef.current) {
        const xToBg = gsap.quickTo(".hero-bg-parallax", "x", { duration: 0.8, ease: "power2.out" });
        const yToBg = gsap.quickTo(".hero-bg-parallax", "y", { duration: 0.8, ease: "power2.out" });
        const rotXToDash = gsap.quickTo(".hero-dashboard", "rotateX", { duration: 0.8, ease: "power2.out" });
        const rotYToDash = gsap.quickTo(".hero-dashboard", "rotateY", { duration: 0.8, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xNorm = (clientX / innerWidth - 0.5) * 2; // -1 to 1
          const yNorm = (clientY / innerHeight - 0.5) * 2; // -1 to 1

          xToBg(xNorm * -15);
          yToBg(yNorm * -12);
          rotXToDash(2.5 - yNorm * 2.5);
          rotYToDash(xNorm * 3);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    },
    { scope: heroRef, dependencies: [animationReady] }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden"
      style={{ background: "#02040D", opacity: 0 }}
      aria-label="Vectorium Labs hero section"
    >
      {/* 1. Full-screen background */}
      <div className="hero-bg-parallax absolute inset-0 pointer-events-none">
        <CubeBackground />
      </div>

      {/* Animated path particles */}
      <AnimatedPaths />

      {/* 2. Navigation */}
      <div className="pnav">
        <PrimaryNavbar />
      </div>

      {/* 3-7. Headline, badge, form, trust */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-[68px]">
        <MainHeroContent />
      </div>

      {/* 8. Dashboard preview */}
      <OperationsDashboard />

      {/* 9. Bottom gradient overlay — blends dashboard into page */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "220px",
          background: "linear-gradient(to top, #02040D 0%, transparent 100%)",
          zIndex: 25,
        }}
      />
    </section>
  );
};
