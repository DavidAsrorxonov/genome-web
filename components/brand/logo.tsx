import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-card text-foreground shadow-sm"> */}
      <img
        src="/images/genome-no-bg.svg"
        alt="GenomeJS Logo"
        className="size-10"
      />
      {/* </span> */}

      {!compact ? (
        <span className="text-base font-semibold tracking-tight">
          Genome
          <span className="text-primary">JS</span>
        </span>
      ) : null}
    </span>
  );
}
