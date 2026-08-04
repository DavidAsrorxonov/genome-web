import { Braces, GitBranch, Search, Variable } from "lucide-react";
import { Stage } from "./types";

export const stages: Stage[] = [
  {
    id: "declare",
    number: "01",
    title: "Declare",
    summary: "Define primitives, tokens, and runtime context.",
    description:
      "Start with raw values and pure token functions. Runtime conditions remain explicit instead of being hidden across duplicated theme objects.",
    icon: Braces,
    label: "Token definition",
    code: [
      "const genome = new Genome({",
      "  primitives: {",
      "    spacing: 16,",
      '    base: "#ff6900",',
      "  },",
      "  tokens: {",
      "    gap: (dna, context) =>",
      "      dna.spacing * context.scale,",
      "  },",
      "});",
    ],
  },
  {
    id: "discover",
    number: "02",
    title: "Discover",
    summary: "GenomeJS tracks which values each token function reads.",
    description:
      "During compilation, token functions run against tracking proxies. Reads become relationships in the dependency graph automatically.",
    icon: Search,
    label: "Discovered reads",
    code: [
      "gap reads:",
      "",
      "  dna.spacing",
      "  context.scale",
      "",
      "dependencies:",
      "",
      "  spacing ──→ gap",
      "  scale   ──→ gap",
    ],
  },
  {
    id: "resolve",
    number: "03",
    title: "Resolve",
    summary: "The dependency graph is sorted safely.",
    description:
      "GenomeJS determines a valid resolution order. Circular dependencies and unresolved token references fail early with descriptive errors.",
    icon: GitBranch,
    label: "Resolution order",
    code: [
      "dependency graph",
      "",
      "  spacing",
      "     │",
      "     ▼",
      "    gap",
      "",
      'order: ["gap"]',
      "",
      "gap = 16 × 1.2",
    ],
  },
  {
    id: "express",
    number: "04",
    title: "Express",
    summary: "Resolved values become CSS custom properties.",
    description:
      "GenomeJS writes resolved values to the target element and notifies subscribers. Unchanged CSS values are not rewritten.",
    icon: Variable,
    label: "Generated output",
    code: [
      ":root {",
      "  --g-spacing: 16;",
      "  --g-base: #ff6900;",
      "  --g-gap: 19.2;",
      "}",
      "",
      "subscribers notified",
      "interface updated",
    ],
  },
];

export const AUTO_STAGE_DELAY_MS = 2200;
