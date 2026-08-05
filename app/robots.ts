import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

function isProductionDeployment(): boolean {
  /*
   * Vercel preview deployments
   * should not be indexed.
   */
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production";
  }

  return process.env.NODE_ENV === "production";
}

export default function robots(): MetadataRoute.Robots {
  const production = isProductionDeployment();

  if (!production) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url.origin,
  };
}
