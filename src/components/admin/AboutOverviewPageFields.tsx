"use client";

import { Plus, Trash2 } from "lucide-react";
import { AdminAccordion } from "@/components/admin/AdminAccordion";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  createId,
  type AboutOverviewPageData,
} from "@/lib/cms/page-forms";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

export function AboutOverviewPageFields({
  value,
  onChange,
}: {
  value: AboutOverviewPageData;
  onChange: (next: AboutOverviewPageData) => void;
}) {
  function updateLink(
    id: string,
    patch: Partial<AboutOverviewPageData["links"][number]>
  ) {
    onChange({
      ...value,
      links: value.links.map((link) =>
        link.id === id ? { ...link, ...patch } : link
      ),
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div>
        <p className="text-sm font-semibold text-navy">About overview</p>
        <p className="text-[11px] text-navy/50">
          Hero, intro section, and navigation cards for /about.
        </p>
      </div>

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
            Intro text
          </label>
          <textarea
            className={fieldClass}
            rows={4}
            value={value.intro}
            onChange={(e) => onChange({ ...value, intro: e.target.value })}
          />
        </div>
        <ImageUploadField
          label="Section image"
          value={value.imageUrl}
          onChange={(url) => onChange({ ...value, imageUrl: url || "" })}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
            Section links ({value.links.length})
          </p>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                links: [
                  ...value.links,
                  {
                    id: createId("link"),
                    title: "",
                    description: "",
                    href: "",
                  },
                ],
              })
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Add link
          </button>
        </div>

        {value.links.map((link, index) => (
          <AdminAccordion
            key={link.id}
            variant="item"
            title={link.title || `Link ${index + 1}`}
            summary={link.href || "No path set"}
            actions={
              <button
                type="button"
                onClick={() => {
                  if (value.links.length <= 1) return;
                  onChange({
                    ...value,
                    links: value.links.filter((item) => item.id !== link.id),
                  });
                }}
                disabled={value.links.length <= 1}
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
                  value={link.title}
                  onChange={(e) =>
                    updateLink(link.id, { title: e.target.value })
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
                  value={link.description}
                  onChange={(e) =>
                    updateLink(link.id, { description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-navy/70">
                  Path
                </label>
                <input
                  className={fieldClass}
                  value={link.href}
                  onChange={(e) =>
                    updateLink(link.id, { href: e.target.value })
                  }
                  placeholder="/about/story"
                />
              </div>
            </div>
          </AdminAccordion>
        ))}
      </div>
    </div>
  );
}
