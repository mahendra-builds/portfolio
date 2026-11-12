import type { Metadata, Viewport } from 'next';
import { Anton, Plus_Jakarta_Sans, Caveat, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  // The mono face is only used below the fold (code panel, small labels), so
  // it must not compete with the display/body fonts for critical bandwidth.
  preload: false,
});

const siteUrl = SITE_URL;

const title = 'Mahendra Rajput – Full Stack Developer';

const description =
  'Mahendra Rajput is a full stack developer and Linux server engineer building Drupal, Laravel, React and Next.js platforms for international clients — from the interface to the server.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: 'Mahendra Rajput', url: siteUrl }],
  creator: 'Mahendra Rajput',
  publisher: 'Mahendra Rajput',
  applicationName: 'Mahendra Rajput Portfolio',
  category: 'technology',
  keywords: [
    'Mahendra Rajput',
    'Full Stack Developer Indore',
    'Drupal Developer',
    'Laravel Developer',
    'React Developer',
    'Next.js Developer',
    'Linux Server Engineer',
    'PHP Developer',
    'DevOps Engineer',
    'Portfolio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: '/',
    siteName: 'Mahendra Rajput',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090909',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Mahendra Rajput',
      url: `${siteUrl}/`,
      jobTitle: 'Full Stack Developer and Linux Server Engineer',
      description:
        'Mahendra Rajput is a full stack developer and Linux server engineer based in Indore, India. He builds Drupal, Laravel and React platforms, and runs the Linux servers they live on.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Indore',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'IN',
      },
      telephone: '+91-97541-37138',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Full Stack Developer',
        occupationLocation: {
          '@type': 'City',
          name: 'Indore',
        },
        skills:
          'Drupal, Laravel, PHP, React, Next.js, TypeScript, MySQL, REST API, OAuth2, Docker, Linux, Nginx, DevOps, CI/CD',
      },
      areaServed: {
        '@type': 'Text',
        name: 'Worldwide',
      },
      knowsAbout: [
        'Drupal',
        'Laravel',
        'PHP',
        'React',
        'Next.js',
        'TypeScript',
        'MySQL',
        'REST API',
        'OAuth2',
        'Docker',
        'Linux',
        'Nginx',
        'DevOps',
        'CI/CD',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Codernaline',
        url: 'https://drupal.codernaline.com',
      },
      sameAs: ['https://github.com/mahendra-builds', 'https://www.linkedin.com/in/mhndrtech'],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#client-vtpc`,
      name: 'Vaivari Technical Aids Centre',
      url: 'https://www.vtpc.lv/',
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#client-ucdc`,
      name: 'University of California Washington Center',
      url: 'https://www.ucdc.edu/',
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#client-dbunited`,
      name: 'DB United Corp s.r.o.',
      url: 'https://dbunited.co/',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'Mahendra Rajput — Full Stack Developer',
      description,
      inLanguage: 'en-US',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: `${siteUrl}/`,
      name: 'Mahendra Rajput — Full Stack Developer',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#person` },
      inLanguage: 'en-US',
      mentions: [
        { '@id': `${siteUrl}/#client-vtpc` },
        { '@id': `${siteUrl}/#client-ucdc` },
        { '@id': `${siteUrl}/#client-dbunited` },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${jakarta.variable} ${caveat.variable} ${jetbrains.variable} motion-safe:scroll-smooth`}
    >
      <body className="bg-canvas-light text-brand-black antialiased selection:bg-brand-black selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-brand-black focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-2xl"
        >
          Skip to content
        </a>

        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
