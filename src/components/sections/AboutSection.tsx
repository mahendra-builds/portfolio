'use client';

import React from 'react';
import { portfolioData } from '@/data/dummy';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CodePanel } from '@/components/ui/CodePanel';
import { Label } from '@/components/ui/Label';
import CountUp from '@/components/ui/CountUp';
import { ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { about } = portfolioData;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full scroll-mt-24 bg-canvas-dark text-white py-16 sm:py-24 px-6 md:px-12 select-none border-t border-neutral-800 rounded-t-[2.5rem] sm:rounded-t-[4rem] shadow-2xl -mt-10 z-20"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <SectionHeading id="about-heading" title={about.sectionTitle} dark />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Code Panel */}
          <div className="lg:col-span-5 relative flex flex-col">
            <CodePanel
              className="flex-1"
              filename="LeadController.php"
              portraitSrc={about.portraitImage}
              showPortrait={about.showPortrait}
            />
            <div className="mt-6 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>WORKBENCH // 01</span>
              <span className="text-brand-gold">● ACTIVE</span>
            </div>
          </div>

          {/* Right Column: Bio Narrative, Counters & Clients */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Tagline & Headline */}
            <div className="space-y-3">
              <Label variant="dot" dark>
                {about.tagline}
              </Label>

              <h3 className="text-2xl sm:text-3xl font-sans font-medium tracking-tight leading-snug">
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

            {/* Concise Bio (2–3 lines) */}
            <div className="space-y-3 text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
              {about.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Number Counters */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {about.counters.map((counter) => (
                <div
                  key={counter.label}
                  className="border-t border-neutral-800 pt-3 flex flex-col gap-1"
                >
                  <span className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-gold leading-none">
                    <CountUp value={counter.value} suffix={counter.suffix} />
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                    {counter.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Compact Stats Grid */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 gap-5">
              {about.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <span className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                    {stat.label}
                  </span>
                  <span className="block text-sm font-medium text-neutral-200">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clients — full width */}
        <div id="clients" className="pt-8 border-t border-neutral-800/80 space-y-4 scroll-mt-24">
          <h3 className="block text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            CLIENTS WORKED WITH
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {about.clients.map((client) => (
              <li key={client.id}>
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start justify-between gap-3 px-4 py-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800/70 hover:border-neutral-700 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-neutral-100">
                      {client.name}
                      <span className="ml-2 text-[11px] font-mono font-normal text-neutral-400">
                        {client.tag}
                      </span>
                    </span>
                    <span className="block text-[12px] text-neutral-400 mt-1 leading-snug">
                      {client.sector} · {client.location}
                    </span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-neutral-400 group-hover:text-brand-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}

            {/* Studio */}
            <li>
              <a
                href={about.studio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-3 px-4 py-4 rounded-xl border border-brand-gold/30 bg-brand-gold/5 hover:bg-brand-gold/10 hover:border-brand-gold/50 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-neutral-100">
                    {about.studio.name}
                    <span className="ml-2 rounded bg-brand-gold/20 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-brand-gold">
                      Studio
                    </span>
                  </span>
                  <span className="block text-[12px] text-neutral-400 mt-1 leading-snug">
                    {about.studio.sector} · {about.studio.location}
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-brand-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
