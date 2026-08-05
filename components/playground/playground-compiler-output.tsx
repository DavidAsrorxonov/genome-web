"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Genome } from "@genomejs/core";
import { Braces, CircleDot, GitBranch, Network, Variable } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlaygroundController } from "@/components/playground/playground-controller";
import {
  createResolvedTraits,
  getAffectedTokenNames,
  parsePlaygroundValues,
  serializePlaygroundValues,
} from "@/lib/playground/compiler-output";
import type { PlaygroundResolvedTrait } from "@/lib/playground/compiler-output";
import type { PlaygroundPreset } from "@/lib/playground/types";
import { cn } from "@/lib/utils";
import { PlaygroundActions } from "@/components/playground/playground-actions";
import type { PlaygroundContextKey } from "@/lib/playground/types";

function useResolvedTraits(
  genome: Genome,
  preset: PlaygroundPreset,
): PlaygroundResolvedTrait[] {
  const subscribe = useCallback(
    (listener: () => void) => genome.subscribe(listener),
    [genome],
  );

  const getSnapshot = useCallback(
    () => serializePlaygroundValues(genome, preset),
    [genome, preset],
  );

  const serialized = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const values = useMemo(() => parsePlaygroundValues(serialized), [serialized]);

  return useMemo(() => createResolvedTraits(preset, values), [preset, values]);
}

function ChangedBadge() {
  return (
    <Badge className="h-5 bg-primary/10 px-1.5 font-mono text-[9px] uppercase tracking-widest text-primary hover:bg-primary/10">
      Changed
    </Badge>
  );
}

