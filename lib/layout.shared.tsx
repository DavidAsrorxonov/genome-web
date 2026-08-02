import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "GenomeJS",
    },
    links: [
      {
        text: "Playground",
        url: "/playground",
      },
      {
        text: "GitHub",
        url: "https://github.com/DavidAsrorxonov/genome",
        external: true,
      },
    ],
  };
}
