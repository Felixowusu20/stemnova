"use client";

import { useMemo, useState } from "react";
import { ImpactCounter } from "@/components/ui/ImpactCounter";
import {
  ImpactBarChart,
  ImpactDonutChart,
} from "@/components/ui/ImpactCharts";
import {
  categoriesUsedInLocations,
  impactCategoryLabel,
  IMPACT_PEOPLE_CATEGORIES,
  locationCategoryValue,
  locationHasReach,
} from "@/lib/cms/impact-categories";
import { cn } from "@/lib/utils";
import type {
  ImpactPeopleCategory,
  LocationImpact,
  StatItem,
} from "@/types";

type ChartFilter = ImpactPeopleCategory | "all";
type ChartView = "bar" | "pie";

export function ImpactOverview({
  statistics,
  locations,
  disclaimer,
}: {
  statistics: StatItem[];
  locations: LocationImpact[];
  disclaimer?: string;
}) {
  const activeLocations = useMemo(
    () => locations.filter((location) => location.name.trim()),
    [locations]
  );
  const usedCategories = useMemo(
    () => categoriesUsedInLocations(activeLocations),
    [activeLocations]
  );
  const [filter, setFilter] = useState<ChartFilter>("teachers");
  const [view, setView] = useState<ChartView>("bar");

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
  const highlightStats = statistics.filter((stat) => stat.label.trim()).slice(0, 4);

  return (
    <div className="mt-12 space-y-8 lg:mt-14">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-8">
        <div className="space-y-4">
          {highlightStats.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {highlightStats.map((stat) => (
                <li key={stat.label}>
                  <ImpactCounter
                    stat={{ ...stat, note: undefined }}
                    className="border-navy/10 bg-white"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-navy/15 bg-white/70 px-5 py-8 text-center text-sm text-navy/55">
              Add headline statistics in admin to show totals here.
            </div>
          )}
        </div>

        <article className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">
                Impact by region
              </h2>
              <p className="mt-1.5 text-sm text-navy/65">
                Select students or teachers, then see how many were reached in
                each region.
              </p>
            </div>
            <div
              className="inline-flex shrink-0 rounded-full bg-navy/5 p-1"
              role="group"
              aria-label="Chart type"
            >
              {(
                [
                  { id: "bar", label: "Bar chart" },
                  { id: "pie", label: "Pie chart" },
                ] as const
              ).map((option) => {
                const selected = view === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setView(option.id)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                      selected
                        ? "bg-navy text-white"
                        : "text-navy/65 hover:text-navy"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="mt-5 flex flex-wrap gap-2"
            role="tablist"
            aria-label="People category"
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
                      ? "bg-teal text-white"
                      : "bg-navy/5 text-navy/70 hover:bg-navy/10 hover:text-navy"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {!hasAnyReach || chartItems.length === 0 ? (
            <p className="mt-8 rounded-xl bg-light px-4 py-10 text-center text-sm text-navy/55">
              {hasAnyReach
                ? `No ${filterLabel} recorded by region yet.`
                : "In admin, open Impact → Regions & people. Choose a region, pick Students or Teachers, enter the number reached, and save — the chart appears here."}
            </p>
          ) : view === "bar" ? (
            <ImpactBarChart
              className="mt-6"
              valueSuffix=""
              items={chartItems}
            />
          ) : (
            <ImpactDonutChart
              className="mt-6"
              items={chartItems}
              valueSuffix=""
              centerLabel={
                filter === "all" ? "People reached" : impactCategoryLabel(filter)
              }
            />
          )}
        </article>
      </div>

      {disclaimer ? (
        <p className="mx-auto max-w-2xl text-center text-xs text-navy/50">
          {disclaimer}
        </p>
      ) : null}
    </div>
  );
}
