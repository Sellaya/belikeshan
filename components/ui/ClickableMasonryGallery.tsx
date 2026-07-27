"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ImageLightbox from "@/components/ui/ImageLightbox";

function pickEvenlySpaced(images: string[], count: number): { src: string; fullIndex: number }[] {
  if (images.length <= count) {
    return images.map((src, fullIndex) => ({ src, fullIndex }));
  }
  const step = images.length / count;
  return Array.from({ length: count }, (_, i) => {
    const fullIndex = Math.min(Math.floor(i * step), images.length - 1);
    return { src: images[fullIndex], fullIndex };
  });
}

interface ClickableMasonryGalleryProps {
  images: string[];
  /** Show a evenly-spaced subset; lightbox always navigates the full set */
  previewCount?: number;
  wide?: boolean;
  animate?: boolean;
}

export default function ClickableMasonryGallery({
  images,
  previewCount,
  wide = false,
  animate = true,
}: ClickableMasonryGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const items =
    previewCount != null && previewCount < images.length
      ? pickEvenlySpaced(images, previewCount)
      : images.map((src, fullIndex) => ({ src, fullIndex }));

  return (
    <>
      <div className={wide ? "masonry-grid masonry-grid-wide" : "masonry-grid"}>
        {items.map(({ src, fullIndex }, i) => {
          const cell = (
            <button
              type="button"
              data-cursor
              className={`masonry-item relative w-full overflow-hidden group ${
                wide ? "border border-white/5 bg-secondary" : ""
              }`}
              onClick={() => setLightboxIndex(fullIndex)}
            >
              <Image
                src={src}
                alt=""
                width={900}
                height={675}
                className="w-full h-auto img-contain-center transition-transform duration-700 group-hover:scale-[1.02]"
                sizes={
                  wide
                    ? "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
            </button>
          );

          if (!animate) return <div key={src}>{cell}</div>;

          return (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.03 }}
            >
              {cell}
            </motion.div>
          );
        })}
      </div>

      <ImageLightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
