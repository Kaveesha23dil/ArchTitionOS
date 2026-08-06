import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Final Year Project | Next.js + Tailwind CSS + GSAP",
  description: "Advanced Web Platform built with Next.js App Router, Tailwind CSS, and GSAP animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


