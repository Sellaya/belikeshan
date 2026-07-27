"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const links = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journeys" },
  { label: "Past", href: "#past-journeys" },
  { label: "Films", href: "#films" },
  { label: "Social", href: "#social" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 safe-top safe-x",
          scrolled ? "py-3 md:py-4 glass" : "py-4 md:py-6 bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <nav className="container-wide flex items-center justify-between">
          <a
            href="#"
            data-cursor
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-sm lowercase tracking-[0.08em] font-medium text-white hover:text-white/80 transition-colors py-2"
          >
            {profile.brand}
          </a>

          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="text-xs uppercase tracking-[0.12em] text-white/60 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="md:hidden touch-target flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={cn("block w-6 h-[1px] bg-off-white transition-transform", menuOpen && "rotate-45 translate-y-[3.5px]")} />
            <span className={cn("block w-6 h-[1px] bg-off-white transition-opacity", menuOpen && "opacity-0")} />
            <span className={cn("block w-6 h-[1px] bg-off-white transition-transform", menuOpen && "-rotate-45 -translate-y-[3.5px]")} />
          </button>
        </nav>
      </motion.header>

      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl flex items-center justify-center md:hidden safe-top safe-bottom safe-x"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setMenuOpen(false)}
        >
          <ul
            className="flex flex-col items-center gap-6 sm:gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="block py-2 text-2xl sm:text-3xl font-light tracking-wide text-off-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  );
}
