"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-muted uppercase tracking-wider">
          &copy; {year} Belikeshan. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-wider text-muted hover:text-sand transition-colors"
          >
            Journal
          </Link>
          <Link
            href="/expeditions/silk-road-revival"
            className="text-xs uppercase tracking-wider text-muted hover:text-sand transition-colors"
          >
            Expeditions
          </Link>
          <button
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
