"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
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
import { useEffect, useState } from "react";
import {
  ADMIN_PRIMARY_NAV,
  ADMIN_SITE_NAV,
  ADMIN_SYSTEM_NAV,
  isAdminHrefActive,
  isGroupActive,
  resolveAdminHref,
  type AdminNavGroup,
  type AdminNavLeaf,
} from "@/lib/cms/admin-nav";
import { cn } from "@/lib/utils";

const iconByHref: Record<string, typeof LayoutDashboard> = {
  "/admin": LayoutDashboard,
  "/admin/inbox": Inbox,
  "/admin/settings": Settings,
  "/admin/navigation": Navigation,
  "/admin/media": ImageIcon,
  "/admin/content": FolderOpen,
};

function NavLink({
  href,
  label,
  icon: Icon,
  onNavigate,
  nested = false,
}: {
  href: string;
  label: string;
  icon?: typeof LayoutDashboard;
  onNavigate?: () => void;
  nested?: boolean;
}) {
  const pathname = usePathname();
  const active = isAdminHrefActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-xl text-sm font-medium transition-colors",
        nested ? "px-3 py-2" : "px-3 py-2.5",
        active
          ? "bg-teal/15 text-teal"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      )}
    >
      {Icon ? (
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <span
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            active ? "bg-teal" : "bg-white/30"
          )}
          aria-hidden="true"
        />
      )}
      <span className="truncate">{label}</span>
    </Link>
  );
}

function CollapsibleGroup({
  group,
  pageIdBySlug,
  onNavigate,
}: {
  group: AdminNavGroup;
  pageIdBySlug: Record<string, string>;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isGroupActive(group, pathname, pageIdBySlug);
  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return (
    <div className="space-y-0.5">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
          active
            ? "bg-white/5 text-white"
            : "text-white/70 hover:bg-white/5 hover:text-white"
        )}
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-3">
          <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{group.label}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-white/40 transition-transform",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="ml-3 space-y-0.5 border-l border-white/10 pl-2">
          {group.children.map((child: AdminNavLeaf) => (
            <NavLink
              key={`${group.id}-${child.label}`}
              href={resolveAdminHref(child, pageIdBySlug)}
              label={child.label}
              nested
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AdminShell({
  children,
  user,
  pageIdBySlug,
}: {
  children: React.ReactNode;
  user: { name?: string | null; email?: string | null };
  pageIdBySlug: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="bg-[#f3f6fa] text-navy lg:h-screen lg:overflow-hidden">
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-navy/10 bg-white px-4 py-3 lg:hidden">
        <div>
          <p className="font-display text-sm font-bold text-navy">
            STEMNova CMS
          </p>
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

      <div className="mx-auto flex min-h-screen max-w-[1600px] lg:h-full lg:min-h-0">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#071526] text-white shadow-xl transition-transform lg:static lg:z-auto lg:h-full lg:shrink-0 lg:translate-x-0 lg:shadow-none",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6">
            <div className="mb-8 px-2">
              <p className="font-display text-lg font-bold tracking-tight">
                STEMNova
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-teal">
                Admin CMS
              </p>
            </div>

            <nav className="space-y-1" aria-label="Admin">
              {ADMIN_PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={iconByHref[item.href]}
                  onNavigate={close}
                />
              ))}
            </nav>

            <div className="mt-8">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Website pages
              </p>
              <nav className="space-y-1" aria-label="Website pages">
                {ADMIN_SITE_NAV.map((item) =>
                  item.kind === "group" ? (
                    <CollapsibleGroup
                      key={item.id}
                      group={item}
                      pageIdBySlug={pageIdBySlug}
                      onNavigate={close}
                    />
                  ) : (
                    <NavLink
                      key={item.label}
                      href={resolveAdminHref(item, pageIdBySlug)}
                      label={item.label}
                      icon={FileText}
                      onNavigate={close}
                    />
                  )
                )}
              </nav>
            </div>

            <div className="mt-8">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                System
              </p>
              <nav className="space-y-1" aria-label="System">
                {ADMIN_SYSTEM_NAV.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={iconByHref[item.href]}
                    onNavigate={close}
                  />
                ))}
              </nav>
            </div>

            <div className="mt-10 border-t border-white/10 px-2 pt-4 pb-2">
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
          </div>
        </aside>

        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-navy/40 lg:hidden"
            aria-label="Close menu"
            onClick={close}
          />
        ) : null}

        <main className="min-w-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 lg:h-full lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
