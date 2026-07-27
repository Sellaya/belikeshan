import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Shan-e-Ali | Pakistani Adventure Rider & Filmmaker",
    template: "%s | belikeshan",
  },
  description:
    "Meet Shan-e-Ali, the Pakistani adventure rider behind belikeshan. Explore his 10,000-mile solo motorcycle loop across 25 U.S. states, films, photography and stories from the road.",
  keywords: [
    "Shan-e-Ali adventure rider",
    "belikeshan",
    "Pakistani adventure motorcyclist",
    "USA motorcycle loop",
    "solo motorcycle expedition USA",
    "Pakistani passport motorcycle journey",
    "Suzuki DR650 adventure rider",
    "motorcycle travel filmmaker",
    "Pakistani adventure rider",
  ],
  openGraph: {
    title: "Shan-e-Ali — Explore Beyond Maps",
    description:
      "Pakistani adventure rider, filmmaker and storyteller. 33 days, 10,000 miles, 25 U.S. states on a Suzuki DR650.",
    type: "website",
    locale: "en_US",
    images: ["/media/gallery/gallery-34.jpg"],
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
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
