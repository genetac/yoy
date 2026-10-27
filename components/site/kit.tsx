'use client';
/**
 * OMNIFORGE · Site kit — the shared primitives of the genome's component
 * layer. Ported from the Template OS kit with zero runtime deps:
 * Reveal is pure CSS (mount choreography, gated by --t-motion and
 * prefers-reduced-motion), Photo is a plain lazy <img>.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { MOTION } from '@/lib/genome/tokens';
import { useInspect } from '@/lib/genome/store';
import { SWITCH_BY_ID } from '@/lib/genome/switches';
import { MODEL_ANSWERS } from '@/lib/genome/layout';

export const IMG: Record<string, string> = {
  perfumeDark: 'https://images.unsplash.com/photo-1598634222670-87c5f558119c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800',
  perfumeBlue: 'https://images.unsplash.com/photo-1615160460366-2c9a4b0c0d51?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  perfumePink: 'https://images.unsplash.com/photo-1608721279136-cd41b752fa41?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  bagBrown: 'https://images.unsplash.com/photo-1746880223690-359948154c53?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  bagYellow: 'https://images.unsplash.com/photo-1705909237050-7a7625b47fac?crop=entropy&cs=srgb&fm=jpg&q=85&w=900',
  warehouse: 'https://images.unsplash.com/photo-1553413077-190dd305871c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
  boxes: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?crop=entropy&cs=srgb&fm=jpg&q=85&w=900',
  crates: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=srgb&fm=jpg&q=85&w=900',
  restaurant: 'https://images.unsplash.com/photo-1583354608715-177553a4035e?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000',
  pantry: 'https://images.unsplash.com/photo-1760445529395-35c2534ae892?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
  condiments: 'https://images.unsplash.com/photo-1682368357483-183b5d0802bd?crop=entropy&cs=srgb&fm=jpg&q=85&w=900',
  mugWhite: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  mugPlain: 'https://images.unsplash.com/photo-1650959858546-d09833d5317b?crop=entropy&cs=srgb&fm=jpg&q=85&w=900',
  mugGold: 'https://images.unsplash.com/photo-1520485521983-bfaa0bc6c80e?crop=entropy&cs=srgb&fm=jpg&q=85&w=900',
};

/* Reveal — CSS mount choreography driven by the motion token */
export function Reveal({
  children,
  className = '',
  delay = 0,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  'data-testid'?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const dur = parseFloat(getComputedStyle(el).getPropertyValue('--t-motion')) || 0;
    if (!dur || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '-30px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} g-reveal ${shown ? 'g-shown' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </div>
  );
}

export const Label = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`t-mono text-[10px] uppercase tracking-[0.22em] ${className}`}>{children}</span>
);

export const Photo = ({
  src,
  alt = '',
  className = '',
  style,
}: {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) =>
  src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} style={style} loading="lazy" />
  ) : (
    <div className={`${className} t-surface`} style={style} aria-hidden />
  );

export const motionOf = (m: number) => MOTION[m] ?? MOTION[0];

/* ── LayerTag — the genome layer inspector ─────────────────────────
   Renders a small colour-coded annotation pinned inside the tagged
   section while the layer inspector is on: switch number, layer name,
   the effective value and what it is doing to THIS model right now.
   Pure flow-positioned (absolute in the section, corner-pinned) so it
   needs no measurement and survives scaled frames unchanged.          */
export function LayerTag({
  no,
  layer,
  value,
  dot,
  doing,
  className = '',
}: {
  no: string;
  layer: string;
  value: string;
  dot: string;
  doing: string;
  className?: string;
}) {
  const inspect = useInspect();
  if (!inspect) return null;
  return (
    <span
      className={`g-tag ${className}`}
      data-testid="g-layer-tag"
      style={{ ['--g-dot' as string]: dot }}
    >
      <span className="g-tag-dot" aria-hidden />
      <span className="g-tag-text">
        <b>{no} {layer}</b> — <i>{value}</i>
        <em>{doing}</em>
      </span>
    </span>
  );
}

