import {
  clonePlaygroundContext,
  DEFAULT_PLAYGROUND_PRESET_ID,
  getPlaygroundPreset,
  isPlaygroundPresetId,
} from "./presets";
import {
  PLAYGROUND_CONTAINER_WIDTH_MAX,
  PLAYGROUND_CONTAINER_WIDTH_MIN,
  PLAYGROUND_CONTAINER_WIDTH_STEP,
  PLAYGROUND_SCALE_MAX,
  PLAYGROUND_SCALE_MIN,
  PLAYGROUND_SCALE_STEP,
  PLAYGROUND_SEARCH_PARAMS,
} from "./constants";
import type { PlaygroundContext, PlaygroundPresetId } from "./types";
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

function roundToStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function parseScale(value: string | null, fallback: number): number {
  if (!value) return fallback;

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const clamped = clamp(parsed, PLAYGROUND_SCALE_MIN, PLAYGROUND_SCALE_MAX);

  return roundToStep(clamped, PLAYGROUND_SCALE_STEP);
}

function parseContainerWidth(value: string | null, fallback: number): number {
  if (!value) return fallback;

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const clamped = clamp(
    parsed,
    PLAYGROUND_CONTAINER_WIDTH_MIN,
    PLAYGROUND_CONTAINER_WIDTH_MAX,
  );

  return roundToStep(clamped, PLAYGROUND_CONTAINER_WIDTH_STEP);
}

function formatScale(scale: number): string {
  return Number(scale.toFixed(2)).toString();
}

export function parsePlaygroundSearchParams(
  input: SearchParamsInput,
): PlaygroundUrlState {
  const requestedPreset = readParameter(input, PLAYGROUND_SEARCH_PARAMS.preset);

  const presetId =
    requestedPreset && isPlaygroundPresetId(requestedPreset)
      ? requestedPreset
      : DEFAULT_PLAYGROUND_PRESET_ID;

  const preset = getPlaygroundPreset(presetId);

  const context = clonePlaygroundContext(preset.initialContext);

  const enabledControls = new Set(preset.enabledControls);

  const mode = readParameter(input, PLAYGROUND_SEARCH_PARAMS.mode);

  if (enabledControls.has("mode") && (mode === "light" || mode === "dark")) {
    context.mode = mode;
  }

  const contrast = readParameter(input, PLAYGROUND_SEARCH_PARAMS.contrast);

  if (
    enabledControls.has("contrast") &&
    (contrast === "standard" || contrast === "high")
  ) {
    context.contrast = contrast;
  }

  const density = readParameter(input, PLAYGROUND_SEARCH_PARAMS.density);

  if (
    enabledControls.has("density") &&
    (density === "comfortable" || density === "compact")
  ) {
    context.density = density;
  }

  if (enabledControls.has("scale")) {
    context.scale = parseScale(
      readParameter(input, PLAYGROUND_SEARCH_PARAMS.scale),
      context.scale,
    );
  }

  if (enabledControls.has("containerWidth")) {
    context.containerWidth = parseContainerWidth(
      readParameter(input, PLAYGROUND_SEARCH_PARAMS.containerWidth),
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

  parameters.set(PLAYGROUND_SEARCH_PARAMS.preset, preset.id);

  if (enabledControls.has("mode")) {
    parameters.set(PLAYGROUND_SEARCH_PARAMS.mode, state.context.mode);
  }

  if (enabledControls.has("contrast")) {
    parameters.set(PLAYGROUND_SEARCH_PARAMS.contrast, state.context.contrast);
  }

  if (enabledControls.has("density")) {
    parameters.set(PLAYGROUND_SEARCH_PARAMS.density, state.context.density);
  }

  if (enabledControls.has("scale")) {
    parameters.set(
      PLAYGROUND_SEARCH_PARAMS.scale,
      formatScale(state.context.scale),
    );
  }

  if (enabledControls.has("containerWidth")) {
    parameters.set(
      PLAYGROUND_SEARCH_PARAMS.containerWidth,
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
