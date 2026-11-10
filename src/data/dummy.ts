import { PortfolioData } from '@/types';
import { realPortfolioData } from './real';

/**
 * Phase 18 Toggle:
 * true  => Mahendra Rajput's Real Portfolio Data (Owner, Experience, Real Estate CRM, Job:Hub, Task Management, etc.)
 * false => Original Reference Video Dummy Data
 */
export const USE_REAL_CONTENT = true;

export const dummyPortfolioData: PortfolioData = {
  meta: {
    title: 'Waqas — Creative Developer & Motion Designer',
    description:
      'A modern, motion-heavy personal portfolio website showcasing creative development, UI/UX, and motion design.',
    author: 'Waqas',
    aboutLine: 'Waqas is a creative frontend developer working across design, code and motion.',
    location: 'Pakistan',
    locationUrl: 'https://www.google.com/maps/search/?api=1&query=Pakistan',
    sameAs: [],
  },
  navigation: [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERTISE', href: '#expertise' },
    { label: 'CLIENTS', href: '#reviews' },
    { label: 'CONTACT', href: '#contact' },
  ],
  hero: {
    brand: 'waqas',
    yearText: '©2026 waqas',
    titlePrimary: 'CREATIVE',
    titleSecondary: 'DEVELOPER',
    disciplines: ['VISUALS', 'CODE', 'EXPERIENCE'],
    scrollPrompt: 'SCROLL TO EXPLORE',
    rotatingBadgeText: "LET'S WORK TOGETHER • LET'S WORK TOGETHER • ",
    locationText: 'BASED IN PAKISTAN',
    taglinePrefix: 'I build live',
    taglineSuffix: 'people use every day.',
    rotatingWords: ['websites', 'dashboards', 'APIs', 'CMS platforms', 'Drupal sites', 'servers'],
    intro: '2+ years building interfaces people remember.',
    primaryCta: { label: 'View my work', href: '#work' },
    secondaryCta: { label: 'Download CV', href: '/mahendra-cv.pdf' },
  },
  marquee: {
    words: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Next.js',
      'PHP',
      'Laravel',
      'Drupal',
      'MySQL',
      'Docker',
      'Linux',
    ],
  },
  about: {
    sectionSubtitle: 'THE PERSON BEHIND THE WORK',
    sectionTitle: 'ABOUT ME',
    tagline: 'WHO AM I ?',
    headline: {
      plain1: 'I BUILD ',
      highlight1: 'DIGITAL WORLDS',
      plain2: ' WHERE ',
      highlight2: 'DESIGN',
      plain3: ' MEETS CODE.',
    },
    bioParagraphs: [
      "I'm Waqas — a creative frontend developer who enjoys turning ideas, interfaces and motion into experiences people remember.",
      'I care about the details most people do not notice: the rhythm of typography, the timing of an interaction, and the tiny moments that make a digital product feel alive.',
    ],
    counters: [
      { label: 'YEARS', value: '2', suffix: '+' },
      { label: 'PROJECTS', value: '15', suffix: '+' },
      { label: 'CLIENTS', value: '5', suffix: '+' },
    ],
    stats: [
      { label: 'BASED', value: 'PAKISTAN' },
      { label: 'FOCUS', value: 'WEB / MOTION' },
      { label: 'BUILDING WEBSITES', value: '1+ YEAR' },
      { label: 'MINDSET', value: 'ALWAYS LEARNING' },
      { label: 'PROJECTS DONE', value: '10+' },
      { label: 'EDUCATION', value: 'INTERMEDIATE' },
    ],
    clients: [
      {
        id: '01',
        name: 'Studio One',
        fullName: 'Studio One',
        url: '#',
        tag: 'studio-one',
        sector: 'Design agency',
        location: 'Pakistan',
        work: 'Brand and interface work for a design studio.',
        kind: 'client',
      },
      {
        id: '02',
        name: 'Northline',
        fullName: 'Northline',
        url: '#',
        tag: 'northline',
        sector: 'Product studio',
        location: 'Remote',
        work: 'Design systems and front-end builds.',
        kind: 'client',
      },
    ],
    studio: {
      id: '03',
      name: 'Studio',
      fullName: 'Studio',
      url: '#',
      tag: 'studio',
      sector: 'Creative studio',
      location: 'Pakistan',
      work: 'Where I design and build.',
      kind: 'studio',
    },
    portraitImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    showPortrait: true,
  },
  expertise: {
    sectionNumber: '03',
    sectionTitle: 'MY EXPERTISE',
    lead: 'I design and build digital experiences where design, code and motion work as one.',
    description:
      'From expressive interfaces to smooth interactions, I combine frontend engineering with visual design to create digital experiences that feel alive.',
    items: [
      {
        id: '01',
        category: 'DEVELOPMENT',
        title: 'Creative Development',
        desc: 'Building fast, responsive and scalable interfaces with modern frontend technologies.',
        tags: ['HTML', 'CSS', 'JAVASCRIPT', 'UI / MOTION'],
        image:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '02',
        category: 'ANIMATION',
        title: 'Motion & Interaction',
        desc: 'Turning static interfaces into expressive experiences through meaningful motion and micro-interactions.',
        tags: ['GSAP', 'SCROLLTRIGGER', 'LENIS', '3D / UI & UX'],
        image:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '03',
        category: 'DESIGN',
        title: 'UI / UX Design',
        desc: 'Creating clean, system-driven design systems with strong hierarchy, usability, and a distinct visual personality.',
        tags: ['DESIGN', 'UX', 'PROTOTYPING', 'DESIGN SYSTEMS'],
        image:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '04',
        category: 'FULL STACK',
        title: 'Modern Web Apps',
        desc: 'Developing interactive applications with component-based architecture and dynamic data.',
        tags: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND'],
        image:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      },
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'React JS', 'Lenis', 'GSAP', 'Firebase'],
  },
  work: {
    sectionNumber: '04',
    headerTag: 'SCROLL TO EXPLORE MY',
    giantWord: 'WORK',
    marqueeItems: ['UI/UX', 'INTERACTIVE WEB', 'CREATIVE DEVELOPMENT', 'MOTION DESIGN'],
    subtitle: 'MY WORK',
    projects: [
      {
        id: '01',
        number: '01',
        category: "GRAPHIC DESIGNER'S PORTFOLIO WEBSITE",
        title: 'Creative Portfolio',
        shortLine: 'A modern visual identity and digital experience for a contemporary designer.',
        description:
          'A modern visual identity and digital experience designed for a contemporary creative designer.',
        tags: ['HTML', 'Tailwind', 'JavaScript', 'GSAP'],
        link: 'https://portfolio-gd-1.netlify.app',
        imageLabel: '[Project screenshot]',
        liveBadge: 'VIEW MASTERPIECE • LIVE DEMO • ',
        mock: { url: 'portfolio-gd-1.netlify.app', accent: '#D4AF37', kind: 'crm' },
      },
      {
        id: '02',
        number: '02',
        category: 'AGENCY & BRANDING',
        title: 'Studio Minimal',
        shortLine: 'Interactive agency portfolio with fluid micro-interactions.',
        description:
          'Interactive agency portfolio showcasing high-end visual production, directional typography, and fluid micro-interactions.',
        tags: ['Next.js', 'TypeScript', 'GSAP', 'Lenis'],
        link: '#',
        imageLabel: '[Project screenshot]',
        liveBadge: 'EXPLORE CASE STUDY • LIVE DEMO • ',
        mock: { url: 'studio-minimal.app', accent: '#C5A880', kind: 'jobs' },
      },
      {
        id: '03',
        number: '03',
        category: 'ECOMMERCE & FASHION',
        title: 'GAZU Creative Clothing',
        shortLine: 'A modern digital shopping experience for contemporary brands.',
        description:
          'A modern digital shopping experience designed for contemporary brands, bringing products, style, and seamless commerce together.',
        tags: ['React', 'Tailwind', 'GSAP', 'Lenis'],
        link: 'https://project-gazu.netlify.app',
        imageLabel: '[Project screenshot]',
        liveBadge: 'VIEW COLLECTION • LIVE DEMO • ',
        mock: { url: 'project-gazu.netlify.app', accent: '#7EE787', kind: 'tasks' },
      },
    ],
  },
  reviews: {
    sectionTitle: 'CLIENT WORK',
    sectionSubtitle: 'WHO I BUILD FOR',
    note: 'Factual summaries of the work delivered for each client organisation.',
    items: [
      {
        id: '01',
        quote: 'Brand and interface work for a design studio, from the visual system to the build.',
        org: 'Studio One',
        url: '#',
        sector: 'Design agency · Pakistan',
        linkLabel: 'studio-one',
      },
      {
        id: '02',
        quote: 'Design systems and front-end builds for a distributed product team.',
        org: 'Northline',
        url: '#',
        sector: 'Product studio · Remote',
        linkLabel: 'northline',
      },
    ],
  },
  contact: {
    titleStart: "Let's create ",
    titleHighlight: 'something',
    titleEnd: '.',
    subtitle:
      "Have a project in mind, a question, or simply want to talk about an idea? I'd love to hear from you.",
    channels: [
      {
        label: 'Email me',
        value: 'ma02raj@gmail.com',
        href: 'mailto:ma02raj@gmail.com',
        type: 'email',
      },
      {
        label: 'Connect',
        value: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mhndrtech',
        type: 'link',
      },
      {
        label: 'Based in',
        value: 'Pakistan',
        href: 'https://www.google.com/maps/search/?api=1&query=Pakistan',
        type: 'location',
      },
    ],
  },
  footer: {
    copyright: '© 2026 Waqas',
    links: [
      { label: 'GitHub', href: '#', external: false },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mhndrtech', external: true },
      { label: 'CV', href: '/mahendra-cv.pdf', external: false },
      { label: 'Back to top', href: '#hero', external: false },
    ],
  },
};

export const portfolioData: PortfolioData = USE_REAL_CONTENT
  ? realPortfolioData
  : dummyPortfolioData;
