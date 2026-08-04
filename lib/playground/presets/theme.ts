import { GenomeConfig, lockContrast } from "@genomejs/core";
import { readContrast, readDensity, readMode, readScale } from "./helpers";

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
