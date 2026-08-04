import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface PlaygroundPanelProps extends ComponentPropsWithoutRef<"section"> {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  bodyClassName?: string;
}

export function PlaygroundPanel({
  icon: Icon,
  title,
  description,
  children,
  className,
  bodyClassName,
  ...props
}: PlaygroundPanelProps) {
  return (
    <section
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--radius)+0.25rem)] border bg-card/85 shadow-sm backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <header className="flex min-h-20 items-start gap-3 border-b bg-muted/25 px-4 py-4 sm:px-5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background text-primary shadow-sm">
          <Icon className="size-4" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </header>

      <div className={cn("min-h-0 flex-1 p-4 sm:p-5", bodyClassName)}>
        {children}
      </div>
    </section>
  );
}
