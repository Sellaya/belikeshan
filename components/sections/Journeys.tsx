"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Route } from "lucide-react";
import type { Expedition } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";

const MAP_MARKERS = [
  { slug: "silk-road-revival", x: 62, y: 42, label: "Silk Road" },
  { slug: "himalayan-crossing", x: 68, y: 38, label: "Himalayas" },
  { slug: "central-asia-horizons", x: 64, y: 36, label: "Central Asia" },
  { slug: "africa-overland", x: 52, y: 58, label: "Africa" },
];

interface JourneysProps {
  expeditions: Expedition[];
}

export default function Journeys({ expeditions }: JourneysProps) {
  const [selected, setSelected] = useState<Expedition | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const openExpedition = (slug: string) => {
    const exp = expeditions.find((e) => e.slug === slug);
    if (exp) setSelected(exp);
  };

  return (
    <section id="journeys" className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="label-text">02 — The Journeys</span>
          <h2 className="heading-lg mt-6">Every mile, a story.</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Interactive Map */}
          <div className="lg:col-span-3 relative aspect-[16/10] bg-primary rounded-sm overflow-hidden">
            <svg viewBox="0 0 100 60" className="w-full h-full opacity-20">
              <ellipse cx="50" cy="30" rx="45" ry="25" fill="none" stroke="#b8a99a" strokeWidth="0.2" />
              <path
                d="M15,25 Q30,15 50,20 T85,28 Q75,40 50,45 T15,35 Z"
                fill="none"
                stroke="#b8a99a"
                strokeWidth="0.15"
                opacity="0.5"
              />
            </svg>

            {MAP_MARKERS.map((marker) => {
              const exp = expeditions.find((e) => e.slug === marker.slug);
              if (!exp) return null;
              return (
                <button
                  key={marker.slug}
                  data-cursor
                  className="absolute group"
                  style={{ left: `${marker.x}%`, top: `${marker.y}%`, transform: "translate(-50%, -50%)" }}
                  onMouseEnter={() => setActiveMarker(marker.slug)}
                  onMouseLeave={() => setActiveMarker(null)}
                  onClick={() => openExpedition(marker.slug)}
                >
                  <span
                    className={cn(
                      "block w-3 h-3 rounded-full border-2 transition-all duration-300",
                      activeMarker === marker.slug
                        ? "bg-sand border-sand scale-150"
                        : "bg-transparent border-sand/60"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[10px] uppercase tracking-wider transition-opacity",
                      activeMarker === marker.slug ? "opacity-100 text-sand" : "opacity-0"
                    )}
                  >
                    {marker.label}
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 label-text text-[10px]">
              Click a marker to explore
            </div>
          </div>

          {/* Journey List */}
          <div className="lg:col-span-2 space-y-4">
            {expeditions.map((exp, i) => (
              <motion.button
                key={exp.slug}
                data-cursor
                className="w-full text-left group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(exp)}
              >
                <div className="flex gap-4 p-4 border border-white/5 hover:border-sand/30 transition-all duration-500 hover:bg-white/[0.02]">
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={exp.coverImage}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-wider px-2 py-0.5",
                          exp.status === "completed" && "text-forest-light bg-forest/30",
                          exp.status === "upcoming" && "text-orange-light bg-orange/15",
                          exp.status === "ongoing" && "text-sand-light bg-sand/15"
                        )}
                      >
                        {exp.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-light text-off-white truncate">{exp.title}</h3>
                    <p className="text-sm text-muted truncate">{exp.subtitle}</p>
                    <p className="text-xs text-muted mt-1">
                      {formatNumber(exp.distance)} km · {exp.days} days
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[8000] flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-primary/90 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative w-full md:max-w-4xl max-h-[90vh] overflow-y-auto bg-secondary m-0 md:m-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
            >
              <button
                data-cursor
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 p-2 hover:text-sand transition-colors"
              >
                <X size={24} />
              </button>

              <div className="relative aspect-[21/9]">
                <Image
                  src={selected.coverImage}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-2 mb-3">
                    {selected.countryFlags.map((flag) => (
                      <span key={flag} className="text-2xl">{flag}</span>
                    ))}
                  </div>
                  <h2 className="heading-md">{selected.title}</h2>
                  <p className="text-muted mt-1">{selected.subtitle}</p>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <p className="body-lg mb-8">{selected.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {selected.stats.map((stat) => (
                    <div key={stat.label} className="p-4 border border-white/5">
                      <p className="text-2xl font-light text-sand">{stat.value}</p>
                      <p className="text-xs text-muted uppercase tracking-wider mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-10 text-sm text-muted">
                  <div className="flex items-center gap-3">
                    <Route size={16} className="text-sand" />
                    <span>{selected.route}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-sand" />
                    <span>{selected.motorcycle}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-sand" />
                    <span>
                      {selected.startDate}
                      {selected.endDate ? ` — ${selected.endDate}` : ""}
                    </span>
                  </div>
                </div>

                {selected.gallery.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-10">
                    {selected.gallery.slice(0, 6).map((img) => (
                      <div key={img} className="relative aspect-square overflow-hidden">
                        <Image src={img} alt="" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={`/expeditions/${selected.slug}`}
                  data-cursor
                  className="inline-flex items-center gap-2 px-8 py-4 bg-sand text-primary text-sm uppercase tracking-wider font-medium hover:bg-sand-light transition-colors"
                >
                  Full Journey Details
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
