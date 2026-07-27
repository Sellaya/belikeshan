"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Route, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Expedition } from "@/lib/types";
import CoverImage from "@/components/ui/CoverImage";

interface PastExpeditionsProps {
  expeditions: Expedition[];
}

function pickGalleryPreview(images: string[], count = 30): string[] {
  if (images.length <= count) return images;
  const step = images.length / count;
  return Array.from({ length: count }, (_, i) => images[Math.min(Math.floor(i * step), images.length - 1)]);
}

function ExpeditionGallery({ images }: { images: string[] }) {
  const preview = pickGalleryPreview(images);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + preview.length) % preview.length : null)),
    [preview.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % preview.length : null)),
    [preview.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      <div className="masonry-grid masonry-grid-wide">
        {preview.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            data-cursor
            className="masonry-item relative w-full overflow-hidden group border border-white/5 bg-secondary"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 8) * 0.03 }}
            onClick={() => setLightboxIndex(i)}
          >
            <Image
              src={src}
              alt=""
              width={900}
              height={675}
              className="w-full h-auto img-contain-center transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              data-cursor
              onClick={close}
              className="absolute top-6 right-6 p-2 text-off-white/60 hover:text-off-white z-10"
            >
              <X size={28} />
            </button>
            <button
              type="button"
              data-cursor
              onClick={prev}
              className="absolute left-4 md:left-8 p-2 text-off-white/60 hover:text-off-white z-10"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              type="button"
              data-cursor
              onClick={next}
              className="absolute right-4 md:right-8 p-2 text-off-white/60 hover:text-off-white z-10"
            >
              <ChevronRight size={32} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="relative w-full max-w-6xl mx-4 max-h-[85vh]"
            >
              <Image
                src={preview[lightboxIndex]}
                alt=""
                width={1600}
                height={1200}
                className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                sizes="100vw"
                priority
              />
            </motion.div>
            <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-muted">
              {lightboxIndex + 1} / {preview.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
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
                className="thumb-frame aspect-[4/3] border border-white/10"
              >
                <CoverImage
                  src={expedition.coverImage}
                  alt={expedition.title}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 overlay-image-bottom pointer-events-none" />
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

            {expedition.gallery.length > 0 && (
              <div>
                <ExpeditionGallery images={expedition.gallery} />

                {expedition.gallery.length > 30 && (
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
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
