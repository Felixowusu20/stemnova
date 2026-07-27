import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Award,
  FlaskConical,
  GraduationCap,
  Leaf,
  Microscope,
  Sparkles,
  Users,
  Venus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Program, ProgramIcon } from "@/types";

const iconMap: Record<ProgramIcon, typeof Sparkles> = {
  sparkles: Sparkles,
  users: Users,
  award: Award,
  atom: Atom,
  flask: FlaskConical,
  venus: Venus,
  graduation: GraduationCap,
  microscope: Microscope,
  leaf: Leaf,
};

interface ProgramCardProps {
  program: Program;
  className?: string;
}

export function ProgramCard({ program, className }: ProgramCardProps) {
  const Icon = iconMap[program.icon];

  return (
    <article
      className={cn(
        "group h-full overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <Link
        href={`/programs/${program.slug}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-navy/5">
          <Image
            src={program.heroImageUrl}
            alt=""
            fill
            quality={90}
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-display text-lg font-bold leading-snug text-blue sm:text-xl">
              {program.title}
            </h3>
          </div>

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy">
            {program.shortDescription}
          </p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-blue transition-colors group-hover:text-navy">
            Learn more
            <ArrowRight
              className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
