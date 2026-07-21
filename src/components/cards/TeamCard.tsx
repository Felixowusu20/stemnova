import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
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
        "group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={member.imageUrl}
          alt={`Portrait of ${member.name}`}
          fill
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {member.isFounder && (
          <span className="absolute left-4 top-4 rounded-full bg-[#F4B942] px-3 py-1 text-xs font-semibold text-[#252525]">
            Founder
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold text-[#252525]">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-[#218C83]">{member.role}</p>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[#252525]/70">
          {member.bio}
        </p>

        <div className="mt-4 flex gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5B2C83]/10 text-[#5B2C83] transition-colors hover:bg-[#5B2C83] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B2C83] focus-visible:ring-offset-2"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5B2C83]/10 text-[#5B2C83] transition-colors hover:bg-[#5B2C83] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B2C83] focus-visible:ring-offset-2"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
