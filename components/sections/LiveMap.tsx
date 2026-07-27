"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Route, Compass, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import CoverImage from "@/components/ui/CoverImage";

const planningSteps = [
  "Route research & corridor mapping",
  "Gear testing & solo overland prep",
  "Documentary & story planning",
  "Public route announcement — coming soon",
];

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
          <span className="label-text">09 — What&apos;s Next</span>
          <h2 className="heading-lg mt-6">One journey ends. The next begins.</h2>
          <p className="body-lg mt-6 max-w-2xl">
            The USA Loop was the most recent chapter. The next expedition is in active planning — route research, gear prep and film storylines are all underway.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 thumb-frame aspect-[16/10]">
            <CoverImage
              src="/media/gallery/gallery-52.jpg"
              alt="Upcoming adventure in process"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 overlay-image-bottom" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs uppercase tracking-[0.12em] text-white/60">
                  Upcoming · Route Planning
                </span>
              </div>
              <h3 className="text-xl font-medium text-white">Next Adventure</h3>
              <p className="text-sm text-white/70 mt-1">
                Destination & full route map — to be announced
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              className="p-5 border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Compass size={16} className="text-white/80" />
                <span className="text-xs uppercase tracking-wider text-white/55">
                  Planning Follow-up
                </span>
              </div>
              <ul className="space-y-2">
                {planningSteps.map((step) => (
                  <li key={step} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="text-white/40 mt-1">—</span>
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>

            {[
              {
                icon: Route,
                label: "Recent",
                value: "USA Loop — 25 states · 10,000 miles · 2026",
              },
              {
                icon: MapPin,
                label: "Origins",
                value: "Lahore, Pakistan",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="p-5 border border-white/10"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <item.icon size={16} className="text-white/80" />
                  <span className="text-xs uppercase tracking-wider text-white/55">
                    {item.label}
                  </span>
                </div>
                <p className="text-base font-medium text-white">{item.value}</p>
              </motion.div>
            ))}

            <Link
              href="/expeditions/upcoming-adventure"
              data-cursor
              className="block p-5 border border-white/20 bg-white/5 text-center hover:bg-white/10 transition-colors"
            >
              <p className="text-xs uppercase tracking-wider text-white mb-2">
                Full planning details
              </p>
              <p className="text-sm text-white/65">Route updates & sponsorship info</p>
            </Link>

            <a
              href={profile.social.email}
              data-cursor
              className="block p-5 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <Mail size={16} className="text-white/80" />
                <p className="text-xs uppercase tracking-wider text-white">
                  Sponsorship enquiries
                </p>
              </div>
              <p className="text-sm text-white/65">
                Contact for partnership & sponsorship details
              </p>
              <p className="text-sm text-white mt-2">{profile.email}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
