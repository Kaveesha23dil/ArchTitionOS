"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Mark = () => (
  <svg className="mark" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path
      d="M22 3 39 12.5v19L22 41 5 31.5v-19L22 3Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="m14 28 8-17 8 17M17 22h10"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
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

  const isHome = pathname === "/";
  const badgeText = pageBadge || (isHome ? "FYP 2026" : "MODULE");

  return (
    <>
      <header className="nav-shell" role="banner">
        <div className="nav-left">
          <Link href="/" className="logo" aria-label="ArchTitan OS Home">
            <Mark />
            <span className="logo-text">
              ArchTitan <b>OS</b>
            </span>
          </Link>
          <span className="nav-badge">
            <i /> {badgeText}
          </span>
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
      <aside className={`mobile-menu ${menu ? "open" : ""}`} aria-hidden={!menu}>
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
          <span>SLTC Research University · Final Year Project</span>
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
          <p>BSc (Hons) Software Engineering · June 2026</p>
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
