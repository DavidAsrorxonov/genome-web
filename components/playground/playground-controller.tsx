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

import {
  createPlaygroundRelativeUrl,
  parsePlaygroundSearchParams,
} from "@/lib/playground/url-state";

import type { PlaygroundUrlState } from "@/lib/playground/url-state";

import type {
  PlaygroundContext,
  PlaygroundContextKey,
  PlaygroundPreset,
  PlaygroundPresetId,
} from "@/lib/playground/types";
import { trackAnalyticsEvent } from "@/lib/analytics";

export type PlaygroundMutationSource = "control" | "reset" | "url";

export interface PlaygroundMutation {
  sequence: number;

  source: PlaygroundMutationSource;

  contextKey: PlaygroundContextKey | null;

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

  resetPreset: () => void;
}

const PlaygroundControllerContext =
  createContext<PlaygroundControllerValue | null>(null);

interface PlaygroundControllerProviderProps {
  children: React.ReactNode;

  initialState: PlaygroundUrlState;
}

function writeBrowserUrl(
  state: PlaygroundUrlState,
  mode: "push" | "replace",
): void {
  if (typeof window === "undefined") {
    return;
  }

  const relativeUrl = createPlaygroundRelativeUrl(
    state,
    window.location.pathname,
  );

  const nextUrl = `${relativeUrl}${window.location.hash}`;

  if (mode === "push") {
    window.history.pushState(null, "", nextUrl);

    return;
  }

  window.history.replaceState(null, "", nextUrl);
}

export function PlaygroundControllerProvider({
  children,
  initialState,
}: PlaygroundControllerProviderProps) {
  const [presetId, setPresetId] = useState<PlaygroundPresetId>(
    initialState.presetId,
  );

  const preset = useMemo(() => getPlaygroundPreset(presetId), [presetId]);

  const [context, setContext] = useState<PlaygroundContext>(() =>
    clonePlaygroundContext(initialState.context),
  );

  const [genome, setGenome] = useState<Genome | null>(null);

  const [lastMutation, setLastMutation] = useState<PlaygroundMutation | null>(
    null,
  );

  const previewTargetRef = useRef<HTMLDivElement | null>(null);

  const runtimeGenomeRef = useRef<Genome | null>(null);

  const mutationSequenceRef = useRef(0);

  const presetIdRef = useRef(presetId);

  const presetRef = useRef(preset);

  const contextRef = useRef(context);

  function commitRefs(
    nextPresetId: PlaygroundPresetId,

    nextPreset: PlaygroundPreset,

    nextContext: PlaygroundContext,
  ): void {
    presetIdRef.current = nextPresetId;

    presetRef.current = nextPreset;

    contextRef.current = nextContext;
  }

  function commitContextRef(nextContext: PlaygroundContext): void {
    contextRef.current = nextContext;
  }

  function recordMutation(
    source: PlaygroundMutationSource,

    contextKey: PlaygroundContextKey | null,

    changedTraitNames: readonly string[],
  ): void {
    mutationSequenceRef.current += 1;

    setLastMutation({
      sequence: mutationSequenceRef.current,

      source,
      contextKey,
      changedTraitNames,
    });
  }

  function mutateActiveGenome(nextContext: PlaygroundContext): string[] {
    const activeGenome = runtimeGenomeRef.current;

    if (!activeGenome) {
      return [];
    }

    const activePreset = presetRef.current;

    const before = readPlaygroundValues(activeGenome, activePreset);

    activeGenome.mutate(nextContext);

    const after = readPlaygroundValues(activeGenome, activePreset);

    return diffPlaygroundValues(before, after);
  }

  useEffect(() => {
    const target = previewTargetRef.current;

    if (!target) {
      return;
    }

    const runtime = createPlaygroundRuntime(preset, target);

    /*
     * The selected state may have
     * come from the URL rather than
     * the preset defaults.
     */
    runtime.genome.mutate(contextRef.current);

    runtimeGenomeRef.current = runtime.genome;

    setGenome(runtime.genome);

    return () => {
      clearPlaygroundTarget(target, preset);

      if (runtimeGenomeRef.current === runtime.genome) {
        runtimeGenomeRef.current = null;
      }
    };
  }, [preset]);

  useEffect(() => {
    function handlePopState() {
      const nextState = parsePlaygroundSearchParams(
        new URLSearchParams(window.location.search),
      );

      const nextPreset = getPlaygroundPreset(nextState.presetId);

      if (nextState.presetId !== presetIdRef.current) {
        commitRefs(nextState.presetId, nextPreset, nextState.context);

        setGenome(null);
        setLastMutation(null);

        setContext(clonePlaygroundContext(nextState.context));

        setPresetId(nextState.presetId);

        return;
      }

      const changedTraitNames = mutateActiveGenome(nextState.context);

      commitContextRef(nextState.context);

      setContext(clonePlaygroundContext(nextState.context));

      recordMutation("url", null, changedTraitNames);
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function selectPreset(nextPresetId: PlaygroundPresetId): void {
    if (nextPresetId === presetIdRef.current) {
      return;
    }

    const nextPreset = getPlaygroundPreset(nextPresetId);

    const nextContext = clonePlaygroundContext(nextPreset.initialContext);

    commitRefs(nextPreset.id, nextPreset, nextContext);

    setGenome(null);
    setLastMutation(null);

    setContext(nextContext);

    setPresetId(nextPreset.id);

    writeBrowserUrl(
      {
        presetId: nextPreset.id,

        context: nextContext,
      },
      "push",
    );

    trackAnalyticsEvent("Playground Preset Selected", {
      preset: nextPreset.id,
    });
  }

  function updateContext<Key extends PlaygroundContextKey>(
    key: Key,
    value: PlaygroundContext[Key],
  ): void {
    if (Object.is(contextRef.current[key], value)) {
      return;
    }

    const nextContext = {
      ...contextRef.current,
      [key]: value,
    };

    const changedTraitNames = mutateActiveGenome(nextContext);

    commitContextRef(nextContext);

    setContext(nextContext);

    recordMutation("control", key, changedTraitNames);

    writeBrowserUrl(
      {
        presetId: presetIdRef.current,

        context: nextContext,
      },
      "replace",
    );
  }

  function resetPreset(): void {
    const nextContext = clonePlaygroundContext(
      presetRef.current.initialContext,
    );

    const changedTraitNames = mutateActiveGenome(nextContext);

    commitContextRef(nextContext);

    setContext(nextContext);

    recordMutation("reset", null, changedTraitNames);

    writeBrowserUrl(
      {
        presetId: presetIdRef.current,

        context: nextContext,
      },
      "replace",
    );
  }

  const value: PlaygroundControllerValue = {
    preset,
    presetId,
    context,
    genome,
    runtimeReady: genome !== null,
    lastMutation,
    previewTargetRef,
    selectPreset,
    updateContext,
    resetPreset,
  };

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
