"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Archive, Check, Inbox, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { FORM_TYPE_LABELS, type FormType } from "@/lib/submissions";
import { cn } from "@/lib/utils";

export type InboxItem = {
  id: string;
  type: FormType;
  status: "NEW" | "READ" | "ARCHIVED";
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
  relatedSlug: string | null;
  relatedTitle: string | null;
  payload: Record<string, unknown>;
  createdAt: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-GH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function InboxPanel({
  type,
  items: initialItems,
}: {
  type: FormType;
  items: InboxItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialItems[0]?.id ?? null
  );
  const [filter, setFilter] = useState<"ALL" | "NEW" | "READ" | "ARCHIVED">(
    "ALL"
  );
  const [pending, startTransition] = useTransition();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(
    () =>
      items.filter((item) => (filter === "ALL" ? true : item.status === filter)),
    [filter, items]
  );

  const selected =
    filtered.find((item) => item.id === selectedId) || filtered[0] || null;

  async function updateStatus(id: string, status: InboxItem["status"]) {
    const res = await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    startTransition(() => router.refresh());
  }

  async function removeItem() {
    if (!pendingDeleteId) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/submissions?id=${pendingDeleteId}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (!res.ok) return;
    setItems((prev) => prev.filter((item) => item.id !== pendingDeleteId));
    setSelectedId(null);
    setPendingDeleteId(null);
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Inbox
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-navy sm:text-3xl">
            {FORM_TYPE_LABELS[type]}
          </h1>
          <p className="mt-1 text-sm text-navy/60">
            {items.filter((item) => item.status === "NEW").length} new ·{" "}
            {items.length} total
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["ALL", "NEW", "READ", "ARCHIVED"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold",
                filter === value
                  ? "bg-navy text-white"
                  : "bg-navy/10 text-navy hover:bg-navy/15"
              )}
            >
              {value === "ALL" ? "All" : value.charAt(0) + value.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-navy/15 bg-white px-6 py-16 text-center">
          <Inbox className="mx-auto h-8 w-8 text-navy/30" aria-hidden="true" />
          <p className="mt-3 font-medium text-navy">No submissions yet</p>
          <p className="mt-1 text-sm text-navy/55">
            New entries from the public site will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <ul className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm">
            {filtered.map((item) => {
              const active = selected?.id === item.id;
              return (
                <li key={item.id} className="border-b border-navy/8 last:border-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(item.id);
                      if (item.status === "NEW") {
                        void updateStatus(item.id, "READ");
                      }
                    }}
                    className={cn(
                      "w-full px-4 py-3 text-left transition-colors",
                      active ? "bg-teal/10" : "hover:bg-light"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-navy">
                        {item.name || "Anonymous"}
                      </p>
                      {item.status === "NEW" && (
                        <span className="rounded-full bg-teal px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-navy/55">
                      {item.subject || item.relatedTitle || item.email}
                    </p>
                    <p className="mt-1 text-[11px] text-navy/40">
                      {formatDate(item.createdAt)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          {selected && (
            <article className="rounded-2xl border border-navy/8 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-navy">
                    {selected.name || "Anonymous"}
                  </h2>
                  <p className="mt-1 text-sm text-navy/60">{selected.email}</p>
                  {selected.relatedTitle && (
                    <p className="mt-1 text-sm font-medium text-teal">
                      {selected.relatedTitle}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-navy/45">
                    {formatDate(selected.createdAt)} · {selected.status}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => void updateStatus(selected.id, "READ")}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-navy/15 px-3 py-2 text-xs font-semibold text-navy hover:bg-light"
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    Mark read
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => void updateStatus(selected.id, "ARCHIVED")}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-navy/15 px-3 py-2 text-xs font-semibold text-navy hover:bg-light"
                  >
                    <Archive className="h-3.5 w-3.5" aria-hidden="true" />
                    Archive
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => setPendingDeleteId(selected.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </div>

              {selected.message && (
                <p className="mt-5 whitespace-pre-wrap rounded-xl bg-light p-4 text-sm leading-relaxed text-navy">
                  {selected.message}
                </p>
              )}

              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {Object.entries(selected.payload).map(([key, value]) => {
                  if (
                    value === null ||
                    value === undefined ||
                    value === "" ||
                    typeof value === "object"
                  ) {
                    return null;
                  }
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-navy/8 px-3 py-2.5"
                    >
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-navy/45">
                        {key}
                      </dt>
                      <dd className="mt-1 break-words text-sm text-navy">
                        {String(value)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </article>
          )}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="Delete this submission?"
        description="This permanently removes the inbox submission. This can’t be undone."
        confirmLabel="Delete submission"
        pending={deleting}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => void removeItem()}
      />
    </div>
  );
}
