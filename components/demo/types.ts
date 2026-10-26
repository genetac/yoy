export type DemoOffer = { offerId: string; title: string; price: number | null };
export type DemoProps = { offer: DemoOffer; onComplete?: (result: unknown) => void };
