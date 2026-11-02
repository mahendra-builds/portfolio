export interface NavLink {
  label: string;
  href: string;
}

export interface ExpertiseItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  shortLine: string;
  tags: string[];
  link: string;
  image?: string;
  imageLabel?: string;
  liveBadge: string;
  mock: {
    url: string;
    accent: string;
    kind: 'crm' | 'jobs' | 'tasks';
  };
}

export interface ClientItem {
  id: string;
  name: string;
  fullName: string;
  url: string;
  tag: string;
  sector: string;
  location: string;
  work: string;
  kind: 'client' | 'studio';
}

export interface ReviewItem {
  id: string;
  quote: string;
  org: string;
  url: string;
  sector: string;
  linkLabel: string;
}

export interface CounterItem {
  label: string;
  value: string;
  suffix?: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  label: string;
  value: string;
  href?: string;
  type: 'email' | 'link' | 'location';
}

export interface PortfolioData {
  meta: {
    title: string;
    description: string;
    author: string;
    aboutLine: string;
    location: string;
    locationUrl: string;
    sameAs: string[];
  };
  navigation: NavLink[];
  hero: {
    brand: string;
    yearText: string;
    titlePrimary: string;
    titleSecondary: string;
    disciplines: string[];
    scrollPrompt: string;
    rotatingBadgeText: string;
    locationText: string;
    taglinePrefix: string;
    taglineSuffix: string;
    rotatingWords: string[];
    intro: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
  marquee: {
    words: string[];
  };
  about: {
    sectionSubtitle: string;
    sectionTitle: string;
    tagline: string;
    headline: {
      plain1: string;
      highlight1: string;
      plain2: string;
      highlight2: string;
      plain3: string;
    };
    bioParagraphs: string[];
    counters: CounterItem[];
    stats: {
      label: string;
      value: string;
    }[];
    clients: ClientItem[];
    studio: ClientItem;
    portraitImage: string;
    showPortrait: boolean;
  };
  expertise: {
    sectionNumber: string;
    sectionTitle: string;
    lead: string;
    description: string;
    items: ExpertiseItem[];
    techStack: string[];
  };
  work: {
    sectionNumber: string;
    headerTag: string;
    giantWord: string;
    marqueeItems: string[];
    subtitle: string;
    projects: ProjectItem[];
  };
  reviews: {
    sectionTitle: string;
    sectionSubtitle: string;
    note: string;
    items: ReviewItem[];
  };
  contact: {
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    channels: ContactInfo[];
  };
  footer: {
    copyright: string;
    links: {
      label: string;
      href: string;
      external: boolean;
    }[];
  };
}
