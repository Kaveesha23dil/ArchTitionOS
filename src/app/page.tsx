"use client";

import { useState } from "react";
import { TerminalLoader } from "@/components/TerminalLoader";
import { PremiumHero } from "@/components/hero/PremiumHero";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <main style={{ background: "#02040D" }}>
      {/* Terminal boot loader */}
      {!loaderDone && (
        <TerminalLoader onComplete={() => setLoaderDone(true)} />
      )}

      {/* Premium hero — always mounted, reveals after boot */}
      <PremiumHero animationReady={loaderDone} />
    </main>
  );
}
