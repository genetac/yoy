'use client';

import Link from 'next/link';
import type { OfferV2 } from '../_omniforge/types';
import { getFamily } from '../_omniforge/types';

/**
 * ProductListingCard v2 — the 7-part plate anatomy (P1).
 *
 * 1. Plate number (engraved, top-left)
 * 2. Media window (brass inset frame, MotionMedia slot)
 * 3. Title block (name + one-line promise; family chip in frame corner)
 * 4. Proof line (rating, sold count, version, Demo data tag)
 * 5. Contents drawer (collapsed to 3 folder rows + "+N more")
 * 6. Policy chips (engraved pills)
 * 7. Ledger foot (foil price, struck compare-at, edition line, primary action)
 */
export default function ProductListingCard({ offer }: { offer: OfferV2 }) {
  const family = getFamily(offer.family)!;
  const totalFiles = offer.deliverables.reduce(
    (sum, f) => sum + f.files.length,
    0,
  ) + offer.root.length;
  const totalBytes = [...offer.deliverables.flatMap((f) => f.files), ...offer.root].reduce(
    (sum, f) => sum + f.bytes,
    0,
  );
  const realFiles = [...offer.deliverables.flatMap((f) => f.files), ...offer.root].filter(
    (f) => f.flag === 'real',
  ).length;
  const realPct = Math.round((realFiles / totalFiles) * 100);

  return (
    <Link
      href={`/studio/${offer.offerId}`}
      className="plate group block"
      style={
        {
          ...Object.fromEntries(
            Object.entries(family.tokens).map(([k, v]) => [k, v]),
          ),
        } as React.CSSProperties
      }
    >
      {/* 1. Plate number — engraved top-left */}
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="plate-number">No. {String(offer.edition.number).padStart(3, '0')}</span>
        <span className="plate-number">{offer.offerId}</span>
      </div>

      {/* 2. Media window — brass inset frame + family chip */}
      <div className="px-5 pt-3">
        <div className="plate-frame relative aspect-[16/10] overflow-hidden bg-[var(--plate-bg-deep)]">
          {/* Family chip in frame corner */}
          <span className="absolute left-2 top-2 z-10 bg-[var(--obsidian)] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] text-[var(--plate-bg)]">
            {family.label}
          </span>
          {/* Archetype glyph — CSS-3D hover preview */}
          <div className="flex h-full items-center justify-center">
            <ArchetypeGlyph archetype={offer.archetype} title={offer.title} />
          </div>
        </div>
      </div>

      {/* 3. Title block */}
      <div className="px-5 pt-4">
        <h3
          className="font-display text-lg font-bold leading-tight text-[var(--ink)]"
          style={{ fontFamily: family.tokens['--family-font'] }}
        >
          {offer.title}
        </h3>
        <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">
          {offer.tagline}
        </p>
      </div>

      {/* 4. Proof line */}
      <div className="px-5 pt-3">
        <div className="plate-proof flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="text-[var(--brass-line)]">★</span>
            {offer.proof.rating.toFixed(1)}
          </span>
          <span className="text-[var(--plate-edge)]">|</span>
          <span>{offer.proof.soldCount.toLocaleString()} sold</span>
          <span className="text-[var(--plate-edge)]">|</span>
          <span>v{offer.proof.version}</span>
          <span className="demo-data-tag">Demo data</span>
        </div>
      </div>

      {/* 5. Contents drawer — collapsed to 3 rows */}
      <div className="px-5 pt-3">
        <div className="border-t border-[var(--plate-edge)] pt-2">
          {offer.deliverables.slice(0, 3).map((folder) => (
            <div
              key={folder.id}
              className="flex items-baseline justify-between py-1 font-mono text-[10px] text-[var(--ink-soft)]"
            >
              <span className="truncate">
                <span className="text-[var(--ink-dim)]">{folder.id}</span> · {folder.title}
              </span>
              <span className="ml-2 shrink-0 text-[var(--ink-dim)]">
                {folder.files.length} files
              </span>
            </div>
          ))}
          {offer.deliverables.length > 3 && (
            <div className="py-1 font-mono text-[10px] text-[var(--brass-line)]">
              +{offer.deliverables.length - 3} more folders
            </div>
          )}
        </div>
      </div>

      {/* 6. Policy chips */}
      <div className="flex flex-wrap gap-1.5 px-5 pt-3">
        {offer.policies.map((p) => (
          <span key={p.kind} className="plate-chip">
            {p.label}
          </span>
        ))}
      </div>

      {/* 7. Ledger foot */}
      <div className="mt-4 flex items-end justify-between border-t border-[var(--plate-edge)] px-5 py-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="foil font-display text-2xl">
              {offer.price.amount !== null ? `$${offer.price.amount}` : '—'}
            </span>
            {offer.price.compareAt !== null && (
              <span className="font-mono text-xs text-[var(--ink-dim)] line-through">
                ${offer.price.compareAt}
              </span>
            )}
          </div>
          <p className="plate-number mt-1">
            Edition {offer.edition.year} · No. {String(offer.edition.number).padStart(3, '0')} of {offer.edition.of}
          </p>
          <p className="plate-number mt-0.5">
            {totalFiles} files · {formatBytes(totalBytes)} · {realPct}% real
          </p>
        </div>
        <span className="border border-[var(--ink)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--ink)] transition group-hover:bg-[var(--ink)] group-hover:text-[var(--plate-bg)]">
          View →
        </span>
      </div>
    </Link>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Archetype glyph — a CSS-only preview that responds to the family's
 * hover recipe (P4 T1). Each archetype renders a different abstract
 * shape so plates are visually distinguishable at a glance.
 */
function ArchetypeGlyph({
  archetype,
  title,
}: {
  archetype: OfferV2['archetype'];
  title: string;
}) {
  if (archetype === 'template-pack') {
    return (
      <div className="hover-fan-deck relative h-full w-full p-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="fan-card absolute left-1/2 top-1/2 h-[60%] w-[40%] -translate-x-1/2 -translate-y-1/2 border border-[var(--brass-soft)] bg-[var(--plate-bg)] shadow-[var(--shadow-contact)]"
            style={{
              transform: `rotateZ(${(i - 3) * 4}deg)`,
              zIndex: i,
            }}
          >
            <div className="p-2">
              <div className="h-1 w-3/4 bg-[var(--ink-dim)]/30" />
              <div className="mt-1 h-1 w-1/2 bg-[var(--ink-dim)]/20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (archetype === 'toolkit') {
    return (
      <div className="hover-exploded relative h-full w-full p-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="explode-layer absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 border border-[var(--brass-soft)] bg-[var(--plate-bg)] shadow-[var(--shadow-contact)]"
            style={{ zIndex: i }}
          >
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-[8px] text-[var(--ink-dim)]">tool-{i}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (archetype === 'notion-system') {
    return (
      <div className="hover-isometric relative h-full w-full p-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="iso-layer absolute left-1/2 top-1/2 h-[40%] w-[45%] -translate-x-1/2 -translate-y-1/2 border border-[var(--brass-soft)] bg-[var(--plate-bg)] shadow-[var(--shadow-contact)]"
            style={{ zIndex: i }}
          >
            <div className="p-1.5">
              <div className="h-0.5 w-3/4 bg-[var(--ink-dim)]/30" />
              <div className="mt-1 h-0.5 w-1/2 bg-[var(--ink-dim)]/20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (archetype === 'assessment') {
    return (
      <div className="hover-medal-flip relative flex h-full w-full items-center justify-center p-6">
        <div className="medal-3d relative h-16 w-16">
          <div className="medal-face wax-seal">★</div>
          <div className="medal-back medal-face wax-seal" style={{ background: 'var(--ink)', color: 'var(--foil)' }}>
            ✓
          </div>
        </div>
      </div>
    );
  }

  // website-kit — pointer tilt
  return (
    <div className="hover-pointer-tilt relative h-full w-full p-6">
      <div className="absolute left-1/2 top-1/2 h-[65%] w-[55%] -translate-x-1/2 -translate-y-1/2 border border-[var(--brass-soft)] bg-[var(--plate-bg)] shadow-[var(--shadow-contact)]">
        <div className="p-2">
          <div className="h-1 w-1/3 bg-[var(--brass-line)]" />
          <div className="mt-1.5 h-0.5 w-2/3 bg-[var(--ink-dim)]/30" />
          <div className="mt-1 h-0.5 w-1/2 bg-[var(--ink-dim)]/20" />
        </div>
      </div>
    </div>
  );
}
