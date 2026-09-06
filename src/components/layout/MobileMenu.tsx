"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { navigation as staticNavigation } from "@/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SiteLogo } from "@/components/ui/SiteLogo";
import type { NavItem } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  navigation?: NavItem[];
  supportLabel?: string;
}

function isItemActive(pathname: string, href: string, exact = false) {
  if (href === "/") return pathname === "/";
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MobileAccordionSection({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelId = useId();
  const sectionActive = isItemActive(pathname, item.href);
  const childActive = item.children?.some((child) =>
    isItemActive(pathname, child.href, true)
  );
  const [open, setOpen] = useState(Boolean(sectionActive || childActive));

  useEffect(() => {
    if (sectionActive || childActive) setOpen(true);
  }, [sectionActive, childActive, pathname]);

  return (
    <li className="overflow-hidden rounded-2xl border border-navy/8 bg-white">
      <div className="flex items-stretch">
        <Link
          href={item.href}
          prefetch
          onClick={onClose}
          className={cn(
            "flex min-w-0 flex-1 items-center px-4 py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal",
            sectionActive || childActive
              ? "text-teal"
              : "text-navy hover:bg-teal/5 hover:text-teal"
          )}
          aria-current={pathname === item.href ? "page" : undefined}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "flex w-12 shrink-0 items-center justify-center border-l border-navy/8 text-navy/55 transition-colors hover:bg-teal/5 hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal",
            open && "bg-teal/5 text-teal"
          )}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Collapse" : "Expand"} ${item.label} submenu`}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 motion-safe:transition-transform motion-safe:duration-200",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      {open && item.children ? (
        <ul
          id={panelId}
          className="space-y-0.5 border-t border-navy/8 bg-light/60 px-2 py-2"
        >
          {item.children.map((child) => {
            const active = isItemActive(pathname, child.href, true);
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  prefetch
                  onClick={onClose}
                  className={cn(
                    "flex items-center rounded-xl px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal",
                    active
                      ? "bg-teal/10 font-semibold text-teal"
                      : "text-navy/75 hover:bg-white hover:text-teal"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className={cn(
                      "mr-2.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      active ? "bg-teal" : "bg-navy/25"
                    )}
                    aria-hidden="true"
                  />
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
}

function MobileSimpleLink({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const active = isItemActive(pathname, item.href);

  return (
    <li>
      <Link
        href={item.href}
        prefetch
        onClick={onClose}
        className={cn(
          "flex items-center rounded-2xl border px-4 py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
          active
            ? "border-teal/25 bg-teal/10 text-teal"
            : "border-navy/8 bg-white text-navy hover:border-teal/25 hover:bg-teal/5 hover:text-teal"
        )}
        aria-current={active ? "page" : undefined}
      >
        {item.label}
      </Link>
    </li>
  );
}

export function MobileMenu({
  isOpen,
  onOpen,
  onClose,
  navigation = staticNavigation,
  supportLabel = "Support STEMNova",
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      panelRef.current
        ?.querySelector<HTMLElement>("button[aria-label='Close menu']")
        ?.focus();
    }, 0);

    const trigger = triggerRef.current;

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen, handleKeyDown]);

  const menu =
    isOpen && mounted
      ? createPortal(
          <>
            <button
              type="button"
              className="fixed inset-0 z-[100] bg-navy/50 backdrop-blur-[2px] motion-safe:animate-in motion-safe:fade-in lg:hidden"
              aria-label="Close menu overlay"
              onClick={onClose}
            />
            <div
              id="mobile-menu"
              ref={panelRef}
              className="fixed inset-y-0 right-0 z-[110] flex w-full max-w-[22rem] flex-col bg-[#F7F9FC] shadow-2xl motion-safe:animate-in motion-safe:slide-in-from-right sm:max-w-sm lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between gap-3 border-b border-navy/10 bg-white px-4 py-3.5 pt-[max(0.875rem,env(safe-area-inset-top))]">
                <Link
                  href="/"
                  prefetch
                  onClick={onClose}
                  className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                  aria-label="STEMNova Foundation — Home"
                >
                  <SiteLogo
                    variant="header"
                    className="!h-10 !max-w-[150px]"
                  />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-navy/10 bg-white text-navy transition-colors hover:bg-navy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4"
                aria-label="Mobile navigation"
              >
                <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/40">
                  Browse
                </p>
                <ul className="space-y-2">
                  {navigation.map((item) =>
                    item.children && item.children.length > 0 ? (
                      <MobileAccordionSection
                        key={`${item.href}-${item.label}`}
                        item={item}
                        onClose={onClose}
                      />
                    ) : (
                      <MobileSimpleLink
                        key={`${item.href}-${item.label}`}
                        item={item}
                        onClose={onClose}
                      />
                    )
                  )}
                </ul>
              </nav>

              <div className="space-y-2.5 border-t border-navy/10 bg-white px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <Button
                  href="/donate"
                  variant="teal"
                  fullWidth
                  onClick={onClose}
                >
                  {supportLabel}
                </Button>
                <Link
                  href="/contact"
                  prefetch
                  onClick={onClose}
                  className="flex w-full items-center justify-center rounded-xl border border-navy/12 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 lg:hidden",
          isOpen
            ? "border-navy/15 bg-navy text-white"
            : "border-navy/10 bg-white text-navy hover:bg-navy/5"
        )}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={isOpen ? onClose : onOpen}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      {menu}
    </>
  );
}
