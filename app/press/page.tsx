import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import {
  FeaturedEditorialCard,
  FeaturedVideoCard,
  PressCoverageCard,
  PressStats,
  RecognitionBlock,
  MediaContactCTA,
} from "@/components/press/PressSections";
import {
  additionalPress,
  editorialStory,
  featuredPress,
  HISTORIC_ACHIEVEMENT,
} from "@/data/press";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, pressPageJsonLd } from "@/lib/structured-data";

const pressMetadata = buildPageMetadata({
  title: "Press & Media | Shan-e-Ali",
  description:
    "Verified media coverage of Shan-e-Ali's historic 33-day, 16,000-kilometre solo motorcycle loop across the United States.",
  path: "/press",
  keywords: [
    "Shan-e-Ali press",
    "belikeshan media coverage",
    "Pakistani motorcycle USA loop press",
    "Business Recorder Shan-e-Ali",
    "HUM News motorcycle expedition",
    "solo USA motorcycle loop Pakistani",
  ],
  image: "/media/press/press-05.jpg",
});

export const metadata: Metadata = {
  ...pressMetadata,
  openGraph: {
    ...pressMetadata.openGraph,
    title: "Shan-e-Ali | Press & Media",
    description:
      "Verified editorial features and media coverage documenting the first and only Pakistani passport holder to complete a solo motorcycle loop across the United States.",
  },
};

export default function PressPage() {
  const businessRecorder = featuredPress.find((item) => item.id === "business-recorder");
  const humNews = featuredPress.find((item) => item.id === "hum-news");

  return (
    <>
      <JsonLd
        data={[breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Press & Media", path: "/press" },
        ]), pressPageJsonLd()]}
      />
      <Navigation />
      <main className="pt-nav">
        <header className="section-padding bg-primary border-b border-white/5">
          <div className="container-wide">
            <span className="label-text">Press & Media</span>
            <h1 className="heading-lg mt-6 max-w-4xl">A journey that became a national story.</h1>
            <div className="mt-8 max-w-3xl space-y-4 body-lg">
              <p>
                In 2026 Shan-e-Ali completed a 33-day, 16,000-kilometre solo motorcycle loop across
                the United States on a Suzuki DR650.
              </p>
              <p>
                Travelling on a Pakistani passport while carrying Pakistan&apos;s flag throughout the
                expedition, he became the {HISTORIC_ACHIEVEMENT.toLowerCase()}
              </p>
              <p>
                The expedition inspired widespread media coverage documenting the journey, its
                challenges and the stories discovered along the road.
              </p>
            </div>
            <div className="mt-12 md:mt-16">
              <PressStats />
            </div>
          </div>
        </header>

        <section className="section-padding bg-secondary border-b border-white/5" aria-labelledby="verified-press-heading">
          <div className="container-wide">
            <h2 id="verified-press-heading" className="heading-md mb-10 md:mb-14">
              Verified Press Coverage
            </h2>

            <div className="space-y-10 md:space-y-14 mb-16 md:mb-20">
              {businessRecorder && <FeaturedEditorialCard item={businessRecorder} />}
              {humNews && <FeaturedVideoCard item={humNews} />}
            </div>

            {additionalPress.length > 0 && (
              <div>
                <h3 className="label-text text-sand mb-8">Additional Coverage</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {additionalPress.map((item) => (
                    <PressCoverageCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="section-padding bg-primary border-b border-white/5">
          <div className="container-wide max-w-3xl">
            <h2 className="heading-md">{editorialStory.heading}</h2>
            <div className="mt-8 space-y-6">
              {editorialStory.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="body-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-secondary border-b border-white/5">
          <div className="container-wide">
            <RecognitionBlock />
          </div>
        </section>

        <section className="section-padding bg-primary">
          <div className="container-wide">
            <MediaContactCTA />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
