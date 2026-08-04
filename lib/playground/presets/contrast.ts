import { contrastRatio, GenomeConfig, lockContrast } from "@genomejs/core";
import { readContrast, readMode } from "./helpers";

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
