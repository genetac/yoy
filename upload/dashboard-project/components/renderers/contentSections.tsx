import { Award, TrendingUp, Briefcase, GraduationCap, Mail, Timer, Users, ArrowUpRight } from "lucide-react";
import type { FamilyTokens } from "@/data/designFamilies";

// Detects content patterns in example features and renders them as
// real visual sections (score circles, skill bars, achievement stats,
// certificate badges, career timelines) instead of plain text bullets.

type Theme = {
  bg: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
};

function hasAny(features: string[], keywords: string[]): boolean {
  return features.some((f) => keywords.some((k) => f.toLowerCase().includes(k.toLowerCase())));
}

// ─── Quiz / Assessment result card ────────────────────────────────

function ScoreCircle({ score, color }: { score: number; color: string }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
      <svg viewBox="0 0 56 56" style={{ width: 56, height: 56, transform: "rotate(-90deg)" }}>
        <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="4" />
        <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color }}>
        {score}
      </div>
    </div>
  );
}

function SkillBar({ label, level, color, mono }: { label: string; level: number; color: string; mono: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
        <span style={{ fontSize: 9, fontWeight: 600, color: "inherit" }}>{label}</span>
        <span style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, color }}>{level}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(0,0,0,0.08)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${level}%`, height: "100%", background: color, borderRadius: 999 }} />
      </div>
    </div>
  );
}

export function QuizResultSection({ features, theme, tokens }: { features: string[]; theme: Theme; tokens: FamilyTokens }) {
  // Extract question count from features like "10 questions" or "20 questions"
  const qMatch = features.find((f) => /\d+\s*question/i.test(f))?.match(/(\d+)/);
  const questionCount = qMatch ? parseInt(qMatch[1], 10) : 10;
  const score = 78;
  const skills = [
    { label: "Technical Knowledge", level: 82 },
    { label: "Problem Solving", level: 71 },
    { label: "Best Practices", level: 88 },
    { label: "Communication", level: 64 },
  ];

  return (
    <section style={{ padding: "20px 16px", background: theme.surface, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: tokens.letterSpacingLabels, color: theme.muted, marginBottom: 12 }}>
        Your Assessment Result
      </div>
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
        <ScoreCircle score={score} color={theme.accent} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: tokens.fontDisplay, fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 2 }}>
            {score >= 80 ? "Expert Level" : score >= 60 ? "Proficient" : "Developing"}
          </div>
          <div style={{ fontSize: 9, color: theme.muted, lineHeight: 1.5 }}>
            Based on {questionCount} questions across {skills.length} skill areas. You scored in the top 23% of all assessments.
          </div>
        </div>
      </div>
      <div style={{ fontFamily: tokens.fontMono, fontSize: 7, fontWeight: 600, textTransform: "uppercase", letterSpacing: tokens.letterSpacingLabels, color: theme.muted, marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${theme.border}` }}>
        Skill Breakdown
      </div>
      {skills.map((s) => (
        <SkillBar key={s.label} label={s.label} level={s.level} color={theme.accent} mono={tokens.fontMono} />
      ))}
    </section>
  );
}

// ─── Resume achievement stats + certificates + career timeline ────

// ─── Certificate badge row ────────────────────────────────────────

