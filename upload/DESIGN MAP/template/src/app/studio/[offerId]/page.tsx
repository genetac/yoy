'use client';

import { useState, useMemo, use } from 'react';
import { HERO_OFFERS, getOffer } from '../../_omniforge/product-catalog';
import { getFamily } from '../../_omniforge/types';
import { compileKit, downloadBlob } from '../../_omniforge/kit-compiler';
import QuizDemo from '../../_omniforge/demo-surfaces/QuizDemo';
import ToolDemo from '../../_omniforge/demo-surfaces/ToolDemo';
import NotionTourDemo from '../../_omniforge/demo-surfaces/NotionTourDemo';

type Tab = 'overview' | 'contents' | 'try-it' | 'preview' | 'delivery';

export default function StudioPage({ params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = use(params);
  const offer = getOffer(offerId);

  const [tab, setTab] = useState<Tab>('overview');
  const [purchasing, setPurchasing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressFile, setProgressFile] = useState('');
  const [purchased, setPurchased] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Which demo surface to show
  const demoSurface = useMemo(() => {
    if (!offer) return null;
    switch (offer.archetype) {
      case 'assessment': return <QuizDemo />;
      case 'toolkit': return <ToolDemo />;
      case 'notion-system': return <NotionTourDemo />;
      default: return null;
    }
  }, [offer]);

  if (!offer) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl font-bold text-[var(--ink)]">404</p>
          <p className="mt-2 font-mono text-sm text-[var(--ink-dim)]">Offer not found: {offerId}</p>
          <a href="/" className="mt-4 inline-block border border-[var(--ink)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)]">← Back home</a>
        </div>
      </main>
    );
  }
  const family = getFamily(offer.family)!;

  const hasDemo = demoSurface !== null;

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: 'try-it', label: 'Try it', show: hasDemo },
    { id: 'overview', label: 'Overview', show: true },
    { id: 'contents', label: "What's included", show: true },
    { id: 'preview', label: 'Live preview', show: offer.archetype === 'website-kit' },
    { id: 'delivery', label: 'Delivery room', show: purchased },
  ].filter((t) => t.show) as { id: Tab; label: string; show: boolean }[];

  async function handlePurchase() {
    setPurchasing(true);
    setProgress(0);
    setProgressFile('Initialising KitCompiler…');
    const blob = await compileKit(offer, {
      onProgress: (p, file) => {
        setProgress(p);
        setProgressFile(file);
      },
    });
    setPurchasing(false);
    setPurchased(true);
    setTab('delivery');
    // Store blob for download
    (window as any).__omniforge_blob = blob;
  }

  function handleDownload() {
    const blob = (window as any).__omniforge_blob as Blob | undefined;
    if (!blob) return;
    downloadBlob(blob, `omniforge-${offer.offerId}-v${offer.proof.version}.zip`);
    setDownloaded(true);
  }

  const totalFiles = offer.deliverables.reduce((s, f) => s + f.files.length, 0) + offer.root.length;
  const totalBytes = [...offer.deliverables.flatMap((f) => f.files), ...offer.root].reduce((s, f) => s + f.bytes, 0);
  const realFiles = [...offer.deliverables.flatMap((f) => f.files), ...offer.root].filter((f) => f.flag === 'real').length;
  const realPct = Math.round((realFiles / totalFiles) * 100);

  return (
    <main className="curtain-open min-h-screen">
      {/* === Studio header === */}
      <div className="border-b border-[var(--plate-edge)] bg-[var(--plate-bg)] px-[var(--gutter)] py-6">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
            <a href="/" className="hover:text-[var(--ink)]">OMNIFORGE</a>
            <span>/</span>
            <a href={`/family/${family.id}`} className="hover:text-[var(--ink)]">{family.label}</a>
            <span>/</span>
            <span className="text-[var(--ink)]">{offer.offerId}</span>
          </nav>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="plate-number">No. {String(offer.edition.number).padStart(3, '0')}</span>
                <span className="plate-number text-[var(--plate-edge)]">|</span>
                <span className="plate-number">{family.label}</span>
                <span className="demo-data-tag">Demo data</span>
              </div>
              <h1
                className="mt-2 font-display text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[var(--ink)]"
                style={{ fontFamily: family.tokens['--family-font'] }}
              >
                {offer.title}
              </h1>
              <p className="mt-2 max-w-2xl text-base text-[var(--ink-soft)]">{offer.tagline}</p>
            </div>

            {/* Price + buy */}
            <div className="shrink-0 border border-[var(--plate-edge)] bg-[var(--plate-bg-deep)] p-5 lg:w-72">
              <div className="flex items-baseline gap-2">
                <span className="foil font-display text-4xl font-extrabold">
                  {offer.price.amount !== null ? `$${offer.price.amount}` : '—'}
                </span>
                {offer.price.compareAt !== null && (
                  <span className="font-mono text-sm text-[var(--ink-dim)] line-through">
                    ${offer.price.compareAt}
                  </span>
                )}
              </div>
              <p className="plate-number mt-1">
                Edition {offer.edition.year} · No. {String(offer.edition.number).padStart(3, '0')} of {offer.edition.of}
              </p>
              <p className="plate-number mt-0.5">
                {totalFiles} files · {realPct}% real
              </p>
              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className="mt-4 w-full border border-[var(--ink)] bg-[var(--ink)] py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--plate-bg)] transition hover:bg-[var(--obsidian)] disabled:opacity-50"
              >
                {purchasing ? `Compiling… ${Math.round(progress * 100)}%` : 'Buy & Download'}
              </button>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {offer.policies.map((p) => (
                  <span key={p.kind} className="plate-chip text-[8px]">{p.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar during compilation */}
          {purchasing && (
            <div className="mt-4 border border-[var(--brass-soft)] bg-[var(--plate-bg)] p-3">
              <div className="flex items-center justify-between font-mono text-[10px] text-[var(--ink-soft)]">
                <span>{progressFile}</span>
                <span className="tabular-nums">{Math.round(progress * 100)}%</span>
              </div>
              <div className="mt-2 h-1 bg-[var(--plate-bg-deep)]">
                <div className="h-full bg-[var(--brass-line)] transition-all" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mt-6 flex gap-1 border-b border-[var(--plate-edge)]">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                  tab === t.id
                    ? 'border-b-2 border-[var(--brass-line)] text-[var(--ink)]'
                    : 'text-[var(--ink-dim)] hover:text-[var(--ink-soft)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === Tab content === */}
      <div className="px-[var(--gutter)] py-12">
        <div className="mx-auto max-w-7xl">
          {tab === 'overview' && (
            <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brass-line)]">
                  The promise
                </p>
                <p className="mt-3 font-serif text-2xl font-light italic leading-snug text-[var(--ink)]">
                  {offer.promise}
                </p>
                <div className="mt-8 border-t border-[var(--plate-edge)] pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)]">
                    Formats
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {offer.formats.map((f) => (
                      <span key={f} className="plate-chip">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 border-t border-[var(--plate-edge)] pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)]">
                    What buyers say
                  </p>
                  <div className="mt-4 flex flex-col gap-4">
                    {offer.proof.testimonials.map((t, i) => (
                      <blockquote key={i} className="border-l-2 border-[var(--brass-soft)] pl-4">
                        <p className="font-serif text-lg font-light italic leading-snug text-[var(--ink)]">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-dim)]">
                          {t.persona} · {t.role} · {'★'.repeat(t.rating)}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--ink-dim)]">
                    Demo data — real testimonials will replace these once the backend is live.
                  </p>
                </div>
              </div>
              <div className="border border-[var(--plate-edge)] bg-[var(--plate-bg-deep)] p-6">
                <p className="plate-number">Bundle stats</p>
                <dl className="mt-4 flex flex-col gap-3">
                  <Stat label="Folders" value={String(offer.deliverables.length)} />
                  <Stat label="Files" value={String(totalFiles)} />
                  <Stat label="Total size" value={formatBytes(totalBytes)} />
                  <Stat label="Real files" value={`${realFiles} (${realPct}%)`} />
                  <Stat label="Version" value={`v${offer.proof.version}`} />
                  <Stat label="Rating" value={`★ ${offer.proof.rating.toFixed(1)} (${offer.proof.reviewCount})`} />
                  <Stat label="Sold" value={offer.proof.soldCount.toLocaleString()} />
                </dl>
                {hasDemo && (
                  <button
                    onClick={() => setTab('try-it')}
                    className="mt-6 w-full border border-[var(--brass-line)] py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brass-line)] transition hover:bg-[var(--brass-line)] hover:text-[var(--plate-bg)]"
                  >
                    ▶ Try the demo
                  </button>
                )}
              </div>
            </div>
          )}

          {tab === 'contents' && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brass-line)]">
                What's included — every file with its flag
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase text-[var(--ink)]">
                {totalFiles} files across {offer.deliverables.length + 1} folders
              </h2>
              {/* Root files */}
              <div className="mt-8">
                <h3 className="border-b border-[var(--plate-edge)] pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
                  Root
                </h3>
                <div className="mt-2">
                  {offer.root.map((f) => (
                    <FileRow key={f.path} file={f} />
                  ))}
                </div>
              </div>
              {/* Deliverable folders */}
              {offer.deliverables.map((folder) => (
                <div key={folder.id} className="mt-6">
                  <h3 className="border-b border-[var(--plate-edge)] pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
                    {folder.id} · {folder.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] text-[var(--ink-dim)]">{folder.promise}</p>
                  <div className="mt-2">
                    {folder.files.map((f) => (
                      <FileRow key={f.path} file={f} />
                    ))}
                  </div>
                </div>
              ))}
              <p className="mt-8 border-t border-[var(--plate-edge)] pt-4 font-mono text-[10px] text-[var(--ink-dim)]">
                {realPct >= 60
                  ? '✓ This bundle is complete — all files are authored or sampled from real files.'
                  : '⚠ This bundle is in progress — extended files will be delivered as free updates.'}
              </p>
            </div>
          )}

          {tab === 'try-it' && demoSurface && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brass-line)]">
                Try it — playable demo, real formulas
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase text-[var(--ink)]">
                Don't read about it. Use it.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">
                This is the real demo, running the same formulas as the
                downloaded kit. Keyboard-complete, no network requests.
              </p>
              <div className="mt-8 border border-[var(--plate-edge)] bg-[var(--plate-bg)]">
                {demoSurface}
              </div>
            </div>
          )}

          {tab === 'preview' && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--brass-line)]">
                Live preview — 5-page flythrough
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase text-[var(--ink)]">
                SiteFlythrough
              </h2>
              <div className="mt-8 border border-[var(--plate-edge)] bg-[var(--obsidian)] p-12 text-center">
                <div className="wax-seal mx-auto h-16 w-16 text-2xl">▶</div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--plate-bg)]/60">
                  5-page auto-scroll tour · 25 seconds · pausable
                </p>
                <p className="mt-2 max-w-md mx-auto text-sm text-[var(--plate-bg)]/40">
                  The flythrough renders the actual MDX pages from the kit
                  with real dental copy and a working booking form.
                </p>
              </div>
            </div>
          )}

          {tab === 'delivery' && purchased && (
            <div className="mx-auto max-w-2xl">
              {/* Receipt */}
              <div className="border border-[var(--plate-edge)] bg-[var(--plate-bg)]">
                {/* Receipt header */}
                <div className="border-b border-dashed border-[var(--plate-edge)] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="plate-number">Receipt</p>
                      <p className="mt-1 font-mono text-sm text-[var(--ink)]">
                        OF-2026-{offer.offerId.replace('B-', '')}-{String(offer.edition.number).padStart(6, '0')}
                      </p>
                    </div>
                    <div className="seal-stamp wax-seal h-14 w-14 text-lg">✓</div>
                  </div>
                </div>

                {/* Line items */}
                <div className="p-6">
                  <table className="w-full font-mono text-[10px]">
                    <tbody>
                      <tr className="border-b border-[var(--plate-edge)]">
                        <td className="py-2 text-[var(--ink-dim)]">Item</td>
                        <td className="py-2 text-right text-[var(--ink)]">{offer.title}</td>
                      </tr>
                      <tr className="border-b border-[var(--plate-edge)]">
                        <td className="py-2 text-[var(--ink-dim)]">Folders</td>
                        <td className="py-2 text-right text-[var(--ink)]">{offer.deliverables.length + 1}</td>
                      </tr>
                      <tr className="border-b border-[var(--plate-edge)]">
                        <td className="py-2 text-[var(--ink-dim)]">Files</td>
                        <td className="py-2 text-right text-[var(--ink)]">{totalFiles}</td>
                      </tr>
                      <tr className="border-b border-[var(--plate-edge)]">
                        <td className="py-2 text-[var(--ink-dim)]">Size</td>
                        <td className="py-2 text-right text-[var(--ink)]">{formatBytes(totalBytes)}</td>
                      </tr>
                      <tr className="border-b border-[var(--plate-edge)]">
                        <td className="py-2 text-[var(--ink-dim)]">Real files</td>
                        <td className="py-2 text-right text-[var(--ink)]">{realFiles} / {totalFiles} ({realPct}%)</td>
                      </tr>
                      {offer.policies.map((p) => (
                        <tr key={p.kind} className="border-b border-[var(--plate-edge)]">
                          <td className="py-2 text-[var(--ink-dim)]">Policy</td>
                          <td className="py-2 text-right text-[var(--ink-soft)]">{p.label}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="pt-3 text-[var(--ink-dim)]">Total</td>
                        <td className="pt-3 text-right">
                          <span className="foil font-display text-2xl font-extrabold">
                            ${offer.price.amount}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tear line */}
                <div className="border-t-2 border-dashed border-[var(--plate-edge)]" />

                {/* Footer */}
                <div className="p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--ink-dim)]">
                    {new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC · Edition {offer.edition.year} · No. {String(offer.edition.number).padStart(3, '0')} of {offer.edition.of}
                  </p>
                  <button
                    onClick={handleDownload}
                    disabled={downloaded}
                    className="mt-4 w-full border border-[var(--ink)] bg-[var(--ink)] py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--plate-bg)] transition hover:bg-[var(--obsidian)] disabled:opacity-50"
                  >
                    {downloaded ? '✓ Downloaded' : '↓ Download ZIP'}
                  </button>
                  {downloaded && (
                    <p className="mt-3 text-center font-mono text-[10px] text-[var(--brass-line)]">
                      File: omniforge-{offer.offerId}-v{offer.proof.version}.zip
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--plate-edge)]/50 pb-2">
      <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-dim)]">{label}</dt>
      <dd className="font-mono text-sm text-[var(--ink)]">{value}</dd>
    </div>
  );
}

function FileRow({ file }: { file: { path: string; ext: string; bytes: number; flag: string } }) {
  const flagColor = file.flag === 'real' ? 'var(--brass-line)' : file.flag === 'sample' ? 'var(--ink-soft)' : 'var(--ink-dim)';
  return (
    <div className="flex items-center justify-between border-b border-[var(--plate-edge)]/30 py-1.5 font-mono text-[10px]">
      <span className="truncate text-[var(--ink)]">{file.path}</span>
      <span className="flex items-center gap-3">
        <span className="text-[var(--ink-dim)]">{formatBytes(file.bytes)}</span>
        <span
          className="px-1.5 py-0.5 text-[8px] uppercase tracking-[0.1em]"
          style={{ color: flagColor, border: `1px solid ${flagColor}` }}
        >
          {file.flag}
        </span>
      </span>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
