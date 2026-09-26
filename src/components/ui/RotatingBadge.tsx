'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface RotatingBadgeProps {
  text?: string;
  size?: number;
  className?: string;
  dark?: boolean;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
  text = "LET'S WORK TOGETHER • LET'S WORK TOGETHER • ",
  size = 110,
  className = '',
  dark = false,
}) => {
  const radius = 40;
  const pathId = `circle-path-${size}-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Rotating Circular Text SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-spin-slow origin-center"
      >
        <path
          id={pathId}
          d={`M 50,50 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          fill="none"
        />
        <text
          fontSize="9.5"
          letterSpacing="0.16em"
          className={`font-mono uppercase font-semibold ${
            dark ? 'fill-neutral-400' : 'fill-brand-black'
          }`}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Arrow */}
      <div
        className={`absolute inset-0 m-auto flex items-center justify-center rounded-full border transition-transform duration-300 hover:scale-110 ${
          dark
            ? 'w-10 h-10 border-neutral-700 bg-neutral-900 text-white'
            : 'w-10 h-10 border-black/20 bg-white/40 text-black backdrop-blur-sm'
        }`}
      >
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </div>
  );
};
