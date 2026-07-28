"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { verifiedPressLogos } from "@/data/press";

export default function MediaCoverage() {
  return (
    <section id="press" className="section-padding bg-primary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <span className="label-text">Press & Media</span>
          <h2 className="heading-lg mt-6">The journey reached beyond the road.</h2>
          <p className="body-lg mt-6 max-w-2xl">
            Shan-e-Ali&apos;s historic solo motorcycle expedition across the United States received
            coverage from leading Pakistani media organizations following the completion of the
            33-day, 16,000-kilometre journey.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12 mb-12 md:mb-16 py-8 border-y border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {verifiedPressLogos.map((logo) => (
            <span
              key={logo}
              className="text-[10px] md:text-xs uppercase tracking-[0.18em] font-medium text-white/45"
            >
              {logo}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/press"
            data-cursor
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary text-xs uppercase tracking-[0.12em] font-medium hover:bg-white/90 transition-all"
          >
            Explore Press Coverage
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
