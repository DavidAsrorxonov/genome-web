import {
  clonePlaygroundContext,
  DEFAULT_PLAYGROUND_PRESET_ID,
  getPlaygroundPreset,
  isPlaygroundPresetId,
} from "./presets";
import { PlaygroundContext, PlaygroundPresetId } from "./types";
// import { URLSearchParams } from "node:url";

export type PlaygroundSearchParams = Record<
  string,
  string | string[] | undefined
>;

export interface PlaygroundUrlState {
  presetId: PlaygroundPresetId;
  context: PlaygroundContext;
}

type SearchParamsInput = PlaygroundSearchParams | URLSearchParams;

function readParameter(input: SearchParamsInput, name: string): string | null {
  if (input instanceof URLSearchParams) {
    return input.get(name);
  }
  const value = input[name];

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function parseScale(value: string | null, fallback: number): number {
  if (!value) return fallback;

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const clamped = clamp(parsed, 0.8, 1.4);

  return Math.round(clamped * 20) / 20;
}

function parseContainerWidth(value: string | null, fallback: number): number {
  if (!value) return fallback;

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const clamped = clamp(parsed, 280, 1200);

  return Math.round(clamped / 20) * 20;
}

function formatScale(scale: number): string {
  return Number(scale.toFixed(2)).toString();
}

export function parsePlaygroundSearchParams(
  input: SearchParamsInput,
): PlaygroundUrlState {
  const requestedPreset = readParameter(input, "preset");

  const presetId =
    requestedPreset && isPlaygroundPresetId(requestedPreset)
      ? requestedPreset
      : DEFAULT_PLAYGROUND_PRESET_ID;

  const preset = getPlaygroundPreset(presetId);

  const context = clonePlaygroundContext(preset.initialContext);

  const enabledControls = new Set(preset.enabledControls);

  const mode = readParameter(input, "mode");

  if (enabledControls.has("mode") && (mode === "light" || mode === "dark")) {
    context.mode = mode;
  }

  const contrast = readParameter(input, "contrast");

  if (
    enabledControls.has("contrast") &&
    (contrast === "standard" || contrast === "high")
  ) {
    context.contrast = contrast;
  }

  const density = readParameter(input, "density");

  if (
    enabledControls.has("density") &&
    (density === "comfortable" || density === "compact")
  ) {
    context.density = density;
  }

  if (enabledControls.has("scale")) {
    context.scale = parseScale(readParameter(input, "scale"), context.scale);
  }

  if (enabledControls.has("containerWidth")) {
    context.containerWidth = parseContainerWidth(
      readParameter(input, "width"),
      context.containerWidth,
    );
  }

  return {
    presetId,
    context,
  };
}

export function createPlaygroundSearchParams(
  state: PlaygroundUrlState,
): URLSearchParams {
  const preset = getPlaygroundPreset(state.presetId);

  const enabledControls = new Set(preset.enabledControls);

  const parameters = new URLSearchParams();

  parameters.set("preset", preset.id);

  if (enabledControls.has("mode")) {
    parameters.set("mode", state.context.mode);
  }

  if (enabledControls.has("contrast")) {
    parameters.set("contrast", state.context.contrast);
  }

  if (enabledControls.has("density")) {
    parameters.set("density", state.context.density);
  }

  if (enabledControls.has("scale")) {
    parameters.set("scale", formatScale(state.context.scale));
  }

  if (enabledControls.has("containerWidth")) {
    parameters.set(
      "width",
      Math.round(state.context.containerWidth).toString(),
    );
  }

  return parameters;
}

export function createPlaygroundRelativeUrl(
  state: PlaygroundUrlState,
  pathname = "/playground",
): string {
  const parameters = createPlaygroundSearchParams(state);

  const query = parameters.toString();

  return query ? `${pathname}?${query}` : pathname;
}
