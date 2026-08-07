"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  Share2,
  Activity,
  ShieldCheck,
  Layers,
  Gauge,
  MonitorSmartphone,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ────────────────────────────────────────────────
   CONTENT
   ──────────────────────────────────────────────── */

const PAIN_POINTS = [
  {
    label: "Uniform allocation",
    text: "A code editor sitting idle in the background and one mid-compile get treated exactly the same way.",
  },
  {
    label: "Wasted memory",
    text: "Resources stay pinned to processes that aren't doing anything with them.",
  },
  {
    label: "Manual GPU switching",
    text: "Dual-GPU laptops still need you to intervene by hand to get the right chip on the job.",
  },
];

const CORE_COMPONENTS = [
  {
    id: "thm",
    name: "Titan Hardware Manager",
    abbr: "THM",
    icon: Cpu,
    accent: "#63D6FF",
    summary:
      "The core of the system. THM dynamically reallocates resources by reading workload type and workspace activity — not just process lists.",
    tags: ["Workload-aware", "Live reallocation"],
  },
  {
    id: "interop",
    name: "TitanShare & TitanMirror",
    abbr: "I/O",
    icon: Share2,
    accent: "#927CFF",
    summary:
      "Native Linux–Android interoperability built into the OS. File transfer and screen mirroring work without a single third-party tool.",
    tags: ["TitanShare", "TitanMirror"],
  },
  {
    id: "telemetry",
    name: "Telemetry Layer",
    abbr: "TEL",
    icon: Activity,
    accent: "#9DF5B0",
    summary:
      "A lightweight monitoring layer keeps the whole system observable in real time, with minimal overhead of its own.",
    tags: ["Low overhead", "Real-time"],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Layers,
    title: "Smarter multitasking",
    text: "Workspace layout is a first-class scheduling input, not an afterthought.",
  },
  {
    icon: Gauge,
    title: "Automatic GPU switching",
    text: "The right GPU engages on its own, based on what you're actually running.",
  },
  {
    icon: ShieldCheck,
    title: "Kernel-native sandboxing",
    text: "Isolation handled at the kernel level rather than layered on top.",
  },
  {
    icon: MonitorSmartphone,
    title: "Linux–Android integration",
    text: "Your phone behaves like part of the machine, not a separate device.",
  },
];

/* Every element the entrance animation touches. Kept in one place so the
   fail-safe reveal can guarantee none of them are left hidden. */
const ANIMATED_SELECTOR = [
  ".about-eyebrow",
  ".about-headline",
  ".about-lede",
  ".about-problem",
  ".about-bridge",
  ".about-pain",
  ".about-core-card",
  ".about-diff-item",
  ".about-closing",
].join(", ");

