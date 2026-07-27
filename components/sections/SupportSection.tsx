"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
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
          <p className="body-lg max-w-2xl mx-auto mb-10">
            Every expedition is self-funded passion. Your support helps keep the documentaries, stories and cultural exchange alive — from Pakistan to the world.
          </p>
          <Link
            href={profile.social.support}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="inline-flex items-center gap-3 px-10 py-5 bg-sand text-primary text-sm uppercase tracking-wider font-medium hover:bg-sand-light transition-all hover:-translate-y-0.5"
          >
            <Coffee size={18} />
            Buy Me a Coffee
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
