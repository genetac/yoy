"use client";

/* ════════════════════════════════════════════════════════════════════
   QuizDemo (Assessment archetypes) — build plan v3 · P3
   State machine: intro → q1 → q2 → q3 → scoring (600ms) → result.
   Weighted scoring: sum(chosen)/max × 100, four bands, sealed medal.
   Keyboard: 1–4 select, Enter continue, R restart. No network.
   ════════════════════════════════════════════════════════════════════ */

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw, ArrowRight } from "lucide-react";
import type { DemoSurfaceProps, QuizDemoContent } from "./types";
import { cn } from "@/lib/utils";

type Phase = "intro" | "q" | "scoring" | "result";

const BAND_STYLE: Record<string, string> = {
  Platinum: "text-cyan-600 dark:text-cyan-300",
  Gold: "text-amber-600 dark:text-amber-300",
  Silver: "text-slate-500 dark:text-slate-300",
  Bronze: "text-orange-700 dark:text-orange-400",
};

export function QuizDemo({ offer, content, onComplete }: DemoSurfaceProps) {
  const quiz = content as QuizDemoContent;
  /* The demo plays 3 of the authored questions; the ZIP ships all 25. */
  const picked = useMemo(
    () => [
      quiz.questions[Math.floor((quiz.questions.length / 2)) % quiz.questions.length],
      quiz.questions[0],
      quiz.questions[quiz.questions.length - 1],
    ].filter(Boolean),
    [quiz.questions]
  );
  const bands = useMemo(
    () => [...quiz.bands].sort((a, b) => b.min - a.min),
    [quiz.bands]
  );

  const [phase, setPhase] = useState<Phase>("intro");
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const restart = () => {
    setPhase("intro");
    setQi(0);
    setAnswers([]);
  };

  const pick = (oi: number) => {
    setAnswers((a) => [...a.slice(0, qi), oi]);
  };

  const next = () => {
    if (answers[qi] === undefined) return;
    if (qi < picked.length - 1) setQi(qi + 1);
    else setPhase("scoring");
  };

  const score = () => {
    const got = picked.reduce((n, q, i) => n + (q.options[answers[i]]?.weight ?? 0), 0);
    const max = picked.reduce((n, q) => n + Math.max(...q.options.map((o) => o.weight)), 0);
    return Math.round((got / Math.max(1, max)) * 100);
  };

  /* Scoring pause → result (600ms), then completion event */
  useEffect(() => {
    if (phase !== "scoring") return;
    const t = setTimeout(() => {
      setPhase("result");
      onComplete?.({ kind: "quiz", score: score() });
    }, 600);
    return () => clearTimeout(t);
     
  }, [phase]);

  /* Keyboard: 1–4, Enter, R */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (phase === "q" && /^[1-4]$/.test(e.key)) {
        const oi = +e.key - 1;
        if (picked[qi]?.options[oi]) pick(oi);
      }
      if (e.key === "Enter") {
        if (phase === "intro") setPhase("q");
        else if (phase === "q") next();
        else if (phase === "result") restart();
      }
      if (e.key.toLowerCase() === "r" && (phase === "q" || phase === "result")) restart();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
     
  }, [phase, qi, answers, picked]);

  const q = picked[qi];
  const band = bands.find((b) => score() >= b.min) ?? bands[bands.length - 1];

  return (
    <div className="flex min-h-[420px] flex-col">
      {/* Progress */}
      {phase !== "intro" && phase !== "result" && (
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${((qi + (phase === "scoring" ? 1 : 0)) / picked.length) * 100}%` }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-1 flex-col items-center justify-center py-8 text-center"
          >
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{quiz.intro}</p>
            <p className="mt-3 font-mono-forge text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
              3 of {quiz.questions.length} authored questions · keys 1–4 + enter
            </p>
            <button
              onClick={() => setPhase("q")}
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform active:translate-y-px"
            >
              Start the assessment <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}

        {phase === "q" && q && (
          <motion.div
            key={`q-${qi}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            className="flex flex-1 flex-col"
          >
            <p className="text-base font-bold leading-snug text-foreground">
              <span className="mr-2 font-mono-forge text-xs text-muted-foreground">{qi + 1}/{picked.length}</span>
              {q.q}
            </p>
            <div className="mt-4 grid gap-2">
              {q.options.map((o, oi) => {
                const active = answers[qi] === oi;
                return (
                  <button
                    key={oi}
                    onClick={() => pick(oi)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border px-3.5 py-3 text-left text-sm transition-colors",
                      active
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-background text-foreground/85 hover:border-primary/40"
                    )}
                  >
                    <kbd
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border font-mono-forge text-[10px] font-bold",
                        active ? "border-primary text-primary" : "border-border text-muted-foreground"
                      )}
                    >
                      {oi + 1}
                    </kbd>
                    <span className="leading-snug">{o.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-auto flex items-center justify-between pt-5">
              <button
                onClick={restart}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono-forge text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3" aria-hidden="true" /> Restart
              </button>
              <button
                onClick={next}
                disabled={answers[qi] === undefined}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition-all active:translate-y-px disabled:opacity-40"
              >
                {qi === picked.length - 1 ? "Score me" : "Next"}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}

        {phase === "scoring" && (
          <motion.div
            key="scoring"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col items-center justify-center gap-3"
            aria-live="polite"
          >
            <div className="flex gap-1.5" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-2 rounded-full bg-primary"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </div>
            <p className="font-mono-forge text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Scoring — sum(weights) ÷ max × 100
            </p>
          </motion.div>
        )}

        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-1 flex-col items-center justify-center py-4 text-center"
          >
            <p className="font-display text-5xl font-extrabold tabular-nums text-foreground">
              {score()}
              <span className="text-xl text-muted-foreground">/100</span>
            </p>
            <span
              className={cn(
                "engraved mt-2 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-bold uppercase tracking-[0.1em]",
                BAND_STYLE[band?.name ?? "Silver"]
              )}
            >
              {band?.name}
            </span>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-foreground">{band?.blurb}</p>
            <p className="mt-2 font-mono-forge text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">
              Full kit: all {quiz.questions.length} questions, bands.md + result-page.html
            </p>
            <DemoEndCard offer={offer} onRestart={restart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Shared end card — "Get the full kit" with price + buy (P3 contract). */
export function DemoEndCard({
  offer,
  onRestart,
}: {
  offer: DemoSurfaceProps["offer"];
  onRestart: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={onRestart}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <RotateCcw className="size-3.5" aria-hidden="true" />
        Take it again
      </button>
      <a
        href="#get-offer"
        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm"
        onClick={(e) => {
          /* Scroll the studio's offer strip into view */
          document.getElementById("get-offer")?.scrollIntoView({ behavior: "smooth", block: "center" });
          e.preventDefault();
        }}
      >
        Get the full kit — {offer.price.amount === null ? "custom" : `$${offer.price.amount}`}
        {offer.price.period ?? ""}
      </a>
    </div>
  );
}
