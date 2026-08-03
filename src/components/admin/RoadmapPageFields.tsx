"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminAccordion } from "@/components/admin/AdminAccordion";
import {
  createId,
  listToLines,
  linesToList,
  type RoadmapPageData,
} from "@/lib/cms/page-forms";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

export function RoadmapPageFields({
  value,
  onChange,
}: {
  value: RoadmapPageData;
  onChange: (next: RoadmapPageData) => void;
}) {
  const [section, setSection] = useState<"timeline" | "phases">("timeline");

  function updateTimeline(
    index: number,
    patch: Partial<RoadmapPageData["timeline"][number]>
  ) {
    onChange({
      ...value,
      timeline: value.timeline.map((item, i) =>
        i === index ? { ...item, ...patch, isIllustrative: true } : item
      ),
    });
  }

  function updatePhase(
    id: string,
    patch: Partial<RoadmapPageData["phases"][number]>
  ) {
    onChange({
      ...value,
      phases: value.phases.map((phase) =>
        phase.id === id ? { ...phase, ...patch } : phase
      ),
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Edit roadmap section
        </label>
        <select
          className={fieldClass}
          value={section}
          onChange={(e) =>
            setSection(e.target.value as "timeline" | "phases")
          }
        >
          <option value="timeline">
            Journey timeline ({value.timeline.length})
          </option>
          <option value="phases">
            Roadmap phases ({value.phases.length})
          </option>
        </select>
      </div>

      {section === "timeline" && (
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
              key={`timeline-${index}`}
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
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Year
                  </label>
                  <input
                    type="number"
                    className={fieldClass}
                    value={item.year}
                    onChange={(e) =>
                      updateTimeline(index, { year: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
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
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Description
                  </label>
                  <textarea
                    className={fieldClass}
                    rows={2}
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

      {section === "phases" && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...value,
                  phases: [
                    ...value.phases,
                    {
                      id: createId("phase"),
                      phase: value.phases.length + 1,
                      title: "",
                      timeframe: "",
                      description: "",
                      milestones: [],
                    },
                  ],
                })
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add phase
            </button>
          </div>
          {value.phases.map((phase) => (
            <AdminAccordion
              key={phase.id}
              variant="item"
              title={phase.title || `Phase ${phase.phase}`}
              summary={
                phase.timeframe || `${phase.milestones.length} milestones`
              }
              actions={
                <button
                  type="button"
                  onClick={() => {
                    if (value.phases.length <= 1) return;
                    onChange({
                      ...value,
                      phases: value.phases.filter((item) => item.id !== phase.id),
                    });
                  }}
                  disabled={value.phases.length <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 disabled:opacity-40"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Remove
                </button>
              }
            >
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Phase #
                  </label>
                  <input
                    type="number"
                    min={1}
                    className={fieldClass}
                    value={phase.phase}
                    onChange={(e) =>
                      updatePhase(phase.id, {
                        phase: Number(e.target.value) || 1,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Timeframe
                  </label>
                  <input
                    className={fieldClass}
                    value={phase.timeframe}
                    onChange={(e) =>
                      updatePhase(phase.id, { timeframe: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Title
                  </label>
                  <input
                    className={fieldClass}
                    value={phase.title}
                    onChange={(e) =>
                      updatePhase(phase.id, { title: e.target.value })
                    }
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Description
                  </label>
                  <textarea
                    className={fieldClass}
                    rows={2}
                    value={phase.description}
                    onChange={(e) =>
                      updatePhase(phase.id, { description: e.target.value })
                    }
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Milestones (one per line)
                  </label>
                  <textarea
                    className={fieldClass}
                    rows={3}
                    value={listToLines(phase.milestones)}
                    onChange={(e) =>
                      updatePhase(phase.id, {
                        milestones: linesToList(e.target.value),
                      })
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
