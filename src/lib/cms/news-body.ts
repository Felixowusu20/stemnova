import { createId } from "@/lib/cms/page-forms";

export type NewsParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type NewsImageBlock = {
  type: "image";
  url: string;
  alt?: string;
  caption?: string;
  /** Width of the article image as a percent of the content column. */
  width?: number;
  /** Optional explicit height in pixels. Omit to keep the image's own ratio. */
  height?: number;
};

export type NewsTableBlock = {
  type: "table";
  headers: string[];
  rows: string[][];
};

export type NewsContentBlock =
  | NewsParagraphBlock
  | NewsImageBlock
  | NewsTableBlock;

export type NewsEditorBlock = NewsContentBlock & { id: string };

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

function isDisclaimer(text: string) {
  const value = text.trim();
  if (!value) return true;
  return (
    /this article contains illustrative/i.test(value) ||
    (/website development/i.test(value) && /illustrative|placeholder/i.test(value))
  );
}

export function emptyParagraph(): NewsEditorBlock & { type: "paragraph" } {
  return { id: createId("p"), type: "paragraph", text: "" };
}

export function clampImageWidth(value: unknown, fallback = 100) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(100, Math.max(20, Math.round(numeric)));
}

export function clampImageHeight(value: unknown) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return undefined;
  return Math.min(1600, Math.max(80, Math.round(numeric)));
}

export function emptyImage(): NewsEditorBlock & { type: "image" } {
  return {
    id: createId("img"),
    type: "image",
    url: "",
    alt: "",
    caption: "",
    width: 100,
  };
}

export function emptyTable(cols = 3, rows = 3): NewsEditorBlock & { type: "table" } {
  return {
    id: createId("table"),
    type: "table",
    headers: Array.from({ length: cols }, (_, index) => `Column ${index + 1}`),
    rows: Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")),
  };
}

export function withBlockId(block: NewsContentBlock): NewsEditorBlock {
  return { ...block, id: createId(block.type) };
}

export function stripBlockIds(blocks: NewsEditorBlock[]): NewsContentBlock[] {
  return blocks
    .map((block) => {
      if (block.type === "paragraph") {
        return { type: "paragraph" as const, text: block.text.trim() };
      }
      if (block.type === "image") {
        return {
          type: "image" as const,
          url: block.url.trim(),
          alt: block.alt?.trim() || "",
          caption: block.caption?.trim() || "",
          width: clampImageWidth(block.width),
          height: clampImageHeight(block.height),
        };
      }
      return {
        type: "table" as const,
        headers: block.headers.map((cell) => cell.trim()),
        rows: block.rows.map((row) => row.map((cell) => cell.trim())),
      };
    })
    .filter((block) => {
      if (block.type === "paragraph") return Boolean(block.text);
      if (block.type === "image") return Boolean(block.url);
      return block.headers.some(Boolean) || block.rows.some((row) => row.some(Boolean));
    });
}

export function newsBlocksToPlainBody(blocks: NewsContentBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "image") return block.caption || block.alt || "";
      return [...block.headers, ...block.rows.map((row) => row.join(" | "))].join("\n");
    })
    .filter(Boolean)
    .join("\n\n");
}

export function newsParagraphs(blocks: NewsContentBlock[], limit?: number): string[] {
  const paragraphs = blocks
    .filter((block): block is NewsParagraphBlock => block.type === "paragraph")
    .map((block) => block.text.trim())
    .filter(Boolean);
  return typeof limit === "number" ? paragraphs.slice(0, limit) : paragraphs;
}

export function parseNewsContent(
  content: unknown,
  body?: string | null
): NewsContentBlock[] {
  if (Array.isArray(content) && content.length > 0) {
    const first = content[0];
    if (typeof first === "string") {
      return (content as string[])
        .map((text) => text.trim())
        .filter((text) => text && !isDisclaimer(text))
        .map((text) => ({ type: "paragraph" as const, text }));
    }
    if (first && typeof first === "object") {
      const blocks: NewsContentBlock[] = [];
      for (const item of content) {
        const record = asRecord(item);
        if (record.type === "image") {
          const url = typeof record.url === "string" ? record.url.trim() : "";
          if (!url) continue;
          blocks.push({
            type: "image",
            url,
            alt: typeof record.alt === "string" ? record.alt : "",
            caption: typeof record.caption === "string" ? record.caption : "",
            width: clampImageWidth(record.width),
            height: clampImageHeight(record.height),
          });
          continue;
        }
        if (record.type === "table") {
          const headers = Array.isArray(record.headers)
            ? record.headers.map((cell) => String(cell ?? ""))
            : [];
          const rows = Array.isArray(record.rows)
            ? record.rows.map((row) =>
                Array.isArray(row) ? row.map((cell) => String(cell ?? "")) : []
              )
            : [];
          if (headers.length === 0 && rows.length === 0) continue;
          const width = Math.max(headers.length, ...rows.map((row) => row.length), 1);
          blocks.push({
            type: "table",
            headers: Array.from({ length: width }, (_, index) => headers[index] || ""),
            rows: rows.map((row) =>
              Array.from({ length: width }, (_, index) => row[index] || "")
            ),
          });
          continue;
        }
        const text =
          typeof record.text === "string"
            ? record.text
            : typeof item === "string"
              ? item
              : "";
        if (text.trim() && !isDisclaimer(text)) {
          blocks.push({ type: "paragraph", text: text.trim() });
        }
      }
      if (blocks.length > 0) return blocks;
    }
  }

  if (body?.trim()) {
    return body
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter((text) => text && !isDisclaimer(text))
      .map((text) => ({ type: "paragraph" as const, text }));
  }

  return [];
}

export function parseNewsEditorBlocks(
  content: unknown,
  body?: string | null
): NewsEditorBlock[] {
  const blocks = parseNewsContent(content, body);
  return blocks.length > 0 ? blocks.map(withBlockId) : [emptyParagraph()];
}
