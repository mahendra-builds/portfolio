'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/dummy';
import { useCursor } from '@/context/CursorContext';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  darkTheme?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ darkTheme = false }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolledDark, setIsScrolledDark] = useState(darkTheme);
  const { setCursorVariant, resetCursor } = useCursor();

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
          href="#"
          className="font-script text-3xl sm:text-4xl tracking-wider select-none hover:opacity-75 transition-opacity"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={resetCursor}
        >
          {portfolioData.hero.brand}
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
          {portfolioData.navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`relative py-1 group overflow-hidden transition-colors duration-300 ${
                activeDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-800 hover:text-black'
              }`}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={resetCursor}
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {item.label}
              </span>
              <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full text-brand-gold font-bold">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger / Fullscreen Menu Toggle */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className={`md:hidden p-2 rounded-full transition-colors ${
            activeDark ? 'text-white hover:bg-white/10' : 'text-brand-black hover:bg-black/5'
          }`}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c0c0c] text-white flex flex-col justify-between p-8 md:p-12 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="font-script text-3xl text-neutral-300">
              {portfolioData.hero.brand}
            </span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-3 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors text-white"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {portfolioData.navigation.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="group flex items-center justify-between text-4xl sm:text-5xl font-display uppercase tracking-tight py-2 border-b border-neutral-800/80 hover:text-brand-gold transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 border-t border-neutral-800/80 pt-6">
            <span>{portfolioData.hero.yearText}</span>
            <span>{portfolioData.hero.locationText}</span>
          </div>
        </div>
      )}
    </>
  );
};
