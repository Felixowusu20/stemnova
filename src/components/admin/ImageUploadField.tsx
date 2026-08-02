"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  label: string;
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  helpText?: string;
  className?: string;
};

export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "stemnova/content",
  helpText = "Upload an image to replace the current one.",
  className,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      body.append("title", file.name);
      body.append("alt", label);
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.secureUrl as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-navy">{label}</p>
      <div className="overflow-hidden rounded-2xl border border-navy/10 bg-light">
        <div className="relative flex aspect-[16/10] items-center justify-center bg-navy/[0.03]">
          {value ? (
            <Image
              src={value}
              alt={label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-navy/40">
              <ImagePlus className="h-8 w-8" aria-hidden="true" />
              <span className="text-sm">No image yet</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 className="h-6 w-6 animate-spin text-navy" />
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-navy/8 bg-white p-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-navy px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#0d3354]">
            <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
            {value ? "Replace image" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
                e.currentTarget.value = "";
              }}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-navy/15 px-3 py-2 text-xs font-semibold text-navy/70 hover:bg-navy/5"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Remove
            </button>
          )}
        </div>
      </div>
      <p className="text-xs text-navy/50">{helpText}</p>
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
