import {
  contrastRatio,
  fluidScale,
  lockContrast,
  type GenomeConfig,
  type RuntimeContext,
} from "@genomejs/core";

import type {
  PlaygroundContext,
  PlaygroundContextKey,
  PlaygroundContrast,
  PlaygroundDensity,
  PlaygroundMode,
  PlaygroundPreset,
  PlaygroundPresetId,
  PlaygroundTokenMetadata,
} from "./types";
import {
  PLAYGROUND_CONTAINER_WIDTH_MAX,
  PLAYGROUND_CONTAINER_WIDTH_MIN,
  PLAYGROUND_SCALE_MAX,
  PLAYGROUND_SCALE_MIN,
} from "./constants";

function readMode(context: RuntimeContext): PlaygroundMode {
  return context.mode === "dark" ? "dark" : "light";
}

function readContrast(context: RuntimeContext): PlaygroundContrast {
  return context.contrast === "high" ? "high" : "standard";
}

function readDensity(context: RuntimeContext): PlaygroundDensity {
  return context.density === "compact" ? "compact" : "comfortable";
}

function readScale(context: RuntimeContext): number {
  const scale = context.scale;

  if (typeof scale !== "number" || !Number.isFinite(scale)) {
    return 1;
  }

  return Math.min(
    PLAYGROUND_SCALE_MAX,
    Math.max(PLAYGROUND_SCALE_MIN, scale),
  );
}

function readContainerWidth(context: RuntimeContext): number {
  const width = context.containerWidth;

  if (typeof width !== "number" || !Number.isFinite(width)) {
    return 720;
  }

  return Math.min(
    PLAYGROUND_CONTAINER_WIDTH_MAX,
    Math.max(PLAYGROUND_CONTAINER_WIDTH_MIN, width),
  );
}

function createTokenMetadata(
  name: string,
  label: string,
  dependencies: readonly string[] = [],
  contextKeys: readonly PlaygroundContextKey[] = [],
): PlaygroundTokenMetadata {
  return {
    name,
    label,
    dependencies,
    contextKeys,
  };
}

