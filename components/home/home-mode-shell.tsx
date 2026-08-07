"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type HomeMode = "human" | "agent";

type HomeModeShellProps = {
  header: ReactNode;
  human: ReactNode;
  agent: ReactNode;
  footer: ReactNode;
};

const homeModes: HomeMode[] = ["human", "agent"];

export function HomeModeShell({
  header,
  human,
  agent,
  footer,
}: HomeModeShellProps) {
  const [mode, setMode] = useState<HomeMode>("human");

  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground",
        mode === "agent" && "dark",
      )}
    >
      {header}

      {mode === "human" ? human : agent}

      {footer}

      <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 pointer-coarse:bottom-4">
        <div
          className="grid grid-cols-2 rounded-full border bg-background/85 p-1 shadow-[0_0_32px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          aria-label="Homepage view mode"
        >
          {homeModes.map((item) => {
            const active = mode === item;

            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setMode(item)}
                className={cn(
                  "min-w-24 rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,105,1,0.28)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
