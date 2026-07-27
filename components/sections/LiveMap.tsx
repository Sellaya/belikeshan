"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Cloud, Activity } from "lucide-react";

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
          <span className="label-text">09 — Live Expedition</span>
          <h2 className="heading-lg mt-6">Currently on the road.</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 relative aspect-[16/10] bg-primary rounded-sm overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 60" className="w-full h-full opacity-10">
                <path
                  d="M20,30 Q40,10 60,25 T90,30"
                  fill="none"
                  stroke="#c4a882"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>

            <motion.div
              className="absolute"
              style={{ left: "45%", top: "40%" }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-4 h-4 rounded-full bg-orange border-2 border-orange/50" />
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-orange">Live</span>
              </div>
              <h3 className="text-xl font-light">Africa Overland — Planning Phase</h3>
              <p className="text-sm text-muted mt-1">Cape Town → Cairo · 15,000 km</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Current Location", value: "Karachi, Pakistan" },
              { icon: Navigation, label: "Next Destination", value: "Cape Town, South Africa" },
              { icon: Activity, label: "Journey Progress", value: "Preparation — 35%" },
              { icon: Cloud, label: "Conditions", value: "Clear · 28°C" },
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
                  <span className="text-xs uppercase tracking-wider text-muted">
                    {item.label}
                  </span>
                </div>
                <p className="text-lg font-light text-off-white">{item.value}</p>
              </motion.div>
            ))}

            <div className="p-5 border border-orange/20 bg-orange/5">
              <p className="text-xs uppercase tracking-wider text-orange mb-2">
                Coming September 2026
              </p>
              <p className="text-sm text-muted">
                Follow the live tracker when the expedition begins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
