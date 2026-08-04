import { lockContrast, type GenomeConfig } from "@genomejs/core";

import type { PlaygroundPreset } from "../types";
import {
  createTokenMetadata,
  readContrast,
  readDensity,
  readMode,
  readScale,
} from "./helpers";

export const themeConfig = {
  primitives: {
    lightBackground: "#f8fafc",
    darkBackground: "#0f131d",

    lightSurface: "#ffffff",
    darkSurface: "#171c28",

    lightForeground: "#171923",
    darkForeground: "#f7f8fb",

    brand: "#7c6cff",

    baseSpacing: 16,
    baseRadius: 16,
  },

  tokens: {
    resolvedMode: (_dna, context) => readMode(context),

    background: (dna, context) =>
      readMode(context) === "dark" ? dna.darkBackground : dna.lightBackground,

    surface: (dna, context) =>
      readMode(context) === "dark" ? dna.darkSurface : dna.lightSurface,

    foreground: (dna, context) =>
      readMode(context) === "dark" ? dna.darkForeground : dna.lightForeground,

    primary: (dna) => dna.brand,

    primaryForeground: (dna, context) => {
      const target = readContrast(context) === "high" ? 7 : 4.5;

      return lockContrast(String(dna.primary), String(dna.surface), target);
    },

    spacing: (dna, context) =>
      `${Number(dna.baseSpacing) * readScale(context)}px`,

    radius: (dna, context) => {
      const densityFactor = readDensity(context) === "compact" ? 0.75 : 1;

      return `${Number(dna.baseRadius) * readScale(context) * densityFactor}px`;
    },

    controlHeight: (_dna, context) =>
      readDensity(context) === "compact" ? "36px" : "44px",
  },
} satisfies GenomeConfig;

export const themePreset = {
  id: "theme",
  title: "Light and dark theme",
  shortTitle: "Theme",
  description:
    "Switch semantic colors, spacing, radius, density, and accessible button contrast from runtime context.",
  concept: "One context mutation updates several related design tokens.",
  docsHref: "/docs/guides/dark-mode",

  config: themeConfig,

  initialContext: {
    mode: "light",
    contrast: "standard",
    density: "comfortable",
    scale: 1,
    containerWidth: 920,
  },

  enabledControls: ["mode", "contrast", "density", "scale"],

  primitiveNames: [
    "lightBackground",
    "darkBackground",
    "lightSurface",
    "darkSurface",
    "lightForeground",
    "darkForeground",
    "brand",
    "baseSpacing",
    "baseRadius",
  ],

  tokens: [
    createTokenMetadata("resolvedMode", "Resolved mode", [], ["mode"]),
    createTokenMetadata(
      "background",
      "Background",
      ["lightBackground", "darkBackground"],
      ["mode"],
    ),
    createTokenMetadata(
      "surface",
      "Surface",
      ["lightSurface", "darkSurface"],
      ["mode"],
    ),
    createTokenMetadata(
      "foreground",
      "Foreground",
      ["lightForeground", "darkForeground"],
      ["mode"],
    ),
    createTokenMetadata("primary", "Primary", ["brand"]),
    createTokenMetadata(
      "primaryForeground",
      "Primary foreground",
      ["primary", "surface"],
      ["contrast"],
    ),
    createTokenMetadata("spacing", "Spacing", ["baseSpacing"], ["scale"]),
    createTokenMetadata(
      "radius",
      "Radius",
      ["baseRadius"],
      ["scale", "density"],
    ),
    createTokenMetadata("controlHeight", "Control height", [], ["density"]),
  ],

  preview: {
    kind: "theme",
    title: "Application surface",
    description:
      "A semantic interface theme responding to mode, contrast, density, and scale.",
  },
} satisfies PlaygroundPreset;
