import type { Transition, Variants } from "motion/react";

/**
 * OMNIFORGE motion system — single source of truth.
 * Durations/easings per GUIDE §6.3. Components pick a named behavior
 * instead of inventing unrelated values everywhere.
 */
export const motionTokens = {
  instant: 0.08,
  micro: 0.14,
  ui: 0.2,
  layout: 0.28,
  modal: 0.24,
  sequence: 0.48,
  stagger: 0.04,
} as const;

export const forgeEase: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Small entrance: cards, list items. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.layout, ease: forgeEase },
  },
  exit: { opacity: 0, y: -8, transition: { duration: motionTokens.micro } },
};

/** Parent orchestration for staggered sets (capped at 40ms). */
export const staggerParent = (stagger: number = motionTokens.stagger, delay: number = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  exit: { transition: { staggerChildren: Math.min(stagger, 0.03), staggerDirection: -1 } },
});

/** Overlay + panel for dialogs/drawers (light, interruptible). */
export const overlayIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: motionTokens.modal } },
  exit: { opacity: 0, transition: { duration: motionTokens.micro } },
};

export const panelIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: motionTokens.modal, ease: forgeEase },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.99,
    transition: { duration: motionTokens.micro, ease: "easeIn" },
  },
};

/** Command palette / menu entrance. */
export const paletteIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: -8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: motionTokens.ui, ease: forgeEase },
  },
  exit: { opacity: 0, scale: 0.98, y: -6, transition: { duration: motionTokens.micro } },
};

/** View crossfade for main content swaps. */
export const viewSwap: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: motionTokens.layout, ease: forgeEase } },
  exit: { opacity: 0, y: -6, transition: { duration: motionTokens.micro } },
};
