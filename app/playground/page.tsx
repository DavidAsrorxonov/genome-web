import type { Metadata } from "next";

import { PlaygroundShell } from "@/components/playground/playground-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Playground | GenomeJS",
  description:
    "Manipulate predefined runtime context and inspect how GenomeJS resolves traits and expresses CSS custom properties.",
};

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <PlaygroundShell />
      <SiteFooter />
    </div>
  );
}
