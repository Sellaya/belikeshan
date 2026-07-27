"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import CoverImage from "@/components/ui/CoverImage";
import ImageLightbox from "@/components/ui/ImageLightbox";

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const imageSrcs = galleryImages.map((img) => img.src);

  return (
    <section id="gallery" className="section-padding bg-primary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-24"
        >
          <span className="label-text">04 — Photography</span>
          <h2 className="heading-lg mt-6">Moments between the miles.</h2>
        </motion.div>

        <div className="masonry-grid">
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              data-cursor
              className="masonry-item relative overflow-hidden group w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
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
                  className="transition-transform duration-700 group-hover:scale-105 group-active:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 group-active:bg-primary/30 transition-colors duration-500" />
                {(img.caption || img.location) && (
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
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

      <ImageLightbox
        images={imageSrcs}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
