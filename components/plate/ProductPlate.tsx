'use client';
/**
 * OMNIFORGE · ProductPlate (Elite Plan P1 plate anatomy + P4·T1 CSS-3D)
 * 7 elements: plate number → media window → title block → proof line →
 * contents drawer → policy chips → ledger foot. Hover runs the family's
 * CSS-3D recipe: fan deck / exploded / iso stack / medal flip / tilt.
 */
import { useRef, useState } from 'react';
import { Star, BadgeCheck, Layers, ShieldCheck, RefreshCw, Scale } from 'lucide-react';
import { offerStats, type OfferV2 } from '@/data/product-catalog';
import { MotionMedia, posterFrom } from '@/components/MotionMedia';
import type { ProductExample } from '@/data/exampleProducts';

export function ProductPlate({
  offer, example, familyShort, plateNo, index, onOpen,
}: {
  offer: OfferV2;
  example: ProductExample;
  familyShort: string;
  plateNo: string;
  index: number;
  onOpen: () => void;
}) {
  const stats = offerStats(offer);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const arch = offer.archetype;

  const onTilt = (e: React.MouseEvent) => {
    if (arch !== 'website' || !tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.setProperty('--ty', `${x * 10}deg`);
    tiltRef.current.style.setProperty('--tx', `${-y * 8}deg`);
  };

  return (
    <article
      className="of-plate of-lift group flex flex-col overflow-hidden text-left of-slide-up"
      style={{ animationDelay: `${index * 45}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); tiltRef.current?.style.setProperty('--tx', '0deg'); tiltRef.current?.style.setProperty('--ty', '0deg'); }}
    >
      <button onClick={onOpen} className="flex flex-1 flex-col text-left" aria-label={`Open ${offer.title} presentation`}>
        {/* 2 · media window — with the family's 3D recipe */}
        <div className={`relative ${arch === 'website' ? '' : 'of-scene-3d'} p-2.5 pb-0`}>
          <div
            ref={tiltRef}
            onMouseMove={onTilt}
            className={[
              'relative aspect-[16/10] w-full',
              arch === 'website' ? 'of-tilt' : 'of-3d',
              arch === 'template' ? 'of-fan' : '',
              arch === 'toolkit' ? 'of-explode' : '',
              arch === 'notion' ? 'of-iso' : '',
              arch === 'assessment' ? 'of-medal' : '',
            ].join(' ')}
          >
            {(arch === 'template') && [0, 1, 3, 4].map((i) => (
              <div key={i} className="of-fan-card absolute inset-0 rounded-lg border border-brass-500/25 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" style={{ zIndex: 1 }} />
            ))}
            {(arch === 'toolkit') && (
              <>
                <div className="of-layer-1 absolute inset-x-3 inset-y-0 rounded-lg border border-brass-500/30 bg-zinc-100/80 dark:bg-zinc-800/70" style={{ zIndex: 1 }} />
                <div className="of-layer-2 absolute inset-x-6 inset-y-0 rounded-lg border border-brass-500/20 bg-zinc-50/60 dark:bg-zinc-900/50" style={{ zIndex: 1 }} />
              </>
            )}
            {(arch === 'notion') && (
              <>
                <div className="absolute inset-0 origin-bottom-left rounded-lg border border-brass-500/30 bg-zinc-100/70 transition-transform duration-300 group-hover:-translate-y-3 dark:bg-zinc-800/60" style={{ zIndex: 1 }} />
                <div className="absolute inset-0 origin-bottom-left translate-y-2 rounded-lg border border-brass-500/20 bg-zinc-50/60 dark:bg-zinc-900/50" style={{ zIndex: 1 }} />
              </>
            )}
            {arch === 'assessment' && (
              <div className={`of-medal-inner absolute inset-0 ${hover ? 'of-medal-flipped' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                <div className="of-medal-face absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                  <MotionMedia asset={posterFrom(example.heroImage ?? '', [0.5, 0.4], 0.45)} className="h-full w-full !rounded-lg" />
                </div>
                <div className="of-medal-face of-medal-back absolute inset-0 grid place-items-center rounded-lg bg-gradient-to-br from-[#2b2721] to-[#17140f]" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-brass-500/60 bg-gradient-to-br from-brass-600 to-brass-400 text-[#17140f]">
                    <Star className="h-6 w-6 fill-[#f3dfa6] text-[#f3dfa6]" />
                  </div>
                </div>
              </div>
            )}
            {arch !== 'assessment' && (
              <div className="relative z-10 h-full w-full">
                <MotionMedia asset={posterFrom(example.heroImage ?? '', [0.5, 0.4], 0.45)} className="h-full w-full !rounded-lg" />
              </div>
            )}
            <span className="absolute bottom-2 left-2 z-20 of-chip !bg-black/50 !text-[#f3dfa6] !border-brass-400/40">{familyShort}</span>
            {offer.demo && (
              <span className="absolute bottom-2 right-2 z-20 of-chip !bg-black/50 !text-white !border-white/25">▶ Try it</span>
            )}
          </div>
          <span className="of-plate-num absolute left-4 top-4 z-20 !text-[#f3dfa6]/90 drop-shadow">No. {plateNo}</span>
        </div>

        {/* 3 · title block */}
        <div className="px-3.5 pt-3">
          <h3 className="truncate font-display text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{offer.title}</h3>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">{offer.promise}</p>
        </div>

        {/* 4 · proof line */}
        <div className="flex items-center gap-2.5 px-3.5 pt-2 font-mono text-[9.5px] text-zinc-400">
          <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-brass-500 text-brass-500" />{offer.proof.rating.toFixed(1)}</span>
          <span>{offer.proof.soldCount} sold</span>
          <span>{offer.proof.version}</span>
          <span className="ml-auto rounded bg-zinc-500/10 px-1">Demo data</span>
        </div>

        {/* 5 · contents drawer */}
        <div className="px-3.5 pt-2.5">
          <div className="of-hairline rounded-lg bg-zinc-50/60 px-2.5 py-2 dark:bg-zinc-900/40">
            <div className="flex items-center gap-1 font-mono text-[8.5px] font-bold uppercase tracking-[0.13em] text-zinc-400">
              <Layers className="h-2.5 w-2.5 text-brass-500" /> What's inside
            </div>
            <ul className="mt-1 space-y-0.5">
              {offer.deliverables.slice(0, 3).map((f) => (
                <li key={f.id} className="flex items-baseline gap-1.5 text-[10px] text-zinc-600 dark:text-zinc-300">
                  <span className="font-mono text-[9px] text-brass-600 dark:text-brass-400">{f.id}</span>
                  <span className="truncate">{f.title}</span>
                  <span className="ml-auto shrink-0 font-mono text-[8.5px] text-zinc-400">{f.files.length}</span>
                </li>
              ))}
            </ul>
            {offer.deliverables.length > 3 && (
              <div className="mt-1 font-mono text-[9px] text-zinc-400">+{offer.deliverables.length - 3} more · {stats.files} files total</div>
            )}
          </div>
        </div>
      </button>

      {/* 6 · policy chips */}
      <div className="flex flex-wrap gap-1.5 px-3.5 pt-2.5">
        <span className="of-chip"><RefreshCw className="h-2.5 w-2.5" /> Updates</span>
        <span className="of-chip"><ShieldCheck className="h-2.5 w-2.5" /> 30-day</span>
        <span className="of-chip"><Scale className="h-2.5 w-2.5" /> License</span>
      </div>

      {/* 7 · ledger foot */}
      <div className="mt-auto flex items-center justify-between gap-2 px-3.5 pb-3.5 pt-3">
        <div className="min-w-0">
          {offer.price.amount !== null ? (
            <div className="flex items-baseline gap-1.5">
              <span className="of-foil-text font-display text-xl font-bold tracking-tight">${offer.price.amount}</span>
              {offer.price.compareAt !== null && <span className="font-mono text-[10px] text-zinc-400 line-through">${offer.price.compareAt}</span>}
            </div>
          ) : (
            <span className="font-display text-base font-semibold tracking-tight">From quote</span>
          )}
          <div className="of-plate-num mt-0.5">{offer.edition} · {stats.files} files</div>
        </div>
        <button onClick={onOpen} className="of-btn shrink-0 !px-3.5 !py-2 text-[11px]">
          <BadgeCheck className="h-3.5 w-3.5" /> {offer.demo ? 'Try & buy' : 'Open'}
        </button>
      </div>
    </article>
  );
}
