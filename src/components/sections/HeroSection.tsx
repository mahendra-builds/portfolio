'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/dummy';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { Magnetic } from '@/components/ui/Magnetic';
import { useCursor } from '@/context/CursorContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArrowRight, Download } from 'lucide-react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { hero } = portfolioData;
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setWordIndex((index) => (index + 1) % hero.rotatingWords.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [reducedMotion, hero.rotatingWords.length]);

  const handleMouseEnter = () => {
    setCursorVariant('text');
    if (reducedMotion) return;
    if (!turbulenceRef.current) return;

    gsap.fromTo(
      turbulenceRef.current,
      {
        attr: { baseFrequency: '0.04 0.08' },
      },
      {
        attr: { baseFrequency: '0.00 0.00' },
        duration: 1.2,
        ease: 'power2.out',
      }
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    if (!turbulenceRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(turbulenceRef.current, {
      attr: { baseFrequency: `${0.02 + x * 0.03} ${0.05 + y * 0.04}` },
      duration: 0.3,
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    resetCursor();
    if (reducedMotion) return;
    if (!turbulenceRef.current) return;
    gsap.to(turbulenceRef.current, {
      attr: { baseFrequency: '0 0' },
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const activeWord = hero.rotatingWords[wordIndex];

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen w-full scroll-mt-24 flex flex-col justify-between pt-28 pb-24 px-6 md:px-12 bg-canvas-light text-brand-black select-none overflow-hidden"
    >
      {/* Liquid Wave SVG Filter */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-filter" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0 0"
              numOctaves="2"
              result="warp"
            />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="28"
              in="SourceGraphic"
              in2="warp"
            />
          </filter>
        </defs>
      </svg>

      {/* Main Hero Center Typography */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto w-full max-w-7xl mx-auto">
        {/* Giant FULL STACK typography with interactive liquid wave distortion */}
        <div
          className="w-full cursor-pointer liquid-hover"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <h1
            id="hero-heading"
            className="font-display text-huge leading-[0.86] tracking-tight uppercase font-semibold text-brand-black transition-transform duration-300"
          >
            {hero.titlePrimary}
          </h1>
        </div>

        {/* DEVELOPER typography */}
        <h2 className="font-display text-display-sub leading-none tracking-tight uppercase font-semibold mt-2 sm:mt-4 text-brand-black">
          {hero.titleSecondary}
        </h2>

        {/* Disciplines row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-800">
          <span>{hero.disciplines[0]}</span>
          <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-brand-black" />
          <span>{hero.disciplines[1]}</span>
          <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-brand-black" />
          <span>{hero.disciplines[2]}</span>
        </div>

        {/* Rotating tagline: I build live [websites] people use every day. */}
        <p className="mt-8 sm:mt-10 text-xl sm:text-3xl md:text-4xl font-sans font-medium tracking-tight leading-tight max-w-4xl">
          {hero.taglinePrefix}{' '}
          <span className="inline-block bg-brand-gold text-brand-black font-bold px-2 py-0.5 rounded-md align-baseline">
            {activeWord}
          </span>{' '}
          {hero.taglineSuffix}
        </p>

        {/* One line intro */}
        <p className="mt-5 max-w-2xl text-sm sm:text-base text-neutral-700 font-sans leading-relaxed">
          {hero.intro}
        </p>

        {/* Primary actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.2}>
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-brand-black text-white px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg transition-all duration-300 hover:bg-brand-black/85 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={resetCursor}
            >
              <span>{hero.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <a
              href={hero.secondaryCta.href}
              download="Mahendra_Rajput_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-black/25 text-brand-black px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:border-brand-black hover:bg-brand-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={resetCursor}
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>{hero.secondaryCta.label}</span>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 items-end pt-8">
        {/* Left: Brand / Year */}
        <div className="text-left font-script text-xl sm:text-2xl text-neutral-800">
          {hero.yearText}
        </div>

        {/* Center: Scroll to Explore */}
        <div className="hidden md:flex flex-col items-center justify-center gap-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-700">
            {hero.scrollPrompt}
          </span>
          <div className="w-[1.5px] h-8 bg-neutral-400 relative overflow-hidden">
            <div className="w-full h-1/2 bg-black animate-bounce" />
          </div>
        </div>

        {/* Right: Rotating Stamp & Availability */}
        <div className="flex flex-col items-end gap-2 justify-self-end">
          <Magnetic strength={0.35}>
            <RotatingBadge
              text={hero.rotatingBadgeText}
              size={100}
              className="hover:scale-105 transition-transform"
            />
          </Magnetic>
          <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-neutral-700">
            {hero.locationText}
          </span>
        </div>
      </div>
    </section>
  );
};
