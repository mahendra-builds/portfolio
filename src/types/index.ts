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
  tags: string[];
  link: string;
  image: string;
  liveBadge: string;
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
  };
  about: {
    sectionNumber: string;
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
    stats: {
      label: string;
      value: string;
    }[];
    clients?: {
      name: string;
      url: string;
      tag: string;
    }[];
    portraitImage: string;
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
  contact: {
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    channels: ContactInfo[];
  };
}
