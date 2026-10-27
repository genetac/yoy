export type Tier = "low" | "mid" | "high" | "enterprise";

export type ModuleId =
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J"
  | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V";

export type ServiceModule = {
  id: ModuleId;
  name: string;
  description: string;
};

export type Deliverable = {
  name: string;
  detail: string;
};

export type ServicePackage = {
  level: string;
  tier: Tier;
  priceRange: string;
  tagline: string;
  deliveryWeeks: string;
  modules: ServiceModule[];
  deliverables: Deliverable[];
  features: string[];
  color: string;
  badgeColor: string;
};

const M = {
  A: { id: "A" as ModuleId, name: "Project Intelligence", description: "Requirements gathering & spec generation" },
  B: { id: "B" as ModuleId, name: "Market Intelligence", description: "Competitor analysis & positioning research" },
  C: { id: "C" as ModuleId, name: "Product Strategy", description: "Feature prioritization & roadmap" },
  D: { id: "D" as ModuleId, name: "Design Intelligence", description: "Design system, UI, and UX" },
  E: { id: "E" as ModuleId, name: "Frontend Engineering", description: "Responsive, accessible interfaces" },
  F: { id: "F" as ModuleId, name: "Backend & Data", description: "APIs, database, business logic" },
  G: { id: "G" as ModuleId, name: "Auth & Permissions", description: "User accounts & access control" },
  H: { id: "H" as ModuleId, name: "E-commerce & Payments", description: "Checkout, carts, payment processing" },
  I: { id: "I" as ModuleId, name: "SaaS & Multitenancy", description: "Workspaces, subscriptions, entitlements" },
  J: { id: "J" as ModuleId, name: "AI & Automation", description: "LLM integrations, agents, workflow automation" },
  K: { id: "K" as ModuleId, name: "Integrations & Webhooks", description: "Third-party API connections, event pipelines" },
  L: { id: "L" as ModuleId, name: "Realtime & Collaboration", description: "Live presence, messaging, shared editing" },
  M: { id: "M" as ModuleId, name: "SEO & Discoverability", description: "Meta tags, sitemaps, structured data" },
  N: { id: "N" as ModuleId, name: "Conversion & Growth", description: "CTA optimization, analytics setup" },
  O: { id: "O" as ModuleId, name: "Performance Engineering", description: "Bundle optimization, image loading" },
  P: { id: "P" as ModuleId, name: "Accessibility", description: "WCAG 2.2 AA compliance" },
  Q: { id: "Q" as ModuleId, name: "Security & Privacy", description: "Input validation, secure headers, RLS" },
  R: { id: "R" as ModuleId, name: "Compliance & Audit", description: "SOC 2, GDPR, HIPAA, data retention" },
  S: { id: "S" as ModuleId, name: "Observability", description: "Logging, tracing, error tracking, uptime" },
  T: { id: "T" as ModuleId, name: "Testing & QA", description: "Unit, integration, and E2E tests" },
  U: { id: "U" as ModuleId, name: "Deployment & Delivery", description: "Build pipeline, environment config" },
  V: { id: "V" as ModuleId, name: "Documentation & Handoff", description: "Setup guides, architecture docs" },
};

export const lowTierPackage: ServicePackage = {
  level: "Starter",
  tier: "low",
  priceRange: "$3 – $79",
  tagline: "Essential web presence for businesses that need to be found online.",
  deliveryWeeks: "1 – 2 weeks",
  color: "amber",
  badgeColor: "bg-amber-500",
  modules: [M.A, M.D, M.E, M.M],
  deliverables: [
    { name: "1-page responsive website", detail: "Mobile-friendly single page with hero, services, and contact" },
    { name: "Contact form integration", detail: "Working form that sends inquiries to your email" },
    { name: "Basic SEO setup", detail: "Meta tags, page title, and Open Graph tags" },
    { name: "Deployment", detail: "Live on a free or shared hosting tier" },
  ],
  features: [
    "Single-page layout",
    "Mobile responsive",
    "Contact form",
    "Basic SEO meta tags",
    "1 round of revisions",
    "Free hosting setup",
  ],
};

