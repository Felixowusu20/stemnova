import type { GalleryAlbum } from "@/types";

/**
 * Static programme albums are intentionally empty.
 * Public gallery content comes from CMS albums and past-event photos.
 */
export const galleryAlbums: GalleryAlbum[] = [];

/** Retrieve a gallery album by slug. */
export function getGalleryAlbumBySlug(slug: string): GalleryAlbum | undefined {
  return galleryAlbums.find((album) => album.slug === slug);
}

/** Flatten all gallery images across albums. */
export function getAllGalleryImages(): GalleryAlbum["images"] {
  return galleryAlbums.flatMap((album) => album.images);
}
