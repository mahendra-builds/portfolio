import type Lenis from 'lenis';

let instance: Lenis | null = null;

/**
 * Holds the active Lenis instance so components outside <SmoothScroll>
 * (e.g. the mobile menu overlay) can pause and resume smooth scrolling.
 */
export const registerLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
