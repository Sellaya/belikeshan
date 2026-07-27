import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Travel Journal",
  description:
    "Adventure stories, photography, behind-the-scenes, and motorcycle tips from the road.",
};

const categoryLabels = {
  journal: "Travel Journal",
  photography: "Photography",
  "behind-the-scenes": "Behind the Scenes",
  "motorcycle-tips": "Motorcycle Tips",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container-wide">
          <span className="label-text">Journal</span>
          <h1 className="heading-lg mt-6 mb-16">Stories from the road.</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
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
                  <h2 className="text-xl font-light text-off-white mt-2 group-hover:text-white transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                  <span className="text-xs text-muted mt-3 block">
                    {post.date} · {post.readTime}
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
