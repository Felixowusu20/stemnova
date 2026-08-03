"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminAccordion } from "@/components/admin/AdminAccordion";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createId, type ImpactPageData } from "@/lib/cms/page-forms";
import type { ProgramSlug } from "@/types";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

const PROGRAM_SLUGS: ProgramSlug[] = [
  "young-scholars-stem-discovery",
  "stemnova-mentorship-network",
  "african-stem-fellows",
  "quantum-education-leaders",
  "materials-science-solid-state",
  "girls-discover-science",
  "stem-teachers-academy",
  "young-african-researchers-fellowship",
  "innovation-sustainable-development",
];

type ImpactSection =
  | "statistics"
  | "programBreakdown"
  | "locations"
  | "successStories"
  | "beforeAfterStories"
  | "annualReports"
  | "donationUsage";

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-700"
    >
      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      Remove
    </button>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
    >
      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}

export function ImpactPageFields({
  value,
  onChange,
}: {
  value: ImpactPageData;
  onChange: (next: ImpactPageData) => void;
}) {
  const [section, setSection] = useState<ImpactSection>("statistics");

  const options: { id: ImpactSection; label: string; count: number }[] = [
    { id: "statistics", label: "Statistics", count: value.statistics.length },
    {
      id: "programBreakdown",
      label: "Programme breakdown",
      count: value.programBreakdown.length,
    },
    { id: "locations", label: "Locations", count: value.locations.length },
    {
      id: "successStories",
      label: "Success stories",
      count: value.successStories.length,
    },
    {
      id: "beforeAfterStories",
      label: "Before & after",
      count: value.beforeAfterStories.length,
    },
    {
      id: "annualReports",
      label: "Annual reports",
      count: value.annualReports.length,
    },
    {
      id: "donationUsage",
      label: "Donation usage",
      count: value.donationUsage.length,
    },
  ];

  return (
    <div className="space-y-3 rounded-xl border border-navy/10 bg-light/50 p-3">
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Edit impact section
        </label>
        <select
          className={fieldClass}
          value={section}
          onChange={(e) => setSection(e.target.value as ImpactSection)}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label} ({option.count})
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-[11px] text-navy/50">
          Only one section opens at a time to keep the editor short.
        </p>
      </div>

      {section === "statistics" && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <AddButton
              label="Add statistic"
              onClick={() =>
                onChange({
                  ...value,
                  statistics: [
                    ...value.statistics,
                    {
                      label: "",
                      value: 0,
                      suffix: "",
                      prefix: "",
                      note: "",
                      isIllustrative: true,
                    },
                  ],
                })
              }
            />
          </div>
          {value.statistics.map((stat, index) => (
            <AdminAccordion
              key={`stat-${index}`}
              variant="item"
              title={stat.label || `Statistic ${index + 1}`}
              summary={`${stat.prefix || ""}${stat.value}${stat.suffix || ""}`}
              actions={<RemoveButton onClick={() =>
                onChange({
                  ...value,
                  statistics: value.statistics.filter((_, i) => i !== index),
                })
              } />}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Label
                  </label>
                  <input
                    className={fieldClass}
                    value={stat.label}
                    onChange={(e) => {
                      const statistics = [...value.statistics];
                      statistics[index] = {
                        ...stat,
                        label: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, statistics });
                    }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-navy/70">
                      Prefix
                    </label>
                    <input
                      className={fieldClass}
                      value={stat.prefix || ""}
                      onChange={(e) => {
                        const statistics = [...value.statistics];
                        statistics[index] = {
                          ...stat,
                          prefix: e.target.value,
                          isIllustrative: true,
                        };
                        onChange({ ...value, statistics });
                      }}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-navy/70">
                      Value
                    </label>
                    <input
                      type="number"
                      className={fieldClass}
                      value={stat.value}
                      onChange={(e) => {
                        const statistics = [...value.statistics];
                        statistics[index] = {
                          ...stat,
                          value: Number(e.target.value) || 0,
                          isIllustrative: true,
                        };
                        onChange({ ...value, statistics });
                      }}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-navy/70">
                      Suffix
                    </label>
                    <input
                      className={fieldClass}
                      value={stat.suffix || ""}
                      onChange={(e) => {
                        const statistics = [...value.statistics];
                        statistics[index] = {
                          ...stat,
                          suffix: e.target.value,
                          isIllustrative: true,
                        };
                        onChange({ ...value, statistics });
                      }}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Note
                  </label>
                  <input
                    className={fieldClass}
                    value={stat.note || ""}
                    onChange={(e) => {
                      const statistics = [...value.statistics];
                      statistics[index] = {
                        ...stat,
                        note: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, statistics });
                    }}
                  />
                </div>
              </div>
            </AdminAccordion>
          ))}
        </div>
      )}

      {section === "programBreakdown" && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <AddButton
              label="Add programme"
              onClick={() =>
                onChange({
                  ...value,
                  programBreakdown: [
                    ...value.programBreakdown,
                    {
                      programSlug: "young-scholars-stem-discovery",
                      programTitle: "",
                      percentage: 0,
                      description: "",
                      isIllustrative: true,
                    },
                  ],
                })
              }
            />
          </div>
          {value.programBreakdown.map((item, index) => (
            <AdminAccordion
              key={`breakdown-${index}`}
              variant="item"
              title={item.programTitle || `Programme ${index + 1}`}
              summary={`${item.percentage}%`}
              actions={
                <RemoveButton
                  onClick={() =>
                    onChange({
                      ...value,
                      programBreakdown: value.programBreakdown.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                />
              }
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Programme title
                  </label>
                  <input
                    className={fieldClass}
                    value={item.programTitle}
                    onChange={(e) => {
                      const programBreakdown = [...value.programBreakdown];
                      programBreakdown[index] = {
                        ...item,
                        programTitle: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, programBreakdown });
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Percentage
                  </label>
                  <input
                    type="number"
                    className={fieldClass}
                    value={item.percentage}
                    onChange={(e) => {
                      const programBreakdown = [...value.programBreakdown];
                      programBreakdown[index] = {
                        ...item,
                        percentage: Number(e.target.value) || 0,
                        isIllustrative: true,
                      };
                      onChange({ ...value, programBreakdown });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Programme slug
                  </label>
                  <select
                    className={fieldClass}
                    value={item.programSlug}
                    onChange={(e) => {
                      const programBreakdown = [...value.programBreakdown];
                      programBreakdown[index] = {
                        ...item,
                        programSlug: e.target.value as ProgramSlug,
                        isIllustrative: true,
                      };
                      onChange({ ...value, programBreakdown });
                    }}
                  >
                    {PROGRAM_SLUGS.map((slug) => (
                      <option key={slug} value={slug}>
                        {slug}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Description
                  </label>
                  <textarea
                    className={fieldClass}
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const programBreakdown = [...value.programBreakdown];
                      programBreakdown[index] = {
                        ...item,
                        description: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, programBreakdown });
                    }}
                  />
                </div>
              </div>
            </AdminAccordion>
          ))}
        </div>
      )}

      {section === "locations" && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <AddButton
              label="Add location"
              onClick={() =>
                onChange({
                  ...value,
                  locations: [
                    ...value.locations,
                    {
                      name: "",
                      region: "",
                      girlsReached: 0,
                      schoolsPartnered: 0,
                      isIllustrative: true,
                    },
                  ],
                })
              }
            />
          </div>
          {value.locations.map((location, index) => (
            <AdminAccordion
              key={`location-${index}`}
              variant="item"
              title={location.name || `Location ${index + 1}`}
              summary={location.region || undefined}
              actions={
                <RemoveButton
                  onClick={() =>
                    onChange({
                      ...value,
                      locations: value.locations.filter((_, i) => i !== index),
                    })
                  }
                />
              }
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Name
                  </label>
                  <input
                    className={fieldClass}
                    value={location.name}
                    onChange={(e) => {
                      const locations = [...value.locations];
                      locations[index] = {
                        ...location,
                        name: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, locations });
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Region
                  </label>
                  <input
                    className={fieldClass}
                    value={location.region}
                    onChange={(e) => {
                      const locations = [...value.locations];
                      locations[index] = {
                        ...location,
                        region: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, locations });
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Students reached
                  </label>
                  <input
                    type="number"
                    className={fieldClass}
                    value={location.girlsReached}
                    onChange={(e) => {
                      const locations = [...value.locations];
                      locations[index] = {
                        ...location,
                        girlsReached: Number(e.target.value) || 0,
                        isIllustrative: true,
                      };
                      onChange({ ...value, locations });
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Schools partnered
                  </label>
                  <input
                    type="number"
                    className={fieldClass}
                    value={location.schoolsPartnered}
                    onChange={(e) => {
                      const locations = [...value.locations];
                      locations[index] = {
                        ...location,
                        schoolsPartnered: Number(e.target.value) || 0,
                        isIllustrative: true,
                      };
                      onChange({ ...value, locations });
                    }}
                  />
                </div>
              </div>
            </AdminAccordion>
          ))}
        </div>
      )}

      {section === "successStories" && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <AddButton
              label="Add story"
              onClick={() =>
                onChange({
                  ...value,
                  successStories: [
                    ...value.successStories,
                    {
                      id: createId("story"),
                      title: "",
                      summary: "",
                      imageUrl: "",
                      isIllustrative: true,
                    },
                  ],
                })
              }
            />
          </div>
          {value.successStories.map((story, index) => (
            <AdminAccordion
              key={story.id}
              variant="item"
              title={story.title || `Story ${index + 1}`}
              summary={story.summary ? story.summary.slice(0, 48) : undefined}
              actions={
                <RemoveButton
                  onClick={() =>
                    onChange({
                      ...value,
                      successStories: value.successStories.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                />
              }
            >
              <div className="space-y-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Title
                  </label>
                  <input
                    className={fieldClass}
                    value={story.title}
                    onChange={(e) => {
                      const successStories = [...value.successStories];
                      successStories[index] = {
                        ...story,
                        title: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, successStories });
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Summary
                  </label>
                  <textarea
                    className={fieldClass}
                    rows={2}
                    value={story.summary}
                    onChange={(e) => {
                      const successStories = [...value.successStories];
                      successStories[index] = {
                        ...story,
                        summary: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, successStories });
                    }}
                  />
                </div>
                <ImageUploadField
                  label="Story image"
                  value={story.imageUrl}
                  folder="stemnova/impact"
                  onChange={(url) => {
                    const successStories = [...value.successStories];
                    successStories[index] = {
                      ...story,
                      imageUrl: url || "",
                      isIllustrative: true,
                    };
                    onChange({ ...value, successStories });
                  }}
                />
              </div>
            </AdminAccordion>
          ))}
        </div>
      )}

      {section === "beforeAfterStories" && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <AddButton
              label="Add pair"
              onClick={() =>
                onChange({
                  ...value,
                  beforeAfterStories: [
                    ...value.beforeAfterStories,
                    {
                      id: createId("ba"),
                      title: "",
                      before: "",
                      after: "",
                      isIllustrative: true,
                    },
                  ],
                })
              }
            />
          </div>
          {value.beforeAfterStories.map((story, index) => (
            <AdminAccordion
              key={story.id}
              variant="item"
              title={story.title || `Before & after ${index + 1}`}
              actions={
                <RemoveButton
                  onClick={() =>
                    onChange({
                      ...value,
                      beforeAfterStories: value.beforeAfterStories.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                />
              }
            >
              <div className="space-y-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Title
                  </label>
                  <input
                    className={fieldClass}
                    value={story.title}
                    onChange={(e) => {
                      const beforeAfterStories = [...value.beforeAfterStories];
                      beforeAfterStories[index] = {
                        ...story,
                        title: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, beforeAfterStories });
                    }}
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-navy/70">
                      Before
                    </label>
                    <textarea
                      className={fieldClass}
                      rows={2}
                      value={story.before}
                      onChange={(e) => {
                        const beforeAfterStories = [
                          ...value.beforeAfterStories,
                        ];
                        beforeAfterStories[index] = {
                          ...story,
                          before: e.target.value,
                          isIllustrative: true,
                        };
                        onChange({ ...value, beforeAfterStories });
                      }}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-navy/70">
                      After
                    </label>
                    <textarea
                      className={fieldClass}
                      rows={2}
                      value={story.after}
                      onChange={(e) => {
                        const beforeAfterStories = [
                          ...value.beforeAfterStories,
                        ];
                        beforeAfterStories[index] = {
                          ...story,
                          after: e.target.value,
                          isIllustrative: true,
                        };
                        onChange({ ...value, beforeAfterStories });
                      }}
                    />
                  </div>
                </div>
              </div>
            </AdminAccordion>
          ))}
        </div>
      )}

      {section === "annualReports" && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <AddButton
              label="Add report"
              onClick={() =>
                onChange({
                  ...value,
                  annualReports: [
                    ...value.annualReports,
                    {
                      year: new Date().getFullYear(),
                      title: "",
                      summary: "",
                      downloadUrl: "#",
                      isIllustrative: true,
                    },
                  ],
                })
              }
            />
          </div>
          {value.annualReports.map((report, index) => (
            <AdminAccordion
              key={`report-${index}`}
              variant="item"
              title={report.title || `Report ${index + 1}`}
              summary={String(report.year)}
              actions={
                <RemoveButton
                  onClick={() =>
                    onChange({
                      ...value,
                      annualReports: value.annualReports.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                />
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
                    value={report.year}
                    onChange={(e) => {
                      const annualReports = [...value.annualReports];
                      annualReports[index] = {
                        ...report,
                        year:
                          Number(e.target.value) || new Date().getFullYear(),
                        isIllustrative: true,
                      };
                      onChange({ ...value, annualReports });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Title
                  </label>
                  <input
                    className={fieldClass}
                    value={report.title}
                    onChange={(e) => {
                      const annualReports = [...value.annualReports];
                      annualReports[index] = {
                        ...report,
                        title: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, annualReports });
                    }}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Summary
                  </label>
                  <textarea
                    className={fieldClass}
                    rows={2}
                    value={report.summary}
                    onChange={(e) => {
                      const annualReports = [...value.annualReports];
                      annualReports[index] = {
                        ...report,
                        summary: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, annualReports });
                    }}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Download URL
                  </label>
                  <input
                    className={fieldClass}
                    value={report.downloadUrl}
                    onChange={(e) => {
                      const annualReports = [...value.annualReports];
                      annualReports[index] = {
                        ...report,
                        downloadUrl: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, annualReports });
                    }}
                  />
                </div>
              </div>
            </AdminAccordion>
          ))}
        </div>
      )}

      {section === "donationUsage" && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <AddButton
              label="Add category"
              onClick={() =>
                onChange({
                  ...value,
                  donationUsage: [
                    ...value.donationUsage,
                    {
                      category: "",
                      percentage: 0,
                      description: "",
                      isIllustrative: true,
                    },
                  ],
                })
              }
            />
          </div>
          {value.donationUsage.map((item, index) => (
            <AdminAccordion
              key={`donation-${index}`}
              variant="item"
              title={item.category || `Category ${index + 1}`}
              summary={`${item.percentage}%`}
              actions={
                <RemoveButton
                  onClick={() =>
                    onChange({
                      ...value,
                      donationUsage: value.donationUsage.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                />
              }
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Category
                  </label>
                  <input
                    className={fieldClass}
                    value={item.category}
                    onChange={(e) => {
                      const donationUsage = [...value.donationUsage];
                      donationUsage[index] = {
                        ...item,
                        category: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, donationUsage });
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Percentage
                  </label>
                  <input
                    type="number"
                    className={fieldClass}
                    value={item.percentage}
                    onChange={(e) => {
                      const donationUsage = [...value.donationUsage];
                      donationUsage[index] = {
                        ...item,
                        percentage: Number(e.target.value) || 0,
                        isIllustrative: true,
                      };
                      onChange({ ...value, donationUsage });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-navy/70">
                    Description
                  </label>
                  <textarea
                    className={fieldClass}
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const donationUsage = [...value.donationUsage];
                      donationUsage[index] = {
                        ...item,
                        description: e.target.value,
                        isIllustrative: true,
                      };
                      onChange({ ...value, donationUsage });
                    }}
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
