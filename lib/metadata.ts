import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: new URL("/opengraph-image", siteConfig.url),
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/twitter-image", siteConfig.url)],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          noarchive: true,
        }
      : {
          index: true,
          follow: true,
        },
  };
}
