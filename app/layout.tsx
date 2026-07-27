import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageLoader from "@/components/ui/PageLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Belikeshan — Adventure Rider, Filmmaker & Storyteller",
    template: "%s | Belikeshan",
  },
  description:
    "Adventure motorcyclist, travel documentary filmmaker, and photographer. Solo motorcycle expeditions from Pakistan to the world. Explore beyond maps.",
  keywords: [
    "Adventure Rider",
    "Motorcycle Expeditions",
    "Travel Documentary",
    "Adventure Photography",
    "Travel Filmmaker",
    "Motorcycle Travel",
    "Overland Adventure",
    "Pakistan Adventure Rider",
    "Solo Motorcycle Expedition",
  ],
  openGraph: {
    title: "Belikeshan — Explore Beyond Maps",
    description:
      "Adventure motorcyclist, filmmaker, and storyteller. Documentary expeditions from Pakistan to the world.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <PageLoader />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
