'use client';
/**
 * OMNIFORGE · FamilyGrammar (Design Matrix v2)
 *
 * Live miniature previews of each family's visual grammar — a port of
 * the uploaded OmniForge OS "FamilyMiniature" pattern, rebuilt on the
 * engine token system: every miniature re-dresses with the active
 * engine (accent, fonts, material, radius), so the family cards carry
 * real previews that are always included in the engine change.
 */
import { FAMILY_GRAMMAR } from '@/data/system-contract';
import type { DesignFamilyId } from '@/data/designFamilies';

const bar = (w: number | string, h = 5, o = 0.12, r = 2) => (
  <div style={{ width: w, height: h, borderRadius: r, background: `currentColor`, opacity: o }} />
);

function Shell({ fid, children }: { fid: DesignFamilyId; children: React.ReactNode }) {
  const g = FAMILY_GRAMMAR[fid];
  return (
    <div
      className="of-plate overflow-hidden"
      style={{ borderRadius: 'inherit', background: 'var(--of-plate-bg-2)' }}
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: 'var(--of-plate-edge)' }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--of-brass)' }} />
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-15" />
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-15" />
        <span className="ml-2 truncate font-mono text-[8px] uppercase tracking-[0.22em] opacity-60">
          {g.index} · {g.motion}
        </span>
      </div>
      <div className="p-3.5" style={{ color: 'var(--of-text)' }}>{children}</div>
    </div>
  );
}

export function FamilyGrammar({ fid }: { fid: DesignFamilyId }) {
  if (fid === 'micro') {
    return (
      <Shell fid={fid}>
        <div className="flex flex-col items-center gap-2.5 py-2 text-center">
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, lineHeight: 1, letterSpacing: '-0.03em' }}>
            One file.<br />Done.
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">$29 · instant</div>
          <div
            className="mt-1 px-4 py-2 text-[10px] font-bold"
            style={{ background: 'var(--of-brass)', color: 'var(--of-plate-bg)', borderRadius: 8 }}
          >
            Download now
          </div>
        </div>
      </Shell>
    );
  }
  if (fid === 'industry-warm') {
    return (
      <Shell fid={fid}>
        <div className="flex flex-col gap-3">
          <div
            className="flex-1"
            style={{
              height: 54,
              borderRadius: 12,
              background: `linear-gradient(120deg, color-mix(in srgb, var(--of-brass) 30%, transparent), color-mix(in srgb, var(--of-text) 7%, transparent))`,
            }}
          />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, lineHeight: 1.15 }}>
            A quiet table,<br />held for you.
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 flex-1 rounded-full border" style={{ borderColor: 'var(--of-hairline)' }} />
            <div className="px-3 py-1.5 text-[9px] font-bold" style={{ background: 'var(--of-brass)', color: 'var(--of-plate-bg)', borderRadius: 999 }}>
              Book
            </div>
          </div>
        </div>
      </Shell>
    );
  }
  if (fid === 'data-dense') {
    return (
      <Shell fid={fid}>
        <div className="flex gap-3">
          <div className="flex w-9 flex-col gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-2" style={{ borderRadius: 2, background: i === 0 ? 'var(--of-brass)' : 'currentColor', opacity: i === 0 ? 1 : 0.1 }} />
            ))}
          </div>
          <div className="grid flex-1 grid-cols-2 gap-1.5">
            {[['12.4k', 'sessions'], ['3.9%', 'conv.'], ['182', 'orders'], ['2.1%', 'refunds']].map(([v, l]) => (
              <div key={l} className="border p-1.5" style={{ borderColor: 'var(--of-plate-edge)', borderRadius: 3 }}>
                <div className="font-mono text-[12px] font-semibold tabular-nums">{v}</div>
                <div className="font-mono text-[7px] uppercase tracking-[0.16em] opacity-55">{l}</div>
              </div>
            ))}
            <div className="col-span-2 flex h-9 items-end gap-1 border p-1.5" style={{ borderColor: 'var(--of-plate-edge)', borderRadius: 3 }}>
              {[38, 55, 30, 72, 48, 84, 60].map((h, i) => (
                <div key={i} className="flex-1" style={{ height: `${h}%`, borderRadius: 1, background: i === 5 ? 'var(--of-brass)' : 'currentColor', opacity: i === 5 ? 1 : 0.16 }} />
              ))}
            </div>
          </div>
        </div>
      </Shell>
    );
  }
  if (fid === 'saas-product') {
    return (
      <Shell fid={fid}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3" style={{ borderRadius: 4, background: 'var(--of-brass)' }} />
              {bar(30, 5, 0.18)}
            </div>
            <div className="px-2 py-1 text-[8px] font-bold" style={{ background: 'var(--of-brass)', color: 'var(--of-plate-bg)', borderRadius: 999 }}>
              Trial
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13.5, lineHeight: 1.25 }}>
            Ship the workflow,<br />not the spreadsheet.
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border p-1.5" style={{ borderColor: 'var(--of-plate-edge)', borderRadius: 8 }}>
                <span className="block h-2 w-2" style={{ borderRadius: 3, background: i === 1 ? 'var(--of-brass)' : 'currentColor', opacity: i === 1 ? 1 : 0.2 }} />
                <div className="mt-1.5">{bar('100%', 4, 0.1)}</div>
                <div className="mt-1">{bar('62%', 4, 0.1)}</div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    );
  }
  return (
    <Shell fid={fid}>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--of-plate-edge)' }}>
          {bar(34, 5, 0.2)}
          {bar(22, 5, 0.1)}
          {bar(28, 5, 0.1)}
          <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: 'var(--of-brass)' }} />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[['RBAC', '4 roles'], ['SLA', '99.95%'], ['SOC 2', 'audited']].map(([v, l]) => (
            <div key={v} className="border p-1.5" style={{ borderColor: 'var(--of-plate-edge)', borderRadius: 2 }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 10.5 }}>{v}</div>
              <div className="font-mono text-[7px] uppercase tracking-[0.16em] opacity-55">{l}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              {bar('36%', 4, 0.12)}
              <span className="ml-auto h-1.5 w-9" style={{ borderRadius: 2, background: i === 0 ? 'var(--of-brass)' : 'currentColor', opacity: i === 0 ? 1 : 0.12 }} />
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/** The info lines under a family heading — grammar, buyer need, best for. */
export function GrammarInfo({ fid, compact = false }: { fid: DesignFamilyId; compact?: boolean }) {
  const g = FAMILY_GRAMMAR[fid];
  const items = compact
    ? [['Buyer need', g.buyerNeed], ['Grammar', g.grammar]]
    : [['Buyer need', g.buyerNeed], ['Grammar', g.grammar], ['Best work', g.bestFor], ['Signature', g.signature]];
  return (
    <dl className={`grid gap-x-6 gap-y-3 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="font-mono text-[8.5px] font-bold uppercase tracking-[0.2em] opacity-55">{k}</dt>
          <dd className="mt-1 text-[11.5px] leading-snug opacity-85">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
