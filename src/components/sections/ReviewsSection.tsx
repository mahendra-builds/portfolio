'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { portfolioData } from '@/data/dummy';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useCursor } from '@/context/CursorContext';
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react';

const AUTO_ADVANCE_MS = 6000;

export const ReviewsSection: React.FC = () => {
  const { reviews } = portfolioData;
  const { setCursorVariant, resetCursor } = useCursor();
  const reducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const total = reviews.items.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (reducedMotion || isPaused || isInteracting) return;

    const interval = setInterval(() => {
      setActiveIndex((index) => (index + 1) % total);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [reducedMotion, isPaused, isInteracting, total]);

  const active = reviews.items[activeIndex];

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative w-full scroll-mt-24 bg-canvas-dark text-white py-16 sm:py-24 px-6 md:px-12 select-none border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <SectionHeading id="reviews-heading" title={reviews.sectionTitle} dark />

        <div
          className="mx-auto max-w-3xl text-center"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocus={() => setIsInteracting(true)}
          onBlur={(event) => {
            // Focus moves within the carousel keep it paused; only leaving entirely resumes.
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsInteracting(false);
            }
          }}
        >
          <Quote className="w-8 h-8 mx-auto text-brand-gold mb-6" aria-hidden="true" />

          <div aria-live="polite" aria-atomic="true">
            <blockquote
              key={active.id}
              cite={active.url}
              className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal leading-snug tracking-tight"
            >
              {active.quote}
            </blockquote>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:text-base">
              <cite className="not-italic">
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white underline decoration-brand-gold/50 underline-offset-4 hover:decoration-brand-gold transition-colors"
                >
                  {active.org}
                </a>
              </cite>
              <span className="text-neutral-400" aria-hidden="true">
                ·
              </span>
              <span className="text-neutral-400">{active.sector}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-9 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous client"
              className="h-11 w-11 grid place-items-center rounded-full border border-neutral-800 text-neutral-300 hover:border-brand-gold hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={resetCursor}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next client"
              className="h-11 w-11 grid place-items-center rounded-full border border-neutral-800 text-neutral-300 hover:border-brand-gold hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={resetCursor}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Auto-advance pause control (WCAG 2.2.2) */}
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setIsPaused((paused) => !paused)}
                aria-pressed={isPaused}
                aria-label={isPaused ? 'Resume automatic rotation' : 'Pause automatic rotation'}
                className="h-11 w-11 grid place-items-center rounded-full border border-neutral-800 text-neutral-300 hover:border-brand-gold hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                {isPaused ? (
                  <Play className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Pause className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            )}

            {/* Dot hit areas are 24x24px minimum (WCAG 2.2 AA SC 2.5.8); the
                visible bar stays 10px tall. */}
            <div role="group" aria-label="Choose client" className="flex items-center ml-1">
              {reviews.items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={index === activeIndex}
                  aria-label={`Show work for ${item.org}`}
                  onClick={() => goTo(index)}
                  className="grid h-6 w-6 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-6 bg-brand-gold'
                        : 'w-2.5 bg-neutral-800 hover:bg-neutral-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
            {reviews.note}
          </p>
        </div>
      </div>
    </section>
  );
};
