/* ════════════════════════════════════════════════════════════════════
   KitCompiler (build plan v3 · P5) — after purchase, the browser
   assembles and downloads a REAL ZIP. Every file is either genuinely
   authored (from kit-content/), generated from an authored source
   (.docx/.pdf), or an openly labelled "in production" stub. The
   backend later replaces this with a server download; the manifest
   driving the ZIP is the same OfferV2 from P0.
   ════════════════════════════════════════════════════════════════════ */

import type { OfferV2 } from "./catalog/schema";
import { bundleStats } from "./catalog/schema";

export interface CompileProgress {
  /** 0–1 */
  p: number;
  currentFile: string;
}

type ContentModule = { files: Record<string, string> };

const moduleCache = new Map<string, ContentModule>();

async function contentFor(kitId: string): Promise<ContentModule | null> {
  if (moduleCache.has(kitId)) return moduleCache.get(kitId)!;
  try {
    const mod = (await import(`./kit-content/${kitId}/content.ts`)) as ContentModule;
    moduleCache.set(kitId, mod);
    return mod;
  } catch {
    return null;
  }
}

/** Resolves a BundleFile source into authored text; null when missing. */
async function resolveSource(offer: OfferV2, source: string): Promise<string | null> {
  if (source.startsWith("_shared/")) {
    const shared = await contentFor("_shared");
    return shared?.files[source.slice(8)] ?? null;
  }
  const own = await contentFor(offer.offerId);
  if (own?.files[source] != null) return own.files[source];
  /* Bank-derived offers: sources point at the shared root only */
  const shared = await contentFor("_shared");
  return shared?.files[source] ?? null;
}

/* ── Generated twins: markdown → DOCX / PDF ───────────────────────── */

type MdBlock = { kind: "h1" | "h2" | "h3" | "p" | "li" | "table" | "pre"; text: string };