/* ── layer metadata shared by the eight models ──────────────────── */

export const LAYER_DOTS: Record<string, string> = {
  direction: '#d97706',
  voice: '#8b5cf6',
  material: '#a8a29e',
  composition: '#3b82f6',
  atmosphere: '#10b981',
  detail: '#f43f5e',
};

export const LAYER_NO: Record<string, string> = {
  direction: '01',
  voice: '02',
  material: '03',
  composition: '04',
  atmosphere: '05',
  detail: '06',
};

export const LAYER_NAME: Record<string, string> = {
  direction: 'Creative direction',
  voice: 'Typographic voice',
  material: 'Material & finish',
  composition: 'Composition',
  atmosphere: 'Colour atmosphere',
  detail: 'Detail signature',
};

/** Human label of an effective pick ("Silk", "Full-bleed cinema", …). */
export function pickLabel(switchId: string, pick: string): string {
  const s = SWITCH_BY_ID[switchId as keyof typeof SWITCH_BY_ID];
  return s?.options.find((o) => o.id === pick)?.label ?? 'As drawn';
}

/** What this model says the composition switch is doing to it right now. */
export function modelAnswer(archetype: string, composition: string): string {
  return MODEL_ANSWERS[archetype]?.[composition] ?? '';
}

/** One-call hero annotation: composition + direction layers. */
export function HeroLayers({ world }: { world: { archetype: string; picks: Record<string, string> } }) {
  return (
    <>
      <LayerTag
        no={LAYER_NO.composition}
        layer={LAYER_NAME.composition}
        value={pickLabel('composition', world.picks.composition)}
        dot={LAYER_DOTS.composition}
        doing={modelAnswer(world.archetype, world.picks.composition)}
        data-testid="g-tag-composition"
      />
      <LayerTag
        no={LAYER_NO.direction}
        layer={LAYER_NAME.direction}
        value={pickLabel('direction', world.picks.direction)}
        dot={LAYER_DOTS.direction}
        doing="Sets the display scale, margins, captions and crops of this page"
        className="g-tag-b"
      />
    </>
  );
}

/** Type-layer annotation (voice) for a section heading. */
export function VoiceTag({ world }: { world: { picks: Record<string, string> } }) {
  return (
    <LayerTag
      no={LAYER_NO.voice}
      layer={LAYER_NAME.voice}
      value={pickLabel('voice', world.picks.voice)}
      dot={LAYER_DOTS.voice}
      doing="Voices every role on this page — display, headline, body, data"
    />
  );
}

/** Material-layer annotation for a card surface. */
export function MaterialTag({ world }: { world: { picks: Record<string, string> } }) {
  return (
    <LayerTag
      no={LAYER_NO.material}
      layer={LAYER_NAME.material}
      value={pickLabel('material', world.picks.material)}
      dot={LAYER_DOTS.material}
      doing="Dresses this card, its edges, shadows and frame"
    />
  );
}

/** Atmosphere + detail annotations for the closing band. */
export function SealLayers({ world }: { world: { picks: Record<string, string>; tokens: { bg: string; ink: string } } }) {
  return (
    <>
      <LayerTag
        no={LAYER_NO.atmosphere}
        layer={LAYER_NAME.atmosphere}
        value={
          world.picks.atmosphere === 'native'
            ? 'House palette (as drawn)'
            : pickLabel('atmosphere', world.picks.atmosphere)
        }
        dot={LAYER_DOTS.atmosphere}
        doing="Colours every surface semantically — background, ink, accent"
      />
      <LayerTag
        no={LAYER_NO.detail}
        layer={LAYER_NAME.detail}
        value={pickLabel('detail', world.picks.detail)}
        dot={LAYER_DOTS.detail}
        doing="Stamps this world's recurring crafted motif"
        className="g-tag-b"
      />
    </>
  );
}
