import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArchTitan OS — An Operating System That Knows What You're Running",
  description:
    "ArchTitan OS reallocates resources by workload type and workspace activity, not just process lists. Titan Hardware Manager, automatic GPU switching, kernel-native sandboxing and native Linux–Android interoperability — built into the OS, not bolted on.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen overflow-x-hidden"
        style={{
          background: "#02040D",
          color: "#F7F9FF",
          fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
        }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
