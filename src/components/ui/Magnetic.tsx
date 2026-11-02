'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

/** Pointer must be within this many px of the element before it starts to pull. */
const PROXIMITY_PX = 90;

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.35 }) => {
  const magneticRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (reducedMotion) return;

    const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power2.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power2.out' });

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      // getBoundingClientRect() reflects the GSAP-applied translation, so subtract it
      // to recover the untransformed centre. Without this the offset compounds and
      // the element converges fully onto the pointer regardless of `strength`.
      const currentX = Number(gsap.getProperty(el, 'x')) || 0;
      const currentY = Number(gsap.getProperty(el, 'y')) || 0;

      const centerX = rect.left + rect.width / 2 - currentX;
      const centerY = rect.top + rect.height / 2 - currentY;

      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      if (Math.abs(offsetX) > PROXIMITY_PX || Math.abs(offsetY) > PROXIMITY_PX) {
        moveX(0);
        moveY(0);
        return;
      }

      moveX(offsetX * strength);
      moveY(offsetY * strength);
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [strength, reducedMotion]);

  return (
    <div ref={magneticRef} className="inline-block will-change-transform">
      {children}
    </div>
  );
};
