'use client';
/**
 * OMNIFORGE · PresentationStudio (Elite Plan P1–P5)
 * The live-presentation surface: Try it → Preview → What's Included → Compare,
 * with the purchase plate in the rail and a curtain-lift open.
 */
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { X, Eye, Package, GitCompare, PlayCircle, Star, Quote, BadgeCheck } from 'lucide-react';
import type { MockupConfig } from '@/data/businessTypes';
import type { ProductExample } from '@/data/exampleProducts';
import { getPackage, tierOrder, tierDisplay, type Tier } from '@/data/servicePackages';
import { offerStats, type OfferV2 } from '@/data/product-catalog';
import { ManifestExplorer } from './ManifestExplorer';
import { PurchaseFlow } from './PurchaseFlow';
import { FamilyPreview } from '@/components/FamilyPreview';
import { MockupRenderer } from '@/components/MockupRenderer';
import { MotionMedia, posterFrom } from '@/components/MotionMedia';

const QuizDemo = dynamic(() => import('@/components/demo/QuizDemo').then((m) => m.QuizDemo), { ssr: false, loading: () => <DemoLoading /> });
const ToolDemo = dynamic(() => import('@/components/demo/ToolDemo').then((m) => m.ToolDemo), { ssr: false, loading: () => <DemoLoading /> });
const TemplateReaderDemo = dynamic(() => import('@/components/demo/TemplateReaderDemo').then((m) => m.TemplateReaderDemo), { ssr: false, loading: () => <DemoLoading /> });
const NotionTourDemo = dynamic(() => import('@/components/demo/NotionTourDemo').then((m) => m.NotionTourDemo), { ssr: false, loading: () => <DemoLoading /> });
const SiteDemo = dynamic(() => import('./SiteDemo').then((m) => m.SiteDemo), { ssr: false, loading: () => <DemoLoading /> });

function DemoLoading() {
  return (
    <div className="grid h-64 place-items-center">
      <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass-500" /> Loading instrument…
      </div>
    </div>
  );
}

type Tab = 'try' | 'preview' | 'included' | 'compare';

