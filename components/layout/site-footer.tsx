import Link from "next/link";

import { Logo } from "@/components/brand/logo";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: "Product",
    links: [
      {
        label: "Documentation",
        href: "/docs",
      },
      {
        label: "Playground",
        href: "/playground",
      },
    ],
  },
  {
    title: "Packages",
    links: [
      {
        label: "Core",
        href: "https://www.npmjs.com/package/@genomejs/core",
        external: true,
      },
      {
        label: "React",
        href: "https://www.npmjs.com/package/@genomejs/react",
        external: true,
      },
      {
        label: "Vue",
        href: "https://www.npmjs.com/package/@genomejs/vue",
        external: true,
      },
      {
        label: "Svelte",
        href: "https://www.npmjs.com/package/@genomejs/svelte",
        external: true,
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/DavidAsrorxonov/genome",
        external: true,
      },
      {
        label: "Issues",
        href: "https://github.com/DavidAsrorxonov/genome/issues",
        external: true,
      },
      {
        label: "Contributing",
        href: "/docs/project/contributing",
      },
    ],
  },
  {
    title: "Reference",
    links: [
      {
        label: "Changelog",
        href: "/docs/project/changelog",
      },
      {
        label: "Contributing",
        href: "/docs/project/contributing",
      },
      {
        label: "Architecture",
        href: "/docs/project/architecture",
      },
      {
        label: "License",
        href: "/docs/project/license",
      },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className =
    "text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/30">
      <div className="mx-auto w-full max-w-310 px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="GenomeJS homepage"
              className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Logo />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A reactive design-token compiler for interfaces that respond to
              runtime context.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold">{group.title}</h2>

                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} GenomeJS. MIT licensed.</p>

          <p>
            Built and maintained by{" "}
            <a
              href="https://github.com/DavidAsrorxonov"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              @Dovudkhon
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
