"use client";

import React from "react";
import {
  LayoutGrid,
  GitBranch,
  Database,
  PlugZap,
  BarChart3,
  AlertCircle,
  Settings,
  Search,
  Bell,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  SlidersHorizontal,
  Activity,
  DollarSign,
  CheckSquare,
  Clock,
} from "lucide-react";
import { SidebarLogo } from "./ArchTitanLogo";

/* ─── Sidebar ─── */
const SIDEBAR = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: GitBranch, label: "Workflows" },
  { icon: Activity, label: "Agents" },
  { icon: Database, label: "Data Hub" },
  { icon: PlugZap, label: "Integrations" },
  { icon: BarChart3, label: "Analytics" },
  { icon: AlertCircle, label: "Alerts" },
  { icon: Settings, label: "Settings" },
];

/* ─── Kanban columns ─── */
type Priority = "high" | "medium" | "low";
type Status = "intake" | "in_progress" | "review" | "completed" | "blocked";

interface KanbanCard {
  id: string;
  title: string;
  col: Status;
  priority?: Priority;
  agent?: string;
  avatars: string[];
  timeAgo: string;
  tag?: string;
}

const COLUMNS: { id: Status; label: string; count: number; accent: string }[] = [
  { id: "intake", label: "Intake", count: 12, accent: "rgba(125,160,255,0.5)" },
  { id: "in_progress", label: "In Progress", count: 8, accent: "#4A6FE3" },
  { id: "review", label: "Review", count: 6, accent: "#63D6FF" },
  { id: "completed", label: "Completed", count: 24, accent: "#9DF5B0" },
  { id: "blocked", label: "Blocked", count: 3, accent: "#FF6B6B" },
];

const CARDS: KanbanCard[] = [
  { id: "k1", title: "Support Ticket T-4821", col: "intake", priority: "high", avatars: ["AK", "MR"], timeAgo: "2h ago" },
  { id: "k2", title: "Vendor Onboarding", col: "intake", priority: "medium", avatars: ["SL"], timeAgo: "6h ago" },
  { id: "k3", title: "Invoice Processing", col: "in_progress", agent: "AI Agent: Finley", avatars: ["JD", "TK"], timeAgo: "11h ago" },
  { id: "k4", title: "Campaign Analysis", col: "in_progress", agent: "AI Agent: Insight", avatars: ["EN", "AK"], timeAgo: "3h ago" },
  { id: "k5", title: "Compliance Check", col: "review", priority: "high", avatars: ["SL", "MR"], timeAgo: "16h ago" },
  { id: "k6", title: "Contract Approval", col: "review", agent: "AI Agent: Lexi", avatars: ["JD"], timeAgo: "2h ago" },
  { id: "k7", title: "Report Generation", col: "completed", tag: "Completed", avatars: ["AK", "EN"], timeAgo: "1d ago" },
  { id: "k8", title: "Data Sync", col: "completed", tag: "Completed", avatars: ["MR"], timeAgo: "1d ago" },
  { id: "k9", title: "API Rate Limit", col: "blocked", tag: "Blocked", avatars: ["JD"], timeAgo: "30m ago" },
  { id: "k10", title: "Missing Data Source", col: "blocked", tag: "Blocked", avatars: ["TK", "EN"], timeAgo: "2h ago" },
];

const PRIORITY_COLORS: Record<Priority, string> = {
  high: "#FF6B6B",
  medium: "#FFD166",
  low: "#9DF5B0",
};

const METRIC_ICONS: Record<string, React.ElementType> = {
  "Total Workflows": GitBranch,
  "Avg. Completion": Clock,
  "Automation Rate": PlugZap,
  "Tasks Completed": CheckSquare,
  "Cost Savings": DollarSign,
};

const METRICS = [
  { label: "Total Workflows", value: "128", change: "+18%", pos: true },
  { label: "Avg. Completion", value: "2.4h", change: "+12%", pos: true },
  { label: "Automation Rate", value: "76%", change: "+5%", pos: true },
  { label: "Tasks Completed", value: "1,482", change: "+22%", pos: true },
  { label: "Cost Savings", value: "$48.2k", change: "+15%", pos: true },
];

