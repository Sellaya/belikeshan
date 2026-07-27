"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { films, youtubeChannel } from "@/data/films";

export default function Filmmaking() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="films" className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="label-text">05 — Filmmaking</span>
          <h2 className="heading-lg mt-6">Films from the road.</h2>
          <p className="body-lg mt-4 max-w-xl">
            Documentaries and episodes from belikeshan expeditions — raw, cinematic and unfiltered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {films.map((film, i) => (
            <motion.div
              key={film.id}
              data-cursor
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                if (film.externalUrl) {
                  window.open(film.externalUrl, "_blank", "noopener,noreferrer");
                } else if (film.youtubeId) {
                  setActiveVideo(film.youtubeId);
                }
              }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={film.thumbnail}
                  alt={film.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 overlay-image-bottom" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute top-4 right-4 text-xs text-white/80 bg-black/50 px-2 py-1">
                  {film.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-500">
                    <Play size={24} className="text-off-white ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="label-on-image">{film.year}</span>
                  <h3 className="text-lg font-medium text-white mt-1 line-clamp-2">
                    {film.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-muted mt-3 line-clamp-2">{film.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-white/65 hover:text-white transition-colors"
          >
            View all on YouTube
            <Play size={14} />
          </a>
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[8000] flex items-center justify-center bg-primary/95">
          <button
            data-cursor
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 p-2 text-off-white/60 hover:text-off-white"
          >
            <X size={28} />
          </button>
          <div className="w-full max-w-5xl mx-4 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
