import type {
  PlaygroundContext,
  PlaygroundPreset,
  PlaygroundPresetId,
} from "../types";

import { containerCardPreset } from "./container-card";
import { contrastPreset } from "./contrast";
import { scopedComponentPreset } from "./scoped-component";
import { themePreset } from "./theme";
import { typographyPreset } from "./typography";

export const playgroundPresets = [
  themePreset,
  typographyPreset,
  contrastPreset,
  containerCardPreset,
  scopedComponentPreset,
] as const satisfies readonly PlaygroundPreset[];

export const DEFAULT_PLAYGROUND_PRESET_ID: PlaygroundPresetId = "theme";

export function isPlaygroundPresetId(
  value: string,
): value is PlaygroundPresetId {
  return playgroundPresets.some((preset) => preset.id === value);
}

export function getPlaygroundPreset(
  id: string | null | undefined,
): PlaygroundPreset {
  if (!id) {
    return playgroundPresets[0];
  }

  return (
    playgroundPresets.find((preset) => preset.id === id) ?? playgroundPresets[0]
  );
}

export function clonePlaygroundContext(
  context: PlaygroundContext,
): PlaygroundContext {
  return {
    ...context,
  };
}
