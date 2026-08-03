"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSiteOptional } from "@/components/layout/SiteProviders";

const FALLBACK_LOGO = "/images/stemnova-logo.jpg";

type LogoVariant = "header" | "footer" | "mark";

interface SiteLogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

const variantClass: Record<LogoVariant, string> = {
  header: "h-14 w-auto max-w-[188px] sm:h-16 sm:max-w-[210px]",
  footer: "h-24 w-auto max-w-[220px]",
  mark: "h-12 w-12 object-cover",
};

export function SiteLogo({
  variant = "header",
  className,
  priority = false,
}: SiteLogoProps) {
  const site = useSiteOptional();
  const src = site?.settings.logoUrl || FALLBACK_LOGO;
  const alt = site?.settings.logoAlt || site?.settings.name || "STEMNova Foundation";

  return (
    <Image
      src={src}
      alt={alt}
      width={1024}
      height={1024}
      priority={priority}
      className={cn(
        "object-contain object-left",
        variantClass[variant],
        className
      )}
      sizes={
        variant === "footer"
          ? "220px"
          : variant === "mark"
            ? "48px"
            : "(max-width: 640px) 188px, 210px"
      }
    />
  );
}
