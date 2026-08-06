"use client";

import type { Genome } from "@genomejs/core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { useTheme } from "next-themes";

import { initialSiteContext } from "@/lib/genome/initial-context";
import { createSiteGenome } from "@/lib/genome/site-genome";
import type {
  SiteContrast,
  SiteDensity,
  SiteGenomeContext,
  SiteMode,
} from "@/lib/genome/types";

type GenomeContextValue = {
  genome: Genome | null;
  context: SiteGenomeContext;
  setMode: (mode: SiteMode) => void;
  setContrast: (contrast: SiteContrast) => void;
  setDensity: (density: SiteDensity) => void;
  setRadiusScale: (value: number) => void;
  setSpacingScale: (value: number) => void;
};

type GenomeSnapshot = {
  genome: Genome | null;
  context: SiteGenomeContext;
};

const GenomeContext = createContext<GenomeContextValue | null>(null);

const initialGenomeSnapshot: GenomeSnapshot = {
  genome: null,
  context: initialSiteContext,
};

function createGenomeStore() {
  let snapshot = initialGenomeSnapshot;

  const listeners = new Set<() => void>();

  function emit(): void {
    for (const listener of listeners) {
      listener();
    }
  }

  return {
    subscribe(listener: () => void): () => void {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },

    getSnapshot(): GenomeSnapshot {
      return snapshot;
    },

    initialize(target: HTMLElement, context: SiteGenomeContext): Genome {
      const genome = createSiteGenome(target, context);

      snapshot = {
        genome,
        context,
      };

      emit();

      return genome;
    },

    clear(genome: Genome): void {
      if (snapshot.genome !== genome) {
        return;
      }

      snapshot = {
        ...snapshot,
        genome: null,
      };

      emit();
    },

    applyPatch(patch: Partial<SiteGenomeContext>): void {
      snapshot.genome?.mutate({
        ...patch,
      });

      snapshot = {
        ...snapshot,
        context: {
          ...snapshot.context,
          ...patch,
        },
      };

      emit();
    },
  };
}

const genomeStore = createGenomeStore();

export function GenomeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();

  const { genome, context } = useSyncExternalStore(
    genomeStore.subscribe,
    genomeStore.getSnapshot,
    genomeStore.getSnapshot,
  );

  const applyPatch = useCallback((patch: Partial<SiteGenomeContext>) => {
    genomeStore.applyPatch(patch);
  }, []);

  useEffect(() => {
    const mode: SiteMode = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

    const initialContext: SiteGenomeContext = {
      ...initialSiteContext,
      mode,
    };

    const liveGenome = genomeStore.initialize(
      document.documentElement,
      initialContext,
    );

    return () => {
      genomeStore.clear(liveGenome);
    };
  }, []);

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") {
      return;
    }

    applyPatch({
      mode: resolvedTheme,
    });
  }, [resolvedTheme, applyPatch]);

  const setMode = useCallback(
    (mode: SiteMode) => {
      setTheme(mode);
      applyPatch({ mode });
    },
    [setTheme, applyPatch],
  );

  const setContrast = useCallback(
    (contrast: SiteContrast) => {
      applyPatch({ contrast });
    },
    [applyPatch],
  );

  const setDensity = useCallback(
    (density: SiteDensity) => {
      applyPatch({ density });
    },
    [applyPatch],
  );

  const setRadiusScale = useCallback(
    (radiusScale: number) => {
      applyPatch({ radiusScale });
    },
    [applyPatch],
  );

  const setSpacingScale = useCallback(
    (spacingScale: number) => {
      applyPatch({ spacingScale });
    },
    [applyPatch],
  );

  const value = useMemo(
    () => ({
      genome,
      context,
      setMode,
      setContrast,
      setDensity,
      setRadiusScale,
      setSpacingScale,
    }),
    [
      genome,
      context,
      setMode,
      setContrast,
      setDensity,
      setRadiusScale,
      setSpacingScale,
    ],
  );

  return (
    <GenomeContext.Provider value={value}>{children}</GenomeContext.Provider>
  );
}

export function useSiteGenome(): GenomeContextValue {
  const value = useContext(GenomeContext);

  if (!value) {
    throw new Error("useSiteGenome must be used inside GenomeProvider.");
  }

  return value;
}
