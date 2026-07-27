"use client";

import ClickableMasonryGallery from "@/components/ui/ClickableMasonryGallery";

interface ExpeditionGallerySectionProps {
  images: string[];
}

export default function ExpeditionGallerySection({ images }: ExpeditionGallerySectionProps) {
  return (
    <div id="gallery" className="mt-24">
      <h2 className="heading-md mb-2">Gallery</h2>
      <p className="text-sm text-white/55 mb-8">
        {images.length} photos — click any image to expand.
      </p>
      <ClickableMasonryGallery images={images} wide animate={images.length <= 48} />
    </div>
  );
}
