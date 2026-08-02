import {
  Genome,
  lockContrast,
  type GenomeConfig,
  type RuntimeContext,
} from "@genomejs/core";

export type HeroDemoMode = "light" | "dark";
export type HeroDemoContrast = "standard" | "high";
export type HeroDemoViewport = "mobile" | "desktop";

export interface HeroDemoContext {
  mode: HeroDemoMode;
  scale: number;
  contrast: HeroDemoContrast;
  viewport: HeroDemoViewport;
}

export const initialHeroDemoContext: HeroDemoContext = {
  mode: "dark",
  scale: 1,
  contrast: "standard",
  viewport: "desktop",
};

function readMode(context: RuntimeContext): HeroDemoMode {
  return context.mode === "light" ? "light" : "dark";
}

function readContrast(context: RuntimeContext): HeroDemoContrast {
  return context.contrast === "high" ? "high" : "standard";
}

function readViewport(context: RuntimeContext): HeroDemoViewport {
  return context.viewport === "mobile" ? "mobile" : "desktop";
}

function readScale(context: RuntimeContext): number {
  const value = context.scale;

  if (typeof value !== "number") {
    return 1;
  }

  return Math.min(1.4, Math.max(0.8, value));
}

export const heroDemoGenomeConfig = {
  primitives: {
    base: "#7c6cff",

    darkSurface: "#121620",
    darkForeground: "#f7f8fb",
    darkMutedForeground: "#a5adbd",

    lightSurface: "#ffffff",
    lightForeground: "#171923",
    lightMutedForeground: "#667085",

    spacing: 16,
    radius: 12,
    baseControlHeight: 40,
  },

  tokens: {
    surface: (dna, context) =>
      readMode(context) === "light" ? dna.lightSurface : dna.darkSurface,

    foreground: (dna, context) =>
      readMode(context) === "light" ? dna.lightForeground : dna.darkForeground,

    mutedForeground: (dna, context) =>
      readMode(context) === "light"
        ? dna.lightMutedForeground
        : dna.darkMutedForeground,

    buttonColor: (dna, context) =>
      lockContrast(
        String(dna.base),
        String(dna.surface),
        readContrast(context) === "high" ? 7 : 4.5,
      ),

    buttonText: (dna) => lockContrast("#ffffff", String(dna.buttonColor), 4.5),

    gap: (dna, context) =>
      `${Math.round(Number(dna.spacing) * readScale(context))}px`,

    controlHeight: (dna, context) =>
      `${Math.round(Number(dna.baseControlHeight) * readScale(context))}px`,

    panelRadius: (dna, context) => {
      const viewportScale = readViewport(context) === "mobile" ? 0.8 : 1;

      return `${Math.round(Number(dna.radius) * viewportScale)}px`;
    },

    previewWidth: (_dna, context) =>
      readViewport(context) === "mobile" ? "18rem" : "100%",
  },
} satisfies GenomeConfig;

export function createHeroDemoGenome(
  target: HTMLElement | null,
  context: HeroDemoContext = initialHeroDemoContext,
): Genome {
  const genome = new Genome(heroDemoGenomeConfig, target);

  genome.mutate({
    ...context,
  });

  return genome;
}
