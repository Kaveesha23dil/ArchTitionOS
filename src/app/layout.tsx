import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { createPageMetadata, pageSeo, siteConfig } from "@/lib/site";
import { organizationSchema, softwareSchema, websiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata(pageSeo.home),
  applicationName: "ArchTitan OS",
  category: "technology",
  creator: "ArchTitan OS research project",
  publisher: "ArchTitan OS",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-icon" },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#070b12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={{ "@context": "https://schema.org", "@graph": [organizationSchema, websiteSchema, softwareSchema] }} />
        {children}
      </body>
    </html>
  );
}
