const LEGACY_NEWS_PLACEHOLDERS = new Set([
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=90&auto=format&fit=crop",
]);

export const NEWS_PLACEHOLDER_IMAGE = "/images/news-placeholder.png";

export function isNewsPlaceholder(url?: string | null) {
  const trimmed = typeof url === "string" ? url.trim() : "";
  return !trimmed || trimmed === NEWS_PLACEHOLDER_IMAGE || LEGACY_NEWS_PLACEHOLDERS.has(trimmed);
}

export function newsHeroImage(url?: string | null) {
  return isNewsPlaceholder(url) ? NEWS_PLACEHOLDER_IMAGE : url!.trim();
}
