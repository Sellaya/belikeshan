"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import CoverImage from "@/components/ui/CoverImage";

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null
      ),
    []
  );
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % galleryImages.length : null
      ),
    []
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
    <section id="gallery" className="section-padding bg-primary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="label-text">04 — Photography</span>
          <h2 className="heading-lg mt-6">Moments between the miles.</h2>
        </motion.div>

        <div className="masonry-grid">
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.src}
              data-cursor
              className="masonry-item relative overflow-hidden group w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLightboxIndex(i)}
            >
              <div
                className={`thumb-frame w-full ${
                  img.aspect === "tall"
                    ? "aspect-[3/4]"
                    : img.aspect === "wide"
                      ? "aspect-[4/3]"
                      : "aspect-square"
                }`}
              >
                <CoverImage
                  src={img.src}
                  alt={img.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-500" />
                {(img.caption || img.location) && (
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                    {img.caption && (
                      <p className="text-sm text-white font-medium">{img.caption}</p>
                    )}
                    {img.location && (
                      <p className="text-xs text-white/60 mt-1">{img.location}</p>
                    )}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
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
              data-cursor
              onClick={close}
              className="absolute top-6 right-6 p-2 text-off-white/60 hover:text-off-white z-10"
            >
              <X size={28} />
            </button>
            <button
              data-cursor
              onClick={prev}
              className="absolute left-4 md:left-8 p-2 text-off-white/60 hover:text-off-white z-10"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              data-cursor
              onClick={next}
              className="absolute right-4 md:right-8 p-2 text-off-white/60 hover:text-off-white z-10"
            >
              <ChevronRight size={32} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl mx-4 aspect-[16/10]"
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
            <div className="absolute bottom-6 left-0 right-0 text-center px-6">
              {galleryImages[lightboxIndex].caption && (
                <p className="text-base text-white font-medium mb-1">
                  {galleryImages[lightboxIndex].caption}
                </p>
              )}
              {galleryImages[lightboxIndex].location && (
                <p className="text-sm text-white/60 mb-2">
                  {galleryImages[lightboxIndex].location}
                </p>
              )}
              <p className="text-sm text-muted">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
