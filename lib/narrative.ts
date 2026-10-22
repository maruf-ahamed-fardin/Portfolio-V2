/** Shared, mutable motion state (mirrors the reference's `narrative` store). Written by MotionSystem, read by canvases. */
export const narrative = { progress: 0, hero: 0, pointerX: 0, pointerY: 0 };

export const motionConfig = { ease: 'power3.out', revealDuration: 0.9, maxDpr: 1.5 } as const;

export const motionEnabled = () =>
  typeof document !== 'undefined' &&
  document.documentElement.dataset.motion !== 'off' &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches;
