"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        poster="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1920&q=80"
      >
        <source
          src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          className="label-text mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          Adventure · Documentary · Exploration
        </motion.p>

        <motion.h1
          className="heading-xl text-balance max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1 }}
        >
          {profile.tagline}
        </motion.h1>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          {profile.roles.map((role: string, i: number) => (
            <span key={role} className="flex items-center gap-6">
              <span className="text-sm md:text-base text-muted font-light tracking-wide">
                {role}
              </span>
              {i < profile.roles.length - 1 && (
                <span className="hidden sm:block w-1 h-1 rounded-full bg-sand/50" />
              )}
            </span>
          ))}
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
