"use client";

/* ════════════════════════════════════════════════════════════════════
   ToolDemo (Toolkit archetypes) — build plan v3 · P3
   One working instrument, live-computed and debounced 120ms:
   · seo       — title/meta length + keyword density (from B-TK-1)
   · contrast  — WCAG 2.2 contrast ratio from relative luminance
   · regex     — live regex with match highlighting + capture groups
   · headline  — 40×length + 25×power + 20×number + 15×sentiment
   The formulas are the same ones documented in the kits' cheatsheets.
   ════════════════════════════════════════════════════════════════════ */

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import type { DemoSurfaceProps, ToolDemoContent } from "./types";
import { DemoEndCard } from "./QuizDemo";
import { cn } from "@/lib/utils";

/* ── The four real formulas ────────────────────────────────────────── */

const STOPWORDS = new Set("a an and are as at be but by for from has have i in is it its of on or that the to was were will with you your".split(" "));

function density(text: string, kw: string): number {
  const words = text.toLowerCase().match(/[a-z0-9][a-z0-9'-]*/g) ?? [];
  if (!words.length || !kw.trim()) return 0;
  const re = new RegExp(kw.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim().replace(/\s+/g, "\\s+"), "g");
  const hits = (text.toLowerCase().match(re) ?? []).length;
  return (hits * kw.trim().split(/\s+/).length) / words.length * 100;
}

/** WCAG 2.2 relative luminance + contrast, linearised sRGB. */
function relLum(hex: string): number {
  const m = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(fg: string, bg: string): number {
  const l1 = relLum(fg), l2 = relLum(bg);
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

const POWER = ["proven", "guaranteed", "instant", "free", "new", "now", "today", "exclusive", "limited", "secret", "surprising", "honest", "simple", "fast", "easy", "powerful", "practical", "essential", "complete", "definitive", "ultimate", "critical", "effective", "reliable", "smart", "exact", "precise", "direct", "bold", "mistake", "warning", "myth", "truth", "reason", "why", "stop", "start", "build", "create", "launch", "ship", "grow", "scale", "double", "triple", "halve", "cut", "boost", "increase", "improve", "master", "unlock", "discover", "reveal", "expose", "transform", "fix", "debug", "audit", "test", "verify", "measure", "track", "plan", "system", "framework", "checklist", "template", "playbook", "blueprint", "roadmap", "shortcut", "guide", "handbook", "manual"];
const POS = ["win", "best", "love", "great", "proven", "boost", "grow", "double", "save", "earn", "master", "unlock", "improve", "effective", "powerful", "complete", "simple", "easy", "fast", "value", "worth", "free", "new"];
const NEG = ["mistake", "wrong", "fail", "kill", "dead", "painful", "brutal", "expensive", "warning", "stop", "avoid", "lose", "worst", "hate", "broken", "leak", "waste", "risk", "danger"];

function headlineScore(h: string) {
  const words = h.trim().split(/\s+/).filter(Boolean);
  const len = h.trim().length;
  let lengthScore = len === 0 ? 0 : len < 12 ? (len / 12) * 0.6 : len <= 65 ? 1 - (Math.max(0, len - 45) / 20) * 0.4 : Math.max(0.15, 0.6 - (len - 65) / 40);
  lengthScore = Math.max(0, Math.min(1, lengthScore));
  const powerHits = words.filter((w) => POWER.includes(w.toLowerCase().replace(/[^a-z-]/g, "")));
  const powerScore = Math.min(1, powerHits.length / 2);
  const numberScore = /\d/.test(h) ? 1 : 0;
  const pos = words.filter((w) => POS.includes(w.toLowerCase().replace(/[^a-z]/g, ""))).length;
  const neg = words.filter((w) => NEG.includes(w.toLowerCase().replace(/[^a-z]/g, ""))).length;
  const sentimentScore = Math.min(1, (pos + neg) / 1.5);
  const total = Math.round(40 * lengthScore + 25 * powerScore + 20 * numberScore + 15 * sentimentScore);
  return { total, lengthScore, powerHits, numberScore, pos, neg, len };
}

/* ── Debounce hook ─────────────────────────────────────────────────── */

function useDebounced<T>(value: T, ms = 120): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

/* ── The surface ───────────────────────────────────────────────────── */

export function ToolDemo({ offer, content, onComplete }: DemoSurfaceProps) {
  const tool = content as ToolDemoContent;
  const first = tool.presets[0]?.payload ?? {};
  const [payload, setPayload] = useState<Record<string, string>>(first);
  const [dirty, setDirty] = useState(false);
  const debounced = useDebounced(payload);

  useEffect(() => {
    if (dirty) {
      onComplete?.({ kind: "tool", tool: tool.tool });
    }
  }, [debounced, dirty, onComplete, tool.tool]);

  const set = (k: string, v: string) => {
    setPayload((p) => ({ ...p, [k]: v }));
    setDirty(true);
  };

  const field = (k: string, label: string, area = false) => (
    <label className="block">
      <span className="mb-1 block font-mono-forge text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {area ? (
        <textarea
          value={payload[k] ?? ""}
          onChange={(e) => set(k, e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono-forge text-xs text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        />
      ) : (
        <input
          value={payload[k] ?? ""}
          onChange={(e) => set(k, e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono-forge text-xs text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        />
      )}
    </label>
  );

  return (
    <div className="flex min-h-[420px] flex-col">
      <p className="mb-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{tool.intro}</p>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {tool.presets.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              setPayload(p.payload);
              setDirty(true);
            }}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors",
              JSON.stringify(payload) === JSON.stringify(p.payload)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={() => { setPayload(first); setDirty(false); }}
          className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono-forge text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-3" aria-hidden="true" /> Reset
        </button>
      </div>

      <div className="grid flex-1 gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          {tool.tool === "seo" && (<>
            {field("text", "Page copy", true)}
            {field("keyword", "Focus keyword")}
            {field("title", "Title tag")}
            {field("description", "Meta description", true)}
          </>)}
          {tool.tool === "contrast" && (<>
            {field("fg", "Foreground (hex)")}
            {field("bg", "Background (hex)")}
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
              <span
                className="flex h-14 flex-1 items-center justify-center rounded-md text-sm font-semibold"
                style={{ background: payload.bg || "#ffffff", color: payload.fg || "#18181b" }}
              >
                Sample text
              </span>
            </div>
          </>)}
          {tool.tool === "regex" && (<>
            {field("pattern", "Pattern")}
            {field("flags", "Flags (g i m s u)")}
            {field("testInput", "Test input", true)}
          </>)}
          {tool.tool === "headline" && field("headline", "Headline")}
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="mb-3 font-mono-forge text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Live output — computed in this tab
          </p>
          <ToolOutput tool={tool.tool} payload={debounced} />
        </div>
      </div>

      <DemoEndCard offer={offer} onRestart={() => { setPayload(first); setDirty(false); }} />
    </div>
  );
}

/** One-shot completion flag without re-render loops. */
import { useRef } from "react";
function useRefDone() {
  return useRef(false);
}


const Row = ({ label, value, cls }: { label: string; value: string; cls?: string }) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-border/60 py-1.5 last:border-0">
    <span className="text-[11px] text-muted-foreground">{label}</span>
    <span className={cn("font-mono-forge text-xs font-semibold tabular-nums", cls ?? "text-foreground")}>{value}</span>
  </div>
);

function ToolOutput({ tool, payload }: { tool: string; payload: Record<string, string> }) {

  if (tool === "seo") {
    const d = density(payload.text ?? "", payload.keyword ?? "");
    const tLen = (payload.title ?? "").length;
    const dLen = (payload.description ?? "").length;
    const words = (payload.text ?? "").toLowerCase().match(/[a-z0-9][a-z0-9'-]*/g) ?? [];
    const freq = new Map<string, number>();
    words.forEach((w) => { if (!STOPWORDS.has(w) && w.length > 2) freq.set(w, (freq.get(w) ?? 0) + 1); });
    const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    const verdict = d >= 0.8 && d <= 2 ? "ok" : d > 2 ? "warn" : "bad";
    return (
      <div>
        <Row label="Keyword density" value={`${d.toFixed(2)}%`} cls={verdict === "ok" ? "text-emerald-600 dark:text-emerald-400" : verdict === "warn" ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"} />
        <Row label="Ideal band" value="0.8% – 2.0%" />
        <Row label="Title length" value={`${tLen} / 52`} cls={tLen >= 35 && tLen <= 52 ? "text-emerald-600 dark:text-emerald-400" : undefined} />
        <Row label="Description" value={`${dLen} / 155`} cls={dLen >= 120 && dLen <= 155 ? "text-emerald-600 dark:text-emerald-400" : undefined} />
        <Row label="Word count" value={`${words.length} words`} />
        <div className="mt-3">
          <p className="mb-1.5 font-mono-forge text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Top terms</p>
          <ul className="space-y-1">
            {top.map(([w, n]) => (
              <li key={w} className="flex items-center gap-2 text-[11px]">
                <span className="min-w-0 flex-1 truncate font-mono-forge text-foreground/80">{w}</span>
                <span className="h-1 rounded-full bg-primary/70" style={{ width: `${Math.min(64, (n / (top[0]?.[1] || 1)) * 64)}px` }} aria-hidden="true" />
                <span className="w-6 text-right font-mono-forge text-muted-foreground tabular-nums">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (tool === "contrast") {
    let ratio = 0;
    try { ratio = contrast(payload.fg ?? "", payload.bg ?? ""); } catch { ratio = 0; }
    const aa = ratio >= 4.5, aaa = ratio >= 7, aaLarge = ratio >= 3;
    return (
      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-[11px] text-muted-foreground">Contrast ratio</span>
          <span className={cn("font-mono-forge text-2xl font-extrabold tabular-nums", aaa ? "text-emerald-600 dark:text-emerald-400" : aa ? "text-emerald-600 dark:text-emerald-400" : aaLarge ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400")}>
            {ratio.toFixed(2)}
          </span>
        </div>
        <Row label="WCAG 2.2 AA (normal text)" value={aa ? "PASS" : "FAIL"} cls={aa ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"} />
        <Row label="WCAG 2.2 AAA (normal text)" value={aaa ? "PASS" : "FAIL"} cls={aaa ? "text-emerald-600 dark:text-emerald-400" : undefined} />
        <Row label="AA (large text ≥ 3:1)" value={aaLarge ? "PASS" : "FAIL"} cls={aaLarge ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"} />
        <p className="mt-3 rounded-md bg-background/70 p-2.5 font-mono-forge text-[10px] leading-relaxed text-muted-foreground">
          C = (L1 + 0.05) / (L2 + 0.05)<br />
          L = 0.2126R + 0.7152G + 0.0722B (linearised sRGB)
        </p>
      </div>
    );
  }

  if (tool === "regex") {
    let rows: { m: string; i: number; groups: string[] }[] = [];
    let error = "";
    let highlighted = payload.testInput ?? "";
    try {
      const flags = (payload.flags ?? "g").replace(/[^gimsuy]/g, "") || "g";
      const re = new RegExp(payload.pattern ?? "", flags);
      const input = payload.testInput ?? "";
      if (re.global) {
        let m: RegExpExecArray | null; let guard = 0;
        while ((m = re.exec(input)) && guard++ < 500) {
          rows.push({ m: m[0], i: m.index, groups: m.slice(1).map(String) });
          if (m[0] === "") re.lastIndex++;
        }
      } else {
        const m = re.exec(input);
        if (m) rows.push({ m: m[0], i: m.index, groups: m.slice(1).map(String) });
      }
      let idx = 0;
      highlighted = input.replace(new RegExp(payload.pattern ?? "", flags.includes("g") ? flags : flags + "g"), (mt) => {
        const at = input.indexOf(mt, idx); idx = at + mt.length;
        return `\u0001${mt}\u0002`;
      })
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/\u0001/g, '<mark style="background:#fde68a;color:inherit;border-radius:3px;padding:0 1px">')
        .replace(/\u0002/g, "</mark>");
    } catch (e) {
      error = (e as Error).message;
    }
    return (
      <div>
        {error ? (
          <p className="rounded-md bg-rose-500/10 p-2.5 font-mono-forge text-[11px] text-rose-600 dark:text-rose-400">{error}</p>
        ) : (
          <>
            <Row label="Matches" value={`${rows.length}`} cls={rows.length ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"} />
            <div className="mt-3 rounded-md bg-background/70 p-2.5 font-mono-forge text-[11px] leading-relaxed break-words" dangerouslySetInnerHTML={{ __html: highlighted || "<span class='opacity-50'>—</span>" }} />
            {rows.length > 0 && (
              <div className="mt-3">
                <p className="mb-1.5 font-mono-forge text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Capture groups</p>
                <ul className="space-y-1">
                  {rows.slice(0, 6).map((r, i) => (
                    <li key={i} className="font-mono-forge text-[10px] text-muted-foreground">
                      <span className="text-foreground/80">{r.m || "∅"}</span>
                      {r.groups.length > 0 && <span> → {r.groups.join(" · ")}</span>}
                      <span className="opacity-50"> @{r.i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  /* headline */
  const a = headlineScore(payload.headline ?? "");
  const verdict = a.total >= 80 ? "strong — ship it" : a.total >= 55 ? "decent — one more pass" : "weak — rewrite";
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-[11px] text-muted-foreground">Score</span>
        <span className={cn("font-mono-forge text-2xl font-extrabold tabular-nums", a.total >= 80 ? "text-emerald-600 dark:text-emerald-400" : a.total >= 55 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400")}>
          {a.total}<span className="text-sm text-muted-foreground">/100</span>
        </span>
      </div>
      <Row label={`Length (${a.len} chars)`} value={`${Math.round(40 * a.lengthScore)} / 40`} />
      <Row label={`Power words (${a.powerHits.length})`} value={`${Math.round(25 * Math.min(1, a.powerHits.length / 2))} / 25`} />
      <Row label="Number present" value={`${a.numberScore ? 20 : 0} / 20`} cls={a.numberScore ? "text-emerald-600 dark:text-emerald-400" : undefined} />
      <Row label={`Sentiment (${a.pos}+ / ${a.neg}−)`} value={`${Math.round(15 * Math.min(1, (a.pos + a.neg) / 1.5))} / 15`} />
      <motion.p layout className="mt-3 text-xs font-semibold text-foreground">{verdict}</motion.p>
      {a.powerHits.length > 0 && (
        <p className="mt-1 font-mono-forge text-[10px] text-muted-foreground">{a.powerHits.join(" · ")}</p>
      )}
    </div>
  );
}
