"use client";

import type { LucideIcon } from "lucide-react";

import {
  Accessibility,
  Boxes,
  Check,
  Palette,
  PanelsTopLeft,
  Type,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { usePlaygroundController } from "@/components/playground/playground-controller";

import { playgroundPresets } from "@/lib/playground/presets";

import type {
  PlaygroundContextKey,
  PlaygroundPreviewKind,
} from "@/lib/playground/types";

import { cn } from "@/lib/utils";

const presetIcons = {
  theme: Palette,
  typography: Type,
  contrast: Accessibility,
  "container-card": PanelsTopLeft,
  "scoped-component": Boxes,
} satisfies Record<PlaygroundPreviewKind, LucideIcon>;

const contextLabels = {
  mode: "Mode",
  contrast: "Contrast",
  density: "Density",
  scale: "Scale",
  containerWidth: "Container",
} satisfies Record<PlaygroundContextKey, string>;

export function PlaygroundPresetCatalog() {
  const { presetId, selectPreset } = usePlaygroundController();

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Presets
        </p>

        <Badge variant="outline" className="font-mono text-[10px]">
          {playgroundPresets.length} examples
        </Badge>
      </div>

      <div className="mt-3 space-y-2">
        {playgroundPresets.map((preset) => {
          const Icon = presetIcons[preset.preview.kind];

          const isActive = preset.id === presetId;

          return (
            <button
              key={preset.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                selectPreset(preset.id);
              }}
              className={cn(
                "min-h-11 w-full rounded-xl border bg-background p-3 text-left transition-colors",
                "hover:border-primary/35 hover:bg-muted/25",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive && "border-primary/45 bg-primary/6 shadow-sm",
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/30 text-muted-foreground",
                    isActive && "border-primary/30 bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">
                      {preset.shortTitle}
                    </span>

                    {isActive ? (
                      <Badge
                        variant="secondary"
                        className="h-5 gap-1 px-1.5 font-mono text-[9px] uppercase tracking-[0.12em]"
                      >
                        <Check className="size-3" aria-hidden="true" />
                        Active
                      </Badge>
                    ) : null}
                  </div>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {preset.description}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {preset.enabledControls.map((control) => (
                      <span
                        key={control}
                        className="rounded-md border bg-muted/20 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                      >
                        {contextLabels[control]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
