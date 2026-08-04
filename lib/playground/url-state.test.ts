import { describe, expect, it } from "vitest";

import {
  createPlaygroundRelativeUrl,
  createPlaygroundSearchParams,
  parsePlaygroundSearchParams,
} from "./url-state";

describe("playground URL state", () => {
  it("uses the default preset for empty parameters", () => {
    const state = parsePlaygroundSearchParams({});

    expect(state.presetId).toBe("theme");

    expect(state.context).toEqual({
      mode: "light",
      contrast: "standard",
      density: "comfortable",
      scale: 1,
      containerWidth: 920,
    });
  });

  it("restores enabled contrast preset values", () => {
    const state = parsePlaygroundSearchParams(
      new URLSearchParams({
        preset: "contrast",
        mode: "dark",
        contrast: "high",
      }),
    );

    expect(state.presetId).toBe("contrast");

    expect(state.context.mode).toBe("dark");

    expect(state.context.contrast).toBe("high");
  });

  it("ignores controls unsupported by the preset", () => {
    const state = parsePlaygroundSearchParams(
      new URLSearchParams({
        preset: "contrast",
        density: "compact",
        scale: "1.4",
        width: "1200",
      }),
    );

    expect(state.context.density).toBe("comfortable");

    expect(state.context.scale).toBe(1);

    expect(state.context.containerWidth).toBe(720);
  });

  it("clamps and normalizes numeric values", () => {
    const state = parsePlaygroundSearchParams(
      new URLSearchParams({
        preset: "typography",
        scale: "4",
        width: "557",
      }),
    );

    expect(state.context.scale).toBe(1.4);

    expect(state.context.containerWidth).toBe(560);
  });

  it("falls back from invalid values", () => {
    const state = parsePlaygroundSearchParams(
      new URLSearchParams({
        preset: "not-real",
        mode: "sepia",
        scale: "hello",
      }),
    );

    expect(state.presetId).toBe("theme");

    expect(state.context.mode).toBe("light");

    expect(state.context.scale).toBe(1);
  });

  it("serializes only enabled controls", () => {
    const parameters = createPlaygroundSearchParams({
      presetId: "container-card",

      context: {
        mode: "dark",
        contrast: "high",
        density: "compact",
        scale: 1.4,
        containerWidth: 960,
      },
    });

    expect(parameters.toString()).toBe(
      "preset=container-card&mode=dark&density=compact&width=960",
    );
  });

  it("creates a canonical relative URL", () => {
    const url = createPlaygroundRelativeUrl({
      presetId: "contrast",

      context: {
        mode: "dark",
        contrast: "high",
        density: "comfortable",
        scale: 1,
        containerWidth: 720,
      },
    });

    expect(url).toBe("/playground?preset=contrast&mode=dark&contrast=high");
  });
});
