'use client';

import React from 'react';
import { portfolioData } from '@/data/dummy';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { useCursor } from '@/context/CursorContext';
import { ProjectMock } from '@/components/ui/ProjectMock';
import { ArrowUpRight } from 'lucide-react';

export const WorkSection: React.FC = () => {
  const { work } = portfolioData;
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative w-full scroll-mt-24 bg-canvas-dark text-white py-16 sm:py-24 px-6 md:px-12 select-none border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Work Intro Hero: Dripping 'WORK' Typography */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-gold">
            {work.headerTag}
          </span>

          <div className="relative inline-block w-full">
            <h2
              id="work-heading"
              className="font-display text-huge leading-[0.85] tracking-tight uppercase font-semibold text-[#E8DCC4]"
            >
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
            <div className="flex w-max animate-marquee motion-reduce:animate-none text-xs font-mono tracking-widest text-neutral-400">
              {[...work.marqueeItems, ...work.marqueeItems].map((item, idx) => (
                <span key={`${item}-${idx}`} className="flex items-center gap-8 pr-8">
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

        {/* Project Rows */}
        <div className="border-b border-neutral-800/80">
          {work.projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-3 md:gap-8 items-center py-7 sm:py-9 border-t border-neutral-800/80 transition-all duration-500 ease-out hover:pl-3 md:hover:pl-8 hover:bg-neutral-900/30 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-gold"
              onMouseEnter={() => setCursorVariant('project', 'VISIT ↗')}
              onMouseLeave={resetCursor}
            >
              {/* Number */}
              <span className="font-mono text-xs sm:text-sm text-neutral-400 uppercase">
                {project.number}
              </span>

              {/* Title, short line and tech tags */}
              <div className="min-w-0">
                <span className="block text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-1.5">
                  {project.category}
                </span>
                <div className="flex items-center gap-4">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight font-medium text-white transition-colors duration-300 group-hover:text-brand-gold">
                    {project.title}
                  </h3>
                  <span className="hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 xl:block">
                    <RotatingBadge
                      text={project.liveBadge}
                      size={64}
                      dark
                      className="bg-black/60 rounded-full backdrop-blur-md"
                    />
                  </span>
                </div>
                <p className="text-neutral-400 text-sm sm:text-base mt-1.5 max-w-2xl">
                  {project.shortLine}
                </p>
                <div className="flex flex-wrap gap-2 pt-2.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Screenshot placeholder + launch action */}
              <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto">
                <ProjectMock
                  url={project.mock.url}
                  accent={project.mock.accent}
                  kind={project.mock.kind}
                  className="hidden lg:block w-36 aspect-[16/10]"
                />

                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 transition-colors duration-300 group-hover:text-brand-gold whitespace-nowrap">
                  Launch Project
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
