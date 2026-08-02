"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useGenomeTrait } from "@genomejs/react";
import { Contrast, Laptop, Moon, Smartphone, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  createHeroDemoGenome,
  initialHeroDemoContext,
  type HeroDemoContext,
} from "@/lib/genome/hero-demo-genome";
import { cn } from "@/lib/utils";

type DemoControl = "mode" | "scale" | "contrast" | "viewport";

type DemoToken =
  | "surface"
  | "foreground"
  | "mutedForeground"
  | "buttonColor"
  | "buttonText"
  | "gap"
  | "controlHeight"
  | "panelRadius"
  | "previewWidth";

type ActiveMutation = {
  control: DemoControl;
  tokens: DemoToken[];
};

const affectedTokens: Record<DemoControl, DemoToken[]> = {
  mode: [
    "surface",
    "foreground",
    "mutedForeground",
    "buttonColor",
    "buttonText",
  ],

  scale: ["gap", "controlHeight"],

  contrast: ["buttonColor", "buttonText"],

  viewport: ["panelRadius", "previewWidth"],
};

function ControlGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>

      {children}
    </div>
  );
}

function GraphNode({
  name,
  value,
  active,
  kind = "token",
}: {
  name: string;
  value?: string;
  active: boolean;
  kind?: "context" | "token";
}) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-lg border px-2.5 py-2 transition-all duration-300",
        kind === "context" ? "bg-secondary" : "bg-card",
        active &&
          "border-primary bg-primary/10 shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_15%,transparent)]",
      )}
    >
      <p
        className={cn(
          "truncate font-mono text-[11px]",
          active ? "text-primary" : "text-foreground",
        )}
      >
        {name}
      </p>

      {value ? (
        <p className="mt-1 truncate font-mono text-[9px] text-muted-foreground">
          {value}
        </p>
      ) : null}
    </div>
  );
}

function DependencyArrow({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "shrink-0 font-mono text-xs transition-colors duration-300",
        active ? "text-primary" : "text-muted-foreground/40",
      )}
    >
      →
    </span>
  );
}

function DependencyRow({
  contextName,
  contextActive,
  tokenName,
  tokenValue,
  tokenActive,
  finalName,
  finalValue,
  finalActive,
}: {
  contextName: string;
  contextActive: boolean;
  tokenName: string;
  tokenValue?: string;
  tokenActive: boolean;
  finalName?: string;
  finalValue?: string;
  finalActive?: boolean;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5">
      <GraphNode name={contextName} active={contextActive} kind="context" />

      <DependencyArrow active={contextActive && tokenActive} />

      <GraphNode name={tokenName} value={tokenValue} active={tokenActive} />

      {finalName ? (
        <>
          <DependencyArrow active={tokenActive && Boolean(finalActive)} />

          <GraphNode
            name={finalName}
            value={finalValue}
            active={Boolean(finalActive)}
          />
        </>
      ) : (
        <>
          <span />
          <span />
        </>
      )}
    </div>
  );
}

