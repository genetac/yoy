'use client';

/**
 * Marquee — an infinite horizontal scroll of mono-caps text. Used as a
 * section divider (exactly like Mantis's "EXPERIENTIAL · BRANDING · DIGITAL"
 * band). Each item can optionally be separated by a small ornamental glyph.
 *
 * The track contains two copies of the same content; when the animation
 * has scrolled one copy's worth (50% of the track), it loops seamlessly.
 */
export default function Marquee({
  items,
  variant = 'default',
  speed = 'normal',
}: {
  items: string[];
  variant?: 'default' | 'dark' | 'outline';
  speed?: 'normal' | 'fast' | 'reverse';
}) {
  const trackClass = [
    'marquee-track',
    speed === 'fast' ? 'marquee-track--fast' : '',
    speed === 'reverse' ? 'marquee-track--reverse' : '',
  ].join(' ');

  const containerClass =
    variant === 'dark'
      ? 'bg-[var(--bg-dark)] text-[var(--ink-on-dark)] border-y border-[var(--ink-on-dark)]/10'
      : variant === 'outline'
        ? 'bg-[var(--bg)] text-[var(--ink)] border-y border-[var(--ink)]/15'
        : 'bg-[var(--ink)] text-[var(--bg)]';

  return (
    <div
      className={`relative overflow-hidden py-5 ${containerClass}`}
      aria-hidden="true"
    >
      <div className={trackClass}>
        {/* Two identical halves so the loop is seamless */}
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="px-6 text-sm font-medium uppercase tracking-[0.25em] sm:text-base sm:tracking-[0.3em]">
                  {item}
                </span>
                <span className="text-[var(--amber)]">■</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
