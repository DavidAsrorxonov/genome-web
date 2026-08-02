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
    violet: "oklch(0.63 0.22 285)",
    violetStrong: "oklch(0.57 0.24 285)",
    teal: "oklch(0.76 0.14 178)",
    danger: "oklch(0.65 0.22 20)",

    darkBackground: "oklch(0.14 0.01 270)",
    darkSurface: "oklch(0.18 0.015 270)",
    darkSurfaceRaised: "oklch(0.215 0.018 270)",
    darkForeground: "oklch(0.97 0.005 270)",
    darkMutedForeground: "oklch(0.73 0.02 270)",
    darkBorder: "oklch(1 0 0 / 10%)",
    darkBorderStrong: "oklch(1 0 0 / 24%)",
    darkAccent: "oklch(0.24 0.04 285)",

    lightBackground: "oklch(0.99 0.002 270)",
    lightSurface: "oklch(1 0 0)",
    lightSurfaceRaised: "oklch(0.97 0.005 270)",
    lightForeground: "oklch(0.17 0.01 270)",
    lightMutedForeground: "oklch(0.46 0.02 270)",
    lightBorder: "oklch(0.2 0.01 270 / 12%)",
    lightBorderStrong: "oklch(0.2 0.01 270 / 25%)",
    lightAccent: "oklch(0.94 0.04 285)",

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

    primaryForeground: () => "oklch(0.99 0 0)",

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

    destructiveForeground: () => "oklch(0.99 0 0)",

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