function CertificateBadge({ name, issuer, color, mono }: { name: string; issuer: string; color: string; mono: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "rgba(0,0,0,0.02)", border: `1px solid ${color}25`, borderRadius: 8, marginBottom: 6 }}>
      <div style={{ width: 24, height: 24, borderRadius: 6, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Award className="w-3 h-3" style={{ color }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "inherit", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
        <div style={{ fontFamily: mono, fontSize: 7, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>{issuer}</div>
      </div>
    </div>
  );
}

export function ResumeAchievementSection({ features, theme, tokens }: { features: string[]; theme: Theme; tokens: FamilyTokens }) {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "$2.4B", label: "Revenue Managed" },
    { value: "47", label: "Teams Led" },
    { value: "98%", label: "Retention Rate" },
  ];
  const certificates = [
    { name: "PMP Certification", issuer: "PMI · 2024" },
    { name: "Executive Leadership", issuer: "Wharton · 2023" },
    { name: "Strategic Mgmt", issuer: "Harvard Online · 2022" },
  ];
  const career = [
    { role: "VP Operations", company: "Meridian Corp", period: "2021 — Present", detail: "Led 120-person org through 3x revenue growth." },
    { role: "Director of Strategy", company: "Atlas Holdings", period: "2016 — 2021", detail: "Built strategy team from 0 to 24 analysts." },
    { role: "Senior Manager", company: "Kearney", period: "2011 — 2016", detail: "Advised 18 Fortune 500 clients on operations." },
  ];

  return (
    <>
      {/* Achievement statistics */}
      <section style={{ padding: "18px 16px", background: theme.surface, borderTop: `1px solid ${theme.border}` }}>
        <div style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: tokens.letterSpacingLabels, color: theme.muted, marginBottom: 12, display: "flex", alignItems: "center", gap: 5 }}>
          <TrendingUp className="w-3 h-3" style={{ color: theme.accent }} /> Achievement Statistics
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ padding: "10px 8px", background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: tokens.radius.md, textAlign: "center" }}>
              <div style={{ fontFamily: tokens.fontDisplay, fontSize: 18, fontWeight: 700, color: theme.accent, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 8, color: theme.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section style={{ padding: "16px 16px" }}>
        <div style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: tokens.letterSpacingLabels, color: theme.muted, marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
          <Award className="w-3 h-3" style={{ color: theme.accent }} /> Certifications
        </div>
        {certificates.map((c) => (
          <CertificateBadge key={c.name} name={c.name} issuer={c.issuer} color={theme.accent} mono={tokens.fontMono} />
        ))}
      </section>

      {/* Career timeline */}
      <section style={{ padding: "4px 16px 20px" }}>
        <div style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: tokens.letterSpacingLabels, color: theme.muted, marginBottom: 12, display: "flex", alignItems: "center", gap: 5 }}>
          <Briefcase className="w-3 h-3" style={{ color: theme.accent }} /> Career Highlights
        </div>
        <div style={{ position: "relative", paddingLeft: 16 }}>
          <div style={{ position: "absolute", left: 3, top: 4, bottom: 4, width: 1, background: theme.border }} />
          {career.map((c, i) => (
            <div key={i} style={{ position: "relative", marginBottom: i < career.length - 1 ? 14 : 0 }}>
              <div style={{ position: "absolute", left: -16, top: 4, width: 7, height: 7, borderRadius: 999, background: theme.accent, border: `2px solid ${theme.surface}` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: theme.text }}>{c.role}</span>
                <span style={{ fontFamily: tokens.fontMono, fontSize: 7, color: theme.muted }}>{c.period}</span>
              </div>
              <div style={{ fontSize: 9, fontWeight: 600, color: theme.accent, marginBottom: 3 }}>{c.company}</div>
              <div style={{ fontSize: 9, color: theme.muted, lineHeight: 1.5 }}>{c.detail}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── Training certificate preview ────────────────────────────────

export function CourseCertificateSection({ features, theme, tokens }: { features: string[]; theme: Theme; tokens: FamilyTokens }) {
  const lessonMatch = features.find((f) => /(\d+)\s*(video\s*)?lesson/i.test(f))?.match(/(\d+)/);
  const lessons = lessonMatch ? parseInt(lessonMatch[1], 10) : 5;
  return (
    <section style={{ padding: "18px 16px", background: theme.surface, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: tokens.letterSpacingLabels, color: theme.muted, marginBottom: 12, display: "flex", alignItems: "center", gap: 5 }}>
        <GraduationCap className="w-3 h-3" style={{ color: theme.accent }} /> Course Completion
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: 8, background: `${theme.accent}12`, border: `2px solid ${theme.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Award className="w-6 h-6" style={{ color: theme.accent }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: tokens.fontDisplay, fontSize: 12, fontWeight: 700, color: theme.text, marginBottom: 2 }}>Certificate of Completion</div>
          <div style={{ fontSize: 9, color: theme.muted, lineHeight: 1.5 }}>{lessons} lessons · {features.length} modules · Verified certificate upon completion</div>
        </div>
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 4 }}>
        {Array.from({ length: Math.min(lessons, 6) }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < 4 ? theme.accent : "rgba(0,0,0,0.08)" }} />
        ))}
      </div>
      <div style={{ fontFamily: tokens.fontMono, fontSize: 7, color: theme.muted, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>4 of {lessons} completed</div>
    </section>
  );
}

// ─── Live examples: translate promised features into visible UI ────

export function LiveFeatureProof({ features, theme, tokens }: { features: string[]; theme: Theme; tokens: FamilyTokens }) {
  const lower = features.join(" ").toLowerCase();
  const hasCountdown = lower.includes("countdown") || lower.includes("timer");
  const hasEmail = lower.includes("email") || lower.includes("newsletter") || lower.includes("capture");
  const hasProof = lower.includes("social proof") || lower.includes("testimonial") || lower.includes("rating");
  const hasProgress = lower.includes("progress") || lower.includes("tracking") || lower.includes("chart");
  const hasForm = lower.includes("form") || lower.includes("selector") || lower.includes("slider");

  return (
    <section style={{ padding: "18px 16px", borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, background: theme.bg }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <div style={{ fontFamily: tokens.fontMono, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: tokens.letterSpacingLabels, color: theme.muted }}>Working components</div>
        <div style={{ fontFamily: tokens.fontMono, fontSize: 7, color: theme.accent }}>LIVE PREVIEW</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: hasCountdown || hasEmail ? "1fr 1fr" : "1fr", gap: 6 }}>
        {hasCountdown && (
          <div style={{ padding: 10, borderRadius: tokens.radius.md, background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: theme.accent, fontFamily: tokens.fontMono, fontSize: 8, textTransform: "uppercase", marginBottom: 7 }}><Timer className="w-3 h-3" /> Launch window</div>
            <div style={{ fontFamily: tokens.fontDisplay, fontSize: 20, fontWeight: 700, letterSpacing: "-0.04em", color: theme.text }}>04:18:32</div>
            <div style={{ fontSize: 8, color: theme.muted, marginTop: 2 }}>Early access closes tonight</div>
          </div>
        )}
        {hasEmail && (
          <div style={{ padding: 10, borderRadius: tokens.radius.md, background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: theme.accent, fontFamily: tokens.fontMono, fontSize: 8, textTransform: "uppercase", marginBottom: 7 }}><Mail className="w-3 h-3" /> Early access list</div>
            <div style={{ display: "flex", gap: 4 }}><div style={{ flex: 1, height: 24, border: `1px solid ${theme.border}`, borderRadius: tokens.radius.sm, color: theme.muted, fontSize: 8, display: "flex", alignItems: "center", padding: "0 7px" }}>you@example.com</div><div style={{ background: theme.accent, color: "#fff", borderRadius: tokens.radius.sm, padding: "0 8px", display: "flex", alignItems: "center", fontSize: 8, fontWeight: 700 }}>Join</div></div>
            <div style={{ fontSize: 8, color: theme.muted, marginTop: 5 }}>2,481 people already inside</div>
          </div>
        )}
        {hasProof && (
          <div style={{ padding: 10, borderRadius: tokens.radius.md, background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: theme.accent, fontFamily: tokens.fontMono, fontSize: 8, textTransform: "uppercase", marginBottom: 6 }}><Users className="w-3 h-3" /> Trusted by teams</div>
            <div style={{ fontFamily: tokens.fontDisplay, fontSize: 13, color: theme.text, marginBottom: 4 }}>“Finally, a system we actually use.”</div>
            <div style={{ fontSize: 8, color: theme.muted }}>★★★★★ &nbsp; 4.9 average · 340 verified customers</div>
          </div>
        )}
        {hasProgress && (
          <div style={{ padding: 10, borderRadius: tokens.radius.md, background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: tokens.fontMono, fontSize: 8, color: theme.muted, marginBottom: 7 }}><span>Progress this week</span><span style={{ color: theme.accent }}>+18.4% <ArrowUpRight className="w-3 h-3" style={{ display: "inline" }} /></span></div>
            <div style={{ display: "flex", alignItems: "end", gap: 3, height: 30 }}>{[35, 48, 42, 65, 58, 78, 92].map((height, i) => <div key={i} style={{ flex: 1, height: `${height}%`, background: i === 6 ? theme.accent : `${theme.accent}55`, borderRadius: "3px 3px 0 0" }} />)}</div>
          </div>
        )}
        {hasForm && !hasCountdown && !hasEmail && !hasProof && !hasProgress && (
          <div style={{ padding: 10, borderRadius: tokens.radius.md, background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div style={{ fontFamily: tokens.fontMono, fontSize: 8, color: theme.muted, textTransform: "uppercase", marginBottom: 7 }}>Interactive preview</div>
            <div style={{ display: "flex", gap: 5 }}>{features.slice(0, 3).map((feature) => <div key={feature} style={{ flex: 1, padding: "7px 6px", border: `1px solid ${theme.border}`, borderRadius: tokens.radius.sm, fontSize: 8, color: theme.text }}>{feature}</div>)}</div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Detector: returns which enriched sections to show ────────────

export type EnrichedSections = {
  quizResult: boolean;
  resumeAchievement: boolean;
  courseCertificate: boolean;
};

export function detectEnrichedSections(features: string[]): EnrichedSections {
  return {
    quizResult: hasAny(features, ["score result", "skill breakdown", "questions", "readiness score", "health score", "type result", "strengths report", "gap analysis"]),
    resumeAchievement: hasAny(features, ["achievement format", "leadership focus", "classic serif", "executive", "skills matrix", "project highlights"]),
    courseCertificate: hasAny(features, ["certificate"]) && !hasAny(features, ["achievement format"]),
  };
}

export function EnrichedContentSections({ features, theme, tokens }: { features: string[]; theme: Theme; tokens: FamilyTokens }) {
  const det = detectEnrichedSections(features);
  return (
    <>
      {det.quizResult && <QuizResultSection features={features} theme={theme} tokens={tokens} />}
      {det.resumeAchievement && <ResumeAchievementSection features={features} theme={theme} tokens={tokens} />}
      {det.courseCertificate && <CourseCertificateSection features={features} theme={theme} tokens={tokens} />}
    </>
  );
}
