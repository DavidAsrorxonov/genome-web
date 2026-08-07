import { siteConfig } from "@/lib/site-config";
import { source } from "@/lib/source";

export const revalidate = false;

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function escapeLinkLabel(value: string): string {
  return value.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
}

function formatPageLink(
  page: ReturnType<typeof source.getPages>[number],
): string {
  const title = escapeLinkLabel(page.data.title);

  const description = page.data.description
    ? `: ${cleanText(page.data.description)}`
    : "";

  return `- [${title}](${absoluteUrl(page.url)})${description}`;
}

export function GET() {
  const pages = source.getPages();

  const apiPageTitles = new Set([
    "Genome",
    "Primitives",
    "Tokens",
    "Context",
    "mutate()",
    "getTrait()",
    "subscribe()",
    "scope()",
    "API Reference",
    "Error Reference",
    "TypeScript Types",
  ]);

  const importantApiPages = pages.filter((page) =>
    apiPageTitles.has(page.data.title),
  );

  const documentationIndex = pages.map(formatPageLink).join("\n");

  const apiIndex =
    importantApiPages.length > 0
      ? importantApiPages.map(formatPageLink).join("\n")
      : "- See the complete documentation index below.";

  const content = `# GenomeJS

> GenomeJS is a reactive design-token compiler for frontend interfaces. Developers declare primitives, derived tokens, and runtime context; GenomeJS discovers dependencies, resolves them safely, and expresses the resulting traits as CSS custom properties.

GenomeJS is framework-neutral at its core and provides adapters for React, Vue, and Svelte.

Install the core package:

\`\`\`bash
npm install @genomejs/core
\`\`\`

For React applications:

\`\`\`bash
npm install @genomejs/core @genomejs/react
\`\`\`

The primary concepts are primitives, tokens, context, traits, mutation, dependency resolution, scopes, and CSS custom properties.

## Packages

- [@genomejs/core](https://www.npmjs.com/package/@genomejs/core): Framework-neutral reactive design-token compiler and utilities.
- [@genomejs/react](https://www.npmjs.com/package/@genomejs/react): React adapter for GenomeJS.
- [@genomejs/vue](https://www.npmjs.com/package/@genomejs/vue): Vue adapter for GenomeJS.
- [@genomejs/svelte](https://www.npmjs.com/package/@genomejs/svelte): Svelte adapter for GenomeJS.

## Important Documentation

${apiIndex}

## Documentation Index

${documentationIndex}

## Project

- [GenomeJS website](${siteConfig.url.origin}): Product overview, documentation, examples, and interactive playground.
- [Interactive playground](${absoluteUrl(
    "/playground",
  )}): Manipulate runtime context and inspect resolved traits, generated CSS variables, and dependency relationships.
- [GitHub repository](${siteConfig.githubUrl}): Source code, issues, releases, and contribution history.
- [npm package](${siteConfig.npmUrl}): Published @genomejs/core package.

## Optional

- [Changelog](${absoluteUrl(
    "/docs/project/changelog",
  )}): Release history and noteworthy changes.
- [Contributing](${absoluteUrl(
    "/docs/project/contributing",
  )}): Guidance for contributing to GenomeJS.
- [Architecture](${absoluteUrl(
    "/docs/project/architecture",
  )}): Internal architecture and design rationale.
- [License](${absoluteUrl(
    "/docs/project/license",
  )}): GenomeJS licensing information.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",

      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
