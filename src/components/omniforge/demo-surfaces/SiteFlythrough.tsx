"use client";

/* ════════════════════════════════════════════════════════════════════
   SiteFlythrough (Website Kit archetypes) — build plan v3 · P3
   tour (auto, 25s, pausable) → form → confirmed. Renders the kit's
   five authored pages as a scrollable mini-site, then a working
   booking form with validation. No network; no send.
   ════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Pause, Play, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import type { DemoSurfaceProps, SiteFlythroughDemoContent } from "./types";
import { DemoEndCard } from "./QuizDemo";
import { cn } from "@/lib/utils";

type Phase = "tour" | "form" | "confirmed";

const SECTION_ICON: Record<string, string> = {
  hero: "◈", services: "▤", proof: "★", team: "◉", booking: "✎", hours: "◷", gallery: "▣",
};

export function SiteFlythrough({ offer, content, onComplete }: DemoSurfaceProps) {
  const site = content as SiteFlythroughDemoContent;
  const [phase, setPhase] = useState<Phase>("tour");
  const [pageIdx, setPageIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedRef = useRef(false);

  const totalPages = site.pages.length;
  const page = site.pages[Math.max(0, Math.min(pageIdx, totalPages - 1))];

  /* Auto-scroll: 25s across 5 pages, pausable, reduced-motion safe */
  useEffect(() => {
    if (phase !== "tour" || !playing) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // manual browsing only
    const started = performance.now();
    const DURATION = 25_000;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.max(0, Math.min(1, (t - started) / DURATION));
      setProgress(p);
      setPageIdx(Math.max(0, Math.min(totalPages - 1, Math.floor(p * totalPages))));
      if (p >= 1) {
        setPhase("form");
        onComplete?.({ kind: "site", tour: "completed" });
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
     
  }, [phase, playing]);

  const gotoForm = () => {
    if (!startedRef.current) startedRef.current = true;
    setPhase("form");
    onComplete?.({ kind: "site", tour: "skipped-to-form" });
  };

  const submit = () => {
    const errs: Record<string, string> = {};
    site.bookingFields.forEach((f) => {
      const v = (form[f.key] ?? "").trim();
      if (!v) errs[f.key] = "Required";
      else if (f.type === "tel" && !/^[+\d][\d\s\-()]{5,}$/.test(v)) errs[f.key] = "Enter a reachable phone number";
    });
    setErrors(errs);
    if (Object.keys(errs).length === 0) setPhase("confirmed");
  };

  return (
    <div className="flex min-h-[440px] flex-col">
      {phase === "tour" && (
        <>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{site.intro}</p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-[11px] font-semibold text-foreground hover:bg-muted"
                aria-label={playing ? "Pause tour" : "Play tour"}
              >
                {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
                {playing ? "Pause" : "Play"}
              </button>
              <button
                onClick={() => { setPageIdx((i) => (i - 1 + totalPages) % totalPages); setPlaying(false); }}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => { setPageIdx((i) => (i + 1) % totalPages); setPlaying(false); }}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Next page"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
              <button onClick={gotoForm} className="inline-flex h-8 items-center rounded-lg bg-primary px-3 text-[11px] font-semibold text-primary-foreground shadow-sm">
                Skip to booking
              </button>
            </div>
          </div>

          {/* Progress rail */}
          <div className="mb-3 flex h-1 gap-1" aria-hidden="true">
            {site.pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setPageIdx(i); setPlaying(false); }}
                className={cn(
                  "h-full flex-1 rounded-full transition-colors",
                  i < pageIdx ? "bg-primary" : i === pageIdx ? "bg-primary" : "bg-border"
                )}
              />
            ))}
          </div>

          {/* Mini-site viewport */}
          <div className="grain-overlay flex-1 overflow-hidden rounded-xl border border-border bg-white shadow-inner dark:bg-zinc-950">
            <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-100 px-3 py-1.5 dark:border-zinc-800 dark:bg-zinc-900" aria-hidden="true">
              <span className="size-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="size-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="ml-2 font-mono-forge text-[9px] uppercase tracking-wider text-zinc-400">
                {site.siteName.toLowerCase().replace(/\s+/g, "")}.example/{page.id}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="max-h-[380px] space-y-5 overflow-y-auto p-6"
              >
                {page.sections.map((s, i) => (
                  <motion.section
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.3 }}
                    className="mx-auto max-w-md"
                  >
                    <span className="mb-1 block font-mono-forge text-[9px] uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">
                      {SECTION_ICON[s.kind]} {s.kind}
                    </span>
                    <h4 className="text-lg font-bold leading-snug text-zinc-900 dark:text-zinc-50">{s.heading}</h4>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{s.copy}</p>
                    {s.kind === "hero" && (
                      <span className="mt-3 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white dark:bg-amber-500 dark:text-zinc-950">
                        {site.vertical === "restaurant" ? "Reserve a table" : site.vertical === "law" ? "Request a consultation" : site.vertical === "gym" ? "Start training" : "Book a visit"}
                      </span>
                    )}
                    {s.kind === "booking" && (
                      <button onClick={gotoForm} className="mt-3 inline-block rounded-lg border-2 border-zinc-900 px-4 py-2 text-xs font-bold text-zinc-900 dark:border-amber-400 dark:text-amber-300">
                        Open the booking form →
                      </button>
                    )}
                  </motion.section>
                ))}
                <p className="pt-2 text-center font-mono-forge text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                  {pageIdx + 1} / {totalPages} · {page.title}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}

      {phase === "form" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col"
        >
          <h4 className="text-base font-bold text-foreground">
            {site.vertical === "restaurant" ? "Reserve a table" : site.vertical === "law" ? "Request a consultation" : site.vertical === "gym" ? "Claim your trial week" : "Book a visit"}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            The working form from the kit — validated in this tab, nothing is sent.
          </p>
          <div className="mt-4 grid gap-3 min-[560px]:grid-cols-2">
            {site.bookingFields.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-1 block text-xs font-semibold text-foreground">{f.label}</span>
                {f.type === "select" ? (
                  <select
                    value={form[f.key] ?? ""}
                    onChange={(e) => { setForm((p) => ({ ...p, [f.key]: e.target.value })); setErrors((p) => ({ ...p, [f.key]: "" })); }}
                    className={cn(
                      "h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground",
                      errors[f.key] ? "border-destructive" : "border-border"
                    )}
                  >
                    <option value="">Choose…</option>
                    {f.options?.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={f.type}
                    value={form[f.key] ?? ""}
                    onChange={(e) => { setForm((p) => ({ ...p, [f.key]: e.target.value })); setErrors((p) => ({ ...p, [f.key]: "" })); }}
                    className={cn(
                      "h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground",
                      errors[f.key] ? "border-destructive" : "border-border"
                    )}
                  />
                )}
                {errors[f.key] && (
                  <span className="mt-1 block text-[11px] font-medium text-destructive">{errors[f.key]}</span>
                )}
              </label>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-5">
            <button
              onClick={() => { setPhase("tour"); setPlaying(false); }}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono-forge text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3" aria-hidden="true" /> Back to tour
            </button>
            <button
              onClick={submit}
              className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm active:translate-y-px"
            >
              {site.vertical === "law" ? "Send request" : "Confirm booking"}
            </button>
          </div>
        </motion.div>
      )}

      {phase === "confirmed" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-1 flex-col items-center justify-center py-6 text-center"
        >
          <span className="wax-seal seal-sheen mb-4 flex size-14 items-center justify-center rounded-full text-white">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h4 className="text-lg font-bold text-foreground">Confirmed — demo flow</h4>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">
            In the full kit this state is followed by the authored confirmation email (and a
            T-24h reminder) from <span className="font-mono-forge">02-*/confirmation-emails.md</span> —
            the anti-no-show stack ships written, not described.
          </p>
          <DemoEndCard
            offer={offer}
            onRestart={() => { setPhase("tour"); setForm({}); setErrors({}); setPlaying(false); setPageIdx(0); }}
          />
        </motion.div>
      )}
    </div>
  );
}
