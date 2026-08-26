"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NeonBackground } from "./NeonBackground";
import { GlowPaths } from "./GlowPaths";
import { SystemStatusBar } from "./SystemStatusBar";
import { HeroNavigation } from "./HeroNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { HeroContent } from "./HeroContent";
import { ProductDashboardPreview } from "./ProductDashboardPreview";

gsap.registerPlugin(useGSAP);

interface FuturisticHeroProps {
  /** Set to true once the terminal loader calls onComplete */
  animationReady?: boolean;
}

export const FuturisticHero: React.FC<FuturisticHeroProps> = ({
  animationReady = true,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimated = useRef(false);

  // Parallax via quickTo for performance
  const qx = useRef<((value: number) => void) | null>(null);
  const qy = useRef<((value: number) => void) | null>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);

  /* ──────────────────────────────────────────────
     GSAP ENTRANCE TIMELINE
  ────────────────────────────────────────────── */
  useGSAP(
    () => {
      if (!animationReady || hasAnimated.current) return;
      hasAnimated.current = true;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Set initial hidden states
      gsap.set(heroRef.current, { autoAlpha: 1 });

      if (prefersReduced) {
        // Skip animations — just show everything immediately
        gsap.set(
          [
            ".system-status-bar",
            ".hero-nav",
            ".hero-badge",
            ".hero-headline",
            ".hero-subtitle",
            ".hero-actions",
            ".hero-dashboard",
          ],
          { autoAlpha: 1, y: 0, scale: 1 }
        );
        return;
      }

      gsap.set(".system-status-bar", { autoAlpha: 0, y: -20 });
      gsap.set(".hero-nav", { autoAlpha: 0, y: -14 });
      gsap.set(".hero-badge", { autoAlpha: 0, scale: 0.94, y: 10 });
      gsap.set(".hero-headline", { autoAlpha: 0, y: 30 });
      gsap.set(".hero-subtitle", { autoAlpha: 0, y: 18 });
      gsap.set(".hero-actions", { autoAlpha: 0, y: 16 });
      gsap.set(".hero-dashboard", { autoAlpha: 0, y: 48 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current = tl;

      tl
        // 1. Background fades in
        .from(
          heroRef.current,
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          0
        )
        // 2. System status bar
        .to(".system-status-bar", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.3)
        // 3. Navigation
        .to(".hero-nav", { autoAlpha: 1, y: 0, duration: 0.45 }, 0.45)
        // 4. Badge
        .to(
          ".hero-badge",
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.4 },
          0.65
        )
        // 5. Headline
        .to(".hero-headline", { autoAlpha: 1, y: 0, duration: 0.65 }, 0.78)
        // 6. Subtitle
        .to(".hero-subtitle", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.95)
        // 7. CTA buttons
        .to(".hero-actions", { autoAlpha: 1, y: 0, duration: 0.45 }, 1.1)
        // 8. Dashboard rises
        .to(
          ".hero-dashboard",
          { autoAlpha: 1, y: 0, duration: 0.85, ease: "power2.out" },
          1.2
        );

      // 9. Dashboard glow pulse (ambient — runs after entrance)
      tl.call(
        () => {
          gsap.to(".hero-dashboard", {
            boxShadow:
              "0 -4px 80px rgba(47,72,165,0.4), 0 0 150px rgba(99,214,255,0.12)",
            duration: 1.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          // Slow floating of a background block
          gsap.to("#bg-float-block", {
            y: -12,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
        [],
        ">-0.2"
      );
    },
    { scope: heroRef, dependencies: [animationReady] }
  );

  /* ──────────────────────────────────────────────
     MOUSE PARALLAX (Desktop only, quickTo)
  ────────────────────────────────────────────── */
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReduced || !bgLayerRef.current) return;

    qx.current = gsap.quickTo(bgLayerRef.current, "x", {
      duration: 0.9,
      ease: "power2.out",
    });
    qy.current = gsap.quickTo(bgLayerRef.current, "y", {
      duration: 0.9,
      ease: "power2.out",
    });

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = ((e.clientX - cx) / cx) * 8;
      const dy = ((e.clientY - cy) / cy) * 6;
      qx.current?.(dx);
      qy.current?.(dy);
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      ref={heroRef}
      style={{ opacity: 0 }}
      className="relative w-full overflow-x-hidden noise-overlay"
      aria-label="Hero section"
    >
      {/* ── Background layer (parallax target) ── */}
      <div ref={bgLayerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <NeonBackground />
        <GlowPaths />
      </div>

      {/* ── Foreground stack ── */}
      <div className="relative z-10 flex flex-col min-h-[100svh]">
        {/* System status bar */}
        <SystemStatusBar />

        {/* Navigation (desktop + mobile) */}
        <div className="hero-nav relative flex items-center justify-between px-4 sm:block">
          {/* Desktop nav — full bar */}
          <div className="hidden md:block">
            <HeroNavigation />
          </div>

          {/* Mobile: minimal brand + hamburger */}
          <div
            className="md:hidden flex items-center justify-between w-full mt-2 px-0 h-14 rounded-2xl px-4"
            style={{
              background: "rgba(9,18,43,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(125,160,255,0.15)",
            }}
          >
            <a href="#" className="flex items-center gap-2" aria-label="Vectorium Labs Home">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2F48A5, #63D6FF)" }}
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 12H2L8 2Z" fill="#F7F9FF" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#F7F9FF]">Vectorium</span>
            </a>
            <MobileNavigation />
          </div>
        </div>

        {/* Hero content — headline, badge, CTA */}
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          <HeroContent />
        </div>

        {/* Product dashboard preview — emerges from the bottom */}
        <div className="w-full">
          <ProductDashboardPreview />
        </div>
      </div>
    </div>
  );
};
