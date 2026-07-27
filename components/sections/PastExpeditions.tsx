"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Route } from "lucide-react";
import type { Expedition } from "@/lib/types";
import { gwadarFeaturedGallery } from "@/data/gwadar-featured";
import { cn } from "@/lib/utils";

interface PastExpeditionsProps {
  expeditions: Expedition[];
}

export default function PastExpeditions({ expeditions }: PastExpeditionsProps) {
  if (expeditions.length === 0) return null;

  return (
    <section id="past-journeys" className="section-padding bg-secondary border-t border-white/5">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <span className="label-text">Past Expeditions</span>
          <h2 className="heading-lg mt-6">Roads that came before.</h2>
          <p className="body-lg mt-4 max-w-2xl">
            Before the USA Loop and the next adventure — years of riding across Pakistan built the foundation for everything that followed.
          </p>
        </motion.div>

        {expeditions.map((expedition) => (
          <div key={expedition.slug} className="space-y-10 md:space-y-14">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] overflow-hidden border border-white/10"
              >
                <Image
                  src={expedition.coverImage}
                  alt={expedition.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 overlay-image-bottom" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="label-on-image">🇵🇰 Pakistan · {expedition.startDate.slice(0, 4)}</span>
                  <h3 className="text-2xl md:text-3xl font-medium text-white mt-2">{expedition.title}</h3>
                  <p className="text-white/75 mt-1">{expedition.subtitle}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="body-lg">{expedition.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  {expedition.stats.slice(0, 4).map((stat) => (
                    <div key={stat.label} className="p-4 border border-white/10 bg-primary/40">
                      <p className="text-lg font-medium text-white">{stat.value}</p>
                      <p className="label-text mt-1 text-[9px]">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm text-white/65">
                  <div className="flex items-start gap-3">
                    <Route size={16} className="text-sand shrink-0 mt-0.5" />
                    <span>{expedition.route}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-sand shrink-0" />
                    <span>
                      {expedition.startDate}
                      {expedition.endDate ? ` — ${expedition.endDate}` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-sand shrink-0" />
                    <span>{expedition.motorcycle}</span>
                  </div>
                </div>

                <Link
                  href={`/expeditions/${expedition.slug}`}
                  data-cursor
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary text-xs uppercase tracking-[0.12em] font-medium hover:bg-white/90 transition-all"
                >
                  Full Journey Details
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            {expedition.slug === "lahore-to-gwadar" && (
              <div>
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="label-text">Journey Gallery</span>
                    <p className="text-sm text-white/55 mt-2">
                      Makran Coastal Highway, Karachi, Gwadar, Jiwni — {expedition.gallery.length} moments from the road.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {gwadarFeaturedGallery.map((item, i) => (
                    <motion.div
                      key={item.src}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className={cn(
                        "relative overflow-hidden border border-white/8 group",
                        item.aspect === "tall" ? "row-span-2 aspect-[3/4]" : "aspect-[4/3]",
                        i === 0 && "md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[320px]"
                      )}
                    >
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                      <p className="absolute bottom-0 left-0 right-0 p-3 text-xs text-white/90 font-medium">
                        {item.caption}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Link
                    href={`/expeditions/${expedition.slug}#gallery`}
                    data-cursor
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-white/65 hover:text-white transition-colors"
                  >
                    View all {expedition.gallery.length} photos
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
