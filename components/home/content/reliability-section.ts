import { CircleAlert, Gauge, GitBranch } from "lucide-react";
import type { Safeguard } from "./types";

type VerificationItem = {
  label: string;
  detail: string;
};

export const verificationItems: VerificationItem[] = [
  {
    label: "Core engine tests",
    detail:
      "Resolution order, graph validation, CSS diffing, and scoped context.",
  },
  {
    label: "React adapter tests",
    detail: "Initial trait reads and reactive updates after mutation.",
  },
  {
    label: "React SSR verification",
    detail: "Traits render through React DOM Server without a browser DOM.",
  },
  {
    label: "Vue adapter tests",
    detail: "Reactive Vue refs subscribe to the shared Genome runtime.",
  },
  {
    label: "Svelte adapter tests",
    detail: "Rune-aware state follows Genome subscriptions.",
  },
  {
    label: "TypeScript project references",
    detail: "The complete monorepo is checked through tsc -b.",
  },
  {
    label: "Workspace builds",
    detail: "All publishable packages are built before release.",
  },
  {
    label: "GitHub Actions CI",
    detail:
      "Install, typecheck, build, and test run on pushes and pull requests.",
  },
];

export const safeguards: Safeguard[] = [
  {
    title: "Circular graphs fail early",
    description:
      "GenomeJS detects cycles while compiling the dependency graph, before invalid token output reaches the interface.",
    icon: GitBranch,
    example: [
      "CircularDependencyError",
      "",
      "a → b → c → a",
      "",
      "Resolution stopped.",
    ],
  },
  {
    title: "Unknown tokens fail clearly",
    description:
      "References to primitives or tokens that do not exist produce a dedicated unresolved-token error.",
    icon: CircleAlert,
    example: [
      "UnresolvedTokenError",
      "",
      'Token "surface" reads:',
      '  "missingColor"',
      "",
      "Unknown reference.",
    ],
  },
  {
    title: "Unchanged CSS stays untouched",
    description:
      "GenomeJS stores the last expressed value and skips identical CSS custom-property writes.",
    icon: Gauge,
    example: [
      "genome.mutate({ scale: 1 })",
      "",
      "--g-gap: unchanged",
      "--g-radius: unchanged",
      "",
      "0 redundant writes",
    ],
  },
];
