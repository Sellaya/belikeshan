"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Route } from "lucide-react";
import type { Expedition } from "@/lib/types";
import { cn } from "@/lib/utils";

interface JourneysProps {
  expeditions: Expedition[];
}

export default function Journeys({ expeditions }: JourneysProps) {
  const [selected, setSelected] = useState<Expedition | null>(
    expeditions.find((e) => e.featured) ?? expeditions[0] ?? null
  );

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
          <span className="label-text">02 — The Journey</span>
          <h2 className="heading-lg mt-6">USA Loop Expedition</h2>
          <p className="body-lg mt-6 max-w-2xl">
            33 days. 25 states. 10,000 miles. One Suzuki DR650, one Pakistani passport, and one flag carried across America.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3 relative aspect-[16/10] overflow-hidden">
            <Image
              src="/media/press/usa-loop-trailer.jpg"
              alt="USA Loop route"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 60" className="w-full h-full opacity-30 p-8">
                <path
                  d="M10,25 Q25,15 40,22 T70,20 Q85,18 92,28 Q88,38 70,42 T40,40 Q25,38 10,32 Z"
                  fill="none"
                  stroke="#b8a99a"
                  strokeWidth="0.4"
                  strokeDasharray="1,1"
                />
                <circle cx="15" cy="28" r="1.5" fill="#b8a99a" />
                <circle cx="50" cy="22" r="1.5" fill="#b8a99a" />
                <circle cx="75" cy="35" r="1.5" fill="#b8a99a" />
                <circle cx="88" cy="26" r="1.5" fill="#a67b6a" />
              </svg>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex gap-2 mb-2">
                {selected?.countryFlags.map((flag) => (
                  <span key={flag} className="text-2xl">{flag}</span>
                ))}
              </div>
              <h3 className="text-xl font-light">{selected?.title}</h3>
              <p className="text-sm text-muted">{selected?.subtitle}</p>
            </div>
          </div>

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
                <div
                  className={cn(
                    "flex gap-4 p-4 border transition-all duration-500",
                    selected?.slug === exp.slug
                      ? "border-sand/40 bg-white/[0.03]"
                      : "border-white/5 hover:border-sand/20 hover:bg-white/[0.02]"
                  )}
                >
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={exp.coverImage}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-forest-light bg-forest/30 px-2 py-0.5">
                      {exp.status}
                    </span>
                    <h3 className="text-lg font-light text-off-white mt-2">{exp.title}</h3>
                    <p className="text-sm text-muted">{exp.days} days · {exp.stats.find(s => s.label === "U.S. States")?.value ?? "25"} states</p>
                  </div>
                </div>
              </motion.button>
            ))}

            <Link
              href="/expeditions/usa-loop"
              data-cursor
              className="block w-full text-center py-4 border border-sand/30 text-sm uppercase tracking-wider text-sand hover:bg-sand hover:text-primary transition-all"
            >
              Full Expedition Details
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[8000] flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              className="relative w-full md:max-w-4xl max-h-[90vh] overflow-y-auto bg-secondary m-0 md:m-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <button
                data-cursor
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 p-2 hover:text-sand transition-colors"
              >
                <X size={24} />
              </button>

              <div className="relative aspect-[21/9]">
                <Image src={selected.coverImage} alt={selected.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="heading-md">{selected.title}</h2>
                  <p className="text-muted mt-1">{selected.subtitle}</p>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <p className="body-lg mb-8">{selected.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  {selected.stats.map((stat) => (
                    <div key={stat.label} className="p-4 border border-white/5">
                      <p className="text-xl font-light text-sand">{stat.value}</p>
                      <p className="text-xs text-muted uppercase tracking-wider mt-1">{stat.label}</p>
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
                    <span>{selected.startDate}</span>
                  </div>
                </div>

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
