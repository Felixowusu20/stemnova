"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminAccordion } from "@/components/admin/AdminAccordion";
import {
  type VisionMissionPageData,
} from "@/lib/cms/page-forms";
import type { CoreValue } from "@/types";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

const ICON_OPTIONS: CoreValue["icon"][] = [
  "excellence",
  "equity",
  "integrity",
  "collaboration",
  "innovation",
  "leadership",
];

export function VisionMissionPageFields({
  value,
  onChange,
}: {
  value: VisionMissionPageData;
  onChange: (next: VisionMissionPageData) => void;
}) {
  const [section, setSection] = useState<"copy" | "values">("copy");

  function updateValue(
    index: number,
    patch: Partial<VisionMissionPageData["coreValues"][number]>
  ) {
    onChange({
      ...value,
      coreValues: value.coreValues.map((item, i) =>
        i === index ? { ...item, ...patch } : item
      ),
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-navy">Vision & Mission</p>
          <p className="text-[11px] text-navy/50">
            Edit page copy and core values shown on /about/vision.
          </p>
        </div>
        <select
          className={`${fieldClass} w-auto min-w-[10rem]`}
          value={section}
          onChange={(e) => setSection(e.target.value as "copy" | "values")}
        >
          <option value="copy">Page copy</option>
          <option value="values">
            Core values ({value.coreValues.length})
          </option>
        </select>
      </div>

      {section === "copy" ? (
        <div className="space-y-3 rounded-xl border border-navy/10 bg-white p-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/70">
              Hero description
            </label>
            <textarea
              className={fieldClass}
              rows={2}
              value={value.heroDescription}
              onChange={(e) =>
                onChange({ ...value, heroDescription: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/70">
              Section title
            </label>
            <input
              className={fieldClass}
              value={value.sectionTitle}
              onChange={(e) =>
                onChange({ ...value, sectionTitle: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/70">
              Vision
            </label>
            <textarea
              className={fieldClass}
              rows={3}
              value={value.vision}
              onChange={(e) => onChange({ ...value, vision: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/70">
              Mission
            </label>
            <textarea
              className={fieldClass}
              rows={4}
              value={value.mission}
              onChange={(e) => onChange({ ...value, mission: e.target.value })}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...value,
                  coreValues: [
                    ...value.coreValues,
                    { title: "", description: "", icon: "excellence" },
                  ],
                })
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add value
            </button>
          </div>
          {value.coreValues.map((item, index) => (
            <AdminAccordion
              key={`${item.title}-${index}`}
              variant="item"
              title={item.title || `Value ${index + 1}`}
              summary={item.icon}
              actions={
                <button
                  type="button"
                  onClick={() => {
                    if (value.coreValues.length <= 1) return;
                    onChange({
                      ...value,
                      coreValues: value.coreValues.filter((_, i) => i !== index),
                    });
                  }}
                  disabled={value.coreValues.length <= 1}
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
                    value={item.title}
                    onChange={(e) =>
                      updateValue(index, { title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Icon
                  </label>
                  <select
                    className={fieldClass}
                    value={item.icon}
                    onChange={(e) =>
                      updateValue(index, {
                        icon: e.target.value as CoreValue["icon"],
                      })
                    }
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Description
                  </label>
                  <textarea
                    className={fieldClass}
                    rows={3}
                    value={item.description}
                    onChange={(e) =>
                      updateValue(index, { description: e.target.value })
                    }
                  />
                </div>
              </div>
            </AdminAccordion>
          ))}
        </div>
      )}
    </div>
  );
}
