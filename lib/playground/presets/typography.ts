import { fluidScale, type GenomeConfig } from "@genomejs/core";

import type { PlaygroundPreset } from "../types";
import {
  createTokenMetadata,
  readContainerWidth,
  readDensity,
  readScale,
} from "./helpers";

export const typographyConfig = {
  primitives: {
    bodyMin: 16,
    bodyMax: 19,

    headingMin: 40,
    headingMax: 76,

    eyebrowMin: 12,
    eyebrowMax: 14,

    baseSpacing: 16,
  },

  tokens: {
    bodySize: (dna, context) => {
      const scale = readScale(context);

      return fluidScale(
        Number(dna.bodyMin) * scale,
        Number(dna.bodyMax) * scale,
        320,
        1440,
      );
    },

    headingSize: (dna, context) => {
      const scale = readScale(context);

      return fluidScale(
        Number(dna.headingMin) * scale,
        Number(dna.headingMax) * scale,
        320,
        1440,
      );
    },

    eyebrowSize: (dna, context) => {
      const scale = readScale(context);

      return fluidScale(
        Number(dna.eyebrowMin) * scale,
        Number(dna.eyebrowMax) * scale,
        320,
        1440,
      );
    },

    lineHeight: (_dna, context) =>
      readDensity(context) === "compact" ? 1.45 : 1.65,

    headingLineHeight: (_dna, context) =>
      readDensity(context) === "compact" ? 1.02 : 1.08,

    paragraphGap: (dna, context) => {
      const densityFactor = readDensity(context) === "compact" ? 0.75 : 1;

      return `${
        Number(dna.baseSpacing) * readScale(context) * densityFactor
      }px`;
    },

    readingMeasure: (_dna, context) => {
      const containerWidth = readContainerWidth(context);

      if (containerWidth < 560) {
        return "100%";
      }

      if (containerWidth < 880) {
        return "62ch";
      }

      return "70ch";
    },
  },
} satisfies GenomeConfig;

export const typographyPreset = {
  id: "typography",
  title: "Responsive typography",
  shortTitle: "Typography",
  description:
    "Generate fluid type sizes and adjust reading density from scale and available width.",
  concept:
    "CSS clamp expressions and runtime preferences can coexist in the same token graph.",
  docsHref: "/docs/guides/responsive-tokens",

  config: typographyConfig,

  initialContext: {
    mode: "light",
    contrast: "standard",
    density: "comfortable",
    scale: 1,
    containerWidth: 760,
  },

  enabledControls: ["scale", "density", "containerWidth"],

  primitiveNames: [
    "bodyMin",
    "bodyMax",
    "headingMin",
    "headingMax",
    "eyebrowMin",
    "eyebrowMax",
    "baseSpacing",
  ],

  tokens: [
    createTokenMetadata(
      "bodySize",
      "Body size",
      ["bodyMin", "bodyMax"],
      ["scale"],
    ),
    createTokenMetadata(
      "headingSize",
      "Heading size",
      ["headingMin", "headingMax"],
      ["scale"],
    ),
    createTokenMetadata(
      "eyebrowSize",
      "Eyebrow size",
      ["eyebrowMin", "eyebrowMax"],
      ["scale"],
    ),
    createTokenMetadata("lineHeight", "Line height", [], ["density"]),
    createTokenMetadata(
      "headingLineHeight",
      "Heading line height",
      [],
      ["density"],
    ),
    createTokenMetadata(
      "paragraphGap",
      "Paragraph gap",
      ["baseSpacing"],
      ["scale", "density"],
    ),
    createTokenMetadata(
      "readingMeasure",
      "Reading measure",
      [],
      ["containerWidth"],
    ),
  ],

  preview: {
    kind: "typography",
    title: "Editorial article",
    description:
      "Fluid heading and body values responding to scale, density, and available width.",
  },
} satisfies PlaygroundPreset;
