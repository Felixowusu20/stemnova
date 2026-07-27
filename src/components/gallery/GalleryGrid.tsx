"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { galleryAlbums } from "@/content";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

interface GalleryGridProps {
  className?: string;
  /** When set, show only this album and hide filter chips. */
  albumSlug?: string;
}

export function GalleryGrid({ className, albumSlug }: GalleryGridProps) {
  const [filter, setFilter] = useState<string>(albumSlug ?? "all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages: (GalleryImage & { albumSlug: string; albumTitle: string })[] =
    useMemo(
      () =>
        galleryAlbums.flatMap((album) =>
          album.images.map((img) => ({
            ...img,
            albumSlug: album.slug,
            albumTitle: album.title,
          }))
        ),
      []
    );

  const filteredImages = useMemo(() => {
    if (albumSlug) {
      return allImages.filter((img) => img.albumSlug === albumSlug);
    }
    if (filter === "all") return allImages;
    return allImages.filter((img) => img.albumSlug === filter);
  }, [allImages, albumSlug, filter]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const filters = [
    { value: "all", label: "All" },
    ...galleryAlbums.map((a) => ({ value: a.slug, label: a.title })),
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {!albumSlug && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter gallery albums"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
                filter === f.value
                  ? "bg-navy text-white"
                  : "bg-navy/10 text-navy hover:bg-navy/20"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {filteredImages.length === 0 ? (
        <p className="py-12 text-center text-navy/60">
          No images found for this album yet.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {filteredImages.map((image, index) => (
            <li key={`${image.albumSlug}-${image.url}-${index}`}>
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative aspect-square w-full overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                aria-label={`View image: ${image.alt}`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent p-3 opacity-0 motion-safe:transition-opacity motion-safe:group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <p className="truncate text-xs text-white">{image.caption}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
