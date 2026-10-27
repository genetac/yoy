'use client';

import { useState } from 'react';

/**
 * QuizDemo (P3) — Assessment archetype
 *
 * Real weighted scoring, 4 result bands. State machine:
 *   intro → q1 → q2 → q3 → scoring (600ms) → result
 */
interface Question {
  text: string;
  options: { label: string; weight: number }[];
}

const QUESTIONS: Question[] = [
  {
    text: 'How documented is your team’s process?',
    options: [
      { label: 'In our heads', weight: 0 },
      { label: 'Some wikis', weight: 3 },
      { label: 'Mostly documented', weight: 7 },
      { label: 'Fully systemised', weight: 10 },
    ],
  },
  {
    text: 'How do you measure outcomes?',
    options: [
      { label: 'Gut feeling', weight: 0 },
      { label: 'Revenue only', weight: 3 },
      { label: 'A few KPIs', weight: 7 },
      { label: 'OKRs + leading indicators', weight: 10 },
    ],
  },
  {
    text: 'How repeatable is your onboarding?',
    options: [
      { label: 'Every time is different', weight: 0 },
      { label: 'Some checklists', weight: 3 },
      { label: 'A documented flow', weight: 7 },
      { label: 'Automated + measured', weight: 10 },
    ],
  },
];

type Phase = 'intro' | 'q1' | 'q2' | 'q3' | 'scoring' | 'result';

export default function QuizDemo() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [answers, setAnswers] = useState<number[]>([]);

  const qIndex = phase === 'q1' ? 0 : phase === 'q2' ? 1 : phase === 'q3' ? 2 : -1;

  function answer(weight: number) {
    const next = [...answers, weight];
    setAnswers(next);
    if (next.length === 1) setPhase('q2');
    else if (next.length === 2) setPhase('q3');
    else if (next.length === 3) {
      setPhase('scoring');
      setTimeout(() => setPhase('result'), 600);
    }
  }

  // Score = sum of chosen weights ÷ max possible × 100
  const maxPossible = QUESTIONS.reduce(
    (sum, q) => sum + Math.max(...q.options.map((o) => o.weight)),
    0,
  );
  const score = Math.round((answers.reduce((s, w) => s + w, 0) / maxPossible) * 100);

  // Bands: Platinum ≥ 85, Gold 70–84, Silver 50–69, Bronze < 50
  const band =
    score >= 85
      ? { name: 'Platinum', color: '#E7C982', desc: 'Systemised, measured, and repeatable.' }
      : score >= 70
        ? { name: 'Gold', color: '#B8913F', desc: 'Strong foundations with a few gaps.' }
        : score >= 50
          ? { name: 'Silver', color: '#9CA3AF', desc: 'Building — not yet consistent.' }
          : { name: 'Bronze', color: '#9C6B3F', desc: 'Early stage. Process is mostly ad hoc.' };

  function reset() {
    setAnswers([]);
    setPhase('intro');
  }

  return (
    <div className="relative">
      <span className="ribbon-sample">Sample</span>
      <div className="p-8">
        {phase === 'intro' && (
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              Maturity Assessment · 3 questions
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-[var(--ink)]">
              How systemised is your team?
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--ink-soft)]">
              Answer 3 questions. Get a weighted score and a sealed result card.
              The full kit has 25 questions across 5 dimensions.
            </p>
            <button
              onClick={() => setPhase('q1')}
              className="mt-6 border border-[var(--ink)] bg-[var(--ink)] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--plate-bg)] transition hover:bg-[var(--obsidian)]"
            >
              Begin Assessment
            </button>
          </div>
        )}

        {qIndex >= 0 && (
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
                Question {qIndex + 1} of 3
              </span>
              <span className="font-mono text-[10px] text-[var(--brass-line)]">
                {'■'.repeat(qIndex + 1)}{'□'.repeat(3 - qIndex - 1)}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-[var(--ink)]">
              {QUESTIONS[qIndex].text}
            </h3>
            <div className="mt-5 flex flex-col gap-2">
              {QUESTIONS[qIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answer(opt.weight)}
                  className="border border-[var(--plate-edge)] bg-[var(--plate-bg)] px-4 py-3 text-left text-sm text-[var(--ink)] transition hover:border-[var(--brass-line)] hover:bg-[var(--plate-bg-deep)]"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'scoring' && (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--plate-edge)] border-t-[var(--brass-line)]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
              Computing weighted score…
            </p>
          </div>
        )}

        {phase === 'result' && (
          <div className="text-center">
            <div className="seal-stamp mx-auto flex h-24 w-24 items-center justify-center rounded-full" style={{ background: 'var(--foil)' }}>
              <span className="font-display text-3xl font-extrabold text-[var(--obsidian-deep)]">
                {score}
              </span>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              Your score
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold" style={{ color: band.color }}>
              {band.name}
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--ink-soft)]">
              {band.desc}
            </p>
            <div className="mx-auto mt-6 max-w-xs border-t border-dashed border-[var(--plate-edge)] pt-4">
              <p className="font-mono text-[10px] text-[var(--ink-dim)]">
                Score = Σ(weights) ÷ max × 100 = {answers.join(' + ')} ÷ {maxPossible} × 100 = <span className="text-[var(--ink)]">{score}</span>
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={reset}
                className="border border-[var(--plate-edge)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-soft)] hover:bg-[var(--plate-bg-deep)]"
              >
                Reset
              </button>
              <a
                href="#buy"
                className="border border-[var(--ink)] bg-[var(--ink)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--plate-bg)]"
              >
                Get the full 25-question kit →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
