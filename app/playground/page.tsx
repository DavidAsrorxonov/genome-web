import type { Metadata } from "next";
import { PlaygroundShell } from "@/components/playground/playground-shell";
import { parsePlaygroundSearchParams } from "@/lib/playground/url-state";
import type { PlaygroundSearchParams } from "@/lib/playground/url-state";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Playground | GenomeJS",

  description:
    "Manipulate predefined runtime context and inspect how GenomeJS resolves traits and expresses CSS custom properties.",
};

interface PlaygroundPageProps {
  searchParams: Promise<PlaygroundSearchParams>;
}

export default async function PlaygroundPage({
  searchParams,
}: PlaygroundPageProps) {
  const initialState = parsePlaygroundSearchParams(await searchParams);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <PlaygroundShell initialState={initialState} />

      <SiteFooter />
    </div>
  );
}
