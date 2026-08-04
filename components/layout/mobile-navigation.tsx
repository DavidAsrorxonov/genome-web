"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import { GitHub } from "@/components/icons/github";
import { Logo } from "@/components/logo";
import { NPM } from "@/components/icons/npm";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const internalLinks = [
  {
    label: "Documentation",
    description: "Installation, concepts, and API guides.",
    href: "/docs",
  },
  {
    label: "Playground",
    description: "Mutate context and inspect live output.",
    href: "/playground",
  },
];

const externalLinks = [
  {
    label: "GitHub",
    href: "https://github.com/DavidAsrorxonov/genome",
    icon: GitHub,
  },
  {
    label: "npm",
    href: "https://www.npmjs.com/package/@genomejs/core",
    icon: NPM,
  },
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  function closeNavigation() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open navigation"
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon-sm",
          }),
          "md:hidden",
        )}
      >
        <Menu className="size-4" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-[min(24rem,calc(100vw-1rem))] flex-col p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b p-6 text-left">
          <SheetTitle>
            <Logo />
            <span className="sr-only">GenomeJS navigation</span>
          </SheetTitle>

          <SheetDescription className="sr-only">
            Navigate the GenomeJS website.
          </SheetDescription>
        </SheetHeader>

        <nav
          className="flex flex-1 flex-col gap-2 p-4"
          aria-label="Mobile navigation"
        >
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeNavigation}
              className="group rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex items-center justify-between gap-4">
                <span>
                  <span className="block font-medium">{link.label}</span>

                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {link.description}
                  </span>
                </span>

                <ArrowRight
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}

          <div className="my-3 h-px bg-border" />

          {externalLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={closeNavigation}
                className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="size-4" aria-hidden="true" />

                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <Link
            href="/docs"
            onClick={closeNavigation}
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "w-full",
            )}
          >
            Get started
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
