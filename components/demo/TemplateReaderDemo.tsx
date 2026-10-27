"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  CheckCheck,
  Copy,
  FileText,
  Gem,
  Mail,
  PenLine,
  RotateCcw,
} from "lucide-react";
import type { DemoOffer, DemoProps } from "./types";

/* ── merge-field machinery ── */
const FIELDS = ["first_name", "company", "sender_name"] as const;
type FieldKey = (typeof FIELDS)[number];
type Values = Record<FieldKey, string>;
const EMPTY: Values = { first_name: "", company: "", sender_name: "" };

/** Substitute filled values; unfilled tokens stay visible as tokens. */
function fillBody(body: string, values: Values): string {
  return body.replace(/\{\{(\w+)\}\}/g, (raw, key: string) => {
    const v = values[key as FieldKey];
    return v && v.trim() ? v.trim() : raw;
  });
}

/** Render text with live merge tokens: filled → highlighted value, empty → brass token pill. */
function Tokens({ text, values }: { text: string; values: Values }): ReactNode {
  return (
    <>
      {text.split(/(\{\{\w+\}\})/g).map((seg, i) => {
        const m = /^\{\{(\w+)\}\}$/.exec(seg);
        if (!m) return <span key={i}>{seg}</span>;
        const v = values[m[1] as FieldKey]?.trim();
        return v ? (
          <mark key={i} className="rounded bg-amber-100/90 px-0.5 text-zinc-900 dark:bg-amber-400/25 dark:text-amber-50">{v}</mark>
        ) : (
          <code key={i} className="rounded border border-amber-600/40 bg-amber-50 px-1 py-px font-mono text-[11px] text-amber-800 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-300">{seg}</code>
        );
      })}
    </>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/* ── three field-ready templates (real copy, 120–180 words each) ── */
type Template = { id: string; label: string; subject: string; body: string };

const TEMPLATES: Template[] = [
  {
    id: "welcome",
    label: "Welcome email",
    subject: "Welcome aboard, {{first_name}} — here's what happens next",
    body: `Hi {{first_name}},

Welcome aboard — and thank you for trusting us with your project. We're genuinely glad you're here.

This email is your quick orientation. First, the essentials: your project workspace is being prepared now, and you'll receive access within 24 hours. Second, your kickoff call: we've reserved a slot based on the availability you shared, and a calendar invitation from me is on its way. Third, the people: I'm your main point of contact for everything — questions, ideas, or concerns come straight to me, no ticket queues involved.

Over the coming weeks you'll get short progress notes every Friday: what shipped, what's next, and anything we need from you. Nothing will disappear into a status-report void.

One small favor: reply to this email with the single outcome that would make this project a clear win for {{company}}. We anchor every decision to that sentence.

Glad to have you with us,

{{sender_name}}`,
  },
  {
    id: "cold-outreach",
    label: "Cold outreach",
    subject: "A specific idea for {{company}}'s onboarding",
    body: `Hi {{first_name}},

I'll keep this short — you're busy building {{company}}, and this email is only worth your time if I can be specific.

I looked at how {{company}} handles new customer onboarding, and I noticed a pattern we see often: the product experience is strong, but the first fourteen days still rely on people remembering to follow up manually. That's usually where quiet churn starts.

We fix exactly that. Over the last two years we've helped companies in your space cut onboarding drop-off by roughly a third, on average, by designing a guided first-two-weeks experience — sequences, checklists, and one simple dashboard — without asking the team to change how it works.

If that resonates, I'd suggest a fifteen-minute call. I'll come with two ideas tailored to {{company}}, and you can keep them either way.

Either way — good luck with the launch.

{{sender_name}}`,
  },
  {
    id: "follow-up",
    label: "Follow-up",
    subject: "Following up on our conversation, {{first_name}}",
    body: `Hi {{first_name}},

Thanks again for making time earlier this week — the conversation with you and the {{company}} team was one of the more useful ones I've had this month.

Here's a brief recap so nothing gets lost. You're looking to consolidate four disconnected tools into one workflow before the busy season starts in June. The blocker is migration risk: your team can't afford downtime on live orders. On our side, the plan we sketched handles that with a staged rollout — pilot the new workflow with two users first, then expand once the numbers hold for a full week.

Two things I promised to send: the case study of a similar migration, and a draft timeline. Both are attached.

If the timeline looks right, reply with a yes and I'll set up the working session for next week. If June feels tight, tell me your real deadline and we'll plan backwards from it.

{{sender_name}}`,
  },
];

const wordCount = (s: string) => s.trim().split(/\s+/).length;

type Phase = "list" | "reading" | "editing";

export function TemplateReaderDemo({ offer, onComplete }: DemoProps) {
  const [phase, setPhase] = useState<Phase>("list");
  const [activeId, setActiveId] = useState(TEMPLATES[0].id);
  const [values, setValues] = useState<Values>(EMPTY);
  const [copied, setCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const cbRef = useRef(onComplete);
  const timer = useRef<number | undefined>(undefined);
  const tpl = TEMPLATES.find((t) => t.id === activeId) ?? TEMPLATES[0];

  useEffect(() => {
    cbRef.current = onComplete;
  });
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const reset = () => {
    window.clearTimeout(timer.current);
    setPhase("list");
    setValues(EMPTY);
    setCopied(false);
    setHasCopied(false);
  };
  const open = (t: Template) => {
    setPhase("reading");
    setActiveId(t.id);
    cbRef.current?.({ demo: "templates", action: "open", templateId: t.id });
  };
  const copy = async () => {
    const ok = await copyText(`Subject: ${tpl.subject}\n\n${fillBody(tpl.body, values)}`);
    if (!ok) return;
    setCopied(true);
    setHasCopied(true);
    cbRef.current?.({
      demo: "templates", action: "copy", templateId: tpl.id, subject: fillBody(tpl.subject, values),
      personalized: FIELDS.some((f) => values[f].trim().length > 0),
    });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="of-plate flex max-h-[620px] w-full flex-col overflow-hidden text-zinc-800 dark:text-zinc-200">
      <span aria-hidden="true" className="absolute right-0 top-0 z-20 border-b border-l border-[#a37a2e]/40 bg-gradient-to-b from-[#f8f1dd] to-[#ecdfc0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-800 dark:border-amber-500/30 dark:from-zinc-800 dark:to-zinc-900 dark:text-amber-300">
        Sample
      </span>
      <header className="flex items-center gap-3 px-5 py-3 pr-24">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-zinc-900 text-amber-200 dark:bg-amber-100 dark:text-zinc-900">
          <Mail className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h3 className="of-engrave text-sm font-semibold tracking-tight">Template Pack — three field-ready emails</h3>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Live merge fields, real copy, one-click export</p>
        </div>
        <button onClick={reset} className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold text-zinc-500 transition-colors duration-150 hover:bg-zinc-900/5 hover:text-zinc-800 focus-visible:outline-2 focus-visible:outline-amber-600 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
        {phase === "list" && (
          <ul className="flex flex-col gap-3" aria-label="Email templates">
            {TEMPLATES.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => open(t)}
                  className="of-hairline group flex w-full items-start gap-3.5 rounded-xl bg-white/60 p-4 text-left transition-shadow duration-200 hover:-translate-y-px hover:shadow-[0_10px_24px_-12px_rgba(24,20,13,.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-zinc-900/50"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-100/80 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="of-chip">{t.label}</span>
                      <span className="font-mono text-[10px] text-zinc-400">{wordCount(t.body)} words · 3 merge fields</span>
                    </span>
                    <span className="of-engrave mt-1.5 block truncate text-[13.5px] font-semibold tracking-tight">
                      <Tokens text={t.subject} values={EMPTY} />
                    </span>
                    <span className="mt-1 block line-clamp-2 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {t.body.replace(/\n+/g, " ").slice(0, 120)}…
                    </span>
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-amber-400">
                    Open →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {phase !== "list" && (
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setPhase("list")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300/80 bg-white/60 px-3 py-1.5 text-[11px] font-semibold transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-amber-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:bg-zinc-800"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Templates
              </button>
              <span className="of-chip">{tpl.label}</span>
            </div>

            {/* email header block */}
            <div className="of-hairline overflow-hidden rounded-xl bg-white/60 dark:bg-zinc-900/50">
              <dl className="divide-y divide-zinc-200/70 text-[12px] dark:divide-zinc-700/50">
                {[
                  ["From", "{{sender_name}} · OMNIFORGE Studio <hello@omniforge.studio>"],
                  ["To", "{{first_name}} at {{company}}"],
                  ["Subject", tpl.subject],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 px-4 py-2">
                    <dt className="w-14 shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">{k}</dt>
                    <dd className="min-w-0 flex-1 font-medium">
                      <Tokens text={v} values={values} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* body */}
            <div className="of-hairline max-h-60 overflow-y-auto rounded-xl bg-white/60 px-5 py-4 dark:bg-zinc-900/50" aria-label="Email body">
              <div className="space-y-3.5 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                {tpl.body.split("\n\n").map((para, i) => (
                  <p key={i}><Tokens text={para} values={values} /></p>
                ))}
              </div>
            </div>

            {phase === "reading" && (
              <button
                onClick={() => setPhase("editing")}
                className="mx-auto inline-flex items-center gap-2 self-start rounded-lg bg-zinc-900 px-4 py-2 text-[12px] font-semibold text-amber-50 shadow-[0_3px_10px_-3px_rgba(24,20,13,.55)] transition-colors duration-200 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-amber-100 dark:text-zinc-900 dark:hover:bg-amber-50"
              >
                <PenLine className="h-3.5 w-3.5" /> Personalize the merge fields
              </button>
            )}

            {phase === "editing" && (
              <div className="of-hairline rounded-xl bg-gradient-to-b from-amber-50/70 to-[#f2ead6] p-4 dark:from-zinc-900 dark:to-zinc-950">
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-800/80 dark:text-amber-500/80">Merge fields — live substitution</p>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {FIELDS.map((f) => (
                    <label key={f} className="block">
                      <span className="mb-1 block font-mono text-[10px] text-zinc-500 dark:text-zinc-400">{`{{${f}}}`}</span>
                      <input
                        value={values[f]}
                        onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                        placeholder={f === "sender_name" ? "Jordan Vale" : f === "company" ? "Meridian & Co." : "Alex"}
                        className="w-full rounded-lg border border-zinc-300/80 bg-white/80 px-3 py-2 text-[13px] outline-none transition-colors duration-150 placeholder:text-zinc-400 focus:border-amber-600/60 focus:ring-2 focus:ring-amber-600/20 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    Copies the subject + body with your values — unfilled fields stay as tokens.
                  </p>
                  <button
                    onClick={copy}
                    aria-live="polite"
                    className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-[12px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-900 text-amber-50 hover:bg-zinc-800 dark:bg-amber-100 dark:text-zinc-900 dark:hover:bg-amber-50"
                    }`}
                  >
                    {copied ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied ✓" : "Copy email"}
                  </button>
                </div>
                {hasCopied && (
                  <div className="mt-3 flex items-center gap-3.5 rounded-xl border border-amber-600/30 bg-white/70 p-3 dark:border-amber-500/25 dark:bg-zinc-900/70">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-zinc-900 text-amber-200 dark:bg-amber-100 dark:text-zinc-900">
                      <Gem className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-amber-800/80 dark:text-amber-500/80">Copied — this is 1 of 24 templates</p>
                      <p className="of-engrave truncate text-[13px] font-semibold">{offer.title}</p>
                    </div>
                    <div className="text-right">
                      {offer.price != null ? (
                        <p className="of-foil-text font-mono text-base font-bold leading-tight">${offer.price.toLocaleString("en-US")}</p>
                      ) : (
                        <p className="of-foil-text font-mono text-sm font-bold leading-tight">Request demo</p>
                      )}
                      <p className="text-[9px] text-zinc-500 dark:text-zinc-400">full pack · one-time</p>
                    </div>
                    <button
                      onClick={() => cbRef.current?.({ demo: "templates", action: "get-full-kit", offerId: offer.offerId })}
                      className="shrink-0 rounded-lg bg-zinc-900 px-3.5 py-2 text-[11px] font-semibold text-amber-50 transition-colors duration-200 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-amber-100 dark:text-zinc-900 dark:hover:bg-amber-50"
                    >
                      Get the full kit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
