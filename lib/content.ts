import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Expedition, BlogPost } from "./types";

const contentDir = path.join(process.cwd(), "content");

function parseExpedition(slug: string, raw: string): Expedition & { content: string } {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    story: content.trim(),
    coverImage: data.coverImage,
    heroVideo: data.heroVideo,
    featured: data.featured ?? false,
    status: data.status ?? "completed",
    startDate: String(data.startDate),
    endDate: data.endDate ? String(data.endDate) : undefined,
    countries: data.countries ?? [],
    countryFlags: data.countryFlags ?? [],
    route: data.route ?? "",
    distance: data.distance ?? 0,
    days: data.days ?? 0,
    motorcycle: data.motorcycle ?? "",
    coordinates: data.coordinates ?? [],
    mapCenter: data.mapCenter ?? { lat: 0, lng: 0 },
    stats: data.stats ?? [],
    gallery: data.gallery ?? [],
    videos: data.videos ?? [],
    timeline: (data.timeline ?? []).map(
      (item: { date: unknown; title: string; description: string }) => ({
        ...item,
        date: String(item.date),
      })
    ),
    seo: data.seo ?? { title: data.title, description: data.description, keywords: [] },
    content,
  };
}

function parseBlogPost(slug: string, raw: string): BlogPost & { content: string } {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    date: String(data.date),
    category: data.category,
    readTime: data.readTime,
    content: content.trim(),
  };
}

export function getExpeditions(): Expedition[] {
  const dir = path.join(contentDir, "expeditions");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      return parseExpedition(slug, raw);
    })
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export function getExpedition(slug: string): (Expedition & { content: string }) | null {
  const filePath = path.join(contentDir, "expeditions", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return parseExpedition(slug, raw);
}

export function getFeaturedExpedition(): Expedition | null {
  const expeditions = getExpeditions();
  return expeditions.find((e) => e.featured) ?? expeditions[0] ?? null;
}

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(contentDir, "blog");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      return parseBlogPost(slug, raw);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): (BlogPost & { content: string }) | null {
  const filePath = path.join(contentDir, "blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return parseBlogPost(slug, raw);
}

export function getAllGalleryImages(): string[] {
  const expeditions = getExpeditions();
  return expeditions.flatMap((e) => e.gallery);
}

export function getExpeditionSlugs(): string[] {
  return getExpeditions().map((e) => e.slug);
}

export function getBlogSlugs(): string[] {
  return getBlogPosts().map((p) => p.slug);
}
