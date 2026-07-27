"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function AchievementStrip() {
  return (
    <section className="py-12 md:py-16 bg-secondary border-y border-white/5">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="label-text">USA Loop Expedition · 2026</span>
          <p className="mt-4 text-sm md:text-base text-muted font-light max-w-3xl mx-auto">
            First Pakistani passport holder publicly documented completing this solo USA motorcycle loop
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {profile.achievements.map((item, i) => (
            <motion.div
              key={item.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <p className="text-2xl md:text-3xl font-light text-sand">{item.value}</p>
              <p className="label-text mt-2 text-[10px]">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
