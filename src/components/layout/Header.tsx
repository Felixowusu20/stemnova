"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSite } from "@/components/layout/SiteProviders";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SiteLogo } from "@/components/ui/SiteLogo";
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          "flex items-center gap-0.5 rounded-lg px-2 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 xl:px-2.5 xl:text-sm",
          isActive ? "text-teal" : "text-navy/80 hover:text-teal"
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
          className="absolute left-0 top-full z-50 min-w-[240px] rounded-xl border border-navy/10 bg-white py-2 shadow-xl"
          role="menu"
        >
          {item.children.map((child) => {
            const childActive = pathname === child.href;

            return (
              <li key={child.href} role="none">
                <Link
                  href={child.href}
                  role="menuitem"
                  prefetch
                  className={cn(
                    "block px-4 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal",
                    childActive
                      ? "bg-teal/10 font-semibold text-teal"
                      : "text-navy hover:bg-teal/10 hover:text-teal"
                  )}
                  aria-current={childActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
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
        prefetch
        className={cn(
          "rounded-lg px-2 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 xl:px-2.5 xl:text-sm",
          isActive ? "text-teal" : "text-navy/80 hover:text-teal"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </Link>
    </li>
  );
}

export function Header() {
  const { settings, navigation } = useSite();
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
        <div className="flex h-[4.75rem] items-center justify-between gap-4 lg:h-[5.25rem]">
          <Link
            href="/"
            prefetch
            className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            aria-label={`${settings.name} — Home`}
          >
            <SiteLogo variant="header" priority />
          </Link>

          <nav
            className="hidden items-center gap-0 lg:flex"
            aria-label="Main navigation"
          >
            <ul className="flex flex-wrap items-center justify-end">
              {navigation.map((item) =>
                item.children ? (
                  <NavDropdown key={`${item.href}-${item.label}`} item={item} />
                ) : (
                  <NavLink key={`${item.href}-${item.label}`} item={item} />
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
              Support {settings.shortName}
            </Button>

            <MobileMenu
              isOpen={mobileOpen}
              onOpen={() => setMobileOpen(true)}
              onClose={closeMobile}
              navigation={navigation}
              supportLabel={`Support ${settings.shortName}`}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
