import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-light text-off-white mt-12 mb-4">{children}</h2>
  ),
  p: ({ children }) => (
    <p className="text-base md:text-lg font-light leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 pl-2">{children}</ul>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="text-off-white font-medium">{children}</strong>
  ),
};

export default async function MDXContent({ content }: { content: string }) {
  return (
    <div className="prose-adventure">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
