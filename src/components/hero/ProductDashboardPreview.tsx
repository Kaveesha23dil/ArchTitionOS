"use client";

import React from "react";
import {
  LayoutGrid,
  GitBranch,
  Database,
  PlugZap,
  BarChart3,
  Search,
  Bell,
  ChevronRight,
  Circle,
} from "lucide-react";

/* ── Data ── */
const SIDEBAR_ITEMS = [
  { icon: LayoutGrid, label: "Overview" },
  { icon: GitBranch, label: "Workflows", active: true },
  { icon: Database, label: "Data Sources" },
  { icon: PlugZap, label: "Integrations" },
  { icon: BarChart3, label: "Analytics" },
];

const COLUMNS = ["Incoming", "Processing", "Review", "Completed"] as const;
type Column = (typeof COLUMNS)[number];

interface CardData {
  id: string;
  title: string;
  column: Column;
  priority: "high" | "medium" | "low";
  status: string;
  progress?: number;
  avatars: string[];
  tag: string;
  tagColor: string;
}

const CARDS: CardData[] = [
  { id: "c1", title: "Customer workflow analysis", column: "Incoming", priority: "high", status: "Queued", avatars: ["AK", "MR"], tag: "AI", tagColor: "#63D6FF" },
  { id: "c2", title: "Recommendation pipeline", column: "Incoming", priority: "medium", status: "Pending", avatars: ["SL"], tag: "ML", tagColor: "#9DF5B0" },
  { id: "c3", title: "Document intelligence", column: "Processing", priority: "high", status: "Running", progress: 64, avatars: ["JD", "TK"], tag: "NLP", tagColor: "#927CFF" },
  { id: "c4", title: "API integration review", column: "Processing", priority: "medium", status: "In progress", progress: 38, avatars: ["EN"], tag: "Dev", tagColor: "#8ACBFF" },
  { id: "c5", title: "Model validation", column: "Review", priority: "medium", status: "Reviewing", avatars: ["AK", "SL", "JD"], tag: "QA", tagColor: "#9DF5B0" },
  { id: "c6", title: "Deployment readiness", column: "Completed", priority: "low", status: "Done", progress: 100, avatars: ["MR"], tag: "Ops", tagColor: "#63D6FF" },
];

