"use client";

import { Workflow } from "lucide-react";
import { PlaygroundCompilerOutput } from "@/components/playground/playground-compiler-output";
import { PlaygroundPanel } from "@/components/playground/playground-panel";

interface PlaygroundOutputPanelProps {
  className?: string;
}

export function PlaygroundOutputPanel({
  className,
}: PlaygroundOutputPanelProps) {
  return (
    <PlaygroundPanel
      id="playground-panel-output"
      role="tabpanel"
      aria-labelledby="playground-tab-output"
      icon={Workflow}
      title="Compiler output"
      description="Inspect resolved values, CSS custom properties, and dependencies."
      className={className}
      bodyClassName="min-h-0"
    >
      <PlaygroundCompilerOutput />
    </PlaygroundPanel>
  );
}
