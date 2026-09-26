'use client';

import React, { useState } from 'react';
import { CursorProvider } from '@/context/CursorContext';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Preloader } from '@/components/sections/Preloader';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <CursorProvider>
      {/* Preloader Experience */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Global Smooth Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Lenis Smooth Scroll Container */}
      <SmoothScroll>
        <main className="relative min-h-screen w-full overflow-x-hidden">
          {/* Header Navigation */}
          <Navbar />

          {/* Section 01: Hero Section */}
          <HeroSection />

          {/* Section 02: About Me Section */}
          <AboutSection />

          {/* Section 03: Expertise Section */}
          <ExpertiseSection />

          {/* Section 04: Work / Projects Showcase */}
          <WorkSection />

          {/* Section 05: Contact & Footer */}
          <ContactSection />
        </main>
      </SmoothScroll>

      {/* Floating Bottom Left WhatsApp Button */}
      <WhatsAppButton />
    </CursorProvider>
  );
}
