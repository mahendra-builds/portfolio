'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data/dummy';
import { Mail, MapPin, ArrowUpRight, Send } from 'lucide-react';
import { useCursor } from '@/context/CursorContext';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.44a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const { contact } = portfolioData;
  const { setCursorVariant, resetCursor } = useCursor();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-canvas-dark text-white py-24 sm:py-32 px-6 md:px-12 select-none border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Contact Channels */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-gold uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                CONTACT
              </span>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight leading-tight">
                {contact.titleStart}
                <span className="text-brand-accent italic font-serif">
                  {contact.titleHighlight}
                </span>
                {contact.titleEnd}
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-md leading-relaxed">
                {contact.subtitle}
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4 max-w-md">
              <a
                href="mailto:codefusion825@gmail.com"
                className="group flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-[#121212] hover:border-neutral-700 transition-colors"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono uppercase text-neutral-500">
                      Email me
                    </span>
                    <span className="block text-sm font-semibold text-neutral-200">
                      codefusion825@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-[#121212] hover:border-neutral-700 transition-colors"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono uppercase text-neutral-500">
                      Connect
                    </span>
                    <span className="block text-sm font-semibold text-neutral-200">
                      LinkedIn
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-[#121212]">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono uppercase text-neutral-500">
                      Based in
                    </span>
                    <span className="block text-sm font-semibold text-neutral-200">
                      Pakistan
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-800 text-neutral-400">
                  REMOTE OK
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Dark Contact Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-neutral-800 bg-[#121212] p-8 sm:p-10 space-y-6 shadow-2xl"
            >
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-white text-black py-4 px-6 text-sm font-semibold tracking-wide hover:bg-neutral-200 transition-colors shadow-lg active:scale-[0.99]"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                {submitted ? (
                  <span>Message Sent Successfully!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-16 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <span>{portfolioData.hero.yearText}. All rights reserved.</span>
          <span className="text-neutral-500">CRAFTED WITH NEXT.JS, GSAP & TAILWIND</span>
          <a
            href="#hero"
            className="hover:text-white transition-colors"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </section>
  );
};
