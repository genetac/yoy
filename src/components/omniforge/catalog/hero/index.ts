/* ════════════════════════════════════════════════════════════════════
   Hero kit registry — the 20 hand-authored kits, looked up before any
   bank fallback runs. See catalog/hero/*.ts for the trees.
   ════════════════════════════════════════════════════════════════════ */

import type { HeroDef } from "./shared";
import { TEMPLATE_PACK_HEROES } from "./tp";
import { TOOLKIT_HEROES } from "./tk";
import { NOTION_HEROES } from "./ns";
import { ASSESSMENT_HEROES } from "./as";
import { WEBSITE_KIT_HEROES } from "./wk";

export const HEROES: HeroDef[] = [
  ...TEMPLATE_PACK_HEROES,
  ...TOOLKIT_HEROES,
  ...NOTION_HEROES,
  ...ASSESSMENT_HEROES,
  ...WEBSITE_KIT_HEROES,
];

export type { HeroDef } from "./shared";
