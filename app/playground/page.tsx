import Link from "next/link";
import { ArrowLeft, Workflow } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto flex min-h-[70svh] w-full max-w-310 items-center px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <div className="flex size-12 items-center justify-center rounded-xl border bg-card text-primary">
            <Workflow className="size-5" aria-hidden="true" />
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            GenomeJS Playground
          </h1>

          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            The interactive context controls, dependency graph, resolved DNA
            panel, and CSS output viewer are coming in the next development
            phase.
          </p>

          <Link
            href="/"
            className={`${buttonVariants({
              variant: "outline",
            })} mt-8`}
          >
            <ArrowLeft data-icon="inline-start" aria-hidden="true" />
            Back to homepage
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