function ResolvedDnaPanel({
  traits,
  changedNames,
}: {
  traits: readonly PlaygroundResolvedTrait[];

  changedNames: ReadonlySet<string>;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center justify-between gap-3 border-b bg-muted/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <Braces className="size-4 text-muted-foreground" aria-hidden="true" />

          <p className="text-sm font-medium">Resolved DNA</p>
        </div>

        <Badge variant="outline" className="font-mono text-[10px]">
          {traits.length} traits
        </Badge>
      </div>

      <div className="max-h-152 overflow-auto">
        <table className="w-full min-w-2xl border-collapse text-left">
          <thead className="sticky top-0 z-10 border-b bg-background">
            <tr className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-4 py-3 font-medium">Trait</th>

              <th className="px-3 py-3 font-medium">Type</th>

              <th className="px-3 py-3 font-medium">Value</th>

              <th className="px-3 py-3 text-right font-medium">Inputs</th>

              <th className="w-20 px-4 py-3 text-right font-medium">State</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {traits.map((trait) => {
              const changed = changedNames.has(trait.name);

              return (
                <tr
                  key={trait.name}
                  className={cn(
                    "transition-colors",
                    changed && "bg-primary/[0.07]",
                  )}
                >
                  <td className="px-4 py-3">
                    <p className="font-mono text-[11px] font-medium">
                      {trait.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {trait.label}
                    </p>
                  </td>

                  <td className="px-3 py-3">
                    <Badge
                      variant={
                        trait.kind === "primitive" ? "outline" : "secondary"
                      }
                      className="h-5 font-mono text-[9px] uppercase tracking-widest"
                    >
                      {trait.kind}
                    </Badge>
                  </td>

                  <td className="max-w-72 px-3 py-3">
                    <code className="block break-all font-mono text-[11px] leading-5">
                      {String(trait.value)}
                    </code>
                  </td>

                  <td className="px-3 py-3 text-right font-mono text-[11px] text-muted-foreground">
                    {trait.dependencyCount}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {changed ? (
                      <ChangedBadge />
                    ) : (
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
                        Stable
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CssVariablesPanel({
  traits,
  changedNames,
}: {
  traits: readonly PlaygroundResolvedTrait[];

  changedNames: ReadonlySet<string>;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-[#0c1018] text-[#e8ecf5]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Variable className="size-4 text-[#9ca8bd]" aria-hidden="true" />

          <p className="text-sm font-medium">CSS custom properties</p>
        </div>

        <Badge className="border border-white/10 bg-white/5 font-mono text-[10px] text-[#aeb8c9] hover:bg-white/5">
          {changedNames.size} changed
        </Badge>
      </div>

      <div className="max-h-152 overflow-auto p-4 font-mono text-[11px] leading-6">
        <div className="text-[#7f8aa0]">[data-playground-preview] {"{"}</div>

        {traits.map((trait) => {
          const changed = changedNames.has(trait.name);

          return (
            <div
              key={trait.name}
              className={cn(
                "-mx-2 flex min-w-max items-start gap-3 rounded-md px-2 transition-colors",
                changed && "bg-[#7c6cff]/15",
              )}
            >
              <span className="w-4 shrink-0 select-none text-right text-[#596377]">
                {changed ? "●" : ""}
              </span>

              <code>
                <span className="text-[#a89cff]">{trait.cssVariable}</span>

                <span className="text-[#7f8aa0]">: </span>

                <span
                  className={cn("text-[#d9dfeb]", changed && "text-[#ffffff]")}
                >
                  {String(trait.value)}
                </span>

                <span className="text-[#7f8aa0]">;</span>
              </code>
            </div>
          );
        })}

        <div className="text-[#7f8aa0]">{"}"}</div>
      </div>

      <div className="border-t border-white/10 bg-white/2.5 px-4 py-3">
        <p className="text-xs leading-5 text-[#8e99ad]">
          Only values changed by the latest mutation receive a highlighted line.
        </p>
      </div>
    </div>
  );
}

interface GraphNode {
  id: string;
  name: string;
  kind: "context" | "primitive" | "token";
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GraphEdge {
  id: string;
  source: GraphNode;
  target: GraphNode;
  active: boolean;
}

const GRAPH_NODE_HEIGHT = 40;

const GRAPH_ROW_GAP = 16;

function nodePosition(index: number): number {
  return 54 + index * (GRAPH_NODE_HEIGHT + GRAPH_ROW_GAP);
}

function edgePath(source: GraphNode, target: GraphNode): string {
  const sourceY = source.y + source.height / 2;

  const targetY = target.y + target.height / 2;

  if (source.kind === "token" && target.kind === "token") {
    const sourceX = source.x + source.width;

    const targetX = target.x + target.width;

    return [
      `M ${sourceX} ${sourceY}`,
      `C 925 ${sourceY},`,
      `925 ${targetY},`,
      `${targetX} ${targetY}`,
    ].join(" ");
  }

  const sourceX = source.x + source.width;

  const targetX = target.x;

  const middleX = (sourceX + targetX) / 2;

  return [
    `M ${sourceX} ${sourceY}`,
    `C ${middleX} ${sourceY},`,
    `${middleX} ${targetY},`,
    `${targetX} ${targetY}`,
  ].join(" ");
}

function DependencyGraph({
  preset,
  changedNames,
  activeContextKey,
}: {
  preset: PlaygroundPreset;

  changedNames: ReadonlySet<string>;

  activeContextKey: PlaygroundContextKey | null;
}) {
  const affectedTokens = useMemo(
    () => getAffectedTokenNames(preset, activeContextKey),
    [preset, activeContextKey],
  );

  const contextNodes = preset.enabledControls.map(
    (name, index): GraphNode => ({
      id: `context:${name}`,
      name,
      kind: "context",
      x: 20,
      y: nodePosition(index),
      width: 200,
      height: GRAPH_NODE_HEIGHT,
    }),
  );

  const primitiveNodes = preset.primitiveNames.map(
    (name, index): GraphNode => ({
      id: `primitive:${name}`,
      name,
      kind: "primitive",
      x: 300,
      y: nodePosition(index),
      width: 220,
      height: GRAPH_NODE_HEIGHT,
    }),
  );

  const tokenNodes = preset.tokens.map(
    (token, index): GraphNode => ({
      id: `token:${token.name}`,
      name: token.name,
      kind: "token",
      x: 620,
      y: nodePosition(index),
      width: 250,
      height: GRAPH_NODE_HEIGHT,
    }),
  );

  const contextMap = new Map(contextNodes.map((node) => [node.name, node]));

  const primitiveMap = new Map(primitiveNodes.map((node) => [node.name, node]));

  const tokenMap = new Map(tokenNodes.map((node) => [node.name, node]));

  const edges: GraphEdge[] = [];

  for (const token of preset.tokens) {
    const target = tokenMap.get(token.name);

    if (!target) {
      continue;
    }

    for (const contextKey of token.contextKeys) {
      const source = contextMap.get(contextKey);

      if (!source) {
        continue;
      }

      edges.push({
        id: `${source.id}->${target.id}`,
        source,
        target,
        active:
          contextKey === activeContextKey && affectedTokens.has(token.name),
      });
    }

    for (const dependency of token.dependencies) {
      const source = primitiveMap.get(dependency) ?? tokenMap.get(dependency);

      if (!source) {
        continue;
      }

      const sourceTokenActive =
        source.kind === "token" && affectedTokens.has(source.name);

      const targetActive = affectedTokens.has(token.name);

      edges.push({
        id: `${source.id}->${target.id}`,
        source,
        target,
        active:
          targetActive && (sourceTokenActive || changedNames.has(token.name)),
      });
    }
  }

  const largestNodeCount = Math.max(
    contextNodes.length,
    primitiveNodes.length,
    tokenNodes.length,
  );

  const graphHeight = Math.max(
    300,
    86 + largestNodeCount * (GRAPH_NODE_HEIGHT + GRAPH_ROW_GAP),
  );

  const allNodes = [...contextNodes, ...primitiveNodes, ...tokenNodes];

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <Network
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />

          <p className="text-sm font-medium">Dependency graph</p>
        </div>

        <div className="flex items-center gap-2">
          {activeContextKey ? (
            <Badge className="bg-primary/10 font-mono text-[10px] text-primary hover:bg-primary/10">
              {activeContextKey} path
            </Badge>
          ) : (
            <Badge variant="outline" className="font-mono text-[10px]">
              Awaiting mutation
            </Badge>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          role="img"
          aria-labelledby="playground-graph-title playground-graph-description"
          viewBox={`0 0 900 ${graphHeight}`}
          className="min-w-225"
          style={{
            width: "100%",
            height: `${graphHeight}px`,
          }}
        >
          <title id="playground-graph-title">
            {preset.title} dependency graph
          </title>

          <desc id="playground-graph-description">
            Context inputs and primitives connect to derived token nodes.
            Highlighted nodes and edges represent the relationship path affected
            by the latest controlled context mutation.
          </desc>

          <defs>
            <marker
              id="playground-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border)" />
            </marker>

            <marker
              id="playground-active-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary)" />
            </marker>
          </defs>

          <text
            x="20"
            y="27"
            fill="var(--muted-foreground)"
            fontFamily="var(--font-mono), monospace"
            fontSize="11"
            letterSpacing="1.4"
          >
            CONTEXT
          </text>

          <text
            x="300"
            y="27"
            fill="var(--muted-foreground)"
            fontFamily="var(--font-mono), monospace"
            fontSize="11"
            letterSpacing="1.4"
          >
            PRIMITIVES
          </text>

          <text
            x="620"
            y="27"
            fill="var(--muted-foreground)"
            fontFamily="var(--font-mono), monospace"
            fontSize="11"
            letterSpacing="1.4"
          >
            TOKENS
          </text>

          <g aria-hidden="true">
            {edges.map((edge) => (
              <path
                key={edge.id}
                d={edgePath(edge.source, edge.target)}
                fill="none"
                stroke={edge.active ? "var(--primary)" : "var(--border)"}
                strokeWidth={edge.active ? 2.25 : 1.25}
                strokeOpacity={edge.active ? 0.95 : 0.65}
                markerEnd={
                  edge.active
                    ? "url(#playground-active-arrow)"
                    : "url(#playground-arrow)"
                }
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          <g>
            {allNodes.map((node) => {
              const isActiveContext =
                node.kind === "context" && node.name === activeContextKey;

              const isAffectedToken =
                node.kind === "token" && affectedTokens.has(node.name);

              const isChanged = changedNames.has(node.name);

              const highlighted = isActiveContext || isAffectedToken;

              let detail: string = node.kind;

              if (isChanged) {
                detail = "token · changed";
              } else if (isAffectedToken) {
                detail = "token · affected";
              }

              return (
                <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
                  <rect
                    width={node.width}
                    height={node.height}
                    rx="9"
                    fill={
                      isChanged
                        ? "color-mix(in srgb, var(--primary) 16%, var(--background))"
                        : highlighted
                          ? "color-mix(in srgb, var(--primary) 8%, var(--background))"
                          : "var(--background)"
                    }
                    stroke={highlighted ? "var(--primary)" : "var(--border)"}
                    strokeWidth={highlighted ? 1.75 : 1}
                    vectorEffect="non-scaling-stroke"
                  />

                  <text
                    x="12"
                    y="17"
                    fill="var(--foreground)"
                    fontFamily="var(--font-mono), monospace"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {node.name}
                  </text>

                  <text
                    x="12"
                    y="31"
                    fill={
                      highlighted ? "var(--primary)" : "var(--muted-foreground)"
                    }
                    fontFamily="var(--font-mono), monospace"
                    fontSize="8.5"
                    letterSpacing="0.8"
                  >
                    {detail.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="border-t bg-muted/15 px-4 py-3">
        <p className="text-xs leading-5 text-muted-foreground">
          The graph uses the preset&apos;s declared presentation metadata.
          GenomeJS currently keeps its compiled runtime graph private.
        </p>
      </div>
    </div>
  );
}

function CompilerOutputReady({ genome }: { genome: Genome }) {
  const { preset, lastMutation } = usePlaygroundController();

  const traits = useResolvedTraits(genome, preset);

  const changedNames = useMemo(
    () => new Set(lastMutation?.changedTraitNames ?? []),
    [lastMutation],
  );

  return (
    <div className="min-w-0">
      <PlaygroundActions traits={traits} changedNames={changedNames} />

      <Tabs defaultValue="dna" className="min-w-0">
        <TabsList className="grid h-full w-full grid-cols-3 rounded-xl border bg-muted/30 p-1">
          <TabsTrigger value="dna" className="h-fit gap-1.5 px-2 text-[11px]">
            <Braces className="size-3.5" aria-hidden="true" />
            DNA
          </TabsTrigger>

          <TabsTrigger value="css" className="h-fit gap-1.5 px-2 text-[11px]">
            <Variable className="size-3.5" aria-hidden="true" />
            CSS
          </TabsTrigger>

          <TabsTrigger value="graph" className="h-fit gap-1.5 px-2 text-[11px]">
            <GitBranch className="size-3.5" aria-hidden="true" />
            Graph
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dna" className="mt-4">
          <ResolvedDnaPanel traits={traits} changedNames={changedNames} />
        </TabsContent>

        <TabsContent value="css" className="mt-4">
          <CssVariablesPanel traits={traits} changedNames={changedNames} />
        </TabsContent>

        <TabsContent value="graph" className="mt-4">
          <DependencyGraph
            preset={preset}
            changedNames={changedNames}
            activeContextKey={lastMutation?.contextKey ?? null}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PreparingCompilerOutput() {
  return (
    <div className="flex min-h-72 items-center justify-center rounded-xl border bg-background p-8">
      <div className="text-center">
        <CircleDot
          className="mx-auto size-5 animate-pulse text-primary"
          aria-hidden="true"
        />

        <p className="mt-4 text-sm font-medium">Compiling output</p>

        <p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">
          The selected preset is resolving its initial DNA and CSS custom
          properties.
        </p>
      </div>
    </div>
  );
}

export function PlaygroundCompilerOutput() {
  const { genome } = usePlaygroundController();

  if (!genome) {
    return <PreparingCompilerOutput />;
  }

  return <CompilerOutputReady genome={genome} />;
}
