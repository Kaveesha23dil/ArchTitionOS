"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Play, Pause, RotateCcw, FastForward, Sliders, Box, Layers, Sparkles } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function GsapPlayground() {
  const labRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const activeTab: "stagger" | "3d" | "physics" = "stagger";

  useGSAP(
    () => {
      // Create a master interactive timeline
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        paused: false,
        onUpdate: () => {},
      });

      timelineRef.current = tl;

      tl.to(".lab-box-1", {
        scale: 1.25,
        rotation: 180,
        borderRadius: "50%",
        backgroundColor: "#06b6d4",
        duration: 1.2,
        ease: "back.out(1.7)",
      })
        .to(
          ".lab-box-2",
          {
            y: -30,
            rotationX: 360,
            backgroundColor: "#8b5cf6",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "-=0.8"
        )
        .to(
          ".lab-box-3",
          {
            scale: 0.8,
            rotationZ: -180,
            backgroundColor: "#10b981",
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.8"
        );
    },
    { scope: labRef, dependencies: [activeTab] }
  );

  const togglePlay = () => {
    if (!timelineRef.current) return;
    if (timelineRef.current.isActive()) {
      timelineRef.current.pause();
      setIsPlaying(false);
    } else {
      timelineRef.current.play();
      setIsPlaying(true);
    }
  };

  const reverseAnim = () => {
    if (!timelineRef.current) return;
    timelineRef.current.reverse();
    setIsPlaying(timelineRef.current.isActive());
  };

  const restartAnim = () => {
    if (!timelineRef.current) return;
    timelineRef.current.restart();
    setIsPlaying(true);
  };

  const changeSpeed = (speed: number) => {
    if (!timelineRef.current) return;
    timelineRef.current.timeScale(speed);
  };

  return (
    <section id="playground" ref={labRef} className="py-16 px-6 relative max-w-6xl mx-auto">
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300">
          <Sparkles className="w-3.5 h-3.5" /> INTERACTIVE GSAP LAB
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Real-Time Timeline Controls
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Test interactive GSAP controls live. Manipulate animation playback speed, direction, and timelines in real-time.
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-slate-800 space-y-8 shadow-2xl">
        {/* Interactive Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={reverseAnim}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reverse
            </button>
            <button
              onClick={restartAnim}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-all"
            >
              Restart
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FastForward className="w-4 h-4 text-cyan-400" />
            <span className="font-mono">Speed:</span>
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => changeSpeed(s)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono hover:text-white transition-all"
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Animation Canvas Container */}
        <div className="min-h-[260px] bg-slate-950/80 rounded-2xl border border-slate-800/80 p-8 flex flex-col md:flex-row items-center justify-around gap-8 relative overflow-hidden">
          {/* Box 1 */}
          <div className="flex flex-col items-center gap-3">
            <div className="lab-box-1 w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
              <Box className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-slate-400">Back Ease</span>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col items-center gap-3">
            <div className="lab-box-2 w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
              <Layers className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-slate-400">3D Rotation</span>
          </div>

          {/* Box 3 */}
          <div className="flex flex-col items-center gap-3">
            <div className="lab-box-3 w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30">
              <Sliders className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-slate-400">Elastic Ease</span>
          </div>
        </div>
      </div>
    </section>
  );
}
