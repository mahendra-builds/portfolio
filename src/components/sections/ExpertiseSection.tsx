'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data/dummy';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export const ExpertiseSection: React.FC = () => {
  const { expertise } = portfolioData;
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section
      id="expertise"
      className="relative w-full bg-canvas-dark text-white py-16 sm:py-24 px-6 md:px-12 select-none border-t border-neutral-900 overflow-hidden"
    >
      {/* Background Floating Animated Tech Badges */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 animate-bounce duration-[6000ms] text-xs font-mono px-3 py-1 border border-neutral-700 rounded-full">
          LINUX SERVER
        </div>
        <div className="absolute top-2/3 left-1/4 animate-pulse duration-[5000ms] text-xs font-mono px-3 py-1 border border-neutral-700 rounded-full">
          DRUPAL / LARAVEL
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce duration-[8000ms] text-xs font-mono px-3 py-1 border border-neutral-700 rounded-full">
          NGINX / DOCKER
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-pulse duration-[7000ms] text-xs font-mono px-3 py-1 border border-neutral-700 rounded-full">
          REACT / GSAP
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
        {/* Left Column: Heading, Lead & Tech Pills */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <SectionHeading
            number={expertise.sectionNumber}
            tagline="EXPERTISE & SERVERS"
            title={expertise.sectionTitle}
            dark
          />

          <p className="text-lg sm:text-xl font-sans font-medium text-neutral-200 leading-snug">
            {expertise.lead}
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            {expertise.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {expertise.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Service Accordion List with Hover Image Previews */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-neutral-800/80 border-y border-neutral-800/80">
          {expertise.items.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
              className="group relative py-6 sm:py-7 transition-colors duration-300 hover:bg-neutral-900/40 px-3 sm:px-6 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-neutral-500">
                      /{item.id}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-neutral-800 text-neutral-400">
                      {item.category}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed pt-0.5">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono tracking-wider text-neutral-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-full border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-600 transition-colors self-center shrink-0">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Hover Floating Preview Image */}
              {activeItem === item.id && (
                <div className="hidden md:block absolute right-20 top-1/2 -translate-y-1/2 w-44 h-28 rounded-xl overflow-hidden border border-neutral-700 shadow-2xl z-20 pointer-events-none animate-fade-in">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
