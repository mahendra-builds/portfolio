import type { Metadata } from 'next';
import { Anton, Plus_Jakarta_Sans, Caveat, JetBrains_Mono } from 'next/font/google';
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
});

export const metadata: Metadata = {
  title: 'Waqas — Creative Developer & Motion Designer',
  description:
    'A modern, motion-heavy personal portfolio website showcasing creative development, UI/UX, and motion design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${jakarta.variable} ${caveat.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body className="bg-canvas-light text-brand-black antialiased selection:bg-brand-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
