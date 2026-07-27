import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import AchievementStrip from "@/components/sections/AchievementStrip";
import WhoIAm from "@/components/sections/WhoIAm";
import Journeys from "@/components/sections/Journeys";
import PastExpeditions from "@/components/sections/PastExpeditions";
import FeaturedExpedition from "@/components/sections/FeaturedExpedition";
import PhotoGallery from "@/components/sections/PhotoGallery";
import Filmmaking from "@/components/sections/Filmmaking";
import RecentSocial from "@/components/sections/RecentSocial";
import MediaCoverage from "@/components/sections/MediaCoverage";
import SupportSection from "@/components/sections/SupportSection";
import GearSection from "@/components/sections/GearSection";
import LiveMap from "@/components/sections/LiveMap";
import Testimonials from "@/components/sections/Testimonials";
import Journal from "@/components/sections/Journal";
import Contact from "@/components/sections/Contact";
import { getExpeditions, getFeaturedExpedition, getBlogPosts, getPastExpeditions, getRecentExpeditions } from "@/lib/content";
import { getRecentSocialVideos } from "@/lib/social-feed";
import { buildPageMetadata } from "@/lib/seo";
import { homePageJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Shan-e-Ali | Pakistani Adventure Rider, Filmmaker & Storyteller",
  description:
    "belikeshan by Shan-e-Ali — Pakistani adventure rider documenting solo motorcycle expeditions: 10,000-mile USA Loop across 25 states, Lahore to Gwadar across Pakistan, films, photography & travel stories.",
  path: "/",
  keywords: [
    "Shan-e-Ali adventure rider",
    "belikeshan",
    "Pakistani motorcycle traveler",
    "USA Loop solo ride",
    "Lahore to Gwadar motorcycle",
    "Pakistani passport USA motorcycle",
    "adventure travel filmmaker Pakistan",
    "Suzuki DR650 expedition",
    "motorcycle travel blog",
    "solo adventure rider",
  ],
});

export default async function HomePage() {
  const recentExpeditions = getRecentExpeditions();
  const pastExpeditions = getPastExpeditions();
  const featured = getFeaturedExpedition();
  const posts = getBlogPosts();
  const socialVideos = await getRecentSocialVideos();

  return (
    <>
      <JsonLd data={homePageJsonLd()} />
      <Navigation />
      <main>
        <Hero />
        <AchievementStrip />
        <WhoIAm />
        <Journeys expeditions={recentExpeditions} />
        <PastExpeditions expeditions={pastExpeditions} />
        {featured && <FeaturedExpedition expedition={featured} />}
        <PhotoGallery />
        <Filmmaking />
        <RecentSocial youtube={socialVideos.youtube} instagram={socialVideos.instagram} />
        <MediaCoverage />
        <SupportSection />
        <GearSection />
        <LiveMap />
        <Testimonials />
        <Journal posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
