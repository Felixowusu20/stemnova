"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

type MediaAsset = {
  id: string;
  secureUrl: string;
  title?: string | null;
  alt?: string | null;
  bytes?: number | null;
  createdAt: string;
};

export function MediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [pendingDelete, setPendingDelete] = useState<MediaAsset | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/media");
    const data = await res.json();
    setAssets(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onUpload(file: File) {
    setUploading(true);
    setMessage("");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "stemnova/media");
      body.append("title", file.name);
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setMessage("Upload complete.");
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    await fetch(`/api/admin/media?id=${pendingDelete.id}`, { method: "DELETE" });
    setDeleting(false);
    setPendingDelete(null);
    await load();
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setMessage("URL copied to clipboard.");
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-dashed border-navy/20 bg-white p-6">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 text-center">
          <span className="font-display text-lg font-semibold text-navy">
            {uploading ? "Uploading…" : "Drop or choose an image"}
          </span>
          <span className="text-sm text-navy/55">
            JPG, PNG, WebP via Cloudinary
          </span>
          <input
            type="file"
            accept="image/*"
            className="mt-2"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onUpload(file);
            }}
          />
        </label>
      </div>

      {message && (
        <p className="rounded-xl bg-teal/10 px-4 py-3 text-sm text-navy">
          {message}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-navy/55">Loading media…</p>
      ) : assets.length === 0 ? (
        <p className="text-sm text-navy/55">No media uploaded yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset) => (
            <li
              key={asset.id}
              className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-light">
                <Image
                  src={asset.secureUrl}
                  alt={asset.alt || asset.title || "Media asset"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-3 p-4">
                <p className="truncate text-sm font-medium text-navy">
                  {asset.title || "Untitled"}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void copyUrl(asset.secureUrl)}
                    className="rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Copy URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(asset)}
                    className="rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-semibold text-navy/70"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this media asset?"
        description={`“${pendingDelete?.title || "This file"}” will be removed from the media library.`}
        confirmLabel="Delete media"
        pending={deleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => void confirmDelete()}
      />
    </div>
  );
}
