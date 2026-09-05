"use client";

import { Check, Plus, Trash2 } from "lucide-react";
import { type ProgramFieldsData } from "@/lib/cms/page-forms";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

export function ProgramFields({
  value,
  onChange,
}: {
  value: ProgramFieldsData;
  onChange: (next: ProgramFieldsData) => void;
}) {
  function updateGoal(index: number, nextValue: string) {
    onChange({
      ...value,
      objectives: value.objectives.map((goal, i) =>
        i === index ? nextValue : goal
      ),
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div>
        <p className="text-sm font-semibold text-navy">Programme page</p>
        <p className="text-[11px] text-navy/50">
          Each goal you add is shown on the public programme page with a teal
          checkmark automatically — no extra formatting needed.
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-navy/10 bg-white p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
            Goals
          </p>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                objectives: [...value.objectives, ""],
              })
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Add goal
          </button>
        </div>
        <div className="space-y-2">
          {value.objectives.map((goal, index) => (
            <div key={`goal-${index}`} className="flex items-start gap-2">
              <span
                className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/15 text-teal"
                aria-hidden="true"
                title="Shown with this mark on the programme page"
              >
                <Check className="h-3 w-3 stroke-[2.5]" />
              </span>
              <input
                className={fieldClass}
                value={goal}
                onChange={(e) => updateGoal(index, e.target.value)}
                placeholder="Identify high-potential STEM students"
              />
              <button
                type="button"
                onClick={() => {
                  if (value.objectives.length <= 1) {
                    onChange({ ...value, objectives: [""] });
                    return;
                  }
                  onChange({
                    ...value,
                    objectives: value.objectives.filter((_, i) => i !== index),
                  });
                }}
                className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-lg border border-red-200 px-2 py-1.5 text-xs font-semibold text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">Remove goal</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-navy/10 bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
          Who it is for
        </p>
        <textarea
          className={fieldClass}
          rows={4}
          value={value.beneficiaries}
          onChange={(e) =>
            onChange({ ...value, beneficiaries: e.target.value })
          }
          placeholder="Secondary school students (ages 14–19) and first-year university students…"
        />
      </div>
    </div>
  );
}
