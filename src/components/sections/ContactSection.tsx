'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/dummy';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCursor } from '@/context/CursorContext';

interface ContactApiResponse {
  success?: boolean;
  error?: string;
}

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.44a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const STATUS_RESET_MS = 7000;

export const ContactSection: React.FC = () => {
  const { contact } = portfolioData;
  const { setCursorVariant, resetCursor } = useCursor();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submittingRef = useRef(false);

  useEffect(
    () => () => {
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
      }
    },
    []
  );

  const emailChannel = contact.channels.find((c) => c.type === 'email');
  const emailAddress = emailChannel?.value || 'ma02raj@gmail.com';
  const locationChannel = contact.channels.find((c) => c.type === 'location');
  const linkedinChannel = contact.channels.find((c) => c.value === 'LinkedIn');
  const githubChannel = contact.channels.find((c) => c.value === 'mahendra-builds');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildMailto = (name: string, email: string, message: string) =>
    `mailto:${emailAddress}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${name}`
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  const scheduleStatusReset = () => {
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }
    statusTimerRef.current = setTimeout(() => setStatus('idle'), STATUS_RESET_MS);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submittingRef.current) return;

    const { name, email, message, company } = formData;

    submittingRef.current = true;
    setStatus('submitting');
    setStatusMessage('Dispatching your message...');
    setMailtoHref(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company }),
      });

      const data: ContactApiResponse = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Delivery failed.');
      }

      setStatus('success');
      setStatusMessage(`Thank you, ${name}! Your message was sent.`);
      setFormData({ name: '', email: '', message: '', company: '' });
      scheduleStatusReset();
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'Delivery failed.';
      setStatus('error');
      setStatusMessage(
        `Could not send automatically (${reason}). Use the button below to email me directly.`
      );
      setMailtoHref(buildMailto(name, email, message));
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full scroll-mt-24 bg-canvas-dark text-white py-16 sm:py-24 px-6 md:px-12 select-none border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading & Contact Channels */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-gold uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                CONTACT
              </span>

              <h2
                id="contact-heading"
                className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[0.95]"
              >
                {contact.titleStart}
                <span className="text-brand-accent italic font-sans font-normal">
                  {contact.titleHighlight}
                </span>
                {contact.titleEnd}
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-md leading-relaxed">
                {contact.subtitle}
              </p>
            </div>

            {/* Direct Channels — icon only */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={linkedinChannel?.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-[#121212] text-neutral-300 hover:border-brand-gold/60 hover:text-brand-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href={githubChannel?.href || 'https://github.com/mahendra-builds'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Mahendra Rajput on GitHub"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-[#121212] text-neutral-300 hover:border-brand-gold/60 hover:text-brand-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={locationChannel?.href || portfolioData.meta.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${locationChannel?.value || 'Indore, India'} on Google Maps`}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-[#121212] text-neutral-300 hover:border-brand-gold/60 hover:text-brand-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </a>

              <span className="ml-1 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                Indore, IN · Remote OK
              </span>
            </div>
          </div>

          {/* Right Column: Sleek Dark Contact Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              aria-label="Contact Mahendra Rajput"
              className="relative rounded-3xl border border-neutral-800 bg-[#121212] p-8 sm:p-10 space-y-6 shadow-2xl"
            >
              {/* Honeypot — hidden from humans, catches naive bots */}
              <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-400"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-400 focus:outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-400"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-400 focus:outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-400"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  aria-required="true"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-400 focus:outline-none transition-colors resize-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                />
              </div>

              {/* Status Message */}
              {status === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="space-y-3 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-mono"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{statusMessage}</span>
                  </div>
                  {mailtoHref && (
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      Open email client
                    </a>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-label="Send message to Mahendra Rajput"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-white text-black py-4 px-6 text-sm font-medium tracking-wide hover:bg-neutral-200 transition-colors shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                {status === 'submitting' ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 ml-1" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
