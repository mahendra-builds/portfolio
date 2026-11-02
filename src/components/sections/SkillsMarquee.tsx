'use client';

import React from 'react';
import { portfolioData } from '@/data/dummy';

export const SkillsMarquee: React.FC = () => {
  const words = portfolioData.marquee.words;
  const loop = [...words, ...words];

  return (
    <section
      aria-labelledby="skills-heading"
      className="relative w-full overflow-hidden border-y border-brand-black/10 bg-canvas-light py-5 select-none mb-12"
    >
      <h2 id="skills-heading" className="sr-only">
        Technologies I work with
      </h2>

      <ul className="sr-only">
        {words.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas-light to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas-light to-transparent" />

      <div className="flex w-max animate-marquee motion-reduce:animate-none" aria-hidden="true">
        {loop.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-brand-black/75 sm:px-8"
          >
            {word}
            <span className="text-brand-black/50">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};
