'use client';

import React from 'react';
import Image from 'next/image';

interface ImageWrapperProps {
  src: string;
  alt: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'video';
  className?: string;
  priority?: boolean;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  aspectRatio = 'landscape',
  className = '',
  priority = false,
}) => {
  const aspectClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/10]',
    square: 'aspect-square',
    video: 'aspect-video',
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-neutral-900/40 border border-neutral-800/60 ${aspectClasses[aspectRatio]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};
