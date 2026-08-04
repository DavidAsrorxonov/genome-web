import { fluidScale, GenomeConfig } from "@genomejs/core";
import { readContainerWidth, readDensity, readScale } from "./helpers";

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
