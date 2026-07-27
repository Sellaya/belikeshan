"use client";

import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-xs text-white/65 uppercase tracking-wider">
            &copy; {year} {profile.name} · {profile.brand}
          </p>
          <p className="text-[10px] text-white/55 mt-1">{profile.handle}</p>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/blog" className="text-xs uppercase tracking-wider text-white/65 hover:text-white transition-colors">
            Journal
          </Link>
          <Link href="/#journeys" className="text-xs uppercase tracking-wider text-white/65 hover:text-white transition-colors">
            Expeditions
          </Link>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs uppercase tracking-wider text-white/65 hover:text-white transition-colors"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
