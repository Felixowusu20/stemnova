"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export type CollectionListItem = {
  id: string;
  title: string;
  slug: string | null;
  status: string;
  updatedAt: string;
  badge?: string | null;
};

type PendingDelete =
  | { type: "one"; id: string; title: string }
  | { type: "all" }
  | null;

export function CollectionItemsTable({
  collection,
  items: initialItems,
}: {
  collection: string;
  items: CollectionListItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [pendingDelete, setPendingDelete] = useState<PendingDelete>(null);

  async function runDelete() {
    if (!pendingDelete) return;
    setBusy(true);
    setMessage("");

    try {
      if (pendingDelete.type === "one") {
        const res = await fetch(
          `/api/admin/content?id=${encodeURIComponent(pendingDelete.id)}`,
          { method: "DELETE" }
        );
        if (!res.ok) {
          const result = await res.json().catch(() => ({}));
          setMessage(result.error || "Delete failed");
          return;
        }
        setItems((prev) => prev.filter((item) => item.id !== pendingDelete.id));
        setMessage("Deleted.");
      } else {
        const res = await fetch(
          `/api/admin/content?collection=${encodeURIComponent(collection)}`,
          { method: "DELETE" }
        );
        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          setMessage(result.error || "Clear failed");
          return;
        }
        setItems([]);
        setMessage(`Cleared ${result.deleted ?? 0} item(s).`);
      }
      startTransition(() => router.refresh());
    } finally {
      setBusy(false);
      setPendingDelete(null);
    }
  }

  const dialog =
    pendingDelete?.type === "one"
      ? {
          title: "Delete this item?",
          description: `“${pendingDelete.title}” will be removed from the admin and the public site. This can’t be undone.`,
          confirmLabel: "Delete item",
        }
      : pendingDelete?.type === "all"
        ? {
            title: "Clear this collection?",
            description: `All ${items.length} item(s) in this collection will be permanently deleted from the site.`,
            confirmLabel: "Clear collection",
          }
        : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {message ? (
          <p className="text-sm text-navy/60">{message}</p>
        ) : (
          <span />
        )}
        {items.length > 0 && (
          <button
            type="button"
            disabled={pending || busy}
            onClick={() => setPendingDelete({ type: "all" })}
            className="rounded-xl border border-red-200 px-3.5 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
          >
            Clear collection
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-light text-navy/60">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-navy/5">
                <td className="px-4 py-3 font-medium text-navy">
                  <span className="inline-flex flex-wrap items-center gap-2">
                    {item.title}
                    {item.badge ? (
                      <span className="rounded-full bg-navy/8 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy/70">
                        {item.badge}
                      </span>
                    ) : null}
                  </span>
                </td>
                <td className="px-4 py-3 text-navy/55">{item.slug || "—"}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs font-semibold text-teal">
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-navy/55">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/content/${collection}/${item.id}`}
                      className="font-semibold text-blue hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      disabled={pending || busy}
                      onClick={() =>
                        setPendingDelete({
                          type: "one",
                          id: item.id,
                          title: item.title,
                        })
                      }
                      className="inline-flex items-center gap-1 font-semibold text-red-600 hover:underline disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-navy/50">
                  No items yet. Create the first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {dialog && (
        <ConfirmDialog
          open={Boolean(pendingDelete)}
          title={dialog.title}
          description={dialog.description}
          confirmLabel={dialog.confirmLabel}
          pending={busy}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => void runDelete()}
        />
      )}
    </div>
  );
}
