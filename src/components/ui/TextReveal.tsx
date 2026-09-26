'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { initGSAP } from '@/animations/scrollTriggers';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.reveal-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          yPercent: 110,
          opacity: 0,
          rotateZ: 2,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 0.9,
          stagger: 0.04,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [delay]);

  const wordList = children.split(' ');

  return (
    <div ref={containerRef} className={`overflow-hidden inline-flex flex-wrap gap-x-2 ${className}`}>
      {wordList.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1">
          <span className="reveal-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};
