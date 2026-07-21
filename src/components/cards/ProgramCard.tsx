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
        "group flex flex-col overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={program.heroImageUrl}
          alt=""
          fill
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue text-white shadow-lg">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-navy">
          {program.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
          {program.shortDescription}
        </p>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 rounded"
        >
          Learn More
          <ArrowRight
            className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
