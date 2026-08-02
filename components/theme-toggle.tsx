"use client";

import { Moon, Sun } from "lucide-react";

import { useSiteGenome } from "@/components/providers/genome-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { context, setMode } = useSiteGenome();

  const nextMode = context.mode === "dark" ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className={cn("shrink-0", className)}
      onClick={() => setMode(nextMode)}
      aria-label={`Switch to ${nextMode} mode`}
      title={`Switch to ${nextMode} mode`}
    >
      <Sun className="size-4 dark:hidden" aria-hidden="true" />

      <Moon className="hidden size-4 dark:block" aria-hidden="true" />

      <span className="sr-only">Switch to {nextMode} mode</span>
    </Button>
  );
}
