'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useRevealOnScroll — adds `.reveal-in` to any element with `data-reveal`
 * once it scrolls into view. Used for soft fade-ins throughout the page.
 *
 * The optional `data-reveal-delay` attribute (in ms) staggers the animation
 * for siblings inside the same parent — this is how the line-by-line
 * reveal of big display text is achieved.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('reveal-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.getAttribute('data-reveal-delay');
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add('reveal-in');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/**
 * Tracks whether the page has been scrolled at least `threshold` pixels.
 */
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/**
 * Returns the current time in HH:MM:SS, updating every second.
 * Used by the live data chip in the navbar to give the "alive" feel.
 */
export function useLiveClock(timeZone = 'America/New_York') {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone,
          }).format(new Date()),
        );
      } catch {
        setTime(
          new Date().toLocaleTimeString('en-US', { hour12: false }),
        );
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

/**
 * Computes the open/closed status of the restaurant based on current
 * time in the given timezone. NOCTURNE is open Tue–Sun, 18:00–23:00.
 */
export function useOpenStatus(timeZone = 'America/New_York') {
  const [status, setStatus] = useState<{
    state: 'open' | 'closed' | 'opening';
    label: string;
  }>({ state: 'closed', label: 'CLOSED' });

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date();
        const fmt = new Intl.DateTimeFormat('en-US', {
          timeZone,
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        const parts = fmt.formatToParts(now);
        const weekday = parts.find((p) => p.type === 'weekday')?.value || '';
        const hour = parseInt(
          parts.find((p) => p.type === 'hour')?.value || '0',
          10,
        );
        const minute = parseInt(
          parts.find((p) => p.type === 'minute')?.value || '0',
          10,
        );
        const hm = hour * 60 + minute;

        const closedDay = weekday === 'Mon';
        const openHours = hm >= 18 * 60 && hm < 23 * 60;
        const openingSoon =
          hm >= 17 * 60 && hm < 18 * 60 && weekday !== 'Mon';

        if (closedDay) {
          setStatus({ state: 'closed', label: 'CLOSED TONIGHT' });
        } else if (openHours) {
          setStatus({ state: 'open', label: 'OPEN NOW' });
        } else if (openingSoon) {
          setStatus({ state: 'opening', label: 'OPENING AT 18:00' });
        } else if (hm < 18 * 60) {
          setStatus({ state: 'closed', label: 'CLOSED · OPENS 18:00' });
        } else {
          setStatus({ state: 'closed', label: 'CLOSED' });
        }
      } catch {
        setStatus({ state: 'closed', label: 'CLOSED' });
      }
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return status;
}
