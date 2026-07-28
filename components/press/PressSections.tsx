import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { VerifiedPressItem } from "@/data/press";
import CoverImage from "@/components/ui/CoverImage";

export function FeaturedEditorialCard({ item }: { item: VerifiedPressItem }) {
  return (
    <article className="group border border-white/10 hover:border-white/25 transition-colors overflow-hidden md:grid md:grid-cols-2">
      {item.thumbnail && (
        <div className="thumb-frame aspect-[16/10] md:min-h-[320px]">
          <CoverImage
            src={item.thumbnail}
            alt={`${item.publication} — ${item.title}`}
            fit="contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent pointer-events-none" />
          <span className="absolute top-4 left-4 label-text text-[10px] bg-white text-primary px-3 py-1">
            Featured
          </span>
        </div>
      )}
      <div className="p-6 md:p-10 flex flex-col justify-center">
        <span className="label-text text-sand">{item.publication}</span>
        <p className="text-xs text-white/50 mt-2 uppercase tracking-wider">{item.publicationType}</p>
        <h2 className="text-2xl md:text-3xl font-medium text-white mt-4 leading-snug">{item.title}</h2>
        {item.author && <p className="text-xs text-white/55 mt-3">By {item.author}</p>}
        <p className="text-sm md:text-base text-white/65 mt-4 leading-relaxed">{item.description}</p>
        <p className="text-xs text-white/45 mt-4">{item.date}</p>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-white/25 text-xs uppercase tracking-wider text-white hover:bg-white hover:text-primary transition-all w-fit"
        >
          Read Full Story
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

export function FeaturedVideoCard({ item }: { item: VerifiedPressItem }) {
  if (!item.youtubeEmbed) return null;

  return (
    <article className="border border-white/10 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-white/10">
        <span className="label-text text-sand">{item.publication}</span>
        <p className="text-xs text-white/50 mt-2 uppercase tracking-wider">{item.publicationType}</p>
        <h2 className="text-xl md:text-2xl font-medium text-white mt-3 leading-snug">{item.title}</h2>
        <p className="text-sm text-white/65 mt-3 leading-relaxed">{item.description}</p>
      </div>
      <div className="relative aspect-video bg-black">
        <iframe
          src={item.youtubeEmbed}
          title={item.title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <div className="p-4 md:p-6 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-white/45">{item.date}</span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/65 hover:text-white transition-colors"
        >
          Watch on YouTube
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

export function PressCoverageCard({ item }: { item: VerifiedPressItem }) {
  return (
    <article className="group border border-white/10 hover:border-white/25 transition-colors p-6 md:p-8 h-full flex flex-col">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="label-text text-sand">{item.publication}</span>
        <span className="text-[10px] uppercase tracking-wider text-white/45">{item.publicationType}</span>
      </div>
      <p className="text-xs text-white/45 mb-4">
        {item.date}
        {item.language === "ur" && <span className="ml-2">· Urdu</span>}
      </p>
      <h3
        className={`text-lg md:text-xl font-medium text-white leading-snug group-hover:text-white/85 transition-colors ${
          item.language === "ur" ? "font-normal" : ""
        }`}
        dir={item.language === "ur" ? "rtl" : "ltr"}
        lang={item.language === "ur" ? "ur" : "en"}
      >
        {item.title}
      </h3>
      <p className="text-sm text-white/65 mt-4 leading-relaxed flex-1">{item.description}</p>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-wider text-white/65 hover:text-white transition-colors"
      >
        Read Coverage
        <ExternalLink size={14} />
      </a>
    </article>
  );
}

export function RecognitionBlock() {
  return (
    <div className="border border-white/15 bg-white/[0.03] px-6 py-10 md:px-12 md:py-14 text-center">
      <p className="text-sm md:text-base uppercase tracking-[0.14em] md:tracking-[0.18em] text-white leading-relaxed max-w-4xl mx-auto text-balance">
        First and only Pakistani passport holder to complete a solo motorcycle loop across the United
        States
      </p>
      <p className="label-text text-sand mt-6">Historic Expedition · USA · 2026</p>
    </div>
  );
}

export function PressStats() {
  const stats = [
    { value: "16,000 km", label: "Solo Distance" },
    { value: "33 Days", label: "Expedition Duration" },
    { value: "Suzuki DR650", label: "Expedition Motorcycle" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-primary px-6 py-8 text-center">
          <p className="text-2xl md:text-3xl font-medium text-white">{stat.value}</p>
          <p className="label-text mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export function MediaContactCTA() {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="heading-md">Media & Interviews</h2>
      <p className="body-lg mt-4">
        For interviews, documentary collaborations, speaking engagements or editorial features
        regarding Shan-e-Ali&apos;s expeditions, please get in touch through the website contact
        page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary text-xs uppercase tracking-[0.12em] font-medium hover:bg-white/90 transition-all"
        >
          Contact
        </Link>
        <Link
          href="/#social"
          className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white text-xs uppercase tracking-[0.12em] hover:border-white hover:bg-white/10 transition-all"
        >
          Follow the Journey
        </Link>
      </div>
    </div>
  );
}