export function HeroCompilerDemo() {
  const previewRootRef = useRef<HTMLDivElement | null>(null);

  const mutationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [genome, setGenome] = useState(() => createHeroDemoGenome(null));

  const genomeRef = useRef(genome);

  const contextRef = useRef<HeroDemoContext>(initialHeroDemoContext);

  const [context, setContext] = useState<HeroDemoContext>(
    initialHeroDemoContext,
  );

  const [activeMutation, setActiveMutation] = useState<ActiveMutation | null>(
    null,
  );

  const surface = String(useGenomeTrait(genome, "surface"));

  const foreground = String(useGenomeTrait(genome, "foreground"));

  const mutedForeground = String(useGenomeTrait(genome, "mutedForeground"));

  const buttonColor = String(useGenomeTrait(genome, "buttonColor"));

  const buttonText = String(useGenomeTrait(genome, "buttonText"));

  const gap = String(useGenomeTrait(genome, "gap"));

  const controlHeight = String(useGenomeTrait(genome, "controlHeight"));

  const panelRadius = String(useGenomeTrait(genome, "panelRadius"));

  const previewWidth = String(useGenomeTrait(genome, "previewWidth"));

  useEffect(() => {
    const target = previewRootRef.current;

    if (!target) {
      return;
    }

    const scopedGenome = createHeroDemoGenome(target, contextRef.current);

    genomeRef.current = scopedGenome;
    setGenome(scopedGenome);

    return () => {
      if (mutationTimerRef.current) {
        clearTimeout(mutationTimerRef.current);
      }
    };
  }, []);

  function applyMutation(
    control: DemoControl,
    patch: Partial<HeroDemoContext>,
  ) {
    const nextContext = {
      ...contextRef.current,
      ...patch,
    };

    contextRef.current = nextContext;
    setContext(nextContext);

    genomeRef.current.mutate({
      ...patch,
    });

    setActiveMutation({
      control,
      tokens: affectedTokens[control],
    });

    if (mutationTimerRef.current) {
      clearTimeout(mutationTimerRef.current);
    }

    mutationTimerRef.current = setTimeout(() => {
      setActiveMutation(null);
    }, 700);
  }

  function isControlActive(control: DemoControl): boolean {
    return activeMutation?.control === control;
  }

  function isTokenActive(token: DemoToken): boolean {
    return activeMutation?.tokens.includes(token) ?? false;
  }

  const outputRows: Array<{
    token: DemoToken;
    variable: string;
    value: string;
  }> = [
    {
      token: "surface",
      variable: "--g-surface",
      value: surface,
    },
    {
      token: "foreground",
      variable: "--g-foreground",
      value: foreground,
    },
    {
      token: "buttonColor",
      variable: "--g-button-color",
      value: buttonColor,
    },
    {
      token: "gap",
      variable: "--g-gap",
      value: gap,
    },
    {
      token: "panelRadius",
      variable: "--g-panel-radius",
      value: panelRadius,
    },
    {
      token: "previewWidth",
      variable: "--g-preview-width",
      value: previewWidth,
    },
  ];

  return (
    <div
      ref={previewRootRef}
      className="relative rounded-2xl border bg-card p-3 text-card-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_50px_rgb(0_0_0/0.08)] sm:p-4"
    >
      <div className="flex items-center justify-between border-b px-1 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-destructive" />
          <span className="size-2 rounded-full bg-primary/50" />
          <span className="size-2 rounded-full bg-primary" />
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="relative flex size-2">
            <span
              className={cn(
                "absolute inline-flex size-full rounded-full bg-primary opacity-0",
                activeMutation && "animate-ping opacity-40",
              )}
            />

            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>

          {activeMutation
            ? `resolving ${activeMutation.control}`
            : "runtime connected"}
        </div>
      </div>

      <div className="grid gap-3 py-3 xl:grid-cols-[0.9fr_1.25fr_1fr]">
        <section className="rounded-xl border bg-background p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Runtime context
          </p>

          <div className="mt-4 space-y-5">
            <ControlGroup label="Mode">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={context.mode === "light" ? "default" : "outline"}
                  aria-pressed={context.mode === "light"}
                  onClick={() =>
                    applyMutation("mode", {
                      mode: "light",
                    })
                  }
                >
                  <Sun data-icon="inline-start" aria-hidden="true" />
                  Light
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant={context.mode === "dark" ? "default" : "outline"}
                  aria-pressed={context.mode === "dark"}
                  onClick={() =>
                    applyMutation("mode", {
                      mode: "dark",
                    })
                  }
                >
                  <Moon data-icon="inline-start" aria-hidden="true" />
                  Dark
                </Button>
              </div>
            </ControlGroup>

            <ControlGroup label="Scale">
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0.8"
                  max="1.4"
                  step="0.1"
                  value={context.scale}
                  aria-label="Interface scale"
                  onChange={(event) =>
                    applyMutation("scale", {
                      scale: Number(event.target.value),
                    })
                  }
                  className="h-2 min-w-0 flex-1 cursor-pointer accent-primary"
                />

                <output className="w-10 text-right font-mono text-xs text-muted-foreground">
                  {context.scale.toFixed(1)}
                </output>
              </div>
            </ControlGroup>

            <ControlGroup label="Contrast">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={
                    context.contrast === "standard" ? "default" : "outline"
                  }
                  aria-pressed={context.contrast === "standard"}
                  onClick={() =>
                    applyMutation("contrast", {
                      contrast: "standard",
                    })
                  }
                >
                  Standard
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant={context.contrast === "high" ? "default" : "outline"}
                  aria-pressed={context.contrast === "high"}
                  onClick={() =>
                    applyMutation("contrast", {
                      contrast: "high",
                    })
                  }
                >
                  <Contrast data-icon="inline-start" aria-hidden="true" />
                  High
                </Button>
              </div>
            </ControlGroup>

            <ControlGroup label="Viewport">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={
                    context.viewport === "mobile" ? "default" : "outline"
                  }
                  aria-pressed={context.viewport === "mobile"}
                  onClick={() =>
                    applyMutation("viewport", {
                      viewport: "mobile",
                    })
                  }
                >
                  <Smartphone data-icon="inline-start" aria-hidden="true" />
                  Mobile
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant={
                    context.viewport === "desktop" ? "default" : "outline"
                  }
                  aria-pressed={context.viewport === "desktop"}
                  onClick={() =>
                    applyMutation("viewport", {
                      viewport: "desktop",
                    })
                  }
                >
                  <Laptop data-icon="inline-start" aria-hidden="true" />
                  Desktop
                </Button>
              </div>
            </ControlGroup>
          </div>
        </section>

        <section className="rounded-xl border bg-background p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Dependency graph
          </p>

          <div className="mt-4 space-y-2">
            <DependencyRow
              contextName="mode"
              contextActive={isControlActive("mode")}
              tokenName="surface"
              tokenValue={surface}
              tokenActive={isTokenActive("surface")}
              finalName="buttonColor"
              finalValue={buttonColor}
              finalActive={isTokenActive("buttonColor")}
            />

            <DependencyRow
              contextName="mode"
              contextActive={isControlActive("mode")}
              tokenName="foreground"
              tokenValue={foreground}
              tokenActive={isTokenActive("foreground")}
            />

            <DependencyRow
              contextName="contrast"
              contextActive={isControlActive("contrast")}
              tokenName="buttonColor"
              tokenValue={buttonColor}
              tokenActive={isTokenActive("buttonColor")}
              finalName="buttonText"
              finalValue={buttonText}
              finalActive={isTokenActive("buttonText")}
            />

            <DependencyRow
              contextName="scale"
              contextActive={isControlActive("scale")}
              tokenName="gap"
              tokenValue={gap}
              tokenActive={isTokenActive("gap")}
              finalName="controlHeight"
              finalValue={controlHeight}
              finalActive={isTokenActive("controlHeight")}
            />

            <DependencyRow
              contextName="viewport"
              contextActive={isControlActive("viewport")}
              tokenName="previewWidth"
              tokenValue={previewWidth}
              tokenActive={isTokenActive("previewWidth")}
              finalName="panelRadius"
              finalValue={panelRadius}
              finalActive={isTokenActive("panelRadius")}
            />
          </div>
        </section>

        <section className="rounded-xl border bg-background p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            CSS output
          </p>

          <div className="mt-4 space-y-2">
            {outputRows.map((row) => (
              <div
                key={row.variable}
                className={cn(
                  "rounded-md border border-transparent px-2 py-1.5 font-mono text-[10px] transition-all duration-300",
                  isTokenActive(row.token) && "border-primary/40 bg-primary/10",
                )}
              >
                <p
                  className={cn(
                    "truncate",
                    isTokenActive(row.token)
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  {row.variable}
                </p>

                <p className="mt-0.5 truncate text-muted-foreground">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border bg-background p-4">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Rendered interface</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Styled by the generated `--g-*` properties.
            </p>
          </div>

          <span className="font-mono text-[10px] text-muted-foreground">
            {context.viewport}
          </span>
        </div>

        <div className="flex justify-center overflow-hidden rounded-lg bg-muted/40 p-3">
          <div
            className="w-full border transition-[max-width,background-color,color,border-radius] duration-300"
            style={{
              maxWidth: "var(--g-preview-width, 100%)",
              backgroundColor: "var(--g-surface, #121620)",
              color: "var(--g-foreground, #f7f8fb)",
              borderRadius: "var(--g-panel-radius, 12px)",
            }}
          >
            <div
              className="grid"
              style={{
                gap: "var(--g-gap, 16px)",
                padding: "var(--g-gap, 16px)",
              }}
            >
              <div>
                <p className="text-sm font-semibold">
                  Responsive token preview
                </p>

                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{
                    color: "var(--g-muted-foreground, #a5adbd)",
                  }}
                >
                  Change the runtime context and watch only related output
                  values update.
                </p>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  className="border px-3 text-xs transition-all"
                  style={{
                    minHeight: "var(--g-control-height, 40px)",
                    borderRadius: "var(--g-panel-radius, 12px)",
                    borderColor:
                      "color-mix(in srgb, currentColor 20%, transparent)",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="px-3 text-xs font-medium transition-all"
                  style={{
                    minHeight: "var(--g-control-height, 40px)",
                    borderRadius: "var(--g-panel-radius, 12px)",
                    backgroundColor: "var(--g-button-color, #7c6cff)",
                    color: "var(--g-button-text, #ffffff)",
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
