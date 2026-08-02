"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import { useGenomeTrait } from "@genomejs/react";
import {
  ArrowRight,
  Box,
  Check,
  Clipboard,
  Code2,
  Component,
  Layers3,
  Sparkles,
  Link2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createFrameworkDemoGenome,
  initialFrameworkDemoContext,
  type FrameworkDemoContext,
} from "@/lib/genome/framework-demo-genome";
import { cn } from "@/lib/utils";

type FrameworkId = "core" | "react" | "vue" | "svelte";

type Framework = {
  id: FrameworkId;
  name: string;
  packageName: string;
  description: string;
  installation: string;
  code: string;
  docsUrl: string;
  icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  note?: string;
};

const frameworks: Framework[] = [
  {
    id: "core",
    name: "Core",
    packageName: "@genomejs/core",
    description: "The framework-neutral token compiler and runtime.",
    installation: "npm install @genomejs/core",
    docsUrl:
      "https://github.com/DavidAsrorxonov/genome/tree/main/packages/core#readme",
    icon: Box,
    code: `import { Genome } from "@genomejs/core";

const genome = new Genome({
  primitives: {
    color: "#7c6cff",
  },

  tokens: {
    headingColor: (dna) =>
      dna.color,
  },
});

const color =
  genome.getTrait("headingColor");`,
  },
  {
    id: "react",
    name: "React",
    packageName: "@genomejs/react",
    description:
      "Subscribe to resolved traits through React's external-store model.",
    installation: "npm install @genomejs/core @genomejs/react",
    docsUrl:
      "https://github.com/DavidAsrorxonov/genome/tree/main/packages/react#readme",
    icon: Component,
    code: `"use client";

import { useGenomeTrait }
  from "@genomejs/react";

function Heading() {
  const color = useGenomeTrait(
    genome,
    "color",
  );

  return (
    <h1 style={{ color: String(color) }}>
      Hello, Genome
    </h1>
  );
}`,
  },
  {
    id: "vue",
    name: "Vue",
    packageName: "@genomejs/vue",
    description: "Expose reactive Genome traits as native Vue refs.",
    installation: "npm install @genomejs/core @genomejs/vue",
    docsUrl:
      "https://github.com/DavidAsrorxonov/genome/tree/main/packages/vue#readme",
    icon: Layers3,
    code: `<script setup lang="ts">
import { useGenomeTrait }
  from "@genomejs/vue";

const color = useGenomeTrait(
  genome,
  "color",
);
</script>

<template>
  <h1 :style="{ color }">
    Hello, Genome
  </h1>
</template>`,
  },
  {
    id: "svelte",
    name: "Svelte",
    packageName: "@genomejs/svelte",
    description: "Consume reactive traits through a Svelte rune-aware wrapper.",
    installation: "npm install @genomejs/core @genomejs/svelte",
    docsUrl:
      "https://github.com/DavidAsrorxonov/genome/tree/main/packages/svelte#readme",
    icon: Sparkles,
    note: "The Svelte adapter ships rune-aware source and requires a Svelte-aware downstream bundler.",
    code: `<script lang="ts">
  import { genomeTrait }
    from "@genomejs/svelte";

  const color = genomeTrait(
    genome,
    "color",
  );
</script>

<h1 style="color: {color.value}">
  Hello, Genome
</h1>`,
  },
];

function isFrameworkId(value: string): value is FrameworkId {
  return frameworks.some((framework) => framework.id === value);
}

