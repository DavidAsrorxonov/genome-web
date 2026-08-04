import { Genome } from "@genomejs/core";

import {
  DEFAULT_PLAYGROUND_PRESET_ID,
  clonePlaygroundContext,
  getPlaygroundPreset,
} from "./presets";

import type {
  PlaygroundContext,
  PlaygroundPreset,
  PlaygroundPresetId,
} from "./types";

export interface PlaygroundRuntime {
  genome: Genome;
  preset: PlaygroundPreset;
  initialContext: PlaygroundContext;
}

type PlaygroundPresetInput =
  | PlaygroundPreset
  | PlaygroundPresetId
  | string
  | null
  | undefined;

function resolvePreset(input: PlaygroundPresetInput): PlaygroundPreset {
  if (typeof input === "object" && input !== null) {
    return input;
  }

  return getPlaygroundPreset(input ?? DEFAULT_PLAYGROUND_PRESET_ID);
}

function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

export function toGenomeCssVariable(traitName: string): string {
  return `--g-${toKebabCase(traitName)}`;
}

export function getPlaygroundTraitNames(preset: PlaygroundPreset): string[] {
  return [
    ...preset.primitiveNames,
    ...preset.tokens.map((token) => token.name),
  ];
}

export function clearPlaygroundTarget(
  target: HTMLElement,
  preset: PlaygroundPreset,
): void {
  const traitNames = getPlaygroundTraitNames(preset);

  for (const traitName of traitNames) {
    target.style.removeProperty(toGenomeCssVariable(traitName));
  }
}

export function createPlaygroundRuntime(
  input: PlaygroundPresetInput = DEFAULT_PLAYGROUND_PRESET_ID,

  target: HTMLElement | null = null,
): PlaygroundRuntime {
  const preset = resolvePreset(input);

  /*
   * The target deliberately defaults
   * to null.
   *
   * Using Genome's browser default
   * would write playground variables
   * onto document.documentElement and
   * could overwrite the website theme.
   */
  const genome = new Genome(preset.config, target);

  const initialContext = clonePlaygroundContext(preset.initialContext);

  genome.mutate(initialContext);

  return {
    genome,
    preset,
    initialContext,
  };
}
