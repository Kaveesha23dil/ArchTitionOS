"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TerminalLine, LineType } from "./TerminalLine";

gsap.registerPlugin(useGSAP);

interface LogEntry {
  id: string;
  text: string;
  type: LineType;
  delay?: number; // Delay after this line in ms
  replacePrevious?: boolean; // If true, updates the last line in place
}

interface TerminalLoaderProps {
  onComplete?: () => void;
}

const TERMINAL_LOGS: LogEntry[] = [
  { id: "1", text: "( 1/14) Checking system configuration...", type: "muted", delay: 80 },
  { id: "2", text: "( 2/14) Loading kernel modules...", type: "muted", delay: 90 },
  { id: "3", text: "( 3/14) Mounting local filesystems...", type: "muted", delay: 70 },
  { id: "4", text: "( 4/14) Initializing network interfaces...", type: "muted", delay: 60 },
  { id: "5", text: "( 5/14) Starting system services...", type: "muted", delay: 80 },
  { id: "6", text: "( 6/14) Loading application dependencies...", type: "muted", delay: 100 },
  {
    id: "dec-1",
    text: "Decompress: 24/632 files. Current: .../kernel/module.ko.zst : 512 KiB...",
    type: "normal",
    delay: 150,
  },
  {
    id: "dec-2",
    text: "Decompress: 183/632 files. Current: .../filesystem.ko.zst : 1.2 MiB...",
    type: "normal",
    delay: 150,
    replacePrevious: true,
  },
  {
    id: "dec-3",
    text: "Decompress: 519/632 files. Current: .../f2fs.ko.zst : 512 KiB...",
    type: "normal",
    delay: 150,
    replacePrevious: true,
  },
  { id: "7", text: "( 7/14) Preparing runtime environment...", type: "muted", delay: 90 },
  { id: "8", text: "( 8/14) Arming ConditionNeedsUpdate...", type: "muted", delay: 80 },
  { id: "9", text: "( 9/14) Rebuilding certificate stores...", type: "muted", delay: 90 },
  { id: "10", text: "(10/14) Updating module dependencies...", type: "muted", delay: 80 },
  { id: "11", text: "(11/14) Updating system image...", type: "muted", delay: 120 },
  {
    id: "hook-0",
    text: "==> Building image from preset: /etc/system/image.preset",
    type: "command",
    delay: 200,
  },
  { id: "hook-1", text: "  -> Starting build: 6.12.1-system", type: "command", delay: 80 },
  { id: "hook-2", text: "  -> Running build hook: [base]", type: "command", delay: 60 },
  { id: "hook-3", text: "  -> Running build hook: [udev]", type: "command", delay: 60 },
  { id: "hook-4", text: "  -> Running build hook: [autodetect]", type: "command", delay: 70 },
  { id: "hook-5", text: "  -> Running build hook: [modconf]", type: "command", delay: 60 },
  { id: "hook-6", text: "  -> Running build hook: [block]", type: "command", delay: 60 },
  { id: "hook-7", text: "  -> Running build hook: [filesystems]", type: "command", delay: 70 },
  { id: "hook-8", text: "  -> Running build hook: [keyboard]", type: "command", delay: 60 },
  { id: "hook-9", text: "  -> Running build hook: [fsck]", type: "command", delay: 80 },
  { id: "gen-dep", text: "==> Generating module dependencies", type: "command", delay: 180 },
  { id: "gen-img", text: "==> Creating compressed system image", type: "command", delay: 220 },
  { id: "gen-ok", text: "==> Image generation successful", type: "command", delay: 150 },
  { id: "12", text: "(12/14) Reloading system bus configuration...", type: "muted", delay: 90 },
  { id: "13", text: "(13/14) Verifying runtime modules...", type: "muted", delay: 80 },
  { id: "14", text: "(14/14) Updating application directory...", type: "muted", delay: 100 },
  {
    id: "warn-1",
    text: "==> WARNING: Optional firmware module not detected",
    type: "warning",
    delay: 300,
  },
  {
    id: "warn-2",
    text: "==> WARNING: Falling back to the standard locale",
    type: "warning",
    delay: 280,
  },
  {
    id: "warn-3",
    text: "==> WARNING: Some optional services were skipped",
    type: "warning",
    delay: 320,
  },
  {
    id: "ok-1",
    text: "[  OK  ] Runtime environment initialized",
    type: "success",
    delay: 100,
  },
  { id: "ok-2", text: "[  OK  ] Application modules loaded", type: "success", delay: 100 },
  {
    id: "ok-3",
    text: "[  OK  ] System initialization completed",
    type: "success",
    delay: 250,
  },
  { id: "fin-1", text: "Starting application interface...", type: "normal", delay: 120 },
  { id: "fin-2", text: "Loading ArchTitan OS research workspace...", type: "normal", delay: 150 },
  { id: "fin-3", text: "System ready.", type: "normal", delay: 350 },
  { id: "prompt", text: "root@archtitan ~ # ", type: "prompt", delay: 600 },
];

