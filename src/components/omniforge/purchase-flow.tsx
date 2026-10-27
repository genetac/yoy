"use client";

/* ════════════════════════════════════════════════════════════════════
   Purchase flow v2 (build plan v3 · P1 receipts + P5 hand-off)
   • Session-persistent ownership registry (survives view switches)
   • Purchase → animated button → receipt-grade confirmation panel
     (serial, timestamp, line items, policies, tear line) with the
     primary action "Open Delivery Room"
   • Receipts + Delivery Room launches are global stores so any
     surface (listing, studio, demo end-card) can trigger them
   ════════════════════════════════════════════════════════════════════ */

import { useCallback, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Download, Loader2, ShoppingCart, FileArchive, PackageOpen } from "lucide-react";
import { formatPrice, policyChipLabel, bundleStats, offerFiles, type OfferV2 } from "./product-catalog";
import { fmtBytes } from "./catalog/schema";
import { openDeliveryRoom } from "./delivery-room";
import { cn } from "@/lib/utils";

/* ── Ownership registry (session) ─────────────────────────────────── */

const owned = new Set<string>();
const listeners = new Set<() => void>();
let snapshotCache: string[] = [];

function emit() {
  snapshotCache = [...owned];
  listeners.forEach((l) => l());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
const getSnapshot = () => snapshotCache;

export function purchaseOffer(id: string) {
  if (owned.has(id)) return;
  owned.add(id);
  emit();
}

export function useOwnedIds(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useIsOwned(id: string): boolean {
  const ids = useOwnedIds();
  return ids.includes(id);
}

/* ── Receipt store (P1: the toast is replaced by a receipt panel) ── */

export interface Receipt {
  id: string;
  serial: string;
  timestamp: string;
  offer: OfferV2;
  quoteTier: boolean;
}

let receiptSeq = 400 + Math.floor(Math.random() * 300);
const receipts: Receipt[] = [];
const receiptListeners = new Set<() => void>();
let receiptCache: Receipt[] = [...receipts];

function pushReceipt(offer: OfferV2) {
  receiptSeq++;
  const seq = String(receiptSeq).padStart(6, "0");
  receipts.unshift({
    id: `${offer.id}:${Date.now()}`,
    serial: `OF-2026-${offer.offerId.replace(/[^A-Z0-9]/g, "").toUpperCase()}-${seq}`,
    timestamp: new Date().toLocaleString("en-US", {
      year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit",
    }),
    offer,
    quoteTier: offer.price.amount === null,
  });
  receipts.splice(3); // keep the last 3
  receiptCache = [...receipts];
  receiptListeners.forEach((l) => l());
}

function dismissReceipt(id: string) {
  const i = receipts.findIndex((r) => r.id === id);
  if (i >= 0) {
    receipts.splice(i, 1);
    receiptCache = [...receipts];
    receiptListeners.forEach((l) => l());
  }
}

export function useReceipts(): Receipt[] {
  return useSyncExternalStore(
    (l) => { receiptListeners.add(l); return () => receiptListeners.delete(l); },
    () => receiptCache,
    () => receiptCache
  );
}

export function dismissReceiptExport(id: string) {
  dismissReceipt(id);
}

/* ── PurchaseButton ───────────────────────────────────────────────── */

export function PurchaseButton({
  offer,
  exampleName,
  size = "md",
  className,
  compact = false,
}: {
  offer: OfferV2;
  exampleName: string;
  size?: "sm" | "md";
  className?: string;
  /** Compact = tight chrome bars (studio info bar) */
  compact?: boolean;
}) {
  const isOwned = useIsOwned(offer.id);
  const processing = useProcessingFlag(offer.id, isOwned);
  const quoteTier = offer.price.amount === null;
  const stats = bundleStats(offer);

  const handleClick = useCallback(() => {
    if (processing) return;
    if (isOwned) {
      openDeliveryRoom(offer);
      return;
    }
    startProcessing(offer.id, () => {
      purchaseOffer(offer.id);
      pushReceipt(offer);
    });
  }, [processing, isOwned, offer]);

  const h = size === "sm" ? "h-8 px-3 text-[11px]" : "h-9 px-4 text-xs";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <motion.button
        onClick={handleClick}
        disabled={processing}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-lg font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          h,
          isOwned
            ? "bg-emerald-600 text-white hover:bg-emerald-500"
            : quoteTier
              ? "bg-violet-600 text-white hover:bg-violet-500"
              : "bg-primary text-primary-foreground hover:bg-primary/90",
          processing && "cursor-wait"
        )}
        aria-label={
          isOwned
            ? `Open the Delivery Room for ${exampleName}`
            : quoteTier
              ? `Request a quote for ${exampleName}`
              : `Buy ${exampleName} now — ${formatPrice(offer.price.amount ?? 0)}${offer.price.period ?? ""} demo checkout`
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOwned ? "owned" : processing ? "processing" : "idle"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="flex items-center gap-1.5"
          >
            {isOwned ? (
              <>
                <PackageOpen className="size-3.5" aria-hidden="true" />
                {compact ? "Delivery Room" : `Delivery Room · ${stats.fileCount} files`}
              </>
            ) : processing ? (
              <>
                <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                Processing…
              </>
            ) : quoteTier ? (
              <>
                <FileArchive className="size-3.5" aria-hidden="true" />
                {compact ? "Request quote" : "Request a quote"}
              </>
            ) : (
              <>
                <ShoppingCart className="size-3.5" aria-hidden="true" />
                {compact ? (
                  "Get instant access"
                ) : (
                  <>
                    Get instant access
                    <span className="opacity-70">·</span>
                    {formatPrice(offer.price.amount ?? 0)}
                    {offer.price.period ?? ""}
                  </>
                )}
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      {!compact && (
        <span className="flex items-center justify-center gap-1 font-mono-forge text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
          <Check className="size-2.5 text-emerald-500" aria-hidden="true" />
          Demo checkout · real ZIP · no charge
        </span>
      )}
    </div>
  );
}

/* ── Receipt stack (rendered at app root) ─────────────────────────── */

export function ReceiptStack() {
  const receipts = useReceipts();
  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-[70] flex w-[min(92vw,380px)] flex-col gap-2">
      <AnimatePresence>
        {receipts.map((r) => (
          <ReceiptPanel key={r.id} receipt={r} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ReceiptPanel({ receipt }: { receipt: Receipt }) {
  const { offer, quoteTier } = receipt;
  const stats = bundleStats(offer);
  const files = offerFiles(offer);

  return (
    <motion.div
      layout
      initial={{ y: 40, opacity: 0, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ x: 60, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="pointer-events-auto grain-overlay plate receipt-edge overflow-hidden rounded-xl p-4"
      role="status"
      aria-label="Purchase receipt"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono-forge text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {quoteTier ? "Request logged" : "Purchase complete"}
          </p>
          <p className="mt-0.5 text-sm font-bold text-foreground">{offer.title}</p>
        </div>
        <span className="wax-seal seal-sheen mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white/95">
          OF
        </span>
      </div>

      <dl className="mt-3 space-y-1 font-mono-forge text-[10px] leading-relaxed text-muted-foreground">
        <div className="flex justify-between gap-2">
          <dt>Serial</dt>
          <dd className="tabular-nums text-foreground">{receipt.serial}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Issued</dt>
          <dd className="tabular-nums">{receipt.timestamp}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Line items</dt>
          <dd className="tabular-nums">
            {stats.folderCount} folders · {stats.fileCount} files · {fmtBytes(stats.totalBytes)}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Total</dt>
          <dd className="tabular-nums text-foreground">
            {quoteTier ? "Custom quote" : `${formatPrice(offer.price.amount ?? 0)}${offer.price.period ?? ""}`}
          </dd>
        </div>
      </dl>

      {/* Engraved policy lines */}
      <ul className="mt-2.5 space-y-0.5 border-t border-dashed border-border pt-2">
        {offer.policies.map((p) => (
          <li key={p.id} className="engraved flex items-center gap-1.5 font-mono-forge text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
            <Check className="size-2.5 text-emerald-500" aria-hidden="true" />
            {policyChipLabel(p.id, offer.tierLetter)}
          </li>
        ))}
      </ul>

      <div className="tear-line mt-3 border-t border-dashed border-border/90" aria-hidden="true" />

      <div className="mt-3 flex items-center gap-2">
        {quoteTier ? (
          <span className="flex-1 text-center font-mono-forge text-[10px] text-muted-foreground">
            Demo pipeline — the team would scope this engagement next
          </span>
        ) : (
          <button
            onClick={() => { openDeliveryRoom(offer); dismissReceipt(receipt.id); }}
            className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-transform active:translate-y-px"
          >
            Open Delivery Room →
          </button>
        )}
        <button
          onClick={() => dismissReceipt(receipt.id)}
          className="rounded-lg border border-border px-2.5 py-2 font-mono-forge text-[10px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Dismiss receipt"
        >
          <Download className="hidden size-3.5" aria-hidden="true" />
          Later
        </button>
      </div>
      <p className="mt-2 text-center font-mono-forge text-[8px] uppercase tracking-[0.14em] text-muted-foreground/70">
        Demo checkout · {files.length} files compile in your browser · no real charge
      </p>
    </motion.div>
  );
}

/* ── One-shot processing flag shared across instances ─────────────── */

const processingMap = new Map<string, boolean>();
const processingListeners = new Map<string, Set<() => void>>();
const timeouts = new Map<string, ReturnType<typeof setTimeout>>();

function startProcessing(id: string, done: () => void) {
  processingMap.set(id, true);
  processingListeners.get(id)?.forEach((l) => l());
  const t = setTimeout(() => {
    processingMap.set(id, false);
    timeouts.delete(id);
    processingListeners.get(id)?.forEach((l) => l());
    done();
  }, 1100);
  timeouts.set(id, t);
}

function useProcessingFlag(id: string, isOwned: boolean): boolean {
  const subscribeProcessing = useCallback(
    (listener: () => void) => {
      const set = processingListeners.get(id) ?? new Set<() => void>();
      set.add(listener);
      processingListeners.set(id, set);
      return () => set.delete(listener);
    },
    [id]
  );
  const getProcessing = useCallback(() => processingMap.get(id) ?? false, [id]);
  const flag = useSyncExternalStore(subscribeProcessing, getProcessing, () => false);
  return flag && !isOwned;
}
