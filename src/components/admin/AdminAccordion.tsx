"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminAccordion({
  title,
  summary,
  defaultOpen = false,
  variant = "section",
  actions,
  children,
}: {
  title: string;
  summary?: string;
  defaultOpen?: boolean;
  /** `section` = top-level groups; `item` = nested rows inside a section */
  variant?: "section" | "item";
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isItem = variant === "item";

  return (
    <div
      className={cn(
        "overflow-hidden border border-navy/10 bg-white",
        isItem ? "rounded-lg" : "rounded-xl"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 transition",
          isItem ? "px-3 py-2 hover:bg-light/50" : "px-3.5 py-2.5 hover:bg-light/70"
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
          aria-expanded={open}
        >
          <span className="min-w-0">
            <span
              className={cn(
                "block font-semibold text-navy",
                isItem ? "text-xs" : "text-sm"
              )}
            >
              {title}
            </span>
            {summary ? (
              <span className="mt-0.5 block truncate text-[11px] text-navy/50">
                {summary}
              </span>
            ) : null}
          </span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-navy/45 transition-transform",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
        {actions ? (
          <div
            className="shrink-0"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {actions}
          </div>
        ) : null}
      </div>
      {open ? (
        <div
          className={cn(
            "space-y-2.5 border-t border-navy/8 bg-light/35",
            isItem ? "px-3 py-3" : "px-3.5 py-3.5"
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
