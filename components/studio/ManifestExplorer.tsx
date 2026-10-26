'use client';
/**
 * OMNIFORGE · ManifestExplorer (Elite Plan P0/P1)
 * The contents drawer: real folders, real file paths, honest flags.
 * Real files preview inline — the actual content that ships in the ZIP.
 */
import { useState } from 'react';
import { Folder, FileText, ChevronDown, Eye, ShieldCheck } from 'lucide-react';
import { FLAG_META, offerStats, type OfferV2 } from '@/data/product-catalog';
import { contentFor } from '@/lib/kit-content';

export function ManifestExplorer({ offer, maxFolders = 3 }: { offer: OfferV2; maxFolders?: number }) {
  const [open, setOpen] = useState(false);
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ path: string; body: string } | null>(null);
  const stats = offerStats(offer);
  const folders = offer.deliverables;
  const shown = open ? folders : folders.slice(0, maxFolders);

  return (
    <div className="space-y-3">
      {/* header line */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-500 dark:text-zinc-400">
        <span className="font-mono">{stats.folders} folders · {stats.files} files · {stats.kb} KB</span>
        <span className={`font-mono ${stats.realPct >= 60 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
          {stats.realPct}% real files
        </span>
        <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-brass-500" /> Manifest = archive, 1:1</span>
      </div>

      {/* folders */}
      <div className="space-y-1.5">
        {shown.map((f) => (
          <div key={f.id} className="of-hairline rounded-lg overflow-hidden bg-zinc-50/60 dark:bg-zinc-900/40">
            <button
              onClick={() => setOpenFolder(openFolder === f.id ? null : f.id)}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-left hover:bg-brass-500/5 transition-colors"
            >
              <Folder className="h-3.5 w-3.5 shrink-0 text-brass-500" />
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                  {f.id} · {f.title}
                </span>
                <span className="block text-[10.5px] text-zinc-500 dark:text-zinc-400 truncate">{f.promise}</span>
              </span>
              <span className="font-mono text-[9px] text-zinc-400 shrink-0">{f.files.length}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${openFolder === f.id ? 'rotate-180' : ''}`} />
            </button>
            {openFolder === f.id && (
              <div className="of-expand border-t border-brass-500/15 px-3 py-2">
                <div className="grid gap-1">
                  {f.files.map((file) => {
                    const fm = FLAG_META[file.flag];
                    const fullPath = file.path;
                    return (
                      <div key={fullPath} className="flex items-center gap-2 rounded px-1.5 py-1 hover:bg-brass-500/5">
                        <FileText className="h-3 w-3 shrink-0 text-zinc-400" />
                        <span className="min-w-0 flex-1 truncate font-mono text-[10.5px] text-zinc-700 dark:text-zinc-300">{fullPath}</span>
                        <span className="font-mono text-[9px] tabular-nums text-zinc-400">{file.kb} KB</span>
                        <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide ${fm.cls}`}>{fm.label}</span>
                        {file.flag !== 'extended' && (
                          <button
                            onClick={() => setPreview(preview?.path === fullPath ? null : { path: fullPath, body: contentFor(offer, fullPath) })}
                            className="rounded p-1 text-zinc-400 hover:bg-brass-500/10 hover:text-brass-600"
                            aria-label={`Preview ${fullPath}`}
                          >
                            <Eye className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
        {!open && folders.length > maxFolders && (
          <button onClick={() => setOpen(true)} className="of-btn-ghost w-full text-[11px]">
            +{folders.length - maxFolders} more folders — show full manifest
          </button>
        )}
      </div>

      {/* root files */}
      <div className="of-hairline rounded-lg bg-zinc-50/60 dark:bg-zinc-900/40 px-3 py-2">
        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-400">Root of the archive</div>
        <div className="grid gap-0.5">
          {offer.root.map((r) => (
            <div key={r.name} className="flex items-center gap-2">
              <FileText className="h-3 w-3 shrink-0 text-zinc-400" />
              <span className="font-mono text-[10.5px] text-zinc-700 dark:text-zinc-300">{r.name}</span>
              <span className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* inline content preview */}
      {preview && (
        <div className="of-expand of-receipt overflow-hidden">
          <div className="flex items-center justify-between of-hairline-b bg-zinc-50/70 dark:bg-zinc-900/50 px-3 py-1.5">
            <span className="truncate font-mono text-[10px] text-zinc-600 dark:text-zinc-300">{preview.path}</span>
            <button onClick={() => setPreview(null)} className="text-[10px] font-semibold text-brass-600 dark:text-brass-400">Close</button>
          </div>
          <pre className="max-h-72 overflow-auto whitespace-pre-wrap px-3 py-2.5 font-mono text-[10.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {preview.body}
          </pre>
        </div>
      )}
    </div>
  );
}
