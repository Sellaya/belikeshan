"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Mic, Tv, FileText, Instagram, Facebook } from "lucide-react";
import {
  featuredStory,
  televisionInterviews,
  socialPublications,
  pressLogos,
} from "@/data/media";
import type { MediaItem } from "@/lib/types";
import CoverImage from "@/components/ui/CoverImage";

const platformIcons = {
  web: FileText,
  instagram: Instagram,
  facebook: Facebook,
  x: ExternalLink,
};

function MediaCard({ item, large = false }: { item: MediaItem; large?: boolean }) {
  const PlatformIcon = platformIcons[item.platform] || ExternalLink;

  return (
    <motion.a
      href={item.link}
      data-cursor
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.02] ${
        large ? "md:grid md:grid-cols-2" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {item.thumbnail && (
        <div
          className={`thumb-frame ${
            large ? "aspect-[16/10] md:aspect-[16/10] md:min-h-[280px]" : "aspect-[16/10]"
          }`}
        >
          <CoverImage
            src={item.thumbnail}
            alt={item.title}
            fit={item.category === "television" || item.category === "social" ? "contain" : "cover"}
            position="center"
            className="transition-transform duration-700 group-hover:scale-[1.02]"
            sizes={large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />
          {item.featured && (
            <span className="absolute top-4 left-4 label-text text-[10px] bg-white text-primary px-3 py-1">
              Featured Story
            </span>
          )}
        </div>
      )}

      <div className={`p-6 ${large ? "md:p-10 flex flex-col justify-center" : ""}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PlatformIcon size={14} className="text-white/80" />
            <span className="label-text text-[10px]">{item.publication}</span>
          </div>
          <ExternalLink
            size={14}
            className="text-muted opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <h3
          className={`font-medium text-white group-hover:text-white/80 transition-colors ${
            large ? "text-2xl md:text-3xl leading-snug" : "text-lg"
          }`}
        >
          {item.title}
        </h3>
        {item.author && (
          <p className="text-xs text-muted mt-2">By {item.author}</p>
        )}
        <p className={`text-muted mt-3 ${large ? "text-base leading-relaxed" : "text-sm line-clamp-2"}`}>
          {item.excerpt}
        </p>
        <span className="text-xs text-muted mt-4 block">{item.date}</span>
      </div>
    </motion.a>
  );
}

function SectionBlock({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: MediaItem[];
}) {
  return (
    <div className="mb-20 last:mb-0">
      <div className="flex items-center gap-3 mb-8">
        <Icon size={18} className="text-white/80" />
        <h3 className="heading-md text-2xl md:text-3xl">{title}</h3>
        <span className="label-text text-[10px]">{items.length} features</span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function MediaCoverage() {
  return (
    <section id="press" className="section-padding bg-primary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="label-text">06 — Press & Interviews</span>
          <h2 className="heading-lg mt-6">The world took notice.</h2>
          <p className="body-lg mt-6 max-w-2xl">
            Press coverage from across Pakistan and beyond — stories from the road that reached audiences far from the asphalt.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-20 opacity-50">
          {pressLogos.map((logo, i) => (
            <motion.span
              key={logo}
              className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {logo}
            </motion.span>
          ))}
        </div>

        <div className="mb-20">
          <MediaCard item={featuredStory} large />
        </div>

        <SectionBlock title="Television Interviews" icon={Tv} items={televisionInterviews} />
        <SectionBlock title="Social Publications" icon={Mic} items={socialPublications} />

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="https://www.brecorder.com/news/40431267"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-white hover:text-white/80 transition-colors"
          >
            Read the lead feature on Business Recorder
            <ExternalLink size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