export const TerminalLoader: React.FC<TerminalLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [displayedLines, setDisplayedLines] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);

  // Auto-scroll helper
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayedLines]);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        // Instantly display all lines
        setDisplayedLines(TERMINAL_LOGS);
        setProgress(100);

        gsap.to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.5,
          delay: 0.8,
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
        return;
      }

      let currentStep = 0;
      let timeoutId: NodeJS.Timeout;

      const processNextLine = () => {
        if (currentStep >= TERMINAL_LOGS.length) {
          // Finished rendering all lines. Wait 600ms then fade out over 700ms
          timeoutId = setTimeout(() => {
            gsap.to(containerRef.current, {
              autoAlpha: 0,
              duration: 0.7,
              ease: "power2.inOut",
              onComplete: () => {
                if (onComplete) onComplete();
              },
            });
          }, 600);
          return;
        }

        const entry = TERMINAL_LOGS[currentStep];

        // Update displayed lines state
        setDisplayedLines((prev) => {
          if (entry.replacePrevious && prev.length > 0) {
            const updated = [...prev];
            updated[updated.length - 1] = entry;
            return updated;
          }
          return [...prev, entry];
        });

        // Update percentage counter dynamically based on progress
        const pct = Math.min(100, Math.round(((currentStep + 1) / TERMINAL_LOGS.length) * 100));
        setProgress(pct);

        currentStep++;
        const nextDelay = entry.delay || 80;
        timeoutId = setTimeout(processNextLine, nextDelay);
      };

      // Initial start delay (300ms)
      timeoutId = setTimeout(processNextLine, 300);

      return () => {
        clearTimeout(timeoutId);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-label="Application initialization in progress"
      aria-live="polite"
      className="fixed inset-0 z-[9999] overflow-hidden bg-black text-zinc-200 font-mono select-none"
    >
      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-4 right-4 z-10 border border-zinc-700 bg-black/80 px-4 py-2 text-xs uppercase tracking-[0.16em] text-zinc-300 transition hover:border-zinc-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-6 sm:right-6"
      >
        Skip intro
      </button>
      {/* Terminal Main Box */}
      <div
        ref={scrollAreaRef}
        className="h-full w-full overflow-y-auto whitespace-pre-wrap break-words p-4 text-xs leading-[1.35] sm:p-6 sm:text-sm lg:p-8 scrollbar-none"
      >
        {/* Render animated output lines */}
        <div className="space-y-0.5 max-w-5xl">
          {displayedLines.map((line, index) => {
            const isLast = index === displayedLines.length - 1;
            return (
              <div key={line.id || index} className="flex items-center gap-1">
                <TerminalLine content={line.text} type={line.type} />
                {isLast && line.type === "prompt" && (
                  <span
                    className="inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-zinc-200 animate-pulse ml-0.5"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
          {displayedLines.length === 0 && (
            <div className="flex items-center">
              <span className="inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-zinc-200 animate-pulse" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      {/* Subtle Progress Bar & Percentage indicator in top-right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-xs text-zinc-500 font-mono opacity-60 pointer-events-none">
        [ {progress}% ]
      </div>
    </div>
  );
};