const PRIORITY_DOT: Record<string, string> = {
  high: "#FF6B6B",
  medium: "#FFD166",
  low: "#9DF5B0",
};

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-[#F7F9FF] -ml-1 first:ml-0 border border-[#09122B]"
      style={{ background: "linear-gradient(135deg, #2F48A5, #63D6FF)" }}
    >
      {initials}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1 rounded-full mt-2" style={{ background: "rgba(125,160,255,0.12)" }}>
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${value}%`,
          background: value === 100
            ? "#9DF5B0"
            : "linear-gradient(90deg, #2F48A5, #63D6FF)",
        }}
      />
    </div>
  );
}

function DashCard({ card }: { card: CardData }) {
  return (
    <div
      className="rounded-xl p-3 mb-2 cursor-default select-none hover:border-[rgba(99,214,255,0.25)] transition-all duration-200"
      style={{
        background: "rgba(9,18,43,0.8)",
        border: "1px solid rgba(125,160,255,0.1)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-medium leading-snug" style={{ color: "#F7F9FF" }}>
          {card.title}
        </span>
        {/* Priority dot */}
        <Circle
          className="w-2 h-2 shrink-0 mt-0.5 fill-current"
          style={{ color: PRIORITY_DOT[card.priority] }}
        />
      </div>

      {/* Tag + status */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[9px] font-semibold px-1.5 py-0.5 rounded tracking-wide"
          style={{
            color: card.tagColor,
            background: `${card.tagColor}18`,
            border: `1px solid ${card.tagColor}30`,
          }}
        >
          {card.tag}
        </span>
        <span className="text-[9px] font-mono" style={{ color: "#9DA9C3" }}>
          {card.status}
        </span>
      </div>

      {/* Progress */}
      {card.progress !== undefined && <ProgressBar value={card.progress} />}

      {/* Avatars */}
      <div className="flex items-center mt-2.5">
        <div className="flex items-center">
          {card.avatars.map((av) => (
            <Avatar key={av} initials={av} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Metric Cards at the top ── */
function MetricCard({ label, value, change, color }: { label: string; value: string; change: string; color: string }) {
  return (
    <div
      className="flex-1 min-w-[100px] rounded-xl px-3 py-2.5"
      style={{ background: "rgba(9,18,43,0.7)", border: "1px solid rgba(125,160,255,0.1)" }}
    >
      <div className="text-[10px] font-mono mb-1" style={{ color: "#9DA9C3" }}>{label}</div>
      <div className="text-sm font-bold" style={{ color: "#F7F9FF" }}>{value}</div>
      <div className="text-[9px] mt-0.5 font-mono" style={{ color }}>{change}</div>
    </div>
  );
}

/* ── Small inline chart ── */
function MiniChart() {
  const BARS = [55, 70, 48, 90, 65, 80, 72, 95, 60, 85, 78, 100, 88];
  return (
    <div className="flex items-end gap-[2px] h-8">
      {BARS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${h}%`,
            background: h === 100
              ? "linear-gradient(180deg, #63D6FF, #2F48A5)"
              : "rgba(47,72,165,0.5)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Dashboard ── */
export const ProductDashboardPreview: React.FC = () => {
  const cardsByColumn = (col: Column) => CARDS.filter((c) => c.column === col);

  return (
    <div className="relative z-10 w-full flex justify-center px-4 mt-6 pb-0">
      {/* Large blurred glow behind the panel */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
        style={{
          width: "90%",
          height: "300px",
          background:
            "radial-gradient(ellipse at center, rgba(47,72,165,0.35) 0%, rgba(99,214,255,0.12) 50%, transparent 75%)",
          filter: "blur(50px)",
          zIndex: -1,
        }}
      />

      {/* Dashboard panel */}
      <div
        className="hero-dashboard w-full max-w-[1100px] rounded-t-2xl overflow-hidden"
        style={{
          background: "rgba(9,18,43,0.92)",
          border: "1px solid rgba(125,160,255,0.18)",
          borderBottom: "none",
          boxShadow:
            "0 -4px 60px rgba(47,72,165,0.25), 0 0 120px rgba(99,214,255,0.08), inset 0 1px 0 rgba(140,203,255,0.1)",
          transform: "perspective(1200px) rotateX(3.5deg)",
          transformOrigin: "center top",
          /* Bottom gradient mask */
          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      >
        {/* Top edge light pulse */}
        <div
          aria-hidden="true"
          className="h-[1px] w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #63D6FF 40%, #927CFF 60%, transparent 100%)",
            opacity: 0.6,
          }}
        />

        <div className="flex" style={{ minHeight: "440px" }}>
          {/* ── Left Sidebar ── */}
          <aside
            className="hidden sm:flex flex-col shrink-0 w-44 py-4 px-3 gap-1"
            style={{ borderRight: "1px solid rgba(125,160,255,0.1)", background: "rgba(5,11,27,0.5)" }}
          >
            {/* Brand inside sidebar */}
            <div className="flex items-center gap-2 px-2 py-1.5 mb-3">
              <div
                className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #2F48A5, #63D6FF)" }}
              >
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 12H2L8 2Z" fill="#F7F9FF" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold" style={{ color: "#F7F9FF" }}>Vectorium</span>
            </div>

            {SIDEBAR_ITEMS.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-medium transition-colors duration-150 cursor-pointer"
                style={{
                  color: active ? "#63D6FF" : "#9DA9C3",
                  background: active ? "rgba(99,214,255,0.08)" : "transparent",
                  border: active ? "1px solid rgba(99,214,255,0.18)" : "1px solid transparent",
                }}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {label}
              </div>
            ))}
          </aside>

          {/* ── Main Content Area ── */}
          <main className="flex-1 flex flex-col min-w-0">
            {/* Toolbar */}
            <div
              className="flex items-center justify-between px-4 h-11 shrink-0"
              style={{ borderBottom: "1px solid rgba(125,160,255,0.1)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold" style={{ color: "#F7F9FF" }}>
                  Intelligence Operations
                </span>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: "#9DA9C3" }} />
                <span className="text-[11px] font-mono" style={{ color: "#9DA9C3" }}>Workflows</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Search */}
                <div
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono"
                  style={{ background: "rgba(9,18,43,0.8)", border: "1px solid rgba(125,160,255,0.12)", color: "#9DA9C3" }}
                >
                  <Search className="w-3 h-3" />
                  <span>Search workflows...</span>
                </div>

                {/* Status filters */}
                {["All", "Active", "Queued"].map((f) => (
                  <span
                    key={f}
                    className="hidden lg:block px-2.5 py-1 rounded-full text-[10px] font-medium cursor-pointer"
                    style={{
                      color: f === "All" ? "#63D6FF" : "#9DA9C3",
                      background: f === "All" ? "rgba(99,214,255,0.1)" : "transparent",
                      border: f === "All" ? "1px solid rgba(99,214,255,0.25)" : "1px solid transparent",
                    }}
                  >
                    {f}
                  </span>
                ))}

                <Bell className="w-4 h-4 cursor-pointer" style={{ color: "#9DA9C3" }} />

                {/* Avatar */}
                <div
                  className="w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #2F48A5, #63D6FF)", color: "#F7F9FF" }}
                >
                  VL
                </div>
              </div>
            </div>

            {/* Metrics row */}
            <div className="flex items-center gap-3 px-4 py-3 shrink-0 overflow-x-auto scrollbar-none">
              <MetricCard label="Active Systems" value="48" change="↑ 12 today" color="#9DF5B0" />
              <MetricCard label="Throughput" value="1.4 TB/s" change="↑ 8%" color="#63D6FF" />
              <MetricCard label="AI Accuracy" value="99.2%" change="Stable" color="#927CFF" />
              <div
                className="flex-1 min-w-[160px] rounded-xl px-3 py-2.5"
                style={{ background: "rgba(9,18,43,0.7)", border: "1px solid rgba(125,160,255,0.1)" }}
              >
                <div className="text-[10px] font-mono mb-1" style={{ color: "#9DA9C3" }}>Load (24h)</div>
                <MiniChart />
              </div>
            </div>

            {/* Kanban columns */}
            <div className="flex-1 flex gap-3 px-4 pb-4 overflow-x-auto scrollbar-none">
              {COLUMNS.map((col) => (
                <div key={col} className="flex-1 min-w-[160px]">
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-semibold" style={{ color: "#9DA9C3" }}>
                      {col}
                    </span>
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(125,160,255,0.12)", color: "#9DA9C3" }}
                    >
                      {cardsByColumn(col).length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div>
                    {cardsByColumn(col).map((card) => (
                      <DashCard key={card.id} card={card} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
