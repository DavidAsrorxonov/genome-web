import Link from "next/link";
import { ExternalLink, FileText, Terminal } from "lucide-react";

import { AgentActionsMenu } from "@/components/home/agent-actions-menu";
import { packages } from "@/constants/packages";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/lib/site-config";
import { source } from "@/lib/source";

type AgentLink = {
  label: string;
  href: string;
  description: string;
};

const conceptTitles = new Set([
  "What is GenomeJS?",
  "Core Concepts",
  "Installation",
  "Quick Start",
  "Tokens",
  "Context",
  "mutate()",
  "getTrait()",
  "scope()",
  "TypeScript Types",
  "API Reference",
]);

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

function createAgentLinks(): AgentLink[] {
  return source
    .getPages()
    .filter((page) => conceptTitles.has(page.data.title))
    .map((page) => ({
      label: page.data.title,
      href: page.url,
      description: page.data.description ?? siteConfig.shortDescription,
    }));
}

function AgentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-mono text-2xl font-semibold tracking-[-0.04em] text-foreground">
        <span className="text-primary">##</span> {title}
      </h2>

      <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function AgentHome() {
  const agentLinks = createAgentLinks();
  const llmsPath = "/llms.txt";
  const llmsUrl = absoluteUrl(llmsPath);

  return (
    <main className="min-h-screen bg-[#101010] text-foreground">
      <section className="mx-auto w-full max-w-310 px-4 py-18 sm:px-6 lg:py-24">
        <div className="flex justify-end">
          <AgentActionsMenu llmsPath={llmsPath} llmsUrl={llmsUrl} />
        </div>

        <article className="mx-auto mt-10 max-w-5xl font-mono">
          <pre className="overflow-x-auto rounded-2xl border bg-background/70 p-5 text-xs leading-7 text-muted-foreground shadow-sm">
            <code>{`---
title: GenomeJS Machine-Readable Overview
description: Reactive design-token compiler for runtime-aware interfaces.
canonical: ${siteConfig.url.origin}
human_url: ${siteConfig.url.origin}
llms_url: ${llmsUrl}
docs_url: ${absoluteUrl(routes.docs)}
playground_url: ${absoluteUrl(routes.playground)}
---`}</code>
          </pre>

          <div className="mt-12">
            <p className="text-sm text-primary">#</p>

            <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
              GenomeJS
            </h1>

            <p className="mt-8 max-w-4xl text-pretty text-lg leading-9 text-muted-foreground">
              <span className="text-primary">&gt;</span> GenomeJS is a reactive
              design-token compiler for frontend interfaces. It lets developers
              declare primitives, derived tokens, and runtime context, then
              resolves those relationships into CSS custom properties.
            </p>

            <p className="mt-6 max-w-4xl text-pretty text-base leading-8 text-muted-foreground">
              This page is the agent-oriented view of the GenomeJS homepage. For
              raw machine-readable context, use{" "}
              <Link
                href="/llms.txt"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                /llms.txt
              </Link>
              .
            </p>
          </div>

          <AgentSection title="What it gives you">
            <ul className="space-y-3">
              {[
                "Primitive and derived token definitions.",
                "Runtime context mutation through genome.mutate().",
                "Dependency discovery from token reads.",
                "Safe resolution order and circular dependency errors.",
                "CSS custom property expression on a target element.",
                "React, Vue, and Svelte adapter packages.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-primary">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AgentSection>

          <AgentSection title="Install">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border bg-background/70 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Terminal className="size-3.5" aria-hidden="true" />
                  Core
                </div>

                <code className="block overflow-x-auto text-sm text-foreground">
                  npm install @genomejs/core
                </code>
              </div>

              <div className="rounded-xl border bg-background/70 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Terminal className="size-3.5" aria-hidden="true" />
                  React
                </div>

                <code className="block overflow-x-auto text-sm text-foreground">
                  npm install @genomejs/core @genomejs/react
                </code>
              </div>
            </div>
          </AgentSection>

          <AgentSection title="Important docs">
            <div className="grid gap-3">
              {agentLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border bg-background/60 p-4 transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex items-start gap-3">
                    <FileText
                      className="mt-1 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />

                    <span>
                      <span className="font-semibold text-foreground">
                        [{item.label}]
                      </span>
                      <span className="ml-2 text-muted-foreground">
                        ({absoluteUrl(item.href)})
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </AgentSection>

          <AgentSection title="Packages">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["@genomejs/core", packages.core.npm],
                ["@genomejs/react", packages.react.npm],
                ["@genomejs/vue", packages.vue.npm],
                ["@genomejs/svelte", packages.svelte.npm],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border bg-background/60 p-4 transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-foreground">
                      {label}
                    </span>
                    <ExternalLink
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}
            </div>
          </AgentSection>
        </article>
      </section>
    </main>
  );
}
