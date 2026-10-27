'use client';

import { useState } from 'react';

/**
 * NotionTourDemo (P3) — Notion System archetype
 *
 * 4 views (board / table / calendar / timeline) all derived from ONE
 * row array. Filter by owner/status works across all views.
 * State machine: board ⇄ table ⇄ calendar ⇄ timeline
 */

interface OKR {
  id: string;
  title: string;
  owner: 'Sarah' | 'Marcus' | 'Lin';
  status: 'On Track' | 'At Risk' | 'Behind' | 'Done';
  progress: number;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  week: number; // 1-13
}

const ROWS: OKR[] = [
  { id: 'O-01', title: 'Ship v2.0 dashboard', owner: 'Sarah', status: 'On Track', progress: 72, quarter: 'Q1', week: 9 },
  { id: 'O-02', title: 'Hire 2 engineers', owner: 'Marcus', status: 'At Risk', progress: 45, quarter: 'Q1', week: 6 },
  { id: 'O-03', title: 'Reach $50k MRR', owner: 'Lin', status: 'On Track', progress: 68, quarter: 'Q1', week: 11 },
  { id: 'O-04', title: 'Launch partner program', owner: 'Sarah', status: 'Behind', progress: 20, quarter: 'Q2', week: 2 },
  { id: 'O-05', title: 'NPS ≥ 50', owner: 'Marcus', status: 'On Track', progress: 55, quarter: 'Q2', week: 5 },
  { id: 'O-06', title: 'Reduce churn to 3%', owner: 'Lin', status: 'At Risk', progress: 38, quarter: 'Q2', week: 8 },
  { id: 'O-07', title: 'SOC 2 compliance', owner: 'Sarah', status: 'Done', progress: 100, quarter: 'Q1', week: 13 },
  { id: 'O-08', title: 'Open EU market', owner: 'Marcus', status: 'Behind', progress: 15, quarter: 'Q3', week: 1 },
];

type View = 'board' | 'table' | 'calendar' | 'timeline';
type FilterOwner = 'All' | OKR['owner'];
type FilterStatus = 'All' | OKR['status'];

const STATUS_COLORS: Record<OKR['status'], string> = {
  'On Track': '#5B7C5B',
  'At Risk': '#B8913F',
  'Behind': '#8B2A1F',
  Done: '#6B665E',
};

