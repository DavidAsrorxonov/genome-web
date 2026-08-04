export const packages = {
  core: {
    name: "@genomejs/core",
    install: "npm install @genomejs/core",
    npm: "https://www.npmjs.com/package/@genomejs/core",
    docs: "https://github.com/DavidAsrorxonov/genome/tree/main/packages/core#readme",
  },
  react: {
    name: "@genomejs/react",
    install: "npm install @genomejs/core @genomejs/react",
    npm: "https://www.npmjs.com/package/@genomejs/react",
    docs: "https://github.com/DavidAsrorxonov/genome/tree/main/packages/react#readme",
  },
  vue: {
    name: "@genomejs/vue",
    install: "npm install @genomejs/core @genomejs/vue",
    npm: "https://www.npmjs.com/package/@genomejs/vue",
    docs: "https://github.com/DavidAsrorxonov/genome/tree/main/packages/vue#readme",
  },
  svelte: {
    name: "@genomejs/svelte",
    install: "npm install @genomejs/core @genomejs/svelte",
    npm: "https://www.npmjs.com/package/@genomejs/svelte",
    docs: "https://github.com/DavidAsrorxonov/genome/tree/main/packages/svelte#readme",
  },
} as const;
