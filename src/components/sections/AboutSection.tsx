'use client';

import React from 'react';
import { portfolioData } from '@/data/dummy';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Label } from '@/components/ui/Label';
import { ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { about } = portfolioData;

  return (
    <section
      id="about"
      className="relative w-full bg-canvas-dark text-white py-16 sm:py-24 px-6 md:px-12 select-none border-t border-neutral-800 rounded-t-[2.5rem] sm:rounded-t-[4rem] shadow-2xl -mt-10 z-20"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <SectionHeading
          number={about.sectionNumber}
          tagline={about.sectionSubtitle}
          title={about.sectionTitle}
          dark
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Portrait Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 p-2 shadow-2xl">
              <ImageWrapper
                src={about.portraitImage}
                alt="Mahendra Rajput portrait"
                aspectRatio="portrait"
                className="rounded-xl w-full"
                priority
              />
              <div className="p-3.5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>PORTRAIT // 01</span>
                <span className="text-brand-gold">● ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative, Stats Grid & Clients */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Tagline & Headline */}
            <div className="space-y-3">
              <Label variant="dot" dark>
                {about.tagline}
              </Label>

              <h3 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight leading-snug">
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

            {/* Concise Bio Paragraphs */}
            <div className="space-y-4 text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
              {about.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Compact Stats Grid */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 gap-5">
              {about.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <span className="block text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
                    {stat.label}
                  </span>
                  <span className="block text-sm font-semibold text-neutral-200">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Clickable Enterprise Clients Badges */}
            {about.clients && about.clients.length > 0 && (
              <div className="pt-6 border-t border-neutral-800/80 space-y-3">
                <span className="block text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
                  CLIENTS WORKED WITH
                </span>
                <div className="flex flex-wrap gap-3">
                  {about.clients.map((client) => (
                    <a
                      key={client.name}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300 text-sm font-semibold text-neutral-200 hover:text-white"
                    >
                      <span>{client.name}</span>
                      <span className="text-[10px] font-mono text-neutral-500 group-hover:text-brand-gold">
                        ({client.tag})
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
