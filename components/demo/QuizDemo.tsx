"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  Gem,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import type { DemoOffer, DemoProps } from "./types";

/* ── 25-question business-readiness bank · 4 weighted options each (0–3) ── */
type Option = [label: string, weight: number];
type Question = { q: string; o: [Option, Option, Option, Option] };

const QUESTIONS: Question[] = [
  { q: "Do you have a written profile of your ideal customer?", o: [["No", 0], ["A rough idea", 1], ["Written profile", 2], ["Data-backed, reviewed quarterly", 3]] },
  { q: "How clearly defined is your core offer?", o: [["Vague", 0], ["Drafted", 1], ["Defined and scoped", 2], ["Priced and validated by customers", 3]] },
  { q: "How solid is your legal foundation (contracts, terms, policies)?", o: [["None", 0], ["Free templates", 1], ["Lawyer-reviewed core docs", 2], ["Full legal kit, maintained", 3]] },
  { q: "Are your business finances separated and tracked?", o: [["Personal accounts only", 0], ["Separate account only", 1], ["Monthly bookkeeping", 2], ["Bookkeeping + forecast + accountant", 3]] },
  { q: "How consistent is your inbound lead flow?", o: [["None yet", 0], ["Sporadic", 1], ["A few per week", 2], ["Steady daily flow", 3]] },
  { q: "How would you rate your brand assets (logo, palette, fonts)?", o: [["None", 0], ["Basic DIY", 1], ["Professional set", 2], ["Full brand book with rules", 3]] },
  { q: "Do you have a professional website?", o: [["None", 0], ["Social pages only", 1], ["Basic site", 2], ["Fast, optimized, mobile-first", 3]] },
  { q: "How complete is your proof library (testimonials, case studies)?", o: [["Empty", 0], ["One or two quotes", 1], ["Several written", 2], ["Written + video + numbers", 3]] },
  { q: "Is your sales process documented as repeatable stages?", o: [["Improvised", 0], ["Informal steps", 1], ["Documented stages", 2], ["Stages live in a CRM", 3]] },
  { q: "How do you handle customer support today?", o: [["Ad hoc, my inbox", 0], ["Email only", 1], ["Help desk with queues", 2], ["Help desk + SLAs", 3]] },
  { q: "Do you know what it costs to acquire a customer?", o: [["No idea", 0], ["A gut estimate", 1], ["Tracked overall", 2], ["Tracked per channel, optimized", 3]] },
  { q: "How is your team's workload managed?", o: [["Memory and sticky notes", 0], ["Spreadsheets", 1], ["A project tool", 2], ["Project tool + written process", 3]] },
  { q: "Do you have standard operating procedures for key tasks?", o: [["None", 0], ["Scattered notes", 1], ["Core processes documented", 2], ["Versioned playbook, kept current", 3]] },
  { q: "How is your pricing set?", o: [["Guesswork", 0], ["Copied from competitors", 1], ["Cost-plus markup", 2], ["Value-based, tested", 3]] },
  { q: "How would you describe your marketing?", o: [["None", 0], ["Occasional posts", 1], ["Monthly calendar", 2], ["Multi-channel and measured", 3]] },
  { q: "Where does your customer data live?", o: [["In my head", 0], ["Personal spreadsheets", 1], ["One shared CRM", 2], ["CRM connected to other tools", 3]] },
  { q: "How ready are you to delegate work?", o: [["Not yet", 0], ["I delegate small tasks", 1], ["Roles are delegated", 2], ["The business runs without me", 3]] },
  { q: "Do you have a 12-month plan with targets?", o: [["None", 0], ["Ideas only", 1], ["Written plan", 2], ["Plan with KPIs + quarterly reviews", 3]] },
  { q: "How do you collect and act on customer feedback?", o: [["We don't", 0], ["Ask now and then", 1], ["Periodic surveys", 2], ["A feedback loop that changes the product", 3]] },
  { q: "What does your referral engine look like?", o: [["Nothing planned", 0], ["Ask when I remember", 1], ["Formal ask with incentive", 2], ["Systematic program with tracking", 3]] },
  { q: "How much financial runway do you have?", o: [["Under a month", 0], ["1–3 months", 1], ["3–6 months", 2], ["6+ months", 3]] },
  { q: "Do you review key metrics weekly?", o: [["No", 0], ["Revenue only", 1], ["3–5 KPIs weekly", 2], ["Live dashboard + review ritual", 3]] },
  { q: "How consistent is your publishing?", o: [["Nothing yet", 0], ["Rare and random", 1], ["A weekly cadence", 2], ["Scheduled weeks in advance", 3]] },
  { q: "Are your services documented with clear scope and deliverables?", o: [["In my head", 0], ["Partially", 1], ["Scope docs per offer", 2], ["Scope docs + SLAs per offer", 3]] },
  { q: "Can you state why customers choose you over alternatives?", o: [["Not really", 0], ["A general pitch", 1], ["A clear positioning line", 2], ["Positioning validated by win/loss data", 3]] },
];

