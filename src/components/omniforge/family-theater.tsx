"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { familyMeta, familyOrder } from "./family-visuals";
import { LiveBars, LiveSparkline, CountUp, PulseDot } from "./animated-primitives";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   Family Theater — the interactive showpiece of the home view.

   A live, auto-cycling showcase that plays each design family like a
   looping product film: large animated miniature on the left, editorial
   copy + sample products on the right, tab rail with progress bar below.

   - Auto-advances every 5.2s; pauses on hover / focus / after manual pick
   - Progress bar is pure CSS transform (GPU-friendly, pausable)
   - Full tablist semantics with arrow-key navigation
   - Reduced motion: no auto-advance, no progress, instant swaps
   ════════════════════════════════════════════════════════════════════ */

const CYCLE_MS = 5200;

export type TheaterPanel = {
  familyId: string;
  productCount: number;
  exampleCount: number;
  sampleProducts: string[];
};

/* ── Large animated miniatures (aria-hidden, presentation only) ───── */

function TheaterMicro({ accent }: { accent: string }) {
  const buyers = ["@mira", "@jonas", "@ana", "@sam", "@leo"];
  const [buyerIdx, setBuyerIdx] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setBuyerIdx((i) => (i + 1) % buyers.length), 2600);
    return () => window.clearInterval(id);
     
  }, [reduced]);

  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono-forge text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
          Instant download · Gumroad-style
        </span>
        <PulseDot className="text-emerald-500" label="Selling now" />
      </div>
      <div>
        <div className="font-display text-3xl font-bold leading-[1.05] text-foreground">
          Notion OS
          <br />
          Template Pack
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="font-display text-3xl font-bold" style={{ color: accent }}>
              $19
            </div>
            <div className="font-mono-forge text-[9px] uppercase tracking-wider text-muted-foreground">
              4,000+ makers · demo figure
            </div>
          </div>
          <LiveBars color={accent} bars={16} className="h-12" seed={11} intervalMs={1400} />
        </div>
      </div>
      {/* Purchase toast — the GIF moment */}
      <div className="h-6" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={buyerIdx}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-2.5 py-1 font-mono-forge text-[10px] text-muted-foreground shadow-sm"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-foreground">{buyers[buyerIdx]}</span> bought this — sample event
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TheaterIndustry({ accent }: { accent: string }) {
  const quotes = [
    "A room that breathes with the season.",
    "Slow mornings, honest ingredients.",
    "Craft you can taste in the details.",
    "Fire, patience, and good bread.",
  ];
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % quotes.length), 3400);
    return () => window.clearInterval(id);
     
  }, [reduced]);

  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono-forge text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Est. 2012 · Portland
        </span>
        <span className="font-mono-forge text-[10px]" style={{ color: accent }}>
          ★ 4.9 · sample rating
        </span>
      </div>
      <blockquote className="font-serif-editorial text-[26px] italic leading-snug text-foreground">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            “{quotes[i]}”
          </motion.span>
        </AnimatePresence>
      </blockquote>
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono-forge text-[9px] font-bold uppercase tracking-[0.14em] text-white"
          style={{ background: accent }}
        >
          Book a table
        </span>
        {["Fri 19:00", "Sat 12:30", "Sun 18:00"].map((slot, idx) => (
          <span
            key={slot}
            className={cn(
              "rounded border px-2 py-1 font-mono-forge text-[9px]",
              idx === 0
                ? "border-transparent text-white"
                : "border-border text-muted-foreground"
            )}
            style={idx === 0 ? { background: `${accent}44` } : undefined}
          >
            {slot}
          </span>
        ))}
        <span className="h-px flex-1" style={{ background: `${accent}55` }} />
      </div>
    </div>
  );
}

