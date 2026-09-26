'use client';

import React from 'react';

interface SectionHeadingProps {
  number?: string;
  tagline?: string;
  title: string;
  highlight?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  tagline,
  title,
  highlight,
  dark = false,
  align = 'left',
  className = '',
}) => {
  return (
    <div
      className={`space-y-3 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} ${className}`}
    >
      {(number || tagline) && (
        <div
          className={`flex items-center gap-3 text-xs font-mono tracking-widest uppercase ${
            align === 'center' ? 'justify-center' : ''
          } ${dark ? 'text-neutral-500' : 'text-neutral-500'}`}
        >
          {number && <span className="font-semibold">{number}</span>}
          {number && tagline && <span className="w-8 h-[1px] bg-neutral-600 inline-block" />}
          {tagline && <span>{tagline}</span>}
        </div>
      )}
      <h2
        className={`font-display text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase ${
          dark ? 'text-white' : 'text-brand-black'
        }`}
      >
        {title}{' '}
        {highlight && (
          <span className="text-brand-gold italic font-sans lowercase font-normal">
            {highlight}
          </span>
        )}
      </h2>
    </div>
  );
};
