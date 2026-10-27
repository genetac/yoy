import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { ProductExample } from "@/data/exampleProducts";
import { tierDisplay } from "@/data/servicePackages";
import type { FamilyTokens } from "@/data/designFamilies";
import { EnrichedContentSections, LiveFeatureProof } from "./contentSections";

function HeroImage({ src, gradient }: { src?: string; gradient: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div style={{ position: "absolute", inset: 0, background: gradient }} />;
  return <img src={src} alt="" onError={() => setFailed(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
}

function Label({ children, tokens, color }: { children: React.ReactNode; tokens: FamilyTokens; color: string }) {
  return (
    <div style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 600, textTransform: tokens.textTransformLabels as "uppercase" | "none", letterSpacing: tokens.letterSpacingLabels, color, marginBottom: 8 }}>
      {children}
    </div>
  );
}

export function MicroRenderer({ example, tokens }: { example: ProductExample; tokens: FamilyTokens }) {
  const { theme, label, tagline, features, heroImage, exampleName } = example;
  const td = tierDisplay[example.tier];
  const r = tokens.radius;

  return (
    <div style={{ fontFamily: tokens.fontBody, background: theme.bg, color: theme.text, minHeight: "100%", fontSize: 12, lineHeight: 1.5 }}>
      {/* Minimal nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: theme.nav, borderBottom: `1px solid ${theme.border}` }}>
        <span style={{ fontFamily: tokens.fontDisplay, fontWeight: 700, fontSize: 12, letterSpacing: "-0.02em", color: theme.text }}>{label}</span>
        <span style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 500, color: theme.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{td.short}</span>
      </nav>

      {/* Bold typographic hero — Pentagram style */}
      <section style={{ position: "relative", padding: "32px 16px 24px", textAlign: "left", overflow: "hidden" }}>
        <HeroImage src={heroImage} gradient={`linear-gradient(135deg, ${theme.accentSoft}, ${theme.bg})`} />
        <div style={{ position: "absolute", inset: 0, background: heroImage ? `linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.75))` : "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-block", fontFamily: tokens.fontMono, fontSize: 7, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", padding: "2px 8px", borderRadius: r.sm, background: theme.accent, color: "#fff", marginBottom: 10 }}>
            {exampleName}
          </div>
          <h1 style={{ fontFamily: tokens.fontDisplay, fontSize: 26, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0, marginBottom: 8, color: heroImage ? "#fff" : theme.text, textShadow: heroImage ? "0 2px 12px rgba(0,0,0,0.4)" : "none" }}>
            {tagline}
          </h1>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: heroImage ? "#fff" : theme.accent, textShadow: heroImage ? "0 1px 6px rgba(0,0,0,0.4)" : "none" }}>
            Get it now <ArrowRight className="w-3 h-3" style={{ display: "inline" }} />
          </div>
        </div>
      </section>

      {/* Feature list — numbered, bold */}
      <section style={{ padding: "20px 16px" }}>
        <Label tokens={tokens} color={theme.muted}>What's included</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: r.md }}>
              <span style={{ fontFamily: tokens.fontMono, fontSize: 9, fontWeight: 700, color: theme.accent, minWidth: 14 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 10, fontWeight: 500, color: theme.text, flex: 1 }}>{f}</span>
              <Check className="w-3 h-3" style={{ color: theme.accent, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </section>

      {/* Enriched content sections — achievements, scores, certificates */}
      <EnrichedContentSections features={features} theme={theme} tokens={tokens} />
      <LiveFeatureProof features={features} theme={theme} tokens={tokens} />

      {/* CTA block — bold color rectangle, Pentagram move */}
      <section style={{ padding: "0 16px 20px" }}>
        <div style={{ background: theme.accent, color: "#fff", padding: "14px 16px", borderRadius: r.md, textAlign: "center" }}>
          <div style={{ fontFamily: tokens.fontDisplay, fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Ready to use this?</div>
          <div style={{ fontSize: 9, opacity: 0.8, marginBottom: 10 }}>{td.priceRange} · instant delivery</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#fff", color: theme.accent, padding: "6px 14px", borderRadius: r.sm, fontSize: 11, fontWeight: 700 }}>
            Buy now <ArrowRight className="w-3 h-3" style={{ display: "inline" }} />
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer style={{ padding: "10px 16px", borderTop: `1px solid ${theme.border}`, background: theme.surface, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: tokens.fontDisplay, fontSize: 9, fontWeight: 700, color: theme.muted }}>{label}</span>
        <span style={{ fontFamily: tokens.fontMono, fontSize: 7, color: theme.muted }}>© 2026</span>
      </footer>
    </div>
  );
}
