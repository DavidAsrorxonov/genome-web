import { ArrowRight, Braces, Check, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { withGenome, withoutGenome } from "./content/problem-comparison";

function CodeLine({
  number,
  children,
  highlighted = false,
}: {
  number: number;
  children?: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid min-w-max grid-cols-[2rem_1fr] px-4",
        highlighted && "bg-primary/8",
      )}
    >
      <span
        aria-hidden="true"
        className="select-none pr-4 text-right text-muted-foreground/50"
      >
        {number}
      </span>

      <span>{children ?? " "}</span>
    </div>
  );
}

function WithoutGenomeCode() {
  return (
    <pre className="overflow-x-auto py-4 font-mono text-[12px] leading-6 text-foreground sm:text-[13px]">
      <code>
        <CodeLine number={1}>
          <span className="text-primary">const</span> lightTheme = {"{"}
        </CodeLine>

        <CodeLine number={2}>
          {"  "}
          <span className="text-muted-foreground">
            {"// duplicated values"}
          </span>
        </CodeLine>

        <CodeLine number={3}>{"};"}</CodeLine>

        <CodeLine number={4} />

        <CodeLine number={5}>
          <span className="text-primary">const</span> darkTheme = {"{"}
        </CodeLine>

        <CodeLine number={6}>
          {"  "}
          <span className="text-muted-foreground">
            {"// more duplicated values"}
          </span>
        </CodeLine>

        <CodeLine number={7}>{"};"}</CodeLine>

        <CodeLine number={8} />

        <CodeLine number={9}>
          <span className="text-primary">const</span> mobileTheme = {"{"}
        </CodeLine>

        <CodeLine number={10}>
          {"  "}
          <span className="text-muted-foreground">
            {"// another branch to maintain"}
          </span>
        </CodeLine>

        <CodeLine number={11}>{"};"}</CodeLine>
      </code>
    </pre>
  );
}

function WithGenomeCode() {
  return (
    <pre className="overflow-x-auto py-4 font-mono text-[12px] leading-6 text-foreground sm:text-[13px]">
      <code>
        <CodeLine number={1}>
          <span className="text-primary">const</span> tokens = {"{"}
        </CodeLine>

        <CodeLine number={2} highlighted>
          {"  "}foreground: (dna, context) =&gt;
        </CodeLine>

        <CodeLine number={3} highlighted>
          {"    "}context.mode ==={" "}
          <span className="text-primary">&quot;dark&quot;</span>
        </CodeLine>

        <CodeLine number={4} highlighted>
          {"      "}? dna.lightText
        </CodeLine>

        <CodeLine number={5} highlighted>
          {"      "}: dna.darkText,
        </CodeLine>

        <CodeLine number={6}>{"};"}</CodeLine>

        <CodeLine number={7} />

        <CodeLine number={8}>
          genome.
          <span className="text-primary">mutate</span>
          {"({ "}
          mode: <span className="text-primary">&quot;dark&quot;</span>
          {" });"}
        </CodeLine>

        <CodeLine number={9} />

        <CodeLine number={10}>
          <span className="text-muted-foreground">
            {"// --g-foreground updates"}
          </span>
        </CodeLine>
      </code>
    </pre>
  );
}

function ComparisonList({
  items,
  positive,
}: {
  items: string[];
  positive: boolean;
}) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-sm text-muted-foreground"
        >
          <span
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              positive
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {positive ? (
              <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <X className="size-3" strokeWidth={2.5} aria-hidden="true" />
            )}
          </span>

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProblemComparison() {
  return (
    <section
      className="border-y bg-card/25"
      aria-labelledby="comparison-heading"
    >
      <div className="mx-auto w-full max-w-310 px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="rounded-full">
            The problem
          </Badge>

          <h2
            id="comparison-heading"
            className="mt-5 text-balance font-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            Stop maintaining every possible state by hand.
          </h2>

          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            Traditional token systems often grow into parallel theme objects,
            breakpoint overrides, and manually synchronized branches. GenomeJS
            keeps the relationships in one token graph.
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <article className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            <header className="flex items-center justify-between gap-4 border-b px-5 py-4">
              <div>
                <p className="font-semibold">Without GenomeJS</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Every variation becomes another object to maintain.
                </p>
              </div>

              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <X className="size-4" aria-hidden="true" />
              </span>
            </header>

            <div className="border-b bg-muted/25">
              <WithoutGenomeCode />
            </div>

            <div className="p-5 sm:p-6">
              <ComparisonList items={withoutGenome} positive={false} />
            </div>
          </article>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-sm lg:flex"
          >
            <ArrowRight className="size-4 text-primary" />
          </div>

          <article className="overflow-hidden rounded-2xl border border-primary/25 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_20px_50px_rgb(0_0_0/0.06)]">
            <header className="flex items-center justify-between gap-4 border-b border-primary/15 bg-primary/[0.035] px-5 py-4">
              <div>
                <p className="font-semibold">With GenomeJS</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Declare relationships once and mutate explicit context.
                </p>
              </div>

              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Braces className="size-4" aria-hidden="true" />
              </span>
            </header>

            <div className="border-b border-primary/15 bg-primary/2.5">
              <WithGenomeCode />
            </div>

            <div className="p-5 sm:p-6">
              <ComparisonList items={withGenome} positive />
            </div>
          </article>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border bg-background px-4 py-4 text-sm leading-6 text-muted-foreground sm:px-5">
          <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />

          <p>
            GenomeJS does not replace CSS custom properties. It resolves your
            token relationships and expresses the resulting values through them.
          </p>
        </div>
      </div>
    </section>
  );
}
