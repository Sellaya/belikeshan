import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhoIAm from "@/components/sections/WhoIAm";
import Journeys from "@/components/sections/Journeys";
import FeaturedExpedition from "@/components/sections/FeaturedExpedition";
import PhotoGallery from "@/components/sections/PhotoGallery";
import Filmmaking from "@/components/sections/Filmmaking";
import MediaCoverage from "@/components/sections/MediaCoverage";
import Partners from "@/components/sections/Partners";
import GearSection from "@/components/sections/GearSection";
import LiveMap from "@/components/sections/LiveMap";
import Testimonials from "@/components/sections/Testimonials";
import Journal from "@/components/sections/Journal";
import Contact from "@/components/sections/Contact";
import { getExpeditions, getFeaturedExpedition, getBlogPosts } from "@/lib/content";

export default function HomePage() {
  const expeditions = getExpeditions();
  const featured = getFeaturedExpedition();
  const posts = getBlogPosts();

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WhoIAm />
        <Journeys expeditions={expeditions} />
        {featured && <FeaturedExpedition expedition={featured} />}
        <PhotoGallery />
        <Filmmaking />
        <MediaCoverage />
        <Partners />
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
