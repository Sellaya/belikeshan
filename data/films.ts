import type { Film } from "@/lib/types";
import { SOCIAL_VIDEOS, youtubeChannel } from "@/data/social-videos";

export { youtubeChannel };

export const films: Film[] = [
  {
    id: "usa-loop-trailer",
    title: "USA Loop Journey Trailer",
    description:
      "The official trailer for the USA Loop — a 33-day, 10,000-mile solo motorcycle expedition across 25 U.S. states on a Suzuki DR650, carrying the Pakistani flag.",
    externalUrl: SOCIAL_VIDEOS.usaLoopTrailer.externalUrl,
    thumbnail: "/media/gallery/gallery-08.jpg",
    duration: "Trailer",
    year: "2026",
  },
  {
    id: "three-thunderstorms",
    title: "I Survived 3 Thunderstorms in 1 Day | USA Loop Day 7",
    description:
      "Riding through three severe thunderstorms in a single day — raw, unfiltered documentary from the middle of the USA Loop.",
    youtubeId: SOCIAL_VIDEOS.usaLoopDay7.youtubeId,
    thumbnail: "/media/gallery/gallery-24.jpg",
    duration: "Episode",
    year: "2026",
  },
];
