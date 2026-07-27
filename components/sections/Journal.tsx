"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/types";

interface JournalProps {
  posts: BlogPost[];
}

const categoryLabels = {
  journal: "Travel Journal",
  photography: "Photography",
  "behind-the-scenes": "Behind the Scenes",
  "motorcycle-tips": "Motorcycle Tips",
};

export default function Journal({ posts }: JournalProps) {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-16 md:mb-24"
        >
          <div>
            <span className="label-text">Journal</span>
            <h2 className="heading-lg mt-6">Stories from the road.</h2>
          </div>
          <Link
            href="/blog"
            data-cursor
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-wider text-muted hover:text-sand transition-colors"
          >
            View all <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} data-cursor className="group block">
                <div className="relative aspect-[16/10] overflow-hidden mb-4">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <span className="label-text text-[10px]">
                  {categoryLabels[post.category]}
                </span>
                <h3 className="text-xl font-light text-off-white mt-2 group-hover:text-sand transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                <span className="text-xs text-muted mt-3 block">
                  {post.date} · {post.readTime}
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
