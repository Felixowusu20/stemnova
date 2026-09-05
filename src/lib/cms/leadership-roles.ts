export const LEADERSHIP_CATEGORIES = [
  {
    id: "co-founder",
    label: "Co-Founder",
    isFounder: true,
    defaultRole: "Co-Founder",
  },
  {
    id: "board-chair",
    label: "Board Chair",
    isFounder: false,
    defaultRole: "Board Chair",
  },
  {
    id: "board-trustee",
    label: "Board Trustee",
    isFounder: false,
    defaultRole: "Board Trustee",
  },
  {
    id: "board-member",
    label: "Board Member",
    isFounder: false,
    defaultRole: "Board Member",
  },
  {
    id: "director",
    label: "Director",
    isFounder: false,
    defaultRole: "Director",
  },
  {
    id: "advisor",
    label: "Advisor",
    isFounder: false,
    defaultRole: "Advisor",
  },
  {
    id: "other",
    label: "Other leadership",
    isFounder: false,
    defaultRole: "Leadership",
  },
] as const;

export type LeadershipCategoryId = (typeof LEADERSHIP_CATEGORIES)[number]["id"];

const categoryIds = new Set<string>(
  LEADERSHIP_CATEGORIES.map((category) => category.id)
);

export function isLeadershipCategoryId(
  value: unknown
): value is LeadershipCategoryId {
  return typeof value === "string" && categoryIds.has(value);
}

export function getLeadershipCategory(id: LeadershipCategoryId) {
  return LEADERSHIP_CATEGORIES.find((category) => category.id === id)!;
}

export function resolveLeadershipCategory(input: {
  leadershipCategory?: unknown;
  isFounder?: unknown;
  role?: unknown;
}): LeadershipCategoryId {
  if (isLeadershipCategoryId(input.leadershipCategory)) {
    return input.leadershipCategory;
  }
  if (input.isFounder === true) return "co-founder";

  const role =
    typeof input.role === "string" ? input.role.toLowerCase() : "";

  // Only infer co-founder from role when founder flag is unset
  if (
    input.isFounder !== false &&
    (role.includes("co-founder") ||
      role.includes("cofounder") ||
      /\bfounder\b/.test(role))
  ) {
    return "co-founder";
  }
  if (role.includes("board chair") || role.includes("chairperson")) {
    return "board-chair";
  }
  if (role.includes("trustee")) return "board-trustee";
  if (role.includes("board member") || role.includes("board director")) {
    return "board-member";
  }
  if (role.includes("advisor") || role.includes("adviser")) return "advisor";
  if (role.includes("director")) return "director";

  return "other";
}


export function leadershipCategoryLabel(id: LeadershipCategoryId) {
  return getLeadershipCategory(id).label;
}

export function isFounderCategory(id: LeadershipCategoryId) {
  return getLeadershipCategory(id).isFounder;
}
