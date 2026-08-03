import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  backgroundImage,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy text-white",
        className
      )}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 gradient-hero" aria-hidden="true" />
        </>
      )}

      <Container className="relative py-12 sm:py-20 lg:py-24">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            items={breadcrumbs}
            className="mb-4 sm:mb-6 [&_a]:text-white/85 [&_a:hover]:text-white [&_li]:text-white/85 [&_span]:text-white [&_svg]:text-white/70"
          />
        )}
        <h1 className="font-display text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/95 drop-shadow-sm sm:mt-4 sm:text-xl">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
