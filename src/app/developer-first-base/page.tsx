import type { Metadata } from "next";
import { SystemFeaturePage, type FeaturePageData } from "@/components/feature/SystemFeaturePage";

export const metadata: Metadata = {
  title: "Developer-First Base",
  description: "The minimal Arch Linux, Hyprland and BTRFS foundation beneath the ArchTitan OS developer environment.",
};

const data: FeaturePageData = {
  accent: "#8b7cff",
  eyebrow: "Complete distribution · Developer-First Base",
  title: ["A smaller base.", "A sharper", "developer system."],
  summary: "ArchTitan OS begins with a minimal Arch Linux image, a Hyprland-based Wayland desktop, BTRFS recovery, and an installation path designed to move from clean hardware to a productive development environment.",
  metrics: [["Arch", "distribution base"], ["BTRFS", "root filesystem"], ["Wayland", "display protocol"], ["< 1 GB", "idle RAM target"]],
  capabilities: [
    ["01", "Minimal system image", "Builds the distribution from an explicit archiso package manifest instead of a general-purpose desktop image.", "archiso · package manifest"],
    ["02", "Workspace-native desktop", "Uses Hyprland to expose tiled workspace and multi-monitor topology directly to THM.", "Hyprland · Wayland · IPC"],
    ["03", "Recoverable storage", "Pairs BTRFS subvolumes with snapshot management for safer system experimentation and rollback.", "BTRFS · subvolumes · snapshots"],
    ["04", "Guided installation", "Combines Calamares with post-install hooks and a Bash TUI for reproducible developer setup.", "Calamares · Bash · systemd"],
  ],
  pipeline: [
    ["Compose", "archiso", "Resolve the package manifest, configuration overlay and distribution identity."],
    ["Install", "Calamares + TUI", "Partition storage, create users and apply the selected developer profile."],
    ["Configure", "post-install hooks", "Enable services, workspace defaults, snapshots and hardware-aware policies."],
    ["Boot", "GRUB + systemd", "Enter a consistent Hyprland session with ArchTitan services ready."],
  ],
  principles: [["Minimal by default", "Every background service must justify its memory and scheduling cost."], ["Reproducible setup", "The system image and installer turn configuration into versioned engineering."], ["Recovery built in", "Snapshots make low-level experimentation safer for developers."], ["Context-ready desktop", "The compositor is part of the resource architecture, not merely visual presentation."]],
  footer: "A Linux foundation designed around the way developers actually work.",
};

export default function DeveloperFirstBasePage() {
  return <SystemFeaturePage data={data} />;
}
