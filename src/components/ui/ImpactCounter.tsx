"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/types";

interface ImpactCounterProps {
  stat: StatItem;
  className?: string;
  duration?: number;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function ImpactCounter({
  stat,
  className,
  duration = 2000,
}: ImpactCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(stat.value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            setDisplayValue(Math.round(stat.value * eased));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [stat.value, duration, hasAnimated]);

  const formatted = displayValue.toLocaleString();

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-navy/5 bg-white p-6 text-center shadow-sm",
        className
      )}
    >
      <p className="font-display text-4xl font-bold text-blue sm:text-5xl">
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-navy/80">{stat.label}</p>
      {stat.note && (
        <p className="mt-1 text-xs text-navy/50">{stat.note}</p>
      )}
    </div>
  );
}
