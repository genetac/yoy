import { useEffect, useState } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import type { ProductExample } from "@/data/exampleProducts";
import type { FamilyTokens } from "@/data/designFamilies";

type Theme = {
  bg: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
};

// ─── Count-up hook ────────────────────────────────────────────────
// Animates 0 → target on mount with ease-out cubic. Reliable inside
// the scaled preview modal (no IntersectionObserver dependency).

function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

// ─── Animated stat counter (Interledger "Real-world Progress" style) ──

function StatCounter({
  value,
  prefix,
  suffix,
  label,
  color,
  font,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  color: string;
  font: string;
}) {
  const current = useCountUp(value);
  return (
    <div style={{ textAlign: "center", padding: "12px 8px" }}>
      <div
        style={{
          fontFamily: font,
          fontSize: 22,
          fontWeight: 700,
          color,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {prefix}
        {current.toLocaleString()}
        {suffix && (
          <span style={{ fontSize: 16, fontWeight: 700 }}>{suffix}</span>
        )}
      </div>
      <div
        style={{
          fontSize: 8,
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export type StatItem = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

// Animated stats grid — 2×2, Interledger "Real-world Progress" inspired
export function AnimatedStatsSection({
  theme,
  tokens,
  stats,
}: {
  theme: Theme;
  tokens: FamilyTokens;
  stats: StatItem[];
}) {
  return (
    <section
      style={{
        padding: "20px 16px",
        background: theme.surface,
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div
        style={{
          fontFamily: tokens.fontMono,
          fontSize: 8,
          fontWeight: 600,
          textTransform: tokens.textTransformLabels as "uppercase" | "none",
          letterSpacing: tokens.letterSpacingLabels,
          color: theme.muted,
          marginBottom: 14,
        }}
      >
        Real-world Progress
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          borderTop: `1px solid ${theme.border}`,
          borderLeft: `1px solid ${theme.border}`,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              borderRight: `1px solid ${theme.border}`,
              borderBottom: `1px solid ${theme.border}`,
            }}
          >
            <StatCounter
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              label={s.label}
              color={theme.accent}
              font={tokens.fontDisplay}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Alternating text + image sections ────────────────────────────
// Interledger "Making Money Move like Data" inspired — text and media
// alternate sides. At 390px native they stack vertically.

export type AlternatingItem = {
  title: string;
  body: string;
  image?: string;
  reverse?: boolean;
};

export function AlternatingTextImageSection({
  theme,
  tokens,
  items,
}: {
  theme: Theme;
  tokens: FamilyTokens;
  items: AlternatingItem[];
}) {
  return (
    <>
      {items.map((item, i) => {
        const isReversed = item.reverse ?? i % 2 === 1;
        return (
          <section
            key={i}
            style={{
              display: "flex",
              flexDirection: isReversed ? "column-reverse" : "column",
              background: i % 2 === 0 ? theme.bg : theme.surface,
              borderBottom: `1px solid ${theme.border}`,
            }}
          >
            <div style={{ padding: "20px 16px", flex: 1 }}>
              <h2
                style={{
                  fontFamily: tokens.fontDisplay,
                  fontSize: 16,
                  fontWeight: 700,
                  color: theme.text,
                  marginBottom: 8,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  fontSize: 10,
                  color: theme.muted,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {item.body}
              </p>
            </div>
            <div
              style={{
                position: "relative",
                minHeight: 120,
                overflow: "hidden",
                background: theme.accentSoft,
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    inset: 0,
                  }}
                />
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}

// ─── Rich multi-column footer (Interledger footer inspired) ───────

export type FooterColumn = { title: string; links: string[] };

export function RichFooter({
  label,
  tagline,
  theme,
  tokens,
  columns,
}: {
  label: string;
  tagline: string;
  theme: Theme;
  tokens: FamilyTokens;
  columns: FooterColumn[];
}) {
  const r = tokens.radius;
  return (
    <footer
      style={{
        background: theme.surface,
        borderTop: `1px solid ${theme.border}`,
        padding: "20px 16px 14px",
      }}
    >
      {/* Top: subscribe + contact */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginBottom: 16,
          paddingBottom: 16,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 4,
            }}
          >
            Stay up to date
          </div>
          <div
            style={{
              fontSize: 8,
              color: theme.muted,
              marginBottom: 6,
              lineHeight: 1.5,
            }}
          >
            News and updates in your inbox.
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <div
              style={{
                flex: 1,
                background: theme.bg,
                border: `1px solid ${theme.border}`,
                borderRadius: r.sm,
                height: 24,
              }}
            />
            <div
              style={{
                background: theme.accent,
                color: "#fff",
                borderRadius: r.sm,
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                fontSize: 8,
                fontWeight: 600,
              }}
            >
              Subscribe
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 4,
            }}
          >
            Contact us
          </div>
          <div
            style={{
              fontSize: 8,
              color: theme.muted,
              marginBottom: 6,
              lineHeight: 1.5,
            }}
          >
            Have a question? We have answers.
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              border: `1px solid ${theme.border}`,
              padding: "4px 10px",
              borderRadius: r.sm,
              fontSize: 8,
              fontWeight: 600,
              color: theme.text,
            }}
          >
            Contact us <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>

      {/* Nav columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(columns.length, 3)}, 1fr)`,
          gap: 10,
          marginBottom: 14,
        }}
      >
        {columns.slice(0, 3).map((col) => (
          <div key={col.title}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: theme.text,
                marginBottom: 6,
              }}
            >
              {col.title}
            </div>
            {col.links.map((link) => (
              <div
                key={link}
                style={{
                  fontSize: 8,
                  color: theme.muted,
                  marginBottom: 3,
                }}
              >
                {link}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          paddingTop: 10,
          borderTop: `1px solid ${theme.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: tokens.fontDisplay,
            fontSize: 8,
            fontWeight: 700,
            color: theme.muted,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 7,
            color: theme.muted,
          }}
        >
          © 2026
        </span>
      </div>
    </footer>
  );
}

// ─── Compact one-page layout ──────────────────────────────────────
// For single-page products: contact CTA visible on first screen,
// brief about section, contact info, nothing else.

export function CompactOnePage({
  example,
  tokens,
}: {
  example: ProductExample;
  tokens: FamilyTokens;
}) {
  const { theme, label, tagline, exampleDescription, heroImage, exampleName } =
    example;
  const r = tokens.radius;
  const isDark = theme.bg.startsWith("#0") || theme.bg.startsWith("#1");
  const domain = label.toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <div
      style={{
        fontFamily: tokens.fontBody,
        background: theme.bg,
        color: theme.text,
        minHeight: "100%",
        fontSize: 12,
        lineHeight: 1.5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Nav with contact button visible first */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          background: theme.nav,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <span
          style={{
            fontFamily: tokens.fontDisplay,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "-0.02em",
            color: theme.text,
          }}
        >
          {label}
        </span>
        <span
          style={{
            background: theme.accent,
            color: "#fff",
            padding: "4px 12px",
            borderRadius: r.sm,
            fontSize: 9,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Phone className="w-2.5 h-2.5" /> Contact
        </span>
      </nav>

      {/* Hero — contact CTA on first screen */}
      <section
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "32px 16px",
          overflow: "hidden",
          minHeight: 280,
        }}
      >
        {heroImage && (
          <img
            src={heroImage}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.85))"
              : "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.7))",
          }}
        />
        <div style={{ position: "relative", maxWidth: 320 }}>
          <div
            style={{
              display: "inline-block",
              fontFamily: tokens.fontMono,
              fontSize: 7,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              padding: "2px 8px",
              borderRadius: r.sm,
              background: theme.accent,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            {exampleName}
          </div>
          <h1
            style={{
              fontFamily: tokens.fontDisplay,
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              marginBottom: 14,
              color: "#fff",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            {tagline}
          </h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                background: theme.accent,
                color: "#fff",
                padding: "8px 16px",
                borderRadius: r.sm,
                fontSize: 11,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Phone className="w-3 h-3" /> Get in touch
            </span>
            <span
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: r.sm,
                fontSize: 11,
                fontWeight: 500,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(4px)",
              }}
            >
              Learn more
            </span>
          </div>
        </div>
      </section>

      {/* About section — brief, nothing else */}
      <section style={{ padding: "28px 16px", background: theme.surface }}>
        <div
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 8,
            fontWeight: 600,
            textTransform: tokens.textTransformLabels as "uppercase" | "none",
            letterSpacing: tokens.letterSpacingLabels,
            color: theme.muted,
            marginBottom: 10,
          }}
        >
          About
        </div>
        <p
          style={{
            fontSize: 11,
            color: theme.text,
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {exampleDescription}
        </p>
      </section>

      {/* Contact info — just the essentials */}
      <section
        style={{
          padding: "24px 16px",
          background: theme.bg,
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <div
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 8,
            fontWeight: 600,
            textTransform: tokens.textTransformLabels as "uppercase" | "none",
            letterSpacing: tokens.letterSpacingLabels,
            color: theme.muted,
            marginBottom: 14,
          }}
        >
          Contact
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: r.md,
                background: `${theme.accent}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Phone className="w-4 h-4" style={{ color: theme.accent }} />
            </div>
            <div>
              <div style={{ fontSize: 9, color: theme.muted, marginBottom: 1 }}>
                Call us
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: theme.text,
                }}
              >
                (555) 123-4567
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: r.md,
                background: `${theme.accent}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Mail className="w-4 h-4" style={{ color: theme.accent }} />
            </div>
            <div>
              <div style={{ fontSize: 9, color: theme.muted, marginBottom: 1 }}>
                Email us
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.text,
                }}
              >
                hello@{domain}.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer
        style={{
          padding: "12px 16px",
          borderTop: `1px solid ${theme.border}`,
          background: theme.surface,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: tokens.fontDisplay,
            fontSize: 9,
            fontWeight: 700,
            color: theme.muted,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 7,
            color: theme.muted,
          }}
        >
          © 2026
        </span>
      </footer>
    </div>
  );
}
