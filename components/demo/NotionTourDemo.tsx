"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  ChartGantt,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Filter,
  Gem,
  LayoutGrid,
  RotateCcw,
  Table as TableIcon,
} from "lucide-react";
import type { DemoOffer, DemoProps } from "./types";

/* ── the one dataset every view is derived from ── */
type Owner = "Ana" | "Ben" | "Clara";
type Status = "Backlog" | "In progress" | "Review" | "Done";
type Priority = "Low" | "Medium" | "High" | "Urgent";
type Row = { id: number; name: string; owner: Owner; status: Status; start: string; due: string; priority: Priority };

const OWNERS: Owner[] = ["Ana", "Ben", "Clara"];
const STATUSES: Status[] = ["Backlog", "In progress", "Review", "Done"];

const ROWS: Row[] = [
  { id: 1, name: "Landing page redesign", owner: "Ana", status: "Review", start: "2026-03-02", due: "2026-03-13", priority: "High" },
  { id: 2, name: "Pricing page A/B test", owner: "Ben", status: "In progress", start: "2026-03-09", due: "2026-03-27", priority: "Medium" },
  { id: 3, name: "Onboarding email sequence", owner: "Clara", status: "Backlog", start: "2026-03-16", due: "2026-04-03", priority: "Medium" },
  { id: 4, name: "Customer interviews · round 2", owner: "Ana", status: "In progress", start: "2026-03-05", due: "2026-03-20", priority: "Urgent" },
  { id: 5, name: "Brand asset audit", owner: "Clara", status: "Review", start: "2026-03-10", due: "2026-03-19", priority: "Low" },
  { id: 6, name: "Payments API integration", owner: "Ben", status: "In progress", start: "2026-03-12", due: "2026-04-10", priority: "High" },
  { id: 7, name: "SEO content sprint", owner: "Ana", status: "Backlog", start: "2026-03-23", due: "2026-04-17", priority: "Medium" },
  { id: 8, name: "Quarterly board deck", owner: "Clara", status: "Done", start: "2026-03-02", due: "2026-03-12", priority: "High" },
  { id: 9, name: "Support help center", owner: "Ben", status: "Backlog", start: "2026-04-01", due: "2026-04-24", priority: "Low" },
  { id: 10, name: "Mobile app beta", owner: "Ana", status: "Review", start: "2026-03-19", due: "2026-04-08", priority: "Urgent" },
  { id: 11, name: "Churn analysis dashboard", owner: "Clara", status: "In progress", start: "2026-03-26", due: "2026-04-15", priority: "High" },
  { id: 12, name: "Referral program launch", owner: "Ben", status: "Done", start: "2026-03-06", due: "2026-03-24", priority: "Medium" },
];

const STATUS_ORDER: Record<Status, number> = { Backlog: 0, "In progress": 1, Review: 2, Done: 3 };
const PRIORITY_RANK: Record<Priority, number> = { Low: 0, Medium: 1, High: 2, Urgent: 3 };
const PRIORITY_DOT: Record<Priority, string> = { Urgent: "bg-red-500", High: "bg-amber-500", Medium: "bg-[#b28b3d]", Low: "bg-zinc-400" };
const STATUS_STYLE: Record<Status, { chip: string; bar: string }> = {
  Backlog: { chip: "border-zinc-400/40 bg-zinc-500/10 text-zinc-600 dark:text-zinc-300", bar: "bg-zinc-400 dark:bg-zinc-500" },
  "In progress": { chip: "border-sky-400/40 bg-sky-500/10 text-sky-700 dark:text-sky-300", bar: "bg-sky-500" },
  Review: { chip: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300", bar: "bg-amber-500" },
  Done: { chip: "border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", bar: "bg-emerald-500" },
};
const OWNER_STYLE: Record<Owner, string> = {
  Ana: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  Ben: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  Clara: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
};

/* ── deterministic UTC date helpers ── */
const DAY = 86400000;
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayOf = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / DAY;
};
const fmtDue = (iso: string) => `${MONTHS_SHORT[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8))}`;
const fromDay = (n: number) => {
  const d = new Date(n * DAY);
  return `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`;
};

