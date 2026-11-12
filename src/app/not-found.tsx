import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page not found – Mahendra Rajput',
  description:
    'This page could not be found. Head back to the portfolio of Mahendra Rajput, full stack developer based in Indore, India.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center bg-canvas-dark px-6 text-center"
    >
      <p className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
        404 — Page not found
      </p>
      <h1 className="mt-4 font-display text-6xl uppercase leading-none tracking-tight text-brand-cream sm:text-8xl">
        Lost in the
        <span className="text-brand-gold"> stack</span>
      </h1>
      <p className="mt-6 max-w-md text-base text-neutral-400">
        This page does not exist — but the portfolio does. Mahendra Rajput, full stack developer,
        Indore.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-6 py-3 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-gold hover:text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Back to portfolio
      </Link>
    </main>
  );
}
