import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/docs/mdx";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { source } from "@/lib/source";

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug = [] } = await params;

  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const description = page.data.description ?? siteConfig.shortDescription;

  const canonicalUrl = new URL(page.url, siteConfig.url).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.data.title,
    description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url.origin,
    },
    author: {
      "@type": "Person",
      name: siteConfig.creator,
      url: siteConfig.githubUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url.origin,
    },
  };

  const MDXContent = page.data.body;

  return (
    <>
      <JsonLd data={jsonLd} />

      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>

        {page.data.description ? (
          <DocsDescription>{page.data.description}</DocsDescription>
        ) : null}

        <DocsBody>
          <MDXContent components={getMDXComponents()} />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;

  const page = source.getPage(slug);

  if (!page) {
    return createMetadata({
      title: "Documentation not found",

      description:
        "The requested GenomeJS documentation page could not be found.",

      path: "/docs",

      noIndex: true,
    });
  }

  return createMetadata({
    title: page.data.title,

    description: page.data.description ?? siteConfig.shortDescription,

    path: page.url,

    type: "article",
  });
}
