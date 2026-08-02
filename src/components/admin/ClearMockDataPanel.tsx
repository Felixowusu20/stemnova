"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

type PendingClear = "content" | "media" | null;

export function ClearMockDataPanel({
  contentCount,
  seededMediaCount,
}: {
  contentCount: number;
  seededMediaCount: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [pendingClear, setPendingClear] = useState<PendingClear>(null);

  async function runClear() {
    if (!pendingClear) return;
    setBusy(true);
    setMessage("");

    try {
      if (pendingClear === "content") {
        const res = await fetch("/api/admin/content?scope=all", {
          method: "DELETE",
        });
        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          setMessage(result.error || "Failed to clear content");
          return;
        }
        setMessage(`Deleted ${result.deleted ?? 0} content item(s).`);
      } else {
        const res = await fetch("/api/admin/media?scope=seeded", {
          method: "DELETE",
        });
        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          setMessage(result.error || "Failed to clear seeded media");
          return;
        }
        setMessage(`Deleted ${result.deleted ?? 0} seeded media row(s).`);
      }
      startTransition(() => router.refresh());
    } finally {
      setBusy(false);
      setPendingClear(null);
    }
  }

  const dialog =
    pendingClear === "content"
      ? {
          title: "Delete all CMS content?",
          description: `This permanently removes ${contentCount} content item(s). Site settings, navigation, admin users, and media uploads stay intact.`,
          confirmLabel: "Delete all content",
        }
      : pendingClear === "media"
        ? {
            title: "Clear seeded media?",
            description: `This removes ${seededMediaCount} seeded media catalog row(s). Uploaded Cloudinary assets are kept.`,
            confirmLabel: "Clear seeded media",
          }
        : null;

  return (
    <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-navy">
        Clear mock / seed data
      </h2>
      <p className="mt-2 text-sm text-navy/60">
        Remove seeded CMS content and catalogued seed media from the database.
        Site settings, navigation, admin users, and real uploads are left alone.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={pending || busy || contentCount === 0}
          onClick={() => setPendingClear("content")}
          className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Delete all content ({contentCount})
        </button>
        <button
          type="button"
          disabled={pending || busy || seededMediaCount === 0}
          onClick={() => setPendingClear("media")}
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
        >
          Clear seeded media ({seededMediaCount})
        </button>
      </div>

      {message ? <p className="mt-3 text-sm text-navy/65">{message}</p> : null}

      {dialog && (
        <ConfirmDialog
          open={Boolean(pendingClear)}
          title={dialog.title}
          description={dialog.description}
          confirmLabel={dialog.confirmLabel}
          pending={busy}
          onCancel={() => setPendingClear(null)}
          onConfirm={() => void runClear()}
        />
      )}
    </div>
  );
}
