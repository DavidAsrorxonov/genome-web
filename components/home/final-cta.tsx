"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clipboard,
  GitBranch,
  Terminal,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const installationCommand = "npm install @genomejs/core";

export function FinalCta() {
  const [copied, setCopied] = useState(false);

  async function copyInstallationCommand() {
    try {
      await navigator.clipboard.writeText(installationCommand);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-128 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto w-full max-w-310 px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl border bg-card/90 px-5 py-12 text-center text-card-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_70px_rgb(0_0_0/0.08)] backdrop-blur sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-20 size-64 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative mx-auto max-w-4xl">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border bg-background text-primary shadow-sm">
              <Terminal className="size-5" aria-hidden="true" />
            </div>

            <h2
              id="final-cta-heading"
              className="mt-7 text-balance font-heading text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl"
            >
              Build design systems that react to their{" "}
              <span className="text-primary">environment.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              Define token relationships once, mutate runtime context
              explicitly, and let GenomeJS resolve the resulting interface.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-xl border bg-background px-4 py-3 text-left shadow-sm">
              <Terminal
                className="size-4 shrink-0 text-primary"
                aria-hidden="true"
              />

              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm">
                {installationCommand}
              </code>

              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={copyInstallationCommand}
                aria-label="Copy installation command"
                title="Copy installation command"
              >
                {copied ? (
                  <Check className="size-4 text-primary" aria-hidden="true" />
                ) : (
                  <Clipboard className="size-4" aria-hidden="true" />
                )}
              </Button>
            </div>

            <p
              className="mt-2 min-h-5 text-xs text-muted-foreground"
              aria-live="polite"
            >
              {copied
                ? "Installation command copied."
                : "Install the framework-neutral Core package."}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/docs"
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "min-h-11",
                )}
              >
                Read the documentation
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>

              <a
                href="https://github.com/DavidAsrorxonov/genome"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "min-h-11",
                )}
              >
                <GitBranch data-icon="inline-start" aria-hidden="true" />
                View on GitHub
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>Framework-neutral core</span>
              <span aria-hidden="true">•</span>
              <span>React, Vue, Svelte</span>
              <span aria-hidden="true">•</span>
              <span>MIT licensed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
