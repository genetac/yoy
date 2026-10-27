'use client';

import { useLiveClock, useOpenStatus, useScrolled } from '../_lib/interactions';

/**
 * Top chrome — restructured layout per spec:
 *
 *   ┌──────────────────────────────────────────────────────┐
 *   │  NOCTURNE  [RESERVE]              MENU  CHEF  PRESS  VISIT  │
 *   │  ● OPEN NOW · 17:42:30 EST · 4 SEATS LEFT            │
 *   └──────────────────────────────────────────────────────┘
 *
 * Row 1 (the header itself):
 *   • LEFT: NOCTURNE wordmark + RESERVE button next to it
 *   • RIGHT: nav links (MENU / CHEF / PRESS / VISIT)
 *
 * Row 2 (status chip, directly below the header on the left):
 *   • Pulsing status dot + OPEN NOW label
 *   • Live NYC clock
 *   • Seats-left count
 *
 * Two visual modes:
 *   • Over the hero (not scrolled): transparent background, cream/amber text
 *   • Scrolled: solid cream background, dark text
 *
 * Both rows share the same horizontal gutter so everything aligns
 * vertically along the left edge.
 */
export default function Navbar() {
  const scrolled = useScrolled(60);
  const time = useLiveClock('America/New_York');
  const status = useOpenStatus('America/New_York');

  const seatsLeft = 4;

  const statusColor =
    status.state === 'open'
      ? 'var(--ember)'
      : status.state === 'opening'
        ? 'var(--amber)'
        : scrolled
          ? 'rgba(42, 20, 16, 0.35)'
          : 'rgba(245, 236, 217, 0.4)';

  const links = [
    { href: '#menu', label: 'MENU' },
    { href: '#chef', label: 'CHEF' },
    { href: '#press', label: 'PRESS' },
    { href: '#visit', label: 'VISIT' },
  ];

  // Color tokens that swap based on mode.
  const text = scrolled ? 'var(--ink)' : 'var(--ink-on-dark)';
  const textSoft = scrolled
    ? 'var(--ink-soft)'
    : 'rgba(245, 236, 217, 0.75)';
  const textDim = scrolled
    ? 'rgba(42, 20, 16, 0.3)'
    : 'rgba(245, 236, 217, 0.35)';
  const borderColor = scrolled
    ? 'var(--ink)'
    : 'rgba(245, 236, 217, 0.7)';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg)] border-b-2 border-[var(--ink)]/20 shadow-[0_4px_20px_-4px_rgba(42,20,16,0.12)]'
          : 'bg-transparent'
      }`}
      style={{
        backgroundImage: scrolled
          ? 'none'
          : 'linear-gradient(to bottom, rgba(13,7,5,0.55) 0%, rgba(13,7,5,0.25) 60%, rgba(13,7,5,0) 100%)',
      }}
    >
      {/* === ROW 1: wordmark + reserve (left) | nav links (right) === */}
      <div
        className={`flex items-center justify-between px-[var(--gutter)] transition-all duration-500 ${
          scrolled ? 'py-5' : 'py-4'
        }`}
      >
        {/* LEFT cluster: NOCTURNE wordmark + RESERVE button */}
        <div className="flex items-center gap-6">
          <a
            href="#top"
            className="font-display text-lg font-extrabold tracking-[0.18em] transition-colors duration-500 hover:opacity-75 sm:text-xl"
            style={{ color: text }}
          >
            NOCTURNE
          </a>
          <a
            href="#reserve"
            className="rounded-none border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:bg-current"
            style={{
              color: text,
              borderColor,
            }}
          >
            <span className="mix-blend-normal">RESERVE</span>
          </a>
        </div>

        {/* RIGHT cluster: nav links */}
        <nav className="flex items-center gap-6 text-[10px] font-medium uppercase tracking-[0.2em]">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="transition-colors duration-500 hover:opacity-70"
                  style={{ color: textSoft }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* === ROW 2: status chip (left-aligned, directly below row 1) === */}
      <div
        className={`flex items-center gap-3 px-[var(--gutter)] pb-3 text-[10px] font-medium uppercase tracking-[0.15em] transition-all duration-500 ${
          scrolled ? 'opacity-90' : 'opacity-75'
        }`}
        style={{ color: textSoft }}
      >
        <span className="flex items-center gap-2">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${status.state === 'open' ? 'status-dot--live' : ''}`}
            style={{ background: statusColor }}
          />
          {status.label}
        </span>
        <span style={{ color: textDim }}>·</span>
        <span className="tabular-nums">{time} EST</span>
        <span style={{ color: textDim }}>·</span>
        <span>{seatsLeft} SEATS LEFT</span>
      </div>
    </header>
  );
}
