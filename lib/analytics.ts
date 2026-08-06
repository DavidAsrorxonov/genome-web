"use client";

import { track } from "@vercel/analytics";

export type AnalyticsEventName =
  | "Playground Preset Selected"
  | "Playground State Shared"
  | "Playground CSS Copied";

type AnalyticsProperties = Record<string, string | number | boolean | null>;

const customEventsEnabled =
  process.env.NEXT_PUBLIC_VERCEL_CUSTOM_EVENTS === "true";

export function trackAnalyticsEvent(
  name: AnalyticsEventName,
  properties?: AnalyticsProperties,
): void {
  if (!customEventsEnabled) {
    return;
  }

  try {
    track(name, properties);
  } catch {
    // nada
  }
}
