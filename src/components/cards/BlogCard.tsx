import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost, BlogCategory } from "@/types";

const categoryLabels: Record<BlogCategory, string> = {
  news: "News",
  research: "Research",
  impact: "Impact",
  events: "Events",
  "thought-leadership": "Thought Leadership",
  publications: "Publications",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm transition-shadow hover:shadow-md",
        "flex flex-row sm:flex-col",
        className
      )}
    >
      <div className="relative w-[38%] min-w-[7.5rem] shrink-0 self-stretch overflow-hidden sm:w-full sm:min-w-0 sm:aspect-[16/10]">
        <Image
          src={post.imageUrl}
          alt=""
          fill
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-2 top-2 rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
          {categoryLabels[post.category]}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5 p-3 sm:gap-0 sm:p-6">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-navy/60 sm:text-xs">
            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>

          <h3 className="mt-1.5 font-display text-sm font-semibold leading-snug text-navy line-clamp-2 sm:mt-2 sm:text-xl sm:leading-tight">
            <Link
              href={`/blog/${post.slug}`}
              className="rounded hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            >
              {post.title}
            </Link>
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-navy/70 line-clamp-2 sm:mt-2 sm:text-sm sm:line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 rounded text-xs font-semibold text-navy transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:mt-4 sm:gap-1.5 sm:text-sm"
        >
          Read article
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
