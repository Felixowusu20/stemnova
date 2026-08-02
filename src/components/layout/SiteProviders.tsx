"use client";

import { createContext, useContext } from "react";
import type { NavItem } from "@/types";
import type { ResolvedSiteConfig } from "@/lib/cms/queries";

type ProgrammeLink = { label: string; href: string };

type SiteContextValue = {
  settings: ResolvedSiteConfig;
  navigation: NavItem[];
  programmeLinks: ProgrammeLink[];
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProviders({
  settings,
  navigation,
  programmeLinks,
  children,
}: SiteContextValue & { children: React.ReactNode }) {
  return (
    <SiteContext.Provider value={{ settings, navigation, programmeLinks }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error("useSite must be used within SiteProviders");
  }
  return ctx;
}

/** Safe for components that may render outside SiteProviders during admin. */
export function useSiteOptional() {
  return useContext(SiteContext);
}
