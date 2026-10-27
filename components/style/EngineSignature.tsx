'use client';
/**
 * OMNIFORGE · EngineSignature (Design Matrix v2)
 *
 * The per-engine signature treatments, mounted once at every tree root
 * (dashboard App + the full-site preview route) so they apply to EVERY
 * surface — menus, plates, studio, purchase flow, receipts, previews:
 *
 *   nocturne   a 3D candlelit title that assembles itself when the
 *              page opens (and again whenever you switch into NC),
 *              plus pointer-driven 3D tilt on .of-3dtitle type
 *   midhigh    real-world photography always drifting behind the page
 *   agencyos   blueprint grid underfoot + kinetic marquee + the 3D
 *              word prism used by heroes (WordPrism export)
 *   templateos a warm catalog glow breathing behind everything
 *   studioos   rule grid + pulse rings + scan sweeps
 *
 * Everything respects prefers-reduced-motion and both light/dark modes.
 */
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { DESIGN_STYLES, setMode, useMode, useStyle } from '@/lib/style-registry';

/* ── shared pointer vars (--of-mx / --of-my ∈ [-1, 1]) ──────────── */
function usePointerVars(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const root = document.documentElement;
        root.style.setProperty('--of-mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        root.style.setProperty('--of-my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);
}

/* ── NC · the 3D candlelit entrance ─────────────────────────────── */
function NocturneEntrance({ word }: { word: string }) {
  const [phase, setPhase] = useState<'play' | 'lift' | 'done'>('done');
  // This component is only mounted while nocturne is active, so the
  // mount effect fires on page arrival under NC AND whenever the user
  // switches into the engine — the button press gets the full show.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setPhase('play');
    document.body.style.overflow = 'hidden';
    const timers = [
      setTimeout(() => setPhase('lift'), 2150),
      setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
      }, 2920),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;
  return (
    <div className={`of-nc-veil ${phase === 'lift' ? 'of-nc-lift' : ''}`} aria-hidden>
      <div className="of-nc-glow" />
      <div className="of-nc-stage">
        <div className="of-nc-eyebrow">Engine 02 · Candlelit Serif</div>
        <div className="of-nc-title" style={{ marginTop: '1.5rem' }}>
          {word.split('').map((ch, i) => (
            <span key={i} className="of-nc-letter" style={{ ['--i' as string]: i }}>
              {ch}
            </span>
          ))}
        </div>
        <div className="of-nc-hairline" />
        <p className="of-nc-eyebrow" style={{ marginTop: 18, letterSpacing: '0.22em', opacity: 0.65 }}>
          twelve seats · one fire
        </p>
      </div>
    </div>
  );
}

/* ── MH · real-world photography drifting behind everything ─────── */
export const MH_AMBIENT_PHOTOS = [
  'https://images.pexels.com/photos/131979/pexels-photo-131979.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260',
  'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260',
  'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260',
  'https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260',
];

function MidhighAmbient({ photos = MH_AMBIENT_PHOTOS }: { photos?: string[] }) {
  return (
    <div className="of-mh-ambient" aria-hidden>
      {photos.map((p, i) => (
        <div key={i} className="of-mh-layer" style={{ backgroundImage: `url(${p})` }} />
      ))}
      <div className="of-mh-wash" />
    </div>
  );
}

/* ── kinetic marquee band (AO under the chrome · SO hero ticker) ── */
export function KineticBand({ items, className = '' }: { items: string[]; className?: string }) {
  const group = (key: string, hidden: boolean) => (
    <div key={key} aria-hidden={hidden} className="flex items-center gap-[2.75rem] pr-[2.75rem]">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-[2.75rem] whitespace-nowrap font-mono text-[9.5px] font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
          {t}
          <span className="h-1 w-1 rounded-full" style={{ background: 'var(--of-brass)', opacity: 0.7 }} />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`of-kinetic ${className}`} role="presentation">
      <div className="of-kinetic-track">
        {group('a', false)}
        {group('b', true)}
      </div>
    </div>
  );
}

/* ── AO · interactive 3D word prism (hero type) ──────────────────── */
export function WordPrism({ words, className = '' }: { words: string[]; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      return;
    }
    const t = setInterval(() => setIdx((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className={`of-prism inline-block ${className}`}>
      <span className="of-prism-inner">
        <span key={still ? 's' : idx} className="of-prism-word">
          {words[idx]}
        </span>
      </span>
    </span>
  );
}

/* ── the root signature mount ───────────────────────────────────── */
export function EngineSignature({ kineticItems }: { kineticItems?: string[] }) {
  const style = useStyle();
  usePointerVars(style === 'nocturne' || style === 'agencyos');

  return (
    <>
      {style === 'nocturne' && <NocturneEntrance key="nc" word={DESIGN_STYLES.nocturne.signatureWord} />}
      {style === 'midhigh' && <MidhighAmbient key="mh" />}
      {style === 'agencyos' && <div className="of-ao-grid" key="ao" aria-hidden />}
      {style === 'templateos' && <div className="of-to-glow" key="to" aria-hidden />}
      {style === 'studioos' && <div className="of-so-grid" key="so" aria-hidden />}
      {kineticItems && kineticItems.length > 0 && (style === 'agencyos' || style === 'studioos') && (
        <div key="kb" className="sticky top-[105px] z-10">
          <KineticBand items={kineticItems} />
        </div>
      )}
    </>
  );
}

/* ── ModeToggle — light/dark for the active engine ──────────────── */
export function ModeToggle({ compact = false }: { compact?: boolean }) {
  const mode = useMode();
  const next = mode === 'dark' ? 'light' : 'dark';
  return (
    <button
      onClick={() => setMode(next)}
      title={`Switch to ${next} — every engine ships both`}
      aria-label={`Switch to ${next} mode`}
      aria-pressed={mode === 'dark'}
      className={`of-btn-ghost shrink-0 !px-2.5 ${compact ? '!py-1.5' : '!py-2'}`}
    >
      {mode === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      {!compact && <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em]">{mode}</span>}
    </button>
  );
}
