"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { AdminAccordion } from "@/components/admin/AdminAccordion";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createId } from "@/lib/cms/page-forms";
import {
  CHALLENGE_ICONS,
  HOME_SECTION_TABS,
  RESEARCH_ICONS,
  isHomeSectionId,
  type HomePageData,
  type HomeSectionId,
} from "@/lib/cms/home-sections";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue";

const COLLECTION_LINKS: Partial<
  Record<HomeSectionId, { href: string; label: string }>
> = {
  hero: { href: "/admin/settings", label: "Edit hero slides in Site settings" },
  focusAreas: {
    href: "/admin/content/pages",
    label: "Open the Focus Areas editor",
  },
  programmes: {
    href: "/admin/content/programs",
    label: "Manage programme cards",
  },
  impact: { href: "/admin/content/pages", label: "Edit impact statistics" },
  successStory: {
    href: "/admin/content/pages",
    label: "Edit success stories on the Impact page",
  },
  testimonials: {
    href: "/admin/content/testimonials",
    label: "Manage testimonials",
  },
  partners: { href: "/admin/content/partners", label: "Manage partners" },
  news: { href: "/admin/content/blog", label: "Manage news articles" },
};

export function HomePageFields({
  value,
  onChange,
  focusAreasHref,
}: {
  value: HomePageData;
  onChange: (next: HomePageData) => void;
  focusAreasHref?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("section") || "hero";
  const active: HomeSectionId = isHomeSectionId(requested) ? requested : "hero";

  function selectSection(id: HomeSectionId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function setVisible(id: HomeSectionId, visible: boolean) {
    onChange({
      ...value,
      visible: { ...value.visible, [id]: visible },
    });
  }

  const collectionLink =
    active === "focusAreas" && focusAreasHref
      ? { href: focusAreasHref, label: "Open the Focus Areas editor" }
      : COLLECTION_LINKS[active];

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-navy">Homepage sections</p>
        <p className="text-[11px] text-navy/50">
          Each tab is a homepage block. Hide a section to remove it from the
          public site without deleting its content.
        </p>
      </div>

      <div
        className="-mx-1 flex gap-1 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Homepage sections"
      >
        {HOME_SECTION_TABS.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectSection(tab.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition",
                selected
                  ? "bg-navy text-white"
                  : "bg-navy/5 text-navy/70 hover:bg-navy/10"
              )}
            >
              {tab.label}
              {!value.visible[tab.id] ? (
                <span className="ml-1 opacity-70">· hidden</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="space-y-4 rounded-xl border border-navy/10 bg-light/50 p-4">
        <label className="flex items-center justify-between gap-3 rounded-xl border border-navy/10 bg-white px-3 py-2.5">
          <span className="text-sm font-medium text-navy">
            Show this section on the homepage
          </span>
          <input
            type="checkbox"
            checked={value.visible[active]}
            onChange={(e) => setVisible(active, e.target.checked)}
            className="h-4 w-4 rounded border-navy/30"
          />
        </label>

        {collectionLink ? (
          <p className="text-xs text-navy/55">
            <Link href={collectionLink.href} className="font-semibold text-teal">
              {collectionLink.label}
            </Link>
          </p>
        ) : null}

        {active === "hero" && (
          <p className="text-sm text-navy/70">
            The homepage carousel images are edited in Site settings. Use the
            toggle above if you want to hide the hero entirely.
          </p>
        )}

        {active === "challenges" && (
          <ChallengesFields
            value={value.challenges}
            onChange={(challenges) => onChange({ ...value, challenges })}
          />
        )}

        {active === "focusAreas" && (
          <p className="text-sm text-navy/70">
            Focus area cards, titles, and images stay in their dedicated editor.
            This toggle only shows or hides the whole block on the homepage.
          </p>
        )}

        {active === "mission" && (
          <MissionFields
            value={value.mission}
            onChange={(mission) => onChange({ ...value, mission })}
          />
        )}

        {active === "programmes" && (
          <HeadingImageFields
            value={value.programmes}
            onChange={(programmes) => onChange({ ...value, programmes })}
            folder="stemnova/home/programmes"
          />
        )}

        {active === "research" && (
          <ResearchFields
            value={value.research}
            onChange={(research) => onChange({ ...value, research })}
          />
        )}

        {active === "impact" && (
          <p className="text-sm text-navy/70">
            Impact numbers come from the Impact page. Hide this block if you do
            not want those highlights on the homepage.
          </p>
        )}

        {active === "successStory" && (
          <p className="text-sm text-navy/70">
            The featured success story is the first story on the Impact page.
          </p>
        )}

        {active === "testimonials" && (
          <p className="text-sm text-navy/70">
            Quotes are managed in the Testimonials collection. This toggle only
            controls whether they appear on the homepage.
          </p>
        )}

        {active === "partners" && (
          <p className="text-sm text-navy/70">
            Partner logos are managed in the Partners collection.
          </p>
        )}

        {active === "news" && (
          <CopyFields
            value={value.news}
            onChange={(news) =>
              onChange({
                ...value,
                news: {
                  eyebrow: news.eyebrow || "",
                  title: news.title,
                  description: news.description,
                },
              })
            }
            showEyebrow
          />
        )}

        {active === "newsletter" && (
          <CopyFields
            value={value.newsletter}
            onChange={(newsletter) => onChange({ ...value, newsletter })}
          />
        )}

        {active === "cta" && (
          <CopyFields
            value={value.cta}
            onChange={(cta) => onChange({ ...value, cta })}
          />
        )}
      </div>
    </div>
  );
}

function CopyFields({
  value,
  onChange,
  showEyebrow = false,
}: {
  value: { eyebrow?: string; title: string; description: string };
  onChange: (next: { eyebrow?: string; title: string; description: string }) => void;
  showEyebrow?: boolean;
}) {
  return (
    <div className="grid gap-3">
      {showEyebrow ? (
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Eyebrow
          </label>
          <input
            className={fieldClass}
            value={value.eyebrow || ""}
            onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
          />
        </div>
      ) : null}
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Title
        </label>
        <input
          className={fieldClass}
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Description
        </label>
        <textarea
          className={fieldClass}
          rows={3}
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
      </div>
    </div>
  );
}

function HeadingImageFields({
  value,
  onChange,
  folder,
}: {
  value: {
    eyebrow: string;
    title: string;
    imageUrl: string;
    imageCaption: string;
  };
  onChange: (next: {
    eyebrow: string;
    title: string;
    imageUrl: string;
    imageCaption: string;
  }) => void;
  folder: string;
}) {
  return (
    <div className="grid gap-3">
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Eyebrow
        </label>
        <input
          className={fieldClass}
          value={value.eyebrow}
          onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Title
        </label>
        <input
          className={fieldClass}
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <ImageUploadField
        label="Section image"
        value={value.imageUrl}
        onChange={(url) => onChange({ ...value, imageUrl: url || "" })}
        folder={folder}
      />
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Image caption
        </label>
        <input
          className={fieldClass}
          value={value.imageCaption}
          onChange={(e) => onChange({ ...value, imageCaption: e.target.value })}
        />
      </div>
    </div>
  );
}

function ChallengesFields({
  value,
  onChange,
}: {
  value: HomePageData["challenges"];
  onChange: (next: HomePageData["challenges"]) => void;
}) {
  return (
    <div className="space-y-3">
      <HeadingImageFields
        value={{
          eyebrow: value.eyebrow,
          title: value.title,
          imageUrl: value.imageUrl,
          imageCaption: value.imageCaption,
        }}
        onChange={(next) =>
          onChange({
            ...value,
            ...next,
          })
        }
        folder="stemnova/home/challenges"
      />
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Highlight line
        </label>
        <input
          className={fieldClass}
          value={value.highlight}
          onChange={(e) => onChange({ ...value, highlight: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
          Gaps ({value.items.length})
        </p>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              items: [
                ...value.items,
                {
                  id: createId("challenge"),
                  title: "",
                  description: "",
                  icon: "search",
                },
              ],
            })
          }
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add gap
        </button>
      </div>
      {value.items.map((item, index) => (
        <AdminAccordion
          key={item.id}
          variant="item"
          title={item.title || `Gap ${index + 1}`}
          summary={item.icon}
          actions={
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...value,
                  items: value.items.filter((row) => row.id !== item.id),
                })
              }
              disabled={value.items.length <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 disabled:opacity-40"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Remove
            </button>
          }
        >
          <div className="grid gap-3">
            <input
              className={fieldClass}
              value={item.title}
              onChange={(e) =>
                onChange({
                  ...value,
                  items: value.items.map((row) =>
                    row.id === item.id ? { ...row, title: e.target.value } : row
                  ),
                })
              }
              placeholder="Title"
            />
            <textarea
              className={fieldClass}
              rows={2}
              value={item.description}
              onChange={(e) =>
                onChange({
                  ...value,
                  items: value.items.map((row) =>
                    row.id === item.id
                      ? { ...row, description: e.target.value }
                      : row
                  ),
                })
              }
              placeholder="Description"
            />
            <select
              className={fieldClass}
              value={item.icon}
              onChange={(e) =>
                onChange({
                  ...value,
                  items: value.items.map((row) =>
                    row.id === item.id
                      ? {
                          ...row,
                          icon: e.target.value as typeof item.icon,
                        }
                      : row
                  ),
                })
              }
            >
              {CHALLENGE_ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>
        </AdminAccordion>
      ))}
    </div>
  );
}

function MissionFields({
  value,
  onChange,
}: {
  value: HomePageData["mission"];
  onChange: (next: HomePageData["mission"]) => void;
}) {
  return (
    <div className="grid gap-3">
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Eyebrow
        </label>
        <input
          className={fieldClass}
          value={value.eyebrow}
          onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Title
        </label>
        <input
          className={fieldClass}
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-navy/70">
          Body
        </label>
        <textarea
          className={fieldClass}
          rows={4}
          value={value.body}
          onChange={(e) => onChange({ ...value, body: e.target.value })}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Primary button
          </label>
          <input
            className={fieldClass}
            value={value.primaryLabel}
            onChange={(e) =>
              onChange({ ...value, primaryLabel: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Primary link
          </label>
          <input
            className={fieldClass}
            value={value.primaryHref}
            onChange={(e) =>
              onChange({ ...value, primaryHref: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Secondary button
          </label>
          <input
            className={fieldClass}
            value={value.secondaryLabel}
            onChange={(e) =>
              onChange({ ...value, secondaryLabel: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy/70">
            Secondary link
          </label>
          <input
            className={fieldClass}
            value={value.secondaryHref}
            onChange={(e) =>
              onChange({ ...value, secondaryHref: e.target.value })
            }
          />
        </div>
      </div>
      <ImageUploadField
        label="Background image"
        value={value.imageUrl}
        onChange={(url) => onChange({ ...value, imageUrl: url || "" })}
        folder="stemnova/home/mission"
      />
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
          Mosaic images
        </p>
        {value.mosaic.map((src, index) => (
          <ImageUploadField
            key={`${src}-${index}`}
            label={`Image ${index + 1}`}
            value={src}
            onChange={(url) => {
              const mosaic = [...value.mosaic];
              mosaic[index] = url || "";
              onChange({ ...value, mosaic });
            }}
            folder="stemnova/home/mission"
          />
        ))}
      </div>
    </div>
  );
}

function ResearchFields({
  value,
  onChange,
}: {
  value: HomePageData["research"];
  onChange: (next: HomePageData["research"]) => void;
}) {
  return (
    <div className="space-y-3">
      <CopyFields
        value={{
          eyebrow: value.eyebrow,
          title: value.title,
          description: value.description,
        }}
        onChange={(next) =>
          onChange({
            ...value,
            eyebrow: next.eyebrow || "",
            title: next.title,
            description: next.description,
          })
        }
        showEyebrow
      />
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/45">
          Research areas ({value.items.length})
        </p>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              items: [
                ...value.items,
                {
                  id: createId("research"),
                  title: "",
                  description: "",
                  icon: "atom",
                },
              ],
            })
          }
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add area
        </button>
      </div>
      {value.items.map((item, index) => (
        <AdminAccordion
          key={item.id}
          variant="item"
          title={item.title || `Area ${index + 1}`}
          summary={item.icon}
          actions={
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...value,
                  items: value.items.filter((row) => row.id !== item.id),
                })
              }
              disabled={value.items.length <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 disabled:opacity-40"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Remove
            </button>
          }
        >
          <div className="grid gap-3">
            <input
              className={fieldClass}
              value={item.title}
              onChange={(e) =>
                onChange({
                  ...value,
                  items: value.items.map((row) =>
                    row.id === item.id ? { ...row, title: e.target.value } : row
                  ),
                })
              }
              placeholder="Title"
            />
            <textarea
              className={fieldClass}
              rows={2}
              value={item.description}
              onChange={(e) =>
                onChange({
                  ...value,
                  items: value.items.map((row) =>
                    row.id === item.id
                      ? { ...row, description: e.target.value }
                      : row
                  ),
                })
              }
              placeholder="Description"
            />
            <select
              className={fieldClass}
              value={item.icon}
              onChange={(e) =>
                onChange({
                  ...value,
                  items: value.items.map((row) =>
                    row.id === item.id
                      ? {
                          ...row,
                          icon: e.target.value as typeof item.icon,
                        }
                      : row
                  ),
                })
              }
            >
              {RESEARCH_ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>
        </AdminAccordion>
      ))}
    </div>
  );
}
