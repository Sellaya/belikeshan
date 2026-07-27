"use client";

import { motion } from "framer-motion";
import { Instagram, Play, Youtube } from "lucide-react";
import type { SocialFeedItem } from "@/lib/types";
import { SOCIAL_CHANNELS } from "@/data/social-videos";
import CoverImage from "@/components/ui/CoverImage";

interface RecentSocialProps {
  youtube: SocialFeedItem[];
  instagram: SocialFeedItem[];
}

function VideoCard({
  item,
  index,
  aspectClass,
}: {
  item: SocialFeedItem;
  index: number;
  aspectClass: string;
}) {
  const isYouTube = item.platform === "youtube";

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      className="group block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div className={`relative ${aspectClass} overflow-hidden border border-white/5 group-hover:border-white/30 transition-all duration-500 thumb-frame`}>
        <CoverImage
          src={item.thumbnail}
          alt={item.title}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 overlay-image-bottom" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white bg-black/55 px-2 py-1">
          {isYouTube ? <Youtube size={12} /> : <Instagram size={12} />}
          {isYouTube ? "YouTube" : "Instagram"}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-500">
            <Play size={18} className="text-off-white ml-0.5" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-medium text-white line-clamp-3">{item.title}</h3>
        </div>
      </div>
    </motion.a>
  );
}

function PlatformFeed({
  label,
  icon: Icon,
  href,
  items,
  aspectClass,
}: {
  label: string;
  icon: typeof Youtube;
  href: string;
  items: SocialFeedItem[];
  aspectClass: string;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-white/70" />
          <h3 className="text-sm uppercase tracking-[0.12em] text-white/70">{label}</h3>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          className="text-xs uppercase tracking-wider text-white/55 hover:text-white transition-colors"
        >
          View channel
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <VideoCard key={item.id} item={item} index={i} aspectClass={aspectClass} />
        ))}
      </div>
    </div>
  );
}

export default function RecentSocial({ youtube, instagram }: RecentSocialProps) {
  if (youtube.length === 0 && instagram.length === 0) return null;

  return (
    <section id="social" className="section-padding bg-primary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <span className="label-text">06 — Latest Videos</span>
          <h2 className="heading-lg mt-6">Fresh from the channels.</h2>
          <p className="body-lg mt-4 max-w-xl">
            Recent uploads from @belikeshan on YouTube and Instagram — pulled directly from the official channels.
          </p>
        </motion.div>

        <div className="space-y-16">
          <PlatformFeed
            label="YouTube"
            icon={Youtube}
            href={SOCIAL_CHANNELS.youtubeHandle}
            items={youtube}
            aspectClass="aspect-[16/9]"
          />
          <PlatformFeed
            label="Instagram"
            icon={Instagram}
            href={SOCIAL_CHANNELS.instagram}
            items={instagram}
            aspectClass="aspect-[9/16]"
          />
        </div>
      </div>
    </section>
  );
}
