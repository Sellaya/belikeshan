import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import MarkdownContent from "@/components/content/MarkdownContent";
import { getBlogPost, getBlogSlugs } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

const categoryLabels = {
  journal: "Travel Journal",
  photography: "Photography",
  "behind-the-scenes": "Behind the Scenes",
  "motorcycle-tips": "Motorcycle Tips",
};

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navigation />
      <main className="pt-nav">
        <div className="relative h-[40vh] md:h-[50vh]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 overlay-image-bottom" />
          <div className="absolute bottom-0 left-0 right-0 container-wide pb-10 md:pb-12 text-white">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Back to Journal
            </Link>
            <span className="label-on-image">{categoryLabels[post.category]}</span>
            <h1 className="heading-lg mt-4 mb-3 text-white">{post.title}</h1>
            <p className="text-sm text-white/65">
              {post.date} · {post.readTime}
            </p>
          </div>
        </div>

        <article className="container-wide max-w-3xl py-16 md:py-24">
          <MarkdownContent content={post.content} />
        </article>
      </main>
      <Footer />
    </>
  );
}
