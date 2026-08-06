import Link from "next/link";
import { ArrowRight, BookOpen, Home, SearchX, Terminal } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

const recoveryLinks = [
  {
    label: "Return home",
    description: "Go back to the GenomeJS landing page.",
    href: routes.home,
    icon: Home,
  },
  {
    label: "Read the docs",
    description: "Find installation, concepts, and API reference.",
    href: routes.docs,
    icon: BookOpen,
  },
  {
    label: "Open playground",
    description: "Inspect live token resolution in the browser.",
    href: routes.playground,
    icon: Terminal,
  },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="relative isolate flex flex-1 overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,rgba(255,105,1,0.18),transparent_58%)]"
          aria-hidden="true"
        />

        <div
          className="absolute left-1/2 top-18 -z-10 size-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />

        <section className="mx-auto flex w-full max-w-310 items-center px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
            <div className="max-w-3xl">
              <Badge variant="outline" className="rounded-full">
                <SearchX className="size-3.5" aria-hidden="true" />
                404 · unresolved route
              </Badge>

              <h1 className="mt-6 text-balance font-heading text-5xl font-semibold tracking-tighter sm:text-6xl lg:text-7xl">
                This path is not in the dependency graph.
              </h1>

              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
                The page you requested does not exist, moved, or never resolved
                into a valid GenomeJS route.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={routes.home}
                  className={cn(
                    buttonVariants({
                      size: "lg",
                    }),
                    "w-full sm:w-fit",
                  )}
                >
                  Return home
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>

                <Link
                  href={routes.docs}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                    }),
                    "w-full sm:w-fit",
                  )}
                >
                  Browse docs
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border bg-card/70 p-4 shadow-sm backdrop-blur">
              <div className="rounded-xl border bg-background/80 p-4">
                <div className="flex items-center gap-2 border-b pb-3 font-mono text-xs text-muted-foreground">
                  <span className="size-2 rounded-full bg-primary" />
                  route-resolution.log
                </div>

                <div className="space-y-3 pt-4 font-mono text-xs leading-6">
                  <p>
                    <span className="text-muted-foreground">status:</span>{" "}
                    <span className="text-primary">unresolved</span>
                  </p>

                  <p>
                    <span className="text-muted-foreground">fallback:</span>{" "}
                    <span>not-found.tsx</span>
                  </p>

                  <p>
                    <span className="text-muted-foreground">next:</span>{" "}
                    <span>choose a valid route</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {recoveryLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-xl border bg-background/60 p-4 transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="size-4" aria-hidden="true" />
                      </span>

                      <span>
                        <span className="block text-sm font-medium">
                          {item.label}
                        </span>

                        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
