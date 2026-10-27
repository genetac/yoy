"use client";

/* ════════════════════════════════════════════════════════════════════
   Listing extras v2 (build plan v3 · P1 plates + P0 flags)
   • StarRating      — fractional 5-star display
   • ProofRow        — rating · reviews · sold · version + Demo-data tag
   • FlagBadge       — real / sample / in-production, per file
   • ManifestExplorer— the OfferV2 tree: numbered folders with promise
                       lines, per-file flags, honest Extended pack,
                       collapsed to 3 rows + "+N more" in plates
   • PolicyChips     — engraved pills: Updates · Guarantee · License
   • TestimonialQuote— per-product persona voice (studio surface)
   ════════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Figma,
  FileArchive,
  FileCode2,
  FileJson,
  FileSpreadsheet,
  FileTerminal,
  FileText,
  FileVideo,
  Files,
  Folder,
  Mail,
  Star,
  BadgeCheck,
  ShieldCheck,
  RefreshCw,
  KeyRound,
  LifeBuoy,
} from "lucide-react";
import type {
  BundleFile,
  OfferV2,
  PolicyId,
  ProofV2,
  Testimonial,
} from "./catalog/schema";
import { policyChipLabel } from "./product-catalog";
import { cn } from "@/lib/utils";

/* ── StarRating ───────────────────────────────────────────────────── */

export function StarRating({
  value,
  size = 11,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const row = (filled: boolean) => (
    <span className="flex shrink-0" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={filled ? "fill-amber-400 text-amber-400" : "fill-muted-foreground/25 text-muted-foreground/25"}
        />
      ))}
    </span>
  );
  return (
    <span
      className={cn("relative inline-flex shrink-0", className)}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
    >
      {row(false)}
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }} aria-hidden="true">
        {row(true)}
      </span>
    </span>
  );
}

/* ── Demo-data tag (P0: every proof block shows it) ───────────────── */

export function DemoDataTag({ dark }: { dark?: boolean }) {
  return (
    <span
      className={cn(
        "rounded px-1 py-px font-mono-forge text-[8px] font-bold uppercase tracking-[0.1em]",
        dark ? "bg-white/10 text-zinc-400" : "bg-muted text-muted-foreground/80"
      )}
      title="Illustrative values until the real backend exists"
    >
      Demo data
    </span>
  );
}

/* ── ProofRow (proof v2) ──────────────────────────────────────────── */

export function ProofRow({
  proof,
  className,
  showVersion = true,
  variant = "card",
}: {
  proof: ProofV2;
  className?: string;
  showVersion?: boolean;
  variant?: "card" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] font-medium",
        dark ? "text-zinc-400" : "text-muted-foreground",
        className
      )}
    >
      <StarRating value={proof.rating} size={11} />
      <span className={cn("font-semibold tabular-nums", dark ? "text-zinc-100" : "text-foreground")}>
        {proof.rating.toFixed(1)}
      </span>
      <span className="tabular-nums">({proof.ratingCount})</span>
      <span aria-hidden="true" className="opacity-40">·</span>
      <span className="tabular-nums">{proof.soldLabel} sold</span>
      {showVersion && (
        <>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="font-mono-forge">
            {proof.version} · Updated {proof.updated}
          </span>
        </>
      )}
      <span aria-hidden="true" className="opacity-40">·</span>
      <DemoDataTag dark={dark} />
    </div>
  );
}

/* ── FlagBadge (P0: no file ever lies) ────────────────────────────── */

