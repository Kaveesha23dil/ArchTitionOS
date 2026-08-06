"use client";

import React from "react";
import {
  LayoutDashboard,
  Workflow,
  Cpu,
  Database,
  Layers,
  BarChart3,
  Search,
  Bell,
  CheckCircle2,
  TrendingUp,
  Activity,
  Zap,
} from "lucide-react";

interface DashboardPreviewProps {
  parallaxX?: number;
  parallaxY?: number;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  parallaxX = 0,
  parallaxY = 0,
}) => {
  return (
    <div
      className="hero-dashboard w-full max-w-[1140px] mx-auto mt-12 sm:mt-16 px-4 transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(6deg) translate3d(${parallaxX * 0.4}px, ${parallaxY * 0.4}px, 0)`,
      }}
    >
      {/* Outer Glow Container */}
      <div className="relative rounded-3xl bg-slate-950/85 border border-slate-800/90 shadow-[0_0_60px_rgba(47,72,165,0.25)] overflow-hidden backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
        {/* Subtle Light Pulse Bar on top edge */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

        {/* Dashboard Frame */}
        <div className="flex min-h-[460px] text-xs font-sans">
          {/* Left Sidebar */}
          <aside className="w-52 hidden md:flex flex-col border-r border-slate-800/80 bg-slate-950/90 p-4 space-y-6">
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-semibold text-slate-200 tracking-wide text-xs">Vectorium OS</span>
            </div>

            <nav className="space-y-1 text-slate-400 font-medium">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800">
                <LayoutDashboard className="w-4 h-4" /> Overview
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900/60 hover:text-slate-200 transition-colors">
                <Workflow className="w-4 h-4 text-purple-400" /> Workflows
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900/60 hover:text-slate-200 transition-colors">
                <Cpu className="w-4 h-4 text-blue-400" /> AI Systems
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900/60 hover:text-slate-200 transition-colors">
                <Database className="w-4 h-4 text-emerald-400" /> Data Sources
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900/60 hover:text-slate-200 transition-colors">
                <Layers className="w-4 h-4 text-amber-400" /> Integrations
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-900/60 hover:text-slate-200 transition-colors">
                <BarChart3 className="w-4 h-4 text-sky-400" /> Analytics
              </div>
            </nav>
          </aside>

          {/* Main Dashboard Area */}
          <div className="flex-1 flex flex-col bg-slate-950/60">
            {/* Top Bar Header */}
            <header className="h-14 border-b border-slate-800/80 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-100 text-sm">Operations Workspace</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Nominal • 99.98%
                </span>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                  <Search className="w-3.5 h-3.5" /> Search telemetry...
                </div>
                <Bell className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                  V
                </div>
              </div>
            </header>

            {/* Content Body Grid */}
            <div className="p-6 space-y-6">
              {/* Metric Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Workflows</span>
                    <Workflow className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xl font-bold text-white flex items-baseline gap-2">
                    48 <span className="text-xs font-normal text-emerald-400">+12%</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>AI Inference Rate</span>
                    <Zap className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-xl font-bold text-white flex items-baseline gap-2">
                    99.4% <span className="text-xs font-normal text-purple-400">Optimal</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Data Throughput</span>
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl font-bold text-white flex items-baseline gap-2">
                    1.2 TB/s <span className="text-xs font-normal text-emerald-400">Live</span>
                  </div>
                </div>
              </div>

              {/* Performance Graph & Activity Table */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Graph Card */}
                <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">System Telemetry &amp; Load</span>
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                  </div>
                  {/* SVG Telemetry Waves */}
                  <div className="h-32 w-full flex items-end gap-1.5 pt-4">
                    {[45, 60, 55, 75, 80, 65, 90, 85, 95, 70, 88, 100, 92, 84, 96].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-400 rounded-t-sm transition-all duration-500 hover:brightness-125"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Log Activity Card */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3">
                  <span className="font-semibold text-slate-200 block">Operational Events</span>
                  <div className="space-y-2.5 text-[11px] font-mono">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-emerald-400">✓ Model Sync</span>
                      <span className="text-slate-500">2m ago</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-cyan-400">⚡ Pipeline Auto-Scale</span>
                      <span className="text-slate-500">8m ago</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-purple-400">⚙ API Integration</span>
                      <span className="text-slate-500">14m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
