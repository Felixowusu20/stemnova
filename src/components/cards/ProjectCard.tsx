import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CampaignProgress } from "@/components/ui/CampaignProgress";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

const statusStyles: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-[#14B8A6]/15 text-[#14B8A6]",
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-[#F4B942]/20 text-[#8a6d1a]",
  },
  completed: {
    label: "Completed",
    className: "bg-[#0A2540]/15 text-[#0A2540]",
  },
};

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const status = statusStyles[project.status];
  const isFundraising =
    project.status === "active" &&
    project.goal != null &&
    project.raised != null;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.heroImageUrl}
          alt=""
          fill
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-[#0A2540]">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#0A2540]/70">
          {project.shortDescription}
        </p>

        {isFundraising && (
          <div className="mt-4">
            <CampaignProgress
              goal={project.goal!}
              raised={project.raised!}
              currency={project.currency}
              showAmounts={false}
            />
          </div>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A2540] transition-colors hover:text-[#0d3354] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] focus-visible:ring-offset-2 rounded"
        >
          View project
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
