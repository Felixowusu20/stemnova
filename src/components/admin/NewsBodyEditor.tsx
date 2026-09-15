"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ImagePlus, Loader2, Plus, Table2, Trash2 } from "lucide-react";
import {
  clampImageHeight,
  clampImageWidth,
  emptyImage,
  emptyParagraph,
  emptyTable,
  type NewsEditorBlock,
} from "@/lib/cms/news-body";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

const toolbarButtonClass =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy hover:bg-navy/5";

type Caret = {
  blockId: string;
  start: number;
  end: number;
};

function withoutScrollJump(action: () => void) {
  const x = typeof window === "undefined" ? 0 : window.scrollX;
  const y = typeof window === "undefined" ? 0 : window.scrollY;
  action();
  requestAnimationFrame(() => {
    window.scrollTo(x, y);
    requestAnimationFrame(() => window.scrollTo(x, y));
  });
}

function autosizeTextarea(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height = `${Math.max(el.scrollHeight, 88)}px`;
}

export function NewsBodyEditor({
  value,
  onChange,
  selectedImageId,
  onSelectImage,
}: {
  value: NewsEditorBlock[];
  onChange: (next: NewsEditorBlock[]) => void;
  selectedImageId?: string | null;
  onSelectImage?: (id: string | null) => void;
}) {
  const caretRef = useRef<Caret | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingImageId = useRef<string | null>(null);
  const valueRef = useRef(value);
  valueRef.current = value;
  const textareaRefs = useRef(new Map<string, HTMLTextAreaElement>());
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");

  function rememberCaret(blockId: string, el: HTMLTextAreaElement) {
    caretRef.current = {
      blockId,
      start: el.selectionStart,
      end: el.selectionEnd,
    };
  }

  function liveCaret(): Caret | null {
    const active = document.activeElement;
    if (active instanceof HTMLTextAreaElement && active.dataset.blockId) {
      return {
        blockId: active.dataset.blockId,
        start: active.selectionStart,
        end: active.selectionEnd,
      };
    }
    return caretRef.current;
  }

  function updateBlock(id: string, next: NewsEditorBlock) {
    onChange(valueRef.current.map((block) => (block.id === id ? next : block)));
  }

  function removeBlock(id: string) {
    const next = valueRef.current.filter((block) => block.id !== id);
    if (selectedImageId === id) onSelectImage?.(null);
    onChange(next.length > 0 ? next : [emptyParagraph()]);
  }

  const insertAtCaret = useCallback(
    (block: NewsEditorBlock) => {
      const blocks = valueRef.current;
      const caret = liveCaret();
      const index = caret
        ? blocks.findIndex((item) => item.id === caret.blockId)
        : -1;

      if (!caret || index === -1) {
        const next = [...blocks, block];
        valueRef.current = next;
        onChange(next);
        return block.id;
      }

      const current = blocks[index];
      if (current.type !== "paragraph") {
        const next = [...blocks];
        next.splice(index + 1, 0, block);
        valueRef.current = next;
        onChange(next);
        return block.id;
      }

      const before = current.text.slice(0, caret.start);
      const after = current.text.slice(caret.end);
      const replacements: NewsEditorBlock[] = [];
      if (before.length > 0) {
        replacements.push({ ...current, text: before });
      }
      replacements.push(block);
      const following = emptyParagraph();
      following.text = after;
      replacements.push(following);

      const next = [...blocks];
      next.splice(index, 1, ...replacements);
      caretRef.current = {
        blockId: following.id,
        start: after.length,
        end: after.length,
      };
      valueRef.current = next;
      onChange(next);
      return block.id;
    },
    [onChange]
  );

  function insertParagraph() {
    withoutScrollJump(() => insertAtCaret(emptyParagraph()));
  }

  function insertTable() {
    withoutScrollJump(() => insertAtCaret(emptyTable()));
  }

  function insertImage() {
    withoutScrollJump(() => {
      const block = emptyImage();
      pendingImageId.current = insertAtCaret(block);
      onSelectImage?.(block.id);
      fileInputRef.current?.click();
    });
  }

  async function uploadFile(file: File, targetId: string) {
    setUploadingId(targetId);
    setUploadError("");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "stemnova/blog");
      body.append("title", file.name);
      body.append("alt", "In-article image");
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const next = valueRef.current.map((block) =>
        block.id === targetId && block.type === "image"
          ? { ...block, url: data.secureUrl as string }
          : block
      );
      valueRef.current = next;
      onChange(next);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingId(null);
      pendingImageId.current = null;
    }
  }

  useLayoutEffect(() => {
    textareaRefs.current.forEach((el) => autosizeTextarea(el));
  }, [value]);

  return (
    <div className="max-w-full space-y-2 [overflow-anchor:none]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-navy">Article body</p>
          <p className="text-[11px] text-navy/50">
            Click in the writing below, then insert an image, paragraph, or
            table at the cursor.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertParagraph}
            className={toolbarButtonClass}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Paragraph
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertImage}
            className={toolbarButtonClass}
          >
            <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
            Image
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertTable}
            className={toolbarButtonClass}
          >
            <Table2 className="h-3.5 w-3.5" aria-hidden="true" />
            Table
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        tabIndex={-1}
        className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
        onChange={(e) => {
          const file = e.target.files?.[0];
          const targetId = pendingImageId.current;
          e.currentTarget.value = "";
          if (file && targetId) {
            withoutScrollJump(() => {
              void uploadFile(file, targetId);
            });
          }
        }}
      />

      {uploadError ? (
        <p className="text-xs text-red-600" role="alert">
          {uploadError}
        </p>
      ) : null}

      <div className="max-w-full overflow-hidden rounded-xl border border-navy/15 bg-white">
        <div className="space-y-1 p-3">
          {value.map((block) => (
            <div key={block.id} className="group relative max-w-full">
              {block.type === "paragraph" ? (
                <textarea
                  data-block-id={block.id}
                  ref={(el) => {
                    if (el) {
                      textareaRefs.current.set(block.id, el);
                      autosizeTextarea(el);
                    } else {
                      textareaRefs.current.delete(block.id);
                    }
                  }}
                  className="w-full resize-none border-0 bg-transparent px-1 py-2 text-sm leading-relaxed text-navy outline-none placeholder:text-navy/35 focus:ring-0"
                  rows={3}
                  value={block.text}
                  onSelect={(e) => rememberCaret(block.id, e.currentTarget)}
                  onClick={(e) => rememberCaret(block.id, e.currentTarget)}
                  onKeyUp={(e) => rememberCaret(block.id, e.currentTarget)}
                  onBlur={(e) => rememberCaret(block.id, e.currentTarget)}
                  onChange={(e) => {
                    rememberCaret(block.id, e.currentTarget);
                    autosizeTextarea(e.currentTarget);
                    updateBlock(block.id, { ...block, text: e.target.value });
                  }}
                  placeholder="Write the article here. Place the cursor and insert an image where it should appear."
                />
              ) : null}

              {block.type === "image" ? (
                <ImagePreview
                  block={block}
                  selected={selectedImageId === block.id}
                  uploading={uploadingId === block.id}
                  onSelect={() => onSelectImage?.(block.id)}
                  onChange={(next) => updateBlock(block.id, next)}
                  onPickFile={() => {
                    onSelectImage?.(block.id);
                    pendingImageId.current = block.id;
                    withoutScrollJump(() => fileInputRef.current?.click());
                  }}
                />
              ) : null}

              {block.type === "table" ? (
                <div className="rounded-lg border border-navy/10 bg-light/40 p-2">
                  <TableEditor
                    block={block}
                    onChange={(next) => updateBlock(block.id, next)}
                  />
                </div>
              ) : null}

              {value.length > 1 ? (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => removeBlock(block.id)}
                  className="absolute right-0 top-1 hidden cursor-pointer rounded-md border border-red-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-red-700 group-hover:inline-flex"
                >
                  <Trash2 className="mr-1 h-3 w-3" aria-hidden="true" />
                  Remove
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImagePreview({
  block,
  selected,
  uploading,
  onSelect,
  onChange,
  onPickFile,
}: {
  block: Extract<NewsEditorBlock, { type: "image" }>;
  selected: boolean;
  uploading: boolean;
  onSelect: () => void;
  onChange: (next: Extract<NewsEditorBlock, { type: "image" }>) => void;
  onPickFile: () => void;
}) {
  const width = clampImageWidth(block.width);
  const frameRef = useRef<HTMLDivElement>(null);

  function startResize(event: ReactPointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    onSelect();
    const parent = frameRef.current?.parentElement;
    if (!parent) return;
    const parentWidth = parent.clientWidth;
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = width;
    const startHeight =
      block.height || frameRef.current?.getBoundingClientRect().height || 180;

    function onMove(ev: PointerEvent) {
      onChange({
        ...block,
        width: clampImageWidth(
          startWidth + ((ev.clientX - startX) / parentWidth) * 100
        ),
        height: clampImageHeight(startHeight + (ev.clientY - startY)),
      });
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  return (
    <div className="max-w-full py-1">
      <div
        className="relative mx-auto max-w-full"
        style={{ width: `${width}%` }}
      >
        <div
          ref={frameRef}
          role="button"
          tabIndex={0}
          onClick={block.url ? onSelect : onPickFile}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (block.url) onSelect();
              else onPickFile();
            }
          }}
          className={cn(
            "relative block w-full max-h-[22rem] cursor-pointer overflow-hidden rounded-lg bg-navy/[0.03]",
            selected ? "ring-2 ring-blue" : "ring-1 ring-navy/10"
          )}
          style={
            block.height ? { height: Math.min(block.height, 352) } : undefined
          }
        >
          {block.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={block.url}
              alt={block.alt || block.caption || "Article image"}
              className={cn(
                "mx-auto block max-h-[22rem] max-w-full",
                block.height ? "h-full object-contain" : "h-auto w-auto object-contain"
              )}
            />
          ) : (
            <span className="flex h-24 w-full flex-col items-center justify-center gap-2 text-navy/45">
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              ) : (
                <ImagePlus className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="text-xs font-medium">
                {uploading ? "Uploading…" : "Choose image"}
              </span>
            </span>
          )}
          {uploading && block.url ? (
            <span className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 className="h-5 w-5 animate-spin text-navy" />
            </span>
          ) : null}
        </div>
        <button
          type="button"
          aria-label="Resize image"
          onPointerDown={startResize}
          className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 cursor-se-resize rounded-sm border border-navy/30 bg-white shadow-sm"
        />
      </div>
    </div>
  );
}

export function NewsImageEditPanel({
  blocks,
  selectedId,
  onChange,
}: {
  blocks: NewsEditorBlock[];
  selectedId?: string | null;
  onChange: (next: NewsEditorBlock[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const block = blocks.find(
    (item): item is Extract<NewsEditorBlock, { type: "image" }> =>
      item.type === "image" && item.id === selectedId
  );

  if (!block) {
    return (
      <div className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-navy">Article image</p>
        <p className="mt-1 text-xs text-navy/50">
          Click an image in the article body to edit its size, caption, or file.
        </p>
      </div>
    );
  }

  const width = clampImageWidth(block.width);

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "stemnova/blog");
      body.append("title", file.name);
      body.append("alt", "In-article image");
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(
        blocks.map((item) =>
          item.id === block.id && item.type === "image"
            ? { ...item, url: data.secureUrl as string }
            : item
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function update(next: Extract<NewsEditorBlock, { type: "image" }>) {
    onChange(blocks.map((item) => (item.id === next.id ? next : item)));
  }

  return (
    <div className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-navy">Article image</p>
      <p className="mt-1 text-xs text-navy/50">
        Size and replace the image selected in the article body.
      </p>

      <div className="relative mt-4 overflow-hidden rounded-xl bg-navy/[0.03]">
        {block.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={block.url}
            alt={block.alt || block.caption || "Article image"}
            className="mx-auto max-h-40 w-full object-contain"
          />
        ) : (
          <div className="flex h-28 items-center justify-center text-xs text-navy/40">
            No image yet
          </div>
        )}
        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <Loader2 className="h-5 w-5 animate-spin text-navy" />
          </div>
        ) : null}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        tabIndex={-1}
        className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.currentTarget.value = "";
          if (file) void handleFile(file);
        }}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={`${toolbarButtonClass} mt-3`}
      >
        <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
        {block.url ? "Replace image" : "Upload image"}
      </button>

      <label className="mt-4 block text-xs font-medium text-navy/70">
        Width
        <div className="mt-1 flex items-center gap-2">
          <input
            type="range"
            min={20}
            max={100}
            value={width}
            onChange={(e) =>
              update({ ...block, width: clampImageWidth(e.target.value) })
            }
            className="h-2 w-full cursor-pointer accent-navy"
          />
          <input
            type="number"
            min={20}
            max={100}
            value={width}
            onChange={(e) =>
              update({ ...block, width: clampImageWidth(e.target.value) })
            }
            className="w-14 rounded-lg border border-navy/15 px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-blue"
          />
          <span className="text-[11px] text-navy/45">%</span>
        </div>
      </label>

      <label className="mt-3 block text-xs font-medium text-navy/70">
        Height
        <div className="mt-1 flex items-center gap-1.5">
          <input
            type="number"
            min={80}
            max={1600}
            value={block.height ?? ""}
            onChange={(e) =>
              update({
                ...block,
                height: e.target.value
                  ? clampImageHeight(e.target.value)
                  : undefined,
              })
            }
            placeholder="Auto"
            className="w-full rounded-lg border border-navy/15 px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-blue"
          />
          <span className="text-[11px] text-navy/45">px</span>
        </div>
      </label>

      <label className="mt-3 block text-xs font-medium text-navy/70">
        Caption
        <input
          className={`${fieldClass} mt-1`}
          value={block.caption || ""}
          onChange={(e) => update({ ...block, caption: e.target.value })}
          placeholder="What this image shows"
        />
      </label>

      <label className="mt-3 block text-xs font-medium text-navy/70">
        Alt text
        <input
          className={`${fieldClass} mt-1`}
          value={block.alt || ""}
          onChange={(e) => update({ ...block, alt: e.target.value })}
          placeholder="Describe the image"
        />
      </label>

      {error ? (
        <p className="mt-2 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TableEditor({
  block,
  onChange,
}: {
  block: Extract<NewsEditorBlock, { type: "table" }>;
  onChange: (next: Extract<NewsEditorBlock, { type: "table" }>) => void;
}) {
  const cols = Math.max(block.headers.length, 1);

  function setHeader(index: number, value: string) {
    const headers = [...block.headers];
    headers[index] = value;
    onChange({ ...block, headers });
  }

  function setCell(rowIndex: number, colIndex: number, value: string) {
    const rows = block.rows.map((row, index) =>
      index === rowIndex
        ? row.map((cell, cellIndex) => (cellIndex === colIndex ? value : cell))
        : row
    );
    onChange({ ...block, rows });
  }

  function addColumn() {
    onChange({
      ...block,
      headers: [...block.headers, `Column ${block.headers.length + 1}`],
      rows: block.rows.map((row) => [...row, ""]),
    });
  }

  function removeColumn() {
    if (cols <= 1) return;
    onChange({
      ...block,
      headers: block.headers.slice(0, -1),
      rows: block.rows.map((row) => row.slice(0, -1)),
    });
  }

  function addRow() {
    onChange({
      ...block,
      rows: [...block.rows, Array.from({ length: cols }, () => "")],
    });
  }

  function removeRow() {
    if (block.rows.length <= 1) return;
    onChange({ ...block, rows: block.rows.slice(0, -1) });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={addRow} className={toolbarButtonClass}>
          Add row
        </button>
        <button type="button" onClick={removeRow} className={toolbarButtonClass}>
          Remove row
        </button>
        <button type="button" onClick={addColumn} className={toolbarButtonClass}>
          Add column
        </button>
        <button type="button" onClick={removeColumn} className={toolbarButtonClass}>
          Remove column
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              {block.headers.map((header, index) => (
                <th key={`h-${index}`} className="border border-navy/15 p-1">
                  <input
                    className="w-full min-w-[7rem] rounded-md border border-navy/10 bg-navy/5 px-2 py-1.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue"
                    value={header}
                    onChange={(e) => setHeader(index, e.target.value)}
                    placeholder={`Header ${index + 1}`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`r-${rowIndex}`}>
                {Array.from({ length: cols }, (_, colIndex) => (
                  <td key={`c-${rowIndex}-${colIndex}`} className="border border-navy/15 p-1">
                    <input
                      className="w-full min-w-[7rem] rounded-md px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue"
                      value={row[colIndex] || ""}
                      onChange={(e) =>
                        setCell(rowIndex, colIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
