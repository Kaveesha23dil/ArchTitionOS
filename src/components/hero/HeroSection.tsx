"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroBackground } from "./HeroBackground";
import { HeroNavbar } from "./HeroNavbar";
import { HeroContent } from "./HeroContent";
import { DashboardPreview } from "./DashboardPreview";

gsap.registerPlugin(useGSAP);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Mouse Parallax Handler (Desktop only)
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const mouseY = (e.clientY / innerHeight - 0.5) * 2;

      setParallax({
        x: mouseX * 10,
        y: mouseY * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-nav",
            ".hero-badge",
            ".hero-headline",
            ".hero-subtitle",
            ".hero-actions",
            ".hero-dashboard",
          ],
          { autoAlpha: 1, y: 0 }
        );
        return;
      }

      // Initial Hidden States for GSAP Entrance Sequence
      gsap.set(".hero-nav", { autoAlpha: 0, y: -20 });
      gsap.set(".hero-badge", { autoAlpha: 0, y: 20 });
      gsap.set(".hero-headline", { autoAlpha: 0, y: 35 });
      gsap.set(".hero-subtitle", { autoAlpha: 0, y: 20 });
      gsap.set(".hero-actions", { autoAlpha: 0, y: 20 });
      gsap.set(".hero-dashboard", { autoAlpha: 0, y: 50 });

      // Master 2-Second GSAP Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-nav", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
      })
        .to(
          ".hero-badge",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .to(
          ".hero-headline",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.3"
        )
        .to(
          ".hero-subtitle",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.5"
        )
        .to(
          ".hero-actions",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .to(
          ".hero-dashboard",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#03050c] text-slate-100 pb-16 select-none"
    >
      {/* 1. Layered Background Environment */}
      <HeroBackground parallaxX={parallax.x} parallaxY={parallax.y} />

      {/* 2. Floating Navbar */}
      <div className="hero-nav w-full">
        <HeroNavbar />
      </div>

      {/* 3. Hero Center Content */}
      <HeroContent />

      {/* 4. Emerging AI Operations Dashboard Preview */}
      <DashboardPreview parallaxX={parallax.x} parallaxY={parallax.y} />
    </section>
  );
};
