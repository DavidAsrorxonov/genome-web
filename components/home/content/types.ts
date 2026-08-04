import type { ComponentType, SVGProps } from "react";

export type Capability = {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  featured?: boolean;
};

export type FrameworkId = "core" | "react" | "vue" | "svelte";

export type Framework = {
  id: FrameworkId;
  name: string;
  packageName: string;
  description: string;
  installation: string;
  code: string;
  docsUrl: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  note?: string;
};

export type StageId = "declare" | "discover" | "resolve" | "express";

export type Stage = {
  id: StageId;
  number: string;
  title: string;
  summary: string;
  description: string;
  icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  code: string[];
  label: string;
};

export type Safeguard = {
  title: string;
  description: string;
  example: string[];
  icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
};
