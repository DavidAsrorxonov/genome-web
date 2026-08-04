import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { PlaygroundWorkspace } from "@/components/playground/playground-workspace";

function PlaygroundGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14]"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",

        backgroundSize: "32px 32px",

        maskImage:
          "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",

        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
      }}
    />
  );
}

export function PlaygroundShell() {
  return (
    <main className="relative isolate flex-1 overflow-hidden">
      <PlaygroundGridBackground />

      <div className="mx-auto w-full max-w-360 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-8 flex flex-col gap-6 border-b pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="mb-4 gap-2 font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-primary"
              />
              Controlled playground
            </Badge>

            <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Watch runtime context compile into interface state.
            </h1>

            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Select predefined examples, change their environment, and inspect
              the real traits and CSS custom properties produced by GenomeJS.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-emerald-500"
              />
              Safe controlled state
            </div>

            <Link
              href="/docs/core-concepts"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Review core concepts
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </header>

        <section
          aria-label="GenomeJS controlled playground"
          className="min-w-0"
        >
          <PlaygroundWorkspace />
        </section>

        <div className="mt-6 flex flex-col gap-2 border-t pt-5 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>The version-one playground mutates predefined values only.</p>

          <p className="font-mono">No eval · No arbitrary JavaScript</p>
        </div>
      </div>
    </main>
  );
}
