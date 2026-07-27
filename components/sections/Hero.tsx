"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url(/media/gallery/gallery-34.jpg)" }}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-24 safe-bottom text-white">
        <motion.p
          className="label-on-image mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {profile.brand} · {profile.philosophy}
        </motion.p>

        <motion.h1
          className="heading-xl text-balance max-w-5xl text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1 }}
        >
          <span className="block text-base sm:text-lg md:text-xl font-normal tracking-normal text-white/80 mb-3 sm:mb-4">
            {profile.name} — Pakistani Adventure Rider & Filmmaker
          </span>
          {profile.tagline}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {profile.subtitle}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
        >
          {profile.roles.map((role: string, i: number) => (
            <span key={role} className="flex items-center gap-6">
              <span className="text-sm md:text-base text-white/80 tracking-wide">
                {role}
              </span>
              {i < profile.roles.length - 1 && (
                <span className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link
            href="#journeys"
            data-cursor
            className="px-8 py-3.5 bg-white text-primary text-xs uppercase tracking-[0.12em] font-medium hover:bg-white/90 transition-all"
          >
            View Expeditions
          </Link>
          <Link
            href="#films"
            data-cursor
            className="px-8 py-3.5 border border-white/40 text-white text-xs uppercase tracking-[0.12em] hover:border-white hover:bg-white/10 transition-all"
          >
            Watch Films
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 safe-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="label-on-image">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
