import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { packages } from "@/constants/packages";
import { routes } from "@/constants/routes";
import { siteLinks } from "@/constants/site";

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
        href: routes.docs,
      },
      {
        label: "Playground",
        href: routes.playground,
      },
    ],
  },
  {
    title: "Packages",
    links: [
      {
        label: "Core",
        href: packages.core.npm,
        external: true,
      },
      {
        label: "React",
        href: packages.react.npm,
        external: true,
      },
      {
        label: "Vue",
        href: packages.vue.npm,
        external: true,
      },
      {
        label: "Svelte",
        href: packages.svelte.npm,
        external: true,
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "GitHub",
        href: siteLinks.githubRepo,
        external: true,
      },
      {
        label: "Issues",
        href: siteLinks.githubIssues,
        external: true,
      },
      {
        label: "Contributing",
        href: routes.contributing,
      },
    ],
  },
  {
    title: "Reference",
    links: [
      {
        label: "Changelog",
        href: routes.changelog,
      },
      {
        label: "Contributing",
        href: routes.contributing,
      },
      {
        label: "Architecture",
        href: routes.architecture,
      },
      {
        label: "License",
        href: routes.license,
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
              href={routes.home}
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
              href={siteLinks.authorGithub}
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
