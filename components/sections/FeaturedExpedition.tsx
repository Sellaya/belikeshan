"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Expedition } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface FeaturedExpeditionProps {
  expedition: Expedition;
}

export default function FeaturedExpedition({ expedition }: FeaturedExpeditionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster={expedition.coverImage}
      >
        <source
          src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-primary/70" />

      <div className="relative z-10 container-wide w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-text">03 — Featured Expedition</span>
            <h2 className="heading-lg mt-6 mb-6">{expedition.title}</h2>
            <p className="body-lg mb-8">{expedition.description}</p>

            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <p className="text-3xl font-light text-sand">
                  {formatNumber(expedition.distance)}
                </p>
                <p className="label-text mt-1">Kilometers</p>
              </div>
              <div>
                <p className="text-3xl font-light text-sand">{expedition.days}</p>
                <p className="label-text mt-1">Days</p>
              </div>
              <div>
                <p className="text-3xl font-light text-sand">
                  {expedition.countries.length}
                </p>
                <p className="label-text mt-1">Countries</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/expeditions/${expedition.slug}`}
                data-cursor
                className="inline-flex items-center gap-3 px-8 py-4 bg-sand text-primary text-sm uppercase tracking-wider font-medium hover:bg-sand-light transition-all hover:-translate-y-0.5"
              >
                <Play size={16} fill="currentColor" />
                Watch Documentary
              </Link>
              <Link
                href={`/expeditions/${expedition.slug}`}
                data-cursor
                className="inline-flex items-center gap-3 px-8 py-4 border border-off-white/20 text-sm uppercase tracking-wider hover:border-sand hover:text-sand transition-all"
              >
                Explore Journey
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative pl-8 border-l border-sand/20">
              {expedition.timeline.map((item, i) => (
                <div key={item.date} className="relative pb-10 last:pb-0">
                  <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-sand" />
                  <span className="text-xs text-muted">{item.date}</span>
                  <h4 className="text-lg font-light text-off-white mt-1">{item.title}</h4>
                  <p className="text-sm text-muted mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
