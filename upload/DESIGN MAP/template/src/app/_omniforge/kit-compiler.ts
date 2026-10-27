'use client';

import JSZip from 'jszip';
import type { OfferV2, BundleFile } from './types';
import { KIT_CONTENT, KIT_STUBS } from './kit-content';

/**
 * KitCompiler (P5) — assembles a real ZIP in the browser.
 *
 * Pipeline:
 * 1. Walk offer.root + offer.deliverables
 * 2. flag 'real' | 'sample' → load content from kit-content/
 * 3. flag 'extended' → write EXTENDED-PACK/<path>.md with honest stub
 * 4. JSZip.generateAsync with progress callback
 * 5. filename: omniforge-<offerId>-v<version>.zip
 *
 * The manifest that drives the ZIP is the same OfferV2 from P0,
 * so the backend later only replaces step 5 with a server download.
 */
export async function compileKit(
  offer: OfferV2,
  opts?: { onProgress?: (p: number, file: string) => void },
): Promise<Blob> {
  const zip = new JSZip();
  const baseName = `omniforge-${offer.offerId}-v${offer.proof.version}`;
  const root = zip.folder(baseName)!;

  const content = KIT_CONTENT[offer.offerId] || KIT_STUBS[offer.offerId] || {};

  // Collect all files
  const allFiles: BundleFile[] = [
    ...offer.root,
    ...offer.deliverables.flatMap((f) => f.files),
  ];

  let processed = 0;
  const total = allFiles.length;

  for (const file of allFiles) {
    let fileContent: string;

    if (file.flag === 'extended') {
      // Honest stub — never filler
      fileContent = `# ${file.path}\n\n**Status:** In production\n\nThis file will be part of the ${offer.title}.\n\nIt is currently being authored and will be delivered in a free update to all purchasers.\n\nNo filler has been generated to pad the archive.\n`;
    } else if (content[file.source || file.path]) {
      fileContent = content[file.source || file.path];
    } else if (content[file.path]) {
      fileContent = content[file.path];
    } else {
      // Fallback: honest placeholder
      fileContent = `# ${file.path}\n\nContent for this file is being finalised.\n\nFlag: ${file.flag}\nSource: ${file.source || '—'}\n`;
    }

    root.file(file.path, fileContent);
    processed++;
    opts?.onProgress?.(processed / total, file.path);
  }

  // Add the README flag table (honesty rule P5)
  const readmeContent = content['README.md'] || generateReadme(offer);
  root.file('README.md', readmeContent);

  const blob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      streamFiles: true,
    },
    (meta) => {
      opts?.onProgress?.(meta.percent / 100, 'Compressing…');
    },
  );

  return blob;
}

/** Generates an honest README with the flag table if one isn't authored. */
function generateReadme(offer: OfferV2): string {
  const allFiles = [...offer.root, ...offer.deliverables.flatMap((f) => f.files)];
  const realCount = allFiles.filter((f) => f.flag === 'real').length;
  const pct = Math.round((realCount / allFiles.length) * 100);

  let table = '| Path | Flag | Size |\n|------|------|------|\n';
  for (const f of allFiles) {
    table += `| ${f.path} | ${f.flag} | ${formatBytes(f.bytes)} |\n`;
  }

  return `# ${offer.title}

${offer.promise}

## File flags

| Flag | Meaning |
|------|---------|
| real | Authored, ready to use |
| sample | Trimmed version of a real file |
| extended | In production — honest stub |

## Contents

${table}

## Honesty summary

- Total files: ${allFiles.length}
- Real files: ${realCount} (${pct}%)
- ${pct >= 60 ? 'Status: Complete' : 'Status: In progress — extended files will be delivered as free updates'}

## License

See LICENSE.md

## Version

v${offer.proof.version} · Edition ${offer.edition.year} · No. ${String(offer.edition.number).padStart(3, '0')} of ${offer.edition.of}
`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Triggers a browser download of the compiled ZIP. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
