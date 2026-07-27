"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function SupportSection() {
  return (
    <section className="section-padding bg-primary overflow-hidden">
      <div className="container-wide text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label-text">07 — Support the Journey</span>
          <h2 className="heading-lg mt-6 mb-6">Help fuel the next expedition.</h2>
          <p className="body-lg max-w-2xl mx-auto mb-6">
            Every expedition is self-funded passion. Your support helps keep the documentaries, stories and cultural exchange alive — from Pakistan to the world.
          </p>
          <p className="text-sm text-white/65 max-w-xl mx-auto mb-10">
            Planning the next adventure now. Brands and sponsors interested in partnering on the upcoming route can contact directly for full details.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={profile.social.support}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary text-xs uppercase tracking-[0.12em] font-medium hover:bg-white/90 transition-all"
            >
              <Coffee size={18} />
              Buy Me a Coffee
            </Link>
            <a
              href={profile.social.email}
              data-cursor
              className="inline-flex items-center gap-3 px-10 py-5 border border-white/30 text-white text-xs uppercase tracking-[0.12em] hover:bg-white/10 transition-all"
            >
              <Mail size={18} />
              Sponsorship Enquiries
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
