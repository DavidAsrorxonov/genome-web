import { packages } from "@/constants/packages";
import { Core as CoreIcon } from "@/components/icons/core";
import { React as ReactIcon } from "@/components/icons/react";
import { Svelte as SvelteIcon } from "@/components/icons/svelte";
import { Vue as VueIcon } from "@/components/icons/vue";
import { Framework } from "../framework-showcase";

export const frameworks: Framework[] = [
  {
    id: "core",
    name: "Core",
    packageName: packages.core.name,
    description: "The framework-neutral token compiler and runtime.",
    installation: packages.core.install,
    docsUrl: packages.core.docs,
    icon: CoreIcon,
    code: `import { Genome } from "@genomejs/core";

const genome = new Genome({
  primitives: {
    color: "#ff6900",
  },

  tokens: {
    headingColor: (dna) =>
      dna.color,
  },
});

const color =
  genome.getTrait("headingColor");`,
  },
  {
    id: "react",
    name: "React",
    packageName: packages.react.name,
    description:
      "Subscribe to resolved traits through React's external-store model.",
    installation: packages.react.install,
    docsUrl: packages.react.docs,
    icon: ReactIcon,
    code: `"use client";

import { useGenomeTrait }
  from "@genomejs/react";

function Heading() {
  const color = useGenomeTrait(
    genome,
    "color",
  );

  return (
    <h1 style={{ color: String(color) }}>
      Hello, Genome
    </h1>
  );
}`,
  },
  {
    id: "vue",
    name: "Vue",
    packageName: packages.vue.name,
    description: "Expose reactive Genome traits as native Vue refs.",
    installation: packages.vue.install,
    docsUrl: packages.vue.docs,
    icon: VueIcon,
    code: `<script setup lang="ts">
import { useGenomeTrait }
  from "@genomejs/vue";

const color = useGenomeTrait(
  genome,
  "color",
);
</script>

<template>
  <h1 :style="{ color }">
    Hello, Genome
  </h1>
</template>`,
  },
  {
    id: "svelte",
    name: "Svelte",
    packageName: packages.svelte.name,
    description: "Consume reactive traits through a Svelte rune-aware wrapper.",
    installation: packages.svelte.install,
    docsUrl: packages.svelte.docs,
    icon: SvelteIcon,
    note: "The Svelte adapter ships rune-aware source and requires a Svelte-aware downstream bundler.",
    code: `<script lang="ts">
  import { genomeTrait }
    from "@genomejs/svelte";

  const color = genomeTrait(
    genome,
    "color",
  );
</script>

<h1 style="color: {color.value}">
  Hello, Genome
</h1>`,
  },
];
