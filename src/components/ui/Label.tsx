'use client';

import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  variant?: 'outline' | 'ghost' | 'dot';
  dark?: boolean;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  variant = 'ghost',
  dark = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase';

  if (variant === 'dot') {
    return (
      <span
        className={`${baseStyles} ${dark ? 'text-neutral-400' : 'text-neutral-600'} ${className}`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-brand-gold' : 'bg-brand-black'}`}
        />
        {children}
      </span>
    );
  }

  if (variant === 'outline') {
    return (
      <span
        className={`${baseStyles} px-3 py-1 rounded-full border ${
          dark
            ? 'border-neutral-800 text-neutral-300 bg-neutral-900/50'
            : 'border-neutral-300 text-neutral-700 bg-black/5'
        } ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`${baseStyles} ${dark ? 'text-neutral-400' : 'text-neutral-500'} ${className}`}
    >
      {children}
    </span>
  );
};
