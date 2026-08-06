import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vectorium Labs — Build Intelligent Systems That Work in the Real World",
  description:
    "Vectorium Labs designs and delivers AI, software and data systems that improve workflows, strengthen decisions and scale with real business operations.",
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
