"use client";

import { Button } from "@/components/ui/button";
import { useSiteGenome } from "@/components/providers/genome-provider";

export function GenomeThemeDebug() {
  const { genome, context, setMode, setContrast, setDensity, setRadiusScale } =
    useSiteGenome();

  return (
    <div className="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground">
      <div>
        <p className="font-medium">GenomeJS theme bridge</p>

        <p className="text-sm text-muted-foreground">
          {genome ? "Runtime connected" : "Connecting runtime…"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setMode(context.mode === "dark" ? "light" : "dark")}
        >
          Mode: {context.mode}
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            setContrast(context.contrast === "standard" ? "high" : "standard")
          }
        >
          Contrast: {context.contrast}
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            setDensity(
              context.density === "comfortable" ? "compact" : "comfortable",
            )
          }
        >
          Density: {context.density}
        </Button>

        <Button
          variant="outline"
          onClick={() => setRadiusScale(context.radiusScale === 1 ? 1.35 : 1)}
        >
          Radius: {context.radiusScale}
        </Button>
      </div>
    </div>
  );
}
