"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center"
        >
          <span className="label-text">10 — Testimonials</span>
          <h2 className="heading-lg mt-6">Words from the road.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.blockquote
              key={item.id}
              className="relative p-8 md:p-10 border border-white/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-4xl text-white/30 font-serif leading-none">&ldquo;</span>
              <p className="text-lg font-light text-off-white/90 leading-relaxed mt-4 mb-8">
                {item.quote}
              </p>
              <footer>
                <cite className="not-italic">
                  <span className="block text-sm text-off-white">{item.author}</span>
                  <span className="block text-xs text-muted mt-1">{item.role}</span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
