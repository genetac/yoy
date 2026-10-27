import type { OfferV2, FamilyId } from './types';
import { TP_1, TP_2 } from './catalog/hero/TP-1';
import { TP_3, TP_4 } from './catalog/hero/TP-3';
import { TK_1, TK_2, TK_3, TK_4 } from './catalog/hero/TK-1';
import { NS_1, NS_2, NS_3, NS_4 } from './catalog/hero/NS-1';
import { AS_1, AS_2, AS_3, AS_4 } from './catalog/hero/AS-1';
import { WK_1, WK_2, WK_3, WK_4 } from './catalog/hero/WK-1';

/**
 * The 24 hand-authored hero offers (P0).
 * Hero first, banks second — deriveOffer() looks up this map before
 * falling back to keyword-bank derivation for non-hero examples.
 */
export const HERO_OFFERS: Record<string, OfferV2> = {
  'B-TP-1': TP_1, 'B-TP-2': TP_2, 'B-TP-3': TP_3, 'B-TP-4': TP_4,
  'B-TK-1': TK_1, 'B-TK-2': TK_2, 'B-TK-3': TK_3, 'B-TK-4': TK_4,
  'B-NS-1': NS_1, 'B-NS-2': NS_2, 'B-NS-3': NS_3, 'B-NS-4': NS_4,
  'B-AS-1': AS_1, 'B-AS-2': AS_2, 'B-AS-3': AS_3, 'B-AS-4': AS_4,
  'B-WK-1': WK_1, 'B-WK-2': WK_2, 'B-WK-3': WK_3, 'B-WK-4': WK_4,
};

export function getOffer(offerId: string): OfferV2 | undefined {
  return HERO_OFFERS[offerId];
}

export function getOffersByFamily(family: FamilyId): OfferV2[] {
  return Object.values(HERO_OFFERS).filter((o) => o.family === family);
}

export function getAllOffers(): OfferV2[] {
  return Object.values(HERO_OFFERS);
}
