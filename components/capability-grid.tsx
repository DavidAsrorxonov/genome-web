import type { ComponentType } from "react";
import {
  Blocks,
  CircleAlert,
  Gauge,
  GitBranch,
  Link2,
  Network,
  RefreshCcw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Capability = {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  featured?: boolean;
};

const capabilities: Capability[] = [
  {
    number: "01",
    title: "Automatic dependency discovery",
    description:
      "Token relationships are inferred from the values each function reads.",
    detail:
      "No manually maintained dependency arrays or separate graph declarations.",
    icon: Network,
    featured: true,
  },
  {
    number: "02",
    title: "Safe resolution",
    description:
      "Derived tokens are topologically ordered before their values are resolved.",
    detail:
      "Dependencies resolve in a predictable order, even across multiple token layers.",
    icon: GitBranch,
  },
  {
    number: "03",
    title: "Clear errors",
    description:
      "Circular relationships and unresolved token references fail early.",
    detail:
      "Invalid graphs surface descriptive errors instead of silently producing broken output.",
    icon: CircleAlert,
  },
  {
    number: "04",
    title: "Reactive context",
    description: "Call genome.mutate() when runtime conditions change.",
    detail:
      "Color mode, contrast, scale, viewport state, and custom context remain explicit.",
    icon: RefreshCcw,
    featured: true,
  },
  {
    number: "05",
    title: "Efficient CSS output",
    description:
      "Only CSS custom properties whose resolved values changed are rewritten.",
    detail:
      "GenomeJS keeps the last expressed values and avoids identical style writes.",
    icon: Gauge,
  },
  {
    number: "06",
    title: "Framework adapters",
    description: "Use the same Core engine with React, Vue, and Svelte.",
    detail:
      "Each adapter exposes Genome state through its framework’s normal reactivity model.",
    icon: Blocks,
  },
];

const utilities = [
  {
    name: "contrastRatio",
    description: "Measure color contrast.",
  },
  {
    name: "lockContrast",
    description: "Adjust colors toward a target ratio.",
  },
  {
    name: "fluidScale",
    description: "Generate responsive type values.",
  },
  {
    name: "bindContainerSize",
    description: "Connect container dimensions.",
  },
  {
    name: "bindMediaQueries",
    description: "Connect media-query state.",
  },
  {
    name: "scope",
    description: "Create isolated Genome instances.",
  },
];

function CapabilityCard({ capability }: { capability: Capability }) {
  const Icon = capability.icon;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-6 text-card-foreground transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_45px_rgb(0_0_0/0.06)] sm:p-7",
        capability.featured &&
          "bg-linear-to-br from-primary/[0.07] via-card to-card",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-primary/5 blur-2xl transition-colors group-hover:bg-primary/10"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-11 items-center justify-center rounded-xl border bg-background text-primary shadow-sm">
            <Link2 className="size-5" aria-hidden="true" />
          </span>

          <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
            {capability.number}
          </span>
        </div>

        <h3 className="mt-7 text-xl font-semibold tracking-tight">
          {capability.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-foreground/85">
          {capability.description}
        </p>

        <div className="my-5 h-px bg-border" />

        <p className="text-sm leading-6 text-muted-foreground">
          {capability.detail}
        </p>
      </div>
    </article>
  );
}

export function CapabilityGrid() {
  return (
    <section aria-labelledby="capabilities-heading" className="relative">
      <div className="mx-auto w-full max-w-310 px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="rounded-full">
            Core capabilities
          </Badge>

          <h2
            id="capabilities-heading"
            className="mt-5 text-balance font-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            A token engine built around relationships, not duplicated states.
          </h2>

          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            GenomeJS handles dependency discovery, resolution, runtime mutation,
            and CSS expression while keeping the resulting interface compatible
            with normal platform primitives.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.title} capability={capability} />
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border bg-card/50">
          <div className="flex flex-col gap-3 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="font-semibold">Included utilities</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Smaller APIs for accessibility, responsive values, environmental
                state, and scoped output.
              </p>
            </div>

            <span className="w-fit rounded-full border bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              @genomejs/core
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {utilities.map((utility, index) => (
              <div
                key={utility.name}
                className={cn(
                  "p-5 sm:p-6",
                  index !== utilities.length - 1 && "border-b",
                  index % 2 === 0 ? "sm:border-r" : "",
                  index < utilities.length - 2
                    ? "sm:border-b"
                    : "sm:border-b-0",
                  index % 3 !== 2 ? "lg:border-r" : "lg:border-r-0",
                  index < 3 ? "lg:border-b" : "lg:border-b-0",
                )}
              >
                <code className="font-mono text-sm font-medium text-primary">
                  {utility.name}()
                </code>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {utility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
