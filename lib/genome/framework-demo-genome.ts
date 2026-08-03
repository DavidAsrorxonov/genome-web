import { Genome, type GenomeConfig, type RuntimeContext } from "@genomejs/core";

export type FrameworkDemoTone = "violet" | "teal";

export type FrameworkDemoDensity = "comfortable" | "compact";

export interface FrameworkDemoContext {
  tone: FrameworkDemoTone;
  density: FrameworkDemoDensity;
}

export const initialFrameworkDemoContext: FrameworkDemoContext = {
  tone: "violet",
  density: "comfortable",
};

function readTone(context: RuntimeContext): FrameworkDemoTone {
  return context.tone === "teal" ? "teal" : "violet";
}

function readDensity(context: RuntimeContext): FrameworkDemoDensity {
  return context.density === "compact" ? "compact" : "comfortable";
}

export const frameworkDemoConfig = {
  primitives: {
    violet: "#ff6900",
    teal: "#00cccc",

    surface: "#1a1a1a",
    foreground: "#f2f2f2",
    mutedForeground: "#a6a6a6",

    comfortableGap: 16,
    compactGap: 10,

    comfortableRadius: 18,
    compactRadius: 10,

    comfortableHeight: 42,
    compactHeight: 34,
  },

  tokens: {
    demoAccent: (dna, context) =>
      readTone(context) === "teal" ? dna.teal : dna.violet,

    demoSurface: (dna) => dna.surface,

    demoForeground: (dna) => dna.foreground,

    demoMutedForeground: (dna) => dna.mutedForeground,

    demoGap: (dna, context) =>
      `${
        readDensity(context) === "compact" ? dna.compactGap : dna.comfortableGap
      }px`,

    demoRadius: (dna, context) =>
      `${
        readDensity(context) === "compact"
          ? dna.compactRadius
          : dna.comfortableRadius
      }px`,

    demoControlHeight: (dna, context) =>
      `${
        readDensity(context) === "compact"
          ? dna.compactHeight
          : dna.comfortableHeight
      }px`,
  },
} satisfies GenomeConfig;

export function createFrameworkDemoGenome(
  target: HTMLElement | null,
  context: FrameworkDemoContext = initialFrameworkDemoContext,
): Genome {
  const genome = new Genome(frameworkDemoConfig, target);

  genome.mutate({
    ...context,
  });

  return genome;
}
