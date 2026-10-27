"use client";

/* ════════════════════════════════════════════════════════════════════
   Delivery Room (build plan v3 · P5) — the unboxing:
   1. Receipt card slides up (P1)
   2. Folders assemble one by one as compile progress fires (real
      progress, not a timer)
   3. Wax seal stamps when the Blob is ready
   4. Download ZIP + a file list with inline previews of real files
   5. A Library lists owned kits for the session (sessionStorage,
      try/catch wrapped)
   ════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Download, Loader2, CheckCircle2, FolderOpen, Eye, Archive, FileText } from "lucide-react";
import { bundleStats, fmtBytes, type OfferV2 } from "./catalog/schema";
import { compileKit, previewFile } from "./kit-compiler";
import { useOwnedIds, useIsOwned } from "./purchase-flow";
import { deriveOffer } from "./product-catalog";
import { cn } from "@/lib/utils";

/* ── Global open/close store (any surface can open the room) ──────── */

let openOffer: OfferV2 | null = null;
const openListeners = new Set<() => void>();
let openCache: OfferV2 | null = null;

export function openDeliveryRoom(offer: OfferV2) {
  openOffer = offer;
  openCache = offer;
  openListeners.forEach((l) => l());
}
function closeDeliveryRoom() {
  openOffer = null;
  openCache = null;
  openListeners.forEach((l) => l());
}
function useOpenOffer(): OfferV2 | null {
  return useSyncExternalStore(
    (l) => { openListeners.add(l); return () => openListeners.delete(l); },
    () => openCache,
    () => null
  );
}

/* ── The room ─────────────────────────────────────────────────────── */

export function DeliveryRoom() {
  const offer = useOpenOffer();
  return (
    <AnimatePresence>
      {offer && <RoomPanel key="room" offer={offer} onClose={closeDeliveryRoom} />}
    </AnimatePresence>
  );
}

type Stage = "compiling" | "ready" | "error";