type Band = {
  name: string; initial: string; min: number;
  ring: string; seal: string; text: string; blurb: string; recs: string[];
};

const BANDS: Band[] = [
  { name: "Platinum", initial: "P", min: 85, ring: "stroke-zinc-600 dark:stroke-zinc-300", seal: "from-zinc-200 to-zinc-500 text-zinc-900 dark:from-zinc-500 dark:to-zinc-300 dark:text-zinc-950", text: "text-zinc-700 dark:text-zinc-100",
    blurb: "Foundations locked in — your constraint is leverage, not basics.",
    recs: ["Shift energy to leverage: systemize referrals and reprice your best-selling offer upward.", "Protect consistency with a weekly KPI review before adding anything new.", "You are ready for advanced plays — partnerships, retainers, productized services."] },
  { name: "Gold", initial: "G", min: 70, ring: "stroke-amber-500", seal: "from-amber-200 to-amber-600 text-amber-950", text: "text-amber-700 dark:text-amber-400",
    blurb: "Strong core with clear, closable gaps.",
    recs: ["Instrument one dashboard covering CAC, retention and cash runway.", "Turn your strongest workflow into a productized, repeatable offer.", "Close the gap with a documented 12-month plan and quarterly targets."] },
  { name: "Silver", initial: "S", min: 50, ring: "stroke-zinc-400 dark:stroke-zinc-500", seal: "from-zinc-100 to-zinc-400 text-zinc-700 dark:from-zinc-600 dark:to-zinc-400 dark:text-zinc-950", text: "text-zinc-600 dark:text-zinc-300",
    blurb: "Solid potential — a few focused gaps to close first.",
    recs: ["Prioritize documentation: write SOPs for your three most repeated processes.", "Stabilize lead flow on one repeatable channel before diversifying.", "Invest in proof: collect three testimonials and one case study this quarter."] },
  { name: "Bronze", initial: "B", min: 0, ring: "stroke-orange-700 dark:stroke-orange-500", seal: "from-orange-300 to-orange-700 text-orange-950 dark:from-orange-700 dark:to-orange-400 dark:text-orange-950", text: "text-orange-800 dark:text-orange-400",
    blurb: "Early days — the essentials come first, and that is good news.",
    recs: ["Start with clarity: write down your ideal customer and primary offer.", "Set up the basics — business bank account, a bookkeeping habit, a one-page plan.", "Pick one metric (weekly leads or revenue) and track it for 30 days straight."] },
];

function sample<T>(pool: T[], n: number): T[] {
  const a = [...pool];
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (a.length - i));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

type Phase = "intro" | "quiz" | "scoring" | "result";

