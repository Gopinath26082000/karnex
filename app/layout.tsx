import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import { Footer, Header } from "@/components/Shell";
import { MotionOrchestrator } from "@/components/MotionOrchestrator";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { publicPath } from "@/lib/publicPath";

export const metadata:Metadata={
  title:{default:"Kaarnex — Where Vehicles Meet Intelligence",template:"%s — Kaarnex"},
  description:"Real-time fleet intelligence and software-defined vehicle engineering from India, built for the world.",
  icons:{
    icon: publicPath("/favicon.ico"),
  },
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><SmoothScrollProvider><a className="skip-link" href="#main">Skip to content</a><MotionOrchestrator/><Header/>{children}<Footer/></SmoothScrollProvider></body></html>}
