'use client';

import React from 'react';
import { portfolioData } from '@/data/dummy';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Label } from '@/components/ui/Label';

export const AboutSection: React.FC = () => {
  const { about } = portfolioData;

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-canvas-dark text-white py-24 sm:py-32 px-6 md:px-12 select-none border-t border-neutral-800 rounded-t-[2.5rem] sm:rounded-t-[4rem] shadow-2xl -mt-10 z-20"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <SectionHeading
          number={about.sectionNumber}
          tagline={about.sectionSubtitle}
          title={about.sectionTitle}
          dark
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 p-2 shadow-2xl">
              <ImageWrapper
                src={about.portraitImage}
                alt="Mahendra portrait"
                aspectRatio="portrait"
                className="rounded-xl w-full"
                priority
              />
              <div className="p-4 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>PORTRAIT // 01</span>
                <span className="text-brand-gold">● ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Stats Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            {/* Tagline */}
            <div className="space-y-4">
              <Label variant="dot" dark>
                {about.tagline}
              </Label>

              {/* Bold Editorial Headline with Accent Colors */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-tight leading-snug">
                {about.headline.plain1}
                <span className="text-brand-accent italic font-serif">
                  {about.headline.highlight1}
                </span>
                {about.headline.plain2}
                <span className="text-brand-accent italic font-serif">
                  {about.headline.highlight2}
                </span>
                {about.headline.plain3}
              </h3>
            </div>

            {/* Paragraph Narratives */}
            <div className="space-y-6 text-neutral-400 text-base sm:text-lg leading-relaxed font-sans">
              {about.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Structured Stats Grid */}
            <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6">
              {about.stats.map((stat) => (
                <div key={stat.label} className="space-y-1.5">
                  <span className="block text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
                    {stat.label}
                  </span>
                  <span className="block text-sm sm:text-base font-semibold text-neutral-200">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
