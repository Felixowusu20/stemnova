"use client";

import { type LeadershipPageData } from "@/lib/cms/page-forms";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

export function LeadershipPageFields({
  value,
  onChange,
}: {
  value: LeadershipPageData;
  onChange: (next: LeadershipPageData) => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div>
        <p className="text-sm font-semibold text-navy">Leadership page</p>
        <p className="text-[11px] text-navy/50">
          Section headings shown on /about/leadership. Team members are edited
          in the Leadership collection.
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-navy/10 bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
          Founder section
        </p>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Eyebrow
          </label>
          <input
            className={fieldClass}
            value={value.foundersEyebrow}
            onChange={(e) =>
              onChange({ ...value, foundersEyebrow: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Title
          </label>
          <input
            className={fieldClass}
            value={value.foundersTitle}
            onChange={(e) =>
              onChange({ ...value, foundersTitle: e.target.value })
            }
            placeholder="Meet Our Founder"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Description
          </label>
          <textarea
            className={fieldClass}
            rows={2}
            value={value.foundersDescription}
            onChange={(e) =>
              onChange({ ...value, foundersDescription: e.target.value })
            }
            placeholder="Building pathways for African STEM talent."
          />
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-navy/10 bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
          Institutional leadership section
        </p>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Eyebrow
          </label>
          <input
            className={fieldClass}
            value={value.teamEyebrow}
            onChange={(e) =>
              onChange({ ...value, teamEyebrow: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Title
          </label>
          <input
            className={fieldClass}
            value={value.teamTitle}
            onChange={(e) => onChange({ ...value, teamTitle: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Description
          </label>
          <textarea
            className={fieldClass}
            rows={2}
            value={value.teamDescription}
            onChange={(e) =>
              onChange({ ...value, teamDescription: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
