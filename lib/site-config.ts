function resolveSiteUrl(): URL {
  const configuredUrl = process.env.SITE_URL?.trim();

  if (configuredUrl) {
    return new URL(configuredUrl);
  }

  return new URL("http://localhost:3000");
}

export const siteConfig = {
  name: "GenomeJS",
  title: "GenomeJS — Design tokens that respond",
  shortDescription: "A reactive design-token compiler for frontend interfaces.",
  description:
    "GenomeJS discovers token dependencies, resolves them safely, reacts to runtime context, and expresses the result as CSS custom properties.",
  url: resolveSiteUrl(),
  locale: "en_US",
  creator: "Dovudkhon",
  githubUrl: "https://github.com/DavidAsrorxonov/genome",
  npmUrl: "https://www.npmjs.com/package/@genomejs/core",
  keywords: [
    "GenomeJS",
    "design tokens",
    "reactive design tokens",
    "CSS custom properties",
    "CSS variables",
    "design systems",
    "TypeScript",
    "JavaScript",
    "React",
    "Vue",
    "Svelte",
    "frontend",
    "runtime context",
    "dependency graph",
  ],
} as const;
