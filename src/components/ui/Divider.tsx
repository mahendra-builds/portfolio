'use client';

import React from 'react';

interface DividerProps {
  dark?: boolean;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ dark = false, className = '' }) => {
  return (
    <hr
      className={`w-full border-t transition-colors duration-300 ${
        dark ? 'border-neutral-800' : 'border-neutral-300/80'
      } ${className}`}
    />
  );
};
