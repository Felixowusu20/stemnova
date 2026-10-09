import type { ImageLoaderProps } from "next/image";
import { optimizedImageUrl } from "@/lib/portrait-url";

/**
 * Build the image URL in the browser. Next's /_next/image proxy times out
 * on Unsplash and large Cloudinary originals.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src || src.startsWith("data:")) return src;
  if (src.startsWith("/")) {
    const joiner = src.includes("?") ? "&" : "?";
    return `${src}${joiner}w=${width}&q=${quality ?? 75}`;
  }

  if (src.includes("res.cloudinary.com")) {
    return optimizedImageUrl(src, width) || src;
  }

  if (src.includes("images.unsplash.com")) {
    try {
      const url = new URL(src);
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", url.searchParams.get("fit") || "crop");
      url.searchParams.set("w", String(Math.min(1920, Math.max(64, Math.round(width)))));
      url.searchParams.set("q", String(quality ?? 75));
      return url.toString();
    } catch {
      return src;
    }
  }

  return src;
}
