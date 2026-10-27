"use client";

/* ════════════════════════════════════════════════════════════════════
   <MotionMedia> (build plan v3 · P2) — one player, every surface.

   • Renders the poster <img> first; mounts <video> only when sources
     exist AND the element is 25% visible (IntersectionObserver).
   • A shared PlaybackBudget allows 1 playing video per section and 3
     per viewport; others pause on their current frame.
   • prefers-reduced-motion, navigator.connection.saveData or
     hardwareConcurrency < 4 → poster only.
   • Pauses on visibilitychange and when a modal covers it (covered
     via the budget's pauseAll).
   • When a registry asset has no video sources, the DOM loop for its
     archetype renders instead — a live miniature of the real demo,
     which is what P2's archetype "screen captures" were for.
   ════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { MediaAsset } from "./media-registry";
import { cn } from "@/lib/utils";

/* ── Playback budget: 1 per section, 3 per viewport ───────────────── */

type Budget = {
  register: (id: symbol, section: string, el: HTMLVideoElement) => () => void;
  pauseAll: () => void;
};

const videoRegistry = new Map<symbol, { section: string; el: HTMLVideoElement }>();
const activeBySection = new Map<string, symbol>();
let budgetListeners = new Set<() => void>();

function enforceBudget() {
  const bySection = new Map<string, symbol[]>();
  for (const [id, { section }] of videoRegistry) {
    const list = bySection.get(section) ?? [];
    list.push(id);
    bySection.set(section, list);
  }
  /* newest wins per section; max 3 total playing */
  const winners = new Set<symbol>();
  for (const [, ids] of bySection) {
    const newest = ids[ids.length - 1];
    if (winners.size < 3) winners.add(newest);
  }
  for (const [id, { el }] of videoRegistry) {
    if (winners.has(id)) void el.play().catch(() => {});
    else el.pause();
  }
  activeBySection.clear();
  budgetListeners.forEach((l) => l());
}

const budget: Budget = {
  register(id, section, el) {
    videoRegistry.set(id, { section, el });
    enforceBudget();
    return () => {
      videoRegistry.delete(id);
    };
  },
  pauseAll() {
    for (const [, { el }] of videoRegistry) el.pause();
  },
};

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) budget.pauseAll();
    else enforceBudget();
  });
}

/* ── Static motion gate ────────────────────────────────────────────── */

export function motionAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((navigator.hardwareConcurrency ?? 8) < 4) return false;
  return true;
}

/* ── The component ─────────────────────────────────────────────────── */

export function MotionMedia({
  asset,
  slot = "thumb",
  section = "default",
  priority = false,
  className,
  alt,
}: {
  asset: MediaAsset;
  slot?: "thumb" | "hero" | "theater";
  section?: string;
  priority?: boolean;
  className?: string;
  alt?: string;
}) {
  const [visible, setVisible] = useState(priority);
  const [imgFailed, setImgFailed] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canMotion] = useState(motionAllowed);

  /* IO: mount media when 25% visible (priority mounts immediately via lazy init) */
  useEffect(() => {
    if (priority) return;
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setVisible(true);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority]);

  /* Register with the playback budget when a video mounts */
  const hasVideo = !!asset.sources?.length && canMotion;
  useEffect(() => {
    if (!hasVideo || !visible || !videoRef.current) return;
    const id = Symbol("mm");
    const unregister = budget.register(id, section, videoRef.current);
    return unregister;
  }, [hasVideo, visible, section]);

  const focalStyle = asset.focal ? { objectPosition: `${asset.focal[0] * 100}% ${asset.focal[1] * 100}%` } : undefined;

  return (
    <div
      ref={hostRef}
      className={cn("relative overflow-hidden bg-muted", className)}
      data-motion-media={asset.id}
      data-slot={slot}
    >
      {/* Poster first — always */}
      {!imgFailed ? (
        <img
          src={asset.poster}
          alt={alt ?? ""}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setImgFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full",
            /* When a DOM loop is active the poster sits behind it as the stage */
            hasVideo ? "opacity-0" : canMotion && asset.dom && visible ? "opacity-100" : "opacity-100",
            asset.kind === "cinemagraph" && canMotion && visible && "animate-ken-burns"
          )}
          style={focalStyle}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-muted to-muted" aria-hidden="true" />
      )}

      {/* Video loop (only when sources exist) */}
      {hasVideo && visible && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          style={focalStyle}
        >
          {asset.sources!.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}

      {/* DOM living imagery — the archetype screen loop (no video needed) */}
      {!hasVideo && canMotion && visible && asset.dom && asset.kind === "screen" && (
        <DomLoop loop={asset.dom} />
      )}

      {/* Veil for text legibility */}
      {asset.veil ? (
        <div className="absolute inset-0 bg-black" style={{ opacity: asset.veil }} aria-hidden="true" />
      ) : null}
    </div>
  );
}

