'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { initGSAP, ScrollTrigger, gsap } from '@/animations/scrollTriggers';
import { registerLenis, setLenisWakeHandler } from '@/lib/lenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SmoothScrollProps {
  children: React.ReactNode;
}

/** Distance (px) between target and animated scroll below which we consider the
 *  scroll settled and the rAF loop can be parked. */
const SETTLED_EPSILON = 0.5;

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGSAP();

    if (reducedMotion) {
      document.documentElement.classList.add('motion-reduced');
      return;
    }

    document.documentElement.classList.remove('motion-reduced');

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      // The rAF loop below is driven manually so it can be parked while the
      // page is idle instead of spinning a requestAnimationFrame forever.
      autoRaf: false,
    });

    lenisRef.current = lenis;
    registerLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    /**
     * Idle-aware scroll loop.
     *
     * Previously lenis.raf() was driven from the GSAP ticker, which keeps a
     * permanent requestAnimationFrame alive for the whole session — measurable
     * CPU/battery cost on phones. Now the loop only runs while the page is
     * actually scrolling (or a programmatic scroll is animating) and parks
     * itself as soon as the scroll settles.
     */
    let rafId: number | null = null;

    const isSettled = () =>
      !lenis.isScrolling && Math.abs(lenis.targetScroll - lenis.animatedScroll) <= SETTLED_EPSILON;

    const tick = (time: number) => {
      lenis.raf(time * 1000);

      if (isSettled()) {
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(tick);
    };

    // Any user intent (wheel, touch, pointer, key) or a native scroll event
    // restarts the loop.
    const wakeEvents: (keyof WindowEventMap)[] = [
      'wheel',
      'touchstart',
      'pointerdown',
      'keydown',
      'scroll',
    ];
    wakeEvents.forEach((event) => window.addEventListener(event, wake, { passive: true }));

    // Route in-page anchor clicks through Lenis so its internal scroll
    // position stays in sync (skip link, navbar, mobile menu, back-to-top).
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#') || href.length < 2) return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: 0, immediate: false });
      history.pushState(null, '', href);
      wake();
    };

    document.addEventListener('click', handleAnchorClick);

    // Let other components (e.g. the mobile menu) restart the parked loop.
    setLenisWakeHandler(wake);

    gsap.ticker.lagSmoothing(0);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      wakeEvents.forEach((event) => window.removeEventListener(event, wake));
      document.removeEventListener('click', handleAnchorClick);
      setLenisWakeHandler(null);
      lenis.destroy();
      lenisRef.current = null;
      registerLenis(null);
    };
  }, [reducedMotion]);

  return <div className="smooth-scroll-wrapper">{children}</div>;
};