function parseMd(md: string): MdBlock[] {
  const out: MdBlock[] = [];
  const lines = md.split("\n");
  let para: string[] = [];
  let pre: string[] | null = null;
  const flush = () => {
    if (para.length) {
      out.push({ kind: "p", text: para.join(" ") });
      para = [];
    }
  };
  for (const line of lines) {
    if (line.startsWith("```")) {
      if (pre) {
        out.push({ kind: "pre", text: pre.join("\n") });
        pre = null;
      } else {
        flush();
        pre = [];
      }
      continue;
    }
    if (pre) { pre.push(line); continue; }
    if (!line.trim()) { flush(); continue; }
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      flush();
      out.push({ kind: `h${h[1].length}` as MdBlock["kind"], text: h[2].replace(/[*`]/g, "") });
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      flush();
      out.push({ kind: "li", text: line.replace(/^[-*]\s+/, "").replace(/[*`]/g, "") });
      continue;
    }
    if (/^\|/.test(line)) {
      flush();
      const cells = line.split("|").slice(1, -1).map((c) => c.trim()).filter((c) => !/^-+$/.test(c));
      if (cells.length) out.push({ kind: "table", text: cells.join("  ·  ") });
      continue;
    }
    para.push(line.replace(/[*`]/g, ""));
  }
  flush();
  if (pre) out.push({ kind: "pre", text: pre.join("\n") });
  return out;
}

async function mdToDocxBlob(md: string, title: string): Promise<Blob> {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");
  const blocks = parseMd(md);
  const children = [
    new Paragraph({ text: title, heading: HeadingLevel.TITLE }),
    ...blocks.map((b) => {
      if (b.kind === "h1") return new Paragraph({ text: b.text, heading: HeadingLevel.HEADING_1 });
      if (b.kind === "h2") return new Paragraph({ text: b.text, heading: HeadingLevel.HEADING_2 });
      if (b.kind === "h3") return new Paragraph({ text: b.text, heading: HeadingLevel.HEADING_3 });
      if (b.kind === "li") return new Paragraph({ text: b.text, bullet: { level: 0 } });
      if (b.kind === "table") return new Paragraph({ children: [new TextRun({ text: b.text, italics: true })] });
      if (b.kind === "pre") return new Paragraph({ children: [new TextRun({ text: b.text, font: "Courier New", size: 18 })] });
      return new Paragraph({ text: b.text });
    }),
  ];
  const doc = new Document({ sections: [{ children }] });
  return Packer.toBlob(doc);
}

async function mdToPdfBlob(md: string, title: string): Promise<Blob> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const SIZE = 10.5, LINE = SIZE * 1.6, W = 595.28, H = 841.89, M = 56;
  let page = pdf.addPage([W, H]);
  let y = H - M;

  const newPage = () => { page = pdf.addPage([W, H]); y = H - M; };
  const write = (text: string, f = font, size = SIZE, gap = 4) => {
    const words = text.split(/\s+/);
    let line = "";
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (f.widthOfTextAtSize(test, size) > W - M * 2) {
        page.drawText(line, { x: M, y, size, font: f, color: rgb(0.12, 0.12, 0.14) });
        y -= LINE;
        if (y < M) newPage();
        line = w;
      } else line = test;
    }
    if (line) {
      page.drawText(line, { x: M, y, size, font: f, color: rgb(0.12, 0.12, 0.14) });
      y -= LINE;
    }
    y -= gap;
    if (y < M) newPage();
  };

  write(title, bold, 17, 10);
  for (const b of parseMd(md)) {
    if (b.kind === "h1") write(b.text, bold, 14, 6);
    else if (b.kind === "h2") write(b.text, bold, 12.5, 5);
    else if (b.kind === "h3") write(b.text, bold, 11.5, 4);
    else if (b.kind === "li") write(`•  ${b.text}`, font, SIZE, 2);
    else if (b.kind === "table") write(b.text, font, 9.5, 4);
    else if (b.kind === "pre") write(b.text, font, 9, 4);
    else write(b.text, font, SIZE, 6);
  }
  const bytes = await pdf.save();
  return new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
}

/* ── README flag table (honesty rules) ────────────────────────────── */

function flagTable(offer: OfferV2): string {
  const rows = [
    ...offer.deliverables.flatMap((d) => d.files),
    ...offer.root,
  ].map(
    (f) =>
      `| \`${f.path}\` | ${f.flag} | ${
        f.flag === "extended" ? "in production — stub inside describes the finished file" : "authored content ships in this archive"
      } |`
  );
  return [
    "| File | Flag | Meaning |",
    "| --- | --- | --- |",
    ...rows,
  ].join("\n");
}

function interpolate(
  template: string,
  offer: OfferV2,
  heroNote: string
): string {
  return template
    .replace(/\{\{kit\}\}/g, offer.title)
    .replace(/\{\{offerId\}\}/g, offer.offerId)
    .replace(/\{\{version\}\}/g, offer.proof.version)
    .replace(/\{\{date\}\}/g, new Date().toISOString().slice(0, 10))
    .replace(/\{\{heroNote\}\}/g, heroNote)
    .replace(/\{\{flagTable\}\}/g, flagTable(offer));
}

function heroNoteFor(offer: OfferV2): string {
  if (!offer.authored) {
    return `This offer is part of the sample catalog: the root files are real, and the numbered folders honestly list their contents as "in production" until the kit's content is authored.`;
  }
  const stats = bundleStats(offer);
  return `Hand-authored hero kit — ${stats.fileCount} files across ${stats.folderCount} folders, every one authored or generated from an authored source. The Extended pack (if present) lists bonus files in production.`;
}

/* ── The compiler ─────────────────────────────────────────────────── */

export async function compileKit(
  offer: OfferV2,
  opts?: { onProgress?: (p: CompileProgress) => void }
): Promise<{ blob: Blob; filename: string; fileCount: number }> {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();

  const all = [
    ...offer.deliverables.flatMap((d) => d.files),
    ...offer.root,
  ];
  let done = 0;
  const report = (currentFile: string) =>
    opts?.onProgress?.({ p: done / Math.max(1, all.length), currentFile });

  for (const file of all) {
    report(file.path);
    try {
      if (file.flag === "extended") {
        const note =
          file.note ??
          "The finished file will contain this deliverable's full content; its folder is listed on the product page and tracked in the roadmap.";
        zip.file(
          file.path.replace(/\.(\w+)$/, ".md"),
          `# ${file.path.split("/").pop()} — in production\n\nStatus: **in production** — not in this archive.\n\n${note}\n`
        );
      } else if (file.ext === "docx" || file.ext === "pdf") {
        const src = await resolveSource(offer, file.source ?? file.path);
        if (src != null) {
          const title = `${offer.title} — ${file.path.split("/").pop()}`;
          const blob =
            file.ext === "docx"
              ? await mdToDocxBlob(src, title)
              : await mdToPdfBlob(src, title);
          zip.file(file.path, blob);
        } else {
          zip.file(file.path, await resolveSource(offer, file.source ?? file.path) ?? "");
        }
      } else {
        const text = await resolveSource(offer, file.source ?? file.path);
        zip.file(file.path, text ?? "");
      }
    } catch {
      /* A compile failure must never break the whole archive */
      zip.file(`${file.path}.ERROR.md`, `This file failed to compile in the browser demo pipeline.\n`);
    }
    done++;
  }
  report("packing");

  const blob = await zip.generateAsync(
    { type: "blob", compression: "DEFLATE" },
    (meta) => opts?.onProgress?.({ p: 0.95 + meta.percent / 2000, currentFile: "packing" })
  );

  return {
    blob,
    filename: `omniforge-${offer.offerId.toLowerCase()}-${offer.proof.version}.zip`,
    fileCount: all.length,
  };
}

/** Inline preview for a real file (Delivery Room file list). */
export async function previewFile(offer: OfferV2, path: string): Promise<string | null> {
  const file = [...offer.deliverables.flatMap((d) => d.files), ...offer.root].find((f) => f.path === path);
  if (!file || file.flag === "extended") return null;
  return resolveSource(offer, file.source ?? file.path);
}
