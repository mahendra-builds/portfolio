'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { initGSAP, ScrollTrigger, gsap } from '@/animations/scrollTriggers';
import { registerLenis } from '@/lib/lenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SmoothScrollProps {
  children: React.ReactNode;
}

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
    });

    lenisRef.current = lenis;
    registerLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      registerLenis(null);
    };
  }, [reducedMotion]);

  return <div className="smooth-scroll-wrapper">{children}</div>;
};
