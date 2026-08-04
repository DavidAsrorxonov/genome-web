import type { GenomeConfig } from "@genomejs/core";

export const playgroundModes = ["light", "dark"] as const;

export const playgroundContrasts = ["standard", "high"] as const;

export const playgroundDensities = ["comfortable", "compact"] as const;

export type PlaygroundMode = (typeof playgroundModes)[number];

export type PlaygroundContrast = (typeof playgroundContrasts)[number];

export type PlaygroundDensity = (typeof playgroundDensities)[number];

export interface PlaygroundContext {
  mode: PlaygroundMode;
  contrast: PlaygroundContrast;
  density: PlaygroundDensity;
  scale: number;
  containerWidth: number;
}

export type PlaygroundContextKey = keyof PlaygroundContext;

export type PlaygroundPresetId =
  | "theme"
  | "typography"
  | "contrast"
  | "container-card"
  | "scoped-component";

export type PlaygroundPreviewKind =
  | "theme"
  | "typography"
  | "contrast"
  | "container-card"
  | "scoped-component";

export interface PlaygroundTokenMetadata {
  name: string;
  label: string;
  dependencies: readonly string[];
  contextKeys: readonly PlaygroundContextKey[];
}

export interface PlaygroundPreviewDefinition {
  kind: PlaygroundPreviewKind;
  title: string;
  description: string;
}

export interface PlaygroundPreset {
  id: PlaygroundPresetId;
  title: string;
  shortTitle: string;
  description: string;
  concept: string;
  docsHref: string;

  config: GenomeConfig;

  initialContext: PlaygroundContext;

  enabledControls: readonly PlaygroundContextKey[];

  primitiveNames: readonly string[];

  tokens: readonly PlaygroundTokenMetadata[];

  preview: PlaygroundPreviewDefinition;
}
