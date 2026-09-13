import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "ArchTitan OS",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070b12",
    theme_color: "#070b12",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
