'use client';

import React from 'react';
import { portfolioData } from '@/data/dummy';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { Magnetic } from '@/components/ui/Magnetic';
import { useCursor } from '@/context/CursorContext';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export const WorkSection: React.FC = () => {
  const { work } = portfolioData;
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section
      id="work"
      className="relative w-full bg-canvas-dark text-white py-16 sm:py-24 px-6 md:px-12 select-none border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Work Intro Hero: Dripping 'WORK' Typography */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-gold">
            {work.headerTag}
          </span>

          <div className="relative inline-block w-full">
            <h2 className="font-display text-huge leading-[0.8] tracking-tighter uppercase font-bold text-[#E8DCC4]">
              {work.giantWord}
            </h2>

            {/* Dripping Liquid Droplets / Particles */}
            <div className="flex justify-center gap-6 sm:gap-12 mt-[-6px]">
              <span className="w-2 h-5 rounded-full bg-[#E8DCC4] animate-pulse" />
              <span className="w-3 h-7 rounded-full bg-[#E8DCC4] animate-pulse delay-75" />
              <span className="w-1.5 h-3.5 rounded-full bg-[#E8DCC4] animate-pulse delay-150" />
              <span className="w-2.5 h-6 rounded-full bg-[#E8DCC4] animate-pulse delay-200" />
            </div>
          </div>

          {/* Marquee Ticker */}
          <div className="overflow-hidden py-3 border-y border-neutral-800/80 my-4">
            <div className="flex whitespace-nowrap gap-8 animate-marquee text-xs font-mono tracking-widest text-neutral-400">
              {work.marqueeItems.concat(work.marqueeItems).map((item, idx) => (
                <span key={idx} className="flex items-center gap-6">
                  <span>{item}</span>
                  <span className="text-brand-gold">✦</span>
                </span>
              ))}
            </div>
          </div>

          <span className="block text-xs font-mono tracking-widest text-brand-gold uppercase pt-2">
            {work.subtitle}
          </span>
        </div>

        {/* Stacked Project Cards Showcase */}
        <div className="space-y-8 sm:space-y-10">
          {work.projects.map((project) => (
            <div
              key={project.id}
              className="sticky top-24 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-[#121212] p-6 sm:p-8 md:p-10 shadow-2xl transition-transform duration-500 hover:border-neutral-700"
              onMouseEnter={() => setCursorVariant('project', 'VISIT ↗')}
              onMouseLeave={resetCursor}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                {/* Left Side: Meta & Project Info */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 uppercase">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span className="text-white font-bold">{project.number}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-white group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Live Link Button */}
                  <div className="pt-2">
                    <Magnetic strength={0.25}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 text-xs font-mono uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all duration-300"
                      >
                        <span>Launch Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Magnetic>
                  </div>
                </div>

                {/* Right Side: Project Image Preview & Live Badge */}
                <div className="lg:col-span-6 relative rounded-xl overflow-hidden aspect-[16/10] bg-neutral-950 border border-neutral-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Corner Rotating Demo Badge */}
                  <div className="absolute bottom-3 right-3 z-10 hidden sm:block">
                    <RotatingBadge
                      text={project.liveBadge}
                      size={80}
                      dark
                      className="bg-black/60 rounded-full backdrop-blur-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
