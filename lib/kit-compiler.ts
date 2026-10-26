/**
 * OMNIFORGE · KitCompiler (Elite Plan P5)
 * Assembles a real ZIP in the browser from the OfferV2 manifest.
 * Files carry their honest flags; progress is real, not a timer.
 */
import JSZip from 'jszip';
import type { OfferV2 } from '@/data/product-catalog';
import { contentFor } from '@/lib/kit-content';

export interface CompileProgress { pct: number; currentFile: string; }

export async function compileKit(
  offer: OfferV2,
  opts?: { onProgress?: (p: CompileProgress) => void },
): Promise<{ blob: Blob; filename: string; fileCount: number }> {
  const zip = new JSZip();
  const base = `omniforge-${offer.offerId.toLowerCase()}`;
  const root = zip.folder(base)!;

  const all: { path: string }[] = [
    ...offer.deliverables.flatMap((f) => f.files),
    ...offer.root.map((r) => ({ path: r.name })),
  ];
  const total = all.length;
  let done = 0;

  const report = (path: string) => {
    done += 1;
    opts?.onProgress?.({ pct: Math.round((done / total) * 100), currentFile: path });
  };

  for (const file of all) {
    const content = contentFor(offer, file.path);
    root.file(file.path.replace(/^EXTENDED-PACK\//, 'EXTENDED-PACK/'), content);
    report(file.path);
    // yield to the event loop so the UI can actually animate per file
    await new Promise((r) => setTimeout(r, 14));
  }

  const blob = await zip.generateAsync(
    { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
    (m) => opts?.onProgress?.({ pct: Math.max(90, Math.round(90 + m.percent / 10)), currentFile: 'Compressing archive' }),
  );

  return {
    blob,
    filename: `${base}-${offer.proof.version}.zip`,
    fileCount: total,
  };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* Honesty rule (P5): an offer below 60% real files never shows "Complete" */
export function mayShowComplete(offer: OfferV2): boolean {
  const all = offer.deliverables.flatMap((f) => f.files);
  if (!all.length) return false;
  return all.filter((f) => f.flag === 'real').length / all.length >= 0.6;
}
