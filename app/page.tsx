import { GenomeThemeDebug } from "@/components/genome-theme-debug";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto grid max-w-3xl gap-8">
        <div className="space-y-3">
          <p className="font-mono text-sm text-primary">@genomejs/core</p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Design tokens that respond.
          </h1>

          <p className="max-w-xl text-muted-foreground">
            This interface is now driven by the published GenomeJS package.
          </p>
        </div>

        <GenomeThemeDebug />
      </div>
    </main>
  );
}
