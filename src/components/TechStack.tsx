"use client";

import { CheckCircle2, Code, Cpu, Layout, Zap, Terminal } from "lucide-react";

export function TechStack() {
  const technologies = [
    {
      name: "Next.js 16 (App Router)",
      badge: "Framework",
      description: "React 19 Server Components, optimized layout router, fast refresh, and SSR/SSG capabilities.",
      icon: Cpu,
      color: "text-sky-400",
      border: "border-sky-500/20",
      bg: "bg-sky-500/10",
    },
    {
      name: "Tailwind CSS v4",
      badge: "Styling",
      description: "Next-gen CSS engine with custom glassmorphism design tokens, CSS variables, and utility classes.",
      icon: Layout,
      color: "text-cyan-400",
      border: "border-cyan-500/20",
      bg: "bg-cyan-500/10",
    },
    {
      name: "GSAP 3 + @gsap/react",
      badge: "Animation",
      description: "Industry-standard animation engine with React hook scoping (`useGSAP`), timelines, and zero memory leaks.",
      icon: Zap,
      color: "text-purple-400",
      border: "border-purple-500/20",
      bg: "bg-purple-500/10",
    },
    {
      name: "TypeScript 5",
      badge: "Type Safety",
      description: "Strict compile-time type safety for component props, API payloads, and state management.",
      icon: Code,
      color: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <section id="features" className="py-16 px-6 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
          <Terminal className="w-3.5 h-3.5" /> ARCHITECTURE VERIFIED
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Installed Tech Stack & Dependencies
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Every core dependency is configured and pre-tested to build your complete final year web application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${tech.bg} ${tech.border} border`}>
                    <Icon className={`w-6 h-6 ${tech.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 text-base">{tech.name}</h3>
                    <span className="text-xs font-mono text-slate-500">{tech.badge}</span>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{tech.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
