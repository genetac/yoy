"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
} from "motion/react";
import {
  Zap,
  Search,
  Home,
  LayoutGrid,
  Boxes,
  Layers,
  Eye,
  Tag,
  PanelLeftClose,
  PanelLeft,
  Sun,
  Moon,
  Command,
  ArrowRight,
  CornerDownLeft,
  Menu,
  X,
} from "lucide-react";
import { paletteIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

/* ════════════════════════════════════════════════════════════════════
   OMNIFORGE App Shell
   Sidebar (collapsible + mobile drawer) · Topbar · Command palette.
   MotionConfig reducedMotion="user" at the client boundary (GUIDE §6.4).
   ════════════════════════════════════════════════════════════════════ */

export type View =
  | { kind: "home" }
  | { kind: "family"; familyId: string }
  | { kind: "pricing" };

export type PaletteItem = {
  id: string;
  label: string;
  hint: string;
  group: "Families" | "Plans" | "Products";
  view: View;
};

/* ── Command Palette (⌘K) ─────────────────────────────────────────── */

export function CommandPalette({
  open,
  onOpenChange,
  items,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: PaletteItem[];
  onSelect: (v: View) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement;
      // Focus input after entrance (no setState — body owns its own state)
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      returnFocusRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {/* PaletteBody mounts fresh on every open — query/active reset
          naturally, no synchronous setState in an effect. */}
      {open && (
        <PaletteBody
          items={items}
          onOpenChange={onOpenChange}
          onSelect={onSelect}
          inputRef={inputRef}
        />
      )}
    </AnimatePresence>
  );
}

function PaletteBody({
  items,
  onOpenChange,
  onSelect,
  inputRef,
}: {
  items: PaletteItem[];
  onOpenChange: (v: boolean) => void;
  onSelect: (v: View) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items
      .filter((i) => `${i.label} ${i.hint} ${i.group}`.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query, items]);

  const choose = useCallback(
    (i: PaletteItem) => {
      onOpenChange(false);
      onSelect(i.view);
    },
    [onOpenChange, onSelect]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      choose(results[active]);
    }
  };

  const groups = useMemo(() => {
    const g: Record<string, PaletteItem[]> = {};
    results.forEach((r) => {
      (g[r.group] ||= []).push(r);
    });
    return g;
  }, [results]);

  const flatIdx = (item: PaletteItem) => results.indexOf(item);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
      initial="hidden"
      animate="show"
      exit="exit"
      variants={paletteIn}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onKeyDown={onKeyDown}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search families, products, plans…"
            className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search OMNIFORGE"
            aria-controls="palette-results"
          />
          <kbd className="hidden shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono-forge text-[10px] text-muted-foreground sm:block">
            ESC
          </kbd>
        </div>
        <div id="palette-results" role="listbox" aria-label="Results" className="max-h-[46vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No matches for “{query}”
            </div>
          )}
          {Object.entries(groups).map(([group, list]) => (
            <div key={group} className="mb-1">
              <div className="px-3 pb-1 pt-2 font-mono-forge text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {group}
              </div>
              {list.map((item) => {
                const idx = flatIdx(item);
                return (
                  <button
                    key={item.id}
                    role="option"
                    aria-selected={active === idx}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => choose(item)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      active === idx ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{item.label}</span>
                      <span
                        className={cn(
                          "block truncate text-xs",
                          active === idx ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}
                      >
                        {item.hint}
                      </span>
                    </span>
                    {active === idx && (
                      <CornerDownLeft className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono-forge text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Command className="size-3" aria-hidden="true" />K to open</span>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Theme toggle (next-themes: no hydration juggling, no effects) ── */

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Toggle color theme"
    >
      {/* Icon visibility driven by the .dark class — renders correctly
          before hydration without a mounted flag. */}
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}

/* ── Sidebar navigation ───────────────────────────────────────────── */

export type SidebarMeta = {
  id: string;
  label: string;
  short: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
};

function SidebarContent({
  view,
  onSelect,
  families,
  productCount,
  collapsed,
  onToggleCollapse,
  onNavigate,
}: {
  view: View;
  onSelect: (v: View) => void;
  families: SidebarMeta[];
  productCount: number;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate?: () => void;
}) {
  const navItems = [
    { label: "Home", icon: Home, view: { kind: "home" } as View, hint: `${productCount} products` },
    ...families.map((f) => ({
      label: f.short,
      icon: f.icon,
      view: { kind: "family", familyId: f.id } as View,
      hint: `${f.count} products`,
    })),
    { label: "Pricing", icon: Tag, view: { kind: "pricing" } as View, hint: "4 plans" },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className={cn("flex h-14 items-center gap-2.5 px-3", collapsed && "justify-center px-0")}>
        <div className="relative grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Zap className="size-4" aria-hidden="true" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="font-display text-sm font-bold leading-tight tracking-tight">OMNIFORGE</div>
            <div className="font-mono-forge text-[10px] leading-tight text-muted-foreground">
              Design Family Engine
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={cn("mt-2 flex flex-1 flex-col gap-0.5 px-2", collapsed && "px-1.5")} aria-label="Primary">
        {navItems.map((item) => {
          const isActive =
            item.view.kind === view.kind &&
            (item.view.kind !== "family" ||
              (view.kind === "family" && view.familyId === (item.view as { familyId: string }).familyId));
          return (
            <button
              key={item.label}
              onClick={() => {
                onSelect(item.view);
                onNavigate?.();
              }}
              aria-current={isActive ? "page" : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group relative flex min-h-9 items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                isActive
                  ? "bg-muted font-semibold text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="forge-nav-indicator"
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[rgb(var(--forge-glow))]"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
              )}
              <item.icon className="size-4 shrink-0" aria-hidden="true" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  <span className="font-mono-forge text-[10px] text-muted-foreground/70">
                    {item.hint}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={cn("border-t border-border p-2", collapsed && "px-1.5")}>
        <button
          onClick={onToggleCollapse}
          className={cn(
            "hidden w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground lg:flex",
            collapsed && "justify-center px-0"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          {collapsed ? <PanelLeft className="size-4" aria-hidden="true" /> : <PanelLeftClose className="size-4" aria-hidden="true" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
        {!collapsed && (
          <div className="mt-2 rounded-lg border border-dashed border-border bg-muted/30 p-3.5">
            <div className="flex items-center gap-2">
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500 text-emerald-500 forge-pulse" aria-hidden="true" />
              <span className="font-mono-forge text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/80">
                Demo workspace
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              All metrics shown are illustrative samples, not measured data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── AppShell ─────────────────────────────────────────────────────── */

export function AppShell({
  view,
  onSelect,
  families,
  productCount,
  exampleCount,
  children,
}: {
  view: View;
  onSelect: (v: View) => void;
  families: SidebarMeta[];
  productCount: number;
  exampleCount: number;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const paletteItems = useMemo<PaletteItem[]>(
    () => [
      { id: "home", label: "Home", hint: "Command center · all families", group: "Plans", view: { kind: "home" } },
      {
        id: "pricing",
        label: "Pricing Plans",
        hint: "Starter → Enterprise comparison",
        group: "Plans",
        view: { kind: "pricing" },
      },
      ...families.map((f) => ({
        id: f.id,
        label: f.label,
        hint: `${f.count} products in this family`,
        group: "Families" as const,
        view: { kind: "family" as const, familyId: f.id },
      })),
    ],
    [families]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const crumbs =
    view.kind === "home"
      ? ["Workspace", "Home"]
      : view.kind === "pricing"
        ? ["Workspace", "Pricing"]
        : [
            "Workspace",
            families.find((f) => f.id === view.familyId)?.label ?? "Family",
          ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen w-full">
        {/* Desktop sidebar */}
        <motion.aside
          className="sticky top-0 hidden h-screen shrink-0 border-r border-border bg-background/60 backdrop-blur lg:block"
          animate={{ width: collapsed ? 64 : 232 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Sidebar"
        >
          <SidebarContent
            view={view}
            onSelect={onSelect}
            families={families}
            productCount={productCount}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((v) => !v)}
          />
        </motion.aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-50 lg:hidden"
              initial="hidden"
              animate="show"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 w-72 border-r border-border bg-background"
                variants={{
                  hidden: { x: -288 },
                  show: { x: 0 },
                  exit: { x: -288 },
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                  aria-label="Close navigation"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
                <SidebarContent
                  view={view}
                  onSelect={onSelect}
                  families={families}
                  productCount={productCount}
                  collapsed={false}
                  onToggleCollapse={() => undefined}
                  onNavigate={() => setMobileOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-lg sm:px-6">
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-sm text-muted-foreground md:flex">
              {crumbs.map((c, i) => (
                <span key={c} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true" className="text-muted-foreground/50">/</span>}
                  <span className={i === crumbs.length - 1 ? "font-medium text-foreground" : undefined}>{c}</span>
                </span>
              ))}
            </nav>

            <div className="flex-1" />

            {/* Search trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex h-9 w-9 items-center justify-center gap-2 rounded-lg border border-border bg-muted/30 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-64 sm:justify-start sm:px-3"
              aria-label="Open command palette"
            >
              <Search className="size-4 shrink-0" aria-hidden="true" />
              <span className="hidden text-sm sm:block">Search…</span>
              <kbd className="ml-auto hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono-forge text-[10px] sm:flex">
                ⌘K
              </kbd>
            </button>

            <div className="hidden items-center gap-1.5 font-mono-forge text-[11px] text-muted-foreground lg:flex">
              <Layers className="size-3.5" aria-hidden="true" />
              <span suppressHydrationWarning>
                {families.length} families · {productCount} products · {exampleCount} examples
              </span>
            </div>

            <ThemeToggle />
          </header>

          {/* Content */}
          <div className="flex-1">{children}</div>

          <footer className="mt-auto border-t border-border">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2">
                <div className="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Zap className="size-3" aria-hidden="true" />
                </div>
                <span className="font-display text-sm font-bold text-muted-foreground">OMNIFORGE</span>
              </div>
              <p className="font-mono-forge text-[11px] text-muted-foreground/70">
                {productCount} products · {exampleCount} examples · {families.length} design families · 4 plans · 22 modules
              </p>
            </div>
            <div className="border-t border-border/60 px-4 pb-5 pt-3 sm:px-6 lg:px-8">
              <p className="mx-auto max-w-7xl font-mono-forge text-[10px] leading-relaxed text-muted-foreground">
                Prices are illustrative starting hypotheses, not verified market rates. Metrics inside previews are labelled demo data.
              </p>
            </div>
          </footer>
        </div>

        {/* Command palette */}
        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          items={paletteItems}
          onSelect={onSelect}
        />
      </div>
    </MotionConfig>
  );
}

/* Re-export icons used by page for family meta */
export { ArrowRight };
