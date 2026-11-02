'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/dummy';
import { useCursor } from '@/context/CursorContext';
import { getLenis } from '@/lib/lenis';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  darkTheme?: boolean;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Navbar: React.FC<NavbarProps> = ({ darkTheme = false }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolledDark, setIsScrolledDark] = useState(darkTheme);
  const { setCursorVariant, resetCursor } = useCursor();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Determine if we've scrolled past the light hero section
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        // When hero bottom is near the top of viewport (e.g. within 60px), switch to dark theme
        setIsScrolledDark(heroBottom <= 80);
      } else {
        setIsScrolledDark(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMobileOpen(false), []);

  // Mobile menu: dialog semantics, focus management, focus trap, Escape, scroll lock.
  useEffect(() => {
    if (!isMobileOpen) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();

    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      trigger?.focus();
    };
  }, [isMobileOpen, closeMenu]);

  const activeDark = isScrolledDark || darkTheme;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 md:px-12 flex items-center justify-between pointer-events-auto ${
          activeDark
            ? 'bg-[#090909]/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-4 text-white'
            : 'bg-transparent py-6 text-brand-black'
        }`}
      >
        {/* Brand / Signature Logo */}
        <a
          href="#hero"
          className="font-script text-3xl sm:text-4xl tracking-wider select-none hover:opacity-75 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={resetCursor}
        >
          {portfolioData.hero.brand}
        </a>

        {/* Desktop Nav Items */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-widest uppercase"
        >
          {portfolioData.navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`relative py-1 group overflow-hidden whitespace-nowrap transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold ${
                activeDark
                  ? 'text-neutral-300 hover:text-white'
                  : 'text-neutral-800 hover:text-black'
              }`}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={resetCursor}
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full text-brand-gold-deep font-medium"
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger / Fullscreen Menu Toggle */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className={`lg:hidden p-2 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold ${
            activeDark ? 'text-white hover:bg-white/10' : 'text-brand-black hover:bg-black/5'
          }`}
          aria-label="Open menu"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="fixed inset-0 z-50 bg-[#0c0c0c] text-white flex flex-col justify-between p-8 md:p-12 animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <span className="font-script text-3xl text-neutral-300">
              {portfolioData.hero.brand}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              className="p-3 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-col gap-6 my-auto">
            {portfolioData.navigation.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="group flex items-center justify-between text-4xl sm:text-5xl font-display uppercase tracking-tight py-2 border-b border-neutral-800/80 hover:text-brand-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-neutral-400" aria-hidden="true">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-t border-neutral-800/80 pt-6">
            <span>{portfolioData.hero.yearText}</span>
            <span>{portfolioData.hero.locationText}</span>
          </div>
        </div>
      )}
    </>
  );
};
