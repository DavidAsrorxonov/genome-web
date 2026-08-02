"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, GitBranch, Package } from "lucide-react";

import { Logo } from "@/components/logo";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "Playground",
    href: "/playground",
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function updateHeader() {
      setScrolled(window.scrollY > 8);
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200",
        scrolled
          ? "border-border/70 bg-background/85 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-310 items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="GenomeJS homepage"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <a
            href="https://github.com/DavidAsrorxonov/genome"
            target="_blank"
            rel="noreferrer"
            aria-label="GenomeJS on GitHub"
            title="GitHub"
            className={buttonVariants({
              variant: "ghost",
              size: "icon-sm",
            })}
          >
            <GitBranch className="size-4" aria-hidden="true" />
          </a>

          <a
            href="https://www.npmjs.com/package/@genomejs/core"
            target="_blank"
            rel="noreferrer"
            aria-label="GenomeJS on npm"
            title="npm package"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon-sm",
              }),
              "hidden sm:inline-flex",
            )}
          >
            <Package className="size-4" aria-hidden="true" />
          </a>

          <ThemeToggle />

          <Link
            href="/docs"
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              "ml-1 hidden lg:inline-flex",
            )}
          >
            Get started
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