export function PresentationStudio({
  offer, config, businessName, example, onClose,
}: {
  offer: OfferV2;
  config: MockupConfig;
  businessName: string;
  example?: ProductExample;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>(offer.demo ? 'try' : 'preview');
  const [demoDone, setDemoDone] = useState(false);
  const stats = offerStats(offer);

  // Escape to close, scroll lock, focus return (GUIDE #8)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const demoProps = { offer: { offerId: offer.offerId, title: offer.title, price: offer.price.amount }, onComplete: () => setDemoDone(true) };
  const renderDemo = useCallback(() => {
    switch (offer.demo) {
      case 'quiz': return <QuizDemo {...demoProps} />;
      case 'tool': return <ToolDemo {...demoProps} />;
      case 'template': return <TemplateReaderDemo {...demoProps} />;
      case 'notion': return <NotionTourDemo {...demoProps} />;
      case 'site': return <SiteDemo {...demoProps} />;
      default: return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer.demo, offer.offerId, offer.title, offer.price.amount, demoDone]);

  const tabs: { id: Tab; label: string; icon: typeof Eye }[] = [
    ...(offer.demo ? [{ id: 'try' as Tab, label: 'Try it', icon: PlayCircle }] : []),
    { id: 'preview', label: 'Live Preview', icon: Eye },
    { id: 'included', label: "What's Included", icon: Package },
    { id: 'compare', label: 'Compare Tiers', icon: GitCompare },
  ];

  const url = `${offer.title.toLowerCase().replace(/[^a-z]/g, '-')}.omniforge.dev`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-md sm:p-4 of-fade" role="dialog" aria-modal="true" aria-label={`${offer.title} presentation`}>
      <div className="of-curtain of-plate flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden !rounded-2xl">
        {/* ── Theater header ─────────────────────────────────────── */}
        <div className="relative h-32 shrink-0 sm:h-40">
          <MotionMedia asset={posterFrom(example?.heroImage ?? config.heroImage ?? '')} eager className="absolute inset-0 !rounded-none" />
          <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="of-plate-num !text-[#f3dfa6]">{offer.offerId} · {offer.edition}</span>
                  {offer.authored && <span className="of-chip">Hand-authored</span>}
                  <span className="of-chip">{offer.proof.version}</span>
                </div>
                <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-2xl">{offer.title}</h2>
                <p className="mt-0.5 line-clamp-1 max-w-2xl text-[12px] text-white/80">{offer.promise}</p>
              </div>
              <button onClick={onClose} aria-label="Close presentation"
                className="shrink-0 rounded-full bg-black/40 p-2 text-white/90 backdrop-blur transition hover:bg-black/60">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Tab bar ────────────────────────────────────────────── */}
        <div className="of-hairline-b flex items-center gap-1 overflow-x-auto bg-zinc-50/70 px-3 py-1.5 dark:bg-zinc-900/40">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${
                tab === t.id ? 'bg-brass-500/15 text-brass-700 dark:text-brass-300' : 'text-zinc-500 hover:bg-zinc-500/5 dark:text-zinc-400'
              }`}>
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
              {t.id === 'try' && demoDone && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
            </button>
          ))}
          <div className="ml-auto hidden items-center gap-3 pr-1 font-mono text-[10px] text-zinc-400 sm:flex">
            <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-brass-500 text-brass-500" /> {offer.proof.rating.toFixed(1)}</span>
            <span className="inline-flex items-center gap-1"><BadgeCheck className="h-3 w-3 text-brass-500" /> {stats.realPct}% real</span>
            <span className="rounded bg-zinc-500/10 px-1.5 py-0.5">Demo data</span>
          </div>
        </div>

        {/* ── Body: tabs + purchase rail ─────────────────────────── */}
        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_320px]">
          <div className="min-h-0 overflow-y-auto p-4 sm:p-5">
            {tab === 'try' && (
              <div className="relative mx-auto max-w-2xl">
                {renderDemo()}
                {demoDone && (
                  <div className="of-slide-up mt-4 flex items-center justify-between rounded-xl bg-emerald-500/8 px-4 py-3">
                    <span className="text-[11.5px] font-medium text-emerald-700 dark:text-emerald-300">Demo complete — the full kit ships everything you just used.</span>
                  </div>
                )}
              </div>
            )}
            {tab === 'preview' && (
              <div className="of-slide-up">
                <div className="of-hairline overflow-hidden rounded-t-xl bg-zinc-100 px-3 py-2 dark:bg-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                    <span className="ml-2 flex-1 truncate rounded-md bg-white/80 px-3 py-1 font-mono text-[10.5px] text-zinc-500 dark:bg-zinc-900/70 dark:text-zinc-400">https://{url}</span>
                  </div>
                </div>
                <div className="of-hairline !border-t-0 bg-white dark:bg-zinc-950" style={{ minHeight: 420 }}>
                  {example ? <FamilyPreview example={example} /> : <MockupRenderer config={config} />}
                </div>
                <p className="mt-2 text-center font-mono text-[9.5px] text-zinc-400">
                  {businessName} · rendered by the {offer.archetype} renderer — the same code that ships in the kit
                </p>
              </div>
            )}
            {tab === 'included' && (
              <div className="of-slide-up space-y-4">
                <ManifestExplorer offer={offer} maxFolders={99} />
                <div className="of-hairline rounded-xl bg-zinc-50/60 p-4 dark:bg-zinc-900/40">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                    <Quote className="h-3 w-3" /> From the buyer wall
                  </div>
                  <p className="mt-2 text-[13px] italic leading-relaxed text-zinc-700 dark:text-zinc-300">“{offer.proof.testimonial.quote}”</p>
                  <p className="mt-2 font-mono text-[10px] text-zinc-500">
                    {offer.proof.testimonial.name} · {offer.proof.testimonial.role} · <span className="rounded bg-zinc-500/10 px-1">Demo data</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="of-chip">Formats: {offer.formats.join(' · ')}</span>
                </div>
              </div>
            )}
            {tab === 'compare' && <CompareTier tier={config.tier} />}
          </div>

          {/* purchase rail */}
          <aside className="min-h-0 overflow-y-auto border-t border-brass-500/20 bg-zinc-50/50 p-4 dark:bg-zinc-900/30 lg:border-l lg:border-t-0">
            <PurchaseFlow offer={offer} />
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ── tier comparison (compact, data from servicePackages) ─────── */
function CompareTier({ tier }: { tier: Tier }) {
  return (
    <div className="of-slide-up grid gap-2.5 sm:grid-cols-2">
      {tierOrder.map((t) => {
        const pkg = getPackage(t);
        const td = tierDisplay[t];
        const active = t === tier;
        return (
          <div key={t} className={`of-hairline rounded-xl p-3.5 ${active ? 'bg-brass-500/10 ring-1 ring-brass-500/40' : 'bg-zinc-50/50 dark:bg-zinc-900/30'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-bold">{td.label}</span>
              {active && <span className="of-chip">This offer</span>}
            </div>
            <div className="mt-1 font-mono text-[13px] font-semibold text-brass-700 dark:text-brass-300">{pkg.priceRange}</div>
            <ul className="mt-2 space-y-1">
              {pkg.features.slice(0, 5).map((f, i) => <li key={i} className="text-[11px] text-zinc-500 dark:text-zinc-400">· {f}</li>)}
            </ul>
            <div className="mt-2 border-t border-zinc-500/10 pt-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-400">{pkg.modules.length}/22 modules</div>
          </div>
        );
      })}
    </div>
  );
}
