'use client';
/**
 * OMNIFORGE · SiteDemo — booking flow demo for Website Kits (Elite Plan P3)
 * A real booking form: validation, submit, confirmation state. No network.
 */
import { useState } from 'react';
import { CalendarCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import type { DemoProps } from '@/components/demo/types';

export function SiteDemo({ offer, onComplete }: DemoProps) {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [form, setForm] = useState({ name: '', email: '', day: '', time: '09:00', service: 'First visit' });
  const [errors, setErrors] = useState<string[]>([]);

  const submit = () => {
    const errs: string[] = [];
    if (!form.name.trim()) errs.push('name');
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(form.email)) errs.push('a valid email');
    if (!form.day) errs.push('preferred day');
    setErrors(errs);
    if (!errs.length) { setStep('confirmed'); onComplete?.({ service: form.service, day: form.day }); }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="mx-auto max-w-md">
      <span className="of-chip absolute right-3 top-3">Sample</span>
      {step === 'form' ? (
        <div className="of-plate p-5">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-brass-500" />
            <h3 className="font-display text-lg font-semibold">Book a visit</h3>
          </div>
          <p className="mt-1 text-[11.5px] text-zinc-500 dark:text-zinc-400">
            The exact booking flow shipped in {offer.title} — validation included.
          </p>

          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Name</span>
              <input value={form.name} onChange={set('name')} autoComplete="name"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Email</span>
              <input value={form.email} onChange={set('email')} type="email" autoComplete="email"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Day</span>
                <input type="date" value={form.day} onChange={set('day')}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
              </label>
              <label className="block">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Time</span>
                <select value={form.time} onChange={set('time')}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                  {['09:00', '11:30', '14:00', '16:30'].map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Service</span>
              <select value={form.service} onChange={set('service')}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                {['First visit', 'Consultation', 'Follow-up'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>

            {errors.length > 0 && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-[11px] font-medium text-red-600 dark:text-red-400">
                Please add: {errors.join(', ')}.
              </p>
            )}

            <button onClick={submit} className="of-btn w-full">Request booking</button>
            <p className="text-center text-[10px] text-zinc-400">Demo validates locally — the kit wires your real endpoint.</p>
          </div>
        </div>
      ) : (
        <div className="of-plate of-slide-up p-6 text-center">
          <CheckCircle2 className="of-seal mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          <h3 className="mt-3 font-display text-lg font-semibold">Requested</h3>
          <p className="mt-1 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Confirmation for <strong>{form.service}</strong> on <strong>{form.day}</strong> at <strong>{form.time}</strong>
            {' '}would reach {form.email || 'your inbox'} within minutes.
          </p>
          <div className="of-tear mx-4 my-4" />
          <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
            Get the full kit — {offer.title}
            {offer.price !== null && <span className="of-foil-text ml-1 font-display text-base font-bold">${offer.price}</span>}
          </p>
          <div className="mt-3 flex justify-center gap-2">
            <button onClick={() => { setStep('form'); setErrors([]); }} className="of-btn-ghost text-[11px]">
              <ArrowLeft className="h-3.5 w-3.5" /> Reset
            </button>
            <button className="of-btn text-[11px]">Get the full kit</button>
          </div>
        </div>
      )}
    </div>
  );
}
