'use client';
/**
 * OMNIFORGE · ShowcaseRoom (Design Matrix v2.1 — the six rooms)
 *
 * The user's brief: the engine wordmark treatments were "almost the same
 * for every one of them in previews" — so each engine now gets its OWN
 * ROOM, a full environmental stage where its wordmark lives:
 *
 *   obsidian   THE OBSIDIAN VAULT — a black-marble gallery, volumetric
 *              spotlight cones, drifting dust motes, and the wordmark
 *              engraved on a suspended brass-edged slab
 *   nocturne   THE CANDLELIT MANOR — walnut-panelled hall, a long banquet
 *              table with real flickering candle flames, rising embers,
 *              and serif letters that assemble themselves in the glow
 *   midhigh    THE DINING ATELIER — a gallery hall where real-world
 *              photography floats in framed layers around a giant
 *              uppercase serif headline
 *   agencyos   THE BLUEPRINT STAGE — a drafting room with a perspective
 *              grid floor running to an ember horizon, the wordmark
 *              extruded as isometric blocks with dimension lines
 *   templateos THE CATALOG WAREHOUSE — shelving receding on both walls,
 *              a running conveyor, floating price chips, and the wordmark
 *              as modular lime-glowing letter blocks
 *   studioos   THE FILM STUDIO — a soundstage with a lighting rig, two
 *              volumetric beams, running film strips, pulse rings and a
 *              brass-foil wordmark under a scan sweep
 *
 * Rooms are self-contained: engine fonts + palettes are hardcoded so a
 * room renders true even inside the home gallery while ANOTHER engine is
 * active. Light/dark follows the global mode ([data-mode]). Both scales
 * — 'full' (real-site hero) and 'card' (home exhibit) — are driven by
 * container query units (cqw). All motion is reduced-motion gated.
 */
import type { ReactNode } from 'react';
import type { StyleId } from '@/lib/style-registry';
import { MH_AMBIENT_PHOTOS } from '@/components/style/EngineSignature';

export interface ShowcaseRoomProps {
  engine: StyleId;
  /** Primary wordmark — a site's hero title, or the engine's signature word */
  title: string;
  /** The foil/accent tail of the wordmark, if any */
  accent?: string;
  eyebrow?: string;
  sub?: string;
  /** CTAs — only rendered in the 'full' variant */
  actions?: ReactNode;
  /** Framed photography for the Dining Atelier (defaults to ambient shots) */
  photos?: string[];
  variant?: 'full' | 'card';
}

/* Deterministic set dressing ------------------------------------------------ */
const VAULT_MOTES: Array<[number, number]> = [
  [9, 22], [21, 63], [33, 34], [47, 71], [58, 26], [69, 59], [81, 33], [90, 66],
];
const MANOR_EMBERS: Array<[number, number, number]> = [
  [14, 3.1, 26], [27, 5.4, -18], [43, 4.2, 34], [57, 6.1, -30], [71, 3.6, 22], [86, 5.0, -14],
];
const MANOR_CANDLES = [39.5, 44.5, 50, 55.5, 60.5];

/* helpers ------------------------------------------------------------------- */
/** Split a phrase into per-word, per-letter spans (nowrap words). */
function letterWords(
  text: string,
  letterClass: string,
  wordClass: string,
): ReactNode[] {
  return text.split(' ').map((word, w) => (
    <span key={w} className={wordClass}>
      {word.split('').map((ch, i) => (
        <span
          key={i}
          className={letterClass}
          style={{ ['--i' as string]: w * 100 + i }}
        >
          {ch}
        </span>
      ))}
    </span>
  ));
}

function sceneOf(children: ReactNode) {
  return <div className="of-room-scene" aria-hidden>{children}</div>;
}

/** Full-size heroes get a real h1; card exhibits stay divs (one h1 per page). */
function titleTagOf(variant?: 'full' | 'card'): 'h1' | 'div' {
  return variant === 'card' ? 'div' : 'h1';
}

