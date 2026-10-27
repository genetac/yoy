'use client';
/**
 * OMNIFORGE · StyleSwitcher — the design-matrix control.
 * One press re-skins the entire dashboard (identical copy & structure,
 * different engine). Two shapes:
 *   chips — compact horizontal chip row (dashboard header)
 *   rail  — labelled vertical list (PresentationStudio)
 */
import { Palette } from 'lucide-react';
import { DESIGN_STYLES, STYLE_ORDER, setStyle, useStyle } from '@/lib/style-registry';

export function StyleSwitcher({ variant = 'chips' }: { variant?: 'chips' | 'rail' }) {
  const active = useStyle();

  if (variant === 'rail') {
    return (
      <div role="radiogroup" aria-label="Design engine" className="space-y-1.5">
        <div className="mb-1 flex items-center gap-1.5 font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] text-zinc-400">
          <Palette className="h-2.5 w-2.5 text-brass-500" /> Design engine
        </div>
        {STYLE_ORDER.map((id) => {
          const s = DESIGN_STYLES[id];
          const on = id === active;
          return (
            <button
              key={id}
              role="radio"
              aria-checked={on}
              onClick={() => setStyle(id)}
              title={`${s.label} — ${s.fonts}`}
              className={`flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-all duration-150 ${
                on
                  ? 'border-brass-500/60 bg-brass-500/10'
                  : 'border-zinc-500/15 bg-transparent hover:border-brass-500/40'
              }`}
            >
              <span
                aria-hidden
                className="h-4 w-4 shrink-0 rounded-full border border-white/20 shadow-inner"
                style={{ background: `linear-gradient(135deg, ${s.swatch.bg} 0%, ${s.swatch.bg} 55%, ${s.swatch.accent} 100%)` }}
              />
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-[11.5px] font-semibold leading-tight ${on ? 'text-brass-600 dark:text-brass-300' : ''}`}>
                  {s.label}
                </span>
                <span className="block truncate font-mono text-[8.5px] text-zinc-400">{s.fonts}</span>
              </span>
              <span className={`shrink-0 rounded px-1 py-0.5 font-mono text-[8px] font-bold ${on ? 'bg-brass-500/20 text-brass-600 dark:text-brass-300' : 'bg-zinc-500/10 text-zinc-400'}`}>
                {s.short}
              </span>
            </button>
          );
        })}
        <p className="pt-0.5 font-mono text-[8.5px] leading-relaxed text-zinc-400">
          Same offer, same files, same price — five engines.
        </p>
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-label="Design engine" className="flex items-center gap-1">
      <Palette className="mr-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden />
      {STYLE_ORDER.map((id) => {
        const s = DESIGN_STYLES[id];
        const on = id === active;
        return (
          <button
            key={id}
            role="radio"
            aria-checked={on}
            onClick={() => setStyle(id)}
            title={`${s.label} — ${s.tagline}`}
            className={`group flex shrink-0 items-center gap-1.5 rounded-lg border px-2 py-1.5 transition-all duration-150 ${
              on ? 'border-brass-500/60 bg-brass-500/15' : 'border-zinc-500/20 bg-[var(--of-plate-bg-2)] hover:border-brass-500/40'
            }`}
          >
            <span
              aria-hidden
              className="h-3 w-3 shrink-0 rounded-full border border-white/25"
              style={{ background: `linear-gradient(135deg, ${s.swatch.bg} 0%, ${s.swatch.bg} 55%, ${s.swatch.accent} 100%)` }}
            />
            <span className={`font-mono text-[9.5px] font-bold tracking-wide ${on ? 'text-brass-600 dark:text-brass-300' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
              {s.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}
