import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  console.log('Creating ZAI client...');
  const zai = await ZAI.create();
  console.log('Client created. Generating image...');
  const start = Date.now();
  try {
    const response = await zai.images.generations.create({
      prompt: 'First-person POV shot, cinematic 35mm photography, warm golden hour lighting, photorealistic, an elegant Italian trattoria on a cobblestone street at dusk, warm window light, dark green awning, brick facade',
      size: '1344x768',
    });
    console.log(`Response received in ${Date.now() - start}ms`);
    const b64 = response?.data?.[0]?.base64;
    if (!b64) {
      console.log('No base64 in response:', JSON.stringify(response).slice(0, 500));
      return;
    }
    fs.writeFileSync('/home/z/my-project/public/frames/test.png', Buffer.from(b64, 'base64'));
    console.log(`Saved test.png (${Buffer.from(b64, 'base64').length} bytes)`);
  } catch (e: any) {
    console.error('Error:', e?.message || e);
    console.error('Stack:', e?.stack);
  }
}
main();
