'use client';

import { use } from 'react';
import { FAMILIES, getFamily } from '../../_omniforge/types';
import { getOffersByFamily } from '../../_omniforge/product-catalog';
import ProductListingCard from '../../_components/ProductListingCard';

export default function FamilyPage({ params }: { params: Promise<{ familyId: string }> }) {
  const { familyId } = use(params);
  const family = getFamily(familyId as typeof FAMILIES[number]['id']);
  if (!family) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl font-bold text-[var(--ink)]">404</p>
          <p className="mt-2 font-mono text-sm text-[var(--ink-dim)]">Family not found</p>
          <a href="/" className="mt-4 inline-block border border-[var(--ink)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)]">← Back home</a>
        </div>
      </main>
    );
  }

  const offers = getOffersByFamily(family.id);

  return (
    <main className="px-[var(--gutter)] py-12">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
          <a href="/" className="hover:text-[var(--ink)]">OMNIFORGE</a>
          <span>/</span>
          <span className="text-[var(--ink)]">{family.label}</span>
        </nav>

        {/* Header */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--brass-line)]">
              Family · {String(FAMILIES.findIndex((f) => f.id === family.id) + 1).padStart(2, '0')}
            </p>
            <h1
              className="mt-2 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[var(--ink)]"
              style={{ fontFamily: family.tokens['--family-font'] }}
            >
              {family.label}
            </h1>
            <p className="mt-2 text-base text-[var(--ink-soft)]">{family.tagline}</p>
          </div>
          <div className="text-right">
            <p className="plate-number">{offers.length} kits available</p>
            <p className="foil mt-1 font-display text-3xl font-bold">
              From ${Math.min(...offers.map((o) => o.price.amount ?? Infinity))}
            </p>
          </div>
        </div>

        {/* Plate grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <ProductListingCard key={offer.offerId} offer={offer} />
          ))}
        </div>

        {/* Other families */}
        <div className="mt-24 border-t border-[var(--plate-edge)] pt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)]">
            Other families
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {FAMILIES.filter((f) => f.id !== family.id).map((f) => (
              <a
                key={f.id}
                href={`/family/${f.id}`}
                className="border border-[var(--plate-edge)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-soft)] transition hover:border-[var(--brass-line)] hover:text-[var(--ink)]"
              >
                {f.label} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
