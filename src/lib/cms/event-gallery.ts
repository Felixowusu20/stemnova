import type { Event, GalleryAlbum, GalleryImage } from "@/types";

/** Stable slug for an auto-built event photo album. */
export function eventGallerySlug(eventSlug: string): string {
  return eventSlug.startsWith("event-") ? eventSlug : `event-${eventSlug}`;
}

/** True when an album belongs to a specific event. */
export function albumMatchesEvent(
  album: GalleryAlbum,
  eventSlug: string
): boolean {
  if (album.eventSlug === eventSlug) return true;
  if (album.slug === eventSlug) return true;
  if (album.slug === eventGallerySlug(eventSlug)) return true;
  return false;
}

function uniqueImages(images: GalleryImage[]): GalleryImage[] {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (!image.url || seen.has(image.url)) return false;
    seen.add(image.url);
    return true;
  });
}

/** Build a gallery album from a past event's cover and gallery photos. */
export function buildEventGalleryAlbum(event: Event): GalleryAlbum | null {
  const urls = [
    ...(Array.isArray(event.galleryImageUrls) ? event.galleryImageUrls : []),
    event.imageUrl,
  ].filter((url): url is string => Boolean(url?.trim()));

  if (urls.length === 0) return null;

  const images = uniqueImages(
    urls.map((url, index) => ({
      url,
      alt:
        index === 0
          ? `${event.title} cover photo`
          : `${event.title} event photo ${index}`,
      caption: event.title,
    }))
  );

  if (images.length === 0) return null;

  return {
    slug: eventGallerySlug(event.slug),
    title: event.title,
    description:
      event.description ||
      `Photos from ${event.title}${event.date ? ` · ${event.date}` : ""}.`,
    coverImageUrl: event.imageUrl || images[0].url,
    images,
    kind: "event",
    eventSlug: event.slug,
  };
}

/** Public path for an event's photo album. */
export function eventGalleryHref(eventSlug: string): string {
  return `/gallery/${eventGallerySlug(eventSlug)}`;
}

/**
 * Merge CMS/programme albums with past-event albums.
 * Explicit CMS event albums win over auto-built ones for the same event.
 */
export function mergeEventGalleryAlbums(
  albums: GalleryAlbum[],
  events: Event[]
): GalleryAlbum[] {
  const normalised = albums.map((album) => {
    const eventSlug =
      album.eventSlug ||
      (album.slug.startsWith("event-") ? album.slug.slice("event-".length) : undefined);
    const isEvent =
      album.kind === "event" || Boolean(album.eventSlug) || album.slug.startsWith("event-");

    return {
      ...album,
      kind: isEvent ? ("event" as const) : album.kind || ("programme" as const),
      eventSlug: isEvent ? eventSlug || album.eventSlug : album.eventSlug,
    };
  });

  const coveredEvents = new Set(
    normalised
      .filter((album) => album.kind === "event")
      .flatMap((album) => {
        const keys = [album.slug, album.eventSlug].filter(Boolean) as string[];
        return keys;
      })
  );

  const autoEventAlbums = events
    .filter((event) => event.isPast)
    .map((event) => buildEventGalleryAlbum(event))
    .filter((album): album is GalleryAlbum => Boolean(album))
    .filter((album) => {
      const keys = [album.slug, album.eventSlug, eventGallerySlug(album.eventSlug || "")];
      return !keys.some((key) => key && coveredEvents.has(key));
    });

  const eventAlbums = [
    ...normalised.filter((album) => album.kind === "event"),
    ...autoEventAlbums,
  ].sort((a, b) => a.title.localeCompare(b.title));

  const programmeAlbums = normalised.filter((album) => album.kind !== "event");

  return [...eventAlbums, ...programmeAlbums];
}

/** Find the gallery album for an event, if one exists. */
export function findEventGalleryAlbum(
  albums: GalleryAlbum[],
  eventSlug: string
): GalleryAlbum | undefined {
  return albums.find((album) => albumMatchesEvent(album, eventSlug));
}
