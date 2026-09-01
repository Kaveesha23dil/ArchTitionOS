"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Mark = () => (
  <Image
    src="/logo.png"
    alt="ArchTitan OS"
    width={32}
    height={32}
    className="mark-logo-img"
    priority
  />
);

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

interface NavItem {
  label: string;
  href: string;
}

interface SiteNavbarProps {
  pageBadge?: string;
  sectionLinks?: NavItem[];
}

const MODULES = [
  { name: "Overview", path: "/", short: "Home" },
  { name: "THM Daemon", path: "/titan-hardware-manager", short: "THM" },
  { name: "TitanShare", path: "/titanshare", short: "Share" },
  { name: "TitanMirror", path: "/titanmirror", short: "Mirror" },
];

export function SiteNavbar({ pageBadge, sectionLinks }: SiteNavbarProps) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("locked", menu);
    return () => {
      document.documentElement.classList.remove("locked");
    };
  }, [menu]);

  useGSAP(() => {
    if (menu && drawerRef.current) {
      gsap.fromTo(
        drawerRef.current.querySelectorAll(".mobile-link"),
        { x: -20, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.35, stagger: 0.05, ease: "power3.out" }
      );
      gsap.fromTo(
        drawerRef.current.querySelectorAll(".mobile-module-card"),
        { y: 15, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: "back.out(1.4)", delay: 0.1 }
      );
    }
  }, [menu]);

  const isHome = pathname === "/";

  return (
    <>
      <header ref={navRef} className="nav-shell" role="banner">
        <div className="nav-left">
          <Link href="/" className="logo" aria-label="ArchTitan OS Home">
            <Mark />
            <span className="logo-text">
              ArchTitan <b>OS</b>
            </span>
          </Link>
          {pageBadge && (
            <span className="nav-badge">
              <i /> {pageBadge}
            </span>
          )}
        </div>

        {/* Desktop Primary Navigation */}
        <nav className="nav-links" aria-label="Main Navigation">
          {sectionLinks && sectionLinks.length > 0 ? (
            sectionLinks.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))
          ) : (
            <>
              <a href="#research">Research</a>
              <a href="#architecture">Architecture</a>
              <a href="#classifier">Classifier</a>
              <a href="#ecosystem">Ecosystem</a>
              <a href="#evaluation">Evaluation</a>
              <a href="#references">References</a>
            </>
          )}

          {/* Multi-page Module Switcher */}
          <div className="nav-modules-pill">
            <span className="modules-label">Pages:</span>
            {MODULES.map((m) => {
              const active = pathname === m.path;
              return (
                <Link
                  key={m.path}
                  href={m.path}
                  className={`module-link ${active ? "active" : ""}`}
                  title={m.name}
                >
                  {m.short}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Desktop Right Utilities & CTA */}
        <div className="nav-right">
          {isHome ? (
            <>
              <div className="nav-status">
                <span className="status-dot" />
                <span>Arch Linux · Hyprland</span>
              </div>
              <a className="nav-cta" href="#architecture">
                <span>System Spec</span>
                <Arrow />
              </a>
            </>
          ) : (
            <Link className="nav-cta" href="/">
              <span>← Research Paper</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className={`menu-button ${menu ? "active" : ""}`}
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menu}
          >
            <span className="menu-bar top" />
            <span className="menu-bar bot" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <aside ref={drawerRef} className={`mobile-menu ${menu ? "open" : ""}`} aria-hidden={!menu}>
        <div className="mobile-menu-header">
          <Link href="/" className="logo" onClick={() => setMenu(false)}>
            <Mark />
            <span className="logo-text">
              ArchTitan <b>OS</b>
            </span>
          </Link>
          <button
            className="mobile-close"
            onClick={() => setMenu(false)}
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <div className="mobile-menu-status">
          <span className="status-dot" />
          <span>Adaptive Linux Operating System</span>
        </div>

        {/* Current Page Sections */}
        <div className="mobile-menu-section-title">Page Navigation</div>
        <nav className="mobile-nav-links">
          {sectionLinks && sectionLinks.length > 0 ? (
            sectionLinks.map((item, idx) => (
              <a
                href={item.href}
                onClick={() => setMenu(false)}
                key={item.label}
                className="mobile-link"
              >
                <span className="mobile-link-num">0{idx + 1}</span>
                <span className="mobile-link-title">{item.label}</span>
                <Arrow />
              </a>
            ))
          ) : (
            [
              ["01", "Research Premise", "#research"],
              ["02", "System Architecture", "#architecture"],
              ["03", "THM Classifier", "#classifier"],
              ["04", "Integrated Ecosystem", "#ecosystem"],
              ["05", "Evaluation & Metrics", "#evaluation"],
              ["06", "Selected References", "#references"],
            ].map(([num, title, hash]) => (
              <a
                href={hash}
                onClick={() => setMenu(false)}
                key={hash}
                className="mobile-link"
              >
                <span className="mobile-link-num">{num}</span>
                <span className="mobile-link-title">{title}</span>
                <Arrow />
              </a>
            ))
          )}
        </nav>

        {/* All Pages / Modules Navigation */}
        <div className="mobile-menu-section-title">System Pages & Modules</div>
        <div className="mobile-modules-grid">
          {MODULES.map((m) => {
            const active = pathname === m.path;
            return (
              <Link
                key={m.path}
                href={m.path}
                onClick={() => setMenu(false)}
                className={`mobile-module-card ${active ? "active" : ""}`}
              >
                <b>{m.name}</b>
                <span>{active ? "Current page ●" : "View page →"}</span>
              </Link>
            );
          })}
        </div>

        <div className="mobile-menu-footer">
          <p>ArchTitan OS · Adaptive Computing</p>
          {isHome ? (
            <a
              href="#architecture"
              onClick={() => setMenu(false)}
              className="mobile-cta"
            >
              Explore System Spec <Arrow />
            </a>
          ) : (
            <Link
              href="/"
              onClick={() => setMenu(false)}
              className="mobile-cta"
            >
              ← Return to Research Overview
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
