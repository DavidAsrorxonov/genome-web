import type {
  PlaygroundContext,
  PlaygroundPreset,
  PlaygroundPresetId,
} from "./types";
import { createTokenMetadata } from "./presets/helpers";
import { themeConfig } from "./presets/theme";
import { typographyConfig } from "./presets/typography";
import { contrastConfig } from "./presets/contrast";
import { containerCardConfig } from "./presets/container-card";
import { scopedComponentConfig } from "./presets/scoped-component";

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
