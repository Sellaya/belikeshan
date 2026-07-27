"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { gear } from "@/data/gear";
import CoverImage from "@/components/ui/CoverImage";
import type { GearItem } from "@/lib/types";

const categories = [
  { id: "motorcycle", label: "Motorcycle" },
  { id: "helmet", label: "Helmet" },
  { id: "camera", label: "Camera" },
  { id: "camping", label: "Camping" },
  { id: "luggage", label: "Luggage" },
  { id: "navigation", label: "The Flag" },
] as const;

export default function GearSection() {
  const [active, setActive] = useState<GearItem | null>(null);

  return (
    <section className="section-padding bg-primary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="label-text">08 — Gear</span>
          <h2 className="heading-lg mt-6">Gear that crosses continents.</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => {
            const item = gear.find((g) => g.category === cat.id);
            if (!item) return null;
            return (
              <motion.button
                key={cat.id}
                data-cursor
                className="group text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActive(item)}
              >
                <div className="thumb-frame aspect-square mb-3 border border-white/5 group-hover:border-white/30 transition-all duration-500">
                  <CoverImage
                    src={item.image}
                    alt={item.name}
                    sizes="150px"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors" />
                </div>
                <span className="text-xs uppercase tracking-wider text-muted group-hover:text-white transition-colors">
                  {cat.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[8000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm" onClick={() => setActive(null)} />
            <motion.div
              className="relative w-full max-w-2xl bg-secondary"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button
                data-cursor
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 p-2 hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="thumb-frame aspect-[16/9]">
                <CoverImage src={active.image} alt={active.name} fit="contain" />
              </div>
              <div className="p-8">
                <span className="label-text text-white">{active.brand}</span>
                <h3 className="text-2xl font-light mt-2 mb-4">{active.name}</h3>
                <p className="text-muted font-light mb-6">{active.description}</p>
                <div className="space-y-3">
                  {active.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between py-2 border-b border-white/5 text-sm"
                    >
                      <span className="text-muted">{spec.label}</span>
                      <span className="text-off-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
