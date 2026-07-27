"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Expedition } from "@/lib/types";
import { SOCIAL_VIDEOS } from "@/data/social-videos";
import CoverImage from "@/components/ui/CoverImage";

interface FeaturedExpeditionProps {
  expedition: Expedition;
}

export default function FeaturedExpedition({ expedition }: FeaturedExpeditionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <CoverImage
          src="/media/gallery/gallery-49.jpg"
          alt="USA Loop Expedition"
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 overlay-image-full" />

      <div className="relative z-10 container-wide w-full py-24 text-white">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-on-image">03 — Recent Expedition</span>
            <h2 className="heading-lg mt-6 mb-4 text-white">{expedition.title}</h2>
            <p className="text-white/80 text-lg mb-6">{expedition.subtitle}</p>
            <p className="text-white/65 text-base leading-relaxed mb-8">{expedition.description}</p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {expedition.stats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-medium text-white">{stat.value}</p>
                  <p className="label-on-image mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={SOCIAL_VIDEOS.usaLoopTrailer.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-primary text-xs uppercase tracking-[0.12em] font-medium hover:bg-white/90 transition-all"
              >
                <Play size={16} fill="currentColor" />
                Watch Documentary
              </Link>
              <Link
                href={`/expeditions/${expedition.slug}`}
                data-cursor
                className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/40 text-white text-xs uppercase tracking-[0.12em] hover:border-white hover:bg-white/10 transition-all"
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
            <div className="relative pl-8 border-l border-white/20">
              {expedition.timeline.map((item) => (
                <div key={item.title} className="relative pb-10 last:pb-0">
                  <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-white" />
                  <span className="text-xs text-white/55">{item.date}</span>
                  <h4 className="text-lg font-medium text-white mt-1">{item.title}</h4>
                  <p className="text-sm text-white/60 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
