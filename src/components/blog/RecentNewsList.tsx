import Link from "next/link";
import { Calendar, Folder } from "lucide-react";
import { NewsImage } from "@/components/blog/NewsImage";
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
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function RecentNewsList({
  posts,
  title = "Recent News",
}: {
  posts: BlogPost[];
  title?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <aside>
      <h2 className="border-b border-navy/10 pb-2 font-display text-lg font-semibold text-navy/70">
        {title}
      </h2>
      <ul className="divide-y divide-navy/8">
        {posts.map((post) => (
          <li key={post.slug} className="py-4">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-md bg-navy/5 sm:h-[4.75rem] sm:w-[4.75rem]">
                <NewsImage src={post.imageUrl} alt="" sizes="76px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold leading-snug text-navy group-hover:text-teal">
                  {post.title}
                </p>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-navy/55">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-1 text-teal">
                    <Folder className="h-3 w-3" aria-hidden="true" />
                    {categoryLabels[post.category]}
                  </span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
