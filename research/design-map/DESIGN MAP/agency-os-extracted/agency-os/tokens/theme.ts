// ============================================================
// OMNIFORGE OS — Theme Contract
// One Theme object drives every family's personality without
// touching component code. Swap this at runtime.
// ============================================================

export type Radius = "none" | "small" | "medium" | "large";
export type Motion = "minimal" | "standard" | "cinematic";
export type Density = "airy" | "balanced" | "dense";

export interface Theme {
  color: Record<string, string>;
  typography: Record<string, string>;
  spacing: Record<string, string>;
  radius: Radius;
  motion: Motion;
  density: Density;
}

// ---- 6 family defaults ------------------------------------------

export const familyThemes: Record<string, Theme> = {
  "micro-products": {
    color: { bg: "#0a0a0a", fg: "#f5f1e8", accent: "#d4ff3a", accent2: "#ff4d1a" },
    typography: { display: "Anton", body: "DM Sans", mono: "JetBrains Mono" },
    spacing: { section: "5rem", card: "1rem", grid: "1.5rem" },
    radius: "small",
    motion: "standard",
    density: "balanced",
  },

  "industry-hospitality": {
    color: { bg: "#0d0a08", fg: "#ede4d3", accent: "#c8954a", accent2: "#8b1e1e", muted: "#6b5f4f" },
    typography: { display: "Anton", serif: "Playfair Display", body: "DM Sans", mono: "JetBrains Mono" },
    spacing: { section: "8rem", card: "1.5rem", grid: "1.5rem" },
    radius: "none",
    motion: "minimal",
    density: "airy",
  },

  "data-dashboards": {
    color: { bg: "#0c0e10", fg: "#e8eaed", accent: "#22c55e", danger: "#ef4444", warn: "#eab308" },
    typography: { display: "Space Grotesk", body: "Inter", mono: "JetBrains Mono" },
    spacing: { section: "3rem", card: "0.75rem", grid: "0.75rem" },
    radius: "none",
    motion: "minimal",
    density: "dense",
  },

  "saas-products": {
    color: { bg: "#0a0a0f", fg: "#f0f0f5", accent: "#6366f1", accent2: "#a855f7" },
    typography: { display: "Space Grotesk", body: "Inter" },
    spacing: { section: "6rem", card: "1.25rem", grid: "1.5rem" },
    radius: "medium",
    motion: "standard",
    density: "balanced",
  },

  "enterprise-platforms": {
    color: { bg: "#0f1114", fg: "#e5e7eb", accent: "#0891b2", muted: "#6b7280" },
    typography: { display: "Inter", body: "Inter", mono: "JetBrains Mono" },
    spacing: { section: "4rem", card: "1rem", grid: "1rem" },
    radius: "small",
    motion: "minimal",
    density: "dense",
  },

  "consumer-goods": {
    color: { bg: "#faf7f2", fg: "#2b1d14", accent: "#b87333", surface: "#ffffff", muted: "#8a7a68" },
    typography: { display: "Fraunces", body: "DM Sans", mono: "JetBrains Mono" },
    spacing: { section: "6rem", card: "1.25rem", grid: "1.5rem" },
    radius: "medium",
    motion: "standard",
    density: "airy",
  },
};

// ---- CSS variable injection -------------------------------------

export function themeToCssVars(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [k, v] of Object.entries(theme.color)) vars[`--c-${k}`] = v;
  for (const [k, v] of Object.entries(theme.typography)) vars[`--font-${k}`] = `'${v}', sans-serif`;
  for (const [k, v] of Object.entries(theme.spacing)) vars[`--sp-${k}`] = v;
  const radiusMap = { none: "0px", small: "4px", medium: "12px", large: "24px" };
  vars["--radius"] = radiusMap[theme.radius];
  const motionMap = { minimal: "0.15s", standard: "0.3s", cinematic: "0.7s" };
  vars["--motion-duration"] = motionMap[theme.motion];
  const densityMap = { airy: "1.6", balanced: "1.5", dense: "1.35" };
  vars["--line-height"] = densityMap[theme.density];
  return vars;
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(themeToCssVars(theme))) {
    root.style.setProperty(k, v);
  }
}

// ---- Usage -------------------------------------------------------
// import { familyThemes, applyTheme } from "@/tokens/theme";
// applyTheme(familyThemes["industry-hospitality"]);
