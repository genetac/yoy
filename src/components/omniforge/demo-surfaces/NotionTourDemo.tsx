"use client";

/* ════════════════════════════════════════════════════════════════════
   NotionTourDemo (Notion System archetypes) — build plan v3 · P3
   board ⇄ table ⇄ calendar ⇄ timeline — four views over one row
   array; the owner filter works across every view, exactly like the
   duplicate-ready workspace.
   ════════════════════════════════════════════════════════════════════ */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LayoutGrid, Table2, CalendarDays, GanttChartSquare, RotateCcw } from "lucide-react";
import type { DemoSurfaceProps, NotionTourDemoContent } from "./types";
import { DemoEndCard } from "./QuizDemo";
import { cn } from "@/lib/utils";

type ViewId = "board" | "table" | "calendar" | "timeline";
const VIEWS: { id: ViewId; label: string; icon: typeof Table2 }[] = [
  { id: "board", label: "Board", icon: LayoutGrid },
  { id: "table", label: "Table", icon: Table2 },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "timeline", label: "Timeline", icon: GanttChartSquare },
];
const STATUSES = ["Backlog", "In progress", "Review", "Done"] as const;
const STATUS_CLS: Record<string, string> = {
  Backlog: "bg-zinc-400/15 text-zinc-600 dark:text-zinc-300",
  "In progress": "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  Review: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Done: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
};

