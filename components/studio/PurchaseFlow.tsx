'use client';
/**
 * OMNIFORGE · PurchaseFlow (Elite Plan P1 receipt + P5 Delivery Room)
 * Buy → wax-seal receipt → Delivery Room: folders assemble with REAL progress
 * (compileKit.onProgress), then a genuine ZIP downloads to the buyer's machine.
 */
import { useEffect, useRef, useState } from 'react';
import { Award, Download, Package, FolderCheck, FileText, Check, Loader2 } from 'lucide-react';
import { POLICY_META, offerStats, type OfferV2 } from '@/data/product-catalog';
import { compileKit, downloadBlob, mayShowComplete } from '@/lib/kit-compiler';

type Stage = 'idle' | 'receipt' | 'delivering' | 'ready';

const serialFor = (offer: OfferV2, n: number) =>
  `OF-2026-${offer.offerId}-${String(100000 + n).padStart(6, '0')}`;

export function PurchaseFlow({ offer, compact = false }: { offer: OfferV2; compact?: boolean }) {
  const [stage, setStage] = useState<Stage>('idle');
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [serial, setSerial] = useState('');
  const [boughtAt, setBoughtAt] = useState<Date | null>(null);
  const zipRef = useRef<{ blob: Blob; filename: string } | null>(null);
  const stats = offerStats(offer);
  const rand = useRef(Math.floor(Math.random() * 900) + 100);

  const buy = () => {
    const n = rand.current;
    setSerial(serialFor(offer, n));
    setBoughtAt(new Date());
    setStage('receipt');
    // record purchase in the session library (P5 Library stub)
    try {
      const lib = JSON.parse(sessionStorage.getItem('of-library') ?? '[]');
      lib.push({ offerId: offer.offerId, title: offer.title, serial, at: Date.now() });
      sessionStorage.setItem('of-library', JSON.stringify(lib));
    } catch { /* private mode — fine */ }
  };

  const openDelivery = async () => {
    setStage('delivering');
    const result = await compileKit(offer, {
      onProgress: ({ pct, currentFile }) => { setProgress(pct); setCurrentFile(currentFile); },
    });
    zipRef.current = { blob: result.blob, filename: result.filename };
    setStage('ready');
  };

  const price = offer.price;
  return (
    <div className="space-y-4">
      {/* ── The purchase plate ─────────────────────────────────── */}
      <div className="of-plate p-4 of-lift">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            {price.amount !== null ? (
              <>
                <span className="of-foil-text font-display text-3xl font-semibold tracking-tight of-sheen rounded">${price.amount}</span>
                {price.compareAt !== null && (
                  <span className="font-mono text-sm text-zinc-400 line-through">${price.compareAt}</span>
                )}
              </>
            ) : (
              <span className="font-display text-2xl font-semibold tracking-tight">Request a quote</span>
            )}
          </div>
          <span className="of-plate-num">{offer.edition} · No. {String(rand.current).padStart(3, '0')}</span>
        </div>

        {!compact && (
          <p className="mt-2 text-[11.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">{offer.promise}</p>
        )}

        {/* policy chips — engraved pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {offer.policies.map((p) => <span key={p} className="of-chip">{POLICY_META[p].short}</span>)}
          {mayShowComplete(offer) && <span className="of-chip">Complete kit</span>}
        </div>

        <button onClick={buy} className="of-btn mt-4 w-full" disabled={stage !== 'idle'}>
          {stage === 'idle' ? (price.amount !== null ? `Buy now — instant download` : 'Request this build') : <><Check className="h-4 w-4" /> Purchased</>}
        </button>

        <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-zinc-400">
          <span>{stats.folders} folders · {stats.files} files · {stats.kb} KB</span>
          <span>Demo data</span>
        </div>
      </div>

      {/* ── Receipt (P1: receipt-grade purchase) ───────────────── */}
      {stage !== 'idle' && boughtAt && (
        <div className="of-receipt of-slide-up p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-400">Receipt</span>
            <span className="font-mono text-[9px] text-zinc-400">{boughtAt.toISOString().slice(0, 16).replace('T', ' ')}</span>
          </div>
          <div className="mt-1 font-mono text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">{serial}</div>

          <div className="of-tear of-tear-draw my-3" />

          <div className="space-y-1 font-mono text-[10.5px] text-zinc-600 dark:text-zinc-300">
            <div className="flex justify-between"><span>{offer.title} · {offer.proof.version}</span><span>{price.amount !== null ? `$${price.amount}.00` : 'quote'}</span></div>
            <div className="flex justify-between text-zinc-400"><span>{stats.folders} folders · {stats.files} files</span><span>included</span></div>
            <div className="flex justify-between text-zinc-400"><span>{offer.policies.length} policies</span><span>engraved below</span></div>
          </div>

          <div className="of-tear my-3" />

          <div className="space-y-0.5">
            {offer.policies.map((p) => (
              <div key={p} className="of-engrave font-mono text-[10px] text-zinc-500 dark:text-zinc-400">· {POLICY_META[p].label}</div>
            ))}
          </div>

          {stage === 'receipt' && (
            <button onClick={openDelivery} className="of-btn mt-4 w-full"><Package className="h-4 w-4" /> Open Delivery Room</button>
          )}
        </div>
      )}

      {/* ── Delivery Room (P5: real unboxing) ──────────────────── */}
      {(stage === 'delivering' || stage === 'ready') && (
        <div className="of-plate p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-400">Delivery Room</span>
            {stage === 'delivering' ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-brass-500" />
            ) : (
              <span className="of-seal inline-grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#8a2f23] to-[#5c1d14] text-[#f3dfa6] shadow-inner">
                <Award className="h-3.5 w-3.5" aria-label="Wax seal" />
              </span>
            )}
          </div>

          {/* progress — REAL, driven by compileKit */}
          <div className="mt-3">
            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div className="of-foil-bar h-full rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-1.5 flex items-center justify-between font-mono text-[9.5px] text-zinc-400">
              <span className="truncate">{stage === 'ready' ? 'Archive assembled' : `Assembling · ${currentFile}`}</span>
              <span className="tabular-nums">{progress}%</span>
            </div>
          </div>

          {/* folder checklist */}
          <div className="mt-3 grid gap-1">
            {offer.deliverables.map((f, i) => {
              const threshold = ((i + 1) / offer.deliverables.length) * 100;
              const done = progress >= threshold;
              return (
                <div key={f.id} className={`flex items-center gap-2 rounded px-1.5 py-1 transition-colors ${done ? 'bg-emerald-500/5' : ''}`}>
                  {done ? <FolderCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <FileText className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600" />}
                  <span className={`font-mono text-[10px] ${done ? 'text-zinc-700 dark:text-zinc-200' : 'text-zinc-400'}`}>{f.id} · {f.title}</span>
                  {done && <Check className="ml-auto h-3 w-3 text-emerald-600 dark:text-emerald-400" />}
                </div>
              );
            })}
          </div>

          {stage === 'ready' && zipRef.current && (
            <div className="of-slide-up mt-4 space-y-3">
              <button
                onClick={() => downloadBlob(zipRef.current!.blob, zipRef.current!.filename)}
                className="of-btn w-full"
              >
                <Download className="h-4 w-4" /> Download ZIP ({(zipRef.current.blob.size / 1024).toFixed(0)} KB)
              </button>
              <p className="text-center font-mono text-[9.5px] text-zinc-400">
                {zipRef.current.filename} · every file inside is flagged honestly in its README
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
