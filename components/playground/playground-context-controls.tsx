"use client";

import { CircleGauge } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { usePlaygroundController } from "@/components/playground/playground-controller";

import type { PlaygroundContextKey } from "@/lib/playground/types";

import { cn } from "@/lib/utils";

interface ControlGroupProps {
  label: string;
  value: string;
  children: React.ReactNode;
}

function ControlGroup({ label, value, children }: ControlGroupProps) {
  return (
    <fieldset className="rounded-xl border bg-background p-3">
      <legend className="sr-only">{label}</legend>

      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">{label}</span>

        <span className="font-mono text-[11px] text-muted-foreground">
          {value}
        </span>
      </div>

      <div className="mt-3">{children}</div>
    </fieldset>
  );
}

interface SegmentedControlProps<Value extends string> {
  label: string;
  value: Value;
  options: readonly {
    value: Value;
    label: string;
  }[];
  disabled: boolean;
  onChange: (value: Value) => void;
}

function SegmentedControl<Value extends string>({
  label,
  value,
  options,
  disabled,
  onChange,
}: SegmentedControlProps<Value>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="grid grid-cols-2 gap-1 rounded-lg border bg-muted/30 p-1"
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            aria-pressed={isActive}
            onClick={() => {
              onChange(option.value);
            }}
            className={cn(
              "min-h-11 rounded-md px-3 text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function PlaygroundContextControls() {
  const { preset, context, runtimeReady, updateContext } =
    usePlaygroundController();

  const enabledControls = new Set<PlaygroundContextKey>(preset.enabledControls);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Runtime context
        </p>

        <Badge variant="outline" className="gap-1.5 font-mono text-[10px]">
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full",
              runtimeReady ? "bg-emerald-500" : "bg-amber-500",
            )}
          />

          {runtimeReady ? "Connected" : "Preparing"}
        </Badge>
      </div>

      <div className="mt-3 space-y-3">
        {enabledControls.has("mode") ? (
          <ControlGroup label="Mode" value={context.mode}>
            <SegmentedControl
              label="Color mode"
              value={context.mode}
              disabled={!runtimeReady}
              options={[
                {
                  value: "light",
                  label: "Light",
                },
                {
                  value: "dark",
                  label: "Dark",
                },
              ]}
              onChange={(mode) => {
                updateContext("mode", mode);
              }}
            />
          </ControlGroup>
        ) : null}

        {enabledControls.has("contrast") ? (
          <ControlGroup label="Contrast" value={context.contrast}>
            <SegmentedControl
              label="Contrast preference"
              value={context.contrast}
              disabled={!runtimeReady}
              options={[
                {
                  value: "standard",
                  label: "Standard",
                },
                {
                  value: "high",
                  label: "High",
                },
              ]}
              onChange={(contrast) => {
                updateContext("contrast", contrast);
              }}
            />
          </ControlGroup>
        ) : null}

        {enabledControls.has("density") ? (
          <ControlGroup label="Density" value={context.density}>
            <SegmentedControl
              label="Interface density"
              value={context.density}
              disabled={!runtimeReady}
              options={[
                {
                  value: "comfortable",
                  label: "Comfortable",
                },
                {
                  value: "compact",
                  label: "Compact",
                },
              ]}
              onChange={(density) => {
                updateContext("density", density);
              }}
            />
          </ControlGroup>
        ) : null}

        {enabledControls.has("scale") ? (
          <ControlGroup label="Scale" value={`${context.scale.toFixed(2)}×`}>
            <label className="block">
              <span className="sr-only">Runtime scale</span>

              <input
                type="range"
                min="0.8"
                max="1.4"
                step="0.05"
                value={context.scale}
                disabled={!runtimeReady}
                onChange={(event) => {
                  updateContext("scale", Number(event.currentTarget.value));
                }}
                className="h-11 w-full cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>

            <div
              aria-hidden="true"
              className="flex justify-between font-mono text-[10px] text-muted-foreground"
            >
              <span>0.80×</span>
              <span>1.40×</span>
            </div>
          </ControlGroup>
        ) : null}

        {enabledControls.has("containerWidth") ? (
          <ControlGroup
            label="Container width"
            value={`${Math.round(context.containerWidth)}px`}
          >
            <label className="block">
              <span className="sr-only">Controlled container width</span>

              <input
                type="range"
                min="280"
                max="1200"
                step="20"
                value={context.containerWidth}
                disabled={!runtimeReady}
                onChange={(event) => {
                  updateContext(
                    "containerWidth",
                    Number(event.currentTarget.value),
                  );
                }}
                className="h-11 w-full cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>

            <div
              aria-hidden="true"
              className="flex justify-between font-mono text-[10px] text-muted-foreground"
            >
              <span>280px</span>
              <span>1200px</span>
            </div>
          </ControlGroup>
        ) : null}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border bg-muted/20 p-3">
        <CircleGauge
          className="mt-0.5 size-4 shrink-0 text-primary"
          aria-hidden="true"
        />

        <p className="text-xs leading-5 text-muted-foreground">
          Every enabled input sends a controlled patch through{" "}
          <code className="font-mono text-foreground">genome.mutate()</code>.
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {runtimeReady
          ? `${preset.title} runtime is ready.`
          : `${preset.title} runtime is preparing.`}
      </p>
    </div>
  );
}