const T0 = dayOf("2026-03-02"); // 8-week window: Mar 2 → Apr 26, 2026
const CAL_MONTHS = [{ year: 2026, month: 3 }, { year: 2026, month: 4 }];
const pad = (n: number) => String(n).padStart(2, "0");

type View = "board" | "table" | "calendar" | "timeline";
type SortKey = "name" | "owner" | "status" | "due" | "priority";

export function NotionTourDemo({ offer, onComplete }: DemoProps) {
  const [view, setView] = useState<View>("board");
  const [owner, setOwner] = useState<"All" | Owner>("All");
  const [statuses, setStatuses] = useState<Status[]>(STATUSES);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "due", dir: 1 });
  const cbRef = useRef(onComplete);
  useEffect(() => {
    cbRef.current = onComplete;
  });

  const filtered = useMemo(
    () => ROWS.filter((r) => (owner === "All" || r.owner === owner) && statuses.includes(r.status)),
    [owner, statuses]
  );
  const fire = (action: string, extra: Record<string, unknown> = {}) =>
    cbRef.current?.({ demo: "notion-tour", action, view, owner, visible: filtered.length, ...extra });

  const reset = () => {
    setView("board");
    setOwner("All");
    setStatuses(STATUSES);
    setSort({ key: "due", dir: 1 });
  };
  const toggleStatus = (s: Status) =>
    setStatuses((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <div className="of-plate flex max-h-[620px] w-full flex-col overflow-hidden text-zinc-800 dark:text-zinc-200">
      <span aria-hidden="true" className="absolute right-0 top-0 z-20 border-b border-l border-[#a37a2e]/40 bg-gradient-to-b from-[#f8f1dd] to-[#ecdfc0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-800 dark:border-amber-500/30 dark:from-zinc-800 dark:to-zinc-900 dark:text-amber-300">
        Sample
      </span>
      <header className="flex items-center gap-3 px-5 py-3 pr-24">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-zinc-900 text-amber-200 dark:bg-amber-100 dark:text-zinc-900">
          <LayoutGrid className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h3 className="of-engrave text-sm font-semibold tracking-tight">Project OS — one dataset, four views</h3>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Board, table, calendar and timeline — all from the same 12 rows</p>
        </div>
        <button onClick={reset} className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold text-zinc-500 transition-colors duration-150 hover:bg-zinc-900/5 hover:text-zinc-800 focus-visible:outline-2 focus-visible:outline-amber-600 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </header>

      {/* filter bar — applies to every view */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-zinc-200/70 px-5 py-2 dark:border-zinc-700/60">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">
          <Filter className="h-3 w-3" /> Filter
        </span>
        <div className="flex items-center gap-1" role="group" aria-label="Owner filter">
          {(["All", ...OWNERS] as const).map((o) => (
            <button key={o} onClick={() => { setOwner(o); fire("filter-owner", { owner: o }); }} aria-pressed={owner === o}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-amber-600 ${
                owner === o ? "bg-zinc-900 text-amber-50 dark:bg-amber-100 dark:text-zinc-900" : "text-zinc-500 hover:bg-zinc-900/5 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10"}`}>
              {o}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5" role="group" aria-label="Status filter">
          {STATUSES.map((s) => {
            const on = statuses.includes(s);
            return (
              <button key={s} onClick={() => { toggleStatus(s); fire("filter-status", { status: s, enabled: !on }); }} aria-pressed={on}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-amber-600 ${
                  on ? STATUS_STYLE[s].chip : "border-zinc-300/60 text-zinc-400 hover:text-zinc-600 dark:border-zinc-700 dark:text-zinc-500"
                }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLE[s].bar}`} /> {s}
              </button>
            );
          })}
        </div>
        <span className="ml-auto font-mono text-[10px] text-zinc-400">{filtered.length} / {ROWS.length} projects</span>
      </div>

      {/* view switcher */}
      <nav className="flex gap-1 px-5 pt-2.5" role="tablist" aria-label="Project views">
        {([
          { id: "board", label: "Board", icon: Columns3 },
          { id: "table", label: "Table", icon: TableIcon },
          { id: "calendar", label: "Calendar", icon: Calendar },
          { id: "timeline", label: "Timeline", icon: ChartGantt },
        ] as const).map((v) => {
          const Icon = v.icon;
          return (
            <button key={v.id} role="tab" aria-selected={view === v.id} onClick={() => { setView(v.id); fire("switch-view", { view: v.id }); }}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-amber-600 ${
                view === v.id
                  ? "border-amber-600/50 bg-amber-100/60 text-amber-900 dark:border-amber-400/40 dark:bg-amber-400/15 dark:text-amber-300"
                  : "border-transparent text-zinc-500 hover:bg-zinc-900/5 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10"
              }`}>
              <Icon className="h-3.5 w-3.5" /> {v.label}
            </button>
          );
        })}
      </nav>

      <div className="min-h-0 flex-1 overflow-auto px-5 pb-5 pt-3">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-[12px] text-zinc-500 dark:text-zinc-400">No projects match the current filters — loosen the owner or status chips above.</p>
        ) : (
          <>
            {view === "board" && <BoardView rows={filtered} />}
            {view === "table" && <TableView rows={filtered} sort={sort} setSort={setSort} />}
            {view === "calendar" && <CalendarView rows={filtered} />}
            {view === "timeline" && <TimelineView rows={filtered} />}
          </>
        )}
      </div>

      <footer className="border-t border-zinc-200/70 px-4 py-3 dark:border-zinc-700/60">
        <div className="of-hairline flex items-center gap-3.5 rounded-xl bg-gradient-to-b from-amber-50/90 to-[#efe6cf] p-3 dark:from-zinc-900 dark:to-zinc-950">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-zinc-900 text-amber-200 dark:bg-amber-100 dark:text-zinc-900">
            <Gem className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-amber-800/80 dark:text-amber-500/80">This is a 12-row sample workspace</p>
            <p className="of-engrave truncate text-[13px] font-semibold">{offer.title}</p>
          </div>
          <div className="text-right">
            {offer.price != null ? (
              <p className="of-foil-text font-mono text-base font-bold leading-tight">${offer.price.toLocaleString("en-US")}</p>
            ) : (
              <p className="of-foil-text font-mono text-sm font-bold leading-tight">Request demo</p>
            )}
            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">full system · one-time</p>
          </div>
          <button
            onClick={() => fire("get-full-kit", { offerId: offer.offerId })}
            className="shrink-0 rounded-lg bg-zinc-900 px-3.5 py-2 text-[11px] font-semibold text-amber-50 transition-colors duration-200 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-amber-100 dark:text-zinc-900 dark:hover:bg-amber-50"
          >
            Get the full kit
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ── Board ── */
function BoardView({ rows }: { rows: Row[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
      {STATUSES.map((st) => {
        const col = rows.filter((r) => r.status === st);
        return (
          <div key={st} className="flex min-w-0 flex-col gap-2 rounded-xl bg-zinc-900/[.035] p-2 dark:bg-white/[.04]">
            <div className="flex items-center justify-between px-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500">
                <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLE[st].bar}`} /> {st}
              </span>
              <span className="font-mono text-[10px] text-zinc-400">{col.length}</span>
            </div>
            {col.map((r) => (
              <article key={r.id} className="of-hairline rounded-lg bg-white/80 p-2.5 shadow-[0_2px_6px_-3px_rgba(24,20,13,.25)] dark:bg-zinc-900/70">
                <h4 className="text-[11.5px] font-semibold leading-snug tracking-tight">{r.name}</h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${PRIORITY_DOT[r.priority]}`} aria-label={`${r.priority} priority`} />
                  <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">{fmtDue(r.due)}</span>
                  <span className={`ml-auto grid h-4 w-4 shrink-0 place-items-center rounded-full text-[8px] font-bold ${OWNER_STYLE[r.owner]}`} aria-label={`Owner ${r.owner}`}>{r.owner[0]}</span>
                </div>
              </article>
            ))}
            {col.length === 0 && <p className="rounded-lg border border-dashed border-zinc-300/70 py-3 text-center text-[10px] text-zinc-400 dark:border-zinc-700">Empty</p>}
          </div>
        );
      })}
    </div>
  );
}

/* ── Table ── */
function TableView({ rows, sort, setSort }: { rows: Row[]; sort: { key: SortKey; dir: 1 | -1 }; setSort: (s: { key: SortKey; dir: 1 | -1 }) => void }) {
  const cmp = (a: Row, b: Row): number => {
    switch (sort.key) {
      case "name": return a.name.localeCompare(b.name);
      case "owner": return a.owner.localeCompare(b.owner);
      case "status": return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      case "priority": return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      default: return dayOf(a.due) - dayOf(b.due);
    }
  };
  const sorted = [...rows].sort((a, b) => sort.dir * cmp(a, b));
  const cols: { key: SortKey; label: string; align?: string }[] = [
    { key: "name", label: "Project" },
    { key: "owner", label: "Owner" },
    { key: "status", label: "Status" },
    { key: "due", label: "Due", align: "text-right" },
    { key: "priority", label: "Priority", align: "text-right" },
  ];
  return (
    <div className="of-hairline overflow-hidden rounded-xl bg-white/60 dark:bg-zinc-900/50">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="border-b border-[#a37a2e]/25 bg-zinc-900/[.03] dark:bg-white/[.04]">
            {cols.map((c) => (
              <th key={c.key} scope="col" className={`px-3 py-2 text-left font-bold uppercase tracking-[0.08em] ${c.align ?? ""}`} aria-sort={sort.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                <button onClick={() => setSort(sort.key === c.key ? { key: c.key, dir: sort.dir === 1 ? -1 : 1 } : { key: c.key, dir: 1 })}
                  className={`inline-flex items-center gap-1 text-[10px] transition-colors duration-150 hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-amber-600 dark:hover:text-amber-400 ${sort.key === c.key ? "text-amber-800 dark:text-amber-400" : "text-zinc-500"}`}>
                  {c.label}
                  <span aria-hidden="true" className="font-mono">{sort.key === c.key ? (sort.dir === 1 ? "↑" : "↓") : "↕"}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id} className="border-b border-zinc-200/60 transition-colors duration-150 last:border-0 hover:bg-amber-50/50 dark:border-zinc-700/40 dark:hover:bg-white/[.04]">
              <td className="px-3 py-2 font-semibold tracking-tight">{r.name}</td>
              <td className="px-3 py-2">
                <span className="inline-flex items-center gap-1.5">
                  <span className={`grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold ${OWNER_STYLE[r.owner]}`}>{r.owner[0]}</span>
                  <span className="text-zinc-600 dark:text-zinc-300">{r.owner}</span>
                </span>
              </td>
              <td className="px-3 py-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[r.status].chip}`}>
                  <span className={`h-1 w-1 rounded-full ${STATUS_STYLE[r.status].bar}`} /> {r.status}
                </span>
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums text-zinc-600 dark:text-zinc-300">{fmtDue(r.due)}</td>
              <td className="px-3 py-2">
                <span className="inline-flex items-center justify-end gap-1.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
                  <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[r.priority]}`} /> {r.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Calendar ── */
function CalendarView({ rows }: { rows: Row[] }) {
  const [mi, setMi] = useState(0);
  const { year, month } = CAL_MONTHS[mi];
  const monthKey = `${year}-${pad(month)}`;
  const firstDow = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const byDay = new Map<number, Row[]>();
  rows.forEach((r) => {
    if (r.due.startsWith(monthKey)) {
      const d = Number(r.due.slice(8));
      byDay.set(d, [...(byDay.get(d) ?? []), r]);
    }
  });

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="of-engrave text-[13px] font-semibold tracking-tight">{MONTHS_FULL[month - 1]} {year}</h4>
        <div className="flex gap-1">
          <button onClick={() => setMi((m) => Math.max(0, m - 1))} disabled={mi === 0} aria-label="Previous month"
            className="rounded-md border border-zinc-300/80 bg-white/60 p-1 transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-amber-600 disabled:opacity-35 dark:border-zinc-700 dark:bg-zinc-900/60">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setMi((m) => Math.min(CAL_MONTHS.length - 1, m + 1))} disabled={mi === CAL_MONTHS.length - 1} aria-label="Next month"
            className="rounded-md border border-zinc-300/80 bg-white/60 p-1 transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-amber-600 disabled:opacity-35 dark:border-zinc-700 dark:bg-zinc-900/60">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="of-hairline grid grid-cols-7 overflow-hidden rounded-xl bg-white/60 dark:bg-zinc-900/50">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="border-b border-[#a37a2e]/20 bg-zinc-900/[.03] py-1.5 text-center text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:bg-white/[.04]">{d}</div>
        ))}
        {Array.from({ length: firstDow }, (_, i) => <div key={`b${i}`} aria-hidden="true" className="min-h-14 border-b border-r border-zinc-200/50 dark:border-zinc-700/40" />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
          const events = byDay.get(d) ?? [];
          return (
            <div key={d} className={`min-h-14 border-zinc-200/50 p-1 dark:border-zinc-700/40 ${d % 7 !== (7 - firstDow) % 7 ? "border-r" : ""} border-b`}>
              <span className="font-mono text-[10px] text-zinc-400">{d}</span>
              <div className="mt-0.5 space-y-0.5">
                {events.slice(0, 2).map((r) => (
                  <p key={r.id} title={`${r.name} · ${r.owner} · ${r.priority}`} className={`truncate rounded px-1 py-px text-[9px] font-semibold leading-tight text-white ${STATUS_STYLE[r.status].bar}`}>{r.name}</p>
                ))}
                {events.length > 2 && <p className="px-1 font-mono text-[8px] text-zinc-400">+{events.length - 2} more</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Timeline ── */
function TimelineView({ rows }: { rows: Row[] }) {
  const span = 56; // 8 weeks in days
  return (
    <div className="min-w-[560px]">
      <div className="relative mb-1.5 ml-40 h-5 border-b border-[#a37a2e]/30">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="absolute top-0 -translate-x-1/2 font-mono text-[9px] text-zinc-400" style={{ left: `${(i / 8) * 100}%` }}>
            {i % 2 === 0 ? fromDay(T0 + Math.min(i * 7, 55)) : ""}
          </span>
        ))}
      </div>
      <div className="space-y-1">
        {rows.map((r) => {
          const s = dayOf(r.start) - T0, e = dayOf(r.due) - T0;
          return (
            <div key={r.id} className="flex items-center gap-2">
              <div className="w-40 shrink-0 truncate text-[11px] font-medium" title={r.name}>{r.name}</div>
              <div className="relative h-6 flex-1 rounded bg-zinc-900/[.03] dark:bg-white/[.05]">
                <div className="absolute inset-0 flex" aria-hidden="true">
                  {Array.from({ length: 8 }, (_, i) => <div key={i} className="flex-1 border-r border-zinc-200/50 last:border-0 dark:border-zinc-700/40" />)}
                </div>
                <div
                  role="img" aria-label={`${r.name}: ${fmtDue(r.start)} to ${fmtDue(r.due)}, ${r.status}, ${r.priority} priority, owner ${r.owner}`}
                  title={`${r.name} · ${r.status} · ${r.priority} · due ${fmtDue(r.due)}`}
                  className={`absolute top-1 flex h-4 items-center gap-1 rounded-full px-1.5 shadow-[0_1px_3px_rgba(24,20,13,.3)] ${STATUS_STYLE[r.status].bar}`}
                  style={{ left: `${(s / span) * 100}%`, width: `${Math.max(2, ((e - s) / span) * 100)}%` }}>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/90" />
                </div>
                <span className="absolute top-1/2 -translate-y-1/2 pl-1.5 font-mono text-[9px] text-zinc-400" style={{ left: `${(e / span) * 100}%` }}>{fmtDue(r.due)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="ml-40 mt-2 font-mono text-[9px] text-zinc-400">8-week window · {fromDay(T0)} → {fromDay(T0 + 55)} · bar color = status</p>
    </div>
  );
}
