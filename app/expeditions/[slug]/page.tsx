import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play, MapPin, Calendar, Route } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import MDXContent from "@/components/mdx/MDXContent";
import { getExpedition, getExpeditionSlugs } from "@/lib/content";
import { formatNumber } from "@/lib/utils";

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

  return {
    title: expedition.seo.title,
    description: expedition.seo.description,
    keywords: expedition.seo.keywords,
  };
}

export default async function ExpeditionPage({ params }: Props) {
  const { slug } = await params;
  const expedition = getExpedition(slug);
  if (!expedition) notFound();

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <div className="relative h-[60vh] md:h-[70vh]">
          <Image
            src={expedition.coverImage}
            alt={expedition.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-wide pb-12">
            <Link
              href="/#journeys"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-sand transition-colors mb-6"
            >
              <ArrowLeft size={16} /> All Journeys
            </Link>
            <div className="flex gap-2 mb-4">
              {expedition.countryFlags.map((flag) => (
                <span key={flag} className="text-3xl">{flag}</span>
              ))}
            </div>
            <h1 className="heading-lg">{expedition.title}</h1>
            <p className="text-xl text-muted mt-2">{expedition.subtitle}</p>
          </div>
        </div>

        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {expedition.stats.map((stat) => (
              <div key={stat.label} className="p-6 border border-white/5 text-center">
                <p className="text-3xl font-light text-sand">{stat.value}</p>
                <p className="label-text mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <MDXContent content={expedition.content} />
            </div>
            <aside className="space-y-8">
              <div className="p-6 border border-white/5">
                <h3 className="label-text mb-4">Journey Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Route size={16} className="text-sand mt-0.5" />
                    <span className="text-muted">{expedition.route}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-sand" />
                    <span className="text-muted">{expedition.motorcycle}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-sand" />
                    <span className="text-muted">
                      {expedition.startDate}
                      {expedition.endDate ? ` — ${expedition.endDate}` : ""}
                    </span>
                  </div>
                </div>
              </div>

              {expedition.videos.length > 0 && (
                <div>
                  <h3 className="label-text mb-4">Documentary</h3>
                  {expedition.videos.map((video) => (
                    <a
                      key={video.title}
                      href={`https://youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 border border-white/5 hover:border-sand/30 transition-colors"
                    >
                      <Play size={16} className="text-sand" />
                      <span className="text-sm">{video.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </aside>
          </div>

          {expedition.gallery.length > 0 && (
            <div className="mt-24">
              <h2 className="heading-md mb-8">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {expedition.gallery.map((img) => (
                  <div key={img} className="relative aspect-[4/3] overflow-hidden">
                    <Image src={img} alt="" fill className="object-cover" sizes="33vw" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {expedition.timeline.length > 0 && (
            <div className="mt-24">
              <h2 className="heading-md mb-8">Timeline</h2>
              <div className="relative pl-8 border-l border-sand/20">
                {expedition.timeline.map((item) => (
                  <div key={item.date} className="relative pb-10 last:pb-0">
                    <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border border-sand bg-primary" />
                    <span className="text-xs text-muted">{item.date}</span>
                    <h4 className="text-lg font-light text-off-white mt-1">{item.title}</h4>
                    <p className="text-sm text-muted mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
