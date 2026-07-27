"use client";

import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-xs text-muted uppercase tracking-wider">
            &copy; {year} {profile.name} · {profile.brand}
          </p>
          <p className="text-[10px] text-muted mt-1">{profile.handle}</p>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/blog" className="text-xs uppercase tracking-wider text-muted hover:text-sand transition-colors">
            Journal
          </Link>
          <Link href="/expeditions/usa-loop" className="text-xs uppercase tracking-wider text-muted hover:text-sand transition-colors">
            USA Loop
          </Link>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs uppercase tracking-wider text-muted hover:text-sand transition-colors"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
