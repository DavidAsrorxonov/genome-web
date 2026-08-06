import Link from "next/link";
import Image from "next/image";

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
        <div className="grid gap-12 md:grid-cols-[minmax(0,34rem)_1fr] lg:gap-20 xl:gap-28">
          <div className="min-w-0">
            <Link
              href={routes.home}
              aria-label="GenomeJS homepage"
              className="block w-fit max-w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="block max-w-full whitespace-nowrap text-[clamp(3.5rem,11vw,5.75rem)] font-semibold leading-none tracking-tighter text-foreground md:text-[clamp(4.25rem,6vw,5.75rem)]">
                Genome<span className="text-primary">JS</span>
              </span>
            </Link>

            <div className="mt-5 flex flex-col items-start gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Powered by
              </p>

              <div className="relative flex size-24 items-center justify-center sm:size-28">
                <div className="absolute inset-2 rounded-full bg-[#ff6901]/25 blur-2xl" />
                <Image
                  src="/images/genome-no-bg.png"
                  alt="GenomeJS logo"
                  width={112}
                  height={112}
                  className="relative z-10 size-20 object-contain sm:size-24"
                />
              </div>

              <div className="flex max-w-xs flex-col items-start gap-2">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  And that, gentlemen, is what we call recursion.
                </p>

                <span className="inline-flex rounded-full border border-[#ff6901]/30 bg-[#ff6901]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary shadow-[0_0_24px_rgba(255,105,1,0.18)]">
                  recursive: true
                </span>
              </div>
            </div>
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
