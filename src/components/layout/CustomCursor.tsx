'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '@/context/CursorContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';

const LERP_FACTOR = 0.18;
const DOT_FOLLOW_DURATION = 0.1;

interface VariantStyle {
  classes: string;
  scale: number;
}

const VARIANT_STYLES: Record<string, VariantStyle> = {
  default: {
    classes: 'w-8 h-8 border border-white/80 bg-transparent',
    scale: 1,
  },
  hover: {
    classes: 'w-16 h-16 bg-white/20 border border-white/60',
    scale: 1.25,
  },
  project: {
    classes:
      'w-24 h-24 bg-white text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center shadow-2xl',
    scale: 1,
  },
  text: {
    classes: 'w-10 h-10 bg-white/40',
    scale: 1.1,
  },
  hidden: {
    classes: 'opacity-0',
    scale: 0,
  },
};

export const CustomCursor: React.FC = () => {
  const { variant, cursorText } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const moveDotX = gsap.quickTo(dot, 'x', {
      duration: reducedMotion ? 0 : DOT_FOLLOW_DURATION,
      ease: 'power2.out',
    });
    const moveDotY = gsap.quickTo(dot, 'y', {
      duration: reducedMotion ? 0 : DOT_FOLLOW_DURATION,
      ease: 'power2.out',
    });
    const setCursorX = gsap.quickSetter(cursor, 'x');
    const setCursorY = gsap.quickSetter(cursor, 'y');

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      moveDotX(mouseX);
      moveDotY(mouseY);
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const ticker = () => {
      if (reducedMotion) {
        cursorX = mouseX;
        cursorY = mouseY;
      } else {
        cursorX += (mouseX - cursorX) * LERP_FACTOR;
        cursorY += (mouseY - cursorY) * LERP_FACTOR;
      }

      setCursorX(cursorX);
      setCursorY(cursorY);
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      gsap.ticker.remove(ticker);
      gsap.killTweensOf(dot);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const style = VARIANT_STYLES[variant] ?? VARIANT_STYLES.default;

    gsap.to(cursor, {
      scale: style.scale,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [variant]);

  const style = VARIANT_STYLES[variant] ?? VARIANT_STYLES.default;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-difference"
    >
      {/* Smooth Trailing Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out will-change-transform ${style.classes} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {variant === 'project' && (
          <span className="p-2 text-center text-[10px] leading-tight font-mono">
            {cursorText || 'VIEW ↗'}
          </span>
        )}
      </div>

      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-white transition-opacity duration-200 ${
          variant === 'project' || variant === 'hidden' || !isVisible ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
