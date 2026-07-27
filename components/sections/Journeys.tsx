"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Route } from "lucide-react";
import type { Expedition } from "@/lib/types";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import UsaLoopMap from "@/components/ui/UsaLoopMap";

interface JourneysProps {
  expeditions: Expedition[];
}

const statusStyles = {
  completed: "text-white/70 bg-white/10 border-white/20",
  ongoing: "text-white bg-white/15 border-white/30",
  upcoming: "text-white bg-white/10 border-white/25",
} as const;

export default function Journeys({ expeditions }: JourneysProps) {
  const recent =
    expeditions.find((e) => e.status === "completed") ?? expeditions[0] ?? null;

  const [preview, setPreview] = useState<Expedition | null>(recent);
  const [modalExpedition, setModalExpedition] = useState<Expedition | null>(null);

  useEffect(() => {
    if (!modalExpedition) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalExpedition]);

  const showMap = preview?.status === "completed" && preview.slug === "usa-loop";

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
          <span className="label-text">02 — Expeditions</span>
          <h2 className="heading-lg mt-6">Journeys on two wheels.</h2>
          <p className="body-lg mt-6 max-w-2xl">
            belikeshan is built on many roads — years across Pakistan, a recent loop across America, and the next adventure already in process.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3 relative aspect-[16/10] overflow-hidden">
            <Image
              src={preview?.coverImage ?? "/media/gallery/gallery-08.jpg"}
              alt={preview?.title ?? "Expedition preview"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 overlay-image-bottom" />
            {showMap && (
              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
                <UsaLoopMap className="w-full h-full max-h-[85%] drop-shadow-[0_0_40px_rgba(0,0,0,0.5)]" />
              </div>
            )}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex gap-2 mb-2">
                {preview?.countryFlags.map((flag) => (
                  <span key={flag} className="text-2xl">{flag}</span>
                ))}
              </div>
              <h3 className="text-xl font-medium text-white">{preview?.title}</h3>
              <p className="text-sm text-white/70">{preview?.subtitle}</p>
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
                onClick={() => {
                  setPreview(exp);
                  setModalExpedition(exp);
                }}
              >
                <div
                  className={cn(
                    "flex gap-4 p-4 border transition-all duration-500",
                    preview?.slug === exp.slug
                      ? "border-white/30 bg-white/[0.04]"
                      : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
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
                    <span
                      className={cn(
                        "text-[10px] uppercase tracking-wider px-2 py-0.5 border",
                        statusStyles[exp.status]
                      )}
                    >
                      {exp.status === "upcoming" ? "In Process" : exp.status}
                    </span>
                    <h3 className="text-lg font-medium text-white mt-2">{exp.title}</h3>
                    <p className="text-sm text-white/65">
                      {exp.status === "upcoming"
                        ? "Planning underway"
                        : exp.stats.find((s) => s.label === "U.S. States")
                          ? `${exp.days} days · ${exp.stats.find((s) => s.label === "U.S. States")?.value} states`
                          : `${exp.days} days · ${exp.stats.find((s) => s.label === "Distance")?.value ?? `${exp.distance} km`}`}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}

            <Link
              href="/expeditions/usa-loop"
              data-cursor
              className="block w-full text-center py-4 border border-white/25 text-sm uppercase tracking-wider text-white hover:bg-white hover:text-primary transition-all"
            >
              View All Expeditions
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalExpedition && (
          <motion.div
            className="fixed inset-0 z-[8000] flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-primary/90 backdrop-blur-sm"
              onClick={() => setModalExpedition(null)}
            />
            <motion.div
              className="relative w-full md:max-w-4xl max-h-[90vh] flex flex-col bg-secondary m-0 md:m-6 overflow-hidden"
              data-lenis-prevent
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-cursor
                onClick={() => setModalExpedition(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="relative aspect-[21/9] flex-shrink-0">
                <Image
                  src={modalExpedition.coverImage}
                  alt={modalExpedition.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 overlay-image-bottom" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="heading-md text-white">{modalExpedition.title}</h2>
                  <p className="text-white/70 mt-1">{modalExpedition.subtitle}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-10 min-h-0">
                <p className="body-lg mb-8">{modalExpedition.description}</p>

                {modalExpedition.stats.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    {modalExpedition.stats.map((stat) => (
                      <div key={stat.label} className="p-4 border border-white/10">
                        <p className="text-xl font-medium text-white">{stat.value}</p>
                        <p className="text-xs text-white/55 uppercase tracking-wider mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {modalExpedition.status === "upcoming" && modalExpedition.timeline.length > 0 && (
                  <div className="space-y-4 mb-10">
                    <p className="label-text">Planning Phases</p>
                    {modalExpedition.timeline.map((item) => (
                      <div key={item.date} className="p-4 border border-white/10">
                        <span className="text-xs text-white/55 uppercase tracking-wider">
                          {item.date}
                        </span>
                        <h4 className="text-base font-medium text-white mt-1">{item.title}</h4>
                        <p className="text-sm text-white/65 mt-1">{item.description}</p>
                      </div>
                    ))}
                    <a
                      href={profile.social.email}
                      data-cursor
                      className="block p-4 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-xs uppercase tracking-wider text-white mb-1">
                        Sponsorship enquiries
                      </p>
                      <p className="text-sm text-white/65">
                        Contact for partnership & sponsorship details
                      </p>
                      <p className="text-sm text-white mt-2">{profile.email}</p>
                    </a>
                  </div>
                )}

                {modalExpedition.status !== "upcoming" && (
                  <div className="space-y-3 mb-10 text-sm text-white/65">
                    <div className="flex items-center gap-3">
                      <Route size={16} className="text-white/80" />
                      <span>{modalExpedition.route}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-white/80" />
                      <span>{modalExpedition.motorcycle}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-white/80" />
                      <span>{modalExpedition.startDate}</span>
                    </div>
                  </div>
                )}

                <Link
                  href={`/expeditions/${modalExpedition.slug}`}
                  data-cursor
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary text-xs uppercase tracking-[0.12em] font-medium hover:bg-white/90 transition-colors"
                >
                  {modalExpedition.status === "upcoming"
                    ? "Follow the Planning"
                    : "Full Journey Details"}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
