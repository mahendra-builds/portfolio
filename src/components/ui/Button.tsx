'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'glass';
  showArrow?: boolean;
  className?: string;
}

type LinkButtonProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string;
  };

type NativeButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'light',
  showArrow = true,
  href,
  className = '',
  ...props
}) => {
  const baseStyles =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 active:scale-95';

  const variants = {
    light: 'bg-white text-black hover:bg-neutral-200 shadow-sm',
    dark: 'bg-brand-black text-white hover:bg-neutral-900 border border-neutral-800',
    glass: 'bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/10',
  };

  const content = (
    <>
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
        {children}
      </span>
      {showArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href !== undefined) {
    const external = isExternalHref(href);
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a
        {...anchorProps}
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...(external
          ? {
              target: anchorProps.target ?? '_blank',
              rel: anchorProps.rel ?? 'noopener noreferrer',
            }
          : {})}
      >
        {content}
      </a>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={buttonProps.type ?? 'button'}
      {...buttonProps}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
};
