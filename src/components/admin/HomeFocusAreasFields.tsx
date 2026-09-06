"use client";

import { Plus, Trash2 } from "lucide-react";
import { AdminAccordion } from "@/components/admin/AdminAccordion";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  FOCUS_AREA_ICONS,
  createId,
  type HomeFocusAreasPageData,
} from "@/lib/cms/page-forms";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

export function HomeFocusAreasFields({
  value,
  onChange,
}: {
  value: HomeFocusAreasPageData;
  onChange: (next: HomeFocusAreasPageData) => void;
}) {
  function updatePillar(
    id: string,
    patch: Partial<HomeFocusAreasPageData["pillars"][number]>
  ) {
    onChange({
      ...value,
      pillars: value.pillars.map((pillar) =>
        pillar.id === id ? { ...pillar, ...patch } : pillar
      ),
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div>
        <p className="text-sm font-semibold text-navy">Homepage focus areas</p>
        <p className="text-[11px] text-navy/50">
          Section heading and focus areas on the homepage. Each card can include
          a background image — upload or replace it below.
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-navy/10 bg-white p-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Eyebrow
          </label>
          <input
            className={fieldClass}
            value={value.eyebrow}
            onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
            placeholder="Our Strategic Pillars"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
            Focus areas ({value.pillars.length})
          </p>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                pillars: [
                  ...value.pillars,
                  {
                    id: createId("pillar"),
                    title: "",
                    description: "",
                    icon: "sparkles",
                    imageUrl: "",
                  },
                ],
              })
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Add focus area
          </button>
        </div>

        {value.pillars.map((pillar, index) => (
          <AdminAccordion
            key={pillar.id}
            variant="item"
            title={pillar.title || `Focus area ${index + 1}`}
            summary={pillar.imageUrl ? "Has image" : pillar.icon}
            actions={
              <button
                type="button"
                onClick={() => {
                  if (value.pillars.length <= 1) return;
                  onChange({
                    ...value,
                    pillars: value.pillars.filter(
                      (item) => item.id !== pillar.id
                    ),
                  });
                }}
                disabled={value.pillars.length <= 1}
                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Remove
              </button>
            }
          >
            <div className="grid gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-navy/70">
                  Title
                </label>
                <input
                  className={fieldClass}
                  value={pillar.title}
                  onChange={(e) =>
                    updatePillar(pillar.id, { title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-navy/70">
                  Description
                </label>
                <textarea
                  className={fieldClass}
                  rows={2}
                  value={pillar.description}
                  onChange={(e) =>
                    updatePillar(pillar.id, { description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-navy/70">
                  Icon
                </label>
                <select
                  className={fieldClass}
                  value={pillar.icon}
                  onChange={(e) =>
                    updatePillar(pillar.id, {
                      icon: e.target.value as typeof pillar.icon,
                    })
                  }
                >
                  {FOCUS_AREA_ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <ImageUploadField
                label="Card image"
                value={pillar.imageUrl || ""}
                onChange={(url) =>
                  updatePillar(pillar.id, { imageUrl: url || "" })
                }
                folder="stemnova/focus-areas"
                helpText="Shown as the focus card background on the homepage."
              />
            </div>
          </AdminAccordion>
        ))}
      </div>
    </div>
  );
}
