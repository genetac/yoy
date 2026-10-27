import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

// Shared style anchor for visual consistency across all 24 frames.
// Every prompt starts with this so the model produces a coherent sequence.
const STYLE =
  'First-person POV shot, cinematic 35mm photography, shallow depth of field, ' +
  'warm golden hour interior lighting mixed with warm tungsten glow, photorealistic, ' +
  'film grain, anamorphic lens flare, ultra detailed, 8k, color graded warm amber tones';

// Each entry describes ONE frame in the cinematic progression:
// outside → approaching door → door opening → stepping in → fully inside → seated
const FRAMES: { idx: number; prompt: string }[] = [
  // Phase 1: Outside — establishing the restaurant (frames 1-4)
  {
    idx: 1,
    prompt:
      'Standing at the far end of a narrow cobblestone alley in the evening dusk, ' +
      'view of an elegant Italian trattoria named "La Bella Cucina" with warm golden light glowing from windows, ' +
      'dark green awning, brick facade, hanging lantern, distant streetlights, no people visible',
  },
  {
    idx: 2,
    prompt:
      'Walking closer along a cobblestone street toward an elegant Italian trattoria "La Bella Cucina", ' +
      'warm glow from windows, dark green awning, brick facade, evening sky, chalkboard menu by the entrance',
  },
  {
    idx: 3,
    prompt:
      'Standing directly in front of the entrance door of an Italian trattoria "La Bella Cucina", ' +
      'a hand reaching toward an ornate brass door handle, warm glow from the etched glass panel, ' +
      'brick wall, hanging lantern overhead',
  },
  {
    idx: 4,
    prompt:
      'Pushing open the heavy dark wooden door of an Italian trattoria, warm golden light spilling out from inside, ' +
      'first glimpse of an intimate dining room through the opening, etched glass panel, brass handle',
  },
  // Phase 2: Crossing the threshold (frames 5-8)
  {
    idx: 5,
    prompt:
      'Stepping through the doorway of an Italian trattoria, threshold view, ' +
      'a small host stand with a leather-bound reservation book, warm dining room unfolding ahead, ' +
      'exposed brick wall, hanging Edison bulbs',
  },
  {
    idx: 6,
    prompt:
      'Just inside the entrance of an intimate Italian trattoria, view forward into the dining room, ' +
      'white tablecloth tables with lit candles, bottles of wine on a wall shelf, exposed brick, ' +
      'warm Edison bulb lighting',
  },
  {
    idx: 7,
    prompt:
      'Moving deeper into an Italian trattoria dining room, view of intimate tables with candles, ' +
      'patrons blurred in background, hanging Edison bulbs, vintage Italian posters on exposed brick walls',
  },
  {
    idx: 8,
    prompt:
      'Approaching the wooden bar of an Italian trattoria, shelves of wine bottles backlit with warm amber light, ' +
      'a bartender blurred in the background polishing a wine glass, bar top with brass details',
  },
  // Phase 3: Settling into the experience (frames 9-12)
  {
    idx: 9,
    prompt:
      'Approaching a candle-lit table for two in an Italian trattoria, a server in a white apron ' +
      'pulling out a chair, two wine glasses on the white tablecloth, small vase of flowers, soft warm light',
  },
  {
    idx: 10,
    prompt:
      'Seated at a candle-lit table in an Italian trattoria, a server setting down a plate of fresh handmade pasta, ' +
      'steam rising, white tablecloth, wine glass, warm ambient light',
  },
  {
    idx: 11,
    prompt:
      'Close-up at a candle-lit table in an Italian trattoria, a fork twirling fresh tagliatelle pasta, ' +
      'glass of red wine beside the plate, candle flame, soft warm bokeh of dining room',
  },
  {
    idx: 12,
    prompt:
      'Wide cinematic view from a candle-lit table across an Italian trattoria dining room, ' +
      'soft warm light, patrons at tables, hanging Edison bulbs, exposed brick, bottles of wine, ' +
      'a sense of timeless evening ambiance',
  },
];

const OUT_DIR = '/home/z/my-project/public/frames';

async function generateOne(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  idx: number,
  prompt: string,
): Promise<{ idx: number; ok: boolean; err?: string }> {
  const filename = `frame_${String(idx).padStart(3, '0')}.png`;
  const outPath = path.join(OUT_DIR, filename);
  // Skip if already generated (idempotent re-runs)
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 50_000) {
    console.log(`✓ ${filename} already exists, skipping`);
    return { idx, ok: true };
  }
  try {
    const response = await zai.images.generations.create({
      prompt: `${STYLE}. ${prompt}`,
      size: '1344x768',
    });
    const base64 = response?.data?.[0]?.base64;
    if (!base64) throw new Error('No image data returned');
    fs.writeFileSync(outPath, Buffer.from(base64, 'base64'));
    console.log(`✓ ${filename} generated`);
    return { idx, ok: true };
  } catch (err: any) {
    console.error(`✗ ${filename} failed: ${err?.message || err}`);
    return { idx, ok: false, err: err?.message };
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function generateOneWithRetry(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  idx: number,
  prompt: string,
  maxAttempts = 4,
): Promise<{ idx: number; ok: boolean; err?: string }> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const r = await generateOne(zai, idx, prompt);
    if (r.ok) return r;
    // 429 — wait progressively longer then retry
    const wait = 8000 * attempt;
    console.log(`  ↻ retry in ${wait / 1000}s (attempt ${attempt}/${maxAttempts})`);
    await sleep(wait);
  }
  return { idx, ok: false, err: 'max retries exceeded' };
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const zai = await ZAI.create();

  // Sequential with 2s gap between calls to respect rate limits.
  const results: { idx: number; ok: boolean; err?: string }[] = [];
  for (let i = 0; i < FRAMES.length; i++) {
    const f = FRAMES[i];
    console.log(`\n[${i + 1}/${FRAMES.length}] frame ${f.idx}`);
    const r = await generateOneWithRetry(zai, f.idx, f.prompt);
    results.push(r);
    if (i < FRAMES.length - 1) await sleep(2000);
  }

  const ok = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);
  console.log(`\n=== Done: ${ok}/${results.length} succeeded ===`);
  if (failed.length) {
    console.log('Failed frames:', failed.map((f) => f.idx).join(', '));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
