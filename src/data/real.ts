import { PortfolioData } from '@/types';

export const realPortfolioData: PortfolioData = {
  meta: {
    title: 'Mahendra Rajput — Creative Developer & Full Stack Engineer',
    description:
      'Personal portfolio of Mahendra Rajput showcasing web development, Drupal, Laravel, React, and motion-driven digital products.',
    author: 'Mahendra Rajput',
  },
  navigation: [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#about' },
    { label: 'SKILLS', href: '#expertise' },
    { label: 'CONTACT', href: '#contact' },
  ],
  hero: {
    brand: 'mahendra',
    yearText: '©2026 Mahendra Rajput',
    titlePrimary: 'CREATIVE',
    titleSecondary: 'DEVELOPER',
    disciplines: ['FULL STACK', 'DRUPAL & LARAVEL', 'REACT & GSAP'],
    scrollPrompt: 'SCROLL TO EXPLORE',
    rotatingBadgeText: "LET'S WORK TOGETHER • LET'S WORK TOGETHER • ",
    locationText: 'BASED IN INDIA • OPEN TO GLOBAL REMOTE',
  },
  about: {
    sectionNumber: '02',
    sectionSubtitle: 'THE ENGINEER BEHIND THE ARCHITECTURE',
    sectionTitle: 'ABOUT ME',
    tagline: 'WHO AM I ?',
    headline: {
      plain1: 'I BUILD ',
      highlight1: 'ROBUST SYSTEMS',
      plain2: ' WHERE ',
      highlight2: 'PERFORMANCE',
      plain3: ' MEETS ELEGANCE.',
    },
    bioParagraphs: [
      "I'm Mahendra Rajput — a Full Stack & Creative Developer specializing in scalable enterprise applications, custom Drupal & Laravel architectures, and expressive interactive frontend experiences.",
      'With professional experience across Codernaline LLP and Vidhya GXP, I engineer high-uptime REST APIs, OAuth2 integrations, and smooth web applications for prominent clients including VTPC, UCDC, and DB United.',
    ],
    stats: [
      { label: 'EXPERIENCE', value: 'CODERNALINE & VIDHYA GXP' },
      { label: 'CORE STACK', value: 'DRUPAL, LARAVEL, REACT' },
      { label: 'CONTAINERS', value: 'DOCKER & DDEV' },
      { label: 'CLIENTS', value: 'VTPC, UCDC, DB UNITED' },
      { label: 'DATABASE', value: 'MYSQL & REST APIS' },
      { label: 'VERSION CONTROL', value: 'GIT & GITLAB CI' },
    ],
    portraitImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  expertise: {
    sectionNumber: '03',
    sectionTitle: 'SKILLS & EXPERTISE',
    lead: 'Delivering end-to-end web engineering, from scalable backend microservices to reactive user interfaces.',
    description:
      'Specialized in PHP, Drupal architecture, Laravel backend APIs, Modern JavaScript, React applications, and Dockerized devops workflows.',
    items: [
      {
        id: '01',
        category: 'BACKEND ARCHITECTURE',
        title: 'Drupal & Laravel Engineering',
        desc: 'Custom module development, content modeling, enterprise CMS, and Laravel MVC service layers with OAuth2 authentication.',
        tags: ['DRUPAL', 'PHP', 'LARAVEL', 'MYSQL'],
        image:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '02',
        category: 'FRONTEND & INTERACTION',
        title: 'React & Interactive Web',
        desc: 'Component-driven user interfaces, state management, GSAP motion choreography, and high-performance client rendering.',
        tags: ['REACT', 'JAVASCRIPT', 'NEXT.JS', 'TAILWIND'],
        image:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '03',
        category: 'INTEGRATIONS & APIS',
        title: 'REST APIs & Security',
        desc: 'Secure RESTful endpoint architectures, OAuth2 tokens, payment workflows, and seamless 3rd-party software connections.',
        tags: ['REST API', 'OAUTH2', 'LINUX', 'SECURITY'],
        image:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '04',
        category: 'DEVOPS & WORKFLOWS',
        title: 'Docker & CI/CD Pipelines',
        desc: 'Local containerization with DDEV and Docker, GitLab CI pipelines, and optimized cloud deployment workflows.',
        tags: ['DOCKER', 'DDEV', 'GITLAB CI', 'LINUX'],
        image:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      },
    ],
    techStack: [
      'Drupal',
      'PHP',
      'Laravel',
      'JavaScript',
      'React',
      'REST API',
      'OAuth2',
      'MySQL',
      'Docker',
      'DDEV',
      'GitLab CI',
      'Linux',
    ],
  },
  work: {
    sectionNumber: '04',
    headerTag: 'FEATURED ARCHITECTURES & WORK',
    giantWord: 'WORK',
    marqueeItems: [
      'DRUPAL CMS',
      'LARAVEL REST APIS',
      'REACT INTERFACES',
      'DOCKER & DDEV',
      'ENTERPRISE ARCHITECTURE',
    ],
    subtitle: 'SELECT CASE STUDIES',
    projects: [
      {
        id: '01',
        number: '01',
        category: 'ENTERPRISE CRM PLATFORM',
        title: 'Real Estate CRM',
        description:
          'Comprehensive real estate management CRM built for agency workflows, lead distribution, property inventories, and dynamic client communications.',
        tags: ['Laravel', 'MySQL', 'React', 'REST API'],
        link: '#',
        image:
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
        liveBadge: 'ENTERPRISE SYSTEM • CASE STUDY • ',
      },
      {
        id: '02',
        number: '02',
        category: 'EMPLOYMENT & RECRUITMENT',
        title: 'Job:Hub and Portal',
        description:
          'High-throughput hiring and talent marketplace connecting companies with skilled professionals, featuring algorithmic filtering and applicant workflows.',
        tags: ['Drupal', 'PHP', 'OAuth2', 'Tailwind'],
        link: '#',
        image:
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80',
        liveBadge: 'TALENT PLATFORM • LIVE PORTAL • ',
      },
      {
        id: '03',
        number: '03',
        category: 'PRODUCTIVITY & OPERATIONS',
        title: 'Task Management System',
        description:
          'Collaborative task orchestration application engineered for high-velocity software squads with real-time status boards, time tracking, and metrics.',
        tags: ['React', 'Laravel', 'Docker', 'GitLab CI'],
        link: '#',
        image:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
        liveBadge: 'PRODUCTIVITY SUITE • DEMO • ',
      },
    ],
  },
  contact: {
    titleStart: "Let's build ",
    titleHighlight: 'something ',
    titleEnd: 'exceptional.',
    subtitle:
      'Discussing enterprise web applications, Drupal/Laravel consulting, or high-performance engineering. Feel free to connect.',
    channels: [
      {
        label: 'Email me',
        value: 'mahendra.rajput@example.com',
        href: 'mailto:mahendra.rajput@example.com',
        type: 'email',
      },
      {
        label: 'Connect',
        value: 'LinkedIn',
        href: 'https://linkedin.com',
        type: 'link',
      },
      {
        label: 'Location',
        value: 'India',
        type: 'location',
      },
    ],
  },
};