export function QuizDemo({ offer, onComplete }: DemoProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [dialOn, setDialOn] = useState(false);

  const score = useMemo(() => {
    if (quiz.length === 0) return 0;
    const earned = answers.reduce<number>((s, a, i) => s + (a == null ? 0 : quiz[i].o[a][1]), 0);
    return Math.round((earned / (quiz.length * 3)) * 100);
  }, [answers, quiz]);
  const band = BANDS.find((b) => score >= b.min) ?? BANDS[3];

  /* scoring → result after the 600ms sealing animation */
  useEffect(() => {
    if (phase !== "scoring") return;
    const t = window.setTimeout(() => setPhase("result"), 600);
    return () => window.clearTimeout(t);
  }, [phase]);

  /* result: sweep the dial + report */
  useEffect(() => {
    if (phase !== "result") return;
    const r = requestAnimationFrame(() => setDialOn(true));
    onComplete?.({ demo: "assessment", score, band: band.name, questionsAnswered: quiz.length });
    return () => cancelAnimationFrame(r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const start = () => {
    setQuiz(sample(QUESTIONS, 3));
    setAnswers([null, null, null]);
    setIdx(0);
    setPhase("quiz");
  };
  const reset = () => {
    setQuiz([]);
    setAnswers([null, null, null]);
    setIdx(0);
    setDialOn(false);
    setPhase("intro");
  };
  const choose = (o: number) =>
    setAnswers((prev) => prev.map((a, i) => (i === idx ? o : a)));
  const next = () => (idx < quiz.length - 1 ? setIdx(idx + 1) : setPhase("scoring"));
  const back = () => (idx > 0 ? setIdx(idx - 1) : setPhase("intro"));

  const answered = answers.filter((a) => a != null).length;
  const current = quiz[idx];
  const chosen = answers[idx];
  const showQuiz = phase === "quiz" && current != null;

  return (
    <div className="of-plate flex max-h-[620px] w-full flex-col overflow-hidden text-zinc-800 dark:text-zinc-200">
      <span aria-hidden="true" className="absolute right-0 top-0 z-20 border-b border-l border-[#a37a2e]/40 bg-gradient-to-b from-[#f8f1dd] to-[#ecdfc0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-800 dark:border-amber-500/30 dark:from-zinc-800 dark:to-zinc-900 dark:text-amber-300">
        Sample
      </span>
      <header className="flex items-center gap-3 px-5 py-3 pr-24">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-zinc-900 text-amber-200 dark:bg-amber-100 dark:text-zinc-900">
          <ClipboardList className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h3 className="of-engrave text-sm font-semibold tracking-tight">Business Readiness Assessment</h3>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Weighted scoring, computed live in this panel</p>
        </div>
        <button onClick={reset} className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold text-zinc-500 transition-colors duration-150 hover:bg-zinc-900/5 hover:text-zinc-800 focus-visible:outline-2 focus-visible:outline-amber-600 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
        {phase === "intro" && (
          <section className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-zinc-900 text-amber-200 shadow-[0_10px_24px_-10px_rgba(24,20,13,.6)] dark:bg-amber-100 dark:text-zinc-900">
              <Sparkles className="h-6 w-6" />
            </span>
            <div>
              <h4 className="of-engrave text-xl font-semibold tracking-tight">Find your readiness band</h4>
              <p className="mx-auto mt-1.5 max-w-[44ch] text-[12px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                Three questions, drawn fresh from our 25-point readiness bank. Answers are scored on
                weighted options and sealed into a band — Platinum, Gold, Silver or Bronze — with
                tailored next steps.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <span className="of-chip">25-question bank</span>
              <span className="of-chip">3 per run</span>
              <span className="of-chip">≈ 90 seconds</span>
            </div>
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-[12px] font-semibold text-amber-50 shadow-[0_3px_10px_-3px_rgba(24,20,13,.55)] transition-colors duration-200 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-amber-100 dark:text-zinc-900 dark:hover:bg-amber-50"
            >
              Start assessment <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </section>
        )}

        {showQuiz && (
          <section aria-label={`Question ${idx + 1} of ${quiz.length}`} className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] font-bold text-amber-800 dark:text-amber-400">Q{idx + 1}/{quiz.length}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-700/70">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-400 transition-[width] duration-200 ease-out" style={{ width: `${(answered / quiz.length) * 100}%` }} />
              </div>
            </div>
            <h4 className="of-engrave text-[15px] font-semibold leading-snug tracking-tight">{current.q}</h4>
            <div className="flex flex-col gap-2" role="group" aria-label="Answer options">
              {current.o.map(([label], i) => {
                const selected = chosen === i;
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    aria-pressed={selected}
                    className={`flex w-full items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[13px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                      selected
                        ? "border-amber-600/60 bg-amber-100/70 dark:border-amber-500/50 dark:bg-amber-500/15"
                        : "border-zinc-300/80 bg-white/60 hover:border-amber-700/40 hover:bg-amber-50/60 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border font-mono text-[10px] font-bold ${selected ? "border-amber-700 text-amber-800 dark:border-amber-400 dark:text-amber-300" : "border-zinc-400/70 text-zinc-500"}`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{label}</span>
                    {selected && <Check className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-1 flex items-center justify-between">
              <button onClick={back} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300/80 bg-white/60 px-3 py-1.5 text-[11px] font-semibold transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-amber-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:bg-zinc-800">
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
              <button
                onClick={next}
                disabled={chosen == null}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-1.5 text-[11px] font-semibold text-amber-50 transition-colors duration-200 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-amber-100 dark:text-zinc-900 dark:hover:bg-amber-50"
              >
                {idx < quiz.length - 1 ? "Continue" : "Score me"} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </section>
        )}

        {phase === "scoring" && (
          <section aria-live="polite" className="flex flex-col items-center gap-4 py-14 text-center">
            <span className="relative grid h-12 w-12 place-items-center">
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-zinc-300 border-t-amber-600 dark:border-zinc-600 dark:border-t-amber-400" />
              <Sparkles className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            </span>
            <p className="of-engrave text-[13px] font-semibold">Sealing your assessment…</p>
            <p className="font-mono text-[10px] text-zinc-500">Scoring {quiz.length} weighted answers</p>
          </section>
        )}

        {phase === "result" && (
          <section aria-label="Assessment result" className="flex flex-col items-center gap-4 pt-2 text-center">
            <div className="flex items-center gap-7">
              <div className="flex flex-col items-center gap-2">
                <div className={`grid h-[72px] w-[72px] place-items-center rounded-full border-2 border-[#a37a2e]/45 bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,.45),0_8px_18px_-8px_rgba(24,20,13,.5)] ${band.seal}`}>
                  <span className="of-engrave text-[30px] font-bold leading-none">{band.initial}</span>
                </div>
                <span className="of-chip">Sealed verdict</span>
              </div>
              <Dial on={dialOn} value={score} stroke={band.ring} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">Readiness band</p>
              <h4 className={`of-engrave text-2xl font-semibold tracking-tight ${band.text}`}>{band.name}</h4>
              <p className="mx-auto mt-1 max-w-[40ch] text-[12px] text-zinc-600 dark:text-zinc-400">{band.blurb}</p>
            </div>
            <ul className="w-full max-w-md space-y-1.5 text-left">
              {band.recs.map((rec) => (
                <li key={rec} className="flex items-start gap-2 rounded-lg border border-zinc-200/80 bg-white/60 px-3 py-2 text-[12px] leading-snug dark:border-zinc-700/70 dark:bg-zinc-900/50">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-400" />
                  {rec}
                </li>
              ))}
            </ul>
            <p className="font-mono text-[10px] text-zinc-400">Score {score}/100 · {quiz.length} of {quiz.length} answered · sampled from a 25-question bank</p>
            <Cta offer={offer} onGetKit={() => onComplete?.({ demo: "assessment", cta: "get-full-kit", offerId: offer.offerId, band: band.name, score })} />
          </section>
        )}
      </div>
    </div>
  );
}

function Dial({ on, value, stroke }: { on: boolean; value: number; stroke: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" role="img" aria-label={`Readiness score ${value} of 100`}>
      <svg viewBox="0 0 128 128" className="h-32 w-32">
        <circle cx="64" cy="64" r={r} fill="none" strokeWidth="10" className="stroke-zinc-200/90 dark:stroke-zinc-700" />
        <circle
          cx="64" cy="64" r={r} fill="none" strokeWidth="10" strokeLinecap="round"
          className={stroke} strokeDasharray={c} strokeDashoffset={on ? c * (1 - value / 100) : c}
          transform="rotate(-90 64 64)" style={{ transition: "stroke-dashoffset 600ms ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="of-engrave font-mono text-[26px] font-bold leading-none">{value}</span>
        <span className="mt-0.5 font-mono text-[9px] text-zinc-500">/ 100</span>
      </div>
    </div>
  );
}

function Cta({ offer, onGetKit }: { offer: DemoOffer; onGetKit: () => void }) {
  return (
    <div className="of-hairline flex w-full items-center gap-3.5 rounded-xl bg-gradient-to-b from-amber-50/90 to-[#efe6cf] p-3.5 dark:from-zinc-900 dark:to-zinc-950">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-zinc-900 text-amber-200 dark:bg-amber-100 dark:text-zinc-900">
        <Gem className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-amber-800/80 dark:text-amber-500/80">Sample complete — unlock everything</p>
        <p className="of-engrave truncate text-[13px] font-semibold">{offer.title}</p>
      </div>
      <div className="text-right">
        {offer.price != null ? (
          <p className="of-foil-text font-mono text-base font-bold leading-tight">${offer.price.toLocaleString("en-US")}</p>
        ) : (
          <p className="of-foil-text font-mono text-sm font-bold leading-tight">Request demo</p>
        )}
        <p className="text-[9px] text-zinc-500 dark:text-zinc-400">full kit · one-time</p>
      </div>
      <button
        onClick={onGetKit}
        className="shrink-0 rounded-lg bg-zinc-900 px-3.5 py-2 text-[11px] font-semibold text-amber-50 transition-colors duration-200 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-amber-100 dark:text-zinc-900 dark:hover:bg-amber-50"
      >
        Get the full kit
      </button>
    </div>
  );
}
