import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/stemnova-logo.jpg";

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
  return (
    <Image
      src={LOGO_SRC}
      alt="STEMNova Foundation"
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
