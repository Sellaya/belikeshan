import type { SocialFeedItem } from "@/lib/types";
import { SOCIAL_CHANNELS } from "@/data/social-videos";

const YOUTUBE_CHANNEL_ID = "UC174LS2fGBFR1vOcplMkjyg";
const INSTAGRAM_USERNAME = "belikeshan";
const FETCH_LIMIT = 4;

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function fetchYouTubeVideos(limit = FETCH_LIMIT): Promise<SocialFeedItem[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return [];

    const xml = await response.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

    return entries.slice(0, limit).flatMap((entry) => {
      const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const channelId = entry.match(/<yt:channelId>([^<]+)<\/yt:channelId>/)?.[1];
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      const thumbnail = entry.match(/<media:thumbnail url="([^"]+)"/)?.[1];
      const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1];

      if (!videoId || channelId !== YOUTUBE_CHANNEL_ID || !title || !published || !thumbnail) {
        return [];
      }

      return [
        {
          id: `youtube-${videoId}`,
          platform: "youtube" as const,
          title: decodeHtml(title),
          url: link ?? `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail,
          publishedAt: published,
        },
      ];
    });
  } catch {
    return [];
  }
}

interface InstagramNode {
  shortcode: string;
  is_video?: boolean;
  product_type?: string | null;
  taken_at_timestamp: number;
  thumbnail_src?: string;
  display_url?: string;
  edge_media_to_caption?: {
    edges?: { node: { text: string } }[];
  };
}

async function fetchInstagramVideos(limit = FETCH_LIMIT): Promise<SocialFeedItem[]> {
  try {
    const response = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_USERNAME}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; belikeshan-site/1.0)",
          "X-IG-App-ID": "936619743392459",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    const username = data?.data?.user?.username;

    if (username !== INSTAGRAM_USERNAME) return [];

    const edges: { node: InstagramNode }[] =
      data?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];

    return edges
      .map(({ node }) => node)
      .filter((node) => node.is_video)
      .slice(0, limit)
      .map((node) => {
        const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text ?? "";
        const title = caption.split("\n")[0].trim() || "Instagram reel";
        const path = node.product_type === "clips" ? "reel" : "p";

        return {
          id: `instagram-${node.shortcode}`,
          platform: "instagram" as const,
          title,
          url: `${SOCIAL_CHANNELS.instagram}${path}/${node.shortcode}/`,
          thumbnail: node.thumbnail_src ?? node.display_url ?? "",
          publishedAt: new Date(node.taken_at_timestamp * 1000).toISOString(),
        };
      })
      .filter((item) => item.thumbnail);
  } catch {
    return [];
  }
}

export async function getRecentSocialVideos(): Promise<{
  youtube: SocialFeedItem[];
  instagram: SocialFeedItem[];
}> {
  const [youtube, instagram] = await Promise.all([
    fetchYouTubeVideos(),
    fetchInstagramVideos(),
  ]);

  return { youtube, instagram };
}
