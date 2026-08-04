import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { routes } from "@/constants/routes";
import { siteLinks } from "@/constants/site";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "GenomeJS",
    },
    links: [
      {
        text: "Playground",
        url: routes.playground,
      },
      {
        text: "GitHub",
        url: siteLinks.githubRepo,
        external: true,
      },
    ],
  };
}
