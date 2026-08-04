"use client";

import type { CSSProperties } from "react";

import type { Genome, Primitive } from "@genomejs/core";

import { useGenomeTrait } from "@genomejs/react";

import {
  ArrowRight,
  Check,
  Columns3,
  Contrast,
  LayoutDashboard,
  Maximize2,
  PanelRight,
  Type,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { usePlaygroundController } from "@/components/playground/playground-controller";

import type {
  PlaygroundContext,
  PlaygroundPreviewKind,
} from "@/lib/playground/types";

import { cn } from "@/lib/utils";

interface ActivePresetPreviewProps {
  genome: Genome;
  kind: PlaygroundPreviewKind;
  context: PlaygroundContext;
}

function asString(value: Primitive): string {
  return String(value);
}

function asNumber(value: Primitive): number {
  return Number(value);
}

function TraitValue({ label, value }: { label: string; value: Primitive }) {
  return (
    <div className="min-w-0 rounded-lg border border-current/10 bg-black/2.5 px-3 py-2 dark:bg-white/2.5">
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] opacity-50">
        {label}
      </p>

      <p className="mt-1 truncate font-mono text-[11px] font-medium">
        {String(value)}
      </p>
    </div>
  );
}

function PreparingPreview() {
  return (
    <div className="flex min-h-104 flex-1 items-center justify-center p-8">
      <div className="text-center">
        <span
          aria-hidden="true"
          className="mx-auto block size-3 animate-pulse rounded-full bg-primary"
        />

        <p className="mt-4 text-sm font-medium">Preparing the runtime</p>

        <p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">
          GenomeJS is compiling the selected preset and expressing its resolved
          properties.
        </p>
      </div>
    </div>
  );
}

