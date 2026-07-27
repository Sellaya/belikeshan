"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { films } from "@/data/films";

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
          <h2 className="heading-lg mt-6">Documentaries from the road.</h2>
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
              onClick={() => setActiveVideo(film.youtubeId)}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={film.thumbnail}
                  alt={film.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-off-white/40 flex items-center justify-center group-hover:border-sand group-hover:scale-110 transition-all duration-500">
                    <Play size={24} className="text-off-white ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-xs text-off-white/80 bg-primary/60 px-2 py-1">
                  {film.duration}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="label-text text-[10px]">{film.year}</span>
                </div>
                <h3 className="text-xl font-light text-off-white group-hover:text-sand transition-colors">
                  {film.title}
                </h3>
                <p className="text-sm text-muted mt-2 line-clamp-2">{film.description}</p>
              </div>
            </motion.div>
          ))}
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