/* ── DOM loops — live miniatures of the real demos ─────────────────── */
/* These play the same beats as the P3 demo surfaces: a subject line  */
/* being typed, a score dial sweeping, a card moving across the board. */

function DomLoop({ loop }: { loop: NonNullable<MediaAsset["dom"]> }) {
  switch (loop) {
    case "typer": return <TyperLoop />;
    case "gauge": return <GaugeLoop />;
    case "board": return <BoardLoop />;
    case "toolbar": return <ToolbarLoop />;
    case "site": return <SiteLoop />;
    default: return null;
  }
}

const LOOP_EASE = [0.22, 1, 0.36, 1] as const;

function LoopShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#101012]/92 p-3 backdrop-blur-[2px]" aria-hidden="true">
      <div className="flex items-center gap-1.5 pb-2">
        <span className="size-1.5 rounded-full bg-rose-400/80" />
        <span className="size-1.5 rounded-full bg-amber-400/80" />
        <span className="size-1.5 rounded-full bg-emerald-400/80" />
        <span className="ml-1.5 font-mono-forge text-[7px] uppercase tracking-[0.18em] text-zinc-500">{label}</span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/** Template packs: a subject line types itself, then the send ticks. */
function TyperLoop() {
  const lines = [
    "The mistake I made for 3 years",
    "7 mistakes that quietly kill conversions",
    "You left something in your cart",
  ];
  return (
    <LoopShell label="template pack · live">
      <div className="flex h-full flex-col justify-center gap-2 px-1">
        <motion.div
          key="typer-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -6] }}
          transition={{ duration: 3.4, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: 0.6, ease: LOOP_EASE }}
          className="rounded-lg border border-amber-300/20 bg-white/[0.05] p-2.5"
        >
          <p className="font-mono-forge text-[8px] uppercase tracking-[0.16em] text-amber-300/80">Subject</p>
          <p className="mt-1 truncate font-mono-forge text-[10px] text-zinc-100">
            {lines[0]}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-0.5 inline-block h-3 w-[5px] translate-y-[2px] bg-amber-300"
            />
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: 3.4, times: [0, 0.55, 0.75, 1], repeat: Infinity, repeatDelay: 0.6 }}
          className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5"
        >
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono-forge text-[8px] font-bold text-emerald-300">61% open rate</span>
        </motion.div>
      </div>
    </LoopShell>
  );
}

/** Assessments: the score dial sweeps to 87 and the band seals. */
function GaugeLoop() {
  return (
    <LoopShell label="assessment · scoring">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <motion.circle
              cx="48" cy="48" r="40" fill="none" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 40}
              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
              animate={{ strokeDashoffset: [2 * Math.PI * 40, 2 * Math.PI * 40 * (1 - 0.87), 2 * Math.PI * 40 * (1 - 0.87)] }}
              transition={{ duration: 3.6, times: [0, 0.55, 1], repeat: Infinity, repeatDelay: 0.8, ease: LOOP_EASE }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="font-mono-forge text-xl font-extrabold tabular-nums text-zinc-100"
              animate={{ opacity: [0, 0, 1, 1] }}
              transition={{ duration: 3.6, times: [0, 0.5, 0.62, 1], repeat: Infinity, repeatDelay: 0.8 }}
            >
              87
            </motion.span>
          </div>
        </div>
        <motion.span
          className="mt-2 rounded-full border border-cyan-300/30 px-2.5 py-0.5 font-mono-forge text-[8px] font-bold uppercase tracking-[0.14em] text-cyan-300"
          animate={{ opacity: [0, 0, 1, 1], scale: [0.9, 0.9, 1, 1] }}
          transition={{ duration: 3.6, times: [0, 0.62, 0.75, 1], repeat: Infinity, repeatDelay: 0.8 }}
        >
          Platinum
        </motion.span>
      </div>
    </LoopShell>
  );
}

