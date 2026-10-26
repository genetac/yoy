import { useState } from "react";
import type { MockupConfig } from "@/data/businessTypes";

type Props = {
  config: MockupConfig;
};

function HeroImage({ src, gradient }: { src?: string; gradient: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div style={{ position: "absolute", inset: 0, background: gradient }} />;
  return (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

function Section({
  label,
  children,
  bg,
  border,
  py = 24,
}: {
  label?: string;
  children: React.ReactNode;
  bg?: string;
  border?: string;
  py?: number;
}) {
  return (
    <section
      style={{
        background: bg ?? "transparent",
        borderTop: border ? `1px solid ${border}` : undefined,
        borderBottom: border ? `1px solid ${border}` : undefined,
        padding: `${py}px 20px`,
      }}
    >
      {label && (
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 10,
            opacity: 0.5,
          }}
        >
          {label}
        </div>
      )}
      {children}
    </section>
  );
}

export function MockupRenderer({ config }: Props) {
  const { theme, tagline, heroImage, layout, showNewsletter, showTestimonials, showStats, showCTA, features, label, tier } =
    config;
  const isPremium = layout === "premium";
  const isStandard = layout === "standard";
  const isEnterprise = tier === "enterprise";
  const isElevated = isStandard || isPremium;

  const navItems = isEnterprise
    ? ["Platform", "Solutions", "Customers", "Pricing", "Docs", "Login"]
    : isPremium
    ? ["Home", "Services", "Work", "About", "Contact"]
    : isStandard
    ? ["Home", "Services", "About", "Contact"]
    : ["Home", "About", "Contact"];

  const badgeText = isEnterprise ? "Enterprise Platform" : isPremium ? "Premium Experience" : isStandard ? "Growth" : "Starter";

  return (
    <div
      style={{
        fontFamily: theme.font,
        background: theme.bg,
        color: theme.text,
        minHeight: "100%",
        fontSize: 12,
        lineHeight: 1.5,
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: isElevated ? "transparent" : theme.nav,
          borderBottom: isElevated ? "none" : `1px solid ${theme.border}`,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: isPremium || isEnterprise ? 4 : 999,
              background: theme.accent,
            }}
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: isElevated ? "0.02em" : 0,
              color: isElevated ? "#ffffff" : theme.text,
            }}
          >
            {label}
          </span>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 10, alignItems: "center" }}>
          {isElevated ? (
            <>
              {navItems.map((item) => (
                <span key={item} style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                  {item}
                </span>
              ))}
              <span
                style={{
                  background: theme.accent,
                  color: "#ffffff",
                  padding: "4px 12px",
                  borderRadius: 5,
                  fontWeight: 600,
                }}
              >
                {isEnterprise ? "Request Demo" : "Get Started"}
              </span>
            </>
          ) : (
            <>
              {navItems.map((item) => (
                <span key={item} style={{ color: theme.muted }}>
                  {item}
                </span>
              ))}
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      {isElevated && heroImage ? (
        <section
          style={{
            position: "relative",
            minHeight: isEnterprise ? 380 : 340,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <HeroImage src={heroImage} gradient={`linear-gradient(135deg, ${theme.accent}, ${theme.surface})`} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, rgba(0,0,0,${isEnterprise ? 0.72 : 0.65}) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)`,
            }}
          />
          <div style={{ position: "relative", maxWidth: 440, padding: "0 20px" }}>
            <div
              style={{
                display: "inline-block",
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 999,
                background: theme.accent,
                color: "#ffffff",
                marginBottom: 14,
              }}
            >
              {badgeText}
            </div>
            <h1
              style={{
                fontSize: isEnterprise ? 28 : 26,
                fontWeight: 700,
                lineHeight: 1.15,
                margin: 0,
                color: "#ffffff",
                marginBottom: 12,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 12px rgba(0,0,0,0.3)",
              }}
            >
              {tagline}
            </h1>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.85)",
                margin: "0 0 18px",
                lineHeight: 1.6,
                textShadow: "0 1px 8px rgba(0,0,0,0.3)",
              }}
            >
              {features.slice(0, isEnterprise ? 4 : 3).join(" • ")}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <span
                style={{
                  background: theme.accent,
                  color: "#ffffff",
                  padding: "8px 18px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                {isEnterprise ? "Request Demo →" : "Get Started →"}
              </span>
              <span
                style={{
                  border: `1px solid rgba(255,255,255,0.4)`,
                  color: "#ffffff",
                  padding: "8px 18px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 500,
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {isEnterprise ? "View Architecture" : "Learn More"}
              </span>
            </div>
          </div>
        </section>
      ) : (
        <section
          style={{
            position: "relative",
            minHeight: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            overflow: "hidden",
            backgroundColor: theme.bg,
          }}
        >
          <HeroImage src={heroImage} gradient={`linear-gradient(180deg, ${theme.accent}, ${theme.surface})`} />
          {heroImage && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 100%)`,
              }}
            />
          )}
          <div style={{ position: "relative", maxWidth: 460, padding: "0 20px" }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                margin: "0 0 8px",
                color: heroImage ? "#ffffff" : theme.text,
                lineHeight: 1.2,
                textShadow: heroImage ? "0 2px 12px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {tagline}
            </h1>
            <p
              style={{
                fontSize: 11,
                color: heroImage ? "rgba(255,255,255,0.85)" : theme.muted,
                margin: "0 0 14px",
                lineHeight: 1.6,
                textShadow: heroImage ? "0 1px 8px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {features.slice(0, 2).join(" • ")}
            </p>
            <span
              style={{
                display: "inline-block",
                background: theme.accent,
                color: "#ffffff",
                padding: "7px 18px",
                borderRadius: 5,
                fontSize: 10,
                fontWeight: 600,
              }}
            >
              Contact Us
            </span>
          </div>
        </section>
      )}

      {/* Stats bar (elevated only) */}
      {showStats && isElevated && (
        <Section bg={theme.surface} border={theme.border} py={18}>
          <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
            {(isEnterprise
              ? [
                  { value: "2M+", label: "Users" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "SOC 2", label: "Compliance" },
                  { value: "24/7", label: "Support" },
                ]
              : [
                  { value: "500+", label: "Clients" },
                  { value: "15yr", label: "Experience" },
                  { value: "98%", label: "Satisfaction" },
                  { value: "24/7", label: "Support" },
                ]
            ).map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: 18, fontWeight: 700, color: theme.accent }}>{stat.value}</div>
                <div
                  style={{
                    fontSize: 8,
                    color: theme.muted,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Features / Services grid */}
      <Section label={isElevated ? (isEnterprise ? "Platform Capabilities" : "What We Do") : undefined} py={24}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isElevated ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
            gap: 10,
          }}
        >
          {(isElevated ? features : features.slice(0, 4)).map((feature, i) => (
            <div
              key={i}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: isElevated ? 10 : 6,
                padding: 12,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: isElevated ? 6 : 4,
                  background: theme.accentSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                  fontSize: 10,
                  color: theme.accent,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 3, color: theme.text }}>{feature}</div>
              <div style={{ fontSize: 9, color: theme.muted }}>
                {isEnterprise
                  ? "Enterprise-grade module with audit trails, multi-tenancy, and API access."
                  : isPremium
                  ? "Comprehensive solution tailored to your needs and delivered with precision."
                  : isStandard
                  ? "Included with full setup, configuration, and ongoing support."
                  : "Basic offering."}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials (elevated only) */}
      {showTestimonials && isElevated && (
        <Section bg={theme.surface} border={theme.border} label={isEnterprise ? "Customer Stories" : "Client Stories"} py={24}>
          <div style={{ display: "flex", gap: 10, overflow: "hidden" }}>
            {(isEnterprise
              ? [
                  { name: "CTO, Fortune 500", role: "Technology Lead", quote: "Replaced 6 legacy systems. ROI in 4 months." },
                  { name: "VP Engineering", role: "Operations", quote: "The platform layer we needed for 10x growth." },
                ]
              : [
                  { name: "Sarah K.", role: "CEO, TechCorp", quote: "Absolutely transformed our business operations." },
                  { name: "James L.", role: "Founder, StartupX", quote: "The best investment we made this year." },
                ]
            ).map((t) => (
              <div
                key={t.name}
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  padding: 14,
                  borderRadius: 10,
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div style={{ fontSize: 18, color: theme.accent, lineHeight: 1, marginBottom: 6 }}>"</div>
                <div
                  style={{
                    fontSize: 10,
                    fontStyle: "italic",
                    color: theme.text,
                    marginBottom: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {t.quote}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      background: theme.accentSoft,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: theme.text }}>{t.name}</div>
                    <div style={{ fontSize: 8, color: theme.muted }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CTA (if enabled) */}
      {showCTA && (
        <Section py={24}>
          <div
            style={{
              background: isElevated ? theme.accent : theme.accentSoft,
              color: isElevated ? "#ffffff" : theme.text,
              borderRadius: isElevated ? 14 : 8,
              padding: 20,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
              {isEnterprise
                ? "Ready to modernize your operations?"
                : isPremium
                ? "Ready to transform your business?"
                : isStandard
                ? "Let's build something great together."
                : "Get in touch today!"}
            </div>
            <div style={{ fontSize: 10, marginBottom: 14, opacity: 0.85 }}>
              {isEnterprise
                ? "Schedule a demo with our platform team."
                : isPremium
                ? "Join hundreds of satisfied clients who took the leap."
                : isStandard
                ? "Get a free quote within 24 hours."
                : "We'd love to hear from you."}
            </div>
            <span
              style={{
                display: "inline-block",
                background: isElevated ? "#ffffff" : theme.accent,
                color: isElevated ? theme.accent : "#ffffff",
                padding: "8px 20px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {isEnterprise ? "Book a Demo" : isPremium ? "Book a Call" : "Contact Us"}
            </span>
          </div>
        </Section>
      )}

      {/* Newsletter (elevated only) */}
      {showNewsletter && isElevated && (
        <Section bg={theme.surface} border={theme.border} py={20}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
              {isEnterprise ? "Stay updated on platform releases" : "Stay in the loop"}
            </div>
            <div style={{ fontSize: 10, color: theme.muted, marginBottom: 12 }}>
              {isEnterprise ? "Product updates, changelog, and enterprise insights." : "Get updates, insights, and exclusive offers."}
            </div>
            <div style={{ display: "flex", gap: 6, maxWidth: 260, margin: "0 auto" }}>
              <div
                style={{
                  flex: 1,
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 6,
                  height: 30,
                }}
              />
              <div
                style={{
                  background: theme.accent,
                  color: "#ffffff",
                  borderRadius: 6,
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                Subscribe
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Footer */}
      <footer
        style={{
          background: theme.surface,
          borderTop: `1px solid ${theme.border}`,
          padding: "16px 20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: isElevated ? 3 : 999,
                  background: theme.accent,
                }}
              />
              <span style={{ fontWeight: 700, fontSize: 11 }}>{label}</span>
            </div>
            <div style={{ fontSize: 9, color: theme.muted, maxWidth: 180 }}>
              {isElevated ? tagline : "Your trusted local business."}
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {isElevated ? (
              (isEnterprise
                ? ["Platform", "Solutions", "Docs", "Security", "Company"]
                : ["Product", "Company", "Resources", "Legal"]
              ).map((col) => (
                <div key={col}>
                  <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 5, color: theme.text }}>{col}</div>
                  {[1, 2, 3].map((n) => (
                    <div key={n} style={{ fontSize: 8, color: theme.muted, marginBottom: 3 }}>
                      Link {n}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              ["Home", "About", "Contact"].map((item) => (
                <div key={item} style={{ fontSize: 9, color: theme.muted }}>
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
        <div
          style={{
            marginTop: 14,
            paddingTop: 10,
            borderTop: `1px solid ${theme.border}`,
            fontSize: 8,
            color: theme.muted,
            textAlign: "center",
          }}
        >
          © 2026 {label}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
