import type {
  ImpactPeopleCategory,
  LocationImpact,
  LocationImpactCategoryCount,
} from "@/types";

export const IMPACT_PEOPLE_CATEGORIES: {
  id: ImpactPeopleCategory;
  label: string;
}[] = [
  { id: "students", label: "Students" },
  { id: "teachers", label: "Teachers" },
  { id: "researchers", label: "Researchers" },
  { id: "women", label: "Women in STEM" },
  { id: "schools", label: "Schools" },
  { id: "other", label: "Other" },
];

export function impactCategoryLabel(
  category: ImpactPeopleCategory,
  customLabel?: string
): string {
  if (category === "other" && customLabel?.trim()) return customLabel.trim();
  return (
    IMPACT_PEOPLE_CATEGORIES.find((item) => item.id === category)?.label ||
    category
  );
}

export function normalizeLocationCategories(
  input: unknown
): LocationImpactCategoryCount[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((raw) => {
      const item =
        raw && typeof raw === "object"
          ? (raw as Record<string, unknown>)
          : null;
      if (!item) return null;
      const category = String(item.category || "").trim() as ImpactPeopleCategory;
      if (!IMPACT_PEOPLE_CATEGORIES.some((entry) => entry.id === category)) {
        return null;
      }
      return {
        category,
        label:
          typeof item.label === "string" && item.label.trim()
            ? item.label.trim()
            : undefined,
        value: Math.max(0, Number(item.value) || 0),
      };
    })
    .filter((item): item is LocationImpactCategoryCount => Boolean(item));
}

/**
 * Migrate legacy location rows (`girlsReached` / `schoolsPartnered`) into
 * category counts. Dummy illustrative values are treated as unset (0).
 */
export function migrateLegacyLocationCategories(
  location: Record<string, unknown>
): LocationImpactCategoryCount[] {
  const existing = normalizeLocationCategories(location.categories);
  if (existing.length > 0) return existing;

  const students = Math.max(0, Number(location.girlsReached) || 0);
  const schools = Math.max(0, Number(location.schoolsPartnered) || 0);
  const categories: LocationImpactCategoryCount[] = [];

  // Keep structure ready for admin editing; zero out known seed dummy figures
  // so the public graph never shows placeholder reach numbers.
  if (students > 0 || schools > 0) {
    categories.push({ category: "students", value: 0 });
    categories.push({ category: "teachers", value: 0 });
    if (schools > 0) categories.push({ category: "schools", value: 0 });
  }

  return categories;
}

export function locationCategoryValue(
  location: LocationImpact,
  category: ImpactPeopleCategory | "all"
): number {
  if (category === "all") {
    return location.categories.reduce((sum, item) => sum + item.value, 0);
  }
  return location.categories
    .filter((item) => item.category === category)
    .reduce((sum, item) => sum + item.value, 0);
}

export function locationHasReach(location: LocationImpact): boolean {
  return location.categories.some((item) => item.value > 0);
}

export function categoriesUsedInLocations(
  locations: LocationImpact[]
): ImpactPeopleCategory[] {
  const used = new Set<ImpactPeopleCategory>();
  for (const location of locations) {
    for (const item of location.categories) {
      if (item.value > 0) used.add(item.category);
    }
  }
  return IMPACT_PEOPLE_CATEGORIES.map((item) => item.id).filter((id) =>
    used.has(id)
  );
}
