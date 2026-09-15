import { getSiteUrl } from "@/lib/site-url";

/** Route handler avoids Next metadata-loader issues with apostrophes in the project path. */
export async function GET() {
  const siteUrl = getSiteUrl();
  const body = `User-agent: *
Allow: /
Allow: /favicon.ico
Allow: /icons/
Disallow: /admin
Disallow: /admin/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
