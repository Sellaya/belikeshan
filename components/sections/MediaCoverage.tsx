"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, Tv, Mic, FileText } from "lucide-react";
import { media, pressLogos } from "@/data/media";

const typeIcons = {
  article: FileText,
  interview: Mic,
  tv: Tv,
  award: Award,
};

export default function MediaCoverage() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="label-text">06 — Media Coverage</span>
          <h2 className="heading-lg mt-6">As seen in.</h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-20 opacity-40">
          {pressLogos.map((logo, i) => (
            <motion.span
              key={logo}
              className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {logo}
            </motion.span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item, i) => {
            const Icon = typeIcons[item.type];
            return (
              <motion.a
                key={item.id}
                href={item.link}
                data-cursor
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 border border-white/5 hover:border-sand/20 transition-all duration-500 hover:bg-white/[0.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon size={18} className="text-sand" />
                  <ExternalLink
                    size={14}
                    className="text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="label-text text-[10px]">{item.publication}</span>
                <h3 className="text-lg font-light text-off-white mt-2 mb-3 group-hover:text-sand transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted line-clamp-2">{item.excerpt}</p>
                <span className="text-xs text-muted mt-4 block">{item.date}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