function ThemePreview({ genome }: { genome: Genome }) {
  const mode = useGenomeTrait(genome, "resolvedMode");

  const background = useGenomeTrait(genome, "background");

  const surface = useGenomeTrait(genome, "surface");

  const foreground = useGenomeTrait(genome, "foreground");

  const primary = useGenomeTrait(genome, "primary");

  const accessiblePrimary = useGenomeTrait(genome, "primaryForeground");

  const spacing = useGenomeTrait(genome, "spacing");

  const radius = useGenomeTrait(genome, "radius");

  const controlHeight = useGenomeTrait(genome, "controlHeight");

  return (
    <div
      className="flex min-h-104 flex-1 items-center justify-center p-4 transition-colors sm:p-7"
      style={{
        backgroundColor: asString(background),

        color: asString(foreground),
      }}
    >
      <div
        className="w-full max-w-lg border shadow-lg transition-all"
        style={{
          padding: asString(spacing),

          borderRadius: asString(radius),

          backgroundColor: asString(surface),

          borderColor: "color-mix(in srgb, currentColor 14%, transparent)",
        }}
      >
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex size-10 items-center justify-center rounded-xl"
              style={{
                backgroundColor: asString(primary),

                color: asString(surface),
              }}
            >
              <LayoutDashboard className="size-4" aria-hidden="true" />
            </div>

            <div>
              <p className="text-sm font-semibold">Interface system</p>

              <p className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-55">
                {asString(mode)} runtime
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className="border-current/15 bg-transparent font-mono text-[10px]"
          >
            Live
          </Badge>
        </header>

        <div
          className="grid"
          style={{
            gap: asString(spacing),

            marginTop: asString(spacing),
          }}
        >
          <section
            className="border border-current/10 bg-black/2.5 p-4 dark:bg-white/2.5"
            style={{
              borderRadius: asString(radius),
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-55">
              Current workspace
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-tight">
              Runtime-aware dashboard
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 opacity-65">
              Semantic colors, spacing, control height, and radius are derived
              from one shared context.
            </p>
          </section>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <TraitValue label="Spacing" value={spacing} />

            <TraitValue label="Radius" value={radius} />

            <TraitValue label="Control" value={controlHeight} />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 px-4 text-xs font-semibold shadow-sm transition-transform active:scale-[0.98]"
              style={{
                minHeight: asString(controlHeight),

                borderRadius: asString(radius),

                backgroundColor: asString(accessiblePrimary),

                color: asString(surface),
              }}
            >
              Create project
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="flex flex-1 items-center justify-center border border-current/15 px-4 text-xs font-semibold transition-colors hover:bg-current/5"
              style={{
                minHeight: asString(controlHeight),

                borderRadius: asString(radius),
              }}
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographyPreview({ genome }: { genome: Genome }) {
  const bodySize = useGenomeTrait(genome, "bodySize");

  const headingSize = useGenomeTrait(genome, "headingSize");

  const eyebrowSize = useGenomeTrait(genome, "eyebrowSize");

  const lineHeight = useGenomeTrait(genome, "lineHeight");

  const headingLineHeight = useGenomeTrait(genome, "headingLineHeight");

  const paragraphGap = useGenomeTrait(genome, "paragraphGap");

  const readingMeasure = useGenomeTrait(genome, "readingMeasure");

  return (
    <div className="flex min-h-104 flex-1 items-center justify-center overflow-auto bg-[#f5f1e8] p-5 text-[#25231f] sm:p-8 dark:bg-[#171715] dark:text-[#f3efe4]">
      <article
        className="mx-auto w-full"
        style={{
          maxWidth: asString(readingMeasure),
        }}
      >
        <div className="flex items-center gap-2">
          <Type className="size-4 opacity-55" aria-hidden="true" />

          <p
            className="font-mono font-semibold uppercase tracking-[0.18em] opacity-55"
            style={{
              fontSize: asString(eyebrowSize),
            }}
          >
            Responsive systems
          </p>
        </div>

        <h2
          className="mt-5 text-balance font-serif font-semibold tracking-[-0.045em]"
          style={{
            fontSize: asString(headingSize),

            lineHeight: asNumber(headingLineHeight),
          }}
        >
          Typography that scales without multiplying breakpoints.
        </h2>

        <div
          className="mt-6 border-l-2 border-current/20 pl-4 sm:pl-6"
          style={{
            display: "grid",

            gap: asString(paragraphGap),

            fontSize: asString(bodySize),

            lineHeight: asNumber(lineHeight),
          }}
        >
          <p>
            Fluid values can remain in CSS while runtime context handles
            user-controlled scale and reading density.
          </p>

          <p>
            A single token relationship can respond continuously across viewport
            sizes without duplicating every intermediate state.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <TraitValue label="Heading" value={headingSize} />

          <TraitValue label="Body" value={bodySize} />

          <TraitValue label="Measure" value={readingMeasure} />

          <TraitValue label="Leading" value={lineHeight} />
        </div>
      </article>
    </div>
  );
}

function ContrastPreview({ genome }: { genome: Genome }) {
  const surface = useGenomeTrait(genome, "surface");

  const foreground = useGenomeTrait(genome, "foreground");

  const target = useGenomeTrait(genome, "contrastTarget");

  const achievedRatio = useGenomeTrait(genome, "achievedRatio");

  const status = useGenomeTrait(genome, "contrastStatus");

  const border = useGenomeTrait(genome, "border");

  const targetNumber = asNumber(target);

  const achievedNumber = asNumber(achievedRatio);

  const progress = Math.min(100, (achievedNumber / targetNumber) * 100);

  const passes = asString(status) === "passes";

  return (
    <div
      className="flex min-h-104 flex-1 items-center justify-center p-5 transition-colors sm:p-8"
      style={{
        backgroundColor: asString(surface),

        color: asString(foreground),
      }}
    >
      <section
        className="w-full max-w-lg border p-5 shadow-sm sm:p-7"
        style={{
          borderColor: asString(border),

          borderRadius: "18px",
        }}
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Contrast className="size-4" aria-hidden="true" />

              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] opacity-60">
                Contrast resolver
              </p>
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Accessible foreground
            </h2>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 border-current/20 bg-transparent font-mono text-[10px]",
              passes && "text-emerald-600 dark:text-emerald-400",
            )}
          >
            {passes ? <Check className="size-3" aria-hidden="true" /> : null}

            {asString(status)}
          </Badge>
        </header>

        <p className="mt-5 max-w-md text-base leading-7">
          This text color was resolved from a preferred accent and adjusted
          against the active surface.
        </p>

        <div className="mt-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-55">
                Achieved ratio
              </p>

              <p className="mt-1 text-4xl font-semibold tracking-[-0.04em]">
                {achievedNumber.toFixed(2)}
                <span className="text-lg opacity-55">:1</span>
              </p>
            </div>

            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-55">
                Target
              </p>

              <p className="mt-1 text-lg font-semibold">
                {targetNumber.toFixed(1)}
                :1
              </p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-current/10">
            <div
              className="h-full rounded-full bg-current transition-[width]"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <div
            className="rounded-xl border p-3"
            style={{
              borderColor: asString(border),
            }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] opacity-50">
              Surface
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span
                className="size-6 rounded-md border"
                style={{
                  backgroundColor: asString(surface),

                  borderColor: asString(border),
                }}
              />

              <span className="truncate font-mono text-[10px]">
                {asString(surface)}
              </span>
            </div>
          </div>

          <div
            className="rounded-xl border p-3"
            style={{
              borderColor: asString(border),
            }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] opacity-50">
              Foreground
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span
                className="size-6 rounded-md border"
                style={{
                  backgroundColor: asString(foreground),

                  borderColor: asString(border),
                }}
              />

              <span className="truncate font-mono text-[10px]">
                {asString(foreground)}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContainerCardPreview({
  genome,
  context,
}: {
  genome: Genome;
  context: PlaygroundContext;
}) {
  const surface = useGenomeTrait(genome, "surface");

  const foreground = useGenomeTrait(genome, "foreground");

  const tier = useGenomeTrait(genome, "containerTier");

  const columns = useGenomeTrait(genome, "columns");

  const direction = useGenomeTrait(genome, "cardDirection");

  const gap = useGenomeTrait(genome, "gap");

  const padding = useGenomeTrait(genome, "padding");

  const mediaRatio = useGenomeTrait(genome, "mediaRatio");

  const mediaWidth = useGenomeTrait(genome, "mediaWidth");

  const titleSize = useGenomeTrait(genome, "titleSize");

  const cards = [
    {
      title: "Compiler architecture",
      number: "01",
    },
    {
      title: "Reactive context",
      number: "02",
    },
    {
      title: "Scoped output",
      number: "03",
    },
  ];

  return (
    <div className="flex min-h-104 flex-1 items-center justify-center overflow-auto bg-muted/25 p-4 sm:p-6">
      <div
        className="transition-[width] duration-200"
        style={{
          width: `min(100%, ${context.containerWidth}px)`,
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Maximize2
              className="size-3.5 text-muted-foreground"
              aria-hidden="true"
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Controlled container
            </span>
          </div>

          <Badge variant="outline" className="font-mono text-[10px]">
            {Math.round(context.containerWidth)}
            px · {asString(tier)}
          </Badge>
        </div>

        <div
          className="grid border bg-background/50 p-3 shadow-sm"
          style={{
            gridTemplateColumns: `repeat(${asNumber(columns)}, minmax(0, 1fr))`,

            gap: asString(gap),

            borderRadius: "18px",
          }}
        >
          {cards.map((card) => (
            <article
              key={card.number}
              className="flex min-w-0 border shadow-sm transition-all"
              style={{
                flexDirection: asString(
                  direction,
                ) as CSSProperties["flexDirection"],

                gap: asString(gap),

                padding: asString(padding),

                borderRadius: "14px",

                backgroundColor: asString(surface),

                color: asString(foreground),

                borderColor:
                  "color-mix(in srgb, currentColor 14%, transparent)",
              }}
            >
              <div
                className="flex shrink-0 items-center justify-center overflow-hidden bg-current/10"
                style={{
                  width: asString(mediaWidth),

                  aspectRatio: asString(mediaRatio),

                  borderRadius: "10px",
                }}
              >
                <Columns3 className="size-5 opacity-55" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] opacity-50">
                  {card.number}
                </p>

                <h3
                  className="mt-2 font-semibold leading-tight"
                  style={{
                    fontSize: asString(titleSize),
                  }}
                >
                  {card.title}
                </h3>

                <p className="mt-2 text-xs leading-5 opacity-60">
                  Layout derived from the component&apos;s controlled width.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScopedComponentPreview({ genome }: { genome: Genome }) {
  const surface = useGenomeTrait(genome, "surface");

  const foreground = useGenomeTrait(genome, "foreground");

  const accent = useGenomeTrait(genome, "accent");

  const spacing = useGenomeTrait(genome, "spacing");

  const radius = useGenomeTrait(genome, "radius");

  const controlHeight = useGenomeTrait(genome, "controlHeight");

  const border = useGenomeTrait(genome, "border");

  const scopeLabel = useGenomeTrait(genome, "scopeLabel");

  return (
    <div className="flex min-h-104 flex-1 items-center justify-center bg-background p-5 text-foreground sm:p-8">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Host application
            </p>

            <p className="mt-1 text-sm font-medium">Global website theme</p>
          </div>

          <Badge variant="outline" className="font-mono text-[10px]">
            Parent
          </Badge>
        </header>

        <div className="my-5 h-px bg-border" />

        <aside
          className="border shadow-lg transition-all"
          style={{
            padding: asString(spacing),

            borderRadius: asString(radius),

            borderColor: asString(border),

            backgroundColor: asString(surface),

            color: asString(foreground),
          }}
        >
          <header className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex size-9 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: asString(accent),

                  color: asString(surface),
                }}
              >
                <PanelRight className="size-4" aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-semibold">Inspector</p>

                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] opacity-55">
                  Scoped Genome
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="border-current/15 bg-transparent font-mono text-[9px]"
            >
              {asString(scopeLabel)}
            </Badge>
          </header>

          <div
            className="grid"
            style={{
              gap: asString(spacing),

              marginTop: asString(spacing),
            }}
          >
            <div
              className="border border-current/10 bg-black/2.5 p-3 dark:bg-white/2.5"
              style={{
                borderRadius: asString(radius),
              }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] opacity-50">
                Local context
              </p>

              <p className="mt-2 text-sm leading-6 opacity-70">
                This subtree uses independent mode, density, scale, spacing, and
                radius values.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center justify-center px-4 text-xs font-semibold shadow-sm"
              style={{
                minHeight: asString(controlHeight),

                borderRadius: asString(radius),

                backgroundColor: asString(accent),

                color: asString(surface),
              }}
            >
              Apply scoped action
            </button>
          </div>
        </aside>

        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          The outer host stays on the website theme while the inner component
          responds to the playground Genome.
        </p>
      </div>
    </div>
  );
}

function ActivePresetPreview({
  genome,
  kind,
  context,
}: ActivePresetPreviewProps) {
  switch (kind) {
    case "theme":
      return <ThemePreview genome={genome} />;

    case "typography":
      return <TypographyPreview genome={genome} />;

    case "contrast":
      return <ContrastPreview genome={genome} />;

    case "container-card":
      return <ContainerCardPreview genome={genome} context={context} />;

    case "scoped-component":
      return <ScopedComponentPreview genome={genome} />;
  }
}

export function PlaygroundLivePreview() {
  const { preset, context, genome, runtimeReady, previewTargetRef } =
    usePlaygroundController();

  return (
    <div
      ref={previewTargetRef}
      data-playground-preview
      className="relative flex min-h-120 w-full flex-col overflow-hidden rounded-xl border bg-background"
    >
      <header className="flex min-h-11 items-center justify-between gap-3 border-b bg-muted/20 px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "size-2 shrink-0 rounded-full",
              runtimeReady ? "bg-emerald-500" : "bg-amber-500",
            )}
          />

          <span className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {preset.preview.title}
          </span>
        </div>

        <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
          {preset.shortTitle}
        </Badge>
      </header>

      <div aria-live="polite" className="flex min-h-0 flex-1">
        {genome ? (
          <ActivePresetPreview
            key={preset.id}
            genome={genome}
            kind={preset.preview.kind}
            context={context}
          />
        ) : (
          <PreparingPreview />
        )}
      </div>

      <footer className="border-t bg-muted/15 px-4 py-3">
        <p className="text-xs leading-5 text-muted-foreground">
          {preset.preview.description}
        </p>

        <p className="mt-1 font-mono text-[10px] text-muted-foreground/75">
          {context.mode}
          {" · "}
          {context.contrast}
          {" · "}
          {context.density}
          {" · "}
          {context.scale.toFixed(2)}×{" · "}
          {Math.round(context.containerWidth)}
          px
        </p>
      </footer>
    </div>
  );
}
