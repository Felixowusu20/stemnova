import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/content/images";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "News & Publications",
  description:
    "Foundation news, STEM articles, research publications, annual reports, success stories, and thought leadership from STEMNova Foundation.",
  openGraph: {
    title: "News & Publications | STEMNova Foundation",
    description:
      "Featured articles, research updates, and impact stories from STEMNova Foundation.",
    url: `${siteUrl}/blog`,
    images: [{ url: images.blog.default, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="News & Publications"
        description="Foundation news, STEM articles, research publications, annual reports, success stories, and thought leadership."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
        backgroundImage={images.blog.default}
      />
      <BlogExplorer />
    </>
  );
}