export const midTierPackage: ServicePackage = {
  level: "Growth",
  tier: "mid",
  priceRange: "$79 – $299",
  tagline: "Multi-page site with polished design, CMS, and conversion basics.",
  deliveryWeeks: "2 – 4 weeks",
  color: "sky",
  badgeColor: "bg-sky-500",
  modules: [M.A, M.B, M.D, M.E, M.F, M.G, M.M, M.N, M.O, M.P, M.U],
  deliverables: [
    { name: "Multi-page website (3–7 pages)", detail: "Home, about, services, portfolio, and contact pages" },
    { name: "Custom design system", detail: "Color palette, typography, spacing, and reusable components" },
    { name: "CMS or content editing", detail: "Edit your own content through a dashboard or markdown files" },
    { name: "User accounts & login", detail: "Email/password authentication with protected pages" },
    { name: "Contact & lead forms", detail: "Forms with validation, spam protection, and email delivery" },
    { name: "SEO foundation", detail: "Sitemap, structured data, per-page meta, and social cards" },
    { name: "Analytics setup", detail: "Pageview and event tracking with conversion goals" },
    { name: "Performance pass", detail: "Image optimization, lazy loading, and bundle sizing" },
    { name: "Accessibility basics", detail: "Keyboard navigation, alt text, and contrast checks" },
    { name: "Deployment", detail: "Custom domain with SSL and CDN" },
  ],
  features: [
    "Multi-page layout (3–7 pages)",
    "Custom design system",
    "CMS or content editing",
    "User accounts & login",
    "Lead forms with validation",
    "SEO: sitemap, structured data, meta tags",
    "Analytics & conversion goals",
    "Image optimization & lazy loading",
    "Accessibility basics",
    "Custom domain + SSL + CDN",
    "2 rounds of revisions",
    "14-day post-launch support",
  ],
};

export const highTierPackage: ServicePackage = {
  level: "Professional",
  tier: "high",
  priceRange: "$299 – $5,000+",
  tagline: "Full-stack product build with backend, auth, payments, and growth infrastructure.",
  deliveryWeeks: "4 – 12 weeks",
  color: "emerald",
  badgeColor: "bg-emerald-500",
  modules: [M.A, M.B, M.C, M.D, M.E, M.F, M.G, M.H, M.I, M.M, M.N, M.O, M.P, M.Q, M.T, M.U, M.V],
  deliverables: [
    { name: "Multi-page application", detail: "Full site architecture with routing, nav, and dedicated pages" },
    { name: "Design system", detail: "Color tokens, typography scale, spacing, reusable components" },
    { name: "Backend & database", detail: "Typed API, schema, migrations, and row-level security" },
    { name: "Authentication system", detail: "Email/password login, sessions, role-based permissions" },
    { name: "Payment integration", detail: "Stripe checkout, subscription billing, webhook handling" },
    { name: "Admin dashboard", detail: "Manage users, content, orders, and site configuration" },
    { name: "Analytics & conversion", detail: "Event tracking, funnel analysis, CTA optimization" },
    { name: "Accessibility audit", detail: "WCAG 2.2 AA: keyboard nav, contrast, screen-reader testing" },
    { name: "Security hardening", detail: "Input validation, secure headers, RLS policies, audit logs" },
    { name: "Performance optimization", detail: "Code splitting, image optimization, LCP/CLS budgets" },
    { name: "Automated test suite", detail: "Unit, integration, and critical-path E2E tests" },
    { name: "Full documentation", detail: "Setup guide, API reference, architecture overview, deployment" },
  ],
  features: [
    "Multi-page architecture with routing",
    "Custom design system & component library",
    "Backend API with database & migrations",
    "User authentication & role permissions",
    "Stripe payment & subscription billing",
    "Admin dashboard for content & users",
    "Analytics, SEO, and conversion optimization",
    "Accessibility audit (WCAG 2.2 AA)",
    "Security hardening & RLS policies",
    "Automated test suite",
    "Performance budgets & optimization",
    "Full documentation & handoff guide",
    "3 rounds of revisions",
    "30-day post-launch support",
  ],
};

