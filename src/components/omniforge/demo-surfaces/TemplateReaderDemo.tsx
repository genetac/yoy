"use client";

/* ════════════════════════════════════════════════════════════════════
   TemplateReaderDemo (Template Pack archetypes) — build plan v3 · P3
   list → reading → editing → copied. Opens 3 flagship templates with
   full real copy, fills {{merge_fields}} live, copies or prints.
   ════════════════════════════════════════════════════════════════════ */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Check, Printer, RotateCcw, ChevronLeft } from "lucide-react";
import type { DemoSurfaceProps, TemplateReaderDemoContent } from "./types";
import { DemoEndCard } from "./QuizDemo";
import { cn } from "@/lib/utils";

export function TemplateReaderDemo({ offer, content, onComplete }: DemoSurfaceProps) {
  const pack = content as TemplateReaderDemoContent;
  const [openId, setOpenId] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    pack.templates.forEach((t) => t.mergeFields.forEach((f) => { init[f.key] = f.sample; }));
    return init;
  });
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const open = pack.templates.find((t) => t.id === openId) ?? null;

  const fill = (body: string) =>
    body.replace(/\{\{(\w+)\}\}/g, (_, k) => fields[k] ?? `{{${k}}}`);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard blocked — the visual state still teaches the flow */
    }
    setCopied(true);
    onComplete?.({ kind: "templates", copied: openId });
    setTimeout(() => setCopied(false), 1600);
  };

  const print = (text: string) => {
    const w = window.open("", "_blank", "width=680,height=800");
    if (!w) return;
    w.document.write(`<pre style="font:13px/1.7 ui-monospace,monospace;white-space:pre-wrap;padding:32px">${text.replace(/</g, "&lt;")}</pre>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="flex min-h-[420px] flex-col">
      <p className="mb-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{pack.intro}</p>

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid gap-2.5"
          >
            {pack.templates.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setOpenId(t.id); setEditing(false); }}
                className="group flex items-center gap-3.5 rounded-xl border border-border bg-background p-3.5 text-left transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono-forge text-[11px] font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-foreground">{t.title}</span>
                  <span className="block truncate font-mono-forge text-[10px] text-muted-foreground">
                    {t.folder}/ · subject: {t.subject}
                  </span>
                </span>
                <span className="shrink-0 rounded-full border border-border px-2 py-0.5 font-mono-forge text-[9px] font-semibold uppercase tracking-[0.08em] text-muted-foreground group-hover:border-primary/40 group-hover:text-primary">
                  Open
                </span>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={open.id}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.18 }}
            className="flex flex-1 flex-col"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => { setOpenId(null); setEditing(false); }}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono-forge text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="size-3.5" aria-hidden="true" /> All templates
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditing((e) => !e)}
                  aria-pressed={editing}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-colors",
                    editing ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:bg-muted"
                  )}
                >
                  {editing ? "Editing merge fields" : "Edit merge fields"}
                </button>
                <button
                  onClick={() => print(fill(open.body))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <Printer className="size-3.5" aria-hidden="true" /> Print
                </button>
                <button
                  onClick={() => copy(fill(open.body))}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground shadow-sm"
                >
                  {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {editing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mb-3 overflow-hidden rounded-xl border border-primary/30 bg-primary/[0.04] p-3"
              >
                <p className="mb-2 font-mono-forge text-[9px] font-bold uppercase tracking-[0.12em] text-primary">
                  Merge fields — edit and watch the template update
                </p>
                <div className="grid gap-2 min-[480px]:grid-cols-3">
                  {open.mergeFields.map((f) => (
                    <label key={f.key} className="block">
                      <span className="mb-1 block font-mono-forge text-[9px] text-muted-foreground">{`{{${f.key}}}`}</span>
                      <input
                        value={fields[f.key] ?? ""}
                        onChange={(e) => setFields((p) => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                      />
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            <article className="flex-1 rounded-xl border border-border bg-background p-5">
              <header className="mb-4 border-b border-border pb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{open.folder}/</p>
                <h4 className="mt-1 text-base font-bold text-foreground">{open.title}</h4>
                <p className="mt-1 font-mono-forge text-xs text-muted-foreground">
                  Subject: <span className="text-foreground/80">{fill(open.subject)}</span>
                </p>
              </header>
              <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-foreground/90">
                {fill(open.body).split(/(\{\{[^}]+\}\})/).map((chunk, i) =>
                  /^\{\{[^}]+\}\}$/.test(chunk) ? (
                    <mark key={i} className="rounded bg-amber-100 px-1 font-mono-forge text-[11px] text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
                      {chunk}
                    </mark>
                  ) : (
                    <span key={i}>{chunk}</span>
                  )
                )}
              </div>
            </article>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4">
        <DemoEndCard offer={offer} onRestart={() => { setOpenId(null); setEditing(false); }} />
      </div>
    </div>
  );
}
