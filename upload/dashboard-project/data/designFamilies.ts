export type DesignFamilyId =
  | "micro"
  | "industry-warm"
  | "saas-product"
  | "data-dense"
  | "enterprise-platform";

export type TypeScale = {
  display: string;
  h1: string;
  h2: string;
  h3: string;
  body: string;
  small: string;
  caption: string;
};

export type FamilyTokens = {
  id: DesignFamilyId;
  label: string;
  recipe: string;
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  radius: { sm: number; md: number; lg: number };
  spacing: { section: number; card: number; inline: number };
  shadows: string;
  textTransformLabels: "uppercase" | "none";
  letterSpacingLabels: string;
  sectionStyle: "boxed" | "full-bleed" | "editorial" | "paneled";
};

export const familyTokens: Record<DesignFamilyId, FamilyTokens> = {
  micro: {
    id: "micro",
    label: "Micro Product",
    recipe: "Pentagram + Raycast",
    fontDisplay: "'Inter Tight', 'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', 'SF Mono', monospace",
    radius: { sm: 4, md: 8, lg: 12 },
    spacing: { section: 32, card: 16, inline: 8 },
    shadows: "0 1px 3px rgba(0,0,0,0.06)",
    textTransformLabels: "uppercase",
    letterSpacingLabels: "0.1em",
    sectionStyle: "boxed",
  },
  "industry-warm": {
    id: "industry-warm",
    label: "Industry / Hospitality",
    recipe: "Aesop + Stripe Press",
    fontDisplay: "'Cormorant Garamond', 'Georgia', serif",
    fontBody: "'Cormorant Garamond', 'Georgia', serif",
    fontMono: "'Inter', sans-serif",
    radius: { sm: 0, md: 0, lg: 0 },
    spacing: { section: 40, card: 20, inline: 12 },
    shadows: "0 24px 48px rgba(0,0,0,0.12)",
    textTransformLabels: "uppercase",
    letterSpacingLabels: "0.12em",
    sectionStyle: "editorial",
  },
  "saas-product": {
    id: "saas-product",
    label: "SaaS Product",
    recipe: "Linear",
    fontDisplay: "'Inter Tight', 'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    radius: { sm: 6, md: 12, lg: 16 },
    spacing: { section: 28, card: 14, inline: 8 },
    shadows: "0 1px 2px rgba(0,0,0,0.3)",
    textTransformLabels: "none",
    letterSpacingLabels: "0",
    sectionStyle: "full-bleed",
  },
  "data-dense": {
    id: "data-dense",
    label: "Data Dashboard",
    recipe: "Bloomberg Terminal",
    fontDisplay: "'JetBrains Mono', 'IBM Plex Mono', monospace",
    fontBody: "'JetBrains Mono', 'IBM Plex Mono', monospace",
    fontMono: "'JetBrains Mono', monospace",
    radius: { sm: 0, md: 2, lg: 2 },
    spacing: { section: 16, card: 8, inline: 4 },
    shadows: "none",
    textTransformLabels: "uppercase",
    letterSpacingLabels: "0.05em",
    sectionStyle: "paneled",
  },
  "enterprise-platform": {
    id: "enterprise-platform",
    label: "Enterprise Platform",
    recipe: "Bloomberg Terminal + Linear",
    fontDisplay: "'Inter Tight', 'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    radius: { sm: 4, md: 8, lg: 12 },
    spacing: { section: 20, card: 12, inline: 6 },
    shadows: "0 1px 3px rgba(0,0,0,0.2)",
    textTransformLabels: "none",
    letterSpacingLabels: "0",
    sectionStyle: "paneled",
  },
};

const productTypeFamilyMap: Record<string, DesignFamilyId> = {
  "landing-template": "micro",
  calculator: "micro",
  "resume-kit": "micro",
  checklist: "micro",
  "template-pack": "micro",
  toolkit: "micro",
  "notion-system": "micro",
  "assessment-tool": "micro",
  "website-kit": "industry-warm",
  dashboard: "data-dense",
  "design-system": "data-dense",
  "training-product": "data-dense",
  "appointment-system": "saas-product",
  "client-portal": "saas-product",
  "inventory-dashboard": "data-dense",
  "crm-package": "saas-product",
  "saas-tool": "saas-product",
  "monitoring-dashboard": "data-dense",
  "booking-system": "saas-product",
  "research-platform": "saas-product",
  "custom-saas": "enterprise-platform",
  marketplace: "enterprise-platform",
  "multi-tenant-app": "enterprise-platform",
  "enterprise-system": "enterprise-platform",
};

export function getFamilyForProductType(productTypeId: string): DesignFamilyId {
  return productTypeFamilyMap[productTypeId] ?? "micro";
}
