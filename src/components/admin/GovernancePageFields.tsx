"use client";

import { Plus, Trash2 } from "lucide-react";
import { AdminAccordion } from "@/components/admin/AdminAccordion";
import {
  createId,
  listToLines,
  linesToList,
  type GovernancePageData,
} from "@/lib/cms/page-forms";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

export function GovernancePageFields({
  value,
  onChange,
}: {
  value: GovernancePageData;
  onChange: (next: GovernancePageData) => void;
}) {
  function updateBody(
    id: string,
    patch: Partial<GovernancePageData["bodies"][number]>
  ) {
    onChange({
      bodies: value.bodies.map((body) =>
        body.id === id ? { ...body, ...patch } : body
      ),
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-navy">
            Governance bodies ({value.bodies.length})
          </p>
          <p className="text-[11px] text-navy/50">
            Expand a body to edit. Members: one per line.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            onChange({
              bodies: [
                ...value.bodies,
                {
                  id: createId("body"),
                  title: "",
                  description: "",
                  members: [],
                },
              ],
            })
          }
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add body
        </button>
      </div>

      <div className="space-y-2">
        {value.bodies.map((body, index) => (
          <AdminAccordion
            key={body.id}
            variant="item"
            title={body.title || `Body ${index + 1}`}
            summary={`${body.members.length} member${body.members.length === 1 ? "" : "s"}`}
            actions={
              <button
                type="button"
                onClick={() => {
                  if (value.bodies.length <= 1) return;
                  onChange({
                    bodies: value.bodies.filter((item) => item.id !== body.id),
                  });
                }}
                disabled={value.bodies.length <= 1}
                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Remove
              </button>
            }
          >
            <div className="space-y-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-navy/70">
                  Title
                </label>
                <input
                  className={fieldClass}
                  value={body.title}
                  onChange={(e) =>
                    updateBody(body.id, { title: e.target.value })
                  }
                  placeholder="Board of Trustees"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-navy/70">
                  Description
                </label>
                <textarea
                  className={fieldClass}
                  rows={2}
                  value={body.description}
                  onChange={(e) =>
                    updateBody(body.id, { description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-navy/70">
                  Members (one per line)
                </label>
                <textarea
                  className={fieldClass}
                  rows={3}
                  value={listToLines(body.members)}
                  onChange={(e) =>
                    updateBody(body.id, {
                      members: linesToList(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </AdminAccordion>
        ))}
      </div>
    </div>
  );
}
