import Image from "next/image";
import { parseNewsContent, type NewsContentBlock } from "@/lib/cms/news-body";

function renderParagraph(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function ArticleBody({
  blocks,
}: {
  blocks: NewsContentBlock[] | string[];
}) {
  const parsed = parseNewsContent(blocks);
  if (parsed.length === 0) return null;

  return (
    <div className="prose-custom mt-8 max-w-full space-y-6 overflow-hidden text-base leading-relaxed text-navy/85">
      {parsed.map((block, index) => {
        if (block.type === "image") {
          const width = Math.min(block.width ?? 100, 100);
          return (
            <figure
              key={`image-${index}`}
              className="mx-auto max-w-full overflow-hidden rounded-2xl bg-navy/5"
              style={{ width: `${width}%` }}
            >
              <div
                className="relative max-h-[36rem] w-full overflow-hidden"
                style={block.height ? { height: Math.min(block.height, 576) } : undefined}
              >
                <Image
                  src={block.url}
                  alt={block.alt || block.caption || ""}
                  width={1600}
                  height={1000}
                  className={
                    block.height
                      ? "h-full w-full max-w-full object-contain object-center"
                      : "h-auto max-h-[36rem] w-full max-w-full object-contain"
                  }
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>
              {block.caption ? (
                <figcaption className="px-4 py-2.5 text-center text-sm text-navy/60">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "table") {
          return (
            <div key={`table-${index}`} className="max-w-full overflow-x-auto rounded-xl border border-navy/10">
              <table className="min-w-full border-collapse text-sm">
                {block.headers.some(Boolean) ? (
                  <thead>
                    <tr className="bg-navy/5">
                      {block.headers.map((header, headerIndex) => (
                        <th
                          key={headerIndex}
                          className="border-b border-navy/10 px-3 py-2.5 text-left font-semibold text-navy"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="odd:bg-white even:bg-navy/[0.02]">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border-t border-navy/8 px-3 py-2.5 text-navy/80"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return <p key={`p-${index}`}>{renderParagraph(block.text)}</p>;
      })}
    </div>
  );
}
