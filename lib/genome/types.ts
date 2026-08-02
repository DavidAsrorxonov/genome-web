export type SiteMode = "light" | "dark";
export type SiteContrast = "standard" | "high";
export type SiteDensity = "comfortable" | "compact";

export interface SiteGenomeContext {
  mode: SiteMode;
  contrast: SiteContrast;
  density: SiteDensity;
  radiusScale: number;
  spacingScale: number;
}
