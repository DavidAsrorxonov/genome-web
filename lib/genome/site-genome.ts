import { Genome } from "@genomejs/core";
import type { GenomeConfig, RuntimeContext } from "@genomejs/core";

import { initialSiteContext } from "./initial-context";

import type { SiteDensity, SiteGenomeContext, SiteMode } from "./types";

function readMode(context: RuntimeContext): SiteMode {
  return context.mode === "light" ? "light" : "dark";
}

function readDensity(context: RuntimeContext): SiteDensity {
  return context.density === "compact" ? "compact" : "comfortable";
}

function readScale(
  context: RuntimeContext,
  key: "radiusScale" | "spacingScale",
): number {
  const value = context[key];

  return typeof value === "number" ? value : 1;
}

function isHighContrast(context: RuntimeContext): boolean {
  return context.contrast === "high";
}

export const siteGenomeConfig = {
  primitives: {
    violet: "oklch(0.8700 0.2200 122.0000)",
    violetStrong: "oklch(0.8700 0.2200 122.0000)",
    teal: "oklch(0.7500 0.2000 124.0000)",
    danger: "oklch(0.6368 0.2078 25.3313)",

    darkBackground: "oklch(0.1100 0.0100 110.0000)",
    darkSurface: "oklch(0.1500 0.0120 110.0000)",
    darkSurfaceRaised: "oklch(0.2200 0.0150 110.0000)",
    darkForeground: "oklch(0.9600 0.0150 110.0000)",
    darkMutedForeground: "oklch(0.5800 0.0150 110.0000)",
    darkBorder: "oklch(0.2600 0.0150 110.0000)",
    darkBorderStrong: "oklch(0.2600 0.0150 110.0000)",
    darkAccent: "oklch(0.2400 0.0400 122.0000)",

    lightBackground: "oklch(0.9820 0.0040 110.0000)",
    lightSurface: "oklch(1 0 0)",
    lightSurfaceRaised: "oklch(0.9350 0.0080 110.0000)",
    lightForeground: "oklch(0.1700 0.0150 110.0000)",
    lightMutedForeground: "oklch(0.5000 0.0150 110.0000)",
    lightBorder: "oklch(0.8800 0.0100 110.0000)",
    lightBorderStrong: "oklch(0.8800 0.0100 110.0000)",
    lightAccent: "oklch(0.9200 0.0550 122.0000)",

    baseRadius: 0.875,
    baseSpacing: 4,
  },

  tokens: {
    background: (dna, context) =>
      readMode(context) === "light" ? dna.lightBackground : dna.darkBackground,

    foreground: (dna, context) =>
      readMode(context) === "light" ? dna.lightForeground : dna.darkForeground,

    card: (dna, context) =>
      readMode(context) === "light" ? dna.lightSurface : dna.darkSurface,

    cardForeground: (dna) => dna.foreground,

    popover: (dna, context) =>
      readMode(context) === "light" ? dna.lightSurface : dna.darkSurfaceRaised,

    popoverForeground: (dna) => dna.foreground,

    primary: (dna, context) =>
      readMode(context) === "light" ? dna.violetStrong : dna.violet,

    primaryForeground: () => "oklch(0.1200 0.0200 110.0000)",

    secondary: (dna, context) =>
      readMode(context) === "light"
        ? dna.lightSurfaceRaised
        : dna.darkSurfaceRaised,

    secondaryForeground: (dna) => dna.foreground,

    muted: (dna) => dna.secondary,

    mutedForeground: (dna, context) => {
      if (isHighContrast(context)) {
        return dna.foreground;
      }

      return readMode(context) === "light"
        ? dna.lightMutedForeground
        : dna.darkMutedForeground;
    },

    accent: (dna, context) =>
      readMode(context) === "light" ? dna.lightAccent : dna.darkAccent,

    accentForeground: (dna) => dna.foreground,

    destructive: (dna) => dna.danger,

    destructiveForeground: () => "oklch(1.0000 0 0)",

    border: (dna, context) => {
      const light = readMode(context) === "light";

      if (isHighContrast(context)) {
        return light ? dna.lightBorderStrong : dna.darkBorderStrong;
      }

      return light ? dna.lightBorder : dna.darkBorder;
    },

    input: (dna) => dna.border,
    ring: (dna) => dna.primary,

    sidebar: (dna) => dna.card,
    sidebarForeground: (dna) => dna.foreground,
    sidebarPrimary: (dna) => dna.primary,
    sidebarPrimaryForeground: (dna) => dna.primaryForeground,
    sidebarAccent: (dna) => dna.accent,
    sidebarAccentForeground: (dna) => dna.accentForeground,
    sidebarBorder: (dna) => dna.border,
    sidebarRing: (dna) => dna.ring,

    radius: (dna, context) =>
      `${Number(dna.baseRadius) * readScale(context, "radiusScale")}rem`,

    sectionGap: (dna, context) =>
      `${Number(dna.baseSpacing) * 24 * readScale(context, "spacingScale")}px`,

    controlHeight: (_dna, context) =>
      readDensity(context) === "compact" ? "2.25rem" : "2.5rem",
  },
} satisfies GenomeConfig;

export function createSiteGenome(
  target: HTMLElement | null,
  context: SiteGenomeContext = initialSiteContext,
): Genome {
  const genome = new Genome(siteGenomeConfig, target);

  genome.mutate({
    ...context,
  });

  return genome;
}
