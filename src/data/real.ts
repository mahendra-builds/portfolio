import { PortfolioData } from '@/types';

export const realPortfolioData: PortfolioData = {
  meta: {
    title: 'Mahendra Rajput — Full Stack & Linux Server Engineer',
    description:
      'Personal portfolio of Mahendra Rajput specializing in Drupal, Laravel, React, and Linux Server Administration.',
    author: 'Mahendra Rajput',
  },
  navigation: [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERTISE', href: '#expertise' },
    { label: 'CLIENTS', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ],
  hero: {
    brand: 'mahendra',
    yearText: '©2026 Mahendra Rajput',
    titlePrimary: 'CREATIVE',
    titleSecondary: 'DEVELOPER',
    disciplines: ['FULL STACK', 'DRUPAL & LARAVEL', 'LINUX & DEVOPS'],
    scrollPrompt: 'SCROLL TO EXPLORE',
    rotatingBadgeText: "LET'S WORK TOGETHER • LET'S WORK TOGETHER • ",
    locationText: 'BASED IN INDORE, INDIA • REMOTE AVAILABLE',
  },
  about: {
    sectionNumber: '02',
    sectionSubtitle: 'FULL STACK & SERVER ENGINEER',
    sectionTitle: 'ABOUT ME',
    tagline: 'WHO AM I ?',
    headline: {
      plain1: 'I BUILD ',
      highlight1: 'SCALABLE WEB APPS',
      plain2: ' & ',
      highlight2: 'ROBUST LINUX SERVERS',
      plain3: '.',
    },
    bioParagraphs: [
      "I'm Mahendra Rajput, a Full Stack Developer & Linux Server Specialist based in Indore, India. I build enterprise platforms using Drupal, Laravel, and React with high-availability server infrastructures.",
      'With hands-on experience at Codernaline LLP and Vidhya GXP, I manage end-to-end architectures: from custom CMS modules and secure REST APIs to Nginx proxies, Docker containers, and CI/CD pipelines.',
    ],
    stats: [
      { label: 'LOCATION', value: 'INDORE, INDIA' },
      { label: 'EXPERIENCE', value: 'CODERNALINE & VIDHYA GXP' },
      { label: 'CORE STACK', value: 'DRUPAL, LARAVEL, REACT' },
      { label: 'SERVER & DEVOPS', value: 'LINUX, NGINX, DOCKER' },
      { label: 'TOOLS', value: 'DDEV, GITLAB CI, MYSQL' },
      { label: 'DATABASE & APIS', value: 'REST API & OAUTH2' },
    ],
    clients: [
      {
        name: 'VTPC',
        url: 'https://www.vtpc.lv/',
        tag: 'vtpc.lv',
      },
      {
        name: 'UCDC',
        url: 'https://www.ucdc.edu/',
        tag: 'ucdc.edu',
      },
      {
        name: 'DB United',
        url: 'https://dbunited.co/',
        tag: 'dbunited.co',
      },
    ],
    portraitImage: '/images/mahendra-editorial.jpg',
  },
  expertise: {
    sectionNumber: '03',
    sectionTitle: 'SKILLS & EXPERTISE',
    lead: 'High-performance backend development paired with enterprise Linux server management.',
    description:
      'Combining full stack engineering with deep server-level administration to deliver secure, resilient, and fast web infrastructure.',
    items: [
      {
        id: '01',
        category: 'BACKEND ARCHITECTURE',
        title: 'Drupal & Laravel Engineering',
        desc: 'Custom module architecture, entity modeling, service layers, and enterprise CMS solutions.',
        tags: ['DRUPAL', 'PHP', 'LARAVEL', 'MYSQL'],
        image:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '02',
        category: 'SERVER & INFRASTRUCTURE',
        title: 'Linux Server Administration & DevOps',
        desc: 'Ubuntu/Debian server setup, Nginx reverse proxies, Docker containers, DDEV environments, SSH security, and automated CI/CD.',
        tags: ['LINUX', 'NGINX', 'DOCKER', 'DDEV', 'GITLAB CI'],
        image:
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '03',
        category: 'FRONTEND DEVELOPMENT',
        title: 'React & Interactive Web',
        desc: 'Modern component-driven SPAs, GSAP motion choreography, and high-performance user interfaces.',
        tags: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND'],
        image:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '04',
        category: 'APIS & SECURITY',
        title: 'REST APIs & OAuth2 Integrations',
        desc: 'Secure endpoint architectures, authentication flows, payment gateway integrations, and database optimization.',
        tags: ['REST API', 'OAUTH2', 'SECURITY', 'MYSQL'],
        image:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      },
    ],
    techStack: [
      'Linux Server',
      'Nginx',
      'Docker',
      'DDEV',
      'Drupal',
      'PHP',
      'Laravel',
      'MySQL',
      'React',
      'REST API',
      'OAuth2',
      'GitLab CI',
    ],
  },
  work: {
    sectionNumber: '04',
    headerTag: 'FEATURED ARCHITECTURES',
    giantWord: 'WORK',
    marqueeItems: [
      'DRUPAL CMS',
      'LINUX SERVER OPS',
      'LARAVEL REST APIS',
      'REACT INTERFACES',
      'DOCKER & CI/CD',
    ],
    subtitle: 'SELECT CASE STUDIES',
    projects: [
      {
        id: '01',
        number: '01',
        category: 'ENTERPRISE CRM PLATFORM',
        title: 'Real Estate CRM',
        description:
          'Comprehensive CRM platform for real estate operations, automated lead pipelines, and client communications.',
        tags: ['Laravel', 'MySQL', 'React', 'REST API', 'Linux'],
        link: 'https://github.com/mahendra-builds/portfolio',
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
          'High-throughput talent platform connecting employers with professionals, featuring role filtering and candidate management.',
        tags: ['Drupal', 'PHP', 'OAuth2', 'Tailwind', 'Nginx'],
        link: 'https://github.com/mahendra-builds',
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
          'Collaborative task orchestration system with real-time status tracking, sprints, and Dockerized deployment.',
        tags: ['React', 'Laravel', 'Docker', 'GitLab CI'],
        link: 'https://github.com/mahendra-builds',
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
      'Available for enterprise web engineering, Drupal/Laravel consulting, or Linux server deployment.',
    channels: [
      {
        label: 'Email me',
        value: 'ma02@gmail.com',
        href: 'mailto:ma02@gmail.com',
        type: 'email',
      },
      {
        label: 'GitHub',
        value: 'mahendra-builds',
        href: 'https://github.com/mahendra-builds',
        type: 'link',
      },
      {
        label: 'Connect',
        value: 'LinkedIn',
        href: 'https://linkedin.com',
        type: 'link',
      },
      {
        label: 'Based in',
        value: 'Indore, India',
        type: 'location',
      },
    ],
  },
};
