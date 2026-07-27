import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Shan-e-Ali Adventure Rider`,
    short_name: SITE_NAME,
    description:
      "Pakistani adventure rider Shan-e-Ali — solo motorcycle expeditions, films and photography.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/media/gallery/gallery-34.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
