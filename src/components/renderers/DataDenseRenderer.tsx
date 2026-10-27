import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
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
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: "100%", height: 24 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}

function MiniBar({ label, value, max, color, mono }: { label: string; value: number; max: number; color: string; mono: string }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 8 }}>
      <span style={{ fontFamily: mono, color: "#5E6680", minWidth: 50, textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.04)", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: color }} />
      </div>
      <span style={{ fontFamily: mono, fontWeight: 600, color: color, minWidth: 36, textAlign: "right" }}>{value.toLocaleString()}</span>
    </div>
  );
}

export function DataDenseRenderer({ example, tokens }: { example: ProductExample; tokens: FamilyTokens }) {
  const { theme, label, tagline, features, exampleName } = example;
  const td = tierDisplay[example.tier];
  const mono = tokens.fontMono;
  const isDark = theme.bg.startsWith("#0") || theme.bg.startsWith("#1");
  const inkColor = isDark ? "#E8ECF4" : theme.text;
  const mutedColor = isDark ? "#5E6680" : theme.muted;
  const panelBg = isDark ? theme.surface : theme.surface;
  const hairline = isDark ? "rgba(255,255,255,0.06)" : theme.border;

  const mockMetrics = [
    { label: "REVENUE", value: "$284,392", delta: "+12.4%", up: true, spark: [20, 28, 25, 32, 38, 42, 48, 52, 58, 62] },
    { label: "ORDERS", value: "1,847", delta: "+8.1%", up: true, spark: [15, 22, 18, 28, 24, 30, 35, 32, 40, 44] },
    { label: "CONVERSION", value: "3.24%", delta: "-0.3%", up: false, spark: [35, 32, 30, 33, 28, 30, 27, 25, 28, 26] },
    { label: "AVG ORDER", value: "$154.02", delta: "+4.2%", up: true, spark: [40, 38, 42, 44, 46, 45, 48, 50, 52, 54] },
  ];

  return (
    <div style={{ fontFamily: mono, background: theme.bg, color: inkColor, minHeight: "100%", fontSize: 11, lineHeight: 1.4 }}>
      {/* Terminal-style top bar with ticker */}
      <div style={{ background: theme.surface, borderBottom: `1px solid ${hairline}`, padding: "6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Activity className="w-3 h-3" style={{ color: theme.accent }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: inkColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        </div>
        <div style={{ display: "flex", gap: 8, fontSize: 8, color: mutedColor, textTransform: "uppercase" }}>
          <span style={{ color: "#00B96B" }}>● LIVE</span>
          <span>{new Date().toISOString().slice(11, 19)} UTC</span>
        </div>
      </div>

      {/* Ticker strip */}
      <div style={{ background: theme.bg, borderBottom: `1px solid ${hairline}`, padding: "3px 12px", display: "flex", gap: 14, fontSize: 8, overflow: "hidden", fontFamily: mono }}>
        {["REV +12.4%", "ORD +8.1%", "CNV -0.3%", "AOV +4.2%", "CHN +15.6%", "RET +2.1%"].map((t, i) => {
          const up = !t.includes("-");
          return (
            <span key={i} style={{ color: up ? "#00B96B" : "#F23645", fontWeight: 600, whiteSpace: "nowrap" }}>
              {t}
            </span>
          );
        })}
      </div>

      {/* Dashboard title bar */}
      <div style={{ padding: "8px 12px", borderBottom: `1px solid ${hairline}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 9, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>DASHBOARD // {td.short}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: inkColor, marginTop: 1 }}>{exampleName}</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["1D", "7D", "30D", "90D"].map((p, i) => (
            <span key={p} style={{ padding: "2px 6px", fontSize: 8, fontWeight: 600, background: i === 2 ? theme.accent : "transparent", color: i === 2 ? "#fff" : mutedColor, border: `1px solid ${hairline}` }}>
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* KPI panel grid — 4 panels with sparklines */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderBottom: `1px solid ${hairline}` }}>
        {mockMetrics.map((m) => (
          <div key={m.label} style={{ padding: "10px 12px", borderRight: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <span style={{ fontSize: 7, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</span>
              <span style={{ fontSize: 8, fontWeight: 600, color: m.up ? "#00B96B" : "#F23645", display: "flex", alignItems: "center", gap: 2 }}>
                {m.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                {m.delta}
              </span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: inkColor, marginBottom: 4, fontVariantNumeric: "tabular-nums" }}>{m.value}</div>
            <Sparkline color={m.up ? "#00B96B" : "#F23645"} values={m.spark} />
          </div>
        ))}
      </div>

      {/* Data table panel */}
      <div style={{ padding: "10px 12px", borderBottom: `1px solid ${hairline}` }}>
        <div style={{ fontSize: 8, fontWeight: 600, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>TOP CHANNELS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <MiniBar label="Organic" value={8420} max={10000} color={theme.accent} mono={mono} />
          <MiniBar label="Paid Ads" value={6210} max={10000} color={theme.accent} mono={mono} />
          <MiniBar label="Social" value={4830} max={10000} color={theme.accent} mono={mono} />
          <MiniBar label="Email" value={3120} max={10000} color={theme.accent} mono={mono} />
          <MiniBar label="Referral" value={1840} max={10000} color={theme.accent} mono={mono} />
        </div>
      </div>

      <LiveFeatureProof features={features} theme={theme} tokens={tokens} />

      {/* Features as data rows */}
      <div style={{ padding: "10px 12px", borderBottom: `1px solid ${hairline}` }}>
        <div style={{ fontSize: 8, fontWeight: 600, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>CAPABILITIES</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: i < features.length - 1 ? `1px solid ${hairline}` : "none" }}>
              <span style={{ fontSize: 9, color: inkColor }}>{f}</span>
              <span style={{ fontSize: 7, color: "#00B96B", fontWeight: 600, textTransform: "uppercase" }}>ACTIVE</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div style={{ padding: "6px 12px", background: theme.surface, display: "flex", justifyContent: "space-between", fontSize: 7, color: mutedColor, textTransform: "uppercase" }}>
        <span>{tagline.slice(0, 40)}{tagline.length > 40 ? "..." : ""}</span>
        <span>v2.4.1 · {td.priceRange}</span>
      </div>
    </div>
  );
}