/* ────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────── */

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      /* Force everything into its final, visible state. This is the safety
         net: whatever goes wrong, the content is readable. */
      const revealAll = () => {
        gsap.set(root.querySelectorAll(ANIMATED_SELECTOR), {
          autoAlpha: 1,
          x: 0,
          y: 0,
          clearProps: "transform",
        });
        root
          .querySelectorAll(".about-core-card")
          .forEach((el) => el.classList.add("is-revealed"));
      };

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        revealAll();
        return;
      }

      try {
        /* Hide, then reveal on scroll. Elements are resolved to real nodes
           (not selector strings) so nothing depends on selector scoping. */
        const reveal = (
          selector: string,
          fromVars: gsap.TweenVars,
          toVars: gsap.TweenVars,
          triggerSelector: string
        ) => {
          const els = Array.from(root.querySelectorAll(selector));
          const trigger = root.querySelector(triggerSelector);
          if (!els.length || !trigger) return;

          gsap.set(els, { autoAlpha: 0, ...fromVars });

          ScrollTrigger.create({
            trigger,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(els, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                overwrite: "auto",
                ...toVars,
                /* Drop the inline transform once we land, so CSS hover
                   transforms are not permanently overridden. */
                clearProps: "transform",
                onComplete: () =>
                  els.forEach((el) => el.classList.add("is-revealed")),
              });
            },
          });
        };

        /* ── Heading block ── */
        reveal(
          ".about-eyebrow",
          { y: 14 },
          { duration: 0.5, ease: "power3.out" },
          ".about-head"
        );
        reveal(
          ".about-headline",
          { y: 26 },
          { duration: 0.7, delay: 0.08, ease: "power3.out" },
          ".about-head"
        );
        reveal(
          ".about-lede",
          { y: 18 },
          { duration: 0.6, delay: 0.2, ease: "power3.out" },
          ".about-head"
        );

        /* ── Problem → approach split ── */
        reveal(
          ".about-problem",
          { x: -28 },
          { duration: 0.7, ease: "power3.out" },
          ".about-split"
        );
        reveal(
          ".about-bridge",
          { x: 28 },
          { duration: 0.7, delay: 0.12, ease: "power3.out" },
          ".about-split"
        );
        reveal(
          ".about-pain",
          { y: 12 },
          { duration: 0.45, stagger: 0.1, delay: 0.25, ease: "power2.out" },
          ".about-split"
        );

        /* ── Core component cards ── */
        reveal(
          ".about-core-card",
          { y: 40 },
          { duration: 0.65, stagger: 0.13, ease: "power3.out" },
          ".about-core"
        );

        /* ── Differentiators ── */
        reveal(
          ".about-diff-item",
          { y: 24 },
          { duration: 0.55, stagger: 0.09, ease: "power2.out" },
          ".about-diff"
        );
        reveal(
          ".about-closing",
          { y: 18 },
          { duration: 0.6, ease: "power3.out" },
          ".about-diff"
        );

        /* ── Ambient pulse travelling the full height of the divider rail ── */
        const rail = root.querySelector<HTMLElement>(".about-rail");
        const pulse = root.querySelector<HTMLElement>(".about-rail-pulse");
        if (rail && pulse) {
          gsap.to(pulse, {
            y: () => Math.max(rail.offsetHeight - pulse.offsetHeight, 0),
            duration: 4.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            invalidateOnRefresh: true,
          });
        }

        /* The hero above is 100svh and web fonts settle after mount, both of
           which move our trigger points. Recalculate once things are stable;
           refresh() also fires any trigger that is already in view. */
        const refresh = () => ScrollTrigger.refresh();
        const raf = requestAnimationFrame(refresh);
        window.addEventListener("load", refresh);
        document.fonts?.ready.then(refresh).catch(() => {});

        return () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("load", refresh);
        };
      } catch (error) {
        /* Never trade readable content for an animation. */
        console.error(
          "[AboutSection] scroll animation failed — revealing content",
          error
        );
        revealAll();
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden py-24 sm:py-32"
      style={{ background: "#02040D" }}
      aria-labelledby="about-heading"
    >
      {/* Ambient background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 15% 0%, rgba(47,72,165,0.16), transparent 65%), radial-gradient(700px 400px at 88% 30%, rgba(146,124,255,0.10), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        {/* ══════════════ HEADING ══════════════ */}
        <div className="about-head max-w-[820px]">
          <div
            className="about-eyebrow mb-5 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5"
            style={{
              background: "rgba(9,18,43,0.9)",
              border: "1px solid rgba(125,160,255,0.22)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "#63D6FF",
                boxShadow: "0 0 10px rgba(99,214,255,0.9)",
              }}
              aria-hidden="true"
            />
            <span
              className="text-[11px] font-medium tracking-[0.16em] text-[#9DA9C3]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              02 — ABOUT
            </span>
          </div>

          <h2
            id="about-heading"
            className="about-headline font-bold leading-[1.1] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(32px, 4.6vw, 56px)",
              color: "#F7F9FF",
              textShadow: "0 0 70px rgba(99,214,255,0.10)",
            }}
          >
            Your OS treats every process the same.
            <br />
            <span className="text-gradient-animated">ArchTitan doesn&apos;t.</span>
          </h2>

          <p
            className="about-lede mt-6 leading-[1.75]"
            style={{
              color: "#9DA9C3",
              fontSize: "clamp(15px, 1.7vw, 18px)",
              maxWidth: "660px",
            }}
          >
            Built for developers running heavy multitasking setups — multiple
            IDEs, containers, builds and a dual-GPU laptop — who are tired of
            their operating system treating every process the same way.
          </p>
        </div>

        {/* ══════════════ PROBLEM → APPROACH ══════════════ */}
        <div className="about-split mt-16 grid gap-6 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          {/* Problem */}
          <div
            className="about-problem rounded-2xl p-7 sm:p-8"
            style={{
              background:
                "linear-gradient(150deg, rgba(11,16,34,0.62) 0%, rgba(5,11,27,0.9) 100%)",
              border: "1px solid rgba(125,160,255,0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9DA9C3]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              The problem
            </span>

            <p
              className="mt-4 text-[15px] leading-[1.7] sm:text-base"
              style={{ color: "#C6D0E6" }}
            >
              Modern operating systems allocate resources uniformly — blind to
              what you&apos;re actually doing.
            </p>

            <ul className="mt-6 space-y-4" role="list">
              {PAIN_POINTS.map((point) => (
                <li key={point.label} className="about-pain flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-px w-5 shrink-0"
                    style={{ background: "rgba(157,169,195,0.5)" }}
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-[#F7F9FF]">
                      {point.label}
                    </p>
                    <p className="mt-1 text-[13.5px] leading-[1.65] text-[#9DA9C3]">
                      {point.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[13px] italic leading-[1.6] text-[#9DA9C3]">
              Memory gets wasted. Compute gets misprioritized.
            </p>
          </div>

          {/* Divider rail — decorative */}
          <div
            aria-hidden="true"
            className="about-rail relative hidden w-px lg:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(125,160,255,0.28) 20%, rgba(125,160,255,0.28) 80%, transparent)",
            }}
          >
            <span
              className="about-rail-pulse absolute left-1/2 top-0 h-16 w-[3px] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #63D6FF, transparent)",
                boxShadow: "0 0 14px rgba(99,214,255,0.8)",
              }}
            />
          </div>

          {/* Approach */}
          <div
            className="about-bridge rounded-2xl p-7 sm:p-8"
            style={{
              background:
                "linear-gradient(150deg, rgba(19,32,72,0.66) 0%, rgba(5,11,27,0.92) 100%)",
              border: "1px solid rgba(99,214,255,0.24)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow:
                "0 0 50px rgba(47,72,165,0.20), inset 0 1px 0 rgba(140,203,255,0.10)",
            }}
          >
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#63D6FF]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              The ArchTitan approach
            </span>

            <p
              className="mt-4 text-[15px] leading-[1.7] sm:text-base"
              style={{ color: "#E4EAF7" }}
            >
              ArchTitan OS fixes this at the OS level — not with a daemon or a
              tray app layered on afterwards.
            </p>

            <p className="mt-5 text-[13.5px] leading-[1.75] text-[#9DA9C3]">
              Its core component, the{" "}
              <strong className="font-semibold text-[#F7F9FF]">
                Titan Hardware Manager
              </strong>{" "}
              (THM), dynamically reallocates resources by reading workload type
              and workspace activity — not just process lists. Native
              Linux–Android interoperability removes the need for third-party
              tools entirely, and a lightweight telemetry layer keeps the system
              monitored with minimal overhead.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Workload type", "Workspace activity", "Kernel level"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-md px-2.5 py-1 text-[11px] tracking-[0.04em] text-[#8ACBFF]"
                    style={{
                      background: "rgba(47,72,165,0.22)",
                      border: "1px solid rgba(99,214,255,0.22)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {chip}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* ══════════════ CORE COMPONENTS ══════════════ */}
        <div className="about-core mt-20 lg:mt-24">
          <h3
            className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9DA9C3]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Core components
          </h3>

          <div className="grid gap-5 md:grid-cols-3">
            {CORE_COMPONENTS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className="about-core-card group relative flex flex-col rounded-2xl p-6"
                  style={{
                    background:
                      "linear-gradient(150deg, rgba(11,16,34,0.6) 0%, rgba(5,11,27,0.9) 100%)",
                    border: "1px solid rgba(125,160,255,0.12)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  {/* top accent line */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 top-0 h-px opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to right, transparent, ${item.accent}, transparent)`,
                    }}
                  />

                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: "rgba(47,72,165,0.20)",
                        border: `1px solid ${item.accent}38`,
                      }}
                    >
                      <Icon
                        className="h-[18px] w-[18px]"
                        style={{ color: item.accent }}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className="text-[10px] tracking-[0.18em] text-[#9DA9C3] opacity-70"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item.abbr}
                    </span>
                  </div>

                  <h4 className="text-[16px] font-semibold leading-snug text-[#F7F9FF]">
                    {item.name}
                  </h4>

                  <p className="mt-3 flex-1 text-[13.5px] leading-[1.7] text-[#9DA9C3]">
                    {item.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded px-2 py-0.5 text-[10.5px] text-[#9DA9C3]"
                        style={{
                          background: "rgba(9,18,43,0.9)",
                          border: "1px solid rgba(125,160,255,0.14)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ══════════════ DIFFERENTIATORS ══════════════ */}
        <div className="about-diff mt-20 lg:mt-24">
          <h3
            className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9DA9C3]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            What makes it different
          </h3>

          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {DIFFERENTIATORS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="about-diff-item flex gap-4">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(47,72,165,0.18)",
                      border: "1px solid rgba(125,160,255,0.18)",
                    }}
                  >
                    <Icon
                      className="h-4 w-4 text-[#8ACBFF]"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p className="text-[14.5px] font-semibold text-[#F7F9FF]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-[1.7] text-[#9DA9C3]">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing statement */}
          <p
            className="about-closing mt-14 rounded-2xl px-7 py-6 text-center text-[15px] leading-[1.7] sm:text-base"
            style={{
              background: "rgba(9,18,43,0.55)",
              border: "1px solid rgba(125,160,255,0.14)",
              color: "#C6D0E6",
            }}
          >
            All of it built{" "}
            <strong className="font-semibold text-[#F7F9FF]">
              directly into the OS
            </strong>{" "}
            — not bolted on.
          </p>
        </div>
      </div>
    </section>
  );
};
