"use client";

import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { ImpactBarChart } from "@/components/ui/ImpactCharts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  categoriesUsedInLocations,
  impactCategoryLabel,
  IMPACT_PEOPLE_CATEGORIES,
  locationCategoryValue,
  locationHasReach,
} from "@/lib/cms/impact-categories";
import { cn } from "@/lib/utils";
import type { ImpactPeopleCategory, LocationImpact } from "@/types";

type ChartFilter = ImpactPeopleCategory | "all";

export function ImpactLocationReach({
  locations,
}: {
  locations: LocationImpact[];
}) {
  const activeLocations = useMemo(
    () => locations.filter((location) => location.name.trim()),
    [locations]
  );
  const usedCategories = useMemo(
    () => categoriesUsedInLocations(activeLocations),
    [activeLocations]
  );
  const [filter, setFilter] = useState<ChartFilter>("students");

  const filterOptions = useMemo(() => {
    const preferred = new Set<ImpactPeopleCategory>([
      "students",
      "teachers",
      ...usedCategories,
    ]);
    return [
      { id: "all" as const, label: "All people" },
      ...IMPACT_PEOPLE_CATEGORIES.filter((category) =>
        preferred.has(category.id)
      ).map((category) => ({ id: category.id, label: category.label })),
    ];
  }, [usedCategories]);

  const chartItems = useMemo(() => {
    return activeLocations
      .map((location) => ({
        label: location.name,
        value: locationCategoryValue(location, filter),
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [activeLocations, filter]);

  const filterLabel =
    filter === "all"
      ? "people reached"
      : impactCategoryLabel(filter).toLowerCase();

  const hasAnyReach = activeLocations.some(locationHasReach);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <SectionHeading
          title="Where We Work"
          description="Regions where STEMNova has reached students, teachers, and other STEM communities — based on verified programme numbers."
          className="mb-8"
        />
        {activeLocations.length === 0 ? (
          <p className="rounded-xl border border-navy/10 bg-white p-5 text-sm text-navy/60">
            Regions will appear here once impact locations are added in the
            admin panel.
          </p>
        ) : (
          <ul className="space-y-3">
            {activeLocations.map((location) => {
              const counts = location.categories.filter(
                (entry) => entry.value > 0
              );
              return (
                <li
                  key={`${location.name}-${location.region}`}
                  className="flex items-start gap-3 rounded-xl border border-navy/10 bg-white p-4"
                >
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-navy">{location.name}</h3>
                    {location.region ? (
                      <p className="text-sm text-navy/60">{location.region}</p>
                    ) : null}
                    {counts.length > 0 ? (
                      <p className="mt-2 text-sm text-navy">
                        {counts
                          .map(
                            (entry) =>
                              `${entry.value.toLocaleString()} ${impactCategoryLabel(
                                entry.category,
                                entry.label
                              ).toLowerCase()}`
                          )
                          .join(" · ")}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-navy/45">
                        No people counts added yet for this region.
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <article className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold text-navy">
          Reach by Location
        </h3>
        <p className="mt-2 text-sm text-navy/70">
          Choose who you impacted, then compare numbers across regions.
        </p>

        <div
          className="mt-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="People category for chart"
        >
          {filterOptions.map((option) => {
            const selected = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(option.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  selected
                    ? "bg-navy text-white"
                    : "bg-navy/5 text-navy/70 hover:bg-navy/10 hover:text-navy"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {!hasAnyReach || chartItems.length === 0 ? (
          <p className="mt-8 rounded-xl bg-light/80 px-4 py-6 text-center text-sm text-navy/55">
            {hasAnyReach
              ? `No ${filterLabel} recorded for these regions yet.`
              : "Add region counts for students, teachers, or other groups in admin to plot this graph."}
          </p>
        ) : (
          <>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-teal">
              Showing {filterLabel}
            </p>
            <ImpactBarChart
              className="mt-5"
              valueSuffix=""
              items={chartItems}
            />
          </>
        )}
      </article>
    </div>
  );
}
