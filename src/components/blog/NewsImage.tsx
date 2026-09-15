import Image from "next/image";
import { isNewsPlaceholder, newsHeroImage } from "@/lib/cms/news-image";
import { cn } from "@/lib/utils";

export function NewsImage({
  src,
  alt,
  sizes,
  priority,
  className,
  variant = "card",
}: {
  src?: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  variant?: "card" | "hero";
}) {
  const url = newsHeroImage(src);
  const placeholder = isNewsPlaceholder(url);

  return (
    <Image
      src={url}
      alt={alt}
      fill
      priority={priority}
      className={cn(
        placeholder
          ? cn(
              "object-contain object-center",
              variant === "hero" ? "p-[6%]" : "p-1.5"
            )
          : "object-cover object-center",
        className
      )}
      sizes={sizes}
    />
  );
}