/* ══ 01 · THE OBSIDIAN VAULT ═══════════════════════════════════════════════ */
function ObsidianVaultRoom(p: ShowcaseRoomProps) {
  return (
    <section className={`of-room of-room--ob of-room--${p.variant ?? 'full'}`} data-room="obsidian">
      {sceneOf(
        <>
          <div className="of-rb-wall" />
          <div className="of-rb-floor" />
          <div className="of-rb-cone of-rb-cone--l" />
          <div className="of-rb-cone of-rb-cone--c" />
          <div className="of-rb-cone of-rb-cone--r" />
          {VAULT_MOTES.map(([x, y], i) => (
            <span key={i} className="of-rb-mote" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 1.35}s` }} />
          ))}
        </>,
      )}
      <div className="of-room-content">
        {p.eyebrow && <div className="of-rb-eyebrow">{p.eyebrow}</div>}
        <div className="of-rb-slab">
          {(() => { const Title = titleTagOf(p.variant); return (
            <Title className="of-rb-title">
              {p.title}
              {p.accent && <em className="of-rb-accent">{` ${p.accent}`}</em>}
            </Title>
          ); })()}
        </div>
        {p.sub && <p className="of-room-sub">{p.sub}</p>}
        {p.actions && <div className="of-room-actions">{p.actions}</div>}
      </div>
    </section>
  );
}

/* ══ 02 · THE CANDLELIT MANOR ══════════════════════════════════════════════ */
function NocturneManorRoom(p: ShowcaseRoomProps) {
  const word = p.accent ? `${p.title} ${p.accent}` : p.title;
  const Title = titleTagOf(p.variant);
  return (
    <section className={`of-room of-room--nc of-room--${p.variant ?? 'full'}`} data-room="nocturne">
      {sceneOf(
        <>
          <div className="of-rr-wall" />
          <div className="of-rr-glow" />
          <div className="of-rr-table" />
          <div className="of-rr-candles">
            {MANOR_CANDLES.map((x, i) => (
              <span key={i} className="of-rr-candle" style={{ left: `${x}%`, bottom: `calc(31% + ${6 + i * 3}px)` }}>
                <span className="of-rr-halo" style={{ animationDelay: `${i * 0.45}s` }} />
                <span className="of-rr-flame" style={{ animationDelay: `${i * 0.3}s` }} />
              </span>
            ))}
          </div>
          {MANOR_EMBERS.map(([x, d, ex], i) => (
            <span
              key={i}
              className="of-rr-ember"
              style={{ left: `${x}%`, animationDuration: `${d}s`, animationDelay: `${i * 0.9}s`, ['--ex' as string]: `${ex}px` }}
            />
          ))}
        </>,
      )}
      <div className="of-room-content">
        {p.eyebrow && <div className="of-rr-eyebrow">{p.eyebrow}</div>}
        <Title className="of-rr-title" aria-label={word}>
          {letterWords(word, 'of-nc-letter', 'of-rr-word')}
        </Title>
        <div className="of-rr-rule" />
        {p.sub && <p className="of-room-sub">{p.sub}</p>}
        {p.actions && <div className="of-room-actions">{p.actions}</div>}
      </div>
    </section>
  );
}

/* ══ 03 · THE DINING ATELIER ═══════════════════════════════════════════════ */
function DiningAtelierRoom(p: ShowcaseRoomProps) {
  const photos = (p.photos && p.photos.length ? p.photos : MH_AMBIENT_PHOTOS).slice(0, 5);
  const Title = titleTagOf(p.variant);
  return (
    <section className={`of-room of-room--mh of-room--${p.variant ?? 'full'}`} data-room="midhigh">
      {sceneOf(
        <>
          {photos.map((src, i) => (
            <div key={i} className={`of-rt-frame of-rt-frame--${i + 1}`} style={{ backgroundImage: `url(${src})` }} />
          ))}
          <div className="of-rt-lightbar" />
          <div className="of-rt-wash" />
        </>,
      )}
      <div className="of-room-content">
        {p.eyebrow && <div className="of-rt-eyebrow">{p.eyebrow}</div>}
        <Title className="of-rt-title">
          {p.title}
          {p.accent && <span className="of-rt-accent">{` ${p.accent}`}</span>}
        </Title>
        <div className="of-rt-rule" />
        {p.sub && <p className="of-room-sub">{p.sub}</p>}
        {p.actions && <div className="of-room-actions">{p.actions}</div>}
      </div>
    </section>
  );
}

/* ══ 04 · THE BLUEPRINT STAGE ══════════════════════════════════════════════ */
function BlueprintStageRoom(p: ShowcaseRoomProps) {
  const word = p.accent ? `${p.title} ${p.accent}` : p.title;
  const Title = titleTagOf(p.variant);
  return (
    <section className={`of-room of-room--ao of-room--${p.variant ?? 'full'}`} data-room="agencyos">
      {sceneOf(
        <>
          <div className="of-ra-floor" />
          <div className="of-ra-horizon" />
          <div className="of-ra-reg of-ra-reg--tl" /><div className="of-ra-reg of-ra-reg--tr" />
          <div className="of-ra-reg of-ra-reg--bl" /><div className="of-ra-reg of-ra-reg--br" />
          <div className="of-ra-dim of-ra-dim--top">
            <i className="of-ra-dimline" /><span>System span · 96 examples</span><i className="of-ra-dimline" />
          </div>
          <div className="of-ra-dim of-ra-dim--side">
            <span>Grid 28 / 140</span><i className="of-ra-dimline" />
          </div>
          <div className="of-ra-cursor" />
        </>,
      )}
      <div className="of-room-content">
        {p.eyebrow && (
          <div className="of-ra-eyebrow">
            <i className="of-ra-dash" />
            {p.eyebrow}
          </div>
        )}
        <Title className="of-ra-title" aria-label={word}>
          {letterWords(word, 'of-ra-l', 'of-ra-word')}
        </Title>
        {p.sub && <p className="of-room-sub">{p.sub}</p>}
        {p.actions && <div className="of-room-actions">{p.actions}</div>}
      </div>
    </section>
  );
}

/* ══ 05 · THE CATALOG WAREHOUSE ════════════════════════════════════════════ */
function CatalogWarehouseRoom(p: ShowcaseRoomProps) {
  const word = p.accent ? `${p.title} ${p.accent}` : p.title;
  const Title = titleTagOf(p.variant);
  return (
    <section className={`of-room of-room--to of-room--${p.variant ?? 'full'}`} data-room="templateos">
      {sceneOf(
        <>
          <div className="of-rw-shelf of-rw-shelf--l" />
          <div className="of-rw-shelf of-rw-shelf--r" />
          <div className="of-rw-conveyor" />
          <span className="of-rw-chip of-rw-chip--1">$49</span>
          <span className="of-rw-chip of-rw-chip--2">new</span>
          <span className="of-rw-chip of-rw-chip--3">-30%</span>
          <span className="of-rw-barcode">|||| ||| || |||| | ||</span>
        </>,
      )}
      <div className="of-room-content">
        {p.eyebrow && <span className="of-rw-eyebrow">{p.eyebrow}</span>}
        <Title className="of-rw-title" aria-label={word}>
          {word.split(' ').map((w, wi) => (
            <span key={wi} className="of-rw-word">
              {w.split('').map((ch, i) => (
                <span key={i} className="of-rw-block" style={{ ['--i' as string]: wi * 100 + i }}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </Title>
        {p.sub && <p className="of-room-sub">{p.sub}</p>}
        {p.actions && <div className="of-room-actions">{p.actions}</div>}
      </div>
    </section>
  );
}

/* ══ 06 · THE FILM STUDIO ══════════════════════════════════════════════════ */
function FilmStudioRoom(p: ShowcaseRoomProps) {
  const Title = titleTagOf(p.variant);
  return (
    <section className={`of-room of-room--so of-scan of-room--${p.variant ?? 'full'}`} data-room="studioos">
      {sceneOf(
        <>
          <div className="of-rs-rig">
            <span className="of-rs-spot of-rs-spot--l" />
            <span className="of-rs-spot of-rs-spot--c" />
            <span className="of-rs-spot of-rs-spot--r" />
          </div>
          <div className="of-rs-beam of-rs-beam--l" />
          <div className="of-rs-beam of-rs-beam--r" />
          <div className="of-rs-ring of-rs-ring--1" />
          <div className="of-rs-ring of-rs-ring--2" />
          <div className="of-rs-film of-rs-film--top" />
          <div className="of-rs-film of-rs-film--bottom" />
        </>,
      )}
      <div className="of-room-content">
        {p.eyebrow && (
          <div className="of-rs-eyebrow">
            <span className="of-pulse" />
            {p.eyebrow}
          </div>
        )}
        <Title className="of-rs-title">
          {p.title}
          {p.accent && <span>{` ${p.accent}`}</span>}
        </Title>
        <div className="of-rs-slate" aria-hidden>
          <span className="of-rs-slate-strip" />
          <span>Take 01 · Six rooms, one catalog</span>
        </div>
        {p.sub && <p className="of-room-sub">{p.sub}</p>}
        {p.actions && <div className="of-room-actions">{p.actions}</div>}
      </div>
    </section>
  );
}

/* ══ the switch ════════════════════════════════════════════════════════════ */
export function ShowcaseRoom(p: ShowcaseRoomProps) {
  switch (p.engine) {
    case 'nocturne': return <NocturneManorRoom {...p} />;
    case 'midhigh': return <DiningAtelierRoom {...p} />;
    case 'agencyos': return <BlueprintStageRoom {...p} />;
    case 'templateos': return <CatalogWarehouseRoom {...p} />;
    case 'studioos': return <FilmStudioRoom {...p} />;
    default: return <ObsidianVaultRoom {...p} />;
  }
}
