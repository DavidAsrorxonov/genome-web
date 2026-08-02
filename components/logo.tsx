import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-card text-foreground shadow-sm">
        <svg viewBox="0 0 32 32" className="size-5" aria-hidden="true">
          <path
            d="M7 8h9m0 0 9 8M7 24h9m0 0 9-8M16 8v16"
            className="stroke-muted-foreground"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <circle cx="7" cy="8" r="2.4" className="fill-primary" />

          <circle cx="7" cy="24" r="2.4" className="fill-primary" />

          <circle
            cx="16"
            cy="8"
            r="2.4"
            className="fill-accent stroke-primary"
            strokeWidth="1.2"
          />

          <circle
            cx="16"
            cy="24"
            r="2.4"
            className="fill-accent stroke-primary"
            strokeWidth="1.2"
          />

          <circle cx="25" cy="16" r="3" className="fill-primary" />
        </svg>
      </span>

      {!compact ? (
        <span className="text-base font-semibold tracking-tight">
          Genome
          <span className="text-primary">JS</span>
        </span>
      ) : null}
    </span>
  );
}