function TheaterData({ accent }: { accent: string }) {
  const rows = [
    { k: " OMX-USD", v: "41,207.50", d: "+2.41%" },
    { k: " THROUGHPUT", v: "12.4k/s", d: "+0.8%" },
    { k: " P99 LATENCY", v: "184ms", d: "-12ms" },
    { k: " ERRORS", v: "0.02%", d: "stable" },
  ];
  const [hot, setHot] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setHot((h) => (h + 1) % rows.length), 1900);
    return () => window.clearInterval(id);
     
  }, [reduced]);

  return (
    <div className="flex h-full flex-col justify-between p-5 font-mono-forge">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>OMX · LIVE FEED · DEMO DATA</span>
        <PulseDot label="Streaming" />
      </div>
      <div className="grid grid-cols-[1fr_auto] items-end gap-4">
        <div>
          <div className="text-3xl font-bold tracking-tight" style={{ color: accent }}>
            <CountUp value={41207} />
            <span className="text-base"> USD</span>
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">synthetic feed · not a real quote</div>
        </div>
        <LiveSparkline color={accent} width={230} height={44} seed={21} strokeWidth={1.8} />
      </div>
      <div className="divide-y divide-border/60 overflow-hidden rounded-md border border-border/60">
        {rows.map((r, i) => (
          <div
            key={r.k}
            className={cn(
              "flex items-center justify-between px-2.5 py-1 text-[10px] transition-colors duration-300",
              hot === i ? "bg-muted/70" : "bg-transparent"
            )}
          >
            <span className={cn("tracking-wider", hot === i ? "text-foreground" : "text-muted-foreground")}>{r.k}</span>
            <span className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{r.v}</span>
              <span className="text-emerald-500">{r.d}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TheaterSaas({ accent }: { accent: string }) {
  const words = ["faster", "calmer", "together", "in public"];
  const [wordIdx, setWordIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setTyped(words[0]);
      return;
    }
    let wi = 0;
    let ci = 0;
    let deleting = false;
    let timer: number;
    const tick = () => {
      const word = words[wi];
      if (!deleting) {
        ci++;
        setTyped(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1500);
          return;
        }
      } else {
        ci--;
        setTyped(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      timer = window.setTimeout(tick, deleting ? 40 : 85);
    };
    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
     
  }, [reduced]);

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden p-5">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(120% 90% at 85% -10%, ${accent}30, transparent 60%), radial-gradient(90% 80% at 0% 110%, ${accent}1f, transparent 55%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between">
        <span className="rounded-md border border-border bg-background/80 px-2 py-1 font-mono-forge text-[9px] font-semibold text-muted-foreground">
          ⌘K command-first UI
        </span>
        <span className="font-mono-forge text-[10px] font-semibold" style={{ color: accent }}>
          14-day free trial
        </span>
      </div>
      <div className="relative">
        <div className="font-display text-[32px] font-bold leading-[1.08] tracking-tight text-foreground">
          Ship your product
          <br />
          <span style={{ color: accent }}>
            {typed}
            <span className="ml-0.5 inline-block h-6 w-[2px] translate-y-0.5 animate-[forge-caret_1.1s_steps(2)_infinite] bg-current align-middle" />
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <span
              className="rounded-lg px-3.5 py-2 text-[11px] font-bold text-white shadow-lg"
              style={{ background: accent, boxShadow: `0 8px 24px ${accent}55` }}
            >
              Start free
            </span>
            <span className="font-mono-forge text-[10px] text-muted-foreground underline underline-offset-4">
              Book a demo
            </span>
          </div>
          <LiveBars color={accent} bars={18} className="h-12" seed={31} intervalMs={1300} />
        </div>
      </div>
    </div>
  );
}

function TheaterEnterprise({ accent }: { accent: string }) {
  const logs = [
    { t: "09:41", who: " anne@acme.co", what: "approved Q4 budget" },
    { t: "09:38", who: " sso", what: "provisioned 3 seats" },
    { t: "09:31", who: " audit", what: "SOC 2 evidence refreshed" },
    { t: "09:24", who: " ops", what: "escalation resolved" },
  ];
  const [shown, setShown] = useState(1);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setShown((s) => (s % logs.length) + 1), 1800);
    return () => window.clearInterval(id);
  }, [reduced]);
  /* Reduced motion shows the complete log — derived, no sync setState. */
  const shownCount = reduced ? logs.length : shown;

  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono-forge text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Workspace · Q4 roll-out
        </span>
        <PulseDot label="Syncing" />
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { v: 24, s: "", l: "Units" },
          { v: 99.9, s: "%", l: "Uptime*", decimals: 1 },
          { v: 7, s: "", l: "Open risks" },
        ].map((k) => (
          <div key={k.l} className="rounded-lg border border-border/70 bg-background/60 px-3 py-2.5">
            <div className="font-display text-xl font-bold" style={{ color: accent }}>
              <CountUp value={k.v} suffix={k.s} />
            </div>
            <div className="mt-0.5 font-mono-forge text-[8px] uppercase tracking-wider text-muted-foreground">{k.l}</div>
          </div>
        ))}
      </div>
      <div className="space-y-1 font-mono-forge text-[10px]" aria-hidden="true">
        {logs.slice(0, shownCount).map((l) => (
          <motion.div
            key={l.t + l.what}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <span className="text-muted-foreground/60">{l.t}</span>
            <span className="font-semibold text-foreground">{l.who}</span>
            <span>{l.what}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-between font-mono-forge text-[9px] text-muted-foreground">
        <span>*illustrative · SSO · SOC 2 · GDPR</span>
        <span style={{ color: accent }}>Request demo →</span>
      </div>
    </div>
  );
}

const theaterVisuals: Record<string, React.ComponentType<{ accent: string }>> = {
  micro: TheaterMicro,
  "industry-warm": TheaterIndustry,
  "data-dense": TheaterData,
  "saas-product": TheaterSaas,
  "enterprise-platform": TheaterEnterprise,
};

/* ── The Theater ──────────────────────────────────────────────────── */

export function FamilyTheater({
  panels,
  onSelect,
}: {
  panels: TheaterPanel[];
  onSelect: (familyId: string) => void;
}) {
  const reduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusInside = useRef(false);

  const active = panels[activeIdx] ?? panels[0];
  const fm = familyMeta[active.familyId] ?? familyMeta.micro;
  const Visual = theaterVisuals[active.familyId] ?? TheaterMicro;

  /* Auto-advance — disabled for reduced motion or while paused */
  useEffect(() => {
    if (reduced || paused || focusInside.current) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % panels.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, panels.length, activeIdx]);

  const pick = useCallback((i: number, focus = false) => {
    setActiveIdx(i);
    if (focus) tabRefs.current[i]?.focus();
  }, []);

  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (activeIdx + dir + panels.length) % panels.length;
      pick(next, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      pick(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      pick(panels.length - 1, true);
    }
  };

  return (
    <section
      className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8"
      aria-label="Design family theater"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => {
        focusInside.current = true;
        setPaused(true);
      }}
      onBlur={() => {
        focusInside.current = false;
      }}
    >
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-lg font-bold text-foreground">Family theater</h2>
        <span className="font-mono-forge text-[11px] text-muted-foreground">
          live animated previews · auto-cycling
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono-forge text-[10px] text-muted-foreground/70">
          {reduced ? (
            "reduced motion: manual browsing"
          ) : paused ? (
            <>
              <Pause className="size-3" aria-hidden="true" /> paused — hover out to resume
            </>
          ) : (
            <>
              <Play className="size-3" aria-hidden="true" /> playing
            </>
          )}
        </span>
      </div>

      {/* Stage */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border transition-colors duration-500",
          fm.border
        )}
        style={{ background: `linear-gradient(135deg, ${fm.accent}0d, transparent 45%)` }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-700"
          style={{ background: `radial-gradient(90% 120% at 100% 0%, ${fm.glow}, transparent 60%)` }}
          aria-hidden="true"
        />

        <div className="relative grid gap-0 lg:grid-cols-[1.35fr_1fr]">
          {/* Visual stage */}
          <div className="relative min-h-[280px] border-b border-border/60 lg:border-b-0 lg:border-r" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.familyId}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Visual accent={fm.accent} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Copy panel */}
          <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.familyId}
                initial={{ opacity: 0, x: reduced ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 flex-col"
              >
                <div className="flex items-center gap-2">
                  <fm.icon className={cn("size-4", fm.text)} />
                  <span className={cn("font-mono-forge text-[9px] font-bold uppercase tracking-[0.16em]", fm.text)}>
                    {fm.short} family
                  </span>
                  <span className="ml-auto font-mono-forge text-[10px] text-muted-foreground">
                    {fm.recipe}
                  </span>
                </div>
                <h3 className="mt-2.5 font-display text-2xl font-bold leading-tight text-foreground">
                  {fm.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fm.blurb}</p>

                <div className="mt-4">
                  <div className="font-mono-forge text-[9px] uppercase tracking-[0.14em] text-muted-foreground/70">
                    What you can build
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {active.sampleProducts.map((p) => (
                      <span
                        key={p}
                        className="rounded-md border border-border bg-background/80 px-2 py-1 text-[11px] font-medium text-foreground/90"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => onSelect(active.familyId)}
                className={cn(
                  "group inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold text-foreground transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0"
                )}
                style={{ borderColor: `${fm.accent}55` }}
              >
                Browse {active.productCount} products
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              <span className="font-mono-forge text-[10px] text-muted-foreground">
                {active.exampleCount} examples
              </span>
            </div>
          </div>
        </div>

        {/* Tab rail */}
        <div
          role="tablist"
          aria-label="Design families"
          onKeyDown={onTablistKeyDown}
          className="relative flex overflow-x-auto border-t border-border bg-background/70 backdrop-blur"
        >
          {panels.map((p, i) => {
            const pm = familyMeta[p.familyId];
            const isActive = i === activeIdx;
            return (
              <button
                key={p.familyId}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                aria-selected={isActive}
                aria-controls="family-theater-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => pick(i)}
                className={cn(
                  "relative flex min-w-[120px] flex-1 items-center justify-center gap-2 px-3 py-3 text-xs font-semibold transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <pm.icon className={cn("size-3.5", isActive ? pm.text : undefined)} aria-hidden="true" />
                {pm.short}
                <span className="font-mono-forge text-[9px] font-normal text-muted-foreground/70">
                  {p.productCount}
                </span>
                {isActive && (
                  <>
                    <motion.span
                      layoutId="theater-tab-ink"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full"
                      style={{ background: pm.accent }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* progress bar (skipped for reduced motion) */}
                    {!reduced && !paused && (
                      <span
                        key={`p-${active.familyId}`}
                        className="forge-progress absolute inset-x-3 bottom-0 h-0.5 origin-left rounded-full"
                        style={{ background: `${pm.accent}66`, animationDuration: `${CYCLE_MS}ms` }}
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { familyOrder };
