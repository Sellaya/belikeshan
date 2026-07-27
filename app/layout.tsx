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
    default: "Shan-e-Ali | Pakistani Adventure Rider & Filmmaker",
    template: "%s | Be Like Shan",
  },
  description:
    "Meet Shan-e-Ali, the Pakistani adventure rider behind Be Like Shan. Explore his 10,000-mile solo motorcycle loop across 25 U.S. states, films, photography and stories from the road.",
  keywords: [
    "Shan-e-Ali adventure rider",
    "Be Like Shan",
    "Pakistani adventure motorcyclist",
    "USA motorcycle loop",
    "solo motorcycle expedition USA",
    "Pakistani passport motorcycle journey",
    "Suzuki DR650 adventure rider",
    "motorcycle travel filmmaker",
    "Toronto adventure rider",
  ],
  openGraph: {
    title: "Shan-e-Ali — Explore Beyond Maps",
    description:
      "Pakistani adventure rider, filmmaker and storyteller. 33 days, 10,000 miles, 25 U.S. states on a Suzuki DR650.",
    type: "website",
    locale: "en_US",
    images: ["/media/press/usa-loop-trailer.jpg"],
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
