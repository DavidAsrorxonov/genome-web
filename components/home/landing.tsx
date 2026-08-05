"use client";

import Link from "next/link";
import { ArrowRight, Terminal, Clipboard, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { packages } from "@/constants/packages";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { highlights } from "./content/landing";
import { useCopyToClipboard } from "@/lib/hooks/use-copy";

export function Landing() {
  const { copyToClipboard, isCopied } = useCopyToClipboard(3000);

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
                href={routes.docs}
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
                href={routes.playground}
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

            <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-xl border bg-background px-4 py-3 text-left shadow-sm">
              <Terminal
                className="size-4 shrink-0 text-primary"
                aria-hidden="true"
              />

              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm">
                {packages.core.install}
              </code>

              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => copyToClipboard(packages.core.install)}
                aria-label="Copy installation command"
                title="Copy installation command"
              >
                {isCopied ? (
                  <Check className="size-4 text-primary" aria-hidden="true" />
                ) : (
                  <Clipboard className="size-4" aria-hidden="true" />
                )}
              </Button>
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
