import { contrastRatio, lockContrast, type GenomeConfig } from "@genomejs/core";

import type { PlaygroundPreset } from "../types";
import { createTokenMetadata, readContrast, readMode } from "./helpers";

export const contrastConfig = {
  primitives: {
    lightSurface: "#ffffff",
    darkSurface: "#171c28",

    preferredForeground: "#7c6cff",

    lightBorder: "#d7dbe5",
    darkBorder: "#303849",
  },

  tokens: {
    resolvedMode: (_dna, context) => readMode(context),

    surface: (dna, context) =>
      readMode(context) === "dark" ? dna.darkSurface : dna.lightSurface,

    contrastTarget: (_dna, context) =>
      readContrast(context) === "high" ? 7 : 4.5,

    foreground: (dna) =>
      lockContrast(
        String(dna.preferredForeground),
        String(dna.surface),
        Number(dna.contrastTarget),
      ),

    achievedRatio: (dna) =>
      Number(
        contrastRatio(String(dna.foreground), String(dna.surface)).toFixed(2),
      ),

    contrastStatus: (dna) =>
      Number(dna.achievedRatio) >= Number(dna.contrastTarget)
        ? "passes"
        : "closest",

    border: (dna, context) =>
      readMode(context) === "dark" ? dna.darkBorder : dna.lightBorder,
  },
} satisfies GenomeConfig;

export const contrastPreset = {
  id: "contrast",
  title: "Accessible foreground color",
  shortTitle: "Contrast",
  description:
    "Adjust a preferred foreground against light and dark surfaces using a requested contrast ratio.",
  concept:
    "A surface change causes the accessible foreground and measured ratio to resolve again.",
  docsHref: "/docs/guides/accessible-colors",

  config: contrastConfig,

  initialContext: {
    mode: "light",
    contrast: "standard",
    density: "comfortable",
    scale: 1,
    containerWidth: 720,
  },

  enabledControls: ["mode", "contrast"],

  primitiveNames: [
    "lightSurface",
    "darkSurface",
    "preferredForeground",
    "lightBorder",
    "darkBorder",
  ],

  tokens: [
    createTokenMetadata("resolvedMode", "Resolved mode", [], ["mode"]),
    createTokenMetadata(
      "surface",
      "Surface",
      ["lightSurface", "darkSurface"],
      ["mode"],
    ),
    createTokenMetadata(
      "contrastTarget",
      "Contrast target",
      [],
      ["contrast"],
    ),
    createTokenMetadata("foreground", "Adjusted foreground", [
      "preferredForeground",
      "surface",
      "contrastTarget",
    ]),
    createTokenMetadata("achievedRatio", "Achieved ratio", [
      "foreground",
      "surface",
    ]),
    createTokenMetadata("contrastStatus", "Contrast status", [
      "achievedRatio",
      "contrastTarget",
    ]),
    createTokenMetadata(
      "border",
      "Border",
      ["lightBorder", "darkBorder"],
      ["mode"],
    ),
  ],

  preview: {
    kind: "contrast",
    title: "Accessible callout",
    description:
      "A foreground color adjusted against the currently selected surface.",
  },
} satisfies PlaygroundPreset;
