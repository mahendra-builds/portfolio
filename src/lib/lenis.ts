import type Lenis from 'lenis';

let instance: Lenis | null = null;
let wakeHandler: (() => void) | null = null;

/**
 * Holds the active Lenis instance so components outside <SmoothScroll>
 * (e.g. the mobile menu overlay) can pause and resume smooth scrolling.
 */
export const registerLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

/**
 * The scroll loop parks itself while the page is idle. Components that resume
 * scrolling programmatically (e.g. the mobile menu closing) call this so the
 * rAF loop wakes up again.
 */
export const setLenisWakeHandler = (handler: (() => void) | null) => {
  wakeHandler = handler;
};

export const wakeLenis = () => {
  wakeHandler?.();
};
