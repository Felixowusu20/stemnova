"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { navigation } from "@/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function MobileNavItem({
  item,
  onClose,
  depth = 0,
}: {
  item: NavItem;
  onClose: () => void;
  depth?: number;
}) {
  const pathname = usePathname();
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href ||
        (depth > 0
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`));
  const isExactActive = pathname === item.href;

  return (
    <li>
      <Link
        href={item.href}
        prefetch
        onClick={onClose}
        className={cn(
          "block rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
          depth > 0 && "pl-8 text-sm",
          isExactActive || (depth === 0 && isActive && !item.children)
            ? "bg-blue/10 text-blue"
            : depth > 0 && isExactActive
              ? "bg-blue/10 font-semibold text-blue"
              : "text-navy/80 hover:bg-navy/5 hover:text-navy"
        )}
        aria-current={isExactActive ? "page" : undefined}
      >
        {item.label}
      </Link>
      {item.children && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child) => (
            <MobileNavItem
              key={child.href}
              item={child}
              onClose={onClose}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function MobileMenu({ isOpen, onOpen, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 0);

    const trigger = triggerRef.current;

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="rounded-lg p-2 text-navy transition-colors hover:bg-navy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 xl:hidden"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={isOpen ? onClose : onOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-navy/40 xl:hidden"
            aria-label="Close menu overlay"
            onClick={onClose}
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-light shadow-xl motion-safe:animate-in motion-safe:slide-in-from-right xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-navy/10 px-4 py-4">
              <span className="font-display text-lg font-bold text-navy">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-navy hover:bg-navy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <MobileNavItem
                    key={item.href}
                    item={item}
                    onClose={onClose}
                  />
                ))}
              </ul>
            </nav>

            <div className="border-t border-navy/10 p-4">
              <Button
                href="/donate"
                variant="teal"
                fullWidth
                onClick={onClose}
              >
                Support STEMNova
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
