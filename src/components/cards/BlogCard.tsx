import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { NewsImage } from "@/components/blog/NewsImage";
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
        "group flex flex-row overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative m-2.5 w-[6.75rem] min-h-[7.5rem] shrink-0 self-stretch overflow-hidden rounded-xl bg-navy/5 sm:m-3 sm:w-[8.25rem] sm:min-h-[9rem]">
        <NewsImage
          src={post.imageUrl}
          alt={post.title}
          className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          sizes="(max-width: 640px) 28vw, 132px"
        />
        <span className="absolute left-1.5 top-1.5 rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold text-white sm:left-2 sm:top-2">
          {categoryLabels[post.category]}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-3 pr-3 sm:gap-3 sm:py-3.5 sm:pr-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-navy/60 sm:text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            {post.author ? (
              <span className="truncate">By {post.author}</span>
            ) : null}
          </div>

          <h3 className="mt-1.5 font-display text-sm font-semibold leading-snug text-teal line-clamp-2 sm:text-base sm:leading-snug">
            <Link
              href={`/blog/${post.slug}`}
              className="rounded hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              {post.title}
            </Link>
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-navy/70 line-clamp-2 sm:text-sm">
            {post.excerpt}
          </p>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 rounded text-xs font-semibold text-teal transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 sm:text-sm"
        >
          Read article
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
