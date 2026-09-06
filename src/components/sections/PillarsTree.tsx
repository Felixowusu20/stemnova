import {
  Atom,
  Award,
  FlaskConical,
  Globe,
  Leaf,
  Microscope,
  Scale,
  Sparkles,
  Users,
  Venus,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/content/images";
import { cn } from "@/lib/utils";
import type { StrategicPillar } from "@/types";

const pillarIcons = {
  sparkles: Sparkles,
  award: Award,
  microscope: Microscope,
  venus: Venus,
  atom: Atom,
  policy: Scale,
  globe: Globe,
  users: Users,
  flask: FlaskConical,
  graduation: Award,
  leaf: Leaf,
} as const;

const BENTO_SPAN = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-12",
] as const;

function FocusCard({
  pillar,
  index,
  className,
  featured = false,
  wide = false,
}: {
  pillar: StrategicPillar;
  index: number;
  className?: string;
  featured?: boolean;
  wide?: boolean;
}) {
  const Icon =
    pillarIcons[pillar.icon as keyof typeof pillarIcons] ?? Sparkles;
  const imageUrl = pillar.imageUrl?.trim();
  const hasImage = Boolean(imageUrl);

  return (
    <article
      className={cn(
        "group relative flex h-full min-h-[12.5rem] overflow-hidden rounded-3xl border transition duration-300 hover:-translate-y-1",
        hasImage
          ? "border-white/10 shadow-[0_18px_44px_-20px_rgba(10,37,64,0.55)] hover:shadow-[0_24px_52px_-18px_rgba(20,184,166,0.4)]"
          : "border-teal/20 bg-white/45 shadow-[0_12px_36px_-22px_rgba(10,37,64,0.35)] backdrop-blur-md hover:border-teal/40 hover:bg-white/60",
        wide ? "flex-row items-stretch lg:min-h-[11rem]" : "flex-col",
        featured && "min-h-[22rem]",
        className
      )}
    >
      {hasImage ? (
        <>
          <Image
            src={imageUrl!}
            alt=""
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className={cn(
              "absolute inset-0",
              featured
                ? "bg-gradient-to-t from-navy via-navy/70 to-navy/25"
                : "bg-gradient-to-t from-navy/90 via-navy/55 to-teal/15"
            )}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-60"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(20,184,166,0.28), transparent 42%)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-navy/5"
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "relative z-10 flex w-full p-5 sm:p-6",
          wide
            ? "flex-row items-center gap-5 lg:gap-8"
            : "flex-col justify-between"
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-start justify-between gap-3",
            wide ? "w-auto" : "w-full"
          )}
        >
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl ring-2 backdrop-blur",
              hasImage
                ? "bg-white/15 text-white ring-white/25"
                : "bg-gradient-to-br from-navy to-[#0d3d4a] text-white ring-teal/25"
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          {!wide && (
            <span
              className={cn(
                "font-display text-4xl font-bold leading-none tabular-nums sm:text-5xl",
                hasImage ? "text-white/20" : "text-teal/20"
              )}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        <div className={cn("min-w-0", wide ? "flex-1" : "mt-auto pt-8")}>
          <p
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.16em]",
              hasImage ? "text-teal" : "text-teal"
            )}
          >
            Focus {index + 1}
          </p>
          <h3
            className={cn(
              "mt-2 font-display font-semibold leading-snug",
              hasImage
                ? featured
                  ? "text-xl text-white sm:text-2xl"
                  : "text-base text-white sm:text-lg"
                : featured
                  ? "text-xl text-navy sm:text-2xl"
                  : "text-base text-navy sm:text-lg"
            )}
          >
            {pillar.title}
          </h3>
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              hasImage
                ? "text-white/85"
                : "text-navy/70",
              featured && "max-w-md",
              wide && "max-w-3xl"
            )}
          >
            {pillar.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function PillarsTree({
  eyebrow = "Our Strategic Pillars",
  title = "Seven Focus Areas Driving Africa's STEM Future",
  pillars,
}: {
  eyebrow?: string;
  title?: string;
  pillars: StrategicPillar[];
}) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0">
        <Image
          src={images.home.pillars}
          alt=""
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#e8f8f5]/96 via-white/90 to-[#f0faf7]/98"
          aria-hidden="true"
        />
      </div>

      <Container className="relative">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:mb-12 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} className="max-w-2xl" />
          <p className="max-w-sm text-sm leading-relaxed text-navy/60 lg:text-right">
            {pillars.length} connected priorities shaping how STEMNova discovers
            talent and builds Africa&apos;s scientific future.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {pillars.map((pillar, index) => (
            <li key={pillar.id}>
              <FocusCard
                pillar={pillar}
                index={index}
                featured={index === 0}
              />
            </li>
          ))}
        </ul>

        <ul className="hidden gap-4 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_auto_auto] lg:gap-5">
          {pillars.map((pillar, index) => {
            const isLastOfSeven = pillars.length === 7 && index === 6;
            return (
              <li
                key={pillar.id}
                className={cn(
                  BENTO_SPAN[Math.min(index, BENTO_SPAN.length - 1)],
                  index === 0 && "min-h-[22rem]"
                )}
              >
                <FocusCard
                  pillar={pillar}
                  index={index}
                  featured={index === 0}
                  wide={isLastOfSeven}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
