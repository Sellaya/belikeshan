/** Verified belikeshan social channels — only use videos from these sources. */
export const SOCIAL_CHANNELS = {
  youtube: "https://www.youtube.com/channel/UC174LS2fGBFR1vOcplMkjyg",
  youtubeHandle: "https://www.youtube.com/@belikeshan",
  instagram: "https://www.instagram.com/belikeshan/",
  facebook: "https://www.facebook.com/belikeshan/",
} as const;

export const SOCIAL_VIDEOS = {
  usaLoopTrailer: {
    title: "USA Loop Journey Trailer",
    externalUrl: "https://www.instagram.com/reel/DauptdcBP4g/",
  },
  usaLoopDay7: {
    title: "I WAS WARNED NOT TO DO THIS!!! | USA Loop Day 7",
    youtubeId: "nBG01dbLDWA",
  },
} as const;

export function videoWatchUrl(video: { youtubeId?: string; externalUrl?: string }): string {
  if (video.externalUrl) return video.externalUrl;
  if (video.youtubeId) return `https://www.youtube.com/watch?v=${video.youtubeId}`;
  return SOCIAL_CHANNELS.youtube;
}

export const youtubeChannel = SOCIAL_CHANNELS.youtube;
