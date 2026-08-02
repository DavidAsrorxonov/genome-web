import Link from "next/link";
import { ArrowRight, Braces, Network, Terminal, Zap } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroCompilerDemo } from "@/components/hero-compiler-demo";
import { ProblemComparison } from "@/components/problem-comparison";
import { HowItWorks } from "@/components/how-it-works";
import { FrameworkShowcase } from "@/components/framework-showcase";
import { CapabilityGrid } from "@/components/capability-grid";
import { ReliabilitySection } from "@/components/reliability-section";
import { FinalCta } from "@/components/final-cta";

const highlights = [
  {
    icon: Network,
    label: "Automatic dependency discovery",
  },
  {
    icon: Braces,
    label: "Safe topological resolution",
  },
  {
    icon: Zap,
    label: "Diffed CSS variable output",
  },
];

function CompilerPreview() {
  return (
    <div
      id="compiler-demo"
      className="relative rounded-2xl border bg-card p-3 text-card-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_50px_rgb(0_0_0/0.08)] sm:p-4"
    >
      <div className="flex items-center justify-between border-b px-1 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-destructive" />
          <span className="size-2 rounded-full bg-primary/50" />
          <span className="size-2 rounded-full bg-primary" />
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          live compilation
        </div>
      </div>

      <div className="grid gap-3 py-3 md:grid-cols-3">
        <div className="rounded-xl border bg-background p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Runtime context
          </p>

          <dl className="mt-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">mode</dt>

              <dd className="rounded-md bg-primary/10 px-2 py-1 text-primary">
                dark
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">scale</dt>

              <dd>1.0</dd>
            </div>

            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">contrast</dt>

              <dd>standard</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border bg-background p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Dependency graph
          </p>

          <div className="mt-4 grid gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="rounded-md border bg-card px-2 py-1 font-mono">
                base
              </span>

              <span className="text-muted-foreground">→</span>

              <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-primary">
                primary
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md border bg-card px-2 py-1 font-mono">
                surface
              </span>

              <span className="text-muted-foreground">→</span>

              <span className="rounded-md border px-2 py-1 font-mono">
                foreground
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md border bg-card px-2 py-1 font-mono">
                spacing
              </span>

              <span className="text-muted-foreground">→</span>

              <span className="rounded-md border px-2 py-1 font-mono">gap</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-background p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            CSS output
          </p>

          <div className="mt-4 space-y-2 overflow-hidden font-mono text-[11px] leading-relaxed">
            <p className="truncate">
              <span className="text-primary">--g-primary</span>
              <span className="text-muted-foreground">: oklch(...)</span>
            </p>

            <p className="truncate">
              <span className="text-primary">--g-surface</span>
              <span className="text-muted-foreground">: oklch(...)</span>
            </p>

            <p className="truncate">
              <span className="text-primary">--g-radius</span>
              <span className="text-muted-foreground">: 0.875rem</span>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-background p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Rendered interface</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Driven by the resolved token output.
            </p>
          </div>

          <div className="flex gap-2">
            <span className="hidden h-9 items-center rounded-md border px-3 text-xs text-muted-foreground sm:inline-flex">
              Cancel
            </span>

            <span className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground">
              Continue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="relative overflow-hidden">
        <section className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "linear-gradient(to bottom, black, transparent 92%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent 92%)",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-20 -z-10 size-136 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="mx-auto grid w-full max-w-310 items-center gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
            <div>
              <Badge
                variant="outline"
                className="rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-primary"
              >
                Reactive design-token compiler
              </Badge>

              <h1 className="mt-6 max-w-3xl text-balance font-heading text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Design tokens that{" "}
                <span className="text-primary">respond.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                Declare relationships once. GenomeJS discovers dependencies,
                resolves tokens safely, and expresses the result as efficient
                CSS custom properties.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/docs"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                    }),
                    "min-h-11",
                  )}
                >
                  Get started
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>

                <Link
                  href="/playground"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                    }),
                    "min-h-11",
                  )}
                >
                  Open playground
                </Link>
              </div>

              <div
                className="mt-6 flex max-w-md items-center gap-3 rounded-xl border bg-card/80 px-4 py-3 font-mono text-sm shadow-sm backdrop-blur"
                aria-label="Installation command"
              >
                <Terminal
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <code className="overflow-x-auto whitespace-nowrap">
                  npm install @genomejs/core
                </code>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {highlights.map((highlight) => {
                  const Icon = highlight.icon;

                  return (
                    <div
                      key={highlight.label}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Icon
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />

                      <span>{highlight.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* <CompilerPreview /> */}
          </div>
          <HeroCompilerDemo />
        </section>

        <ProblemComparison />

        <HowItWorks />

        <FrameworkShowcase />

        <CapabilityGrid />

        <ReliabilitySection />

        <FinalCta />
      </main>

      <SiteFooter />
    </div>
  );
}
