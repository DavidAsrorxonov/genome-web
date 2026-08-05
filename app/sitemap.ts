import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url.origin,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/playground", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const documentationPages: MetadataRoute.Sitemap = source
    .getPages()
    .map((page) => ({
      url: new URL(page.url, siteConfig.url).toString(),
      changeFrequency: "monthly" as const,
      priority: page.url === "/docs" ? 0.9 : 0.7,
    }));

  const pages = [...staticPages, ...documentationPages];

  /*
   * Remove accidental duplicate URLs,
   * such as multiple sources resolving
   * to the documentation root.
   */
  return Array.from(new Map(pages.map((page) => [page.url, page])).values());
}
