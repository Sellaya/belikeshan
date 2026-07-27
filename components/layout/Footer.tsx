"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { footerColumns } from "@/data/navigation";
import { SOCIAL_CHANNELS } from "@/data/social-videos";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 border-t border-white/5 safe-bottom">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-sm lowercase tracking-[0.08em] font-medium text-white">
              {profile.brand}
            </Link>
            <p className="text-sm text-white/55 mt-3 leading-relaxed max-w-xs">
              Pakistani adventure rider, filmmaker & storyteller — solo motorcycle expeditions, films
              & photography from the road.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="label-text text-sand mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-white/55 text-center sm:text-left">
            &copy; {year} {profile.name} · {profile.brand} · {profile.email}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={SOCIAL_CHANNELS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-white/55 hover:text-white transition-colors"
            >
              YouTube
            </a>
            <a
              href={SOCIAL_CHANNELS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-white/55 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs uppercase tracking-wider text-white/55 hover:text-white transition-colors"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
