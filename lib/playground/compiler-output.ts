import type { Genome, Primitive } from "@genomejs/core";
import { getPlaygroundTraitNames, toGenomeCssVariable } from "./runtime";
import type { PlaygroundContextKey, PlaygroundPreset } from "./types";

export type PlaygroundTraitKind = "primitive" | "token";

export interface PlaygroundValueMap {
  [name: string]: Primitive;
}

export interface PlaygroundResolvedTrait {
  name: string;
  label: string;
  kind: PlaygroundTraitKind;
  value: Primitive;
  cssVariable: string;
  dependencies: readonly string[];
  contextKeys: readonly PlaygroundContextKey[];
  dependencyCount: number;
}

function formatIdentifier(name: string): string {
  const formatted = name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ");

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function readPlaygroundValues(
  genome: Genome,
  preset: PlaygroundPreset,
): PlaygroundValueMap {
  const values: PlaygroundValueMap = {};

  for (const name of getPlaygroundTraitNames(preset)) {
    values[name] = genome.getTrait(name);
  }

  return values;
}

export function serializePlaygroundValues(
  genome: Genome,
  preset: PlaygroundPreset,
): string {
  const entries = getPlaygroundTraitNames(preset).map(
    (name) => [name, genome.getTrait(name)] as const,
  );

  return JSON.stringify(entries);
}

export function parsePlaygroundValues(serialized: string): PlaygroundValueMap {
  const entries = JSON.parse(serialized) as Array<[string, Primitive]>;

  return Object.fromEntries(entries) as PlaygroundValueMap;
}

export function diffPlaygroundValues(
  before: PlaygroundValueMap,
  after: PlaygroundValueMap,
): string[] {
  const names = new Set([...Object.keys(before), ...Object.keys(after)]);

  return Array.from(names).filter(
    (name) => !Object.is(before[name], after[name]),
  );
}

export function createResolvedTraits(
  preset: PlaygroundPreset,
  values: PlaygroundValueMap,
): PlaygroundResolvedTrait[] {
  const primitiveRows = preset.primitiveNames.map((name) => ({
    name,
    label: formatIdentifier(name),
    kind: "primitive" as const,
    value: values[name],
    cssVariable: toGenomeCssVariable(name),
    dependencies: [],
    contextKeys: [],
    dependencyCount: 0,
  }));

  const tokenRows = preset.tokens.map((token) => ({
    name: token.name,
    label: token.label,
    kind: "token" as const,
    value: values[token.name],
    cssVariable: toGenomeCssVariable(token.name),
    dependencies: token.dependencies,
    contextKeys: token.contextKeys,
    dependencyCount: token.dependencies.length + token.contextKeys.length,
  }));

  return [...primitiveRows, ...tokenRows];
}

export function getAffectedTokenNames(
  preset: PlaygroundPreset,
  contextKey: PlaygroundContextKey | null,
): Set<string> {
  const affected = new Set<string>();

  if (!contextKey) {
    return affected;
  }

  for (const token of preset.tokens) {
    if (token.contextKeys.includes(contextKey)) {
      affected.add(token.name);
    }
  }

  let foundAnother = true;

  while (foundAnother) {
    foundAnother = false;

    for (const token of preset.tokens) {
      if (affected.has(token.name)) {
        continue;
      }

      const dependsOnAffected = token.dependencies.some((dependency) =>
        affected.has(dependency),
      );

      if (dependsOnAffected) {
        affected.add(token.name);

        foundAnother = true;
      }
    }
  }

  return affected;
}

export function createCssOutput(
  traits: readonly PlaygroundResolvedTrait[],
): string {
  const declarations = traits.map(
    (trait) => `  ${trait.cssVariable}: ${String(trait.value)};`,
  );

  return ["[data-playground-preview] {", ...declarations, "}"].join("\n");
}
