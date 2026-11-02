'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

const FAILSAFE_MS = 5000;

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counter' | 'hello' | 'exit'>('counter');
  const containerRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLParagraphElement>(null);
  const pastaRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finish = useCallback(() => {
    onCompleteRef.current();
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timers.push(id);
      return id;
    };

    // Hard failsafe: the overlay must never stay on screen and block the page.
    const failsafe = schedule(() => {
      setPhase('exit');
      finish();
    }, FAILSAFE_MS);

    if (reducedMotion) {
      setCount(100);
      setPhase('hello');
      schedule(() => {
        setPhase('exit');
        finish();
      }, 400);

      return () => {
        clearTimeout(failsafe);
        timers.forEach(clearTimeout);
      };
    }

    const counterObj = { value: 0 };

    const counterTl = gsap.to(counterObj, {
      value: 100,
      duration: 1.6,
      ease: 'power1.inOut',
      onUpdate: () => {
        setCount(Math.floor(counterObj.value));
      },
      onComplete: () => {
        setPhase('hello');

        schedule(() => {
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
                  schedule(() => {
                    setPhase('exit');
                    if (containerRef.current) {
                      gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 1.1,
                        ease: 'power4.inOut',
                        onComplete: () => {
                          finish();
                        },
                      });
                    } else {
                      finish();
                    }
                  }, 600);
                },
              }
            );
          } else {
            // No ref to animate — exit immediately rather than trapping the overlay.
            setPhase('exit');
            finish();
          }
        }, 100);
      },
    });

    const pastaTween = pastaRef.current
      ? gsap.fromTo(
          pastaRef.current,
          { strokeDashoffset: 160 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          }
        )
      : null;

    return () => {
      clearTimeout(failsafe);
      timers.forEach(clearTimeout);
      counterTl.kill();
      pastaTween?.kill();
    };
  }, [reducedMotion, finish]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
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
            className="animate-spin-slow motion-reduce:animate-none"
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
        <p
          ref={helloRef}
          className="font-script text-7xl sm:text-8xl md:text-9xl text-[#D8C7A5] tracking-wide"
        >
          hello
        </p>
      )}
    </div>
  );
};