export function FlagBadge({ flag, dark }: { flag: BundleFile["flag"]; dark?: boolean }) {
  const map = {
    real: { label: "real", cls: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
    sample: { label: "sample", cls: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/25" },
    extended: { label: "soon", cls: "text-muted-foreground bg-muted/60 border-dashed border-border" },
  } as const;
  const m = map[flag];
  return (
    <span
      className={cn(
        "shrink-0 rounded border px-1 font-mono-forge text-[8px] font-bold uppercase tracking-[0.06em]",
        m.cls,
        dark && flag !== "extended" && "brightness-125"
      )}
      title={
        flag === "real"
          ? "Authored content ships in the ZIP"
          : flag === "sample"
            ? "Trimmed authored content ships in the ZIP"
            : "In production — the stub inside describes the finished file"
      }
    >
      {m.label}
    </span>
  );
}

/* ── File type icons ──────────────────────────────────────────────── */

const EXT_META: Record<string, { icon: typeof FileText; cls: string }> = {
  pdf: { icon: FileText, cls: "text-rose-500" },
  docx: { icon: FileText, cls: "text-sky-500" },
  md: { icon: FileText, cls: "text-zinc-400" },
  mdx: { icon: FileCode2, cls: "text-orange-500" },
  txt: { icon: FileText, cls: "text-zinc-400" },
  eml: { icon: Mail, cls: "text-amber-500" },
  xlsx: { icon: FileSpreadsheet, cls: "text-emerald-500" },
  csv: { icon: FileSpreadsheet, cls: "text-emerald-500" },
  json: { icon: FileJson, cls: "text-violet-500" },
  xml: { icon: FileCode2, cls: "text-violet-500" },
  sh: { icon: FileTerminal, cls: "text-slate-400" },
  tsx: { icon: FileCode2, cls: "text-sky-500" },
  html: { icon: FileCode2, cls: "text-orange-500" },
  js: { icon: FileCode2, cls: "text-amber-500" },
  mp4: { icon: FileVideo, cls: "text-rose-500" },
  fig: { icon: Figma, cls: "text-violet-500" },
  zip: { icon: FileArchive, cls: "text-amber-500" },
};

export function FileRow({
  file,
  dark,
  label,
}: {
  file: Pick<BundleFile, "path" | "ext" | "bytes" | "flag"> & { name?: string; size?: string };
  dark: boolean;
  label: string;
}) {
  const meta = EXT_META[file.ext] ?? { icon: FileText, cls: "text-zinc-400" };
  const Icon = meta.icon;
  const name = file.name ?? (file.path.split("/")[1] ?? file.path);
  return (
    <li className="flex min-w-0 items-center gap-2">
      <Icon className={cn("size-3 shrink-0", meta.cls)} aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate font-mono-forge text-[10px]" title={file.path}>
        {name}
      </span>
      <FlagBadge flag={file.flag} dark={dark} />
      <span
        className={cn(
          "shrink-0 font-mono-forge text-[9px] tabular-nums",
          dark ? "text-zinc-400" : "text-muted-foreground/80"
        )}
      >
        {file.size ?? fmtKb(file.bytes)}
      </span>
      <span className="sr-only">{label}</span>
    </li>
  );
}

function fmtKb(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/* ── ManifestExplorer v2 ──────────────────────────────────────────── */

export function ManifestExplorer({
  offer,
  variant = "card",
  defaultFirstOpen = true,
  collapsedRows,
  drawer = false,
}: {
  offer: OfferV2;
  variant?: "card" | "dark";
  defaultFirstOpen?: boolean;
  /** In plate mode: show N folder rows, then "+N more" */
  collapsedRows?: number;
  /** Drawer mode = plate contents drawer (no Browse-all toggle) */
  drawer?: boolean;
}) {
  const dark = variant === "dark";
  const folders = offer.deliverables;
  const [open, setOpen] = useState<ReadonlySet<number>>(
    () => new Set(defaultFirstOpen && folders.length > 0 ? [0] : [])
  );
  const [expanded, setExpanded] = useState(!drawer);

  const visible = collapsedRows != null && !expanded ? folders.slice(0, collapsedRows) : folders;
  const hidden = folders.length - visible.length;
  const allOpen = folders.length > 0 && folders.every((_, i) => open.has(i));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const toggleAll = () =>
    setOpen(allOpen ? new Set() : new Set(folders.map((_, i) => i)));

  const stats = {
    files: offer.root.length + folders.reduce((n, f) => n + f.files.length, 0),
    real: [...folders.flatMap((f) => f.files), ...offer.root].filter((f) => f.flag !== "extended").length,
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-2.5",
        dark ? "border-white/10 bg-white/[0.04]" : "border-border/70 bg-muted/30"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "font-mono-forge text-[9px] font-bold uppercase tracking-[0.14em]",
            dark ? "text-amber-300" : "text-muted-foreground"
          )}
        >
          What&apos;s included — inspect the bundle
        </span>
        {!drawer && (
          <button
            onClick={toggleAll}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 font-mono-forge text-[9px] font-semibold uppercase tracking-[0.08em] transition-colors",
              dark
                ? "text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-expanded={allOpen}
          >
            <Files className="size-3" aria-hidden="true" />
            {allOpen ? "Collapse files" : "Browse all files"}
          </button>
        )}
      </div>

      {/* Folders */}
      <ul className="mt-2 space-y-1.5">
        {visible.map((folder, i) => (
          <ManifestFolder
            key={folder.id + folder.title}
            index={Number(folder.id) || i + 1}
            folder={folder}
            dark={dark}
            expanded={open.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </ul>

      {/* "+N more" (plate drawer mode) */}
      {hidden > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className={cn(
            "mt-1.5 flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed px-2 py-1.5 font-mono-forge text-[9px] font-bold uppercase tracking-[0.1em] transition-colors",
            dark
              ? "border-white/15 text-zinc-400 hover:border-white/30 hover:text-zinc-200"
              : "border-border text-muted-foreground hover:border-border hover:text-foreground"
          )}
        >
          +{hidden} more {hidden === 1 ? "folder" : "folders"} — browse all
        </button>
      )}

      {/* Bundle root + stats footer */}
      <div className={cn("mt-2 border-t pt-2", dark ? "border-white/10" : "border-border/60")}>
        <div className="mb-1 flex items-center gap-1.5">
          <Folder className={cn("size-3 shrink-0", dark ? "text-zinc-400" : "text-muted-foreground")} aria-hidden="true" />
          <span
            className={cn(
              "font-mono-forge text-[9px] font-semibold uppercase tracking-[0.1em]",
              dark ? "text-zinc-400" : "text-muted-foreground"
            )}
          >
            Bundle root
          </span>
        </div>
        <ul className="grid grid-cols-1 gap-1 min-[420px]:grid-cols-2">
          {offer.root.map((file) => (
            <FileRow
              key={file.path}
              file={file}
              dark={dark}
              label={`${file.path}, ${fmtKb(file.bytes)}`}
            />
          ))}
        </ul>
        <p
          className={cn(
            "mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono-forge text-[9px] uppercase tracking-[0.1em]",
            dark ? "text-zinc-400" : "text-muted-foreground"
          )}
        >
          <span>{stats.files} files · {folders.length} folders</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {Math.round((stats.real / Math.max(1, stats.files)) * 100)}% real content
          </span>
        </p>
      </div>
    </div>
  );
}

function ManifestFolder({
  index,
  folder,
  dark,
  expanded,
  onToggle,
}: {
  index: number;
  folder: OfferV2["deliverables"][number];
  dark: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isExtended = folder.id === "99";
  const realCount = folder.files.filter((f) => f.flag !== "extended").length;
  return (
    <li>
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors",
          dark ? "hover:bg-white/10" : "hover:bg-muted/70",
          isExtended && "border border-dashed"
        )}
      >
        <span
          className={cn(
            "engraved shrink-0 font-mono-forge text-[9px] font-bold tabular-nums",
            isExtended
              ? "text-muted-foreground/70"
              : dark
                ? "text-amber-300/80"
                : "text-[var(--brass-ink)]"
          )}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-[11px] font-medium leading-snug",
            isExtended
              ? dark ? "text-zinc-400" : "text-muted-foreground"
              : dark ? "text-zinc-100" : "text-foreground/90"
          )}
          title={folder.title}
        >
          {folder.title}
        </span>
        <span
          className={cn(
            "shrink-0 rounded px-1 py-0.5 font-mono-forge text-[8px] font-semibold tabular-nums",
            dark ? "bg-white/10 text-zinc-300" : "bg-background text-muted-foreground"
          )}
        >
          {folder.files.length} files
        </span>
        {isExtended && (
          <span className="hidden shrink-0 rounded border border-dashed border-border px-1 font-mono-forge text-[7.5px] font-bold uppercase text-muted-foreground sm:inline">
            in production
          </span>
        )}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className={cn("shrink-0", dark ? "text-zinc-400" : "text-muted-foreground/80")}
        >
          <ChevronDown className="size-3" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "mt-1 rounded-md border-l-2 py-1.5 pl-3 pr-2",
                isExtended
                  ? "border-dashed border-border bg-muted/20"
                  : dark
                    ? "border-white/15 bg-white/[0.03]"
                    : "border-[var(--brass-line)]/50 bg-background/60"
              )}
            >
              <span
                className={cn(
                  "mb-1 block truncate font-mono-forge text-[9px]",
                  dark ? "text-zinc-400" : "text-muted-foreground/80"
                )}
                title={`${folder.promise}`}
              >
                {folder.promise}
              </span>
              <span className="mb-1.5 block truncate font-mono-forge text-[8.5px] text-muted-foreground/60" title="folder path">
                {folder.files[0]?.path.split("/")[0] ?? "folder"}/
              </span>
              <ul className="space-y-1">
                {folder.files.map((file, fi) => (
                  <FileRow
                    key={`${file.path}-${fi}`}
                    file={file}
                    dark={dark}
                    label={`${file.path}, ${fmtKb(file.bytes)}`}
                  />
                ))}
              </ul>
              {realCount > 0 && (
                <p className="mt-1.5 font-mono-forge text-[8px] uppercase tracking-[0.1em] text-emerald-600/90 dark:text-emerald-400/90">
                  {realCount}/{folder.files.length} authored
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ── PolicyChips (P1: engraved pills) ─────────────────────────────── */

const POLICY_ICON: Record<PolicyId, typeof ShieldCheck> = {
  updates: RefreshCw,
  "guarantee-30d": ShieldCheck,
  "license-commercial": KeyRound,
  "license-team": KeyRound,
  support: LifeBuoy,
};

export function PolicyChips({ offer, dark }: { offer: OfferV2; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap items-center gap-1.5" aria-label="Policies included with this offer">
      {offer.policies.map((p) => {
        const Icon = POLICY_ICON[p.id];
        return (
          <li
            key={p.id}
            title={p.label}
            className={cn(
              "engraved inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono-forge text-[9px] font-semibold uppercase tracking-[0.08em]",
              dark
                ? "border-white/15 bg-white/[0.05] text-zinc-300"
                : "border-[var(--brass-line)]/35 bg-[color-mix(in_srgb,var(--brass-line)_7%,transparent)] text-[var(--brass-ink)] dark:text-[var(--brass-ink)]"
            )}
          >
            <Icon className="size-2.5" aria-hidden="true" />
            {policyChipLabel(p.id, offer.tierLetter)}
          </li>
        );
      })}
    </ul>
  );
}

/* ── TestimonialQuote (per-archetype persona bank) ────────────────── */

export function TestimonialQuote({
  testimonial,
  variant = "card",
}: {
  testimonial: Testimonial;
  variant?: "card" | "dark";
}) {
  const dark = variant === "dark";
  const initials = testimonial.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <figure
      className={cn(
        "flex items-start gap-2.5 rounded-lg border p-2.5",
        dark ? "border-white/10 bg-white/[0.04]" : "border-border/70 bg-muted/20"
      )}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
          dark ? "bg-white/10 text-zinc-200" : "bg-primary/10 text-primary"
        )}
        aria-hidden="true"
      >
        {initials}
      </span>
      <figcaption className="min-w-0">
        <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
          <span className={cn("truncate text-[11px] font-semibold", dark ? "text-zinc-100" : "text-foreground")}>
            {testimonial.name}
          </span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className={cn("truncate text-[10px]", dark ? "text-zinc-400" : "text-muted-foreground")}>
            {testimonial.role}
          </span>
        </div>
        <StarRating value={testimonial.rating} size={9} className="mt-0.5" />
        <blockquote
          className={cn(
            "mt-1 line-clamp-3 text-[11px] leading-snug",
            dark ? "text-zinc-300" : "text-foreground/80"
          )}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </figcaption>
    </figure>
  );
}

/* ── Completion seal (honesty rule: <60% real can't say "Complete") ── */

export function CompletionSeal({ offer, dark }: { offer: OfferV2; dark?: boolean }) {
  const complete = offer.realShare >= 0.6;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono-forge text-[8.5px] font-bold uppercase tracking-[0.1em]",
        complete
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : dark
            ? "border-white/15 bg-white/5 text-zinc-400"
            : "border-border bg-muted/50 text-muted-foreground"
      )}
      title={complete ? "Over 60% of the bundle's files are authored today" : "Under 60% authored — listed files ship as honest in-production stubs until authored"}
    >
      <BadgeCheck className="size-2.5" aria-hidden="true" />
      {complete ? `${Math.round(offer.realShare * 100)}% complete` : "In production"}
    </span>
  );
}
