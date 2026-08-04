import type { GenomeConfig } from "@genomejs/core";

import type { PlaygroundPreset } from "../types";
import {
  createTokenMetadata,
  readContainerWidth,
  readDensity,
  readMode,
} from "./helpers";

export const containerCardConfig = {
  primitives: {
    lightSurface: "#ffffff",
    darkSurface: "#171c28",

    lightForeground: "#171923",
    darkForeground: "#f7f8fb",

    compactGap: 12,
    comfortableGap: 20,

    compactPadding: 16,
    comfortablePadding: 24,
  },

  tokens: {
    resolvedMode: (_dna, context) => readMode(context),

    surface: (dna, context) =>
      readMode(context) === "dark" ? dna.darkSurface : dna.lightSurface,

    foreground: (dna, context) =>
      readMode(context) === "dark" ? dna.darkForeground : dna.lightForeground,

    containerTier: (_dna, context) => {
      const width = readContainerWidth(context);

      if (width >= 960) {
        return "wide";
      }

      if (width >= 560) {
        return "medium";
      }

      return "narrow";
    },

    columns: (dna) => {
      if (dna.containerTier === "wide") {
        return 3;
      }

      if (dna.containerTier === "medium") {
        return 2;
      }

      return 1;
    },

    cardDirection: (dna) => (dna.containerTier === "narrow" ? "column" : "row"),

    gap: (dna) =>
      `${
        dna.containerTier === "narrow" ? dna.compactGap : dna.comfortableGap
      }px`,

    padding: (dna, context) =>
      `${
        readDensity(context) === "compact"
          ? dna.compactPadding
          : dna.comfortablePadding
      }px`,

    mediaRatio: (dna) => (dna.containerTier === "narrow" ? "16 / 9" : "4 / 3"),

    mediaWidth: (dna) => (dna.containerTier === "narrow" ? "100%" : "38%"),

    titleSize: (dna) => (dna.containerTier === "wide" ? "1.25rem" : "1rem"),
  },
} satisfies GenomeConfig;

export const containerCardPreset = {
  id: "container-card",
  title: "Container-aware card",
  shortTitle: "Container",
  description:
    "Change card layout, columns, spacing, media proportions, and typography from component width.",
  concept:
    "Component tokens respond to their own available space rather than only the viewport.",
  docsHref: "/docs/guides/container-aware-components",

  config: containerCardConfig,

  initialContext: {
    mode: "light",
    contrast: "standard",
    density: "comfortable",
    scale: 1,
    containerWidth: 720,
  },

  enabledControls: ["mode", "density", "containerWidth"],

  primitiveNames: [
    "lightSurface",
    "darkSurface",
    "lightForeground",
    "darkForeground",
    "compactGap",
    "comfortableGap",
    "compactPadding",
    "comfortablePadding",
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
      "containerTier",
      "Container tier",
      [],
      ["containerWidth"],
    ),
    createTokenMetadata("columns", "Columns", ["containerTier"]),
    createTokenMetadata("cardDirection", "Card direction", ["containerTier"]),
    createTokenMetadata("gap", "Gap", [
      "containerTier",
      "compactGap",
      "comfortableGap",
    ]),
    createTokenMetadata(
      "padding",
      "Padding",
      ["compactPadding", "comfortablePadding"],
      ["density"],
    ),
    createTokenMetadata("mediaRatio", "Media ratio", ["containerTier"]),
    createTokenMetadata("mediaWidth", "Media width", ["containerTier"]),
    createTokenMetadata("titleSize", "Title size", ["containerTier"]),
  ],

  preview: {
    kind: "container-card",
    title: "Responsive card collection",
    description:
      "Cards that change structure based on the controlled container width.",
  },
} satisfies PlaygroundPreset;
