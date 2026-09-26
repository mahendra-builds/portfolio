'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '@/context/CursorContext';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const { variant, cursorText } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instant follow for inner dot
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing ticker for outer cursor
    const ticker = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      gsap.ticker.remove(ticker);
    };
  }, [isVisible]);

  // Adjust cursor dimensions based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'hover':
        return 'w-16 h-16 -translate-x-8 -translate-y-8 bg-white/20 border border-white/60 scale-125';
      case 'project':
        return 'w-24 h-24 -translate-x-12 -translate-y-12 bg-white text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center scale-100 shadow-2xl';
      case 'text':
        return 'w-10 h-10 -translate-x-5 -translate-y-5 bg-white/40 scale-110';
      case 'hidden':
        return 'opacity-0 scale-0';
      default:
        return 'w-8 h-8 -translate-x-4 -translate-y-4 border border-black/80 dark:border-white/80 bg-transparent';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-difference">
      {/* Smooth Trailing Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background-color,border-color,transform] duration-300 ease-out will-change-transform ${getVariantStyles()}`}
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
        className={`fixed top-0 left-0 -translate-x-1 -translate-y-1 w-2 h-2 rounded-full bg-white transition-opacity duration-200 ${
          variant === 'project' || variant === 'hidden' ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
