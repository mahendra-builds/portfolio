'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data/dummy';
import { Mail, MapPin, ArrowUpRight, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCursor } from '@/context/CursorContext';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.44a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const { contact } = portfolioData;
  const { setCursorVariant, resetCursor } = useCursor();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const emailChannel = contact.channels.find((c) => c.type === 'email');
  const emailAddress = emailChannel?.value || 'ma02@gmail.com';
  const locationChannel = contact.channels.find((c) => c.type === 'location');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMessage('Dispatching message to ' + emailAddress + '...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('API dispatch error');
      }

      setStatus('success');
      setStatusMessage(`Thank you, ${formData.name}! Your message was successfully sent to ${emailAddress}.`);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 7000);
    } catch {
      // Direct client fallback to mailto so the user's message is NEVER lost
      window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      setStatus('success');
      setStatusMessage(`Your email client was opened to send your inquiry directly to ${emailAddress}.`);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 7000);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-canvas-dark text-white py-16 sm:py-24 px-6 md:px-12 select-none border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading & Contact Channels */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-gold uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                CONTACT
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight leading-tight">
                {contact.titleStart}
                <span className="text-brand-accent italic font-serif">
                  {contact.titleHighlight}
                </span>
                {contact.titleEnd}
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-md leading-relaxed">
                {contact.subtitle}
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4 max-w-md">
              {/* Email Card */}
              <a
                href={`mailto:${emailAddress}`}
                aria-label={`Send email to ${emailAddress}`}
                className="group flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-[#121212] hover:border-neutral-700 transition-colors"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono uppercase text-neutral-500">
                      Email me
                    </span>
                    <span className="block text-sm font-semibold text-neutral-200">
                      {emailAddress}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
                className="group flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-[#121212] hover:border-neutral-700 transition-colors"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono uppercase text-neutral-500">
                      Connect
                    </span>
                    <span className="block text-sm font-semibold text-neutral-200">
                      LinkedIn
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              {/* GitHub Card */}
              <a
                href="https://github.com/mahendra-builds"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Mahendra Rajput on GitHub"
                className="group flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-[#121212] hover:border-neutral-700 transition-colors"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={resetCursor}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono uppercase text-neutral-500">
                      GitHub
                    </span>
                    <span className="block text-sm font-semibold text-neutral-200">
                      @mahendra-builds
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              {/* Location Card */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-neutral-800 bg-[#121212]">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono uppercase text-neutral-500">
                      {locationChannel?.label || 'Based in'}
                    </span>
                    <span className="block text-sm font-semibold text-neutral-200">
                      {locationChannel?.value || 'Indore, India'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-800 text-neutral-400">
                  REMOTE OK
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Dark Contact Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              aria-label="Contact Mahendra Rajput"
              className="rounded-3xl border border-neutral-800 bg-[#121212] p-8 sm:p-10 space-y-6 shadow-2xl"
            >
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-400 focus:outline-none transition-colors"
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-400 focus:outline-none transition-colors"
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
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Status Message */}
              {status === 'success' && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-label="Send message to Mahendra Rajput"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-white text-black py-4 px-6 text-sm font-semibold tracking-wide hover:bg-neutral-200 transition-colors shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
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

        {/* Footer (Middle line 'CRAFTED WITH NEXT.JS...' removed completely) */}
        <div className="pt-16 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <span>{portfolioData.hero.yearText}. All rights reserved.</span>
          <a
            href="#hero"
            className="hover:text-white transition-colors"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </section>
  );
};
