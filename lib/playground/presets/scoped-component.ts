import { GenomeConfig } from "@genomejs/core";
import { readDensity, readMode, readScale } from "./helpers";

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
