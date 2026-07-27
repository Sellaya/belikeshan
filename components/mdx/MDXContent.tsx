function renderMarkdown(content: string) {
  const blocks = content.split("\n\n").filter(Boolean);

  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl md:text-3xl font-light text-off-white mt-12 mb-4">
          {block.replace("## ", "")}
        </h2>
      );
    }

    if (block.startsWith("- ")) {
      const items = block.split("\n").map((line) => line.replace(/^- /, ""));
      return (
        <ul key={i} className="list-disc list-inside space-y-2 pl-2">
          {items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="text-base md:text-lg font-light leading-relaxed">
        {block}
      </p>
    );
  });
}

export default function MDXContent({ content }: { content: string }) {
  return <div className="prose-adventure">{renderMarkdown(content)}</div>;
}
