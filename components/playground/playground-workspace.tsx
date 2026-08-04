"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import { Eye, SlidersHorizontal } from "lucide-react";
import { PlaygroundContextControls } from "@/components/playground/playground-context-controls";
import { PlaygroundControllerProvider } from "@/components/playground/playground-controller";
import { PlaygroundLivePreview } from "@/components/playground/playground-live-preview";
import { PlaygroundOutputPanel } from "@/components/playground/playground-output-panel";
import { PlaygroundPanel } from "@/components/playground/playground-panel";
import { PlaygroundPresetCatalog } from "@/components/playground/playground-preset-catalog";
import { cn } from "@/lib/utils";
import { PlaygroundUrlState } from "@/lib/playground/url-state";

type MobilePanel = "controls" | "preview" | "output";

const mobilePanels = [
  {
    id: "controls",
    label: "Controls",
  },
  {
    id: "preview",
    label: "Preview",
  },
  {
    id: "output",
    label: "Output",
  },
] as const satisfies readonly {
  id: MobilePanel;
  label: string;
}[];

function ControlsPanel({ className }: { className?: string }) {
  return (
    <PlaygroundPanel
      id="playground-panel-controls"
      role="tabpanel"
      aria-labelledby="playground-tab-controls"
      icon={SlidersHorizontal}
      title="Inputs"
      description="Select a preset and mutate predefined runtime context."
      className={className}
    >
      <div className="space-y-5">
        <PlaygroundPresetCatalog />

        <div className="h-px bg-border" />

        <PlaygroundContextControls />
      </div>
    </PlaygroundPanel>
  );
}

function PreviewPanel({ className }: { className?: string }) {
  return (
    <PlaygroundPanel
      id="playground-panel-preview"
      role="tabpanel"
      aria-labelledby="playground-tab-preview"
      icon={Eye}
      title="Live preview"
      description="Observe the interface responding to resolved GenomeJS traits."
      className={className}
      bodyClassName="flex"
    >
      <PlaygroundLivePreview />
    </PlaygroundPanel>
  );
}

function PlaygroundWorkspaceContent() {
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("controls");

  function focusMobileTab(panel: MobilePanel): void {
    setMobilePanel(panel);

    document.getElementById(`playground-tab-${panel}`)?.focus();
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,

    currentPanel: MobilePanel,
  ): void {
    const currentIndex = mobilePanels.findIndex(
      (panel) => panel.id === currentPanel,
    );

    if (event.key === "ArrowRight") {
      event.preventDefault();

      const nextIndex = (currentIndex + 1) % mobilePanels.length;

      focusMobileTab(mobilePanels[nextIndex].id);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      const nextIndex =
        (currentIndex - 1 + mobilePanels.length) % mobilePanels.length;

      focusMobileTab(mobilePanels[nextIndex].id);
    }

    if (event.key === "Home") {
      event.preventDefault();

      focusMobileTab(mobilePanels[0].id);
    }

    if (event.key === "End") {
      event.preventDefault();

      focusMobileTab(mobilePanels[mobilePanels.length - 1].id);
    }
  }

  return (
    <>
      <div
        role="tablist"
        aria-label="Playground panels"
        className="grid grid-cols-3 rounded-xl border bg-muted/35 p-1 md:hidden"
      >
        {mobilePanels.map((panel) => {
          const isActive = mobilePanel === panel.id;

          return (
            <button
              key={panel.id}
              id={`playground-tab-${panel.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`playground-panel-${panel.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                setMobilePanel(panel.id);
              }}
              onKeyDown={(event) => {
                handleTabKeyDown(event, panel.id);
              }}
              className={cn(
                "min-h-11 rounded-lg px-2 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {panel.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid min-w-0 gap-4 md:mt-0 md:grid-cols-12 lg:gap-5">
        <ControlsPanel
          className={cn(
            mobilePanel === "controls" ? "flex" : "hidden",

            "md:col-span-4 md:flex lg:col-span-3",
          )}
        />

        <PreviewPanel
          className={cn(
            mobilePanel === "preview" ? "flex" : "hidden",

            "md:col-span-8 md:flex lg:col-span-5",
          )}
        />

        <PlaygroundOutputPanel
          className={cn(
            mobilePanel === "output" ? "flex" : "hidden",

            "md:col-span-12 md:flex lg:col-span-4",
          )}
        />
      </div>
    </>
  );
}

interface PlaygroundWorkspaceProps {
  initialState: PlaygroundUrlState;
}

export function PlaygroundWorkspace({
  initialState,
}: PlaygroundWorkspaceProps) {
  return (
    <PlaygroundControllerProvider initialState={initialState}>
      <PlaygroundWorkspaceContent />
    </PlaygroundControllerProvider>
  );
}
