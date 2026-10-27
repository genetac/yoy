'use client';
/**
 * Telemetry — operations console flagship (ported from the Template OS).
 * v3: the console re-composes per genome switch — centered instrument
 * column, offset chart/alerts, numbered ledger rows, full-bleed dark
 * panel, monitoring mosaic, sheared flow — the material recipe dresses
 * every cell, and the layer inspector annotates the governing layers.
 */
import { useEffect, useRef, useState } from 'react';
import { Activity, Server, AlertTriangle, Gauge, LayoutGrid, Bell, Database, Settings } from 'lucide-react';
import { Label, HeroLayers, VoiceTag, MaterialTag, SealLayers } from '../kit';
import type { TemplateProps } from './types';

const seed = () =>
  Array.from({ length: 40 }, (_, i) => ({
    t: i,
    v: 900 + Math.round(Math.sin(i / 4) * 160 + ((i * 7919) % 120)),
  }));

const NODES = ['api-01', 'api-02', 'api-03', 'edge-fra-07', 'edge-iad-02', 'db-primary', 'db-replica', 'queue-01'];

function AreaChart({ data, stroke, fill }: { data: { t: number; v: number }[]; stroke: string; fill: string }) {
  const W = 640;
  const H = 200;
  const max = Math.max(...data.map((d) => d.v)) * 1.1;
  const min = Math.min(...data.map((d) => d.v)) * 0.9;
  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / (max - min || 1)) * H;
  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.v).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none" role="img" aria-label="live throughput">
      <defs>
        <linearGradient id="g-tele" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={fill} stopOpacity="0.35" />
          <stop offset="1" stopColor={fill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${W},${H} L0,${H} Z`} fill="url(#g-tele)" />
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

export default function TelemetrySite({ world }: TemplateProps) {
  const { copy, tokens: t, picks, hero, archetype } = world;
  const [data, setData] = useState(seed);
  const [rps, setRps] = useState(48210);
  const [clock, setClock] = useState('--:--:--');
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const stream = setInterval(() => {
      if (!mounted.current) return;
      setData((d) => [
        ...d.slice(1),
        { t: d[d.length - 1].t + 1, v: 900 + Math.round(Math.sin(Date.now() / 4000) * 160 + Math.random() * 140) },
      ]);
      setRps((r) => r + Math.round((Math.random() - 0.45) * 400));
    }, 1200);
    const tick = setInterval(() => setClock(new Date().toISOString().slice(11, 19)), 1000);
    return () => {
      mounted.current = false;
      clearInterval(stream);
      clearInterval(tick);
    };
  }, []);

  const sev = { CRIT: '#FF4D4D', WARN: t.accent, INFO: t.muted };
  const alerts = [
    ['CRIT', 'edge-fra-07 packet loss 4.2%', '00:41'],
    ['WARN', `db-primary replication lag 820ms`, '03:12'],
    ['INFO', `deploy ${copy.brand.toLowerCase().replace(/\s+/g, '-')}@4.82.1 rolled to 100%`, '07:55'],
    ['WARN', 'queue:billing depth > 12k', '11:20'],
    ['INFO', 'autoscaler +6 nodes us-east-1c', '14:02'],
  ];
  const kpis: [typeof Activity, string, string, string][] = [
    [Activity, 'Requests / s', rps.toLocaleString(), '+3.1%'],
    [Gauge, 'p99 latency', '184ms', '−12ms'],
    [AlertTriangle, 'Error rate', '0.042%', '+0.004'],
    [Server, 'Active nodes', String(300 + (parseInt(copy.plateNo, 10) % 60)), '+6'],
  ];
  const Cell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`t-card t-pad-sm ${className}`}>{children}</div>
  );

  const picksRec = picks as unknown as Record<string, string>;
  const heroLayers = <HeroLayers world={{ archetype, picks: picksRec }} />;

  /* layout answers the composition switch structurally */
  const chartSpan = hero === 'center' ? 'col-span-2' : hero === 'offset' || hero === 'mosaic' ? 'col-span-2 lg:col-span-2' : 'col-span-2 lg:col-span-3';
  const regionSpan = hero === 'center' ? 'col-span-2' : 'col-span-2 lg:col-span-1';
  const kpiGrid = hero === 'center' ? 'grid-cols-2 max-w-3xl mx-auto' : hero === 'ledger' || hero === 'mosaic' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`flex min-h-[900px] t-mono text-[13px] t-bg ${hero === 'diagonal' ? 'g-shear' : ''}`} data-testid="tpl-telemetry">
      <aside className="w-14 border-r t-line flex flex-col items-center gap-5 py-5 t-surface">
        {[LayoutGrid, Activity, Bell, Database, Settings].map((I, i) => (
          <I key={i} className={`h-4 w-4 ${i === 0 ? 't-primary' : 't-muted'}`} />
        ))}
      </aside>
      <div className="flex-1 min-w-0" style={{ padding: 'calc(var(--t-space) * 1rem)' }}>
        <header className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b t-line ${hero === 'center' ? 'text-center flex-col' : ''}`}>
          <div className={`flex items-center gap-4 ${hero === 'center' ? 'flex-col gap-1' : ''}`}>
            <span className="t-head text-lg font-bold">{copy.brand.toUpperCase()}</span>
            <Label className="t-muted">{copy.familyLabel} / prod</Label>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full t-pulse" style={{ background: t.primary }} />
            <Label className="t-primary">All systems nominal</Label>
          </div>
          <span className="t-muted" data-testid="dash-clock">{clock} UTC</span>
        </header>

        {hero === 'cinema' && (
          <div className="relative mt-4 t-card overflow-hidden" data-testid="dash-hero-cinema">
            {heroLayers}
            <div className="t-pad flex flex-wrap items-end justify-between gap-4" style={{ background: 'linear-gradient(120deg, color-mix(in srgb, var(--t-primary) 16%, transparent), transparent 60%)' }}>
              <div>
                <Label className="t-muted">{copy.eyebrow}</Label>
                <div className="t-head text-3xl font-bold mt-1 tracking-tight">{copy.headline} {copy.headlineAccent}</div>
              </div>
              <span className="t-btn">{copy.cta}</span>
            </div>
          </div>
        )}
        {hero !== 'cinema' && (
          <div className="relative">
            {heroLayers}
          </div>
        )}

        <div className={`grid mt-4 ${kpiGrid}`} style={{ gap: 'calc(var(--t-space) * 0.75rem)' }}>
          {kpis.map(([I, k, v, d]) => (
            <Cell key={k}>
              {k === 'Requests / s' && <MaterialTag world={{ picks: picksRec }} />}
              <div className="flex justify-between t-muted">
                <Label>{k}</Label>
                <I className="h-3.5 w-3.5" />
              </div>
              <div className="text-3xl font-bold mt-3 tabular-nums" data-testid={`dash-kpi-${k.split(' ')[0].toLowerCase()}`}>{v}</div>
              <div className="t-primary text-xs mt-1">{d} vs 1h</div>
            </Cell>
          ))}

          <Cell className={`${chartSpan} h-72`}>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Label className="t-muted">Throughput · live</Label>
                <VoiceTag world={{ picks: picksRec }} />
              </div>
              <Label className="t-primary">● streaming</Label>
            </div>
            <div className="h-[85%] mt-2">
              <AreaChart data={data} stroke={t.primary} fill={t.primary} />
            </div>
          </Cell>
          <Cell className={`${regionSpan} h-72`}>
            <Label className="t-muted">Region load</Label>
            <div className="mt-4 space-y-3">
              {[['IAD', 82], ['FRA', 64], ['SIN', 48], ['GRU', 31], ['SYD', 22]].map(([r, v]) => (
                <div key={r as string}>
                  <div className="flex justify-between t-muted text-[11px]"><span>{r}</span><span>{v}%</span></div>
                  <div className="h-2 t-r-sm mt-1" style={{ background: 'var(--t-line)' }}>
                    <div className="h-full t-r-sm" style={{ width: `${v}%`, background: t.accent }} />
                  </div>
                </div>
              ))}
            </div>
          </Cell>
          <Cell className={hero === 'mosaic' ? 'col-span-2 lg:col-span-1' : 'col-span-2'}>
            <Label className="t-muted">Alert stream</Label>
            <div className="mt-3">
              {alerts.map(([s, m, time]) => (
                <div key={m} className="flex gap-3 py-2 border-t t-line first:border-0" data-testid="dash-alert">
                  <span className="w-12 font-bold" style={{ color: sev[s as keyof typeof sev] }}>{s}</span>
                  <span className="flex-1 truncate">{m}</span>
                  <span className="t-muted">{time}</span>
                </div>
              ))}
            </div>
          </Cell>
          <Cell className={hero === 'mosaic' ? 'col-span-2 lg:col-span-1' : 'col-span-2'}>
            <Label className="t-muted">Nodes</Label>
            <div className="grid grid-cols-2 mt-3" style={{ gap: 'calc(var(--t-space) * 0.5rem)' }}>
              {NODES.map((n, i) => (
                <div key={n} className="flex items-center justify-between border t-line t-r-sm px-2 py-1.5">
                  <span>{n}</span>
                  <span className="flex items-center gap-1.5 t-muted">
                    {30 + ((i * 17) % 60)}%
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: n === 'edge-fra-07' ? '#FF4D4D' : t.primary }} />
                  </span>
                </div>
              ))}
            </div>
          </Cell>
        </div>

        <footer className="relative mt-6 pt-4 border-t t-line flex flex-wrap justify-between gap-2 t-muted">
          <SealLayers world={{ picks: picksRec, tokens: { bg: t.bg, ink: t.ink } }} />
          <Label>{copy.offerId} · plate No. {copy.plateNo} · {copy.stats[2].value} files in the kit</Label>
          <Label>{copy.stats[3].value} real content — labeled demo data where not</Label>
        </footer>
      </div>
    </div>
  );
}
