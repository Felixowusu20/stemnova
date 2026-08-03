import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Resource, ResourceType } from "@/types";

const typeConfig: Record<
  ResourceType,
  { label: string; icon: typeof FileText }
> = {
  article: { label: "Article", icon: BookOpen },
  infographic: { label: "Infographic", icon: ImageIcon },
  pdf: { label: "PDF", icon: FileText },
  video: { label: "Video", icon: Video },
  faq: { label: "FAQ", icon: HelpCircle },
};

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const config = typeConfig[resource.type];
  const Icon = config.icon;
  const isExternal = resource.href.startsWith("http");

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm transition-shadow hover:shadow-md",
        "flex flex-row sm:flex-col",
        className
      )}
    >
      {resource.imageUrl ? (
        <div className="relative w-[38%] min-w-[7.5rem] shrink-0 self-stretch overflow-hidden sm:w-full sm:min-w-0 sm:aspect-[16/9]">
          <Image
            src={resource.imageUrl}
            alt=""
            fill
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="flex w-[38%] min-w-[7.5rem] shrink-0 self-stretch items-center justify-center bg-navy/5 sm:w-full sm:min-w-0 sm:aspect-[16/9]">
          <Icon
            className="h-8 w-8 text-navy/35 sm:h-12 sm:w-12"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5 p-3 sm:gap-0 sm:p-6">
        <div className="min-w-0">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs">
            <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
            {config.label}
          </span>

          <h3 className="mt-2 font-display text-sm font-semibold leading-snug text-navy line-clamp-2 sm:mt-3 sm:text-lg">
            {resource.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-navy/70 line-clamp-2 sm:mt-2 sm:text-sm sm:line-clamp-3">
            {resource.description}
          </p>
        </div>

        <Link
          href={resource.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 rounded text-xs font-semibold text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:mt-4 sm:gap-1.5 sm:text-sm"
        >
          {resource.type === "pdf" ? "Download" : "View resource"}
          {isExternal ? (
            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
          )}
        </Link>
      </div>
    </article>
  );
}
