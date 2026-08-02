"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderOpen,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Navigation,
  Settings,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { CMS_COLLECTIONS } from "@/lib/cms/collections";
import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
  { href: "/admin/navigation", label: "Navigation", icon: Navigation },
  { href: "/admin/media", label: "Media library", icon: ImageIcon },
  { href: "/admin/content", label: "All content", icon: FolderOpen },
] as const;

export function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { name?: string | null; email?: string | null };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLink = ({
    href,
    label,
    icon: Icon,
  }: {
    href: string;
    label: string;
    icon: typeof LayoutDashboard;
  }) => {
    const active =
      href === "/admin"
        ? pathname === "/admin"
        : pathname === href || pathname.startsWith(`${href}/`);

    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-teal/15 text-teal"
            : "text-white/70 hover:bg-white/5 hover:text-white"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-navy">
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-navy/10 bg-white px-4 py-3">
        <div>
          <p className="font-display text-sm font-bold text-navy">STEMNova CMS</p>
          <p className="text-xs text-navy/50">Content management</p>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-navy/5"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-[#071526] px-4 py-6 text-white shadow-xl transition-transform lg:static lg:translate-x-0 lg:shadow-none",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="mb-8 px-2">
            <p className="font-display text-lg font-bold tracking-tight">
              STEMNova
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-teal">
              Admin CMS
            </p>
          </div>

          <nav className="space-y-1" aria-label="Admin">
            {primaryNav.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          <div className="mt-8">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Collections
            </p>
            <nav className="space-y-1" aria-label="Collections">
              {CMS_COLLECTIONS.map((collection) => (
                <NavLink
                  key={collection.id}
                  href={`/admin/content/${collection.id}`}
                  label={collection.label}
                  icon={FileText}
                />
              ))}
            </nav>
          </div>

          <div className="mt-10 border-t border-white/10 px-2 pt-4">
            <p className="truncate text-sm font-medium text-white">
              {user.name || "Administrator"}
            </p>
            <p className="truncate text-xs text-white/50">{user.email}</p>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="mt-3 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-navy/40 lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
