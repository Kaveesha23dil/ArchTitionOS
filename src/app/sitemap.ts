import type { MetadataRoute } from "next";
import { canonicalUrl, pageSeo } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pageSeo).map((page) => ({
    url: canonicalUrl(page.path),
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.8,
  }));
}
