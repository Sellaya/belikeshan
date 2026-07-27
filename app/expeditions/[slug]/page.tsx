import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play, MapPin, Calendar, Route } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import MarkdownContent from "@/components/content/MarkdownContent";
import { getExpedition, getExpeditionSlugs } from "@/lib/content";
import { profile } from "@/data/profile";
import { videoWatchUrl } from "@/data/social-videos";
import CoverImage from "@/components/ui/CoverImage";
import ExpeditionGallerySection from "@/components/content/ExpeditionGallerySection";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, expeditionJsonLd } from "@/lib/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getExpeditionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const expedition = getExpedition(slug);
  if (!expedition) return { title: "Expedition Not Found" };

  return buildPageMetadata({
    title: expedition.seo.title,
    description: expedition.seo.description,
    path: `/expeditions/${slug}`,
    keywords: expedition.seo.keywords,
    image: expedition.coverImage,
  });
}

export default async function ExpeditionPage({ params }: Props) {
  const { slug } = await params;
  const expedition = getExpedition(slug);
  if (!expedition) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Expeditions", path: "/expeditions" },
            { name: expedition.title, path: `/expeditions/${slug}` },
          ]),
          expeditionJsonLd(expedition),
        ]}
      />
      <Navigation />
      <main className="pt-nav">
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] thumb-frame">
          <CoverImage
            src={expedition.coverImage}
            alt={expedition.title}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 overlay-image-bottom" />
          <div className="absolute bottom-0 left-0 right-0 container-wide pb-6 sm:pb-12 text-white">
            <Link
              href="/#journeys"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-4 sm:mb-6"
            >
              <ArrowLeft size={16} /> All Journeys
            </Link>
            <div className="flex gap-2 mb-3 sm:mb-4">
              {expedition.countryFlags.map((flag) => (
                <span key={flag} className="text-2xl sm:text-3xl">{flag}</span>
              ))}
            </div>
            <h1 className="heading-lg text-white">{expedition.title}</h1>
            <p className="text-base sm:text-xl text-white/75 mt-2">{expedition.subtitle}</p>
          </div>
        </div>

        <div className="container-wide py-12 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
            {expedition.stats.map((stat) => (
              <div key={stat.label} className="p-4 md:p-6 border border-white/5 text-center">
                <p className="text-xl sm:text-3xl font-light text-white">{stat.value}</p>
                <p className="label-text mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <MarkdownContent content={expedition.content} />
            </div>
            <aside className="space-y-8">
              <div className="p-6 border border-white/5">
                <h3 className="label-text mb-4">Journey Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Route size={16} className="text-white mt-0.5" />
                    <span className="text-muted">{expedition.route}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-white" />
                    <span className="text-muted">{expedition.motorcycle}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-white" />
                    <span className="text-muted">
                      {expedition.startDate}
                      {expedition.endDate ? ` — ${expedition.endDate}` : ""}
                    </span>
                  </div>
                </div>
              </div>

              {expedition.status === "upcoming" && expedition.timeline.length > 0 && (
                <div className="p-6 border border-white/10">
                  <h3 className="label-text mb-4">Planning Phases</h3>
                  <div className="space-y-4">
                    {expedition.timeline.map((item) => (
                      <div key={item.date}>
                        <span className="text-xs text-white/55 uppercase tracking-wider">
                          {item.date}
                        </span>
                        <h4 className="text-sm font-medium text-white mt-1">{item.title}</h4>
                        <p className="text-sm text-white/65 mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {expedition.status === "upcoming" && (
                <a
                  href={profile.social.email}
                  className="block p-6 border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <h3 className="label-text mb-3">Sponsorship Enquiries</h3>
                  <p className="text-sm text-white/65 mb-3">
                    Interested in sponsoring the upcoming expedition? Contact for full partnership details.
                  </p>
                  <span className="text-sm text-white">{profile.email}</span>
                </a>
              )}

              {expedition.videos.length > 0 && (
                <div>
                  <h3 className="label-text mb-4">Documentary</h3>
                  {expedition.videos.map((video) => (
                    <a
                      key={video.title}
                      href={videoWatchUrl(video)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 border border-white/5 hover:border-white/30 transition-colors"
                    >
                      <Play size={16} className="text-white" />
                      <span className="text-sm">{video.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </aside>
          </div>

          {expedition.gallery.length > 0 && (
            <ExpeditionGallerySection images={expedition.gallery} />
          )}

          {expedition.timeline.length > 0 && expedition.status !== "upcoming" && (
            <div className="mt-24">
              {expedition.timeline.some((item) => item.date) ? (
                <>
                  <h2 className="heading-md mb-8">Timeline</h2>
                  <div className="relative pl-8 border-l border-white/20">
                    {expedition.timeline.map((item) => (
                      <div key={item.title} className="relative pb-10 last:pb-0">
                        <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border border-white/40 bg-primary" />
                        {item.date && <span className="text-xs text-muted">{item.date}</span>}
                        <h4 className="text-lg font-light text-off-white mt-1">{item.title}</h4>
                        <p className="text-sm text-muted mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="heading-md mb-8">Along the Route</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expedition.timeline.map((item, i) => (
                      <div
                        key={item.title}
                        className="p-6 border border-white/10 bg-secondary/40 hover:border-white/20 transition-colors"
                      >
                        <span className="text-[10px] uppercase tracking-[0.2em] text-sand">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-lg font-light text-off-white mt-3">{item.title}</h4>
                        <p className="text-sm text-muted mt-2 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
