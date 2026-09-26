'use client';

import React, { useRef } from 'react';
import { portfolioData } from '@/data/dummy';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { Magnetic } from '@/components/ui/Magnetic';
import { useCursor } from '@/context/CursorContext';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Trigger liquid wave distortion on hover over "CREATIVE"
  const handleMouseEnter = () => {
    setCursorVariant('text');
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
    if (!turbulenceRef.current) return;
    gsap.to(turbulenceRef.current, {
      attr: { baseFrequency: '0 0' },
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 bg-canvas-light text-brand-black select-none overflow-hidden"
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
        {/* Giant CREATIVE typography with interactive liquid wave distortion */}
        <div
          className="w-full cursor-pointer liquid-hover"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="font-display text-huge leading-[0.82] tracking-tighter uppercase font-bold text-brand-black transition-transform duration-300">
            {portfolioData.hero.titlePrimary}
          </h1>
        </div>

        {/* DEVELOPER typography */}
        <h2 className="font-display text-display-sub leading-none tracking-tight uppercase font-bold mt-2 sm:mt-4 text-brand-black">
          {portfolioData.hero.titleSecondary}
        </h2>

        {/* Disciplines: VISUALS • CODE • EXPERIENCE */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-800">
          <span>{portfolioData.hero.disciplines[0]}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-black" />
          <span>{portfolioData.hero.disciplines[1]}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-black" />
          <span>{portfolioData.hero.disciplines[2]}</span>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 items-end pt-8">
        {/* Left: Brand / Year */}
        <div className="text-left font-script text-xl sm:text-2xl text-neutral-800">
          {portfolioData.hero.yearText}
        </div>

        {/* Center: Scroll to Explore */}
        <div className="hidden md:flex flex-col items-center justify-center gap-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-600">
            {portfolioData.hero.scrollPrompt}
          </span>
          <div className="w-[1.5px] h-8 bg-neutral-400 relative overflow-hidden">
            <div className="w-full h-1/2 bg-black animate-bounce" />
          </div>
        </div>

        {/* Right: Rotating Stamp & Location */}
        <div className="flex flex-col items-end gap-2 justify-self-end">
          <Magnetic strength={0.35}>
            <RotatingBadge
              text={portfolioData.hero.rotatingBadgeText}
              size={100}
              className="hover:scale-105 transition-transform"
            />
          </Magnetic>
          <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-neutral-700">
            {portfolioData.hero.locationText}
          </span>
        </div>
      </div>
    </section>
  );
};
