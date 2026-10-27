'use client';
/**
 * OMNIFORGE · SiteTemplate — the genome's component layer dispatcher.
 *
 * Resolves the world (DNA + the 7 switches + the active engine bias + the
 * global mode) and renders the example as its REAL flagship product site.
 * Every model receives the full resolved world — picks, overridden
 * switches and the structural hero arrangement — so each switch value is
 * implemented as a real per-model layout response, never a colour filter.
 * The exact same component serves the full-size review route AND every
 * smaller frame (via SiteFrame) — so a card preview is never a different
 * mockup, it is the identical site, scaled.
 */
import { useMemo } from 'react';
import { useStyle, useMode } from '@/lib/style-registry';
import { useGenome } from '@/lib/genome/store';
import { dnaForEntry, type ArchetypeId } from '@/lib/genome/catalog';
import { resolveGenome, type SwitchId } from '@/lib/genome/switches';
import type { HeroKind } from '@/lib/genome/layout';
import { siteCopyFor, type SiteCopy } from '@/lib/genome/copy';
import { allSiteEntries, type SiteIndexEntry } from '@/lib/site-preview';
import type { SiteTokens } from '@/lib/genome/tokens';
import SaasSite from './templates/SaasSite';
import WholesaleSite from './templates/WholesaleSite';
import MaisonSite from './templates/MaisonSite';
import CartSite from './templates/CartSite';
import TelemetrySite from './templates/TelemetrySite';
import PocketSite from './templates/PocketSite';
import TerroirSite from './templates/TerroirSite';
import AtlasSite from './templates/AtlasSite';

export interface SiteWorld {
  copy: SiteCopy;
  archetype: string;
  classes: string[];
  vars: Record<string, string>;
  tokens: SiteTokens;
  monogram: string;
  /** effective switch picks (override > DNA) */
  picks: { direction: string; voice: string; material: string; composition: string; atmosphere: string; detail: string };
  /** switches currently overriding the DNA */
  overridden: SwitchId[];
  /** structural hero arrangement every model implements */
  hero: HeroKind;
}

/** Resolve one example's world under the current backbone state.
 *  `archetype` forces a flagship design (the atelier stages any example in
 *  any of the eight worlds). */
export function useSiteWorld(entry: SiteIndexEntry, opts?: { archetype?: string }): SiteWorld {
  const style = useStyle();
  const mode = useMode();
  const genome = useGenome();

  return useMemo(() => {
    const forced = (opts?.archetype as ArchetypeId | undefined) ?? undefined;
    const dna = dnaForEntry(entry, forced);
    const world = resolveGenome(dna, genome.sel, { engine: style, mode });
    const base = siteCopyFor(entry, allSiteEntries() as SiteIndexEntry[], forced);
    const { text } = genome;
    const copy: SiteCopy = {
      ...base,
      brand: text.brand.trim() || base.brand,
      headline: text.headline.trim() || base.headline,
      sub: text.subhead.trim() || base.sub,
      cta: text.cta.trim() || base.cta,
    };
    const initials = copy.brand
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
    return {
      copy,
      archetype: dna.archetype,
      classes: world.classes,
      vars: world.vars,
      tokens: world.tokens,
      monogram: initials,
      picks: world.picks,
      overridden: world.overridden,
      hero: world.hero,
    };
  }, [entry, genome, style, mode, opts?.archetype]);
}

const TEMPLATES: Record<string, React.ComponentType<{ world: SiteWorld }>> = {
  'saas-orbit': SaasSite,
  'cg-wholesale': WholesaleSite,
  'cg-maison': MaisonSite,
  'cg-cart': CartSite,
  'dash-telemetry': TelemetrySite,
  'micro-pocket': PocketSite,
  'hosp-terroir': TerroirSite,
  'ent-atlas': AtlasSite,
};

export function SiteTemplate({
  world,
  className = '',
  id,
}: {
  world: SiteWorld;
  className?: string;
  id?: string;
}) {
  const Template = TEMPLATES[world.archetype] ?? SaasSite;
  return (
    <div
      id={id}
      className={`tpl-scope ${world.classes.join(' ')} ${className}`}
      style={world.vars as React.CSSProperties}
      data-monogram={world.monogram}
      data-model={world.archetype}
      data-hero={world.hero}
      data-voice-pick={world.picks.voice}
      data-material-pick={world.picks.material}
      data-composition-pick={world.picks.composition}
      data-direction-pick={world.picks.direction}
      data-detail-pick={world.picks.detail}
    >
      <Template world={world} />
    </div>
  );
}