/* ─── Avatar ─── */
function Avatar({ initials, size = 20 }: { initials: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-[#09122B] shrink-0 -ml-1 first:ml-0"
      style={{
        width: size, height: size,
        background: "linear-gradient(135deg, #2F48A5, #63D6FF)",
      }}
    >
      {initials}
    </div>
  );
}

/* ─── Kanban Card ─── */
function KCard({ card }: { card: KanbanCard }) {
  const col = COLUMNS.find((c) => c.id === card.col)!;
  return (
    <div
      className="rounded-xl p-3 mb-2 group cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(99,214,255,0.35)] hover:shadow-[0_4px_20px_rgba(47,72,165,0.25)]"
      style={{
        background: "rgba(9,18,43,0.9)",
        border: "1px solid rgba(125,160,255,0.1)",
      }}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-medium leading-snug text-[#E8EDF7] flex-1 group-hover:text-white transition-colors">
          {card.title}
        </span>
        <MoreHorizontal className="w-3.5 h-3.5 text-[#9DA9C3] shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Priority / agent */}
      {card.priority && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
            style={{ background: PRIORITY_COLORS[card.priority], boxShadow: `0 0 6px ${PRIORITY_COLORS[card.priority]}` }}
          />
          <span className="text-[10px] text-[#9DA9C3]">
            Priority: {card.priority.charAt(0).toUpperCase() + card.priority.slice(1)}
          </span>
        </div>
      )}
      {card.agent && (
        <div className="mt-1.5 text-[10px] text-cyan-400/80 font-mono">{card.agent}</div>
      )}
      {card.tag && (
        <div
          className="mt-1.5 inline-flex items-center text-[9px] font-semibold px-1.5 py-0.5 rounded"
          style={{
            color: col.accent,
            background: `${col.accent}18`,
            border: `1px solid ${col.accent}30`,
          }}
        >
          {card.tag}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2.5">
        <div className="flex items-center">
          {card.avatars.map((av) => <Avatar key={av} initials={av} />)}
        </div>
        <span className="text-[9px] text-[#9DA9C3]/60 font-mono">{card.timeAgo}</span>
      </div>
    </div>
  );
}

/* ─── Metric Card ─── */
function MetricCard({ metric }: { metric: (typeof METRICS)[number] }) {
  const Icon = METRIC_ICONS[metric.label] ?? Activity;
  return (
    <div
      className="flex-1 min-w-[120px] rounded-xl p-3"
      style={{ background: "rgba(9,18,43,0.8)", border: "1px solid rgba(125,160,255,0.1)" }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <div
          className="w-5 h-5 rounded flex items-center justify-center shrink-0"
          style={{ background: "rgba(47,72,165,0.3)" }}
        >
          <Icon className="w-3 h-3 text-cyan-400" />
        </div>
        <span className="text-[10px] text-[#9DA9C3] font-mono">{metric.label}</span>
      </div>
      <div className="text-base font-bold text-[#F7F9FF]">{metric.value}</div>
      <div className="flex items-center gap-0.5 mt-0.5">
        {metric.pos ? (
          <TrendingUp className="w-2.5 h-2.5 text-green-400 shrink-0" />
        ) : (
          <TrendingDown className="w-2.5 h-2.5 text-red-400 shrink-0" />
        )}
        <span className="text-[9px] font-mono" style={{ color: metric.pos ? "#9DF5B0" : "#FF6B6B" }}>
          {metric.change} vs last 7 days
        </span>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */
export const OperationsDashboard: React.FC = () => {
  const cardsFor = (col: Status) => CARDS.filter((c) => c.col === col);

  return (
    <div className="relative z-10 w-full flex justify-center px-4 sm:px-8 mt-8">
      {/* Glow behind dashboard */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
        style={{
          width: "85%", height: "200px",
          background: "radial-gradient(ellipse at center, rgba(47,72,165,0.4) 0%, rgba(99,214,255,0.1) 55%, transparent 80%)",
          filter: "blur(50px)", zIndex: -1,
        }}
      />

      {/* Dashboard panel */}
      <div
        className="hero-dashboard w-full max-w-[1100px] rounded-t-2xl overflow-hidden"
        style={{
          background: "rgba(6,12,30,0.96)",
          border: "1px solid rgba(125,160,255,0.2)",
          borderBottom: "none",
          boxShadow:
            "0 -8px 60px rgba(47,72,165,0.3), 0 0 100px rgba(99,214,255,0.08), inset 0 1px 0 rgba(140,203,255,0.12)",
          transform: "perspective(1400px) rotateX(2.5deg)",
          transformOrigin: "center top",
          WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
        }}
      >
        {/* Top glow edge */}
        <div
          aria-hidden="true"
          className="h-[1px] w-full"
          style={{
            background: "linear-gradient(90deg, transparent 5%, #2F48A5 25%, #63D6FF 45%, #927CFF 65%, transparent 95%)",
            opacity: 0.7,
          }}
        />

        <div className="flex" style={{ minHeight: "460px" }}>
          {/* ── Sidebar ── */}
          <aside
            className="hidden sm:flex flex-col shrink-0 py-4 px-2 gap-0.5"
            style={{ width: "160px", borderRight: "1px solid rgba(125,160,255,0.1)", background: "rgba(3,6,15,0.5)" }}
            aria-label="Dashboard navigation"
          >
            {/* Logo inside sidebar */}
            <div className="flex items-center gap-2 px-3 py-2 mb-4">
              <SidebarLogo />
            </div>

            {SIDEBAR.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium cursor-pointer transition-colors"
                style={{
                  color: active ? "#63D6FF" : "#9DA9C3",
                  background: active ? "rgba(99,214,255,0.08)" : "transparent",
                  border: active ? "1px solid rgba(99,214,255,0.2)" : "1px solid transparent",
                }}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                {label}
              </div>
            ))}
          </aside>

          {/* ── Main panel ── */}
          <main className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3 shrink-0"
              style={{ borderBottom: "1px solid rgba(125,160,255,0.1)" }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span className="text-[14px] font-semibold text-[#F7F9FF]">Operations Hub</span>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-[#9DA9C3] mt-0.5 font-mono">
                  Real-time overview of your critical workflows
                </p>
              </div>

              {/* Top-right controls */}
              <div className="flex items-center gap-2">
                {/* Search */}
                <div
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-mono text-[#9DA9C3]"
                  style={{ background: "rgba(9,18,43,0.9)", border: "1px solid rgba(125,160,255,0.14)" }}
                >
                  <Search className="w-3 h-3" aria-hidden="true" />
                  <span>Search...</span>
                </div>

                {/* Avatars */}
                <div className="hidden md:flex items-center">
                  {["AT", "AK", "MR", "SL"].map((av) => (
                    <Avatar key={av} initials={av} size={22} />
                  ))}
                  <span className="text-[10px] text-[#9DA9C3] ml-1.5 font-mono">+3</span>
                </div>

                <Bell className="w-4 h-4 text-[#9DA9C3] cursor-pointer hidden sm:block" aria-label="Notifications" />

                {/* Date filter */}
                <div
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-[#9DA9C3] cursor-pointer"
                  style={{ background: "rgba(9,18,43,0.9)", border: "1px solid rgba(125,160,255,0.14)" }}
                >
                  <CalendarDays className="w-3 h-3" aria-hidden="true" />
                  <span className="font-mono">This Week</span>
                </div>

                <SlidersHorizontal className="w-4 h-4 text-[#9DA9C3] cursor-pointer" aria-label="Filter options" />
              </div>
            </div>

            {/* Kanban board */}
            <div className="flex-1 flex gap-3 px-4 py-4 overflow-x-auto scrollbar-none min-w-0">
              {COLUMNS.map((col) => (
                <div key={col.id} className="flex-1 min-w-[160px] flex flex-col">
                  {/* Column header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-semibold" style={{ color: "#C8D3F5" }}>
                      {col.label}
                    </span>
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                      style={{
                        color: col.accent,
                        background: `${col.accent}20`,
                        border: `1px solid ${col.accent}40`,
                      }}
                    >
                      {col.count}
                    </span>
                  </div>

                  {/* Cards */}
                  <div>
                    {cardsFor(col.id).map((card) => (
                      <KCard key={card.id} card={card} />
                    ))}
                    {cardsFor(col.id).length > 1 && (
                      <div className="text-[10px] text-[#9DA9C3]/60 font-mono pl-1">
                        + {col.count - cardsFor(col.id).length} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Metrics footer row ── */}
            <div
              className="flex items-stretch gap-3 px-4 pb-4 overflow-x-auto scrollbar-none shrink-0"
              style={{ borderTop: "1px solid rgba(125,160,255,0.08)" }}
            >
              <div className="flex items-center gap-3 w-full pt-3">
                {METRICS.map((m) => (
                  <MetricCard key={m.label} metric={m} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
