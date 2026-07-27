import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import CoverImage from "@/components/ui/CoverImage";
import { getExpeditions } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Motorcycle Expeditions — USA Loop, Lahore to Gwadar & More",
  description:
    "Explore Shan-e-Ali's solo motorcycle expeditions: the 10,000-mile USA Loop across 25 U.S. states on a Suzuki DR650, the 5,000-km Lahore to Gwadar ride across Pakistan's Makran coast, and upcoming adventures from belikeshan.",
  path: "/expeditions",
  keywords: [
    "motorcycle expeditions",
    "USA Loop motorcycle",
    "Lahore to Gwadar ride",
    "Pakistani adventure rider expeditions",
    "solo motorcycle journey USA",
    "Makran Coastal Highway motorcycle",
    "Suzuki DR650 expedition",
    "belikeshan journeys",
  ],
});

export default function ExpeditionsIndexPage() {
  const expeditions = getExpeditions();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Expeditions", path: "/expeditions" },
        ])}
      />
      <Navigation />
      <main className="pt-nav pb-16 md:pb-24">
        <div className="container-wide">
          <span className="label-text">Expeditions</span>
          <h1 className="heading-lg mt-6 max-w-3xl">
            Solo motorcycle journeys across Pakistan, America & beyond.
          </h1>
          <p className="body-lg mt-4 max-w-2xl">
            From the Makran Coastal Highway to a 25-state USA Loop — documented rides, films and
            galleries from belikeshan.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
            {expeditions.map((exp) => (
              <article key={exp.slug} className="group border border-white/10 hover:border-white/25 transition-colors">
                <Link href={`/expeditions/${exp.slug}`} className="block">
                  <div className="thumb-frame aspect-[16/10]">
                    <CoverImage
                      src={exp.coverImage}
                      alt={`${exp.title} — ${exp.subtitle}`}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 overlay-image-bottom" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-xl font-medium text-white">{exp.title}</h2>
                      <p className="text-sm text-white/70 mt-1">{exp.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-white/65 line-clamp-3">{exp.description}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
