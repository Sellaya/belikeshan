"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";

export default function WhoIAm() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={ref} className="section-padding bg-primary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="label-text">01 — Who I Am</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div style={{ y: imageY }} className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={profile.portrait}
                alt={profile.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/20 hidden md:block" />
            <p className="mt-6 label-text">{profile.brand} · {profile.handle}</p>
          </motion.div>

          <motion.div style={{ y: textY }}>
            <h2 className="heading-lg mb-4 text-balance text-white">
              Stories written on asphalt and human connection.
            </h2>
            <p className="text-white/80 text-base mb-8 font-medium">{profile.philosophy}</p>
            <p className="body-lg mb-12">{profile.bio}</p>

            <div className="relative pl-8 border-l border-white/20">
              {profile.timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative pb-12 last:pb-0"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border border-white/40 bg-primary" />
                  <span className="label-text">{item.year}</span>
                  <h3 className="text-xl font-medium text-white mt-2 mb-2">{item.title}</h3>
                  <p className="text-white/65 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
