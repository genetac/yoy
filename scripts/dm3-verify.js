/**
 * dm3 verify — DOM-level assertions for the six showcase rooms.
 * Usage: agent-browser eval "$(cat scripts/dm3-verify.js)"
 */
(() => {
  const out = [];
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const cs = (el, pseudo) => getComputedStyle(el, pseudo);
  const room = (id) => q(`[data-room="${id}"]`);

  const R = {
    obsidian: room('obsidian'), nocturne: room('nocturne'), midhigh: room('midhigh'),
    agencyos: room('agencyos'), templateos: room('templateos'), studioos: room('studioos'),
  };
  const present = Object.entries(R).map(([k, v]) => `${k}:${!!v}`).join(' ');
  out.push(`rooms present → ${present}`);

  // OB vault
  if (R.obsidian) {
    out.push(`OB slab=${!!q('.of-rb-slab', R.obsidian)} cones=${qa('.of-rb-cone', R.obsidian).length} motes=${qa('.of-rb-mote', R.obsidian).length}`);
    out.push(`OB title font=${cs(q('.of-rb-title', R.obsidian)).fontFamily.split(',')[0]} size=${cs(q('.of-rb-title', R.obsidian)).fontSize}`);
    out.push(`OB bg=${cs(R.obsidian).backgroundColor}`);
  }
  // NC manor
  if (R.nocturne) {
    const letters = qa('.of-nc-letter', R.nocturne);
    out.push(`NC candles=${qa('.of-rr-candle', R.nocturne).length} flames=${qa('.of-rr-flame', R.nocturne).length} letters=${letters.length} word=${letters.map(l => l.textContent).join('')}`);
    out.push(`NC anim(first flame)=${cs(q('.of-rr-flame', R.nocturne)).animationName} title font=${cs(q('.of-rr-title', R.nocturne)).fontFamily.split(',')[0]}`);
  }
  // MH atelier
  if (R.midhigh) {
    const frames = qa('.of-rt-frame', R.midhigh);
    out.push(`MH frames=${frames.length} loaded=${frames.filter(f => (f.style.backgroundImage || '').includes('pexels')).length}`);
    out.push(`MH title transform=${cs(q('.of-rt-title', R.midhigh)).textTransform} font=${cs(q('.of-rt-title', R.midhigh)).fontFamily.split(',')[0]}`);
  }
  // AO blueprint
  if (R.agencyos) {
    const ls = qa('.of-ra-l', R.agencyos);
    out.push(`AO letters=${ls.length} word=${ls.map(l => l.textContent).join('')} shadow=${cs(ls[0]).textShadow.split(')')[0].slice(0, 24)}…`);
    out.push(`AO floor rotateX=${cs(q('.of-ra-floor', R.agencyos)).transform.slice(0, 24)}… dims=${qa('.of-ra-dim', R.agencyos).length} cursor=${!!q('.of-ra-cursor', R.agencyos)}`);
    out.push(`AO title anim(first)=${cs(ls[0]).animationName}`);
  }
  // TO warehouse
  if (R.templateos) {
    const blocks = qa('.of-rw-block', R.templateos);
    out.push(`TO blocks=${blocks.length} word=${blocks.map(b => b.textContent).join('')} font=${cs(blocks[0]).fontFamily.split(',')[0]}`);
    out.push(`TO belt anim=${cs(q('.of-rw-conveyor', R.templateos), '::before').animationName} shelves=${qa('.of-rw-shelf', R.templateos).length} chips=${qa('.of-rw-chip', R.templateos).length}`);
  }
  // SO film studio
  if (R.studioos) {
    out.push(`SO films=${qa('.of-rs-film', R.studioos).length} beams=${qa('.of-rs-beam', R.studioos).length} rings=${qa('.of-rs-ring', R.studioos).length} scan=${R.studioos.classList.contains('of-scan')}`);
    const t = q('.of-rs-title', R.studioos);
    const tcs = cs(t);
    out.push(`SO title clip=${tcs.backgroundClip || tcs.webkitBackgroundClip} color=${tcs.color} anim=${tcs.animationName} slate=${!!q('.of-rs-slate', R.studioos)}`);
  }
  // band wiring
  const wear = qa('button').filter(b => b.textContent.trim() === 'Wear it').length;
  const step = qa('a').filter(a => a.textContent.trim() === 'Step inside').length;
  out.push(`band: wearButtons=${wear} stepInsideLinks=${step}`);
  const stepHref = qa('a').filter(a => a.textContent.trim() === 'Step inside').map(a => a.getAttribute('href'))[0];
  out.push(`band: stepInHref=${stepHref}`);
  return out.join('\n');
})()
