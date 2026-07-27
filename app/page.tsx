import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
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

export const revalidate = 3600;

export default async function HomePage() {
  const recentExpeditions = getRecentExpeditions();
  const pastExpeditions = getPastExpeditions();
  const featured = getFeaturedExpedition();
  const posts = getBlogPosts();
  const socialVideos = await getRecentSocialVideos();

  return (
    <>
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
