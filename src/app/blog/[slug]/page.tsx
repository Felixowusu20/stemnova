import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Folder, User } from "lucide-react";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { NewsImage } from "@/components/blog/NewsImage";
import { RecentNewsList } from "@/components/blog/RecentNewsList";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  blogPosts,
} from "@/content";
import {
  resolveBlogPostBySlug,
  resolveLatestPosts,
} from "@/lib/cms/resolve-content";
import { newsHeroImage } from "@/lib/cms/news-image";
import {
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/lib/seo-schemas";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { BlogCategory } from "@/types";

export const dynamic = "force-dynamic";

const categoryLabels: Record<BlogCategory, string> = {
  news: "News",
  research: "Research",
  impact: "Impact",
  events: "Events",
  "thought-leadership": "Thought Leadership",
  publications: "Publications",
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolveBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: newsHeroImage(post.imageUrl),
    type: "article",
    publishedTime: post.publishedAt,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await resolveBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${post.slug}`;
  const latestPosts = await resolveLatestPosts(9);
  const recentPosts = latestPosts.filter((item) => item.slug !== post.slug).slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          getArticleSchema(post, url),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "News", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="bg-white py-10 sm:py-14">
        <Container>
          <nav className="mb-6 text-sm text-navy/55" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-teal">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-teal">
                  News
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-navy line-clamp-1">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
            <div className="min-w-0 overflow-hidden">
              <h1 className="text-center font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
                {post.title}
              </h1>

              <div className="relative mt-6 aspect-[16/10] overflow-hidden bg-navy/5">
                <NewsImage
                  src={post.imageUrl}
                  alt={post.title}
                  variant="hero"
                  priority
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-navy/10 pb-3 text-xs text-navy/65 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Published:{" "}
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </span>
                {post.author ? (
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" aria-hidden="true" />
                    Source: {post.author}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5 text-teal">
                  <Folder className="h-3.5 w-3.5" aria-hidden="true" />
                  {categoryLabels[post.category]}
                </span>
              </div>

              <ArticleBody blocks={post.content} />

              <div className="mt-10 border-t border-navy/10 pt-8">
                <ShareButtons url={url} title={post.title} />
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/blog" variant="outline">
                  Back to all articles
                </Button>
                <Button href="/donate" variant="teal">
                  Support our work
                </Button>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <RecentNewsList posts={recentPosts} />
            </div>
          </div>
        </Container>
      </article>

      <NewsletterSection
        title="Never Miss an Update"
        description="Subscribe for new articles, program news, and event invitations from STEMNova Foundation."
      />
    </>
  );
}
