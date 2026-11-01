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

  if (variant === "hero") {
    return (
      <Image
        src={url}
        alt={alt}
        width={1600}
        height={1200}
        priority={priority}
        className={cn(
          "mx-auto h-auto w-auto max-w-full",
          placeholder
            ? "max-h-72 object-contain object-center p-[6%]"
            : "max-h-[min(90vh,56rem)] object-contain object-center",
          className
        )}
        sizes={sizes}
      />
    );
  }

  return (
    <>
      {!placeholder ? (
        <Image
          src={url}
          alt=""
          fill
          aria-hidden
          className="scale-125 object-cover blur-2xl opacity-45"
          sizes={sizes}
        />
      ) : null}
      <Image
        src={url}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "object-contain object-center",
          placeholder ? "p-1.5" : "p-1",
          className
        )}
        sizes={sizes}
      />
    </>
  );
}