export const enterpriseTierPackage: ServicePackage = {
  level: "Enterprise",
  tier: "enterprise",
  priceRange: "$5,000 – $25,000+",
  tagline: "Bespoke platform with multi-tenancy, AI, realtime, compliance, and SLA-grade reliability.",
  deliveryWeeks: "8 – 24 weeks",
  color: "violet",
  badgeColor: "bg-violet-600",
  modules: Object.values(M),
  deliverables: [
    { name: "Full custom platform", detail: "Multi-tenant SaaS, marketplace, or enterprise system built from scratch" },
    { name: "Design system & component library", detail: "Tokenized, documented, versioned component library with Storybook" },
    { name: "Scalable backend architecture", detail: "Microservices or modular monolith with typed API and event bus" },
    { name: "Multi-tenant infrastructure", detail: "Workspaces, org-level permissions, usage metering, and billing" },
    { name: "AI & automation layer", detail: "LLM integrations, AI agents, and workflow automation pipelines" },
    { name: "Realtime collaboration", detail: "Live presence, messaging, shared editing, and notifications" },
    { name: "Third-party integrations", detail: "Webhooks, OAuth, CRM/ERP sync, and custom API connectors" },
    { name: "Compliance package", detail: "SOC 2 / GDPR / HIPAA controls, data retention, and audit trails" },
    { name: "Observability stack", detail: "Structured logging, distributed tracing, error tracking, and uptime monitoring" },
    { name: "Full test pyramid", detail: "Unit, integration, contract, load, and E2E tests with CI gates" },
    { name: "Infrastructure & deployment", detail: "IaC, blue-green deploys, preview environments, and runbooks" },
    { name: "Enterprise documentation", detail: "Architecture decision records, API docs, onboarding, and runbooks" },
  ],
  features: [
    "Custom multi-tenant platform architecture",
    "Versioned design system with Storybook",
    "Scalable backend: microservices or modular monolith",
    "Multi-tenancy: workspaces, permissions, usage metering",
    "AI & automation: LLM agents and workflow pipelines",
    "Realtime: presence, messaging, shared editing",
    "Third-party integrations & webhook pipelines",
    "Compliance: SOC 2 / GDPR / HIPAA controls",
    "Observability: logging, tracing, error tracking, uptime",
    "Full test pyramid with CI gates",
    "Infrastructure-as-Code with blue-green deploys",
    "Preview environments & deployment runbooks",
    "Enterprise documentation & ADRs",
    "Dedicated technical lead",
    "Weekly progress reviews",
    "90-day post-launch SLA support",
  ],
};

export function getPackage(tier: Tier): ServicePackage {
  switch (tier) {
    case "enterprise":
      return enterpriseTierPackage;
    case "high":
      return highTierPackage;
    case "mid":
      return midTierPackage;
    default:
      return lowTierPackage;
  }
}

export const allModules: ServiceModule[] = Object.values(M);

export const tierOrder: Tier[] = ["low", "mid", "high", "enterprise"];

export const tierDisplay: Record<Tier, { label: string; short: string; color: string; badgeColor: string; priceRange: string }> = {
  low: { label: "Starter", short: "LOW", color: "amber", badgeColor: "bg-amber-500", priceRange: "$3 – $79" },
  mid: { label: "Growth", short: "MID", color: "sky", badgeColor: "bg-sky-500", priceRange: "$79 – $299" },
  high: { label: "Professional", short: "HIGH", color: "emerald", badgeColor: "bg-emerald-500", priceRange: "$299 – $5,000+" },
  enterprise: { label: "Enterprise", short: "ENTERPRISE", color: "violet", badgeColor: "bg-violet-600", priceRange: "$5,000 – $25,000+" },
};

export const productTiers = [
  {
    letter: "A",
    name: "Microproducts",
    price: "$3 – $19",
    examples: "Landing templates, calculators, resume kits, checklists",
    color: "text-amber-600 bg-amber-50",
    tier: "low" as Tier,
  },
  {
    letter: "B",
    name: "Practical Digital Products",
    price: "$19 – $79",
    examples: "Template packs, toolkits, Notion systems, assessment tools",
    color: "text-amber-600 bg-amber-50",
    tier: "low" as Tier,
  },
  {
    letter: "C",
    name: "Premium Digital Products",
    price: "$79 – $299",
    examples: "Niche website kits, dashboards, design systems, training products",
    color: "text-sky-600 bg-sky-50",
    tier: "mid" as Tier,
  },
  {
    letter: "D",
    name: "Professional Tools",
    price: "$299 – $1,500+",
    examples: "Appointment systems, client portals, inventory dashboards, CRM packages",
    color: "text-emerald-600 bg-emerald-50",
    tier: "high" as Tier,
  },
  {
    letter: "E",
    name: "Subscription Products",
    price: "$9 – $199/mo",
    examples: "SaaS tools, monitoring dashboards, booking systems, research platforms",
    color: "text-emerald-600 bg-emerald-50",
    tier: "high" as Tier,
  },
  {
    letter: "F",
    name: "Premium & Enterprise",
    price: "$1,500 – $25,000+",
    examples: "Custom SaaS platforms, marketplaces, multi-tenant apps, enterprise systems",
    color: "text-violet-600 bg-violet-50",
    tier: "enterprise" as Tier,
  },
] as const;