export default function NotionTourDemo() {
  const [view, setView] = useState<View>('board');
  const [filterOwner, setFilterOwner] = useState<FilterOwner>('All');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');

  const filtered = ROWS.filter(
    (r) =>
      (filterOwner === 'All' || r.owner === filterOwner) &&
      (filterStatus === 'All' || r.status === filterStatus),
  );

  const owners: FilterOwner[] = ['All', 'Sarah', 'Marcus', 'Lin'];
  const statuses: FilterStatus[] = ['All', 'On Track', 'At Risk', 'Behind', 'Done'];

  return (
    <div className="relative">
      <span className="ribbon-sample">Sample</span>
      <div className="p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)]">
          OKR Notion System · 4 synced views · 1 data source
        </p>
        <h3 className="mt-2 font-display text-xl font-bold text-[var(--ink)]">
          Switch views over 8 sample OKRs
        </h3>

        {/* View switcher */}
        <div className="mt-4 flex gap-1 border-b border-[var(--plate-edge)]">
          {(['board', 'table', 'calendar', 'timeline'] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition ${
                view === v
                  ? 'border-b-2 border-[var(--brass-line)] text-[var(--ink)]'
                  : 'text-[var(--ink-dim)] hover:text-[var(--ink-soft)]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-3 flex flex-wrap gap-2">
          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value as FilterOwner)}
            className="border border-[var(--plate-edge)] bg-[var(--plate-bg)] px-2 py-1 font-mono text-[10px] text-[var(--ink-soft)]"
          >
            {owners.map((o) => <option key={o} value={o}>Owner: {o}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="border border-[var(--plate-edge)] bg-[var(--plate-bg)] px-2 py-1 font-mono text-[10px] text-[var(--ink-soft)]"
          >
            {statuses.map((s) => <option key={s} value={s}>Status: {s}</option>)}
          </select>
          <span className="ml-auto self-center font-mono text-[10px] text-[var(--ink-dim)]">
            {filtered.length} / {ROWS.length} rows
          </span>
        </div>

        {/* Views */}
        <div className="mt-4">
          {view === 'board' && <BoardView rows={filtered} />}
          {view === 'table' && <TableView rows={filtered} />}
          {view === 'calendar' && <CalendarView rows={filtered} />}
          {view === 'timeline' && <TimelineView rows={filtered} />}
        </div>

        <div className="mt-6 flex justify-end">
          <a href="#buy" className="border border-[var(--ink)] bg-[var(--ink)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--plate-bg)]">
            Get the full system (25 OKRs + rituals) →
          </a>
        </div>
      </div>
    </div>
  );
}

function BoardView({ rows }: { rows: OKR[] }) {
  const cols: OKR['status'][] = ['On Track', 'At Risk', 'Behind', 'Done'];
  return (
    <div className="grid grid-cols-4 gap-2">
      {cols.map((col) => (
        <div key={col}>
          <p className="mb-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ink-dim)]">
            <span className="h-2 w-2 rounded-full" style={{ background: STATUS_COLORS[col] }} />
            {col}
          </p>
          <div className="flex flex-col gap-1.5">
            {rows.filter((r) => r.status === col).map((r) => (
              <div key={r.id} className="border border-[var(--plate-edge)] bg-[var(--plate-bg)] p-2">
                <p className="text-[11px] font-medium leading-tight text-[var(--ink)]">{r.title}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="font-mono text-[8px] text-[var(--ink-dim)]">{r.owner}</span>
                  <span className="font-mono text-[8px] text-[var(--ink-dim)]">{r.progress}%</span>
                </div>
                <div className="mt-1 h-0.5 bg-[var(--plate-bg-deep)]">
                  <div className="h-full" style={{ width: `${r.progress}%`, background: STATUS_COLORS[r.status] }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TableView({ rows }: { rows: OKR[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full font-mono text-[10px]">
        <thead>
          <tr className="border-b border-[var(--plate-edge)] text-left text-[var(--ink-dim)]">
            <th className="py-1.5 pr-2 font-normal">ID</th>
            <th className="py-1.5 pr-2 font-normal">Title</th>
            <th className="py-1.5 pr-2 font-normal">Owner</th>
            <th className="py-1.5 pr-2 font-normal">Status</th>
            <th className="py-1.5 pr-2 font-normal">Progress</th>
            <th className="py-1.5 pr-2 font-normal">Q</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-[var(--plate-edge)]/50 text-[var(--ink)]">
              <td className="py-1.5 pr-2 text-[var(--ink-dim)]">{r.id}</td>
              <td className="py-1.5 pr-2">{r.title}</td>
              <td className="py-1.5 pr-2 text-[var(--ink-soft)]">{r.owner}</td>
              <td className="py-1.5 pr-2">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLORS[r.status] }} />
                  {r.status}
                </span>
              </td>
              <td className="py-1.5 pr-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-1 w-16 bg-[var(--plate-bg-deep)]">
                    <div className="h-full" style={{ width: `${r.progress}%`, background: STATUS_COLORS[r.status] }} />
                  </div>
                  <span className="text-[var(--ink-dim)]">{r.progress}%</span>
                </div>
              </td>
              <td className="py-1.5 pr-2 text-[var(--ink-dim)]">{r.quarter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalendarView({ rows }: { rows: OKR[] }) {
  const weeks = Array.from({ length: 13 }, (_, i) => i + 1);
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-13 gap-px border border-[var(--plate-edge)] bg-[var(--plate-edge)]" style={{ gridTemplateColumns: 'repeat(13, 1fr)' }}>
          {weeks.map((w) => (
            <div key={w} className="bg-[var(--plate-bg-deep)] py-1 text-center font-mono text-[8px] text-[var(--ink-dim)]">
              W{w}
            </div>
          ))}
          {weeks.map((w) => {
            const due = rows.filter((r) => r.week === w);
            return (
              <div key={w} className="min-h-[48px] bg-[var(--plate-bg)] p-1">
                {due.map((r) => (
                  <div key={r.id} className="mb-0.5 truncate border-l-2 bg-[var(--plate-bg-deep)] px-1 py-0.5 text-[8px] text-[var(--ink-soft)]" style={{ borderColor: STATUS_COLORS[r.status] }}>
                    {r.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TimelineView({ rows }: { rows: OKR[] }) {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  return (
    <div className="flex flex-col gap-1">
      {quarters.map((q) => (
        <div key={q} className="flex items-center gap-2">
          <span className="w-8 font-mono text-[9px] text-[var(--ink-dim)]">{q}</span>
          <div className="relative h-6 flex-1 bg-[var(--plate-bg-deep)]">
            {rows.filter((r) => r.quarter === q).map((r, i) => (
              <div
                key={r.id}
                className="absolute top-0.5 h-5 border-l-2 px-1.5 text-[8px] leading-5 text-[var(--ink)]"
                style={{
                  left: `${((r.week - 1) / 13) * 100}%`,
                  width: '18%',
                  background: STATUS_COLORS[r.status] + '30',
                  borderColor: STATUS_COLORS[r.status],
                }}
              >
                {r.title.slice(0, 16)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
