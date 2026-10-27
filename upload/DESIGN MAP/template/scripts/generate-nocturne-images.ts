import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

// NOCTURNE — a 12-seat fire-forward tasting counter on the LES, NYC.
// Warm trattoria palette: cream paper, oxblood, amber, charred-black.
// Every image shares a style anchor so the gallery reads as one body of work.

const STYLE =
  'editorial food photography, warm candle and ember light, shallow depth of field, ' +
  'photorealistic, 50mm lens, film grain, Kodak Portra 400 color science, ' +
  'muted cream and oxblood palette with amber highlights, smoky atmosphere, ' +
  'high-end restaurant monograph aesthetic, no text, no watermark';

const IMAGES: { name: string; prompt: string }[] = [
  // ===== 1. HERO — the cinematic opener =====
  {
    name: 'hero',
    prompt:
      'Wide cinematic still: a 12-seat dark walnut chef counter at night, ' +
      'a single open wood-fire grill glowing at the far end, embers visible, ' +
      'a chef silhouette mid-plating, three small ceramic dishes on the counter, ' +
      'a glass of red wine, smoke drifting through warm amber light, ' +
      'dark moody atmospheric, low-key lighting, intimate fine-dining',
  },

  // ===== 2-5. DISH IMAGES for gallery + expandable card headers =====
  {
    name: 'dish_snacks',
    prompt:
      'Top-down close-up of a single bite-sized amuse-bouche on a small black ceramic plate: ' +
      'a raw oyster with smoked mignonette and charred leek ash, ' +
      'a touch of amber oil, on a cream linen surface, warm directional light',
  },
  {
    name: 'dish_cold',
    prompt:
      'A delicate cold course on a pale cream ceramic plate: ' +
      'thinly sliced raw hamachi with finger lime caviar, ' +
      'drops of green herb oil, edible flower petals, ' +
      'soft natural side light, dark background, shallow depth of field',
  },
  {
    name: 'dish_fire',
    prompt:
      'A wood-fired main course on a rustic dark ceramic plate: ' +
      'a single dry-aged duck breast, charred and glistening, ' +
      'sliced and fanned over a smear of black garlic puree, ' +
      'a single ember-roasted fig on the side, ' +
      'smoke wisps rising, warm firelight, intimate fine-dining',
  },
  {
    name: 'dish_sweet',
    prompt:
      'A plated dessert on a cream ceramic plate: ' +
      'a quenelle of brown-butter ice cream next to a smoked-honey tuile, ' +
      'a drizzle of dark caramel, a few drops of crème fraîche, ' +
      'a single charred fig half, warm amber light, dark wood table',
  },

  // ===== 6-9. REEL FRAMES — looping dish-prep stills for footer =====
  {
    name: 'reel_1',
    prompt:
      "Close-up of a chef's hands using tweezers to place a micro-herb on a delicate plated dish, " +
      'warm tungsten light, blurred kitchen background with ember glow, ' +
      'film grain, intimate moment, no face visible',
  },
  {
    name: 'reel_2',
    prompt:
      'A cast iron pan over open wood fire, flames licking up around a piece of dry-aged meat, ' +
      'sparks and embers rising, dark moody kitchen, dramatic orange and amber glow, ' +
      'slow-shutter motion, atmospheric',
  },
  {
    name: 'reel_3',
    prompt:
      'Slow-pour of red wine from a decanter into a thin-stemmed burgundy glass, ' +
      'warm backlight catching the wine as a red arc, dark bar top, ' +
      'bokeh of candles in the background, cinematic, intimate',
  },
  {
    name: 'reel_4',
    prompt:
      "A chef's hand resting a sharp Japanese knife on a cutting board, " +
      'thinly sliced raw fish arranged in a row beside, ' +
      'overhead shot, warm directional light, dark walnut wood surface, ' +
      'film grain, fine-dining preparation',
  },
];

const OUT_DIR = '/home/z/my-project/public/nocturne';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function generateOne(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  name: string,
  prompt: string,
  maxAttempts = 4,
): Promise<{ name: string; ok: boolean; err?: string }> {
  const outPath = path.join(OUT_DIR, `${name}.jpg`);
  // Idempotent skip
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 50_000) {
    console.log(`✓ ${name}.jpg already exists, skipping`);
    return { name, ok: true };
  }
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await zai.images.generations.create({
        prompt: `${STYLE}. ${prompt}`,
        size: '1344x768',
      });
      const b64 = response?.data?.[0]?.base64;
      if (!b64) throw new Error('No image data returned');
      fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
      console.log(`✓ ${name}.jpg generated`);
      return { name, ok: true };
    } catch (err: any) {
      const msg = err?.message || String(err);
      console.error(`✗ ${name}.jpg attempt ${attempt} failed: ${msg}`);
      if (attempt < maxAttempts) {
        const wait = 8000 * attempt;
        console.log(`  ↻ retry in ${wait / 1000}s`);
        await sleep(wait);
      } else {
        return { name, ok: false, err: msg };
      }
    }
  }
  return { name, ok: false, err: 'unreachable' };
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const zai = await ZAI.create();

  const results: { name: string; ok: boolean; err?: string }[] = [];
  for (let i = 0; i < IMAGES.length; i++) {
    const img = IMAGES[i];
    console.log(`\n[${i + 1}/${IMAGES.length}] ${img.name}`);
    const r = await generateOne(zai, img.name, img.prompt);
    results.push(r);
    if (i < IMAGES.length - 1) await sleep(2500);
  }

  const ok = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);
  console.log(`\n=== Done: ${ok}/${results.length} succeeded ===`);
  if (failed.length) {
    console.log('Failed:', failed.map((f) => f.name).join(', '));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
