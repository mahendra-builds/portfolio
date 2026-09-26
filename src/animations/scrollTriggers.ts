'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

export const initGSAP = () => {
  if (typeof window !== 'undefined' && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
      markers: false,
    });
    isRegistered = true;
  }
  return { gsap, ScrollTrigger };
};

export { gsap, ScrollTrigger };
