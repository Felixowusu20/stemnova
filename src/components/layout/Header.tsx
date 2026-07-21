"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Atom, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigation, siteConfig } from "@/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import type { NavItem } from "@/types";

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
          isActive ? "text-blue" : "text-navy/80 hover:text-blue"
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 motion-safe:transition-transform",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      {open && item.children && (
        <ul
          className="absolute left-0 top-full z-50 mt-1 min-w-[240px] rounded-xl border border-navy/10 bg-white/95 py-2 shadow-xl backdrop-blur-md"
          role="menu"
        >
          {item.children.map((child) => (
            <li key={child.href} role="none">
              <Link
                href={child.href}
                role="menuitem"
                className="block px-4 py-2.5 text-sm text-navy/80 transition-colors hover:bg-blue/5 hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
          isActive ? "text-blue" : "text-navy/80 hover:text-blue"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </Link>
    </li>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all motion-safe:duration-200",
        scrolled
          ? "border-navy/10 bg-white/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            aria-label={`${siteConfig.name} — Home`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white">
              <Atom className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="hidden font-display text-lg font-bold text-navy sm:block">
              STEMNova
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="Main navigation"
          >
            <ul className="flex items-center">
              {navigation.map((item) =>
                item.children ? (
                  <NavDropdown key={item.href} item={item} />
                ) : (
                  <NavLink key={item.href} item={item} />
                )
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="/donate"
              size="sm"
              variant="teal"
              className="hidden sm:inline-flex"
            >
              Support STEMNova
            </Button>

            <MobileMenu
              isOpen={mobileOpen}
              onOpen={() => setMobileOpen(true)}
              onClose={closeMobile}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
