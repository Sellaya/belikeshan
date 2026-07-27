import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="heading-lg mb-4">Lost on the road.</h1>
      <p className="text-muted mb-8">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="px-8 py-3.5 bg-white text-primary text-xs uppercase tracking-[0.12em] font-medium hover:bg-white/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