function FrameworkCode({ code }: { code: string }) {
  const lines = code.split("\n");

  return (
    <pre className="min-h-96 overflow-x-auto p-5 font-mono text-[12px] leading-6 sm:p-6 sm:text-[13px]">
      <code>
        {lines.map((line, index) => (
          <span
            key={`${index}-${line}`}
            className="grid min-w-max grid-cols-[2rem_1fr]"
          >
            <span
              aria-hidden="true"
              className="select-none pr-4 text-right text-muted-foreground/40"
            >
              {index + 1}
            </span>

            <span
              className={cn(
                line.includes("import") ||
                  line.includes("const ") ||
                  line.includes("function ")
                  ? "text-primary"
                  : "text-foreground",
              )}
            >
              {line || " "}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}

function LiveFrameworkPreview({ framework }: { framework: Framework }) {
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [genome, setGenome] = useState(() => createFrameworkDemoGenome(null));

  const genomeRef = useRef(genome);

  const [context, setContext] = useState<FrameworkDemoContext>(
    initialFrameworkDemoContext,
  );

  const accent = String(useGenomeTrait(genome, "demoAccent"));

  const gap = String(useGenomeTrait(genome, "demoGap"));

  const radius = String(useGenomeTrait(genome, "demoRadius"));

  const controlHeight = String(useGenomeTrait(genome, "demoControlHeight"));

  useEffect(() => {
    const target = previewRef.current;

    if (!target) {
      return;
    }

    const attachedGenome = createFrameworkDemoGenome(
      target,
      initialFrameworkDemoContext,
    );

    genomeRef.current = attachedGenome;
    setGenome(attachedGenome);
  }, []);

  function mutatePreview() {
    const nextContext: FrameworkDemoContext = {
      tone: context.tone === "violet" ? "teal" : "violet",

      density: context.density === "comfortable" ? "compact" : "comfortable",
    };

    setContext(nextContext);

    genomeRef.current.mutate({
      ...nextContext,
    });
  }

  return (
    <div
      ref={previewRef}
      className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Live output
          </p>

          <p className="mt-2 text-sm font-medium">{framework.name} adapter</p>
        </div>

        <span
          className="rounded-full border px-2.5 py-1 font-mono text-[10px]"
          style={{
            borderColor: "var(--g-demo-accent, #7c6cff)",
            color: "var(--g-demo-accent, #7c6cff)",
          }}
        >
          connected
        </span>
      </div>

      <div
        className="mt-6 grid border p-5 transition-all duration-300"
        style={{
          gap: "var(--g-demo-gap, 16px)",
          borderRadius: "var(--g-demo-radius, 18px)",
          backgroundColor: "var(--g-demo-surface, #121620)",
          color: "var(--g-demo-foreground, #f7f8fb)",
          borderColor:
            "color-mix(in srgb, var(--g-demo-accent, #7c6cff) 32%, transparent)",
        }}
      >
        <div>
          <p className="font-semibold">Hello, Genome</p>

          <p
            className="mt-1 text-xs leading-5"
            style={{
              color: "var(--g-demo-muted-foreground, #a5adbd)",
            }}
          >
            The adapter exposes the same resolved Core state using its
            framework’s normal reactivity model.
          </p>
        </div>

        <button
          type="button"
          className="w-fit px-4 text-xs font-medium transition-all duration-300"
          style={{
            minHeight: "var(--g-demo-control-height, 42px)",
            borderRadius: "var(--g-demo-radius, 18px)",
            backgroundColor: "var(--g-demo-accent, #7c6cff)",
            color: "#ffffff",
          }}
          onClick={mutatePreview}
        >
          Mutate context
        </button>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 font-mono text-[10px]">
        <div className="rounded-lg border bg-card p-3">
          <dt className="text-muted-foreground">accent</dt>

          <dd className="mt-1 truncate text-foreground">{accent}</dd>
        </div>

        <div className="rounded-lg border bg-card p-3">
          <dt className="text-muted-foreground">gap</dt>

          <dd className="mt-1 text-foreground">{gap}</dd>
        </div>

        <div className="rounded-lg border bg-card p-3">
          <dt className="text-muted-foreground">radius</dt>

          <dd className="mt-1 text-foreground">{radius}</dd>
        </div>

        <div className="rounded-lg border bg-card p-3">
          <dt className="text-muted-foreground">control</dt>

          <dd className="mt-1 text-foreground">{controlHeight}</dd>
        </div>
      </dl>
    </div>
  );
}

export function FrameworkShowcase() {
  const [activeFramework, setActiveFramework] = useState<FrameworkId>("core");

  const [copiedFramework, setCopiedFramework] = useState<FrameworkId | null>(
    null,
  );

  const currentFramework =
    frameworks.find((framework) => framework.id === activeFramework) ??
    frameworks[0];

  async function copyInstallation(framework: Framework) {
    await navigator.clipboard.writeText(framework.installation);

    setCopiedFramework(framework.id);

    window.setTimeout(() => {
      setCopiedFramework((current) =>
        current === framework.id ? null : current,
      );
    }, 1600);
  }

  function handleValueChange(value: string) {
    if (isFrameworkId(value)) {
      setActiveFramework(value);
    }
  }

  if (!currentFramework) {
    return null;
  }

  const CurrentIcon = currentFramework.icon;

  return (
    <section
      className="border-y bg-card/25"
      aria-labelledby="frameworks-heading"
    >
      <div className="mx-auto w-full max-w-310 px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="rounded-full">
            Framework adapters
          </Badge>

          <h2
            id="frameworks-heading"
            className="mt-5 text-balance font-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            One engine. Use your framework’s native reactivity.
          </h2>

          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            GenomeJS keeps token compilation in the framework-neutral Core
            package, then exposes resolved values through thin adapters for
            React, Vue, and Svelte.
          </p>
        </div>

        <Tabs
          value={activeFramework}
          onValueChange={handleValueChange}
          className="mt-14"
        >
          <TabsList className="mx-auto grid h-auto w-full max-w-2xl grid-cols-2 gap-1 sm:grid-cols-4">
            {frameworks.map((framework) => {
              const Icon = framework.icon;

              return (
                <TabsTrigger
                  key={framework.id}
                  value={framework.id}
                  className="min-h-11 gap-2"
                >
                  <Link2 className="size-4" aria-hidden="true" />

                  {framework.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {frameworks.map((framework) => (
            <TabsContent
              key={framework.id}
              value={framework.id}
              className="mt-6"
            >
              <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
                <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
                  <header className="border-b p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-card text-primary">
                          <Link2 className="size-5" aria-hidden="true" />
                        </span>

                        <div>
                          <h3 className="text-xl font-semibold">
                            {currentFramework.name}
                          </h3>

                          <p className="mt-1 font-mono text-xs text-primary">
                            {currentFramework.packageName}
                          </p>

                          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                            {currentFramework.description}
                          </p>
                        </div>
                      </div>

                      <a
                        href={currentFramework.docsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Read guide
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </a>
                    </div>

                    <div className="mt-5 flex min-w-0 items-center gap-3 rounded-xl border bg-card px-4 py-3">
                      <Code2
                        className="size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />

                      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs">
                        {currentFramework.installation}
                      </code>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => copyInstallation(currentFramework)}
                        aria-label={`Copy ${currentFramework.name} installation command`}
                      >
                        {copiedFramework === currentFramework.id ? (
                          <Check
                            className="size-4 text-primary"
                            aria-hidden="true"
                          />
                        ) : (
                          <Clipboard className="size-4" aria-hidden="true" />
                        )}
                      </Button>
                    </div>

                    {currentFramework.note ? (
                      <p className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs leading-5 text-muted-foreground">
                        {currentFramework.note}
                      </p>
                    ) : null}
                  </header>

                  <FrameworkCode code={currentFramework.code} />
                </div>

                <div>
                  <LiveFrameworkPreview framework={currentFramework} />

                  <div className="mt-5 rounded-2xl border bg-background p-5 sm:p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Shared runtime
                    </p>

                    <div className="mt-4 space-y-3">
                      {[
                        "Same Genome instance",
                        "Same resolved DNA values",
                        "Same CSS custom properties",
                        "Framework-native subscriptions",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                        >
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check
                              className="size-3"
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                          </span>

                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-muted-foreground">
          The live preview runs through the React adapter because this website
          is a Next.js application. The Vue and Svelte tabs show their actual
          public adapter APIs.
        </div>
      </div>
    </section>
  );
}
