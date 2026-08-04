import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Eye,
  SlidersHorizontal,
  Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaygroundPanel } from "@/components/playground/playground-panel";

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

function ControlsPlaceholder() {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Preset
          </p>

          <Badge variant="outline" className="font-mono text-[10px]">
            Next step
          </Badge>
        </div>

        <div
          aria-hidden="true"
          className="mt-3 rounded-xl border bg-background p-3"
        >
          <div className="h-3 w-24 rounded-full bg-muted" />
          <div className="mt-3 h-11 rounded-lg border bg-muted/35" />
        </div>
      </div>

      <div className="h-px bg-border" />

      <div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Runtime context
        </p>

        <div aria-hidden="true" className="mt-3 space-y-3">
          {["Mode", "Scale", "Contrast", "Density"].map((label) => (
            <div key={label} className="rounded-xl border bg-background p-3">
              <div className="flex items-center justify-between gap-4">
                <div className="h-3 w-16 rounded-full bg-muted" />

                <div className="h-7 w-20 rounded-md bg-muted/70" />
              </div>

              {label === "Scale" ? (
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-muted" />
                  <div className="size-4 rounded-full border bg-background shadow-sm" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs leading-5 text-muted-foreground">
        Presets and runtime context controls will be connected to a dedicated
        Genome instance in the next step.
      </p>
    </div>
  );
}

function PreviewPlaceholder() {
  return (
    <div className="relative flex min-h-120 flex-col overflow-hidden rounded-xl border bg-background">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b bg-muted/20 px-4">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2 rounded-full bg-primary" />

          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Rendered interface
          </span>
        </div>

        <Badge variant="outline" className="font-mono text-[10px]">
          Preview
        </Badge>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-5 sm:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--g-primary),transparent_58%)] opacity-[0.08]"
        />

        <article className="relative w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="h-3 w-20 rounded-full bg-primary/25" />
              <div className="mt-3 h-7 w-52 max-w-full rounded-md bg-foreground/85" />
              <div className="mt-3 h-3 w-full rounded-full bg-muted" />
              <div className="mt-2 h-3 w-4/5 rounded-full bg-muted" />
            </div>

            <div className="size-11 shrink-0 rounded-xl border bg-primary/10" />
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3">
            {["01", "02", "03"].map((value) => (
              <div key={value} className="rounded-xl border bg-background p-3">
                <p className="font-mono text-[10px] text-muted-foreground">
                  {value}
                </p>

                <div className="mt-3 h-5 w-10 rounded bg-foreground/80" />
                <div className="mt-2 h-2.5 w-full rounded-full bg-muted" />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="h-11 flex-1 rounded-lg bg-primary" />
            <div className="h-11 flex-1 rounded-lg border bg-background" />
          </div>
        </article>
      </div>

      <div className="border-t bg-muted/15 px-4 py-3">
        <p className="text-xs leading-5 text-muted-foreground">
          This surface will render actual values produced by the playground
          Genome.
        </p>
      </div>
    </div>
  );
}

function OutputPlaceholder() {
  const outputs = [
    {
      title: "Resolved DNA",
      value: "Traits",
      icon: Braces,
    },
    {
      title: "CSS variables",
      value: "--g-*",
      icon: SlidersHorizontal,
    },
    {
      title: "Dependency graph",
      value: "Edges",
      icon: Workflow,
    },
  ];

  return (
    <div className="space-y-3">
      {outputs.map(({ title, value, icon: Icon }) => (
        <div key={title} className="rounded-xl border bg-background p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg border bg-muted/30 text-muted-foreground">
              <Icon className="size-4" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{title}</p>

              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {value}
              </p>
            </div>
          </div>

          <div aria-hidden="true" className="mt-4 space-y-2">
            <div className="h-3 w-full rounded-full bg-muted" />
            <div className="h-3 w-5/6 rounded-full bg-muted" />
            <div className="h-3 w-2/3 rounded-full bg-muted" />
          </div>
        </div>
      ))}

      <p className="pt-2 text-xs leading-5 text-muted-foreground">
        Resolved traits, expressed CSS properties, and graph relationships will
        appear here without executing visitor-provided code.
      </p>
    </div>
  );
}

function ControlsPanel({ className }: { className?: string }) {
  return (
    <PlaygroundPanel
      icon={SlidersHorizontal}
      title="Inputs"
      description="Select a preset and mutate predefined runtime context."
      className={className}
    >
      <ControlsPlaceholder />
    </PlaygroundPanel>
  );
}

function PreviewPanel({ className }: { className?: string }) {
  return (
    <PlaygroundPanel
      icon={Eye}
      title="Live preview"
      description="Observe the interface responding to resolved GenomeJS traits."
      className={className}
      bodyClassName="flex"
    >
      <PreviewPlaceholder />
    </PlaygroundPanel>
  );
}

function OutputPanel({ className }: { className?: string }) {
  return (
    <PlaygroundPanel
      icon={Workflow}
      title="Compiler output"
      description="Inspect resolved values, CSS custom properties, and dependencies."
      className={className}
    >
      <OutputPlaceholder />
    </PlaygroundPanel>
  );
}

function DesktopPlaygroundLayout() {
  return (
    <div className="hidden min-w-0 gap-4 md:grid md:grid-cols-12 lg:gap-5">
      <ControlsPanel className="md:col-span-4 lg:col-span-3" />

      <PreviewPanel className="md:col-span-8 lg:col-span-5" />

      <OutputPanel className="md:col-span-12 lg:col-span-4" />
    </div>
  );
}

function MobilePlaygroundLayout() {
  return (
    <Tabs defaultValue="controls" className="md:hidden">
      <TabsList
        aria-label="Playground panels"
        className="grid h-auto w-full grid-cols-3 rounded-xl border bg-muted/35 p-1"
      >
        <TabsTrigger value="controls" className="min-h-11 px-2 text-xs">
          Controls
        </TabsTrigger>

        <TabsTrigger value="preview" className="min-h-11 px-2 text-xs">
          Preview
        </TabsTrigger>

        <TabsTrigger value="output" className="min-h-11 px-2 text-xs">
          Output
        </TabsTrigger>
      </TabsList>

      <TabsContent value="controls" className="mt-4">
        <ControlsPanel />
      </TabsContent>

      <TabsContent value="preview" className="mt-4">
        <PreviewPanel />
      </TabsContent>

      <TabsContent value="output" className="mt-4">
        <OutputPanel />
      </TabsContent>
    </Tabs>
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
          <DesktopPlaygroundLayout />
          <MobilePlaygroundLayout />
        </section>

        <div className="mt-6 flex flex-col gap-2 border-t pt-5 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>The version-one playground mutates predefined values only.</p>

          <p className="font-mono">No eval · No arbitrary JavaScript</p>
        </div>
      </div>
    </main>
  );
}
