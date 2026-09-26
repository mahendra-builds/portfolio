'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counter' | 'hello' | 'exit'>('counter');
  const containerRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLHeadingElement>(null);
  const pastaRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const counterObj = { value: 0 };

    // Animate percentage from 0 to 100
    const counterTl = gsap.to(counterObj, {
      value: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.floor(counterObj.value));
      },
      onComplete: () => {
        // Transition to "hello" phase
        setPhase('hello');

        setTimeout(() => {
          if (helloRef.current) {
            gsap.fromTo(
              helloRef.current,
              { opacity: 0, scale: 0.8, y: 10 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                onComplete: () => {
                  // Exit animation: curtain slides up
                  setTimeout(() => {
                    setPhase('exit');
                    if (containerRef.current) {
                      gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 1.1,
                        ease: 'power4.inOut',
                        onComplete: () => {
                          onComplete();
                        },
                      });
                    }
                  }, 600);
                },
              }
            );
          }
        }, 100);
      },
    });

    // Animate the pasta curve stroke
    if (pastaRef.current) {
      gsap.fromTo(
        pastaRef.current,
        { strokeDashoffset: 160 },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        }
      );
    }

    return () => {
      counterTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0e0e0e] text-white select-none will-change-transform"
    >
      {phase === 'counter' && (
        <div className="flex flex-col items-center gap-6">
          <div className="font-display text-7xl sm:text-8xl tracking-tight text-[#E8DCC4]">
            {count}%
          </div>

          {/* Reference Macaroni Graphic Curve */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            className="animate-spin-slow"
          >
            <path
              ref={pastaRef}
              d="M 25 35 C 25 75, 75 75, 75 35"
              stroke="#D8C7A5"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="160"
            />
          </svg>
        </div>
      )}

      {phase === 'hello' && (
        <h1
          ref={helloRef}
          className="font-script text-7xl sm:text-8xl md:text-9xl text-[#D8C7A5] tracking-wide"
        >
          hello
        </h1>
      )}
    </div>
  );
};
