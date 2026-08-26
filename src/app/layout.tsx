import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "ArchTitan OS — Context-Aware Developer Linux",
  description:
    "A final-year research project exploring workspace-topology-aware resource orchestration and an integrated Linux–Android developer ecosystem.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={onest.variable}>
      <body>{children}</body>
    </html>
  );
}
