import Link from "next/link";
import { ArrowRight, Braces, Network, Terminal, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export function Landing() {
  return (
    <>
      <link
        rel="preload"
        href="/video/genome-video.mp4"
        as="video"
        type="video/mp4"
        fetchPriority="high"
      />

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

        <div className="mx-auto grid w-full max-w-310 items-center gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
          <div>
            <Badge
              variant="outline"
              className="rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-primary"
            >
              Reactive design-token compiler
            </Badge>

            <h1 className="mt-6 max-w-3xl text-balance font-heading text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Design tokens that <span className="text-primary">respond.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              Declare relationships once. GenomeJS discovers dependencies,
              resolves tokens safely, and expresses the result as efficient CSS
              custom properties.
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

          <div className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_70px_rgb(0_0_0/0.10)]">
            <video
              className="aspect-video h-auto w-full bg-muted object-cover"
              width={1280}
              height={720}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="GenomeJS interface animation"
            >
              <source src="/video/genome-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </>
  );
}