/** Notion systems: a card moves Backlog → In progress → Done. */
function BoardLoop() {
  const cols = ["Backlog", "In progress", "Review", "Done"];
  return (
    <LoopShell label="workspace · board">
      <div className="grid h-full grid-cols-4 gap-1.5">
        {cols.map((c, i) => (
          <div key={c} className="rounded-md bg-white/[0.03] p-1">
            <p className="px-0.5 pb-1 font-mono-forge text-[6.5px] font-bold uppercase tracking-[0.12em] text-zinc-500">{c}</p>
            {i === 3 ? (
              <motion.div
                layoutId="loop-card"
                className="rounded border border-emerald-400/30 bg-emerald-500/15 p-1.5"
                animate={{ x: [0, -3 * 100 + "%"], opacity: [1, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: LOOP_EASE }}
              />
            ) : null}
          </div>
        ))}
      </div>
      <motion.div
        className="absolute top-[38%] left-[2%] w-[23%] rounded border border-sky-400/30 bg-sky-500/15 p-1.5"
        animate={{ left: ["2%", "26.5%", "51%", "75.5%"], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.38, 0.72, 1], repeat: Infinity, ease: LOOP_EASE }}
      >
        <div className="h-1 w-3/4 rounded-full bg-zinc-300/50" />
        <div className="mt-1 h-1 w-1/2 rounded-full bg-zinc-400/40" />
        <div className="mt-1.5 flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-sky-400" />
          <span className="font-mono-forge text-[6px] text-zinc-400">Maya</span>
        </div>
      </motion.div>
    </LoopShell>
  );
}

/** Toolkits: a URL types, the score ticks up, a check passes. */
function ToolbarLoop() {
  return (
    <LoopShell label="instrument · live">
      <div className="flex h-full flex-col justify-center gap-2.5">
        <div className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-2">
          <p className="font-mono-forge text-[7px] uppercase tracking-[0.16em] text-zinc-500">Headline</p>
          <p className="mt-0.5 font-mono-forge text-[10px] text-zinc-200">
            7 mistakes that quietly kill your landing page
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-0.5 inline-block h-3 w-[5px] translate-y-[2px] bg-cyan-300"
            />
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[["Length", "40/40"], ["Power", "25/25"], ["Number", "20/20"]].map(([label, val], i) => (
            <motion.div
              key={label}
              className="flex-1 rounded-md border border-emerald-400/20 bg-emerald-500/10 px-2 py-1.5"
              animate={{ opacity: [0, 1] }}
              transition={{ delay: 1 + i * 0.35, duration: 0.4, repeat: Infinity, repeatDelay: 3.6 }}
            >
              <p className="font-mono-forge text-[6.5px] uppercase tracking-[0.12em] text-zinc-500">{label}</p>
              <p className="font-mono-forge text-[9px] font-bold text-emerald-300">{val}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="font-mono-forge text-[10px] font-bold text-zinc-100"
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ duration: 4.8, times: [0, 0.78, 0.9, 1], repeat: Infinity, repeatDelay: 1 }}
        >
          <span className="text-emerald-400">✓ 100/100</span> — strong, ship it
        </motion.p>
      </div>
    </LoopShell>
  );
}

/** Website kits: a mini page scrolls, then the booking confirms. */
function SiteLoop() {
  return (
    <LoopShell label="site · tour">
      <div className="h-full overflow-hidden rounded-md bg-white/95 dark:bg-zinc-900/90">
        <motion.div
          className="space-y-2.5 p-3"
          animate={{ y: [0, -46, -46, 0] }}
          transition={{ duration: 5.2, times: [0, 0.45, 0.8, 1], repeat: Infinity, ease: LOOP_EASE }}
        >
          <div className="h-1.5 w-2/5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          <div className="h-1 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-1 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-8 rounded-md bg-amber-100 dark:bg-amber-500/15" />
            ))}
          </div>
          <div className="h-1 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-1 w-3/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex items-center justify-between rounded-md border border-zinc-200 px-2.5 py-2 dark:border-zinc-700">
            <span className="font-mono-forge text-[7px] text-zinc-500">Booking form</span>
            <span className="rounded bg-zinc-900 px-2 py-0.5 font-mono-forge text-[7px] font-bold text-white dark:bg-amber-400 dark:text-zinc-900">Confirm</span>
          </div>
        </motion.div>
      </div>
      <motion.span
        className="absolute bottom-1.5 right-2 flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 font-mono-forge text-[7.5px] font-bold text-white"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 5.2, times: [0, 0.8, 0.88, 0.97, 1], repeat: Infinity }}
      >
        ✓ Confirmed
      </motion.span>
    </LoopShell>
  );
}
