import { useState } from "react";
import {
  X,
  Eye,
  Package,
  GitCompare,
  Check,
  Clock,
  DollarSign,
  Layers,
  FileText,
  ArrowRight,
} from "lucide-react";
import type { MockupConfig } from "@/data/businessTypes";
import type { ProductExample } from "@/data/exampleProducts";
import { FamilyPreview } from "./FamilyPreview";
import { MockupRenderer } from "./MockupRenderer";
import {
  getPackage,
  lowTierPackage,
  midTierPackage,
  highTierPackage,
  enterpriseTierPackage,
  tierDisplay,
  type Tier,
} from "@/data/servicePackages";

type Props = {
  config: MockupConfig;
  businessName: string;
  onClose: () => void;
  example?: ProductExample;
};

type Tab = "preview" | "services" | "comparison";

const tierAccent: Record<Tier, { text: string; bg: string; border: string }> = {
  low: { text: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800" },
  mid: { text: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-950/30", border: "border-sky-200 dark:border-sky-800" },
  high: { text: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800" },
  enterprise: { text: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-200 dark:border-violet-800" },
};

export function BrowserFrame({ config, businessName, onClose, example }: Props) {
  const [tab, setTab] = useState<Tab>("preview");
  const pkg = getPackage(config.tier);
  const td = tierDisplay[config.tier];
  const url = `${config.label.toLowerCase().replace(/[^a-z]/g, "")}.com`;

  const tabs: { id: Tab; label: string; icon: typeof Eye }[] = [
    { id: "preview", label: "Live Preview", icon: Eye },
    { id: "services", label: "What's Included", icon: Package },
    { id: "comparison", label: "Compare Tiers", icon: GitCompare },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-[fadeIn_0.2s_ease]">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[96vh] flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-700">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 shrink-0">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-2 sm:mx-3 min-w-0">
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-700 rounded-md px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-300 truncate">
              <span className="text-green-600 text-[10px] shrink-0">🔒</span>
              <span className="font-mono truncate">https://{url}</span>
            </div>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white ${td.badgeColor} shrink-0`}>
            {td.short}
          </div>
          <button
            onClick={onClose}
            className="ml-1 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-300 transition-colors shrink-0"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info bar */}
        <div className="px-4 sm:px-5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="min-w-0">
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{businessName}</span>
            <span className="mx-2 text-zinc-300 dark:text-zinc-600">|</span>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{config.label}</span>
          </div>
          <div className="flex items-center gap-3 text-xs shrink-0">
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <DollarSign className="w-3.5 h-3.5" />
              {pkg.priceRange}
            </span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <Clock className="w-3.5 h-3.5" />
              {pkg.deliveryWeeks}
            </span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 px-4 sm:px-5 py-2 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div className="overflow-y-auto flex-1 bg-zinc-50 dark:bg-zinc-950">
          {tab === "preview" && (
            <div className="bg-white">
              {example ? (
                <>
                  <TemplateBrief example={example} businessName={businessName} />
                  <FamilyPreview example={example} />
                </>
              ) : (
                <MockupRendererFallback config={config} />
              )}
            </div>
          )}
          {tab === "services" && <ServicesTab config={config} />}
          {tab === "comparison" && <ComparisonTab />}
        </div>
      </div>
    </div>
  );
}

function TemplateBrief({ example, businessName }: { example: ProductExample; businessName: string }) {
  return (
    <section className="border-b border-zinc-200 bg-zinc-950 px-5 py-5 text-white sm:px-8 sm:py-6" aria-label="Template overview">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            <span className="rounded-full bg-white/10 px-2 py-1">{configLabel(example.tier)} template</span>
            <span className="text-zinc-600">/</span>
            <span>{businessName}</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{example.exampleName}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-300">{example.exampleDescription}</p>
        </div>
        <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
          {example.features.map((feature) => (
            <span key={feature} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function configLabel(tier: Tier) {
  return tierDisplay[tier].label;
}

function MockupRendererFallback({ config }: { config: MockupConfig }) {
  return <MockupRenderer config={config} />;
}

function ServicesTab({ config }: { config: MockupConfig }) {
  const pkg = getPackage(config.tier);
  const a = tierAccent[config.tier];

  return (
    <div className="p-5 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Package header */}
      <div className={`rounded-2xl border ${a.border} ${a.bg} p-5 sm:p-6`}>
        <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider ${a.text} mb-1`}>{pkg.level} Package</div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{pkg.tagline}</h3>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${a.text}`}>{pkg.priceRange}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Delivery: {pkg.deliveryWeeks}</div>
          </div>
        </div>
      </div>

      {/* Features list */}
      <div>
        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
          <Check className={`w-4 h-4 ${a.text}`} />
          What You Get
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {pkg.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
            >
              <div className={`mt-0.5 w-4 h-4 rounded-full ${pkg.badgeColor} flex items-center justify-center shrink-0`}>
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables */}
      <div>
        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
          <FileText className={`w-4 h-4 ${a.text}`} />
          Project Deliverables
        </h4>
        <div className="space-y-2.5">
          {pkg.deliverables.map((del, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
            >
              <div className={`w-7 h-7 rounded-lg ${a.bg} ${a.text} flex items-center justify-center shrink-0 text-xs font-bold`}>
                {i + 1}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{del.name}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{del.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div>
        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
          <Layers className={`w-4 h-4 ${a.text}`} />
          OMNIFORGE Modules Activated ({pkg.modules.length} of 22)
        </h4>
        <div className="flex flex-wrap gap-2">
          {pkg.modules.map((mod) => (
            <div
              key={mod.id}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
            >
              <span className={`text-[10px] font-bold w-5 h-5 rounded ${a.bg} ${a.text} flex items-center justify-center`}>
                {mod.id}
              </span>
              <div>
                <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{mod.name}</div>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500">{mod.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const comparisonRows: { label: string; values: Record<Tier, string> }[] = [
  { label: "Price Range", values: { low: lowTierPackage.priceRange, mid: midTierPackage.priceRange, high: highTierPackage.priceRange, enterprise: enterpriseTierPackage.priceRange } },
  { label: "Delivery Time", values: { low: lowTierPackage.deliveryWeeks, mid: midTierPackage.deliveryWeeks, high: highTierPackage.deliveryWeeks, enterprise: enterpriseTierPackage.deliveryWeeks } },
  { label: "Pages", values: { low: "Single page", mid: "3–7 pages", high: "Multi-page + routing", enterprise: "Full platform" } },
  { label: "Design System", values: { low: "Basic styling", mid: "Custom tokens", high: "Full token system + components", enterprise: "Versioned library + Storybook" } },
  { label: "Backend & Database", values: { low: "None", mid: "Basic backend", high: "API + schema + RLS", enterprise: "Microservices / modular monolith" } },
  { label: "Authentication", values: { low: "None", mid: "Email/password", high: "Auth + role permissions", enterprise: "SSO + multi-tenant auth" } },
  { label: "Payment Integration", values: { low: "None", mid: "None", high: "Stripe checkout + subscriptions", enterprise: "Custom billing + marketplace" } },
  { label: "Admin Dashboard", values: { low: "None", mid: "Content editing", high: "Full CRUD panel", enterprise: "Multi-tenant admin suite" } },
  { label: "AI & Automation", values: { low: "None", mid: "None", high: "None", enterprise: "LLM agents + workflows" } },
  { label: "Realtime", values: { low: "None", mid: "None", high: "None", enterprise: "Presence + messaging + collaboration" } },
  { label: "SEO Setup", values: { low: "Basic meta tags", mid: "Sitemap + structured data", high: "Full SEO suite", enterprise: "Full SEO + internationalization" } },
  { label: "Analytics", values: { low: "None", mid: "Pageviews + goals", high: "Events + funnel analysis", enterprise: "Custom analytics + data warehouse" } },
  { label: "Accessibility", values: { low: "Basic", mid: "Keyboard + contrast", high: "WCAG 2.2 AA audit", enterprise: "WCAG 2.2 AA + ongoing" } },
  { label: "Security", values: { low: "Basic", mid: "Validation + headers", high: "RLS + audit logs", enterprise: "SOC 2 / GDPR / HIPAA" } },
  { label: "Testing", values: { low: "Manual check", mid: "Basic tests", high: "Unit + integration + E2E", enterprise: "Full pyramid + load + contract" } },
  { label: "Performance", values: { low: "Standard", mid: "Image optimization", high: "Budgets + code splitting", enterprise: "Edge caching + CDN + budgets" } },
  { label: "Observability", values: { low: "None", mid: "Error tracking", high: "Error tracking", enterprise: "Logging + tracing + uptime" } },
  { label: "Documentation", values: { low: "README", mid: "Setup guide", high: "Full docs + API ref", enterprise: "ADRs + runbooks + onboarding" } },
  { label: "Revisions", values: { low: "1 round", mid: "2 rounds", high: "3 rounds", enterprise: "Weekly reviews" } },
  { label: "Post-launch Support", values: { low: "None", mid: "14 days", high: "30 days", enterprise: "90-day SLA" } },
  { label: "Modules Activated", values: { low: `${lowTierPackage.modules.length} of 22`, mid: `${midTierPackage.modules.length} of 22`, high: `${highTierPackage.modules.length} of 22`, enterprise: `${enterpriseTierPackage.modules.length} of 22` } },
];

function ComparisonTab() {
  const tiers: Tier[] = ["low", "mid", "high", "enterprise"];
  return (
    <div className="p-5 sm:p-8 max-w-5xl mx-auto">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">Tier Comparison</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        See exactly what changes across all four tiers — from Starter to Enterprise.
      </p>

      {/* Package summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {tiers.map((t) => {
          const td = tierDisplay[t];
          const a = tierAccent[t];
          const pkg = getPackage(t);
          return (
            <div key={t} className={`rounded-xl border ${a.border} ${a.bg} p-4`}>
              <div className={`text-xs font-bold uppercase tracking-wider ${a.text} mb-1`}>{td.label}</div>
              <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{pkg.priceRange}</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-tight">{pkg.tagline}</div>
            </div>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="text-left py-3 px-3 font-semibold text-zinc-700 dark:text-zinc-300 text-xs uppercase tracking-wider">
                Feature
              </th>
              {tiers.map((t) => (
                <th key={t} className={`text-center py-3 px-2 font-semibold text-xs uppercase tracking-wider ${tierAccent[t].text}`}>
                  {tierDisplay[t].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr
                key={row.label}
                className={`border-b border-zinc-100 dark:border-zinc-800 ${
                  i % 2 === 0 ? "bg-white dark:bg-zinc-900/50" : "bg-transparent"
                }`}
              >
                <td className="py-2.5 px-3 font-medium text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm whitespace-nowrap">
                  {row.label}
                </td>
                {tiers.map((t) => (
                  <td key={t} className="py-2.5 px-2 text-center text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                    {row.values[t]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-start gap-3">
          <ArrowRight className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Prices are illustrative starting points, not verified market rates. Final cost depends on scope,
            integrations, content volume, and customization. The Enterprise tier can be scaled from a focused
            internal tool to a full multi-tenant SaaS platform — the module set expands accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
