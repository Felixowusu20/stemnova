"use client";

import { useMemo, useState } from "react";
import {
  IMPACT_CHART_COLORS,
  ImpactDonutChart,
} from "@/components/ui/ImpactCharts";
import {
  impactCategoryLabel,
  locationCategoryValue,
  locationHasReach,
} from "@/lib/cms/impact-categories";
import { cn } from "@/lib/utils";
import type { ImpactPeopleCategory, LocationImpact } from "@/types";

type ChartFilter = "all" | "students" | "teachers";

const FILTERS: { id: ChartFilter; label: string }[] = [
  { id: "all", label: "All people" },
  { id: "students", label: "Students" },
  { id: "teachers", label: "Teachers / Tutors" },
];

function regionColor(filter: ChartFilter, index: number) {
  if (filter === "students") {
    return IMPACT_CHART_COLORS.studentsSoft[
      index % IMPACT_CHART_COLORS.studentsSoft.length
    ];
  }
  if (filter === "teachers") {
    return IMPACT_CHART_COLORS.teachersSoft[
      index % IMPACT_CHART_COLORS.teachersSoft.length
    ];
  }
  return undefined;
}

export function ImpactOverview({
  locations,
  disclaimer,
}: {
  locations: LocationImpact[];
  disclaimer?: string;
}) {
  const activeLocations = useMemo(
    () => locations.filter((location) => location.name.trim()),
    [locations]
  );
  const [filter, setFilter] = useState<ChartFilter>("all");

  const categoryTotals = useMemo(() => {
    const students = activeLocations.reduce(
      (sum, location) => sum + locationCategoryValue(location, "students"),
      0
    );
    const teachers = activeLocations.reduce(
      (sum, location) => sum + locationCategoryValue(location, "teachers"),
      0
    );
    return [
      {
        label: "Students",
        value: students,
        color: IMPACT_CHART_COLORS.students,
      },
      {
        label: "Teachers / Tutors",
        value: teachers,
        color: IMPACT_CHART_COLORS.teachers,
      },
    ].filter((item) => item.value > 0);
  }, [activeLocations]);

  const regionItems = useMemo(() => {
    const category: ImpactPeopleCategory | "all" =
      filter === "all" ? "all" : filter;
    return activeLocations
      .map((location, index) => ({
        label: location.name,
        value: locationCategoryValue(location, category),
        color: regionColor(filter, index),
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [activeLocations, filter]);

  const chartItems = filter === "all" ? categoryTotals : regionItems;

  const filterLabel =
    filter === "all"
      ? "people reached"
      : impactCategoryLabel(filter).toLowerCase();

  const hasAnyReach = activeLocations.some(locationHasReach);
  const chartTotal = chartItems.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mt-12 space-y-6 lg:mt-14">
      <article className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:p-8">
        <div>
          <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">
            Impact by region
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-navy/65">
            Students and teachers/tutors reached in each region, from the
            numbers entered in admin.
          </p>
        </div>

        <div
          className="mt-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="People category"
        >
          {FILTERS.map((option) => {
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
                    ? option.id === "students"
                      ? "bg-teal text-white"
                      : option.id === "teachers"
                        ? "bg-blue text-white"
                        : "bg-navy text-white"
                    : "bg-navy/5 text-navy/70 hover:bg-navy/10 hover:text-navy"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {chartTotal > 0 ? (
          <p className="mt-4 text-sm text-navy/70">
            Total{" "}
            <span className="font-semibold text-navy">
              {chartTotal.toLocaleString()}
            </span>{" "}
            {filter === "all"
              ? "people reached (students vs teachers/tutors)"
              : filterLabel}
            {filter !== "all"
              ? chartItems.length === 1
                ? ` in ${chartItems[0].label}`
                : ` across ${chartItems.length} regions`
              : null}
          </p>
        ) : null}

        {!hasAnyReach || chartItems.length === 0 ? (
          <p className="mt-8 rounded-xl bg-light px-4 py-10 text-center text-sm text-navy/55">
            {hasAnyReach
              ? `No ${filterLabel} recorded by region yet. Switch category or add counts in admin.`
              : "No region impact data yet. In admin, go to About → Impact, use Regions & people, pick a region, choose Students or Teachers, enter the number, and save."}
          </p>
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

      {disclaimer ? (
        <p className="mx-auto max-w-2xl text-center text-xs text-navy/50">
          {disclaimer}
        </p>
      ) : null}
    </div>
  );
}
