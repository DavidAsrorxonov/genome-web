import { RuntimeContext } from "@genomejs/core";
import {
  PlaygroundContextKey,
  PlaygroundContrast,
  PlaygroundDensity,
  PlaygroundMode,
  PlaygroundTokenMetadata,
} from "../types";
import {
  PLAYGROUND_CONTAINER_WIDTH_MAX,
  PLAYGROUND_CONTAINER_WIDTH_MIN,
  PLAYGROUND_SCALE_MAX,
  PLAYGROUND_SCALE_MIN,
} from "../constants";

export function readMode(context: RuntimeContext): PlaygroundMode {
  return context.mode === "dark" ? "dark" : "light";
}

export function readContrast(context: RuntimeContext): PlaygroundContrast {
  return context.contrast === "high" ? "high" : "standard";
}

export function readDensity(context: RuntimeContext): PlaygroundDensity {
  return context.density === "compact" ? "compact" : "comfortable";
}

export function readScale(context: RuntimeContext): number {
  const scale = context.scale;

  if (typeof scale !== "number" || !Number.isFinite(scale)) {
    return 1;
  }

  return Math.min(PLAYGROUND_SCALE_MAX, Math.max(PLAYGROUND_SCALE_MIN, scale));
}

export function readContainerWidth(context: RuntimeContext): number {
  const width = context.containerWidth;

  if (typeof width !== "number" || !Number.isFinite(width)) {
    return 720;
  }

  return Math.min(
    PLAYGROUND_CONTAINER_WIDTH_MAX,
    Math.max(PLAYGROUND_CONTAINER_WIDTH_MIN, width),
  );
}

export function createTokenMetadata(
  name: string,
  label: string,
  dependencies: readonly string[] = [],
  contextKeys: readonly PlaygroundContextKey[] = [],
): PlaygroundTokenMetadata {
  return {
    name,
    label,
    dependencies,
    contextKeys,
  };
}
