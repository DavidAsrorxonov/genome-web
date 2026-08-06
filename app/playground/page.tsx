import { PlaygroundShell } from "@/components/playground/playground-shell";
import { parsePlaygroundSearchParams } from "@/lib/playground/url-state";
import type { PlaygroundSearchParams } from "@/lib/playground/url-state";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Playground",
  description:
    "Manipulate predefined runtime context and inspect the traits, CSS custom properties, and dependency paths resolved by GenomeJS.",
  path: "/playground",
});

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
