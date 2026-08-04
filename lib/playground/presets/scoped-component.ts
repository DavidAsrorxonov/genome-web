import type { GenomeConfig } from "@genomejs/core";

import type { PlaygroundPreset } from "../types";
import {
  createTokenMetadata,
  readDensity,
  readMode,
  readScale,
} from "./helpers";

export const scopedComponentConfig = {
  primitives: {
    lightSurface: "#ffffff",
    darkSurface: "#131823",

    lightForeground: "#171923",
    darkForeground: "#f7f8fb",

    lightAccent: "#6554e8",
    darkAccent: "#a89cff",

    compactSpacing: 10,
    comfortableSpacing: 18,

    compactRadius: 10,
    comfortableRadius: 18,
  },

  tokens: {
    resolvedMode: (_dna, context) => readMode(context),

    surface: (dna, context) =>
      readMode(context) === "dark" ? dna.darkSurface : dna.lightSurface,

    foreground: (dna, context) =>
      readMode(context) === "dark" ? dna.darkForeground : dna.lightForeground,

    accent: (dna, context) =>
      readMode(context) === "dark" ? dna.darkAccent : dna.lightAccent,

    spacing: (dna, context) => {
      const base =
        readDensity(context) === "compact"
          ? Number(dna.compactSpacing)
          : Number(dna.comfortableSpacing);

      return `${base * readScale(context)}px`;
    },

    radius: (dna, context) => {
      const base =
        readDensity(context) === "compact"
          ? Number(dna.compactRadius)
          : Number(dna.comfortableRadius);

      return `${base * readScale(context)}px`;
    },

    controlHeight: (_dna, context) =>
      readDensity(context) === "compact" ? "34px" : "42px",

    border: (dna, context) =>
      readMode(context) === "dark" ? "#303849" : "#d7dbe5",

    scopeLabel: (_dna, context) =>
      `${readMode(context)} / ${readDensity(context)}`,
  },
} satisfies GenomeConfig;

export const scopedComponentPreset = {
  id: "scoped-component",
  title: "Scoped component theme",
  shortTitle: "Scope",
  description:
    "Apply an independent mode, density, spacing scale, and accent to one component subtree.",
  concept:
    "A child Genome can express component-local values without changing the application theme.",
  docsHref: "/docs/guides/scoped-component-themes",

  config: scopedComponentConfig,

  initialContext: {
    mode: "dark",
    contrast: "standard",
    density: "compact",
    scale: 1,
    containerWidth: 520,
  },

  enabledControls: ["mode", "density", "scale"],

  primitiveNames: [
    "lightSurface",
    "darkSurface",
    "lightForeground",
    "darkForeground",
    "lightAccent",
    "darkAccent",
    "compactSpacing",
    "comfortableSpacing",
    "compactRadius",
    "comfortableRadius",
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
      "foreground",
      "Foreground",
      ["lightForeground", "darkForeground"],
      ["mode"],
    ),
    createTokenMetadata(
      "accent",
      "Accent",
      ["lightAccent", "darkAccent"],
      ["mode"],
    ),
    createTokenMetadata(
      "spacing",
      "Spacing",
      ["compactSpacing", "comfortableSpacing"],
      ["density", "scale"],
    ),
    createTokenMetadata(
      "radius",
      "Radius",
      ["compactRadius", "comfortableRadius"],
      ["density", "scale"],
    ),
    createTokenMetadata("controlHeight", "Control height", [], ["density"]),
    createTokenMetadata("border", "Border", [], ["mode"]),
    createTokenMetadata("scopeLabel", "Scope label", [], ["mode", "density"]),
  ],

  preview: {
    kind: "scoped-component",
    title: "Scoped inspector",
    description:
      "A component-local theme that remains isolated from the surrounding website.",
  },
} satisfies PlaygroundPreset;
