"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminAccordion } from "@/components/admin/AdminAccordion";
import {
  type AboutStoryPageData,
} from "@/lib/cms/page-forms";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

export function AboutStoryPageFields({
  value,
  onChange,
}: {
  value: AboutStoryPageData;
  onChange: (next: AboutStoryPageData) => void;
}) {
  const [section, setSection] = useState<"copy" | "timeline">("copy");

  function updateTimeline(
    index: number,
    patch: Partial<AboutStoryPageData["timeline"][number]>
  ) {
    onChange({
      ...value,
      timeline: value.timeline.map((item, i) =>
        i === index ? { ...item, ...patch, isIllustrative: true } : item
      ),
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-navy">Our Story</p>
          <p className="text-[11px] text-navy/50">
            Story paragraphs and journey timeline for /about/story.
          </p>
        </div>
        <select
          className={`${fieldClass} w-auto min-w-[10rem]`}
          value={section}
          onChange={(e) => setSection(e.target.value as "copy" | "timeline")}
        >
          <option value="copy">Story copy</option>
          <option value="timeline">
            Timeline ({value.timeline.length})
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
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-navy/70">
                Section eyebrow
              </label>
              <input
                className={fieldClass}
                value={value.sectionEyebrow}
                onChange={(e) =>
                  onChange({ ...value, sectionEyebrow: e.target.value })
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
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/70">
              Story paragraphs (one per blank line)
            </label>
            <textarea
              className={fieldClass}
              rows={10}
              value={value.paragraphs.join("\n\n")}
              onChange={(e) =>
                onChange({
                  ...value,
                  paragraphs: e.target.value
                    .split(/\n\s*\n/)
                    .map((part) => part.trim())
                    .filter(Boolean),
                })
              }
              placeholder="Separate paragraphs with a blank line."
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
                  timeline: [
                    ...value.timeline,
                    {
                      year: new Date().getFullYear(),
                      title: "",
                      description: "",
                      isIllustrative: true,
                    },
                  ],
                })
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add milestone
            </button>
          </div>
          {value.timeline.map((item, index) => (
            <AdminAccordion
              key={`${item.year}-${item.title}-${index}`}
              variant="item"
              title={item.title || `Milestone ${index + 1}`}
              summary={String(item.year)}
              actions={
                <button
                  type="button"
                  onClick={() => {
                    if (value.timeline.length <= 1) return;
                    onChange({
                      ...value,
                      timeline: value.timeline.filter((_, i) => i !== index),
                    });
                  }}
                  disabled={value.timeline.length <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 disabled:opacity-40"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Remove
                </button>
              }
            >
              <div className="space-y-2">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-navy/70">
                      Year
                    </label>
                    <input
                      type="number"
                      className={fieldClass}
                      value={item.year}
                      onChange={(e) =>
                        updateTimeline(index, {
                          year: Number(e.target.value) || item.year,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-navy/70">
                      Title
                    </label>
                    <input
                      className={fieldClass}
                      value={item.title}
                      onChange={(e) =>
                        updateTimeline(index, { title: e.target.value })
                      }
                    />
                  </div>
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
                      updateTimeline(index, { description: e.target.value })
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
