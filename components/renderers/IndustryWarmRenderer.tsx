import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import type { ProductExample } from "@/data/exampleProducts";
import { tierDisplay } from "@/data/servicePackages";
import type { FamilyTokens } from "@/data/designFamilies";
import { EnrichedContentSections, LiveFeatureProof } from "./contentSections";
import { AnimatedStatsSection, RichFooter } from "./interledgerSections";

function HeroImage({ src, gradient }: { src?: string; gradient: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div style={{ position: "absolute", inset: 0, background: gradient }} />;
  return <img src={src} alt="" onError={() => setFailed(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
}

export function IndustryWarmRenderer({ example, tokens }: { example: ProductExample; tokens: FamilyTokens }) {
  const { theme, label, tagline, features, heroImage, exampleName, exampleDescription } = example;
  const td = tierDisplay[example.tier];
  const isDark = theme.bg.startsWith("#0") || theme.bg.startsWith("#1") || theme.bg.startsWith("#2");

  return (
    <div style={{ fontFamily: tokens.fontBody, background: theme.bg, color: theme.text, minHeight: "100%", fontSize: 13, lineHeight: 1.65 }}>
      {/* All-text masthead nav — Aesop signature */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", background: theme.nav, borderBottom: `1px solid ${theme.border}` }}>
        <span style={{ fontFamily: tokens.fontDisplay, fontSize: 14, fontWeight: 500, letterSpacing: "0.02em", color: theme.text }}>{label}</span>
        <div style={{ display: "flex", gap: 14, fontFamily: tokens.fontBody, fontSize: 9, fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.12em", color: theme.muted }}>
          <span>Menu</span>
          <span>About</span>
          <span>Visit</span>
        </div>
      </nav>

      {/* Full-bleed editorial hero with asymmetric layout */}
      <section style={{ position: "relative", minHeight: 300, overflow: "hidden" }}>
        <HeroImage src={heroImage} gradient={`linear-gradient(180deg, ${theme.accentSoft}, ${theme.surface})`} />
        <div style={{ position: "absolute", inset: 0, background: isDark ? "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7))" : "linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5))" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", minHeight: 300, padding: "0 20px 24px" }}>
          <div style={{ maxWidth: 340 }}>
            <div style={{ fontFamily: tokens.fontBody, fontSize: 9, fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
              {exampleName}
            </div>
            <h1 style={{ fontFamily: tokens.fontDisplay, fontSize: 24, fontWeight: 400, fontStyle: "italic", lineHeight: 1.2, margin: 0, color: "#fff", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
              {tagline}
            </h1>
          </div>
        </div>
      </section>

      {/* Editorial intro paragraph — serif body, generous margins */}
      <section style={{ padding: "28px 20px 20px" }}>
        <div style={{ maxWidth: 320, fontSize: 11, fontWeight: 400, lineHeight: 1.7, color: theme.muted, fontStyle: "italic" }}>
          {exampleDescription}
        </div>
      </section>

      {/* Section label in small caps — Aesop signature */}
      <section style={{ padding: "12px 20px 20px" }}>
        <div style={{ fontFamily: tokens.fontBody, fontSize: 8, fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.15em", color: theme.accent, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${theme.border}` }}>
          {example.tier === "mid" ? "What's included" : "Offerings"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "8px 0", borderBottom: i < features.length - 1 ? `1px solid ${theme.border}` : "none" }}>
              <span style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 500, color: theme.accent, minWidth: 16 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 11, fontWeight: 400, color: theme.text, flex: 1 }}>{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Enriched content sections — certificates, achievements */}
      <EnrichedContentSections features={features} theme={theme} tokens={tokens} />
      <LiveFeatureProof features={features} theme={theme} tokens={tokens} />

      {/* Animated stats — Interledger "Real-world Progress" */}
      {example.showStats && (
        <AnimatedStatsSection
          theme={theme}
          tokens={tokens}
          stats={[
            { value: 15, prefix: "", suffix: "+", label: "Years serving" },
            { value: 1200, prefix: "", suffix: "+", label: "Happy guests" },
            { value: 4, prefix: "", suffix: ".9", label: "Average rating" },
            { value: 3, prefix: "", suffix: "", label: "Locations" },
          ]}
        />
      )}

      {/* Testimonial in oversized italic serif — Stripe Press move */}
      {example.showTestimonials && (
        <section style={{ padding: "20px 20px", background: theme.surface }}>
          <div style={{ fontFamily: tokens.fontDisplay, fontSize: 16, fontWeight: 400, fontStyle: "italic", lineHeight: 1.45, color: theme.text, marginBottom: 8 }}>
            "{exampleName} transformed how we work. The attention to detail is remarkable."
          </div>
          <div style={{ fontFamily: tokens.fontBody, fontSize: 9, fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.12em", color: theme.muted }}>
            — Satisfied Client
          </div>
        </section>
      )}

      {/* Simple CTA — no bold buttons, just a text link */}
      <section style={{ padding: "16px 20px 24px", borderTop: `1px solid ${theme.border}` }}>
        <div style={{ fontFamily: tokens.fontDisplay, fontSize: 14, fontWeight: 400, fontStyle: "italic", color: theme.text, marginBottom: 6 }}>
          {example.showCTA ? "Begin your experience" : "Learn more"}
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 400, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          {example.showCTA ? "Reserve or inquire" : "Read more"} <ArrowRight className="w-3 h-3" style={{ display: "inline" }} />
        </div>
      </section>

      {/* Rich multi-column footer — Interledger inspired */}
      <RichFooter
        label={label}
        tagline={tagline}
        theme={theme}
        tokens={tokens}
        columns={[
          { title: "Visit", links: ["Hours", "Location", "Reservations", "Private events"] },
          { title: "About", links: ["Our story", "Team", "Press", "Careers"] },
          { title: "Connect", links: ["Contact", "Newsletter", "Gift cards", "Reviews"] },
        ]}
      />
    </div>
  );
}
