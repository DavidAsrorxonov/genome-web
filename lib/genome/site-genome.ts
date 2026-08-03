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
    violet: "oklch(0.6996 0.2020 44.4414)",
    violetStrong: "oklch(0.6996 0.2020 44.4414)",
    teal: "oklch(0.7653 0.1306 194.7689)",
    danger: "oklch(0.6280 0.2577 29.2339)",

    darkBackground: "oklch(0.1822 0 0)",
    darkSurface: "oklch(0.2178 0 0)",
    darkSurfaceRaised: "oklch(0.3211 0 0)",
    darkForeground: "oklch(0.9612 0 0)",
    darkMutedForeground: "oklch(0.7252 0 0)",
    darkBorder: "oklch(0.3715 0 0)",
    darkBorderStrong: "oklch(0.3715 0 0)",
    darkAccent: "oklch(0.7512 0.1680 52.0772)",

    lightBackground: "oklch(0.9851 0 0)",
    lightSurface: "oklch(0.9702 0 0)",
    lightSurfaceRaised: "oklch(0.9219 0 0)",
    lightForeground: "oklch(0.1448 0 0)",
    lightMutedForeground: "oklch(0.4495 0 0)",
    lightBorder: "oklch(0.8514 0 0)",
    lightBorderStrong: "oklch(0.8514 0 0)",
    lightAccent: "oklch(0.7512 0.1680 52.0772)",

    baseRadius: 0,
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

    primaryForeground: () => "oklch(0 0 0)",

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

    destructiveForeground: () => "oklch(0.9851 0 0)",

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
