"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { navGroups, type NavLink } from "@/data/navigation";

function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = navGroups
      .flatMap((g) => g.links)
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function NavDropdown({
  group,
  activeSection,
  onNavigate,
}: {
  group: (typeof navGroups)[number];
  activeSection: string;
  onNavigate: (link: NavLink) => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const isGroupActive =
    group.links.some((l) => l.href.startsWith("#") && l.href.slice(1) === activeSection) ||
    group.links.some((l) => l.type === "page" && pathname === l.href) ||
    (group.href?.startsWith("#") && group.href.slice(1) === activeSection);

  if (group.links.length === 1 && group.href) {
    const link = group.links[0];
    const isHash = link.href.startsWith("#");
    const isActive = isHash ? activeSection === link.href.slice(1) : pathname === link.href;

    if (link.type === "page") {
      return (
        <Link
          href={link.href}
          className={cn(
            "text-xs uppercase tracking-[0.12em] py-2 transition-colors",
            pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
          )}
        >
          {group.label}
        </Link>
      );
    }

    return (
      <a
        href={isHome ? link.href : `/${link.href}`}
        onClick={(e) => {
          if (isHome) {
            e.preventDefault();
            onNavigate(link);
          }
        }}
        className={cn(
          "text-xs uppercase tracking-[0.12em] py-2 transition-colors",
          isActive ? "text-white" : "text-white/60 hover:text-white"
        )}
      >
        {group.label}
      </a>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 text-xs uppercase tracking-[0.12em] py-2 transition-colors",
          isGroupActive ? "text-white" : "text-white/60 hover:text-white"
        )}
        aria-expanded={open}
      >
        {group.label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 pt-2 min-w-[240px] z-50"
          >
            <ul className="border border-white/10 bg-secondary/95 backdrop-blur-xl shadow-xl py-2">
              {group.links.map((link) => {
                const isHash = link.href.startsWith("#");
                const isActive = isHash
                  ? activeSection === link.href.slice(1)
                  : pathname === link.href;

                if (link.type === "page") {
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3 hover:bg-white/5 transition-colors",
                          isActive && "bg-white/5"
                        )}
                      >
                        <span className="text-sm text-white">{link.label}</span>
                        {link.description && (
                          <span className="block text-xs text-white/50 mt-0.5">{link.description}</span>
                        )}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <a
                      href={isHome ? link.href : `/${link.href}`}
                      onClick={(e) => {
                        if (isHome) {
                          e.preventDefault();
                          onNavigate(link);
                          setOpen(false);
                        }
                      }}
                      className={cn(
                        "block px-4 py-3 hover:bg-white/5 transition-colors",
                        isActive && "bg-white/5"
                      )}
                    >
                      <span className="text-sm text-white">{link.label}</span>
                      {link.description && (
                        <span className="block text-xs text-white/50 mt-0.5">{link.description}</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

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

  const navigate = useCallback(
    (link: NavLink) => {
      setMenuOpen(false);
      if (link.type === "page") {
        router.push(link.href);
        return;
      }
      if (link.href.startsWith("#")) {
        if (!isHome) {
          router.push(`/${link.href}`);
          return;
        }
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [isHome, router]
  );

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
        <nav
          className="container-wide flex items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm lowercase tracking-[0.08em] font-medium text-white hover:text-white/80 transition-colors py-2 shrink-0"
          >
            {profile.brand}
          </Link>

          <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navGroups.map((group) => (
              <li key={group.label}>
                <NavDropdown group={group} activeSection={activeSection} onNavigate={navigate} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="lg:hidden touch-target flex flex-col items-center justify-center gap-1.5 shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={cn("block w-6 h-[1px] bg-off-white transition-transform", menuOpen && "rotate-45 translate-y-[3.5px]")} />
            <span className={cn("block w-6 h-[1px] bg-off-white transition-opacity", menuOpen && "opacity-0")} />
            <span className={cn("block w-6 h-[1px] bg-off-white transition-transform", menuOpen && "-rotate-45 -translate-y-[3.5px]")} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl lg:hidden safe-top safe-bottom safe-x"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="h-full overflow-y-auto overscroll-contain px-6 py-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-md mx-auto space-y-10">
                {navGroups.map((group) => (
                  <div key={group.label}>
                    <p className="label-text text-sand mb-4">{group.label}</p>
                    <ul className="space-y-1">
                      {group.links.map((link) => {
                        const isHash = link.href.startsWith("#");
                        const isActive = isHash
                          ? activeSection === link.href.slice(1)
                          : pathname === link.href;

                        if (link.type === "page") {
                          return (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                  "block py-3 border-b border-white/5",
                                  isActive ? "text-white" : "text-white/75"
                                )}
                              >
                                <span className="text-lg font-light">{link.label}</span>
                                {link.description && (
                                  <span className="block text-sm text-white/45 mt-0.5">{link.description}</span>
                                )}
                              </Link>
                            </li>
                          );
                        }

                        return (
                          <li key={link.href}>
                            <a
                              href={isHome ? link.href : `/${link.href}`}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(link);
                              }}
                              className={cn(
                                "block py-3 border-b border-white/5",
                                isActive ? "text-white" : "text-white/75"
                              )}
                            >
                              <span className="text-lg font-light">{link.label}</span>
                              {link.description && (
                                <span className="block text-sm text-white/45 mt-0.5">{link.description}</span>
                              )}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
