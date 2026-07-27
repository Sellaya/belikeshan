"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import CoverImage from "@/components/ui/CoverImage";

const timelineImages = [
  "/media/gallery/gallery-34.jpg",
  "/media/gallery/gallery-05.jpg",
  "/media/gallery/gallery-49.jpg",
  "/media/gallery/gallery-52.jpg",
  "/media/gallery/gallery-50.jpg",
];

const timelineStatus = ["past", "past", "past", "current", "brand"] as const;

export default function WhoIAm() {
  const ref = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const activeItem = profile.timeline[activeIndex];
  const activeImage = timelineImages[activeIndex] ?? profile.portrait;

  return (
    <section id="about" ref={ref} className="relative section-padding bg-primary overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-sand/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-orange/5 blur-3xl" />
      </div>

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 lg:mb-20"
        >
          <span className="label-text">01 — Who I Am</span>
          <h2 className="heading-lg mt-6 max-w-3xl text-balance text-white">
            Stories written on asphalt and human connection.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(280px,360px)_1fr] gap-12 lg:gap-20 items-start">
          <motion.div style={{ y: imageY }} className="lg:sticky lg:top-28 space-y-6">
            <div className="thumb-frame aspect-[4/5] border border-white/10">
              <CoverImage
                src={profile.portrait}
                alt={profile.name}
                sizes="(max-width: 1024px) 100vw, 360px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-2xl font-medium text-white">{profile.name}</p>
                <p className="label-on-image mt-1">
                  {profile.brand} · {profile.handle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.roles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/75 border border-white/15 bg-white/5"
                >
                  {role}
                </span>
              ))}
            </div>

            <div className="flex items-start gap-2 text-sm text-white/60">
              <MapPin size={15} className="mt-0.5 shrink-0 text-sand" />
              <span>{profile.location}</span>
            </div>

            <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10">
              {profile.achievements.slice(0, 3).map((stat) => (
                <div key={stat.label} className="bg-primary px-3 py-4 text-center">
                  <p className="text-lg md:text-xl font-medium text-white">{stat.value}</p>
                  <p className="label-text mt-1 text-[9px]">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-10 lg:space-y-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <blockquote className="border-l-2 border-sand pl-6 mb-8">
                <p className="text-2xl md:text-3xl font-medium text-white leading-snug">
                  {profile.philosophy}
                </p>
              </blockquote>
              <p className="body-lg">{profile.bio}</p>
            </motion.div>

            <div>
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <span className="label-text">The Journey So Far</span>
                  <p className="text-white/55 text-sm mt-2">
                    Select a chapter to explore the story behind each era.
                  </p>
                </div>
                <span className="hidden sm:block label-text text-sand">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(profile.timeline.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8">
                <div className="thumb-frame aspect-[16/10] border border-white/10 bg-secondary">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0"
                    >
                      <CoverImage
                        src={activeImage}
                        alt={activeItem.title}
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                      <div className="absolute inset-0 overlay-image-bottom" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                        <span className="label-on-image">{activeItem.year}</span>
                        <h3 className="text-xl md:text-2xl font-medium text-white mt-1">
                          {activeItem.title}
                        </h3>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  {profile.timeline.map((item, i) => {
                    const isActive = i === activeIndex;
                    const status = timelineStatus[i];

                    return (
                      <button
                        key={item.year}
                        type="button"
                        data-cursor
                        onClick={() => setActiveIndex(i)}
                        className={cn(
                          "w-full text-left p-4 border transition-all duration-300",
                          isActive
                            ? "border-sand/50 bg-white/5"
                            : "border-white/8 bg-transparent hover:border-white/20 hover:bg-white/[0.02]"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span
                                className={cn(
                                  "label-text",
                                  isActive && "text-sand",
                                  status === "current" && !isActive && "text-orange-light"
                                )}
                              >
                                {item.year}
                              </span>
                              {status === "current" && (
                                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-orange/40 text-orange-light">
                                  In process
                                </span>
                              )}
                            </div>
                            <h4 className="text-base font-medium text-white">{item.title}</h4>
                            <p
                              className={cn(
                                "text-sm text-white/60 mt-1 leading-relaxed transition-all duration-300",
                                isActive ? "line-clamp-none" : "line-clamp-2"
                              )}
                            >
                              {item.description}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "shrink-0 w-2 h-2 rounded-full mt-2 transition-colors",
                              isActive ? "bg-sand" : "bg-white/20"
                            )}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
