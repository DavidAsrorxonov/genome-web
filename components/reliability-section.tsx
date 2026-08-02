import type { ComponentType } from "react";
import {
  Braces,
  Check,
  CircleAlert,
  Gauge,
  GitBranch,
  Link2,
  Server,
  ShieldCheck,
  SquareTerminal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type VerificationItem = {
  label: string;
  detail: string;
};

type Safeguard = {
  title: string;
  description: string;
  example: string[];
  icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
};

const verificationItems: VerificationItem[] = [
  {
    label: "Core engine tests",
    detail:
      "Resolution order, graph validation, CSS diffing, and scoped context.",
  },
  {
    label: "React adapter tests",
    detail: "Initial trait reads and reactive updates after mutation.",
  },
  {
    label: "React SSR verification",
    detail: "Traits render through React DOM Server without a browser DOM.",
  },
  {
    label: "Vue adapter tests",
    detail: "Reactive Vue refs subscribe to the shared Genome runtime.",
  },
  {
    label: "Svelte adapter tests",
    detail: "Rune-aware state follows Genome subscriptions.",
  },
  {
    label: "TypeScript project references",
    detail: "The complete monorepo is checked through tsc -b.",
  },
  {
    label: "Workspace builds",
    detail: "All publishable packages are built before release.",
  },
  {
    label: "GitHub Actions CI",
    detail:
      "Install, typecheck, build, and test run on pushes and pull requests.",
  },
];

const safeguards: Safeguard[] = [
  {
    title: "Circular graphs fail early",
    description:
      "GenomeJS detects cycles while compiling the dependency graph, before invalid token output reaches the interface.",
    icon: GitBranch,
    example: [
      "CircularDependencyError",
      "",
      "a → b → c → a",
      "",
      "Resolution stopped.",
    ],
  },
  {
    title: "Unknown tokens fail clearly",
    description:
      "References to primitives or tokens that do not exist produce a dedicated unresolved-token error.",
    icon: CircleAlert,
    example: [
      "UnresolvedTokenError",
      "",
      'Token "surface" reads:',
      '  "missingColor"',
      "",
      "Unknown reference.",
    ],
  },
  {
    title: "Unchanged CSS stays untouched",
    description:
      "GenomeJS stores the last expressed value and skips identical CSS custom-property writes.",
    icon: Gauge,
    example: [
      "genome.mutate({ scale: 1 })",
      "",
      "--g-gap: unchanged",
      "--g-radius: unchanged",
      "",
      "0 redundant writes",
    ],
  },
];

function TerminalHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-5">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-destructive" />
        <span className="size-2 rounded-full bg-primary/40" />
        <span className="size-2 rounded-full bg-primary" />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
    </div>
  );
}

function VerificationPanel() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <TerminalHeader title="Repository safeguards" />

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3 border-b pb-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-card text-primary">
            <SquareTerminal className="size-5" aria-hidden="true" />
          </span>

          <div>
            <p className="font-mono text-sm">$ npm run verify</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Representative project checks. This is not a live CI status feed.
            </p>
          </div>
        </div>

        <ul className="mt-5 space-y-4">
          {verificationItems.map((item) => (
            <li key={item.label} className="grid grid-cols-[1.25rem_1fr] gap-3">
              <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check
                  className="size-3"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>

              <div>
                <p className="font-mono text-xs text-foreground">
                  {item.label}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t pt-5 font-mono text-xs">
          <p className="text-muted-foreground">
            <span className="text-primary">configured:</span> typecheck → build
            → test
          </p>
        </div>
      </div>
    </div>
  );
}

function SafeguardCard({ safeguard }: { safeguard: Safeguard }) {
  const Icon = safeguard.icon;

  return (
    <article className="overflow-hidden rounded-2xl border bg-background">
      <div className="flex items-start gap-4 border-b p-5 sm:p-6">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-card text-primary">
          <Link2 className="size-5" aria-hidden="true" />
        </span>

        <div>
          <h3 className="font-semibold">{safeguard.title}</h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {safeguard.description}
          </p>
        </div>
      </div>

      <pre className="overflow-x-auto bg-muted/20 p-5 font-mono text-[11px] leading-6 sm:p-6 sm:text-xs">
        <code>
          {safeguard.example.map((line, index) => (
            <span
              key={`${safeguard.title}-${index}`}
              className="block min-w-max"
            >
              <span
                className={cn(
                  line.includes("Error") ||
                    line.includes("Resolution stopped") ||
                    line.includes("Unknown reference") ||
                    line.includes("0 redundant writes")
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {line || " "}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </article>
  );
}

export function ReliabilitySection() {
  return (
    <section
      className="border-y bg-card/25"
      aria-labelledby="reliability-heading"
    >
      <div className="mx-auto w-full max-w-310 px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="rounded-full">
            Reliability
          </Badge>

          <h2
            id="reliability-heading"
            className="mt-5 text-balance font-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            Invalid graphs fail before they become broken interfaces.
          </h2>

          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            GenomeJS validates token relationships, reports unresolved
            references, and avoids rewriting CSS values that have not actually
            changed.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          <VerificationPanel />

          <div className="grid gap-5">
            {safeguards.map((safeguard) => (
              <SafeguardCard key={safeguard.title} safeguard={safeguard} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border bg-background p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>

          <div>
            <p className="font-semibold">
              Predictable failure is part of the API.
            </p>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Circular references fail early. Unknown tokens fail clearly.
              Unchanged CSS values are not rewritten.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Braces className="size-3.5 text-primary" aria-hidden="true" />
            Typed packages
          </span>

          <span className="inline-flex items-center gap-2">
            <Server className="size-3.5 text-primary" aria-hidden="true" />
            SSR covered
          </span>

          <span className="inline-flex items-center gap-2">
            <GitBranch className="size-3.5 text-primary" aria-hidden="true" />
            Graph validated
          </span>
        </div>
      </div>
    </section>
  );
}
