"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [currentIndex, hasPrev, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [currentIndex, hasNext, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose, goPrev, goNext]);

  if (!isOpen || !current?.url) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${currentIndex + 1} of ${images.length}: ${current.alt}`}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start == null || end == null) return;
        const delta = end - start;
        if (Math.abs(delta) < 48) return;
        if (delta > 0) goPrev();
        else goNext();
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-sm">
          {currentIndex + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-3 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={!hasPrev}
          className={cn(
            "absolute left-1 z-10 rounded-full bg-white/15 p-2.5 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-30 sm:left-3 sm:p-3",
            !hasPrev && "invisible"
          )}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="relative h-[min(86vh,960px)] w-full max-w-7xl">
          <Image
            src={current.url}
            alt={current.alt || "Gallery photo"}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={!hasNext}
          className={cn(
            "absolute right-1 z-10 rounded-full bg-white/15 p-2.5 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-30 sm:right-3 sm:p-3",
            !hasNext && "invisible"
          )}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {current.caption ? (
        <figcaption
          className="border-t border-white/10 px-4 py-4 text-center text-sm text-white/90"
          onClick={(event) => event.stopPropagation()}
        >
          {current.caption}
        </figcaption>
      ) : null}
    </div>
  );
}
