"use client";

import React, { useState, useEffect } from "react";
import { Power, Wifi } from "lucide-react";

const WORKSPACES = [1, 2, 3, 4, 5];
const ACTIVE_WORKSPACE = 2;

function useCurrentTime() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", { weekday: "short", month: "2-digit", day: "2-digit" })
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return { time, date };
}

export const SystemStatusBar: React.FC = () => {
  const { time, date } = useCurrentTime();

  return (
    <div className="w-full flex justify-center px-4 pt-3 pointer-events-none select-none">
      <div
        className="system-status-bar w-full max-w-[1400px] h-10 flex items-center justify-between px-4 rounded-xl pointer-events-auto"
        style={{
          background: "rgba(9,18,43,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(125,160,255,0.18)",
          boxShadow: "inset 0 1px 0 rgba(140,203,255,0.07), 0 4px 24px rgba(2,4,13,0.5)",
        }}
      >
        {/* ── LEFT: brand mark + workspace numbers ── */}
        <div className="flex items-center gap-4">
          {/* Geometric brand mark */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(47,72,165,0.7)", border: "1px solid rgba(99,214,255,0.3)" }}
            >
              <div className="w-1.5 h-1.5 rounded-sm bg-cyan-400" />
            </div>
          </div>

          {/* Workspace numbers */}
          <div className="flex items-center gap-1 font-mono text-[11px]">
            {WORKSPACES.map((n) =>
              n === ACTIVE_WORKSPACE ? (
                <span
                  key={n}
                  className="w-5 h-5 flex items-center justify-center rounded text-cyan-300 font-semibold"
                  style={{
                    border: "1px solid rgba(99,214,255,0.45)",
                    background: "rgba(99,214,255,0.1)",
                  }}
                >
                  {n}
                </span>
              ) : (
                <span key={n} className="w-5 h-5 flex items-center justify-center text-[#9DA9C3] hover:text-white transition-colors cursor-pointer">
                  {n}
                </span>
              )
            )}
          </div>
        </div>

        {/* ── RIGHT: status indicators ── */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#9DA9C3]">
          {/* Power icon */}
          <Power className="w-3 h-3 text-[#9DA9C3] hidden sm:block" />

          {/* Live Mode badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded"
            style={{
              background: "rgba(99,214,255,0.08)",
              border: "1px solid rgba(99,214,255,0.2)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#9DF5B0", boxShadow: "0 0 6px #9DF5B0" }}
            />
            <span className="text-[10px] text-[#8ACBFF] tracking-wide">Live Mode</span>
          </div>

          {/* Performance percentages */}
          <span className="hidden md:block opacity-70">8%</span>
          <span className="hidden md:block opacity-70">13%</span>

          {/* Time & Date */}
          <span className="text-[#F7F9FF] opacity-80 hidden sm:block">
            {time || "00:00"}
          </span>
          <span className="opacity-50 hidden md:block">·</span>
          <span className="hidden md:block opacity-60">{date || "Wed, 08/06"}</span>

          {/* Connection */}
          <div className="flex items-center gap-1 hidden sm:flex">
            <Wifi className="w-3 h-3" />
            <span className="text-[10px] hidden lg:block">Wired</span>
          </div>

          {/* Glowing status dot */}
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#63D6FF",
              boxShadow: "0 0 8px rgba(99,214,255,0.9)",
              animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};
