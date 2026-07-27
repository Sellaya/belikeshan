"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/media/gallery/gallery-24.jpg)" }}
      />
      <div className="absolute inset-0 overlay-contact" />

      <div className="relative z-10 container-wide text-white">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label-on-image">11 — Contact</span>
          <h2 className="heading-lg mt-6 mb-6 text-white">Let&apos;s tell the next story together.</h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10">
            Media enquiries, collaborations, sponsorship conversations, or simply a message from the road — I&apos;d love to hear from you.
          </p>

          <a
            href={profile.social.email}
            data-cursor
            className="inline-flex items-center gap-3 text-lg text-white hover:text-white/80 transition-colors"
          >
            <Mail size={20} />
            <span>{profile.email}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
