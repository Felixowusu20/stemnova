import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export function TeamCard({ member, className }: TeamCardProps) {
  return (
    <article
      className={cn(
        "group h-full overflow-hidden rounded-xl border border-navy/10 bg-white transition-shadow hover:shadow-md",
        className
      )}
    >
      <Link
        href={`/about/leadership/${member.slug}`}
        className="flex h-full flex-row focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:flex-col"
      >
        <div className="relative w-[36%] min-w-[6.5rem] shrink-0 self-stretch overflow-hidden bg-navy/5 sm:w-full sm:min-w-0 sm:aspect-[5/4] lg:aspect-[4/3]">
          <Image
            src={member.imageUrl}
            alt={`Portrait of ${member.name}`}
            fill
            quality={90}
            className="object-cover object-top"
            sizes="(max-width: 640px) 36vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-3 sm:gap-0 sm:p-4">
          <div>
            <h3 className="font-display text-sm font-semibold leading-snug text-navy line-clamp-2 sm:text-base">
              {member.name}
            </h3>
            <p className="mt-1 text-[11px] font-medium leading-snug text-teal line-clamp-2 sm:text-xs">
              {member.role}
            </p>
            <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-navy/80 sm:mt-2 sm:text-xs">
              {member.bio}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue transition-colors group-hover:text-navy sm:mt-3 sm:text-xs">
            View profile
            <ArrowRight
              className="h-3 w-3 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>

      {(member.email || member.linkedin) && (
        <div className="flex gap-1.5 border-t border-navy/10 px-3 py-2 sm:px-4 sm:py-2.5">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
