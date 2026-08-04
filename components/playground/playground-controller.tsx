"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Genome } from "@genomejs/core";
import {
  DEFAULT_PLAYGROUND_PRESET_ID,
  clonePlaygroundContext,
  getPlaygroundPreset,
} from "@/lib/playground/presets";
import {
  diffPlaygroundValues,
  readPlaygroundValues,
} from "@/lib/playground/compiler-output";
import {
  clearPlaygroundTarget,
  createPlaygroundRuntime,
} from "@/lib/playground/runtime";
import type {
  PlaygroundContext,
  PlaygroundContextKey,
  PlaygroundPreset,
  PlaygroundPresetId,
} from "@/lib/playground/types";

export interface PlaygroundMutation {
  sequence: number;

  contextKey: PlaygroundContextKey;

  changedTraitNames: readonly string[];
}

interface PlaygroundControllerValue {
  preset: PlaygroundPreset;

  presetId: PlaygroundPresetId;

  context: PlaygroundContext;

  genome: Genome | null;

  runtimeReady: boolean;

  lastMutation: PlaygroundMutation | null;

  previewTargetRef: React.RefObject<HTMLDivElement | null>;

  selectPreset: (presetId: PlaygroundPresetId) => void;

  updateContext: <Key extends PlaygroundContextKey>(
    key: Key,
    value: PlaygroundContext[Key],
  ) => void;
}

const PlaygroundControllerContext =
  createContext<PlaygroundControllerValue | null>(null);

interface PlaygroundControllerProviderProps {
  children: React.ReactNode;
}

export function PlaygroundControllerProvider({
  children,
}: PlaygroundControllerProviderProps) {
  const [presetId, setPresetId] = useState<PlaygroundPresetId>(
    DEFAULT_PLAYGROUND_PRESET_ID,
  );

  const preset = useMemo(() => getPlaygroundPreset(presetId), [presetId]);

  const [context, setContext] = useState<PlaygroundContext>(() =>
    clonePlaygroundContext(
      getPlaygroundPreset(DEFAULT_PLAYGROUND_PRESET_ID).initialContext,
    ),
  );

  const [genome, setGenome] = useState<Genome | null>(null);

  const [lastMutation, setLastMutation] = useState<PlaygroundMutation | null>(
    null,
  );

  const previewTargetRef = useRef<HTMLDivElement | null>(null);

  const runtimeGenomeRef = useRef<Genome | null>(null);

  const mutationSequenceRef = useRef(0);

  useEffect(() => {
    const target = previewTargetRef.current;

    if (!target) {
      return;
    }

    const runtime = createPlaygroundRuntime(preset, target);

    runtimeGenomeRef.current = runtime.genome;

    setGenome(runtime.genome);

    return () => {
      clearPlaygroundTarget(target, preset);

      if (runtimeGenomeRef.current === runtime.genome) {
        runtimeGenomeRef.current = null;
      }
    };
  }, [preset]);

  function selectPreset(nextPresetId: PlaygroundPresetId): void {
    if (nextPresetId === presetId) {
      return;
    }

    const nextPreset = getPlaygroundPreset(nextPresetId);

    setGenome(null);
    setLastMutation(null);

    setContext(clonePlaygroundContext(nextPreset.initialContext));

    setPresetId(nextPreset.id);
  }

  function updateContext<Key extends PlaygroundContextKey>(
    key: Key,
    value: PlaygroundContext[Key],
  ): void {
    const activeGenome = runtimeGenomeRef.current;

    let changedTraitNames: string[] = [];

    if (activeGenome) {
      const before = readPlaygroundValues(activeGenome, preset);

      activeGenome.mutate({
        [key]: value,
      });

      const after = readPlaygroundValues(activeGenome, preset);

      changedTraitNames = diffPlaygroundValues(before, after);
    }

    setContext((currentContext) => ({
      ...currentContext,
      [key]: value,
    }));

    mutationSequenceRef.current += 1;

    setLastMutation({
      sequence: mutationSequenceRef.current,

      contextKey: key,

      changedTraitNames,
    });
  }

  const value = useMemo<PlaygroundControllerValue>(
    () => ({
      preset,
      presetId,
      context,
      genome,
      runtimeReady: genome !== null,
      lastMutation,
      previewTargetRef,
      selectPreset,
      updateContext,
    }),
    [preset, presetId, context, genome, lastMutation],
  );

  return (
    <PlaygroundControllerContext.Provider value={value}>
      {children}
    </PlaygroundControllerContext.Provider>
  );
}

export function usePlaygroundController(): PlaygroundControllerValue {
  const controller = useContext(PlaygroundControllerContext);

  if (!controller) {
    throw new Error(
      "usePlaygroundController must be used inside PlaygroundControllerProvider.",
    );
  }

  return controller;
}
