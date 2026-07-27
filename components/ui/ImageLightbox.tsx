"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function ImageLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, prev, next]);

  return (
    <AnimatePresence>
      {index !== null && images[index] && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            data-cursor
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-off-white/60 hover:text-off-white z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button
            type="button"
            data-cursor
            onClick={prev}
            className="absolute left-4 md:left-8 p-2 text-off-white/60 hover:text-off-white z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            type="button"
            data-cursor
            onClick={next}
            className="absolute right-4 md:right-8 p-2 text-off-white/60 hover:text-off-white z-10"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="relative w-full max-w-6xl mx-4 max-h-[85vh]"
          >
            <Image
              src={images[index]}
              alt=""
              width={1600}
              height={1200}
              className="w-full h-auto max-h-[85vh] object-contain mx-auto"
              sizes="100vw"
              priority
            />
          </motion.div>
          <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-muted">
            {index + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
