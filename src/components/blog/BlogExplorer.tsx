"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FilterOption>("all");

  const featured = useMemo(() => {
    const featuredPosts = posts.filter((post) => post.featured);
    return featuredPosts.sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt)
    )[0];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts
      .filter((post) => post.slug !== featured?.slug)
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
  }, [category, featured?.slug, posts, search]);

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
    <div className="py-12 sm:py-16">
      <Container>
        {featured && (
          <article className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-md">
            {/* Mobile: image left + details right */}
            <div className="flex gap-3 p-2.5 sm:hidden">
              <div className="relative w-[40%] min-w-[7.75rem] shrink-0 overflow-hidden rounded-xl self-stretch">
                <div className="relative h-full min-h-[9.5rem]">
                  <Image
                    src={featured.imageUrl}
                    alt=""
                    fill
                    priority
                    className="object-cover"
                    sizes="40vw"
                  />
                </div>
                <span className="absolute left-2 top-2 rounded-full bg-[#F4B942] px-2 py-0.5 text-[10px] font-semibold text-navy">
                  Featured
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1 pr-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-navy/60">
                    <span className="rounded-full bg-navy px-2 py-0.5 font-semibold text-white">
                      {categoryLabels[featured.category]}
                    </span>
                    <time dateTime={featured.publishedAt}>
                      {formatDate(featured.publishedAt)}
                    </time>
                  </div>
                  <h2 className="mt-1.5 font-display text-sm font-bold leading-snug text-navy line-clamp-3">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy/70 line-clamp-2">
                    {featured.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-navy"
                >
                  Read article
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="hidden sm:grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[20rem]">
                <Image
                  src={featured.imageUrl}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#F4B942] px-3 py-1 text-xs font-semibold text-[#0A2540]">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#0A2540]/60">
                  <span className="rounded-full bg-[#0A2540] px-3 py-1 font-semibold text-white">
                    {categoryLabels[featured.category]}
                  </span>
                  <time dateTime={featured.publishedAt}>
                    {formatDate(featured.publishedAt)}
                  </time>
                  <span>By {featured.author}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-[#0A2540] sm:text-3xl">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="rounded hover:text-[#0A2540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] focus-visible:ring-offset-2"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 text-[#0A2540]/75">{featured.excerpt}</p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-[#0A2540] transition-colors hover:text-[#0d3354] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] focus-visible:ring-offset-2"
                >
                  Read featured article
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        )}

        <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0A2540]/40"
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
              className="w-full rounded-xl border border-[#0A2540]/20 bg-white py-2.5 pl-10 pr-4 text-sm text-[#0A2540] placeholder:text-[#0A2540]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] focus-visible:ring-offset-2"
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
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] focus-visible:ring-offset-2 sm:px-4 sm:py-2 sm:text-sm",
                  category === value
                    ? "bg-[#0A2540] text-white"
                    : "bg-[#0A2540]/10 text-[#0A2540] hover:bg-[#0A2540]/20"
                )}
              >
                {value === "all" ? "All" : categoryLabels[value]}
              </button>
            ))}
          </div>
        </div>

        <SectionHeading
          title="Latest Articles"
          description="Foundation news, research updates, and thought leadership from STEMNova Foundation."
          className="mt-10 sm:mt-12"
        />

        {filteredPosts.length === 0 ? (
          <EmptyState
            title="No articles found"
            description="Try adjusting your search or selecting a different category."
            className="mt-8"
          />
        ) : (
          <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {filteredPosts.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
