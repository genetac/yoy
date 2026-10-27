'use client';

import { useState } from 'react';
import { useRevealOnScroll } from '../_lib/interactions';

const HOURS = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tuesday — Thursday', time: '18:00 — 22:30' },
  { day: 'Friday — Saturday', time: '18:00 — 23:30' },
  { day: 'Sunday', time: '17:30 — 22:00' },
];

export default function Visit() {
  useRevealOnScroll();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    party: '2',
    notes: '',
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="visit"
      className="scroll-mt-28 bg-[var(--bg-deep)] px-[var(--gutter)] py-[var(--section-y)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p
            data-reveal
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--oxblood)]"
          >
            Visit
          </p>
          <h2
            data-reveal
            data-reveal-delay={80}
            className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[var(--ink)]"
          >
            Find the door.
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* === LEFT: hours, address, info === */}
          <div data-reveal className="flex flex-col gap-12">
            {/* Hours */}
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink-soft)]">
                Hours
              </p>
              <ul className="border-t border-[var(--ink)]/15">
                {HOURS.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between border-b border-[var(--ink)]/15 py-4"
                  >
                    <span className="text-sm font-light text-[var(--ink)]">
                      {h.day}
                    </span>
                    <span className="font-mono text-xs tracking-[0.1em] text-[var(--oxblood)]">
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink-soft)]">
                Address
              </p>
              <div className="border-y border-[var(--ink)]/15 py-6">
                <p className="font-display text-2xl font-bold uppercase tracking-tight text-[var(--ink)] sm:text-3xl">
                  184 Orchard St
                </p>
                <p className="mt-1 font-light text-[var(--ink-soft)]">
                  New York, NY 10002
                </p>
                <p className="mt-3 font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)]">
                  +1 (212) 555-0119 · hello@nocturne.nyc
                </p>
                <p className="mt-1 font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)]">
                  40.7156° N · 73.9890° W
                </p>
              </div>
            </div>

            {/* Good to know */}
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink-soft)]">
                Good To Know
              </p>
              <ul className="flex flex-col gap-3 border-y border-[var(--ink)]/15 py-6 text-sm font-light text-[var(--ink)]">
                <li className="flex gap-3">
                  <span className="text-[var(--amber)]">·</span>
                  Twelve seats, one seating per night, beginning at 18:00.
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--amber)]">·</span>
                  A small number of counter walk-ins are held nightly, from 18:00.
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--amber)]">·</span>
                  Cancellations within 72 hours forfeit the deposit ($100/guest).
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--amber)]">·</span>
                  Please note any allergies or dietary restrictions in your booking.
                </li>
              </ul>
            </div>
          </div>

          {/* === RIGHT: reservation form === */}
          <div id="reserve" data-reveal className="scroll-mt-32">
            <div className="border border-[var(--ink)]/15 bg-[var(--bg)] p-8 sm:p-10">
              {submitted ? (
                <div className="flex h-full min-h-[28rem] flex-col items-center justify-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--oxblood)] bg-[var(--oxblood)]/5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-[var(--oxblood)]"
                    >
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl font-bold uppercase text-[var(--ink)]">
                    Request received.
                  </h3>
                  <p className="max-w-sm text-sm font-light leading-relaxed text-[var(--ink-soft)]">
                    Thank you, {form.name.split(' ')[0] || 'guest'}. We&apos;ll
                    confirm your reservation by email within the hour. For
                    same-night requests, please call us at +1 (212) 555-0119.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--oxblood)] underline-offset-4 hover:underline"
                  >
                    New reservation
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--oxblood)]">
                      Request A Table
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-bold uppercase text-[var(--ink)] sm:text-4xl">
                      Book your evening
                    </h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Name">
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Your name"
                        className="input-base"
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@example.com"
                        className="input-base"
                      />
                    </Field>
                    <Field label="Date">
                      <input
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) => update('date', e.target.value)}
                        className="input-base"
                      />
                    </Field>
                    <Field label="Party size">
                      <select
                        value={form.party}
                        onChange={(e) => update('party', e.target.value)}
                        className="input-base"
                      >
                        {['1', '2', '3', '4', '5', '6'].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === '1' ? 'guest' : 'guests'}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Allergies / dietary notes">
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      placeholder="Let us know anything we should know"
                      className="input-base resize-none"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center border border-[var(--ink)] bg-[var(--ink)] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--bg)] transition hover:bg-[var(--oxblood)] hover:border-[var(--oxblood)]"
                  >
                    Request Reservation
                  </button>
                  <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                    Deposit of $100/guest due on confirmation
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--ink-soft)]">
        {label}
      </span>
      {children}
    </label>
  );
}
