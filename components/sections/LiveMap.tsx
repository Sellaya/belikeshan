"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Route, Flag } from "lucide-react";

export default function LiveMap() {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="label-text">09 — Expedition Complete</span>
          <h2 className="heading-lg mt-6">The loop is closed. The story continues.</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 relative aspect-[16/10] overflow-hidden">
            <Image
              src="/media/gallery/gallery-49.jpg"
              alt="USA Loop completed"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-forest-light" />
                <span className="text-xs uppercase tracking-wider text-forest-light">Completed · 2026</span>
              </div>
              <h3 className="text-xl font-light">USA Loop Expedition</h3>
              <p className="text-sm text-muted mt-1">25 states · 10,000 miles · 33 days · Suzuki DR650</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: Route, label: "Route", value: "Full USA Loop — North to South to East" },
              { icon: Flag, label: "Carried", value: "🇵🇰 Pakistani flag across 25 states" },
              { icon: MapPin, label: "Based", value: "Toronto, Canada" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="p-5 border border-white/5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <item.icon size={16} className="text-sand" />
                  <span className="text-xs uppercase tracking-wider text-muted">{item.label}</span>
                </div>
                <p className="text-lg font-light text-off-white">{item.value}</p>
              </motion.div>
            ))}

            <Link
              href="/expeditions/usa-loop"
              data-cursor
              className="block p-5 border border-sand/20 bg-sand/5 text-center hover:bg-sand/10 transition-colors"
            >
              <p className="text-xs uppercase tracking-wider text-sand mb-2">Explore the full story</p>
              <p className="text-sm text-muted">Timeline, gallery, films & press</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
