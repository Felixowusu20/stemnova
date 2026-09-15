"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Calendar, Facebook, Search, Twitter, User } from "lucide-react";
import { NewsImage } from "@/components/blog/NewsImage";
import { RecentNewsList } from "@/components/blog/RecentNewsList";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { newsParagraphs, parseNewsContent } from "@/lib/cms/news-body";
import { cn } from "@/lib/utils";
import type { BlogCategory, BlogPost } from "@/types";

const categoryLabels: Record<BlogCategory, string> = {
  news: "News",
  research: "Research",
  impact: "Impact",
  events: "Events",
  "thought-leadership": "Thought Leadership",
  publications: "Publications",
};

type FilterOption = "all" | BlogCategory;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function LeadShareLinks({ slug, title }: { slug: string; title: string }) {
  function shareHref(kind: "facebook" | "twitter") {
    const url =
      typeof window === "undefined"
        ? `https://stemnovafoundation.org/blog/${slug}`
        : `${window.location.origin}/blog/${slug}`;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    return kind === "facebook"
      ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      : `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  }

  return (
    <span className="inline-flex items-center gap-3">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`/blog/${slug}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          event.preventDefault();
          window.open(shareHref("facebook"), "_blank", "noopener,noreferrer");
        }}
        className="inline-flex items-center gap-1 text-teal hover:underline"
      >
        <Facebook className="h-3.5 w-3.5" aria-hidden="true" />
        Share
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          event.preventDefault();
          window.open(shareHref("twitter"), "_blank", "noopener,noreferrer");
        }}
        className="inline-flex items-center gap-1 text-teal hover:underline"
      >
        <Twitter className="h-3.5 w-3.5" aria-hidden="true" />
        Tweet
      </a>
    </span>
  );
}

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FilterOption>("all");

  const matchingPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts
      .filter((post) => {
        if (category !== "all" && post.category !== category) return false;
        if (!query) return true;
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [category, posts, search]);

  const lead =
    matchingPosts.find((post) => post.featured) || matchingPosts[0] || null;
  const recent = matchingPosts.filter((post) => post.slug !== lead?.slug);

  const categories: FilterOption[] = [
    "all",
    "news",
    "research",
    "impact",
    "events",
    "thought-leadership",
    "publications",
  ];

  return (
    <div className="bg-white py-10 sm:py-14">
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40"
              aria-hidden="true"
            />
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, or topic…"
              className="w-full rounded-xl border border-navy/20 bg-white py-2.5 pl-10 pr-4 text-sm text-navy placeholder:text-navy/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            />
          </div>

          <div
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible"
            role="group"
            aria-label="Filter articles by category"
          >
            {categories.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                aria-pressed={category === value}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 sm:text-sm",
                  category === value
                    ? "bg-navy text-white"
                    : "bg-navy/10 text-navy hover:bg-navy/20"
                )}
              >
                {value === "all" ? "All" : categoryLabels[value]}
              </button>
            ))}
          </div>
        </div>

        {!lead ? (
          <EmptyState
            title="No articles found"
            description="Try adjusting your search or selecting a different category."
          />
        ) : (
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
            <article className="min-w-0 overflow-hidden">
              <h2 className="text-center font-display text-2xl font-bold leading-snug text-navy sm:text-3xl">
                <Link
                  href={`/blog/${lead.slug}`}
                  className="rounded hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                >
                  {lead.title}
                </Link>
              </h2>

              <div className="relative mt-5 aspect-[16/10] overflow-hidden bg-navy/5 sm:mt-6">
                <NewsImage
                  src={lead.imageUrl}
                  alt={lead.title}
                  variant="hero"
                  priority
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-navy/10 pb-3 text-xs text-navy/65 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Published:{" "}
                  <time dateTime={lead.publishedAt}>
                    {formatDate(lead.publishedAt)}
                  </time>
                </span>
                {lead.author ? (
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" aria-hidden="true" />
                    Source: {lead.author}
                  </span>
                ) : null}
                <LeadShareLinks slug={lead.slug} title={lead.title} />
              </div>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/85">
                <p>{lead.excerpt}</p>
                {newsParagraphs(parseNewsContent(lead.content), 2).map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
              </div>

              <Link
                href={`/blog/${lead.slug}`}
                className="mt-6 inline-flex text-sm font-semibold text-teal hover:underline"
              >
                Continue reading
              </Link>
            </article>

            <div className="lg:sticky lg:top-24">
              <RecentNewsList posts={recent.slice(0, 8)} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
