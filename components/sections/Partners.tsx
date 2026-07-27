"use client";

import { motion } from "framer-motion";
import { partners } from "@/data/partners";

export default function Partners() {
  return (
    <section className="section-padding bg-secondary overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="label-text">07 — Partners</span>
          <h2 className="heading-lg mt-6">Trusted by the best.</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              className="flex items-center justify-center p-10 md:p-16 bg-secondary group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-lg md:text-2xl font-light tracking-[0.3em] text-muted group-hover:text-white transition-colors duration-500">
                {partner.logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
