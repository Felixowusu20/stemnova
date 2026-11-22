import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { impactCategoryLabel } from "@/lib/cms/impact-categories";
import type { LocationImpact } from "@/types";

export function ImpactLocationReach({
  locations,
}: {
  locations: LocationImpact[];
}) {
  const activeLocations = locations.filter((location) => location.name.trim());

  return (
    <div>
      <SectionHeading
        title="Where We Work"
        description="Regions recorded in the impact admin, with the people categories reached in each place."
        className="mb-8"
      />
      {activeLocations.length === 0 ? (
        <p className="rounded-xl border border-navy/10 bg-white p-5 text-sm text-navy/60">
          Regions will appear here once impact locations are added in the admin
          panel.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeLocations.map((location) => {
            const counts = (location.categories || []).filter(
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
  );
}
