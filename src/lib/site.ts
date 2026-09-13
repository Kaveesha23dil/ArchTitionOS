import type { Metadata } from "next";

export const siteConfig = {
  name: "ArchTitan OS",
  url: "https://www.archtitan.tech",
  description:
    "ArchTitan OS is a developer-focused Arch Linux distribution with adaptive resource management, workspace intelligence and native cross-device tools.",
  ogImage: "/opengraph-image",
} as const;

export type PageSeo = {
  path: `/${string}` | "/";
  title: string;
  description: string;
  keywords: string[];
};

export const pageSeo = {
  home: {
    path: "/",
    title: "ArchTitan OS — Context-Aware Linux for Developers",
    description: siteConfig.description,
    keywords: ["ArchTitan OS", "developer Linux distribution", "context-aware Linux", "adaptive Linux operating system", "Arch Linux for developers"],
  },
  hardwareManager: {
    path: "/titan-hardware-manager",
    title: "Titan Hardware Manager — Adaptive Linux Resource Management",
    description: "Explore ArchTitan's context-aware Linux daemon for classifying developer workloads and managing CPU, memory, I/O and process state with cgroup v2.",
    keywords: ["Titan Hardware Manager", "adaptive Linux resource management", "developer workload management", "cgroup v2 Linux", "workload classification"],
  },
  titanShare: {
    path: "/titanshare",
    title: "TitanShare — Linux & Android Peer-to-Peer File Sharing",
    description: "TitanShare connects ArchTitan Linux and Android for local peer discovery, peer-to-peer file transfer, telemetry and secure device controls.",
    keywords: ["TitanShare", "Linux Android file transfer", "Android Linux file sharing", "peer-to-peer file transfer", "local-first device sharing"],
  },
  titanMirror: {
    path: "/titanmirror",
    title: "TitanMirror — Android Screen Mirroring for Linux",
    description: "TitanMirror streams Android displays directly to Linux using MediaProjection, H.264, libavcodec, SDL2 and a native low-latency rendering pipeline.",
    keywords: ["TitanMirror", "Android screen mirroring Linux", "mirror Android to Linux", "Android screen streaming Linux", "H.264 Android streaming"],
  },
  gpuSwitcher: {
    path: "/auto-gpu-switcher",
    title: "Auto GPU Switcher — Adaptive Graphics for ArchTitan OS",
    description: "Explore ArchTitan OS workload-aware hybrid GPU routing with DRM/KMS detection, integrated graphics efficiency and automatic PRIME offload.",
    keywords: ["Linux hybrid GPU switching", "DRM KMS GPU detection", "PRIME offload Linux", "adaptive Linux graphics"],
  },
  neonMonitor: {
    path: "/neon-monitor",
    title: "Neon Monitor — Native Linux Hardware Monitoring",
    description: "Neon Monitor provides lightweight CPU, memory, thermal and process telemetry for ArchTitan OS using native Linux procfs and sysfs interfaces.",
    keywords: ["Linux hardware monitor", "native Linux telemetry", "procfs monitoring", "sysfs thermal monitoring", "ArchTitan OS"],
  },
  developerBase: {
    path: "/developer-first-base",
    title: "Developer-First Arch Linux Base — ArchTitan OS",
    description: "Explore the minimal Arch Linux, Hyprland, Wayland and BTRFS foundation that powers the ArchTitan OS developer-focused environment.",
    keywords: ["Arch Linux for developers", "Hyprland developer Linux", "developer-focused Linux", "BTRFS Linux distribution"],
  },
} satisfies Record<string, PageSeo>;

export function createPageMetadata(page: PageSeo): Metadata {
  const canonical = new URL(page.path, siteConfig.url).toString();
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      url: canonical,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.name} — context-aware Linux for developers` }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [{ url: siteConfig.ogImage, alt: `${siteConfig.name} — context-aware Linux for developers` }],
    },
  };
}

export function canonicalUrl(path: PageSeo["path"]) {
  return new URL(path, siteConfig.url).toString();
}
