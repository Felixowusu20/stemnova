import { siteConfig } from "@/content";
import { getSiteUrl } from "@/lib/site-url";

/** Route handler avoids Next metadata-loader issues with apostrophes in the project path. */
export async function GET() {
  const siteUrl = getSiteUrl();
  const body = JSON.stringify({
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0A2540",
    lang: "en-GH",
    id: siteUrl,
    icons: [
      {
        src: "/images/stemnova-logo.jpg",
        sizes: "1024x1024",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  });

  return new Response(body, {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