export function NotionTourDemo({ offer, content, onComplete }: DemoSurfaceProps) {
  const ws = content as NotionTourDemoContent;
  const [view, setView] = useState<ViewId>("board");
  const [owner, setOwner] = useState<string>("All");
  const [touched, setTouched] = useState(false);

  const owners = useMemo(() => ["All", ...new Set(ws.rows.map((r) => r.owner))], [ws.rows]);
  const rows = useMemo(
    () => (owner === "All" ? ws.rows : ws.rows.filter((r) => r.owner === owner)),
    [ws.rows, owner]
  );
  const due = (iso: string) => new Date(iso + "T00:00:00");
  const fmt = (iso: string) =>
    due(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const onFirst = () => {
    if (!touched) {
      setTouched(true);
      onComplete?.({ kind: "notion", rows: ws.rows.length });
    }
  };

  const dates = useMemo(
    () => ws.rows.map((r) => due(r.due).getTime()),
    [ws.rows]
  );
  const minD = new Date(Math.min(...dates)), maxD = new Date(Math.max(...dates));
  const span = Math.max(1, (maxD.getTime() - minD.getTime()) / (1000 * 60 * 60 * 24));
  const pos = (iso: string) => ((due(iso).getTime() - minD.getTime()) / (1000 * 60 * 60 * 24) / span) * 100;

  return (
    <div className="flex min-h-[420px] flex-col" onClick={onFirst} onKeyDown={onFirst}>
      <p className="mb-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{ws.intro}</p>

      {/* Toolbar: views + owner filter */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex rounded-lg border border-border bg-muted/40 p-0.5" role="tablist" aria-label="Workspace views">
          {VIEWS.map((v) => {
            const Icon = v.icon;
            const active = view === v.id;
            return (
              <button
                key={v.id}
                role="tab"
                aria-selected={active}
                onClick={() => setView(v.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors",
                  active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{v.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <label className="font-mono-forge text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground" htmlFor="demo-owner">
            Owner
          </label>
          <select
            id="demo-owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground"
          >
            {owners.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <button
            onClick={() => { setOwner("All"); setView("board"); }}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono-forge text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3" aria-hidden="true" /> Reset
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.16 }}
          className="flex-1"
        >
          {view === "board" && (
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {STATUSES.map((status) => {
                const cards = rows.filter((r) => r.status === status);
                return (
                  <div key={status} className="rounded-xl border border-border bg-muted/30 p-2">
                    <p className="mb-2 flex items-center justify-between px-1 font-mono-forge text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      {status}
                      <span className="rounded-full bg-background px-1.5 tabular-nums">{cards.length}</span>
                    </p>
                    <ul className="space-y-1.5">
                      {cards.map((r) => (
                        <li key={r.id} className="rounded-lg border border-border bg-background p-2 shadow-sm">
                          <p className="text-[11px] font-semibold leading-snug text-foreground">{r.task}</p>
                          <p className="mt-1 flex items-center justify-between font-mono-forge text-[9px] text-muted-foreground">
                            <span>{r.owner}</span>
                            <span className={cn("rounded px-1", STATUS_CLS[r.priority])}>{r.priority}</span>
                          </p>
                        </li>
                      ))}
                      {cards.length === 0 && <li className="px-1 py-2 text-[10px] text-muted-foreground/60">—</li>}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {view === "table" && (
            <div className="overflow-x-auto rounded-xl border border-border bg-background">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-left">
                    <th className="px-3 py-2 font-mono-forge text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Task</th>
                    <th className="px-3 py-2 font-mono-forge text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Owner</th>
                    <th className="px-3 py-2 font-mono-forge text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Status</th>
                    <th className="px-3 py-2 font-mono-forge text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Due</th>
                    <th className="px-3 py-2 font-mono-forge text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Effort</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                      <td className="px-3 py-2 font-medium text-foreground">{r.task}</td>
                      <td className="px-3 py-2 text-muted-foreground">{r.owner}</td>
                      <td className="px-3 py-2">
                        <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", STATUS_CLS[r.status])}>{r.status}</span>
                      </td>
                      <td className="px-3 py-2 font-mono-forge text-muted-foreground tabular-nums">{fmt(r.due)}</td>
                      <td className="px-3 py-2 font-mono-forge text-muted-foreground tabular-nums">{r.effort}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === "calendar" && (
            <div className="rounded-xl border border-border bg-background p-3">
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="py-1 font-mono-forge text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{d}</span>
                ))}
                {(() => {
                  const first = new Date(minD);
                  first.setDate(first.getDate() - ((first.getDay() + 6) % 7));
                  const days: { date: Date; items: typeof rows }[] = [];
                  for (let i = 0; i < 28; i++) {
                    const d = new Date(first);
                    d.setDate(d.getDate() + i);
                    days.push({ date: d, items: rows.filter((r) => due(r.due).toDateString() === d.toDateString()) });
                  }
                  return days.map(({ date: d, items }, i) => (
                    <div
                      key={i}
                      className={cn(
                        "min-h-14 rounded-md border p-1",
                        items.length ? "border-primary/30 bg-primary/[0.04]" : "border-border/60"
                      )}
                    >
                      <span className={cn("font-mono-forge text-[9px] tabular-nums", items.length ? "text-primary" : "text-muted-foreground/60")}>
                        {d.getDate()}
                      </span>
                      {items.slice(0, 2).map((r) => (
                        <p key={r.id} className="mt-0.5 truncate rounded bg-background px-1 text-[9px] font-semibold text-foreground/85" title={r.task}>
                          {r.task}
                        </p>
                      ))}
                      {items.length > 2 && (
                        <span className="font-mono-forge text-[8px] text-muted-foreground">+{items.length - 2}</span>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {view === "timeline" && (
            <div className="rounded-xl border border-border bg-background p-3">
              <div className="mb-2 flex justify-between font-mono-forge text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                <span>{fmt(minD.toISOString().slice(0, 10))}</span>
                <span>{fmt(maxD.toISOString().slice(0, 10))}</span>
              </div>
              <ul className="relative space-y-1.5">
                {rows.map((r) => (
                  <li key={r.id} className="flex items-center gap-3">
                    <span className="w-40 shrink-0 truncate text-[11px] font-medium text-foreground" title={r.task}>{r.task}</span>
                    <span className="relative h-5 flex-1 rounded-md bg-muted/50">
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: "14%" }}
                        className={cn(
                          "absolute top-0.5 flex h-4 items-center rounded px-1.5 text-[9px] font-bold text-white",
                          r.status === "Done" ? "bg-emerald-500" : r.status === "Review" ? "bg-amber-500" : r.status === "In progress" ? "bg-sky-500" : "bg-zinc-400"
                        )}
                        style={{ left: `${pos(r.due)}%` }}
                      >
                        <span className="truncate">{fmt(r.due)}</span>
                      </motion.span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4">
        <DemoEndCard offer={offer} onRestart={() => { setOwner("All"); setView("board"); }} />
      </div>
    </div>
  );
}
