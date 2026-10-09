/**
 * Resize a Cloudinary image in the URL so the browser loads a small file.
 * Other URLs are returned unchanged. Empty values become null.
 */
export function optimizedImageUrl(
  url?: string | null,
  width = 800,
  max = 1920
): string | null {
  const trimmed = url?.trim();
  if (!trimmed) return null;

  const marker = "/image/upload/";
  const index = trimmed.indexOf(marker);
  if (!trimmed.includes("res.cloudinary.com") || index === -1) {
    return trimmed;
  }

  const rest = trimmed.slice(index + marker.length);
  if (/(^|\/)(f_auto|q_auto|w_\d+)/.test(rest)) return trimmed;

  const size = Math.min(max, Math.max(16, Math.round(width)));
  return `${trimmed.slice(0, index + marker.length)}f_auto,q_auto,w_${size},c_limit,fl_progressive/${rest}`;
}

/** Return a resized portrait URL, or null when none is saved. */
export function portraitUrl(url?: string | null, width = 800): string | null {
  return optimizedImageUrl(url, width, 1200);
}
