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
  id?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  highlight,
  dark = false,
  align = 'left',
  className = '',
  id,
}) => {
  return (
    <div
      className={`space-y-3 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} ${className}`}
    >
      <h2
        id={id}
        className={`font-display text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase font-semibold ${
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
