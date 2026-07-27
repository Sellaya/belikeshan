import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://belikeshan.com";

export const SITE_NAME = "belikeshan";
export const CREATOR = "Shan-e-Ali";

export const DEFAULT_KEYWORDS = [
  "Shan-e-Ali",
  "belikeshan",
  "Pakistani adventure rider",
  "Pakistani motorcycle traveler",
  "adventure motorcyclist Pakistan",
  "solo motorcycle expedition",
  "USA Loop motorcycle journey",
  "Suzuki DR650 adventure",
  "Lahore to Gwadar motorcycle ride",
  "Makran Coastal Highway motorcycle",
  "motorcycle travel filmmaker",
  "Pakistani passport motorcycle USA",
  "adventure travel photography",
  "motorcycle documentary",
  "solo rider Pakistan",
  "motorcycle expedition blog",
];

export const DEFAULT_DESCRIPTION =
  "Shan-e-Ali — Pakistani adventure rider, filmmaker and storyteller behind belikeshan. Solo motorcycle expeditions including a 10,000-mile USA Loop across 25 states and the 5,000-km Lahore to Gwadar ride across Pakistan. Films, photography and stories from the road.";

export const DEFAULT_OG_IMAGE = "/media/gallery/gallery-34.jpg";

export function absoluteUrl(path = ""): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@belikeshan",
    },
  };
}
