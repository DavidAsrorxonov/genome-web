"use client";

import type { Genome } from "@genomejs/core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
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

const GenomeContext = createContext<GenomeContextValue | null>(null);

export function GenomeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();

  const genomeRef = useRef<Genome | null>(null);

  const [genome, setGenome] = useState<Genome | null>(null);

  const [context, setContext] = useState<SiteGenomeContext>(initialSiteContext);

  const applyPatch = useCallback((patch: Partial<SiteGenomeContext>) => {
    genomeRef.current?.mutate({
      ...patch,
    });

    setContext((current) => ({
      ...current,
      ...patch,
    }));
  }, []);

  useEffect(() => {
    const mode: SiteMode = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

    const initialContext: SiteGenomeContext = {
      ...initialSiteContext,
      mode,
    };

    const liveGenome = createSiteGenome(
      document.documentElement,
      initialContext,
    );

    genomeRef.current = liveGenome;
    setGenome(liveGenome);
    setContext(initialContext);

    return () => {
      genomeRef.current = null;
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
