import { useState } from "react";
import {
  LayoutDashboard, Users, Building2, Settings, BarChart3,
  Shield, Bell, Search, ChevronRight, ArrowRight, Check,
  Activity, Server, FileText, Zap
} from "lucide-react";
import type { ProductExample } from "@/data/exampleProducts";
import { tierDisplay } from "@/data/servicePackages";
import type { FamilyTokens } from "@/data/designFamilies";
import { LiveFeatureProof } from "./contentSections";

function Sparkline({ color, values }: { color: string; values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${30 - ((v - min) / range) * 28}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: "100%", height: 20 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}

const navIcons = [LayoutDashboard, Users, Building2, BarChart3, Server, Shield, FileText, Settings];

export function EnterprisePlatformRenderer({ example, tokens }: { example: ProductExample; tokens: FamilyTokens }) {
  const { theme, label, tagline, features, exampleName } = example;
  const td = tierDisplay[example.tier];
  const r = tokens.radius;
  const isDark = theme.bg.startsWith("#0") || theme.bg.startsWith("#1");
  const inkColor = isDark ? "#F7F8F8" : theme.text;
  const mutedColor = isDark ? "#9CA3AF" : theme.muted;
  const hairline = isDark ? "rgba(255,255,255,0.06)" : theme.border;
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div style={{ fontFamily: tokens.fontBody, background: theme.bg, color: inkColor, minHeight: "100%", fontSize: 11, lineHeight: 1.45, display: "flex" }}>
      {/* Sidebar nav rail — Linear/Bloomberg hybrid */}
      <aside style={{ width: 42, background: theme.surface, borderRight: `1px solid ${hairline}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0", gap: 2, flexShrink: 0 }}>
        <div style={{ width: 22, height: 22, borderRadius: r.sm, background: theme.accent, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
          <Zap className="w-3 h-3 text-white" />
        </div>
        {navIcons.map((Icon, i) => (
          <button
            key={i}
            onClick={() => setActiveNav(i)}
            style={{
              width: 26, height: 26, borderRadius: r.sm, border: "none",
              background: activeNav === i ? `${theme.accent}20` : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.15s",
            }}
          >
            <Icon className="w-3 h-3" style={{ color: activeNav === i ? theme.accent : mutedColor }} />
          </button>
        ))}
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Top utility bar */}
        <div style={{ background: theme.surface, borderBottom: `1px solid ${hairline}`, padding: "6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: inkColor }}>{label}</span>
            <span style={{ fontFamily: tokens.fontMono, fontSize: 7, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.05em", padding: "1px 5px", border: `1px solid ${hairline}`, borderRadius: 2 }}>{td.short}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Search className="w-3 h-3" style={{ color: mutedColor }} />
            <span style={{ fontFamily: tokens.fontMono, fontSize: 7, color: mutedColor, border: `1px solid ${hairline}`, borderRadius: 2, padding: "1px 5px" }}>⌘K</span>
            <Bell className="w-3 h-3" style={{ color: mutedColor }} />
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: theme.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: "#fff" }}>JD</span>
            </div>
          </div>
        </div>

        {/* Dashboard header */}
        <div style={{ padding: "12px 14px", borderBottom: `1px solid ${hairline}` }}>
          <div style={{ fontFamily: tokens.fontMono, fontSize: 7, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>PLATFORM OVERVIEW</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ fontFamily: tokens.fontDisplay, fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, color: inkColor }}>{exampleName}</h1>
            <button style={{ background: theme.accent, color: "#fff", border: "none", borderRadius: r.sm, padding: "4px 10px", fontSize: 9, fontWeight: 600, display: "flex", alignItems: "center", gap: 3, cursor: "pointer" }}>
              Request Demo <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
          <p style={{ fontSize: 9, color: mutedColor, margin: "4px 0 0" }}>{tagline}</p>
        </div>

        {/* KPI cards row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderBottom: `1px solid ${hairline}` }}>
          {[
            { label: "Tenants", value: "340", delta: "+12", color: theme.accent, spark: [280, 295, 310, 320, 330, 340] },
            { label: "Active Users", value: "48.2K", delta: "+8.1%", color: theme.accent, spark: [35, 38, 40, 42, 45, 48] },
            { label: "API Calls", value: "2.4M", delta: "+15%", color: theme.accent, spark: [1.2, 1.5, 1.8, 2.0, 2.2, 2.4] },
            { label: "Uptime", value: "99.9%", delta: "SLA", color: "#00B96B", spark: [99.7, 99.8, 99.9, 99.9, 99.9, 99.9] },
          ].map((kpi) => (
            <div key={kpi.label} style={{ padding: "10px 12px", borderRight: `1px solid ${hairline}` }}>
              <div style={{ fontSize: 7, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{kpi.label}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: tokens.fontDisplay, fontSize: 15, fontWeight: 700, color: inkColor }}>{kpi.value}</span>
                <span style={{ fontFamily: tokens.fontMono, fontSize: 7, color: kpi.color, fontWeight: 600 }}>{kpi.delta}</span>
              </div>
              <Sparkline color={kpi.color} values={kpi.spark} />
            </div>
          ))}
        </div>

        <LiveFeatureProof features={features} theme={theme} tokens={tokens} />

        {/* Main panel: capability grid + sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 0, flex: 1 }}>
          {/* Capability modules */}
          <div style={{ padding: "10px 14px", borderRight: `1px solid ${hairline}` }}>
            <div style={{ fontFamily: tokens.fontMono, fontSize: 7, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>PLATFORM MODULES</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {features.slice(0, 8).map((f, i) => (
                <div key={i} style={{ background: theme.surface, border: `1px solid ${hairline}`, borderRadius: r.sm, padding: 8, display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: r.sm, background: `${theme.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check className="w-2.5 h-2.5" style={{ color: theme.accent }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 8, fontWeight: 600, color: inkColor, lineHeight: 1.3 }}>{f}</div>
                    <div style={{ fontFamily: tokens.fontMono, fontSize: 6, color: "#00B96B", textTransform: "uppercase", marginTop: 2 }}>DEPLOYED</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right rail: activity feed */}
          <div style={{ padding: "10px 10px", background: theme.surface }}>
            <div style={{ fontFamily: tokens.fontMono, fontSize: 7, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>ACTIVITY</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { t: "New tenant onboarded", time: "2m" },
                { t: "API quota updated", time: "14m" },
                { t: "Security scan passed", time: "1h" },
                { t: "Backup completed", time: "3h" },
                { t: "Compliance report", time: "6h" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 1, paddingBottom: 6, borderBottom: i < 4 ? `1px solid ${hairline}` : "none" }}>
                  <span style={{ fontSize: 8, color: inkColor, lineHeight: 1.3 }}>{a.t}</span>
                  <span style={{ fontFamily: tokens.fontMono, fontSize: 6, color: mutedColor }}>{a.time} ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom status bar — terminal signature */}
        <div style={{ background: theme.surface, borderTop: `1px solid ${hairline}`, padding: "5px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 7, fontFamily: tokens.fontMono, color: mutedColor, textTransform: "uppercase" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#00B96B" }}>● ALL SYSTEMS OPERATIONAL</span>
            <span>REGION: US-EAST</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span>{td.priceRange}</span>
            <ChevronRight className="w-2.5 h-2.5" />
            <span style={{ color: theme.accent, fontWeight: 600 }}>REQUEST DEMO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
