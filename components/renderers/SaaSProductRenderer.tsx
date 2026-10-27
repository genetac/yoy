import { useState } from "react";
import { ArrowRight, Check, Zap } from "lucide-react";
import type { ProductExample } from "@/data/exampleProducts";
import { tierDisplay } from "@/data/servicePackages";
import type { FamilyTokens } from "@/data/designFamilies";
import { LiveFeatureProof } from "./contentSections";
import { AnimatedStatsSection, RichFooter, type StatItem, type FooterColumn } from "./interledgerSections";

function HeroImage({ src, gradient }: { src?: string; gradient: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div style={{ position: "absolute", inset: 0, background: gradient }} />;
  return <img src={src} alt="" onError={() => setFailed(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
}

export function SaaSProductRenderer({ example, tokens }: { example: ProductExample; tokens: FamilyTokens }) {
  const { theme, label, tagline, features, heroImage, exampleName, showStats, showTestimonials, showCTA, showNewsletter } = example;
  const td = tierDisplay[example.tier];
  const r = tokens.radius;
  const isDark = theme.bg.startsWith("#0") || theme.bg.startsWith("#1");

  return (
    <div style={{ fontFamily: tokens.fontBody, background: theme.bg, color: theme.text, minHeight: "100%", fontSize: 12, lineHeight: 1.5 }}>
      {/* Transparent overlay nav — Linear signature */}
      <nav style={{ position: "relative", zIndex: 20, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "transparent" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 16, height: 16, borderRadius: r.sm, background: theme.accent }} />
          <span style={{ fontFamily: tokens.fontDisplay, fontWeight: 600, fontSize: 12, letterSpacing: "-0.02em", color: "#fff" }}>{label}</span>
        </div>
        <div style={{ display: "flex", gap: 10, fontSize: 9, alignItems: "center" }}>
          {["Features", "Pricing", "Docs"].map((item) => (
            <span key={item} style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{item}</span>
          ))}
          <span style={{ background: theme.accent, color: "#fff", padding: "3px 10px", borderRadius: r.sm, fontSize: 9, fontWeight: 600 }}>Get Started</span>
        </div>
      </nav>

      {/* Full-bleed hero with subtle gradient mesh — Linear controlled */}
      <section style={{ position: "relative", minHeight: 280, display: "flex", alignItems: "center", overflow: "hidden", background: theme.bg }}>
        <HeroImage src={heroImage} gradient={`linear-gradient(135deg, ${theme.accent}, ${theme.surface})`} />
        <div style={{ position: "absolute", inset: 0, background: isDark ? "linear-gradient(180deg, rgba(8,9,10,0.7), rgba(8,9,10,0.85))" : `linear-gradient(180deg, ${theme.bg}cc, ${theme.bg}ee)` }} />
        <div style={{ position: "relative", maxWidth: 380, padding: "0 16px" }}>
          <div style={{ display: "inline-block", fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 500, color: theme.accent, marginBottom: 8, padding: "2px 8px", borderRadius: r.sm, background: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}>
            {exampleName}
          </div>
          <h1 style={{ fontFamily: tokens.fontDisplay, fontSize: 22, fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.025em", margin: 0, marginBottom: 8, color: isDark ? "#F7F8F8" : theme.text }}>
            {tagline}
          </h1>
          <p style={{ fontSize: 11, color: isDark ? "#9CA3AF" : theme.muted, margin: "0 0 12px", lineHeight: 1.55 }}>
            {features.slice(0, 2).join(" · ")}
          </p>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ background: theme.accent, color: "#fff", padding: "6px 14px", borderRadius: r.sm, fontSize: 10, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
              Start free <ArrowRight className="w-3 h-3" style={{ display: "inline" }} />
            </span>
            <span style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : theme.border}`, color: isDark ? "#F7F8F8" : theme.text, padding: "6px 14px", borderRadius: r.sm, fontSize: 10, fontWeight: 500, background: "rgba(255,255,255,0.03)", backdropFilter: "blur(4px)" }}>
              View demo
            </span>
          </div>
        </div>
      </section>

      <LiveFeatureProof features={features} theme={theme} tokens={tokens} />

      {/* Stats bar — animated count-up, Interledger "Real-world Progress" */}
      {showStats && (
        <AnimatedStatsSection
          theme={theme}
          tokens={tokens}
          stats={[
            { value: 999, prefix: "", suffix: "%", label: "Uptime" },
            { value: 50, prefix: "", suffix: "ms", label: "Avg response" },
            { value: 10, prefix: "", suffix: "K+", label: "Active users" },
            { value: 47, prefix: "", suffix: "", label: "Integrations" },
          ]}
        />
      )}

      {/* Feature grid with hairline borders — Linear signature */}
      <section style={{ padding: "20px 16px" }}>
        <div style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 500, color: theme.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Features</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: theme.surface, border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : theme.border}`, borderRadius: r.md, padding: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                <div style={{ width: 16, height: 16, borderRadius: r.sm, background: `${theme.accent}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check className="w-2.5 h-2.5" style={{ color: theme.accent }} />
                </div>
                <span style={{ fontSize: 9, fontWeight: 600, color: theme.text }}>{f}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials with hairline cards */}
      {showTestimonials && (
        <section style={{ padding: "16px 16px", background: theme.surface, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
          <div style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 500, color: theme.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>What teams say</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ n: "Sarah K.", q: "Replaced our old workflow in a week." }, { n: "James L.", q: "The best tool we've used all year." }].map((t) => (
              <div key={t.n} style={{ flex: 1, padding: 10, borderRadius: r.md, background: theme.bg, border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : theme.border}` }}>
                <div style={{ fontSize: 9, fontStyle: "italic", color: theme.text, marginBottom: 6, lineHeight: 1.5 }}>"{t.q}"</div>
                <div style={{ fontSize: 8, fontWeight: 600, color: theme.muted }}>{t.n}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      {showCTA && (
        <section style={{ padding: "20px 16px" }}>
          <div style={{ background: theme.accent, color: "#fff", borderRadius: r.lg, padding: 16, textAlign: "center" }}>
            <div style={{ fontFamily: tokens.fontDisplay, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Start your free trial</div>
            <div style={{ fontSize: 9, opacity: 0.8, marginBottom: 10 }}>No credit card required · {td.priceRange}</div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#fff", color: theme.accent, padding: "6px 14px", borderRadius: r.sm, fontSize: 10, fontWeight: 700 }}>
              Get started <ArrowRight className="w-3 h-3" style={{ display: "inline" }} />
            </span>
          </div>
        </section>
      )}

      {/* Newsletter */}
      {showNewsletter && (
        <section style={{ padding: "14px 16px", background: theme.surface, borderTop: `1px solid ${theme.border}` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 3, color: theme.text }}>Stay updated</div>
            <div style={{ fontSize: 9, color: theme.muted, marginBottom: 8 }}>Product updates in your inbox.</div>
            <div style={{ display: "flex", gap: 4, maxWidth: 220, margin: "0 auto" }}>
              <div style={{ flex: 1, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: r.sm, height: 26 }} />
              <div style={{ background: theme.accent, color: "#fff", borderRadius: r.sm, padding: "0 12px", display: "flex", alignItems: "center", fontSize: 9, fontWeight: 600 }}>Subscribe</div>
            </div>
          </div>
        </section>
      )}

      {/* Rich multi-column footer — Interledger inspired */}
      <RichFooter
        label={label}
        tagline={tagline}
        theme={theme}
        tokens={tokens}
        columns={[
          { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Resources", links: ["Docs", "API", "Status", "Support"] },
        ]}
      />
    </div>
  );
}
