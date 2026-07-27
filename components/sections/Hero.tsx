"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url(/media/gallery/gallery-34.jpg)" }}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          className="label-text mb-4 text-sand"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          {profile.brand} · {profile.philosophy}
        </motion.p>

        <motion.h1
          className="heading-xl text-balance max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1 }}
        >
          {profile.tagline}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base md:text-lg text-muted font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          {profile.subtitle}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          {profile.roles.map((role: string, i: number) => (
            <span key={role} className="flex items-center gap-6">
              <span className="text-sm md:text-base text-off-white/80 font-light tracking-wide">
                {role}
              </span>
              {i < profile.roles.length - 1 && (
                <span className="hidden sm:block w-1 h-1 rounded-full bg-sand/50" />
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          <Link
            href="/expeditions/usa-loop"
            data-cursor
            className="px-8 py-4 bg-sand text-primary text-sm uppercase tracking-wider font-medium hover:bg-sand-light transition-all hover:-translate-y-0.5"
          >
            Explore the USA Loop
          </Link>
          <Link
            href="#films"
            data-cursor
            className="px-8 py-4 border border-off-white/20 text-sm uppercase tracking-wider hover:border-sand hover:text-sand transition-all"
          >
            Watch the Journey
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.8 }}
      >
        <span className="label-text text-[10px]">Scroll</span>
        <div className="w-[1px] h-12 bg-sand/30 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-sand"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
