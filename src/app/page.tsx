import { Navbar } from "@/components/Navbar";
import { HeroAnimation } from "@/components/HeroAnimation";
import { GsapPlayground } from "@/components/GsapPlayground";
import { TechStack } from "@/components/TechStack";
import { Sparkles, Code2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      <div>
        <Navbar />
        <HeroAnimation />
        <GsapPlayground />
        <TechStack />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 px-6 mt-16 text-center text-xs text-slate-500 space-y-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Final Year Project Base Template &mdash; Built with Next.js, Tailwind CSS & GSAP</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-slate-200 transition-colors">Ready for Development</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
