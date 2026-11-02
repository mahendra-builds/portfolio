'use client';

import React, { useState } from 'react';
import { CursorProvider } from '@/context/CursorContext';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Preloader } from '@/components/sections/Preloader';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsMarquee } from '@/components/sections/SkillsMarquee';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <CursorProvider>
      {/* Preloader Experience */}
      {!loadingComplete && <Preloader onComplete={() => setLoadingComplete(true)} />}

      {/* Global Smooth Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Lenis Smooth Scroll Container */}
      <SmoothScroll>
        <main id="main" className="relative min-h-screen w-full overflow-x-hidden">
          {/* Header Navigation */}
          <Navbar />

          {/* Section 01: Hero Section */}
          <HeroSection />

          {/* Skills Marquee */}
          <SkillsMarquee />

          {/* Section 02: About Me Section */}
          <AboutSection />

          {/* Section 03: Expertise Section */}
          <ExpertiseSection />

          {/* Section 04: Work / Projects Showcase */}
          <WorkSection />

          {/* Section 05: Client Work */}
          <ReviewsSection />

          {/* Section 06: Contact */}
          <ContactSection />

          {/* Footer */}
          <Footer />
        </main>
      </SmoothScroll>

      {/* Floating Bottom Right WhatsApp Button */}
      <WhatsAppButton />
    </CursorProvider>
  );
}
