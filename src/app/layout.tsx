import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"ArchTitan OS — Context-Aware Developer Linux",description:"A final-year research project exploring workspace-topology-aware resource orchestration and an integrated Linux–Android developer ecosystem."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500&display=swap" rel="stylesheet"/></head><body>{children}</body></html>}