function RoomPanel({ offer, onClose }: { offer: OfferV2; onClose: () => void }) {
  const stats = useMemo(() => bundleStats(offer), [offer]);
  const folders = offer.deliverables;
  const [stage, setStage] = useState<Stage>("compiling");
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("resolving manifest…");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [filename, setFilename] = useState("");
  const [assembled, setAssembled] = useState(0); // folders assembled so far
  const [preview, setPreview] = useState<{ path: string; text: string } | null>(null);

  /* Escape to close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  /* Compile for real, with real progress */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await compileKit(offer, {
          onProgress: ({ p, currentFile }) => {
            if (cancelled) return;
            setProgress(p);
            setCurrentFile(currentFile);
            const folderCount = Math.floor(p * (folders.length + 1));
            setAssembled(Math.min(folders.length, folderCount));
          },
        });
        if (cancelled) return;
        setBlob(result.blob);
        setFilename(result.filename);
        setAssembled(folders.length);
        setStage("ready");
      } catch (e) {
        if (!cancelled) {
          setCurrentFile((e as Error).message);
          setStage("error");
        }
      }
    })();
    return () => { cancelled = true; };
  }, [offer, folders.length]);

  const download = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    try {
      const lib = JSON.parse(sessionStorage.getItem("omniforge.library") ?? "[]") as string[];
      if (!lib.includes(offer.offerId)) {
        lib.push(offer.offerId);
        sessionStorage.setItem("omniforge.library", JSON.stringify(lib));
      }
    } catch { /* private mode etc. — library is a nicety, not a need */ }
  };

  const openPreview = async (path: string) => {
    if (preview?.path === path) { setPreview(null); return; }
    const text = await previewFile(offer, path);
    if (text != null) setPreview({ path, text: text.slice(0, 1400) });
  };

  const realFiles = [
    ...offer.deliverables.flatMap((d) => d.files),
    ...offer.root,
  ];
  const realCount = realFiles.filter((f) => f.flag !== "extended").length;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-2 backdrop-blur-md sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Delivery Room — ${offer.title}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 44, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="grain-overlay plate flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--plate-edge)] px-5 py-3.5">
          <div className="min-w-0">
            <p className="font-mono-forge text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Delivery Room · {offer.edition} · {offer.plateNo}
            </p>
            <h3 className="truncate text-base font-bold text-foreground">{offer.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close Delivery Room (Escape)"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {/* Unboxing state */}
          {stage !== "ready" && (
            <div className="flex flex-col items-center py-8 text-center">
              <span
                className={cn(
                  "relative flex size-16 items-center justify-center rounded-full",
                  stage === "compiling" ? "bg-muted" : "wax-seal"
                )}
                aria-hidden="true"
              >
                {stage === "compiling" ? (
                  <Loader2 className="size-7 animate-spin text-muted-foreground" />
                ) : (
                  <CheckCircle2 className="size-7 text-white/95" />
                )}
              </span>
              <p className="mt-4 text-sm font-bold text-foreground">
                {stage === "compiling" ? "Assembling your kit — for real" : "Compilation hit an error"}
              </p>
              <p className="mt-1 font-mono-forge text-[10px] tabular-nums text-muted-foreground">
                {currentFile} · {Math.round(progress * 100)}%
              </p>
              <div className="mt-4 w-full max-w-sm space-y-1.5" aria-hidden="true">
                {folders.map((f, i) => (
                  <div
                    key={f.id}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all duration-300",
                      i < assembled
                        ? "border-emerald-500/30 bg-emerald-500/[0.06] opacity-100"
                        : "border-dashed border-border opacity-45"
                    )}
                  >
                    <FolderOpen className={cn("size-3.5 shrink-0", i < assembled ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")} aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-foreground">
                      <span className="font-mono-forge text-muted-foreground">{f.id}</span> {f.title}
                    </span>
                    <span className="font-mono-forge text-[9px] tabular-nums text-muted-foreground">{f.files.length}</span>
                  </div>
                ))}
              </div>
              {stage === "error" && (
                <p className="mt-4 max-w-md text-xs text-muted-foreground">
                  {currentFile} — retry by reopening the Delivery Room. Demo pipeline;
                  nothing was charged.
                </p>
              )}
            </div>
          )}

          {/* Ready state */}
          {stage === "ready" && (
            <>
              <div className="flex flex-col items-center border-b border-dashed border-[var(--plate-edge)] pb-5 text-center">
                <motion.span
                  initial={{ scale: 1.4, rotate: 6, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="wax-seal seal-sheen flex size-14 items-center justify-center rounded-full text-sm font-black text-white/95"
                >
                  OF
                </motion.span>
                <p className="mt-3 text-sm font-bold text-foreground">
                  {realCount} real files compiled in your browser
                </p>
                <p className="mt-1 font-mono-forge text-[10px] text-muted-foreground">
                  {stats.folderCount} folders · {stats.fileCount} files · {fmtBytes(stats.totalBytes)} listed ·
                  ZIP {fmtBytes(blob?.size ?? 0)} actual
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={download}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition-transform active:translate-y-px"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Download ZIP
                  </button>
                  <span className="font-mono-forge text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                    {filename}
                  </span>
                </div>
              </div>

              {/* File list with inline previews */}
              <div className="mt-4 space-y-4">
                {offer.deliverables.map((folder) => (
                  <div key={folder.id}>
                    <p className="mb-1.5 flex items-center gap-2 font-mono-forge text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      <Archive className="size-3" aria-hidden="true" />
                      {folder.id} — {folder.title}
                    </p>
                    <ul className="grid gap-1 min-[560px]:grid-cols-2">
                      {folder.files.map((f) => {
                        const isReal = f.flag !== "extended";
                        const open = preview?.path === f.path;
                        return (
                          <li key={f.path}>
                            <button
                              onClick={() => isReal && openPreview(f.path)}
                              disabled={!isReal}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-md border px-2 py-1.5 text-left transition-colors",
                                isReal
                                  ? "border-border hover:border-primary/40 hover:bg-muted/40"
                                  : "border-dashed border-border/70 opacity-70"
                              )}
                            >
                              {isReal ? (
                                <Eye className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                              ) : (
                                <span className="size-3 shrink-0 text-center font-mono-forge text-[8px] font-bold text-muted-foreground">soon</span>
                              )}
                              <span className="min-w-0 flex-1 truncate font-mono-forge text-[10px] text-foreground/85">
                                {f.path.split("/")[1] ?? f.path}
                              </span>
                              <span className="shrink-0 font-mono-forge text-[9px] tabular-nums text-muted-foreground">
                                {fmtBytes(f.bytes)}
                              </span>
                            </button>
                            {open && preview?.path === f.path && (
                              <motion.pre
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="mt-1 max-h-44 overflow-y-auto whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-2.5 font-mono-forge text-[9.5px] leading-relaxed text-foreground/80"
                              >
                                {preview.text}
                              </motion.pre>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

                <div>
                  <p className="mb-1.5 font-mono-forge text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Bundle root
                  </p>
                  <ul className="grid grid-cols-2 gap-1 min-[560px]:grid-cols-4">
                    {offer.root.map((f) => (
                      <li key={f.path} className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1.5">
                        <FileText className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate font-mono-forge text-[10px] text-foreground/85">{f.path}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <LibraryStrip currentOfferId={offer.offerId} />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Library stub (sessionStorage, try/catch wrapped) ─────────────── */

function LibraryStrip({ currentOfferId }: { currentOfferId: string }) {
  const ownedIds = useOwnedIds();
  /* One-time read (client-only surface — the room opens after a click) */
  const [names] = useState<Record<string, string>>(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("omniforge.library") ?? "[]") as string[];
      const map: Record<string, string> = {};
      for (const id of stored) map[id] = id;
      return map;
    } catch {
      return {};
    }
  });

  const unique = [...new Set([...Object.keys(names), currentOfferId])];
  if (unique.length <= 1) return null;

  return (
    <div className="mt-5 rounded-xl border border-dashed border-border/80 p-3">
      <p className="font-mono-forge text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        Your library — this session
      </p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {unique.map((id) => (
          <li key={id} className="rounded-full border border-border bg-muted/40 px-2.5 py-1 font-mono-forge text-[9px] font-semibold text-muted-foreground">
            {id}
          </li>
        ))}
      </ul>
      <p className="mt-1.5 font-mono-forge text-[8px] uppercase tracking-[0.12em] text-muted-foreground/60">
        Session storage demo — the backend will persist this later ({ownedIds.length} owned)
      </p>
    </div>
  );
}
