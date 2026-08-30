import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ArchTitan OS — Context-Aware Developer Linux",
    template: "%s | ArchTitan OS",
  },
  description:
    "A final-year research project exploring workspace-topology-aware resource orchestration and an integrated Linux-Android developer ecosystem.",
  applicationName: "ArchTitan OS",
  keywords: ["Arch Linux", "developer operating system", "Hyprland", "resource orchestration", "Linux Android ecosystem"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
