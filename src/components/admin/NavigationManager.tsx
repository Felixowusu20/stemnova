"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

type NavNode = {
  id: string;
  label: string;
  href: string;
  sortOrder: number;
  isVisible: boolean;
  children?: NavNode[];
};

type PendingAction =
  | { type: "delete"; id: string; label: string }
  | { type: "reset" }
  | null;

export function NavigationManager({ initial }: { initial: NavNode[] }) {
  const router = useRouter();
  const [items] = useState(initial);
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");
  const [parentId, setParentId] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const res = await fetch("/api/admin/navigation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label,
        href,
        parentId: parentId || null,
        sortOrder: items.length,
        isVisible: true,
      }),
    });
    if (!res.ok) {
      setMessage("Could not create nav item.");
      return;
    }
    setLabel("");
    setHref("");
    setParentId("");
    setMessage("Navigation item added.");
    router.refresh();
    window.location.reload();
  }

  async function runPendingAction() {
    if (!pendingAction) return;
    setBusy(true);
    setMessage("");

    try {
      if (pendingAction.type === "reset") {
        const res = await fetch("/api/admin/navigation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "reset" }),
        });
        if (!res.ok) {
          setMessage("Could not reset navigation.");
          return;
        }
        setMessage("Navigation reset to site defaults.");
      } else {
        await fetch(`/api/admin/navigation?id=${pendingAction.id}`, {
          method: "DELETE",
        });
      }
      router.refresh();
      window.location.reload();
    } finally {
      setBusy(false);
      setPendingAction(null);
    }
  }

  async function toggleVisible(item: NavNode) {
    await fetch("/api/admin/navigation", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        label: item.label,
        href: item.href,
        sortOrder: item.sortOrder,
        isVisible: !item.isVisible,
      }),
    });
    router.refresh();
    window.location.reload();
  }

  const dialog =
    pendingAction?.type === "reset"
      ? {
          title: "Reset navbar to defaults?",
          description:
            "This replaces the current navbar with About, Programmes, Events, Gallery, News, Resources, Get Involved, and Contact.",
          confirmLabel: "Reset navigation",
        }
      : pendingAction?.type === "delete"
        ? {
            title: "Delete this nav link?",
            description: `“${pendingAction.label}” will be removed from the public navbar. Child links under it are also removed.`,
            confirmLabel: "Delete link",
          }
        : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-navy/8 bg-white p-5 shadow-sm">
        <div>
          <p className="font-display text-base font-semibold text-navy">
            Default site tabs
          </p>
          <p className="mt-1 text-sm text-navy/60">
            Sync the public navbar with CMS collections: Gallery, Resources,
            and the rest.
          </p>
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={() => setPendingAction({ type: "reset" })}
          className="rounded-xl border border-navy/15 px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5 disabled:opacity-50"
        >
          Reset to defaults
        </button>
      </div>

      <form
        onSubmit={onCreate}
        className="rounded-2xl border border-navy/8 bg-white p-6 shadow-sm"
      >
        <h2 className="font-display text-lg font-semibold text-navy">
          Add link
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="rounded-xl border border-navy/15 px-3 py-2.5 text-sm"
          />
          <input
            required
            placeholder="Href (/about)"
            value={href}
            onChange={(e) => setHref(e.target.value)}
            className="rounded-xl border border-navy/15 px-3 py-2.5 text-sm"
          />
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="rounded-xl border border-navy/15 px-3 py-2.5 text-sm sm:col-span-2"
          >
            <option value="">Top-level item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                Child of: {item.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white"
        >
          Add to navigation
        </button>
      </form>

      {message && (
        <p className="rounded-xl bg-teal/10 px-4 py-3 text-sm text-navy">
          {message}
        </p>
      )}

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-navy/8 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-navy">{item.label}</p>
                <p className="text-sm text-navy/55">{item.href}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => void toggleVisible(item)}
                  className="rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-semibold"
                >
                  {item.isVisible ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPendingAction({
                      type: "delete",
                      id: item.id,
                      label: item.label,
                    })
                  }
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            {item.children && item.children.length > 0 && (
              <ul className="mt-3 space-y-2 border-l border-navy/10 pl-4">
                {item.children.map((child) => (
                  <li
                    key={child.id}
                    className="flex flex-wrap items-center justify-between gap-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy">
                        {child.label}
                      </p>
                      <p className="text-xs text-navy/50">{child.href}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setPendingAction({
                          type: "delete",
                          id: child.id,
                          label: child.label,
                        })
                      }
                      className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {dialog && (
        <ConfirmDialog
          open={Boolean(pendingAction)}
          title={dialog.title}
          description={dialog.description}
          confirmLabel={dialog.confirmLabel}
          pending={busy}
          onCancel={() => setPendingAction(null)}
          onConfirm={() => void runPendingAction()}
        />
      )}
    </div>
  );
}
