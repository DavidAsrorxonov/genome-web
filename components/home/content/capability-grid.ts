import {
  Blocks,
  CircleAlert,
  Gauge,
  GitBranch,
  Network,
  RefreshCcw,
} from "lucide-react";
import type { Capability } from "./types";

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Automatic dependency discovery",
    description:
      "Token relationships are inferred from the values each function reads.",
    detail:
      "No manually maintained dependency arrays or separate graph declarations.",
    icon: Network,
    featured: true,
  },
  {
    number: "02",
    title: "Safe resolution",
    description:
      "Derived tokens are topologically ordered before their values are resolved.",
    detail:
      "Dependencies resolve in a predictable order, even across multiple token layers.",
    icon: GitBranch,
  },
  {
    number: "03",
    title: "Clear errors",
    description:
      "Circular relationships and unresolved token references fail early.",
    detail:
      "Invalid graphs surface descriptive errors instead of silently producing broken output.",
    icon: CircleAlert,
  },
  {
    number: "04",
    title: "Reactive context",
    description: "Call genome.mutate() when runtime conditions change.",
    detail:
      "Color mode, contrast, scale, viewport state, and custom context remain explicit.",
    icon: RefreshCcw,
    featured: true,
  },
  {
    number: "05",
    title: "Efficient CSS output",
    description:
      "Only CSS custom properties whose resolved values changed are rewritten.",
    detail:
      "GenomeJS keeps the last expressed values and avoids identical style writes.",
    icon: Gauge,
  },
  {
    number: "06",
    title: "Framework adapters",
    description: "Use the same Core engine with React, Vue, and Svelte.",
    detail:
      "Each adapter exposes Genome state through its framework’s normal reactivity model.",
    icon: Blocks,
  },
];

export const utilities = [
  {
    name: "contrastRatio",
    description: "Measure color contrast.",
  },
  {
    name: "lockContrast",
    description: "Adjust colors toward a target ratio.",
  },
  {
    name: "fluidScale",
    description: "Generate responsive type values.",
  },
  {
    name: "bindContainerSize",
    description: "Connect container dimensions.",
  },
  {
    name: "bindMediaQueries",
    description: "Connect media-query state.",
  },
  {
    name: "scope",
    description: "Create isolated Genome instances.",
  },
];
