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
        className="flex h-full flex-row focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:flex-col"
      >
        <div className="relative w-[38%] min-w-[7.5rem] shrink-0 self-stretch overflow-hidden bg-navy/5 sm:w-full sm:min-w-0 sm:aspect-[16/10]">
          <Image
            src={program.heroImageUrl}
            alt=""
            fill
            quality={90}
            className="object-cover object-center"
            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5 p-3 sm:gap-0 sm:px-6 sm:pb-6 sm:pt-5">
          <div>
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue text-white sm:h-10 sm:w-10 sm:rounded-xl">
                <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-sm font-bold leading-snug text-blue line-clamp-2 sm:text-lg sm:leading-snug lg:text-xl">
                {program.title}
              </h3>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-navy line-clamp-2 sm:mt-3 sm:text-[0.9375rem] sm:line-clamp-none">
              {program.shortDescription}
            </p>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue transition-colors group-hover:text-navy sm:mt-auto sm:gap-1.5 sm:pt-5 sm:text-sm">
            Learn more
            <ArrowRight
              className="h-3.5 w-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 sm:h-4 sm:w-4"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
