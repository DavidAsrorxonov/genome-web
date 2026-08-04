import { GenomeConfig } from "@genomejs/core";
import { readContainerWidth, readDensity, readMode } from "./helpers";

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
