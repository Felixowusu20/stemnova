import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/content/images";
import { resolveBlogPosts } from "@/lib/cms/resolve-content";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "News & Publications",
  description:
    "Foundation news, STEM articles, research publications, annual reports, success stories, and thought leadership from STEMNova Foundation.",
  path: "/blog",
  image: images.blog.default,
});

export default async function BlogPage() {
  const posts = await resolveBlogPosts();

  return (
    <>
      <PageHero
        title="News"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      />
      <BlogExplorer posts={posts} />
    </>
  );
}
