'use client';

import React from 'react';
import { portfolioData } from '@/data/dummy';
import { useCursor } from '@/context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { footer } = portfolioData;
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <footer className="w-full bg-canvas-dark text-white border-t border-neutral-900 px-6 md:px-12 pt-8 sm:pt-10 pb-24">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-sm">
        <span className="font-mono text-xs tracking-wider uppercase text-neutral-400">
          {footer.copyright}
        </span>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex min-h-6 items-center gap-1 px-1.5 py-1.5 font-mono text-xs tracking-wider uppercase text-neutral-400 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={resetCursor}
            >
              {link.label}
              {link.external && <ArrowUpRight className="w-3 h-3" aria-hidden="true" />}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