const themeConfig = {
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

const typographyConfig = {
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

const contrastConfig = {
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

const containerCardConfig = {
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

const scopedComponentConfig = {
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

export const playgroundPresets = [
  {
    id: "theme",
    title: "Light and dark theme",
    shortTitle: "Theme",
    description:
      "Switch semantic colors, spacing, radius, density, and accessible button contrast from runtime context.",
    concept: "One context mutation updates several related design tokens.",
    docsHref: "/docs/guides/dark-mode",

    config: themeConfig,

    initialContext: {
      mode: "light",
      contrast: "standard",
      density: "comfortable",
      scale: 1,
      containerWidth: 920,
    },

    enabledControls: ["mode", "contrast", "density", "scale"],

    primitiveNames: [
      "lightBackground",
      "darkBackground",
      "lightSurface",
      "darkSurface",
      "lightForeground",
      "darkForeground",
      "brand",
      "baseSpacing",
      "baseRadius",
    ],

    tokens: [
      createTokenMetadata("resolvedMode", "Resolved mode", [], ["mode"]),
      createTokenMetadata(
        "background",
        "Background",
        ["lightBackground", "darkBackground"],
        ["mode"],
      ),
      createTokenMetadata(
        "surface",
        "Surface",
        ["lightSurface", "darkSurface"],
        ["mode"],
      ),
      createTokenMetadata(
        "foreground",
        "Foreground",
        ["lightForeground", "darkForeground"],
        ["mode"],
      ),
      createTokenMetadata("primary", "Primary", ["brand"]),
      createTokenMetadata(
        "primaryForeground",
        "Primary foreground",
        ["primary", "surface"],
        ["contrast"],
      ),
      createTokenMetadata("spacing", "Spacing", ["baseSpacing"], ["scale"]),
      createTokenMetadata(
        "radius",
        "Radius",
        ["baseRadius"],
        ["scale", "density"],
      ),
      createTokenMetadata("controlHeight", "Control height", [], ["density"]),
    ],

    preview: {
      kind: "theme",
      title: "Application surface",
      description:
        "A semantic interface theme responding to mode, contrast, density, and scale.",
    },
  },

  {
    id: "typography",
    title: "Responsive typography",
    shortTitle: "Typography",
    description:
      "Generate fluid type sizes and adjust reading density from scale and available width.",
    concept:
      "CSS clamp expressions and runtime preferences can coexist in the same token graph.",
    docsHref: "/docs/guides/responsive-tokens",

    config: typographyConfig,

    initialContext: {
      mode: "light",
      contrast: "standard",
      density: "comfortable",
      scale: 1,
      containerWidth: 760,
    },

    enabledControls: ["scale", "density", "containerWidth"],

    primitiveNames: [
      "bodyMin",
      "bodyMax",
      "headingMin",
      "headingMax",
      "eyebrowMin",
      "eyebrowMax",
      "baseSpacing",
    ],

    tokens: [
      createTokenMetadata(
        "bodySize",
        "Body size",
        ["bodyMin", "bodyMax"],
        ["scale"],
      ),
      createTokenMetadata(
        "headingSize",
        "Heading size",
        ["headingMin", "headingMax"],
        ["scale"],
      ),
      createTokenMetadata(
        "eyebrowSize",
        "Eyebrow size",
        ["eyebrowMin", "eyebrowMax"],
        ["scale"],
      ),
      createTokenMetadata("lineHeight", "Line height", [], ["density"]),
      createTokenMetadata(
        "headingLineHeight",
        "Heading line height",
        [],
        ["density"],
      ),
      createTokenMetadata(
        "paragraphGap",
        "Paragraph gap",
        ["baseSpacing"],
        ["scale", "density"],
      ),
      createTokenMetadata(
        "readingMeasure",
        "Reading measure",
        [],
        ["containerWidth"],
      ),
    ],

    preview: {
      kind: "typography",
      title: "Editorial article",
      description:
        "Fluid heading and body values responding to scale, density, and available width.",
    },
  },

  {
    id: "contrast",
    title: "Accessible foreground color",
    shortTitle: "Contrast",
    description:
      "Adjust a preferred foreground against light and dark surfaces using a requested contrast ratio.",
    concept:
      "A surface change causes the accessible foreground and measured ratio to resolve again.",
    docsHref: "/docs/guides/accessible-colors",

    config: contrastConfig,

    initialContext: {
      mode: "light",
      contrast: "standard",
      density: "comfortable",
      scale: 1,
      containerWidth: 720,
    },

    enabledControls: ["mode", "contrast"],

    primitiveNames: [
      "lightSurface",
      "darkSurface",
      "preferredForeground",
      "lightBorder",
      "darkBorder",
    ],

    tokens: [
      createTokenMetadata("resolvedMode", "Resolved mode", [], ["mode"]),
      createTokenMetadata(
        "surface",
        "Surface",
        ["lightSurface", "darkSurface"],
        ["mode"],
      ),
      createTokenMetadata(
        "contrastTarget",
        "Contrast target",
        [],
        ["contrast"],
      ),
      createTokenMetadata("foreground", "Adjusted foreground", [
        "preferredForeground",
        "surface",
        "contrastTarget",
      ]),
      createTokenMetadata("achievedRatio", "Achieved ratio", [
        "foreground",
        "surface",
      ]),
      createTokenMetadata("contrastStatus", "Contrast status", [
        "achievedRatio",
        "contrastTarget",
      ]),
      createTokenMetadata(
        "border",
        "Border",
        ["lightBorder", "darkBorder"],
        ["mode"],
      ),
    ],

    preview: {
      kind: "contrast",
      title: "Accessible callout",
      description:
        "A foreground color adjusted against the currently selected surface.",
    },
  },

  {
    id: "container-card",
    title: "Container-aware card",
    shortTitle: "Container",
    description:
      "Change card layout, columns, spacing, media proportions, and typography from component width.",
    concept:
      "Component tokens respond to their own available space rather than only the viewport.",
    docsHref: "/docs/guides/container-aware-components",

    config: containerCardConfig,

    initialContext: {
      mode: "light",
      contrast: "standard",
      density: "comfortable",
      scale: 1,
      containerWidth: 720,
    },

    enabledControls: ["mode", "density", "containerWidth"],

    primitiveNames: [
      "lightSurface",
      "darkSurface",
      "lightForeground",
      "darkForeground",
      "compactGap",
      "comfortableGap",
      "compactPadding",
      "comfortablePadding",
    ],

    tokens: [
      createTokenMetadata("resolvedMode", "Resolved mode", [], ["mode"]),
      createTokenMetadata(
        "surface",
        "Surface",
        ["lightSurface", "darkSurface"],
        ["mode"],
      ),
      createTokenMetadata(
        "foreground",
        "Foreground",
        ["lightForeground", "darkForeground"],
        ["mode"],
      ),
      createTokenMetadata(
        "containerTier",
        "Container tier",
        [],
        ["containerWidth"],
      ),
      createTokenMetadata("columns", "Columns", ["containerTier"]),
      createTokenMetadata("cardDirection", "Card direction", ["containerTier"]),
      createTokenMetadata("gap", "Gap", [
        "containerTier",
        "compactGap",
        "comfortableGap",
      ]),
      createTokenMetadata(
        "padding",
        "Padding",
        ["compactPadding", "comfortablePadding"],
        ["density"],
      ),
      createTokenMetadata("mediaRatio", "Media ratio", ["containerTier"]),
      createTokenMetadata("mediaWidth", "Media width", ["containerTier"]),
      createTokenMetadata("titleSize", "Title size", ["containerTier"]),
    ],

    preview: {
      kind: "container-card",
      title: "Responsive card collection",
      description:
        "Cards that change structure based on the controlled container width.",
    },
  },

  {
    id: "scoped-component",
    title: "Scoped component theme",
    shortTitle: "Scope",
    description:
      "Apply an independent mode, density, spacing scale, and accent to one component subtree.",
    concept:
      "A child Genome can express component-local values without changing the application theme.",
    docsHref: "/docs/guides/scoped-component-themes",

    config: scopedComponentConfig,

    initialContext: {
      mode: "dark",
      contrast: "standard",
      density: "compact",
      scale: 1,
      containerWidth: 520,
    },

    enabledControls: ["mode", "density", "scale"],

    primitiveNames: [
      "lightSurface",
      "darkSurface",
      "lightForeground",
      "darkForeground",
      "lightAccent",
      "darkAccent",
      "compactSpacing",
      "comfortableSpacing",
      "compactRadius",
      "comfortableRadius",
    ],

    tokens: [
      createTokenMetadata("resolvedMode", "Resolved mode", [], ["mode"]),
      createTokenMetadata(
        "surface",
        "Surface",
        ["lightSurface", "darkSurface"],
        ["mode"],
      ),
      createTokenMetadata(
        "foreground",
        "Foreground",
        ["lightForeground", "darkForeground"],
        ["mode"],
      ),
      createTokenMetadata(
        "accent",
        "Accent",
        ["lightAccent", "darkAccent"],
        ["mode"],
      ),
      createTokenMetadata(
        "spacing",
        "Spacing",
        ["compactSpacing", "comfortableSpacing"],
        ["density", "scale"],
      ),
      createTokenMetadata(
        "radius",
        "Radius",
        ["compactRadius", "comfortableRadius"],
        ["density", "scale"],
      ),
      createTokenMetadata("controlHeight", "Control height", [], ["density"]),
      createTokenMetadata("border", "Border", [], ["mode"]),
      createTokenMetadata("scopeLabel", "Scope label", [], ["mode", "density"]),
    ],

    preview: {
      kind: "scoped-component",
      title: "Scoped inspector",
      description:
        "A component-local theme that remains isolated from the surrounding website.",
    },
  },
] as const satisfies readonly PlaygroundPreset[];

export const DEFAULT_PLAYGROUND_PRESET_ID: PlaygroundPresetId = "theme";

export function isPlaygroundPresetId(
  value: string,
): value is PlaygroundPresetId {
  return playgroundPresets.some((preset) => preset.id === value);
}

export function getPlaygroundPreset(
  id: string | null | undefined,
): PlaygroundPreset {
  if (!id) {
    return playgroundPresets[0];
  }

  return (
    playgroundPresets.find((preset) => preset.id === id) ?? playgroundPresets[0]
  );
}

export function clonePlaygroundContext(
  context: PlaygroundContext,
): PlaygroundContext {
  return {
    ...context,
  };
}
