"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journeys" },
  { label: "Films", href: "#films" },
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

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-4 glass" : "py-6 bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <nav className="container-wide flex items-center justify-between">
          <a
            href="#"
            data-cursor
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-sm uppercase tracking-[0.25em] font-medium text-off-white hover:text-sand transition-colors"
          >
            Be Like Shan
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
                  className="text-xs uppercase tracking-[0.15em] text-muted hover:text-off-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn("block w-6 h-[1px] bg-off-white transition-transform", menuOpen && "rotate-45 translate-y-[3.5px]")} />
            <span className={cn("block w-6 h-[1px] bg-off-white transition-opacity", menuOpen && "opacity-0")} />
            <span className={cn("block w-6 h-[1px] bg-off-white transition-transform", menuOpen && "-rotate-45 -translate-y-[3.5px]")} />
          </button>
        </nav>
      </motion.header>

      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl flex items-center justify-center md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ul className="flex flex-col items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="text-2xl font-light tracking-wide text-off-white"
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
